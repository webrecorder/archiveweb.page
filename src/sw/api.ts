import { API, type SWCollections, tsToDate } from "@webrecorder/wabac/swlib";

import { Downloader, type Metadata } from "./downloader";
import { Signer } from "./keystore";
import { ipfsAdd, ipfsRemove, setAutoIPFSUrl } from "./ipfsutils";
import { RecProxy } from "./recproxy";
import { type Collection } from "@webrecorder/wabac/swlib";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouteMatch = Record<string, any>;

declare let self: ServiceWorkerGlobalScope;

const DEFAULT_SOFTWARE_STRING = `Webrecorder ArchiveWeb.page ${__AWP_VERSION__}, using warcio.js ${__WARCIO_VERSION__}`;

// ===========================================================================
class ExtAPI extends API {
  softwareString = "";
  uploading: Map<string, CountingStream> = new Map<string, CountingStream>();

  constructor(
    collections: SWCollections,
    { softwareString = "", replaceSoftwareString = false } = {},
  ) {
    super(collections);
    this.softwareString = replaceSoftwareString
      ? softwareString
      : softwareString + DEFAULT_SOFTWARE_STRING;
  }

  override get routes(): Record<string, string | [string, string]> {
    return {
      ...super.routes,
      downloadPages: "c/:coll/dl",
      upload: ["c/:coll/upload", "POST"],
      uploadStatus: "c/:coll/upload",
      uploadDelete: ["c/:coll/upload", "DELETE"],
      recPending: "c/:coll/recPending",
      pageTitle: ["c/:coll/pageTitle", "POST"],
      ipfsAdd: ["c/:coll/ipfs", "POST"],
      ipfsRemove: ["c/:coll/ipfs", "DELETE"],
      ipfsDaemonUrl: ["ipfs/daemonUrl", "POST"],
      publicKey: "publicKey",
    };
  }

  downloaderOpts() {
    const softwareString = this.softwareString;

    const signer = new Signer(softwareString, { cacheSig: true });

    return { softwareString, signer };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override async handleApi(request: Request, params: any, event: FetchEvent) {
    switch (params._route) {
      case "downloadPages":
        return await this.handleDownload(params);

      case "upload":
        return await this.handleUpload(params, request, event);

      case "uploadStatus":
        return await this.getUploadStatus(params);

      case "uploadDelete":
        return await this.deleteUpload(params);

      case "recPending":
        return await this.recordingPending(params);

      case "pageTitle":
        return await this.updatePageTitle(params.coll, request);

      case "publicKey":
        return await this.getPublicKey();

      case "ipfsAdd":
        //return await this.startIpfsAdd(event, request, params.coll);
        return {};

      case "ipfsRemove":
        //return await this.ipfsRemove(request, params.coll);
        return {};

      case "ipfsDaemonUrl":
        return await this.setIPFSDaemonUrlFromBody(request);

      default:
        return await super.handleApi(request, params, event);
    }
  }

  async handleDownload(params: RouteMatch) {
    const { dl, error } = await this.getDownloader(params);
    if (error) {
      return error;
    }
    return dl.download();
  }

  async getDownloader(params: RouteMatch) {
    const coll = await this.collections.loadColl(params.coll);
    if (!coll) {
      return { error: { error: "collection_not_found" } };
    }

    const pageQ = params["_query"].get("pages");
    const pageList = pageQ === "all" ? null : pageQ.split(",");

    const format = params["_query"].get("format") || "wacz";
    const filename = params["_query"].get("filename");

    return {
      dl: new Downloader({
        ...this.downloaderOpts(),
        coll,
        format,
        filename,
        pageList,
      }),
    };
  }

  async handleUpload(params: RouteMatch, request: Request, event: FetchEvent) {
    const uploading = this.uploading;

    const prevUpload = uploading.get(params.coll);

    const { url, headers, abortUpload } = await request.json();

    if (prevUpload && prevUpload.status === "uploading") {
      if (abortUpload && prevUpload.abort) {
        prevUpload.abort();
        return { aborted: true };
      }
      return { error: "already_uploading" };
    } else if (abortUpload) {
      return { error: "not_uploading" };
    }

    const { dl, error } = await this.getDownloader(params);
    if (error) {
      return error;
    }
    const dlResp = await dl.download();
    if (!(dlResp instanceof Response)) {
      return dlResp;
    }
    const filename = dlResp.filename || "";

    const abort = new AbortController();
    const signal = abort.signal;

    const counter = new CountingStream(dl.metadata.size, abort);

    const body = dlResp.body!.pipeThrough(counter.transformStream());

    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set("filename", filename || "");
      urlObj.searchParams.set("name", dl.metadata["title"] || filename || "");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const fetchPromise = fetch(urlObj.href, {
        method: "PUT",
        headers,
        duplex: "half",
        body,
        signal,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      uploading.set(params.coll, counter);
      if (event.waitUntil) {
        event.waitUntil(
          this.uploadFinished(
            fetchPromise,
            params.coll,
            dl.metadata,
            filename,
            counter,
          ),
        );
      }
      return { uploading: true };
    } catch (e: unknown) {
      uploading.delete(params.coll);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { error: "upload_failed", details: (e as any).toString() };
    }
  }

  async uploadFinished(
    fetchPromise: Promise<Response>,
    collId: string,
    metadata: Metadata,
    filename: string,
    counter: CountingStream,
  ) {
    try {
      const resp = await fetchPromise;
      const json = await resp.json();

      console.log(`Upload finished for ${filename} ${collId}`);

      metadata.uploadTime = new Date().getTime();
      metadata.uploadId = json.id;
      if (!metadata.mtime) {
        metadata.mtime = metadata.uploadTime;
      }
      if (!metadata.ctime) {
        metadata.ctime = metadata.uploadTime;
      }
      await this.collections.updateMetadata(
        collId,
        metadata as Record<string, string>,
      );
      counter.status = "done";
    } catch (e) {
      console.log(`Upload failed for ${filename} ${collId}`);
      console.log(e);
      counter.status = counter.aborted ? "aborted" : "failed";
    }
  }

  async deleteUpload(params: RouteMatch) {
    const collId = params.coll;

    this.uploading.delete(collId);

    const coll = await this.collections.loadColl(collId);

    if (coll?.metadata) {
      coll.metadata.uploadTime = null;
      coll.metadata.uploadId = null;
      await this.collections.updateMetadata(collId, coll.metadata);
      return { deleted: true };
    }

    return { deleted: false };
  }

  async getUploadStatus(params: RouteMatch) {
    let result: Metadata = {};
    const counter = this.uploading.get(params.coll);

    if (!counter) {
      result = { status: "idle" };
    } else {
      const { size, totalSize, status } = counter;
      result = { status, size, totalSize };

      if (status !== "uploading") {
        this.uploading.delete(params.coll);
      }
    }

    const coll = await this.collections.loadColl(params.coll);

    if (coll?.metadata) {
      result.uploadTime = coll.metadata.uploadTime;
      result.uploadId = coll.metadata.uploadId;
      result.ctime = coll.metadata.ctime;
      result.mtime = coll.metadata.mtime;
    }

    return result;
  }

  async recordingPending(params: RouteMatch) {
    const coll = await this.collections.loadColl(params.coll);
    if (!coll) {
      return { error: "collection_not_found" };
    }

    if (!(coll.store instanceof RecProxy)) {
      return { error: "invalid_collection" };
    }

    const numPending = await coll.store.getCounter();

    return { numPending };
  }

  async prepareColl(collId: string, request: Request) {
    const coll = await this.collections.loadColl(collId);
    if (!coll) {
      return { error: "collection_not_found" };
    }

    const body = await this.setIPFSDaemonUrlFromBody(request);

    return { coll, body };
  }

  async setIPFSDaemonUrlFromBody(request: Request) {
    let body;

    try {
      body = await request.json();
      if (body.ipfsDaemonUrl) {
        setAutoIPFSUrl(body.ipfsDaemonUrl);
      }
    } catch (_e: unknown) {
      body = {};
    }

    return body;
  }

  async startIpfsAdd(event: FetchEvent, request: Request, collId: string) {
    const { coll, body } = await this.prepareColl(collId, request);

    const client = await self.clients.get(event.clientId);

    const p = runIPFSAdd(
      collId,
      coll,
      client,
      this.downloaderOpts(),
      this.collections,
      body,
    );

    if (event.waitUntil) {
      event.waitUntil(p);
    }

    try {
      await p;
    } catch (_e) {
      return { error: "ipfs_not_available" };
    }

    return { collId };
  }

  async ipfsRemove(request: Request, collId: string) {
    const { coll } = await this.prepareColl(collId, request);

    if (await ipfsRemove(coll)) {
      await this.collections.updateMetadata(coll.name, coll.config.metadata);
      return { removed: true };
    }

    return { removed: false };
  }

  async updatePageTitle(collId: string, request: Request) {
    const json = await request.json();
    const { url, title } = json;
    let { ts } = json;

    ts = tsToDate(ts).getTime();

    const coll = await this.collections.loadColl(collId);
    if (!coll) {
      return { error: "collection_not_found" };
    }

    //await coll.store.db.init();

    const result = await coll.store.lookupUrl(url, ts);

    if (!result) {
      return { error: "page_not_found" };
    }

    // drop to second precision for comparison
    const roundedTs = Math.floor(result.ts / 1000) * 1000;
    if (url !== result.url || ts !== roundedTs) {
      return { error: "no_exact_match" };
    }

    const page = await coll.store.db.getFromIndex("pages", "url", url);
    if (!page) {
      return { error: "page_not_found" };
    }
    page.title = title;
    await coll.store.db.put("pages", page);

    return { added: true };
  }

  async getPublicKey() {
    const { signer } = this.downloaderOpts();
    const keys = await signer.loadKeys();
    if (!keys?.public) {
      return {};
    } else {
      return { publicKey: keys.public };
    }
  }
}

// ===========================================================================
async function runIPFSAdd(
  collId: string,
  coll: Collection,
  client: Client | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  opts: any,
  collections: SWCollections,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  replayOpts: any,
) {
  let size = 0;
  let totalSize = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessage = (type: string, result: any = null) => {
    if (client) {
      client.postMessage({
        type,
        collId,
        size,
        result,
        totalSize,
      });
    }
  };

  const { url, cid } = await ipfsAdd(
    coll,
    opts,
    replayOpts,
    (incSize: number, _totalSize: number) => {
      size += incSize;
      totalSize = _totalSize;
      sendMessage("ipfsProgress");
    },
  );

  const result = { cid, ipfsURL: url };

  sendMessage("ipfsAdd", result);

  if (coll.config.metadata) {
    await collections.updateMetadata(coll.name, coll.config.metadata);
  }
}

// ===========================================================================
class CountingStream {
  totalSize: number;
  status: string;
  size = 0;
  _abort?: AbortController;
  aborted: boolean;

  constructor(totalSize?: number, abort?: AbortController) {
    this.totalSize = totalSize || 0;
    this.status = "uploading";
    this.size = 0;
    this._abort = abort;
    this.aborted = false;
  }

  abort() {
    if (this._abort) {
      this._abort.abort();
      this.aborted = true;
    }
  }

  transformStream() {
    const counterStream = this;

    return new TransformStream({
      start() {
        counterStream.size = 0;
      },

      transform(chunk, controller) {
        counterStream.size += chunk.length;
        //console.log(`Uploaded: ${counterStream.size}`);
        controller.enqueue(chunk);
      },
    });
  }
}

export { ExtAPI };

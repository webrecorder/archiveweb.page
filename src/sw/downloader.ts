import { makeZip } from "client-zip";

import { Deflate } from "pako";

import { v5 as uuidv5 } from "uuid";

import { createSHA256 } from "hash-wasm";
import { type IHasher } from "hash-wasm/dist/lib/WASMInterface.js";

import { getSurt, WARCRecord, WARCSerializer } from "warcio";

import {
  getTSMillis,
  getStatusText,
  digestMessage,
  type Collection,
  type ArchiveDB,
  type ResourceEntry,
} from "@webrecorder/wabac/swlib";
import { type DataSignature, type Signer } from "./keystore";
import { type ExtPageEntry } from "./recproxy";

export type SizeCallback = (size: number) => void;

export type ResponseWithFilename = Response & {
  filename?: string;
};

type ClientZipEntry = {
  name: string;
  lastModified: Date;
  input: AsyncGenerator<Uint8Array>;
};

type FileStats = {
  filename: string;
  size: number;
  hash?: string;
};

export type DownloaderOpts = {
  coll: Collection;
  format: string;
  filename?: string;
  pageList?: string[];
  signer?: Signer;
  softwareString?: string;
  gzip?: boolean;
  uuidNamespace?: string;
  markers?: Markers;
};

export type Markers = {
  ZIP?: Uint8Array;
  WARC_PAYLOAD?: Uint8Array;
  WARC_GROUP?: Uint8Array;
};

type DLResourceEntry = ResourceEntry & {
  offset?: number;
  length?: number;
  timestamp?: string;
  skipped?: boolean;
  text?: string;

  pageId: string;
  digest: string;
};

type CDXJEntry = {
  url: string;
  digest: string;
  mime: string;
  offset: number;
  length: number;
  recordDigest: string;
  status: number;

  method?: string;
  filename?: string;
  requestBody?: string;
};

type DLPageData = {
  title: string;
  url: string;
  id: string;
  size: number;
  ts: string;

  favIconUrl?: string;
  text?: string;
};

type Gen =
  | AsyncGenerator<Uint8Array>
  | AsyncGenerator<string>
  | Generator<Uint8Array>
  | Generator<string>;

type WARCVersion = "WARC/1.0" | "WARC/1.1";

type DigestCache = {
  url: string;
  date: string;
  payloadDigest?: string;
};

type DataPackageJSON = {
  profile: string;
  resources: {
    name: string;
    path: string;
    hash: string;
    bytes: number;
  }[];

  wacz_version: string;
  software: string;
  created: string;

  title?: string;
  description?: string;
  modified?: string;
};

export type Metadata = {
  uploadId?: string;
  uploadTime?: number;
  ctime?: number;
  mtime?: number;
  size?: number;
  title?: string;
  desc?: string;
  status?: string;
  totalSize?: number;
};

// ===========================================================================
const WACZ_VERSION = "1.1.1";

const SPLIT_REQUEST_Q_RX = /(.*?)[?&](?:__wb_method=|__wb_post=)[^&]+&(.*)/;

const LINES_PER_BLOCK = 1024;
const RESOURCE_BATCH_SIZE = LINES_PER_BLOCK * 8;

const DEFAULT_UUID_NAMESPACE = "f9ec3936-7f66-4461-bec4-34f4495ea242";

const DATAPACKAGE_FILENAME = "datapackage.json";
const DIGEST_FILENAME = "datapackage-digest.json";

const encoder = new TextEncoder();

const EMPTY = new Uint8Array([]);

async function* getPayload(payload: Uint8Array) {
  yield payload;
}

async function* hashingGen(
  gen: Gen,
  stats: FileStats,
  hasher: IHasher,
  sizeCallback: SizeCallback | null,
  zipMarker?: Uint8Array,
) {
  stats.size = 0;

  hasher.init();

  if (zipMarker) {
    yield zipMarker;
  }

  for await (let chunk of gen) {
    if (typeof chunk === "string") {
      chunk = encoder.encode(chunk);
    }

    yield chunk;
    stats.size += chunk.byteLength;
    if (sizeCallback) {
      sizeCallback(chunk.byteLength);
    }
    hasher.update(chunk);
  }

  if (zipMarker) {
    yield zipMarker;
  }

  stats.hash = hasher.digest("hex");
}

// ===========================================================================
class Downloader {
  db: ArchiveDB;
  pageList: string[] | null;
  collId: string;
  metadata: Metadata;
  gzip: boolean;

  markers: Markers;
  warcName: string;
  alreadyDecoded: boolean;

  softwareString: string;
  uuidNamespace: string;

  createdDateDt: Date;
  createdDate: string;
  modifiedDate: string | null;

  format: string;
  warcVersion: WARCVersion;

  digestOpts: {
    algo: string;
    prefix: string;
    base32?: boolean;
  };

  filename: string;

  signer: Signer | null;

  offset = 0;
  firstResources: ResourceEntry[] = [];
  textResources: DLResourceEntry[] = [];
  cdxjLines: string[] = [];

  // compressed index (idx) entries
  indexLines: string[] = [];

  digestsVisted: Record<string, DigestCache> = {};
  fileHasher: IHasher | null = null;
  recordHasher: IHasher | null = null;

  datapackageDigest = "";

  fileStats: FileStats[] = [];
  hashType = "";

  lastUrl?: string;
  lastPageId?: string;

  constructor({
    coll,
    format = "wacz",
    filename,
    pageList,
    signer,
    softwareString,
    gzip = true,
    uuidNamespace,
    markers,
  }: DownloaderOpts) {
    this.db = coll.store;
    this.pageList = pageList || null;
    this.collId = coll.name;
    this.metadata = coll.config.metadata || {};
    this.gzip = gzip;

    this.markers = markers || {};

    this.warcName = this.gzip ? "data.warc.gz" : "data.warc";

    this.alreadyDecoded = !coll.config["decode"] && !coll.config["loadUrl"];

    this.softwareString = softwareString || "ArchiveWeb.page";

    this.uuidNamespace = uuidNamespace || DEFAULT_UUID_NAMESPACE;

    this.createdDateDt = new Date(coll.config.ctime!);
    this.createdDate = this.createdDateDt.toISOString();
    this.modifiedDate = coll.config.metadata!.mtime
      ? new Date(coll.config.metadata!.mtime).toISOString()
      : null;

    this.format = format;
    this.warcVersion = format === "warc1.0" ? "WARC/1.0" : "WARC/1.1";

    if (format === "warc1.0") {
      this.digestOpts = { algo: "sha-1", prefix: "sha1:", base32: true };
    } else {
      this.digestOpts = { algo: "sha-256", prefix: "sha256:" };
    }

    // determine filename from title, if it exists
    if (!filename && coll.config.metadata!.title) {
      filename = encodeURIComponent(
        coll.config.metadata!.title.toLowerCase().replace(/\s/g, "-"),
      );
    }

    if (!filename) {
      filename = "webarchive";
    }
    this.filename = filename;

    this.signer = signer || null;
  }

  async download(sizeCallback: SizeCallback | null = null) {
    switch (this.format) {
      case "wacz":
        return this.downloadWACZ(this.filename, sizeCallback);

      case "warc":
      case "warc1.0":
        return this.downloadWARC(this.filename, sizeCallback);

      default:
        return { error: "invalid 'format': must be wacz or warc" };
    }
  }

  downloadWARC(filename: string, sizeCallback: SizeCallback | null = null) {
    filename = (filename || "webarchive").split(".")[0] + ".warc";

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const dl = this;

    const rs = new ReadableStream({
      async start(controller) {
        await dl.queueWARC(controller, filename, sizeCallback);
      },
    });

    const headers = {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "application/octet-stream",
    };

    const resp: ResponseWithFilename = new Response(rs, { headers });
    resp.filename = filename;
    return resp;
  }

  async loadResourcesBlock(
    start: [string, number] | [] = [],
  ): Promise<ResourceEntry[]> {
    return await this.db.db!.getAll(
      "resources",
      IDBKeyRange.lowerBound(start, true),
      RESOURCE_BATCH_SIZE,
    );
  }

  async *iterResources(resources: ResourceEntry[]) {
    let start: [string, number] | [] = [];
    //let count = 0;

    while (resources.length) {
      const last: ResourceEntry = resources[resources.length - 1]!;

      if (this.pageList) {
        resources = resources.filter((res) =>
          this.pageList!.includes(res.pageId || ""),
        );
      }
      //count += resources.length;
      yield* resources;

      start = [last.url, last.ts];
      resources = await this.loadResourcesBlock(start);
    }
    // if (count !== this.numResources) {
    //   console.warn(`Iterated ${count}, but expected ${this.numResources}`);
    // }
  }

  async queueWARC(
    controller: ReadableStreamDefaultController,
    filename: string,
    sizeCallback: SizeCallback | null,
  ) {
    this.firstResources = await this.loadResourcesBlock();

    for await (const chunk of this.generateWARC(filename)) {
      controller.enqueue(chunk);
      if (sizeCallback) {
        sizeCallback(chunk.length);
      }
    }

    for await (const chunk of this.generateTextWARC(filename)) {
      controller.enqueue(chunk);
      if (sizeCallback) {
        sizeCallback(chunk.length);
      }
    }

    controller.close();
  }

  addFile(
    zip: ClientZipEntry[],
    filename: string,
    generator: Gen,
    sizeCallback: SizeCallback | null,
  ) {
    const stats: FileStats = { filename, size: 0 };

    if (filename !== DATAPACKAGE_FILENAME && filename !== DIGEST_FILENAME) {
      this.fileStats.push(stats);
    }

    zip.push({
      name: filename,
      lastModified: this.createdDateDt,
      input: hashingGen(
        generator,
        stats,
        this.fileHasher!,
        sizeCallback,
        this.markers.ZIP,
      ),
    });
  }

  recordDigest(data: Uint8Array | string) {
    this.recordHasher!.init();
    this.recordHasher!.update(data);
    return this.hashType + ":" + this.recordHasher!.digest("hex");
  }

  getWARCRecordUUID(name: string) {
    return `<urn:uuid:${uuidv5(name, this.uuidNamespace)}>`;
  }

  async downloadWACZ(filename: string, sizeCallback: SizeCallback | null) {
    filename = (filename || "webarchive").split(".")[0] + ".wacz";

    this.fileHasher = await createSHA256();
    this.recordHasher = await createSHA256();
    this.hashType = "sha256";

    const zip: ClientZipEntry[] = [];

    this.firstResources = await this.loadResourcesBlock();

    this.addFile(zip, "pages/pages.jsonl", this.generatePages(), sizeCallback);
    this.addFile(
      zip,
      `archive/${this.warcName}`,
      this.generateWARC(filename + `#/archive/${this.warcName}`, true),
      sizeCallback,
    );
    //this.addFile(zip, "archive/text.warc", this.generateTextWARC(filename + "#/archive/text.warc"), false);

    // don't use compressed index if we'll have a single block, need to have at least enough for 2 blocks
    if (this.firstResources.length < 2 * LINES_PER_BLOCK) {
      this.addFile(zip, "indexes/index.cdx", this.generateCDX(), sizeCallback);
    } else {
      this.addFile(
        zip,
        "indexes/index.cdx.gz",
        this.generateCompressedCDX("index.cdx.gz"),
        sizeCallback,
      );
      this.addFile(zip, "indexes/index.idx", this.generateIDX(), sizeCallback);
    }

    this.addFile(
      zip,
      DATAPACKAGE_FILENAME,
      this.generateDataPackage(),
      sizeCallback,
    );

    this.addFile(
      zip,
      DIGEST_FILENAME,
      this.generateDataManifest(),
      sizeCallback,
    );

    const headers = {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "application/zip",
    };

    const rs = makeZip(zip);
    const response: ResponseWithFilename = new Response(rs, { headers });
    response.filename = filename;
    return response;
  }

  async *generateWARC(
    filename: string,
    digestRecordAndCDX = false,
  ): AsyncGenerator<Uint8Array> {
    try {
      let offset = 0;

      // if filename provided, add warcinfo
      if (filename) {
        const warcinfo = await this.createWARCInfo(filename);
        yield warcinfo;
        offset += warcinfo.length;
      }

      if (this.markers.WARC_GROUP) {
        yield this.markers.WARC_GROUP;
      }

      for await (const res of this.iterResources(this.firstResources)) {
        const resource: DLResourceEntry = res as DLResourceEntry;
        resource.offset = offset;
        const records = await this.createWARCRecord(resource);
        if (!records) {
          resource.skipped = true;
          continue;
        }

        // response record
        const responseData: { length: number; digest?: string } = { length: 0 };
        yield* this.emitRecord(records[0]!, digestRecordAndCDX, responseData);
        offset += responseData.length;
        resource.length = responseData.length;
        if (digestRecordAndCDX && !resource.recordDigest) {
          //resource.recordDigest = this.recordDigest(records[0]);
          resource.recordDigest = responseData.digest;
        }

        // request record, if any
        if (records.length > 1) {
          const requestData = { length: 0 };
          yield* this.emitRecord(records[1]!, false, requestData);
          offset += requestData.length;
        }

        if (digestRecordAndCDX) {
          this.cdxjLines.push(this.getCDXJ(resource, this.warcName));
        }

        if (this.markers.WARC_GROUP) {
          yield this.markers.WARC_GROUP;
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }

  async *emitRecord(
    record: WARCRecord,
    doDigest: boolean,
    output: { length: number; digest?: string },
  ) {
    const opts = { gzip: this.gzip, digest: this.digestOpts };
    const s = new WARCSerializer(record, opts);

    const chunks = [];
    if (doDigest) {
      this.recordHasher!.init();
    }

    for await (const chunk of s) {
      if (doDigest) {
        this.recordHasher!.update(chunk as Uint8Array);
      }
      chunks.push(chunk);
      output.length += chunk.length;
    }

    if (doDigest) {
      output.digest = this.hashType + ":" + this.recordHasher!.digest("hex");
    }

    if (
      !this.gzip &&
      this.markers.WARC_PAYLOAD &&
      record.warcType !== "request" &&
      (chunks.length === 5 || chunks.length === 4)
    ) {
      if (chunks.length === 5) {
        yield chunks[0];
        yield chunks[1];
        yield chunks[2];
        yield this.markers.WARC_PAYLOAD;
        if (chunks[3].length) {
          yield chunks[3];
          yield this.markers.WARC_PAYLOAD;
        }
        yield chunks[4];
      } else {
        yield chunks[0];
        yield chunks[1];
        yield this.markers.WARC_PAYLOAD;
        if (chunks[2].length) {
          yield chunks[2];
          yield this.markers.WARC_PAYLOAD;
        }
        yield chunks[3];
      }
    } else {
      for (const chunk of chunks) {
        yield chunk;
      }
    }
  }

  async *generateTextWARC(filename: string) {
    try {
      let offset = 0;

      // if filename provided, add warcinfo
      if (filename) {
        const warcinfo = await this.createWARCInfo(filename);
        yield warcinfo;
        offset += warcinfo.length;
      }

      for (const resource of this.textResources) {
        resource.offset = offset;
        const chunk = await this.createTextWARCRecord(resource);
        yield chunk;
        offset += chunk.length;
        resource.length = chunk.length;
      }
    } catch (e) {
      console.warn(e);
    }
  }

  getCDXJ(resource: DLResourceEntry, filename: string): string {
    const data: CDXJEntry = {
      url: resource.url,
      digest: resource.digest,
      mime: resource.mime!,
      offset: resource.offset!,
      length: resource.length!,
      recordDigest: resource.recordDigest!,
      status: resource.status!,
    };

    if (filename) {
      data.filename = filename;
    }

    if (resource.method && resource.method !== "GET") {
      const m = resource.url.match(SPLIT_REQUEST_Q_RX);
      if (m) {
        data.url = m[1]!;
        // resource.requestBody is the raw payload, use the converted one from the url for the cdx
        data.requestBody = m[2];
      }
      data.method = resource.method;
    }

    return `${getSurt(resource.url)} ${resource.timestamp} ${JSON.stringify(data)}\n`;
  }

  *generateCDX() {
    this.cdxjLines.sort();

    yield* this.cdxjLines;
  }

  *generateCompressedCDX(filename: string) {
    let offset = 0;

    let chunkDeflater: Deflate | null = null;
    let count = 0;
    let key = "";

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const dl = this;

    const finishChunk = () => {
      const data = chunkDeflater!.result as Uint8Array;
      const length = data.length;
      const digest = dl.recordDigest(data);

      const idx =
        key + " " + JSON.stringify({ offset, length, digest, filename });

      dl.indexLines.push(idx);

      offset += length;

      chunkDeflater = null;
      count = 0;
      key = "";

      return data;
    };

    for (const cdx of this.generateCDX()) {
      if (!chunkDeflater) {
        chunkDeflater = new Deflate({ gzip: true });
      }

      if (!key) {
        key = cdx.split(" {", 1)[0] || "";
      }

      if (++count === LINES_PER_BLOCK) {
        chunkDeflater.push(cdx, true);
        yield finishChunk();
      } else {
        chunkDeflater.push(cdx);
      }
    }

    if (chunkDeflater) {
      chunkDeflater.push(EMPTY, true);
      yield finishChunk();
    }
  }

  async *generateDataManifest() {
    const hash = this.datapackageDigest;

    const path = DATAPACKAGE_FILENAME;

    const data: { path: string; hash: string; signedData?: DataSignature } = {
      path,
      hash,
    };

    if (this.signer) {
      try {
        data.signedData = await this.signer.sign(hash, this.createdDate);

        this.signer.close();
        this.signer = null;
      } catch (e) {
        // failed to sign
        console.log(e);
      }
    }

    const res = JSON.stringify(data, null, 2);

    yield res;
  }

  async *generateDataPackage() {
    const root: DataPackageJSON = {
      profile: "data-package",

      resources: this.fileStats.map((stats) => {
        const path = stats.filename;
        return {
          name: path.slice(path.lastIndexOf("/") + 1),
          path,
          hash: this.hashType + ":" + stats.hash,
          bytes: stats.size,
        };
      }),

      wacz_version: WACZ_VERSION,
      software: this.softwareString,
      created: this.createdDate,
    };

    if (this.metadata.title) {
      root.title = this.metadata.title;
    }
    if (this.metadata.desc) {
      root.description = this.metadata.desc;
    }

    if (this.modifiedDate) {
      root.modified = this.modifiedDate;
    }

    const datapackageText = JSON.stringify(root, null, 2);
    this.datapackageDigest = this.recordDigest(datapackageText);
    yield datapackageText;
  }

  async *generatePages() {
    const pageIter: ExtPageEntry[] = (
      this.pageList
        ? await this.db.getPages(this.pageList)
        : await this.db.getAllPages()
    ) as ExtPageEntry[];

    yield JSON.stringify({
      format: "json-pages-1.0",
      id: "pages",
      title: "All Pages",
      hasText: true,
    });

    for (const page of pageIter) {
      const ts = new Date(page.ts).toISOString();

      const pageData: DLPageData = {
        title: page.title,
        url: page.url,
        id: page.id,
        size: page.size,
        ts,
      };

      if (page.favIconUrl) {
        pageData.favIconUrl = page.favIconUrl;
      }
      if (page.text) {
        pageData.text = page.text;
      }

      yield "\n" + JSON.stringify(pageData);

      if (page.text) {
        this.textResources.push({
          url: page.url,
          ts: page.ts,
          text: page.text,
          pageId: page.id,
          digest: "",
        });
      }
    }
  }

  /*
  async getLists() {
    try {
      const lists = await this.db.getAllCuratedByList();
      console.log(lists);
      return yaml.safeDump(lists, {skipInvalid: true});
    } catch (e) {
      console.log(e);
    }
  }
*/
  async *generateIDX() {
    yield this.indexLines.join("\n");
  }

  async createWARCInfo(filename: string) {
    const warcVersion = this.warcVersion;
    const type = "warcinfo";

    const info = {
      software: this.softwareString,
      format:
        warcVersion === "WARC/1.0"
          ? "WARC File Format 1.0"
          : "WARC File Format 1.1",
      isPartOf: this.metadata["title"] || this.collId,
    };

    //info["json-metadata"] = JSON.stringify(metadata);

    const warcHeaders = {
      "WARC-Record-ID": this.getWARCRecordUUID(JSON.stringify(info)),
    };

    const date = this.createdDate;

    const record = WARCRecord.createWARCInfo(
      { filename, type, date, warcHeaders, warcVersion },
      info,
    );
    const buffer = await WARCSerializer.serialize(record, {
      gzip: this.gzip,
      digest: this.digestOpts,
    });
    return buffer;
  }

  fixupHttpHeaders(headersMap: Record<string, string>, length: number) {
    // how many headers are we parsing here
    const numHeaders = this.alreadyDecoded ? 3 : 1;

    let count = 0;
    for (const [name] of Object.entries(headersMap)) {
      const lowerName = name.toLowerCase();
      switch (lowerName) {
        case "content-encoding":
        case "transfer-encoding":
          if (this.alreadyDecoded) {
            headersMap["x-orig-" + name] = headersMap[name]!;
            delete headersMap[name];
            ++count;
          }
          break;

        case "content-length":
          headersMap[name] = "" + length;
          ++count;
          break;
      }
      if (count === numHeaders) {
        break;
      }
    }
  }

  async createWARCRecord(resource: DLResourceEntry) {
    let url = resource.url;
    const date = new Date(resource.ts).toISOString();
    resource.timestamp = getTSMillis(date);
    const httpHeaders = resource.respHeaders || {};
    const warcVersion = this.warcVersion;

    const pageId = resource.pageId;

    let payload: Uint8Array | null | undefined = resource.payload;
    let type: "response" | "request" | "resource" | "revisit";

    let refersToUrl, refersToDate;
    let refersToDigest;
    let storeDigest: DigestCache | null = null;

    let method = "GET";
    let requestBody;

    // non-GET request/response:
    // if original request body + original requestURL is preserved, write that with original method
    // otherwise, just serialize the converted-to-GET form
    if (
      resource.method &&
      resource.method !== "GET" &&
      resource.requestBody &&
      resource.requestUrl
    ) {
      // ensure payload is an arraybuffer
      requestBody =
        typeof resource.requestBody === "string"
          ? encoder.encode(resource.requestBody)
          : resource.requestBody;
      method = resource.method;
      url = resource.requestUrl;
    } else {
      requestBody = new Uint8Array([]);
    }

    if (!resource.digest && resource.payload) {
      resource.digest = await digestMessage(resource.payload, "sha-256");
    }

    const digestOriginal = this.digestsVisted[resource.digest];

    if (resource.digest && digestOriginal) {
      // if exact resource in a row, and same page, then just skip instead of writing revisit
      if (
        url === this.lastUrl &&
        method === "GET" &&
        pageId === this.lastPageId
      ) {
        //console.log("Skip Dupe: " + url);
        return null;
      }

      type = "revisit";
      resource.mime = "warc/revisit";
      payload = EMPTY;

      refersToUrl = digestOriginal.url;
      refersToDate = digestOriginal.date;
      refersToDigest = digestOriginal.payloadDigest || resource.digest;
    } else if (resource.origURL && resource.origTS) {
      if (!resource.digest || !digestOriginal) {
        //console.log("Skip fuzzy resource with no digest");
        return null;
      }

      type = "revisit";
      resource.mime = "warc/revisit";
      payload = EMPTY;

      refersToUrl = resource.origURL;
      refersToDate = new Date(resource.origTS).toISOString();
      refersToDigest = digestOriginal.payloadDigest || resource.digest;
    } else {
      type = "response";
      if (!payload) {
        payload = (await this.db.loadPayload(
          resource,
          {},
        )) as Uint8Array | null;
      }

      if (!payload) {
        //console.log("Skipping No Payload For: " + url, resource);
        return null;
      }

      if (method === "GET") {
        storeDigest = { url, date };
        this.digestsVisted[resource.digest] = storeDigest;
      }
    }

    const status = resource.status || 200;
    const statusText = resource.statusText || getStatusText(status);

    const statusline = `HTTP/1.1 ${status} ${statusText}`;

    const responseRecordId = this.getWARCRecordUUID(
      type + ":" + resource.timestamp + "/" + resource.url,
    );

    const warcHeaders: Record<string, string> = {
      "WARC-Record-ID": responseRecordId,
    };

    if (pageId) {
      warcHeaders["WARC-Page-ID"] = pageId;
    }

    if (resource.extraOpts && Object.keys(resource.extraOpts).length) {
      warcHeaders["WARC-JSON-Metadata"] = JSON.stringify(resource.extraOpts);
    }

    if (refersToDigest) {
      warcHeaders["WARC-Payload-Digest"] = refersToDigest;
    }

    // remove encoding, set content-length as encoding never preserved in browser-based capture
    this.fixupHttpHeaders(httpHeaders, payload.length);

    const record = WARCRecord.create(
      {
        url,
        date,
        type,
        warcVersion,
        warcHeaders,
        statusline,
        httpHeaders,
        refersToUrl,
        refersToDate,
      },
      getPayload(payload),
    );

    //const buffer = await WARCSerializer.serialize(record, {gzip: this.gzip, digest: this.digestOpts});
    if (!resource.digest && record.warcPayloadDigest) {
      resource.digest = record.warcPayloadDigest;
    }
    if (storeDigest && record.warcPayloadDigest) {
      storeDigest.payloadDigest = record.warcPayloadDigest;
    }

    this.lastPageId = pageId;
    this.lastUrl = url;

    const records = [record];

    if (resource.reqHeaders) {
      const type = "request";
      const reqWarcHeaders: Record<string, string> = {
        "WARC-Record-ID": this.getWARCRecordUUID(
          type + ":" + resource.timestamp + "/" + resource.url,
        ),
        "WARC-Page-ID": pageId,
        "WARC-Concurrent-To": responseRecordId,
      };

      const urlParsed = new URL(url);
      const statusline = `${method} ${url.slice(urlParsed.origin.length)} HTTP/1.1`;

      const reqRecord = WARCRecord.create(
        {
          url,
          date,
          warcVersion,
          type,
          warcHeaders: reqWarcHeaders,
          httpHeaders: resource.reqHeaders,
          statusline,
        },
        getPayload(requestBody),
      );

      //records.push(await WARCSerializer.serialize(reqRecord, {gzip: this.gzip, digest: this.digestOpts}));
      records.push(reqRecord);
    }

    return records;
  }

  async createTextWARCRecord(resource: DLResourceEntry) {
    const date = new Date(resource.ts).toISOString();
    const timestamp = getTSMillis(date);
    resource.timestamp = timestamp;
    const url = `urn:text:${timestamp}/${resource.url}`;
    resource.url = url;

    const type = "resource";
    const warcHeaders = { "Content-Type": 'text/plain; charset="UTF-8"' };
    const warcVersion = this.warcVersion;

    const payload = getPayload(encoder.encode(resource.text));

    const record = WARCRecord.create(
      { url, date, warcHeaders, warcVersion, type },
      payload,
    );

    const buffer = await WARCSerializer.serialize(record, {
      gzip: this.gzip,
      digest: this.digestOpts,
    });
    if (!resource.digest && record.warcPayloadDigest) {
      resource.digest = record.warcPayloadDigest;
    }
    return buffer;
  }
}

export { Downloader };

import {
  type ADBType,
  ArchiveDB,
  type ArchiveRequest,
  type ArchiveResponse,
  type CollectionLoader,
  type PageEntry,
  LiveProxy,
  SWCollections,
  randomId,
} from "@webrecorder/wabac/swlib";

//declare let self: ServiceWorkerGlobalScope;

import { type IDBPDatabase, type IDBPTransaction } from "idb";
import { postToGetUrl } from "warcio";

//export interface RecDBType extends ADBType {
export type RecDBType = ADBType & {
  rec: {
    key: string;
  };
};

export type ExtPageEntry = PageEntry & {
  id: string;
  title: string;
  size: number;
  ts: number;

  favIconUrl?: string;
  text?: string;
};

// ===========================================================================
export class RecProxy extends ArchiveDB {
  collLoader: CollectionLoader;
  recordProxied: boolean;
  liveProxy: LiveProxy;
  pageId: string;
  isNew = true;
  firstPageOnly: boolean;
  counter = 0;
  isRecording = true;
  allPages = new Map<string, string>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(config: any, collLoader: CollectionLoader) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super(config.dbname);

    this.name = config.dbname.slice(3);

    this.collLoader = collLoader;

    this.recordProxied = config.extraConfig.recordProxied || false;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.liveProxy = new LiveProxy(config.extraConfig, {
      cloneResponse: true,
      allowBody: true,
    });

    this.pageId = randomId();
    this.isNew = true;
    this.firstPageOnly = config.extraConfig.firstPageOnly || false;

    this.counter = 0;
  }

  override _initDB(
    db: IDBPDatabase<ADBType>,
    oldV: number,
    newV: number | null,
    tx: IDBPTransaction<
      ADBType,
      (keyof ADBType)[],
      "readwrite" | "versionchange"
    >,
  ) {
    super._initDB(db, oldV, newV, tx);
    //TODO: fix
    (db as unknown as IDBPDatabase<RecDBType>).createObjectStore("rec");
  }

  async decCounter() {
    this.counter--;
    //console.log("rec counter", this.counter);
    //TODO: fix
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (this.db! as any).put("rec", this.counter, "numPending");
  }

  async getCounter(): Promise<number | undefined> {
    //TODO: fix
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
    return await (this.db! as any).get("rec", "numPending");
  }

  override async getResource(
    request: ArchiveRequest,
    prefix: string,
    event: FetchEvent,
  ) {
    if (!this.isRecording) {
      return await super.getResource(request, prefix, event);
    }

    let req;

    if (request.method === "POST" || request.method === "PUT") {
      req = request.request.clone();
    } else {
      req = request.request;
    }

    let response: ArchiveResponse | null = null;

    try {
      this.counter++;
      response = await this.liveProxy.getResource(request, prefix);
    } catch (_e) {
      await this.decCounter();
      return null;
    }

    // error response, don't record
    if (response?.noRW && response.status >= 400) {
      await this.decCounter();
      return response;
    }

    // don't record content proxied from specified hosts
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!this.recordProxied && this.liveProxy.hostProxy) {
      const parsedUrl = new URL(response!.url);
      if (this.liveProxy.hostProxy[parsedUrl.host]) {
        await this.decCounter();
        return response;
      }
    }

    this.doRecord(response!, req, request.mod)
      .catch(() => {})
      .finally(async () => this.decCounter());

    return response;
  }

  async doRecord(response: ArchiveResponse, request: Request, mod: string) {
    let url = response.url;
    const ts = response.date.getTime();

    const mime = (response.headers.get("content-type") || "").split(";")[0];

    const range = response.headers.get("content-range");

    if (range && !range.startsWith("bytes 0-")) {
      console.log("skip range request: " + range);
      return;
    }

    const status = response.status;
    const statusText = response.statusText;

    const respHeaders = Object.fromEntries(response.headers.entries());
    const reqHeaders = Object.fromEntries(request.headers.entries());

    const payload = new Uint8Array(
      await response.clonedResponse!.arrayBuffer(),
    );

    if (range) {
      const expectedRange = `bytes 0-${payload.length - 1}/${payload.length}`;
      if (range !== expectedRange) {
        console.log("skip range request: " + range);
        return;
      }
    }

    if (request.mode === "navigate" && mod === "mp_") {
      this.pageId = randomId();
      if (!this.firstPageOnly) {
        this.isNew = true;
      }
    }

    const pageId = this.pageId;
    const referrer = request.referrer;

    if (request.method === "POST" || request.method === "PUT") {
      const data = {
        method: request.method,
        postData: await request.text(),
        headers: request.headers,
        url,
      };

      if (postToGetUrl(data)) {
        url = new URL(data.url).href;
      }
    }

    const data = {
      url,
      ts,
      status,
      statusText,
      pageId,
      payload,
      mime,
      respHeaders,
      reqHeaders,
      referrer,
    };

    await this.addResource(data);

    await this.collLoader.updateSize(this.name, payload.length, payload.length);

    // don't add page for redirects
    if (this.isPage(url, request, status, referrer, mod)) {
      await this.addPages([{ id: pageId, url, ts }]);
      this.allPages.set(url, pageId);
      this.isNew = false;
    } else {
      console.log("not page", url);
    }
  }

  isPage(
    url: string,
    request: Request,
    status: number,
    referrer: string,
    mod: string,
  ) {
    if (!this.isNew) {
      return false;
    }

    if ((status >= 301 && status < 400) || status === 204) {
      return false;
    }

    if (request.mode !== "navigate" || mod !== "mp_") {
      return false;
    }

    if (!referrer) {
      return true;
    }

    const inx = referrer.indexOf("mp_/");
    if (inx > 0) {
      const refUrl = referrer.slice(inx + 4);
      return url === refUrl || this.allPages.has(refUrl);
    } else if (referrer.indexOf("if_/") > 0) {
      return false;
    } else if (referrer.indexOf("?source=")) {
      return true;
    } else {
      return false;
    }
  }

  async updateFavIcon(url: string, favIconUrl: string) {
    const pageId = this.allPages.get(url);
    if (!pageId) {
      return;
    }
    const page = (await this.db!.get("pages", pageId)) as
      | ExtPageEntry
      | undefined;
    if (!page) {
      return;
    }
    page.favIconUrl = favIconUrl;
    try {
      await this.db!.put("pages", page);
    } catch (_e: unknown) {
      // ignore
    }
  }
}

// ===========================================================================
export class RecordingCollections extends SWCollections {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override async _initStore(type: string, config: any): Promise<any> {
    let store;

    switch (type) {
      case "recordingproxy":
        store = new RecProxy(config, this);
        await store.initing;
        return store;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await super._initStore(type, config);
  }

  override async _handleMessage(event: MessageEvent) {
    let coll;

    switch (event.data.msg_type) {
      case "toggle-record":
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        coll = await this.getColl(event.data.id);
        if (coll && coll.store instanceof RecProxy) {
          console.log("Recording Toggled!", event.data.isRecording);
          coll.store.isRecording = event.data.isRecording;
        }
        break;

      case "update-favicon":
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        coll = await this.getColl(event.data.id);
        if (coll && coll.store instanceof RecProxy) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          await coll.store.updateFavIcon(event.data.url, event.data.favIconUrl);
        }
        break;

      default:
        return await super._handleMessage(event);
    }
  }
}

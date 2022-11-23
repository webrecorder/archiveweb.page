import { API } from "@webrecorder/wabac/src/api";
import { tsToDate } from "@webrecorder/wabac/src/utils";

import { Downloader } from "./downloader.js";
import { Signer } from "./keystore.js";
import { ipfsAdd, ipfsRemove, setAutoIPFSUrl } from "./ipfsutils.js";

// eslint-disable-next-line no-undef
const DEFAULT_SOFTWARE_STRING = `Webrecorder ArchiveWeb.page ${__AWP_VERSION__}, using warcio.js ${__WARCIO_VERSION__}`;

// ===========================================================================
class ExtAPI extends API
{
  constructor(collections, {softwareString = "", replaceSoftwareString = false} = {}) {
    super(collections);
    this.softwareString = replaceSoftwareString ? softwareString : softwareString + DEFAULT_SOFTWARE_STRING;
  }
  
  get routes() {
    return {
      ...super.routes,
      "downloadPages": "c/:coll/dl",
      "pageTitle": ["c/:coll/pageTitle", "POST"],
      "ipfsAdd": ["c/:coll/ipfs", "POST"],
      "ipfsRemove": ["c/:coll/ipfs", "DELETE"],
      "ipfsDaemonUrl": ["ipfsDaemonUrl", "POST"],
      "publicKey": "publicKey",
    };
  }

  get downloaderOpts() {
    const softwareString = this.softwareString;

    const signer = new Signer(softwareString);

    return {softwareString, signer};
  }

  async handleApi(request, params, event) {
    switch (params._route) {
    case "downloadPages": {
      const coll = await this.collections.loadColl(params.coll);
      if (!coll) {
        return {error: "collection_not_found"};
      }

      const pageQ = params._query.get("pages");
      const pageList = pageQ === "all" ? null : pageQ.split(",");

      const format = params._query.get("format") || "wacz";
      let filename = params._query.get("filename");

      const dl = new Downloader({...this.downloaderOpts, coll, format, filename, pageList});
      return dl.download();
    }

    case "pageTitle":
      return await this.updatePageTitle(params.coll, request);

    case "publicKey":
      return await this.getPublicKey();

    case "ipfsAdd":
      return await this.startIpfsAdd(event, params.coll);

    case "ipfsRemove":
      return await this.ipfsRemove(event, params.coll);

    case "ipfsDaemonUrl":
      return await this.setAutoIPFSUrl(request);

    default:
      return await super.handleApi(request, params);
    }
  }

  async setAutoIPFSUrl(request) {
    const { url } = await request.json();
    if (url) {
      setAutoIPFSUrl(url);
    }
    return {};
  }

  async startIpfsAdd(event, collId) {
    const coll = await this.collections.loadColl(collId);
    if (!coll) {
      return {error: "collection_not_found"};
    }

    //const id = randomId();
    const client = await self.clients.get(event.clientId);
    //this.ipfsTasks[id] = 
    new IPFSAdd(collId, coll, client, this.downloaderOpts, this.collections).run();

    return {collId};
  }

  async ipfsRemove(event, collId) {
    const coll = await this.collections.loadColl(collId);
    if (!coll) {
      return {error: "collection_not_found"};
    }

    if (await ipfsRemove(coll)) {
      await this.collections.updateMetadata(coll.name, coll.config.metadata);
      return {removed: true};
    }

    return {removed: false};
  }

  async updatePageTitle(collId, request) {
    const json = await request.json();
    let {url, ts, title} = json;

    ts = tsToDate(ts).getTime();

    const coll = await this.collections.loadColl(collId);
    if (!coll) {
      return {error: "collection_not_found"};
    }

    //await coll.store.db.init();

    const result = await coll.store.lookupUrl(url, ts);

    if (!result) {
      return {error: "page_not_found"};
    }

    // drop to second precision for comparison
    const roundedTs = Math.floor(result.ts / 1000) * 1000;
    if (url !== result.url || ts !== roundedTs) {
      return {error: "no_exact_match"};
    }

    const page = await coll.store.db.getFromIndex("pages", "url", url);
    if (!page) {
      return {error: "page_not_found"};
    }
    page.title = title;
    await coll.store.db.put("pages", page);

    return {"added": true};
  }

  async getPublicKey() {
    const signer = new Signer();
    const keys = await signer.loadKeys();
    if (!keys || !keys.public) {
      return {};
    } else {
      return {publicKey: keys.public};
    }
  }
}

// ===========================================================================
class IPFSAdd
{
  constructor(collId, coll, client, opts, collections) {
    this.collId = collId;
    this.coll = coll;
    this.client = client;
    this.opts = opts;
    this.collections = collections;

    this.size = 0;
  }

  async run() {
    const ipfsURL = await ipfsAdd(this.coll, this.opts, (size) => this.progress(size));
    const result = {ipfsURL};

    if (this.client) {
      this.client.postMessage({
        type: "ipfsAdd",
        collId: this.collId,
        size: this.size,
        result
      });
    }

    await this.collections.updateMetadata(this.coll.name, this.coll.config.metadata);
  }

  progress(incSize) {
    this.size += incSize;
    if (this.client) {
      this.client.postMessage({
        type: "ipfsProgress",
        collId: this.collId,
        size: this.size,
      });
    }
  }
}

export { ExtAPI };

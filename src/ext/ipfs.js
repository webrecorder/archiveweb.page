import { IPFSClient } from "@webrecorder/wabac/src/ipfs";
import { Downloader } from "../downloader";
import { ensureDefaultCollAndIPFS, ipfsAddWithReplay, ipfsUnpinAll, checkPins } from "../utils";

import ipfsHttpClient from 'ipfs-http-client';


// ===========================================================================
class ExtIPFSClient extends IPFSClient
{
  constructor(collLoader, localApiUrl) {
    super(true);
    this.collLoader = collLoader;
    this.sharedNode = false;
    this.localApiUrl = localApiUrl;
  }

  async init() {
    const validPins = await ensureDefaultCollAndIPFS(this.collLoader);

    if (validPins.size) {
      await this.initIPFS();

      if (!this.sharedNode) {
        await checkPins(this, validPins);
      }
    }
  }

  async _doInitIPFS() {
    this.ipfs = await this._initHttpClient();
    if (!this.ipfs) {
      await super._doInitIPFS();
    }
  }

  async _initHttpClient() {
    const ipfs = ipfsHttpClient(this.localApiUrl);
    this.customPreload = false;
    this.sharedNode = true;
    return ipfs;
  }

  async ipfsPinUnpin(collId, isPin, progress = null) {
    const coll = await this.collLoader.loadColl(collId);
    if (!coll) {
      return {error: "collection_not_found"};
    }

    await this.initIPFS();

    if (isPin) {
      const filename = "webarchive.wacz";

      const dl = new Downloader({coll, filename});
      const dlResponse = await dl.download(progress);

      if (!coll.config.metadata.ipfsPins) {
        coll.config.metadata.ipfsPins = [];
      }

      const swContent = await this.fetchBuffer("sw.js");
      const uiContent = await this.fetchBuffer("ui.js");

      const data = await ipfsAddWithReplay(this, 
        dlResponse.filename, dlResponse.body,
        swContent, uiContent);

      if (this.customPreload) {
        if (!await this.cacheDirToPreload(data.hash)) {
          // failed to load on preload, assume it didn't work
          return {};
        }
      }

      coll.config.metadata.ipfsPins.push(data);

      console.log("ipfs hash added " + data.url);

      await this.collLoader.updateMetadata(coll.name, coll.config.metadata);

      return {"ipfsURL": data.url};

    } else {
      if (coll.config.metadata.ipfsPins) {
        await ipfsUnpinAll(this, coll.config.metadata.ipfsPins);

        coll.config.metadata.ipfsPins = null;

        await this.collLoader.updateMetadata(coll.name, coll.config.metadata);
      }

      return {"removed": true};
    }
  }

  async fetchBuffer(filename) {
    const resp = await fetch(chrome.runtime.getURL("/replay/" + filename));

    return new Uint8Array(await resp.arrayBuffer());
  }
}

export { ExtIPFSClient };
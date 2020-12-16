import { IPFSClient } from "@webrecorder/wabac/src/ipfs";
import { Downloader } from "../downloader";
import { ensureDefaultCollAndIPFS, ipfsAddWithReplay, ipfsUnpinAll, checkPins } from "../utils";


// ===========================================================================
class ExtIPFSClient extends IPFSClient
{
  constructor(collLoader) {
    super(true);
    this.collLoader = collLoader;
  }

  async init() {
    const validPins = await ensureDefaultCollAndIPFS(this.collLoader);

    if (validPins.size) {
      await this.initIPFS();

      await checkPins(this, validPins);
    }
  }

  async ipfsPinUnpin(collId, isPin) {
    const coll = await this.collLoader.loadColl(collId);
    if (!coll) {
      return {error: "collection_not_found"};
    }

    await this.initIPFS();

    if (isPin) {
      const dl = new Downloader({coll});
      const dlResponse = await dl.download();

      if (!coll.config.metadata.ipfsPins) {
        coll.config.metadata.ipfsPins = [];
      }
      
      const swContent = await this.fetchBuffer("sw.js");
      const uiContent = await this.fetchBuffer("ui.js");

      const data = await ipfsAddWithReplay(this, 
        dlResponse.filename, dlResponse.body,
        swContent, uiContent);

      coll.config.metadata.ipfsPins.push(data);

      if (this.customPreload) {
        await this.cacheDirToPreload(data.hash);
      }

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
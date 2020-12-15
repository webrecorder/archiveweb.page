import { IPFSClient } from "@webrecorder/wabac/src/ipfs";
import { Downloader } from "../downloader";
import { ensureDefaultCollAndIPFS, ipfsAddWithReplay, ipfsUnpinAll } from "../utils";


// ===========================================================================
class ExtIPFSClient extends IPFSClient
{
  constructor(collLoader) {
    super();
    this.collLoader = collLoader;
  }

  async init() {
    if (await ensureDefaultCollAndIPFS(this.collLoader)) {
      this.initIPFS();
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

      const data = await ipfsAddWithReplay(this, dlResponse.filename, dlResponse.body, chrome.runtime.getURL("/replay/"));

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
}

export { ExtIPFSClient };
import { API } from "@webrecorder/wabac/src/api";

import { Downloader } from "../downloader";
import { Signer } from "../keystore";

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
    };
  }

  async handleApi(request, params) {
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

      const softwareString = this.softwareString;

      const signer = new Signer(softwareString);

      const dl = new Downloader({coll, format, filename, pageList, signer, softwareString});
      return dl.download();
    }

    default:
      return await super.handleApi(request, params);
    }
  }
}

export { ExtAPI };

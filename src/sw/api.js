import { API } from "@webrecorder/wabac/src/api";

import { Downloader } from "../downloader";
import { Signer } from "../keystore";


// ===========================================================================
class ExtAPI extends API
{
  constructor(...args) {
    super(...args);
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

      const signer = new Signer();

      const dl = new Downloader({coll, format, filename, pageList, signer});
      return dl.download();
    }

    default:
      return await super.handleApi(request, params);
    }
  }
}

export { ExtAPI };

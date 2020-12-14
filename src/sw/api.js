import { API } from '@webrecorder/wabac/src/api';

import { Downloader } from '../downloader';


// ===========================================================================
class ExtAPI extends API
{
  constructor(...args) {
    super(...args);
  }
  
  get routes() {
    return {
      ...super.routes,
      'downloadPages': ':coll/dl',
    };
  }

  async handleApi(request, params) {
    switch (params._route) {
      case "downloadPages":
        coll = await this.collections.loadColl(params.coll);
        if (!coll) {
          return {error: "collection_not_found"};
        }

        const pageQ = params._query.get("pages");
        const pageList = pageQ === "all" ? null : pageQ.split(",");

        const format = params._query.get("format") || "wacz";
        let filename = params._query.get("filename");

        const dl = new Downloader({coll, format, filename, pageList});
        return dl.download();
    }

    return await super.handleApi(request, params);
  }
}

export { ExtAPI };
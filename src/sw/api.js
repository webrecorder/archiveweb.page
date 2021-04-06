import { API } from "@webrecorder/wabac/src/api";

import { Downloader } from "../downloader";
import { Credentials } from "./cred";
import { doUpload, S3Sync } from "./s3";


// ===========================================================================
class ExtAPI extends API
{
  constructor(...args) {
    super(...args);

    this.credManager = new Credentials();
  }
  
  get routes() {
    return {
      ...super.routes,
      "downloadPages": ":coll/dl",
      "syncPages": ":coll/sync",

      "setCred": ["creds", "PUT"],
      "getCred": "cred/:cred",
      "listCreds": "creds",
      "deleteCred": ["cred/:cred", "DELETE"],
      "testCred": ["test-cred", "POST"],
      "listCredRoot": "cred-list/:cred"
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

      const dl = new Downloader({coll, format, filename, pageList});
      return dl.download();
    }

    case "syncPages": {
      const coll = await this.collections.loadColl(params.coll);
      if (!coll) {
        return {error: "collection_not_found"};
      }

      const format = "wacz";
      const pageList = null;
      const filename = null;

      const dl = new Downloader({coll, format, filename, pageList});
      const resp = await dl.download();

      await doUpload(resp);

      return {};
    }

    case "setCred": {
      const credData = await request.json();
      const sync = new S3Sync(credData);
      credData.valid = await sync.isBucketValid(credData.bucketAndPath || "");
      credData.checkTs = new Date().getTime();
      await this.credManager.update(credData);
      return {valid: credData.valid, checkTs: credData.checkTs};
    }

    case "getCred": {
      const cred = await this.credManager.get(params.cred);
      if (!cred) {
        return {error: "cred_not_found"};
      }
      return {cred};
    }

    case "listCreds": {
      const creds = await this.credManager.listAll();
      return {creds};
    }

    case "deleteCred": {
      await this.credManager.delete(params.cred);
      return {};
    }

    case "testCred": {
      const credData = await request.json();
      const s3 = new S3Sync(credData);
      const valid = await s3.isBucketValid(credData.bucketAndPath || "");
      const checkTs = new Date().getTime();
      return {valid, checkTs};
    }

    case "listCredRoot": {
      const credData = await this.credManager.get(params.cred);
      const s3 = new S3Sync(credData);
      await s3.ls();
    }
    }

    return await super.handleApi(request, params);
  }
}

export { ExtAPI };
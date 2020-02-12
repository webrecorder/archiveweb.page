"use strict";

import { DBIndex } from 'wabac/src/collIndex';
import { getTS } from 'wabac/src/utils';
import { fuzzyMatcher } from 'wabac/src/fuzzymatcher';


// ===========================================================================
class DBWriter {
  constructor(name) {
    this.db = new DBIndex(name);
    this.db.init();
  }

  async processRequestResponse(reqresp, payload, session) {

    if (reqresp.method === "OPTIONS") {
      //console.log("Skipping: " + reqresp.method + " for " + reqresp.url);
      return;
    }

    if (!payload) {
      payload = Buffer.from([]);
    }

    const respHeaders = reqresp.getResponseHeadersDict();
    const reqHeaders = reqresp.getRequestHeadersDict();

    const cookie = reqHeaders.headers.get("cookie");

    //if (!cookie && reqresp.url === pageUrl && pageCookie.cookie) {
    //  cookie = pageCookie.cookie;
    //}

    if (cookie) {
      respHeaders.headersDict["x-wabac-preset-cookie"] = cookie;
    }
      //if
      //  pageCookie.cookie = cookie;
      //}

    const mime = respHeaders.headers.get("content-type");

    const ts = reqresp.datetime;

    const url = reqresp.url;

    const status = reqresp.status;
    const statusText = reqresp.statusText;

    const data = {url, ts, status, statusText, mime, payload, session,
                  respHeaders: respHeaders.headersDict,
                  reqHeaders: reqHeaders.headersDict
                 };

    //console.log(`Commit ${url} @ ${ts}, cookie: ${cookie}, sw: ${reqresp.fromServiceWorker}`);

    try {
      await this.db.addUrl(data);
    } catch (e) {
      console.warn(`Commit error for ${url} @ ${ts} ${mime}`);
      console.warn(e);
    }

    for (let fuzzyUrl of fuzzyMatcher.fuzzyUrls(url)) {
      if (data.url === fuzzyUrl) {
        continue;
      }

      try {
        await this.db.addUrl({url: fuzzyUrl, ts, mime: "fuzzy", original: data.url});
      } catch (e) {
        consloe.warn(`Fuzzy Add Error: ${fuzzyUrl}`);
      }
    }
  }
}

export { DBWriter };


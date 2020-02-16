"use strict";

import { ArchiveDB } from 'wabac/src/archivedb';

import { getTS } from 'wabac/src/utils';
import { fuzzyMatcher } from 'wabac/src/fuzzymatcher';


// ===========================================================================
class DBWriter {
  constructor(name) {
    this.db = new ArchiveDB(name);
  }

  addPage(pageInfo) {
    console.log("Add Page: " + JSON.stringify(pageInfo));
    return this.db.addPage(pageInfo);
  }

  updatePage(pageInfo) {
    console.log("Update Page: " + JSON.stringify(pageInfo));
    this.db.addPage(pageInfo);
  }

  async processRequestResponse(reqresp, payload, pageInfo) {

    if (reqresp.method === "OPTIONS") {
      //console.log("Skipping: " + reqresp.method + " for " + reqresp.url);
      return;
    }

    if (!payload) {
      payload = Buffer.from([]);
    }

    const ts = reqresp.datetime;

    const url = reqresp.url;

    if (url === pageInfo.url) {
      pageInfo.date = new Date(ts).toISOString();
    }

    const session = pageInfo.id;

    const respHeaders = reqresp.getResponseHeadersDict();
    const reqHeaders = reqresp.getRequestHeadersDict();

    const mime = respHeaders.headers.get("content-type");
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
        console.warn(`Fuzzy Add Error: ${fuzzyUrl}`);
      }
    }
  }
}

export { DBWriter };


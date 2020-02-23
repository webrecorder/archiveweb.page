"use strict";

import { ArchiveDB } from 'wabac/src/archivedb';

import { getTS } from 'wabac/src/utils';
import { fuzzyMatcher } from 'wabac/src/fuzzymatcher';

import { setArchiveSize, incrArchiveSize, MAIN_DB_KEY } from './utils';


// ===========================================================================
class DBWriter {
  constructor(name) {
    this.db = new ArchiveDBExt(name);
  }

  addPage(pageInfo) {
    if (!pageInfo.url) {
      console.warn("Empty Page, Skipping");
      return;
    }
    return this.db.addPage(pageInfo);
  }

  async processRequestResponse(reqresp, payload, pageInfo) {

    if (reqresp.method === "OPTIONS") {
      //console.log("Skipping: " + reqresp.method + " for " + reqresp.url);
      return false;
    }

    // don't save 304 (todo: turn into 'revisit' style entry?)
    if (reqresp.status == 304) {
      return false;
    }

    const url = reqresp.url;

    const pageId = pageInfo.id || 0;

    if (pageId === 0) {
      console.log("Skipping No Page Id for: " + url);
      return false;
    }

    if (!payload) {
      payload = Buffer.from([]);
    }

    const ts = reqresp.datetime;

    if (url === pageInfo.url) {
      pageInfo.date = new Date(ts).toISOString();
    }

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

    const data = {url, ts, status, statusText, mime, payload, pageId,
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
        await this.db.addUrl({url: fuzzyUrl, ts, mime: "fuzzy", original: data.url, pageId});
      } catch (e) {
        console.warn(`Fuzzy Add Error: ${fuzzyUrl}`);
      }
    }

    return true;
  }
}


// ===========================================================================
class ArchiveDBExt extends ArchiveDB
{
  constructor(name) {
    super(name);
  }

  async deleteAll() {
    try {
      await this.db.clear("resources");
      await this.db.clear("pages");
    } catch (e) {}

    try {
      //await this.db.delete();
      //await indexedDB.deleteDatabase(MAIN_DB_KEY);
    } catch (e) {}

    setArchiveSize(0);
  }

  async getAllPages(reverse = false) {
    if (!reverse) {
      return await this.db.getAllFromIndex("pages", "date");
    }
    const tx = this.db.transaction("pages", "readonly");
    const pages = [];

    for await (const cursor of tx.store.index("date").iterate(null, "prev")) {
      pages.push(cursor.value);
    }

    return pages;
  }

  async deletePage(id) {
    const tx = this.db.transaction("pages", "readwrite");
    const page = await tx.store.get(id);
    await tx.store.delete(id);

    await this.deletePageResources(id);

    if (page) {
      incrArchiveSize(-page.size);
    }
  }

  async hasUrlForPage(url, pageId) {
    const tx = this.db.transaction("resources", "readonly");

    for await (const cursor of tx.store.iterate(this.getLookupRange(url))) {
      if (cursor.value.pageId === pageId) {
        return true;
      }
    }

    return false;
  }
}

export { DBWriter, ArchiveDBExt };


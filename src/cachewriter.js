"use strict";

import { fuzzyMatcher } from 'wabac/src/fuzzymatcher';


// ===========================================================================
class CacheWriter {
  constructor(name) {
    this.length = 0;
    this.cache = null;
    self.caches.open(name).then(cache => this.cache = cache);   
  }

  getLength() {
    return this.length;
  }

  async processRequestResponse(reqresp, payload) {
    const responseHeaders = reqresp.getResponseHeadersDict();

    if (reqresp.hasRequest()) {
      const requestHeaders = new Headers(reqresp.getRequestHeadersDict());
      const cookie = requestHeaders.get("cookie");

      if (cookie) {
        responseHeaders.headers.set("x-wabac-preset-cookie", cookie);
      }
    }

    try {
      const status = reqresp.status;
      const statusText = reqresp.statusText;
      const headers = responseHeaders.headers;
      //let type = responseHeaders.get("Content-Type") || "application/octet-stream";
      //type = type.split(";")[0];

      if (payload) {
        this.length += payload.length;
      }


      const url = reqresp.url;

      try {
        await this.cache.put(url, new Response(payload, {status, statusText, headers}));
      } catch(e) {
        console.error(e);
      }

      for (let fuzzyUrl of fuzzyMatcher.fuzzyUrls(url)) {
        if (url === fuzzyUrl) {
          continue;
        }
        await this.cache.put(fuzzyUrl, new Response(null, {status: 307, headers: {"x-wabac-fuzzy-match": "true", "content-location": url}}));
      }

    } catch(e) {
      console.warn("cache put fail for: " + url + " " + reqresp.status);
      console.warn(e);
    }
  }
}

export { CacheWriter };

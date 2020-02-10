"use strict";

import { STATUS_CODES } from 'http';

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

  async processRequestResponse(url, reqresp, pending, payload) {
    const responseHeaders = responseHeadersToHeaders(reqresp, pending);

    if (reqresp.method && reqresp._getReqHeaderObj()) {
      const requestHeaders = new Headers(reqresp._getReqHeaderObj());
      const cookie = requestHeaders.get("cookie");

      if (cookie) {
        responseHeaders.set("x-wabac-preset-cookie", cookie);
      }
    }

    try {
      const statusText = STATUS_CODES[reqresp.status];
      const status = reqresp.status;
      const headers = responseHeaders;
      //let type = responseHeaders.get("Content-Type") || "application/octet-stream";
      //type = type.split(";")[0];

      if (payload) {
        this.length += payload.length;
      }

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

// ===========================================================================
function responseHeadersToHeaders(reqresp, pending) {
  let headersDict = null;
  if (pending && pending.responseHeaders) {
    headersDict = pending.responseHeaders;
  } else {
    headersDict = reqresp.responseHeaders;
  }

  if (!headersDict) {
    headersDict = {};

    for (let header of reqresp.responseHeadersList) {
      headersDict[header.name] = header.value.replace('\n', ', ');
    }
  }

  let headers = null;

  try {
    headers = new Headers(headersDict);
  } catch (e) {
    for (let key of Object.keys(headersDict)) {
      headersDict[key] = headersDict[key].replace('\n', ', ');
    }
    headers = new Headers(headersDict);
  }



  try {
    headers.delete("transfer-encoding");
  } catch (e) {}

  try {
    headers.delete("content-encoding");
    headers.delete("content-length");
  } catch (e) {}

  return headers;
}



export { CacheWriter };

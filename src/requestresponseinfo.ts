"use strict";

import { getStatusText } from "@webrecorder/wabac/src/utils";

import { postToGetUrl } from "warcio";

// max URL length for post/put payload-converted URLs
const MAX_URL_LENGTH = 4096;

// max length for single query arg for post/put converted URLs
const MAX_ARG_LEN = 512;

const CONTENT_LENGTH = "content-length";
const CONTENT_TYPE = "content-type";
const EXCLUDE_HEADERS = ["content-encoding", "transfer-encoding"];

const encoder = new TextEncoder();

// ===========================================================================
class RequestResponseInfo {
  constructor(requestId) {
    // @ts-expect-error - TS2339 - Property '_created' does not exist on type 'RequestResponseInfo'.
    this._created = new Date();

    // @ts-expect-error - TS2339 - Property 'requestId' does not exist on type 'RequestResponseInfo'.
    this.requestId = requestId;

    // @ts-expect-error - TS2339 - Property 'ts' does not exist on type 'RequestResponseInfo'.
    this.ts = null;

    // request data
    // @ts-expect-error - TS2339 - Property 'method' does not exist on type 'RequestResponseInfo'.
    this.method = null;
    // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
    this.url = null;
    // @ts-expect-error - TS2339 - Property 'protocol' does not exist on type 'RequestResponseInfo'.
    this.protocol = "HTTP/1.1";

    // @ts-expect-error - TS2339 - Property 'requestHeaders' does not exist on type 'RequestResponseInfo'.
    this.requestHeaders = null;
    // @ts-expect-error - TS2339 - Property 'requestHeadersText' does not exist on type 'RequestResponseInfo'.
    this.requestHeadersText = null;

    // @ts-expect-error - TS2339 - Property 'postData' does not exist on type 'RequestResponseInfo'.
    this.postData = null;
    // @ts-expect-error - TS2339 - Property 'hasPostData' does not exist on type 'RequestResponseInfo'.
    this.hasPostData = false;

    // response data
    // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'.
    this.status = 0;
    // @ts-expect-error - TS2339 - Property 'statusText' does not exist on type 'RequestResponseInfo'.
    this.statusText = null;

    // @ts-expect-error - TS2339 - Property 'responseHeaders' does not exist on type 'RequestResponseInfo'.
    this.responseHeaders = null;
    // @ts-expect-error - TS2339 - Property 'responseHeadersList' does not exist on type 'RequestResponseInfo'.
    this.responseHeadersList = null;
    // @ts-expect-error - TS2339 - Property 'responseHeadersText' does not exist on type 'RequestResponseInfo'.
    this.responseHeadersText = null;

    // @ts-expect-error - TS2339 - Property 'payload' does not exist on type 'RequestResponseInfo'.
    this.payload = null;

    // @ts-expect-error - TS2339 - Property 'fromServiceWorker' does not exist on type 'RequestResponseInfo'.
    this.fromServiceWorker = false;

    // @ts-expect-error - TS2339 - Property 'fetch' does not exist on type 'RequestResponseInfo'.
    this.fetch = false;

    // @ts-expect-error - TS2339 - Property 'resourceType' does not exist on type 'RequestResponseInfo'.
    this.resourceType = null;

    // @ts-expect-error - TS2339 - Property 'extraOpts' does not exist on type 'RequestResponseInfo'.
    this.extraOpts = {};
  }

  fillRequest(params) {
    // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
    this.url = params.request.url;
    // @ts-expect-error - TS2339 - Property 'method' does not exist on type 'RequestResponseInfo'.
    this.method = params.request.method;
    // @ts-expect-error - TS2339 - Property 'requestHeaders' does not exist on type 'RequestResponseInfo'.
    if (!this.requestHeaders) {
      // @ts-expect-error - TS2339 - Property 'requestHeaders' does not exist on type 'RequestResponseInfo'.
      this.requestHeaders = params.request.headers;
    }
    // @ts-expect-error - TS2339 - Property 'postData' does not exist on type 'RequestResponseInfo'.
    this.postData = params.request.postData;
    // @ts-expect-error - TS2339 - Property 'hasPostData' does not exist on type 'RequestResponseInfo'.
    this.hasPostData = params.request.hasPostData;

    if (params.type) {
      // @ts-expect-error - TS2339 - Property 'resourceType' does not exist on type 'RequestResponseInfo'.
      this.resourceType = params.type;
    }

    //this.loaderId = params.loaderId;
  }

  fillFetchRequestPaused(params) {
    this.fillRequest(params);

    // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'.
    this.status = params.responseStatusCode;
    // @ts-expect-error - TS2339 - Property 'statusText' does not exist on type 'RequestResponseInfo'. | TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'.
    this.statusText = getStatusText(this.status);

    // @ts-expect-error - TS2339 - Property 'responseHeadersList' does not exist on type 'RequestResponseInfo'.
    this.responseHeadersList = params.responseHeaders;

    // @ts-expect-error - TS2339 - Property 'fetch' does not exist on type 'RequestResponseInfo'.
    this.fetch = true;
    // @ts-expect-error - TS2339 - Property 'resourceType' does not exist on type 'RequestResponseInfo'.
    this.resourceType = params.resourceType;
  }

  fillResponseRedirect(params) {
    this._fillResponse(params.redirectResponse);
  }

  isSelfRedirect() {
    // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'. | TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'. | TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'.
    if (this.status < 300 || this.status >= 400 || this.status === 304) {
      return false;
    }
    try {
      // @ts-expect-error - TS2339 - Property 'responseHeaders' does not exist on type 'RequestResponseInfo'. | TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
      const redirUrl = new URL(this.responseHeaders["location"], this.url).href;
      // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
      return this.url === redirUrl;
    } catch (e) {
      return false;
    }
  }

  fillResponseReceived(params) {
    const response = params.response;

    // if initial fetch was a 200, but now replacing with 304, don't!
    if (
      response.status == 304 &&
      // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'.
      this.status &&
      // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'.
      this.status != 304 &&
      // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
      this.url
    ) {
      return;
    }

    // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
    this.url = response.url.split("#")[0];

    this._fillResponse(response);
  }

  _fillResponse(response) {
    // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'.
    this.status = response.status;
    // @ts-expect-error - TS2339 - Property 'statusText' does not exist on type 'RequestResponseInfo'. | TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'.
    this.statusText = response.statusText || getStatusText(this.status);

    // @ts-expect-error - TS2339 - Property 'protocol' does not exist on type 'RequestResponseInfo'.
    this.protocol = response.protocol;

    if (response.requestHeaders) {
      // @ts-expect-error - TS2339 - Property 'requestHeaders' does not exist on type 'RequestResponseInfo'.
      this.requestHeaders = response.requestHeaders;
    }
    if (response.requestHeadersText) {
      // @ts-expect-error - TS2339 - Property 'requestHeadersText' does not exist on type 'RequestResponseInfo'.
      this.requestHeadersText = response.requestHeadersText;
    }

    // @ts-expect-error - TS2339 - Property 'responseHeaders' does not exist on type 'RequestResponseInfo'.
    this.responseHeaders = response.headers;

    if (response.headersText) {
      // @ts-expect-error - TS2339 - Property 'responseHeadersText' does not exist on type 'RequestResponseInfo'.
      this.responseHeadersText = response.headersText;
    }

    // @ts-expect-error - TS2339 - Property 'fromServiceWorker' does not exist on type 'RequestResponseInfo'.
    this.fromServiceWorker = !!response.fromServiceWorker;

    if (response.securityDetails) {
      const issuer = response.securityDetails.issuer || "";
      const ctc =
        response.securityDetails.certificateTransparencyCompliance ===
        "compliant"
          ? "1"
          : "0";
      // @ts-expect-error - TS2339 - Property 'extraOpts' does not exist on type 'RequestResponseInfo'.
      this.extraOpts.cert = { issuer, ctc };
    }
  }

  fillResponseReceivedExtraInfo(params) {
    // @ts-expect-error - TS2339 - Property 'responseHeaders' does not exist on type 'RequestResponseInfo'.
    this.responseHeaders = params.headers;
    if (params.headersText) {
      // @ts-expect-error - TS2339 - Property 'responseHeadersText' does not exist on type 'RequestResponseInfo'.
      this.responseHeadersText = params.headersText;
    }
  }

  toDBRecord(payload, pageInfo) {
    // don't save 304 (todo: turn into 'revisit' style entry?)
    // extra check for 206, should already be skipped
    if (
      // @ts-expect-error - TS2339 - Property 'method' does not exist on type 'RequestResponseInfo'.
      this.method === "OPTIONS" ||
      // @ts-expect-error - TS2339 - Property 'method' does not exist on type 'RequestResponseInfo'.
      this.method === "HEAD" ||
      // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'.
      this.status == 304 ||
      // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'.
      this.status === 206
    ) {
      return null;
    }

    if (
      // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
      !this.url ||
      // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'. | TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
      (!this.url.startsWith("https:") && !this.url.startsWith("http:"))
    ) {
      return;
    }

    if (!pageInfo.id) {
      // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
      console.log("Skipping No Page Id for: " + this.url);
      return null;
    }

    if (!payload) {
      payload = new Uint8Array([]);
    }

    // @ts-expect-error - TS2339 - Property 'ts' does not exist on type 'RequestResponseInfo'.
    this.ts = new Date().getTime();

    const respHeaders = this.getResponseHeadersDict(payload.length);
    const reqHeaders = this.getRequestHeadersDict();

    // @ts-expect-error - TS2531 - Object is possibly 'null'.
    const mime = (respHeaders.headers.get(CONTENT_TYPE) || "").split(";")[0];
    // @ts-expect-error - TS2531 - Object is possibly 'null'.
    const cookie = reqHeaders.headers.get("cookie");

    if (cookie) {
      respHeaders.headersDict["x-wabac-preset-cookie"] = cookie;
    }

    // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
    const reqUrl = this.url;

    if (this.method && this.method !== "GET") {
      const convData = {
        // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
        url: this.url,
        headers: reqHeaders.headers,
        // @ts-expect-error - TS2339 - Property 'method' does not exist on type 'RequestResponseInfo'.
        method: this.method,
        postData: this.postData || "",
      };
      // @ts-expect-error - TS2345 - Argument of type '{ url: any; headers: Headers | null; method: any; postData: any; }' is not assignable to parameter of type 'Request'.
      if (postToGetUrl(convData)) {
        //this.requestBody = convData.requestBody;
        // truncate to avoid extra long URLs
        try {
          const url = new URL(convData.url);
          for (const [key, value] of url.searchParams.entries()) {
            if (value && value.length > MAX_ARG_LEN) {
              url.searchParams.set(key, value.slice(0, MAX_ARG_LEN));
            }
          }
          convData.url = url.href;
        } catch (e) {
          //ignore
        }
        // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
        this.url = convData.url.slice(0, MAX_URL_LENGTH);
      }
    }

    const data = {
      // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
      url: this.url,
      // @ts-expect-error - TS2339 - Property 'ts' does not exist on type 'RequestResponseInfo'.
      ts: this.ts,
      // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'.
      status: this.status,
      // @ts-expect-error - TS2339 - Property 'statusText' does not exist on type 'RequestResponseInfo'.
      statusText: this.statusText,
      pageId: pageInfo.id,
      payload,
      mime,
      respHeaders: respHeaders.headersDict,
      reqHeaders: reqHeaders.headersDict,
      // @ts-expect-error - TS2339 - Property 'extraOpts' does not exist on type 'RequestResponseInfo'.
      extraOpts: this.extraOpts,
    };

    // @ts-expect-error - TS2339 - Property 'method' does not exist on type 'RequestResponseInfo'.
    if (this.method !== "GET") {
      // @ts-expect-error - TS2339 - Property 'method' does not exist on type '{ url: any; ts: any; status: any; statusText: any; pageId: any; payload: any; mime: string; respHeaders: any; reqHeaders: any; extraOpts: any; }'. | TS2339 - Property 'method' does not exist on type 'RequestResponseInfo'.
      data.method = this.method;
      // @ts-expect-error - TS2339 - Property 'postData' does not exist on type 'RequestResponseInfo'.
      if (this.postData) {
        // @ts-expect-error - TS2339 - Property 'postData' does not exist on type 'RequestResponseInfo'.
        if (typeof this.postData === "string") {
          // @ts-expect-error - TS2339 - Property 'requestBody' does not exist on type '{ url: any; ts: any; status: any; statusText: any; pageId: any; payload: any; mime: string; respHeaders: any; reqHeaders: any; extraOpts: any; }'. | TS2339 - Property 'postData' does not exist on type 'RequestResponseInfo'.
          data.requestBody = encoder.encode(this.postData);
        } else {
          // @ts-expect-error - TS2339 - Property 'requestBody' does not exist on type '{ url: any; ts: any; status: any; statusText: any; pageId: any; payload: any; mime: string; respHeaders: any; reqHeaders: any; extraOpts: any; }'. | TS2339 - Property 'postData' does not exist on type 'RequestResponseInfo'.
          data.requestBody = this.postData;
        }
        // @ts-expect-error - TS2339 - Property 'requestUrl' does not exist on type '{ url: any; ts: any; status: any; statusText: any; pageId: any; payload: any; mime: string; respHeaders: any; reqHeaders: any; extraOpts: any; }'.
        data.requestUrl = reqUrl;
      }
    }

    return data;
  }

  fillFromDBRecord(record) {
    // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
    this.url = record.url;
    // @ts-expect-error - TS2339 - Property 'ts' does not exist on type 'RequestResponseInfo'.
    this.ts = record.ts;

    // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'.
    this.status = record.status;
    // @ts-expect-error - TS2339 - Property 'statusText' does not exist on type 'RequestResponseInfo'.
    this.statusText = record.statusText;

    // @ts-expect-error - TS2339 - Property 'payload' does not exist on type 'RequestResponseInfo'.
    this.payload = record.payload;
    // @ts-expect-error - TS2339 - Property 'requestHeaders' does not exist on type 'RequestResponseInfo'.
    this.requestHeaders = record.reqHeaders || {};
    // @ts-expect-error - TS2339 - Property 'responseHeaders' does not exist on type 'RequestResponseInfo'.
    this.responseHeaders = record.respHeaders || {};
  }

  getResponseHeadersText() {
    // @ts-expect-error - TS2339 - Property 'protocol' does not exist on type 'RequestResponseInfo'. | TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'. | TS2339 - Property 'statusText' does not exist on type 'RequestResponseInfo'.
    let headers = `${this.protocol} ${this.status} ${this.statusText}\r\n`;

    // @ts-expect-error - TS2339 - Property 'responseHeaders' does not exist on type 'RequestResponseInfo'.
    for (const header of Object.keys(this.responseHeaders)) {
      // @ts-expect-error - TS2339 - Property 'responseHeaders' does not exist on type 'RequestResponseInfo'.
      headers += `${header}: ${this.responseHeaders[header].replace(
        /\n/g,
        ", "
      )}\r\n`;
    }
    headers += "\r\n";
    return headers;
  }

  hasRequest() {
    // @ts-expect-error - TS2339 - Property 'method' does not exist on type 'RequestResponseInfo'. | TS2339 - Property 'requestHeaders' does not exist on type 'RequestResponseInfo'. | TS2339 - Property 'requestHeadersText' does not exist on type 'RequestResponseInfo'.
    return this.method && (this.requestHeaders || this.requestHeadersText);
  }

  getRequestHeadersDict() {
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2. | TS2339 - Property 'requestHeaders' does not exist on type 'RequestResponseInfo'.
    return this._getHeadersDict(this.requestHeaders, null);
  }

  getResponseHeadersDict(length) {
    return this._getHeadersDict(
      // @ts-expect-error - TS2339 - Property 'responseHeaders' does not exist on type 'RequestResponseInfo'.
      this.responseHeaders,
      // @ts-expect-error - TS2339 - Property 'responseHeadersList' does not exist on type 'RequestResponseInfo'.
      this.responseHeadersList,
      length
    );
  }

  _getHeadersDict(headersDict, headersList, actualContentLength) {
    if (!headersDict && headersList) {
      headersDict = {};

      for (const header of headersList) {
        const headerName = header.name.toLowerCase();
        if (EXCLUDE_HEADERS.includes(headerName)) {
          continue;
        }
        if (actualContentLength && headerName === CONTENT_LENGTH) {
          headersDict[headerName] = "" + actualContentLength;
          continue;
        }
        headersDict[headerName] = header.value.replace(/\n/g, ", ");
      }
    }

    let headers = null;

    if (!headersDict) {
      return { headers: new Headers(), headersDict: {} };
    }

    try {
      // @ts-expect-error - TS2322 - Type 'Headers' is not assignable to type 'null'.
      headers = new Headers(headersDict);
    } catch (e) {
      for (const key of Object.keys(headersDict)) {
        if (key[0] === ":") {
          delete headersDict[key];
          continue;
        }
        const keyLower = key.toLowerCase();
        if (EXCLUDE_HEADERS.includes(keyLower)) {
          continue;
        }
        if (actualContentLength && keyLower === CONTENT_LENGTH) {
          headersDict[key] = "" + actualContentLength;
          continue;
        }
        headersDict[key] = headersDict[key].replace(/\n/g, ", ");
      }
      try {
        // @ts-expect-error - TS2322 - Type 'Headers' is not assignable to type 'null'.
        headers = new Headers(headersDict);
      } catch (e) {
        console.warn(e);
        // @ts-expect-error - TS2322 - Type 'Headers' is not assignable to type 'null'.
        headers = new Headers();
      }
    }

    return { headers, headersDict };
  }

  isValidBinary() {
    // @ts-expect-error - TS2339 - Property 'payload' does not exist on type 'RequestResponseInfo'.
    if (!this.payload) {
      return false;
    }

    // @ts-expect-error - TS2339 - Property 'payload' does not exist on type 'RequestResponseInfo'.
    const length = this.payload.length;

    // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
    const { headers } = this.getResponseHeadersDict();
    // @ts-expect-error - TS2531 - Object is possibly 'null'.
    const contentType = headers.get(CONTENT_TYPE);
    // @ts-expect-error - TS2531 - Object is possibly 'null'.
    const contentLength = headers.get(CONTENT_LENGTH);

    if (Number(contentLength) !== length) {
      return false;
    }

    if (contentType && contentType.startsWith("text/html")) {
      return false;
    }

    return true;
  }
}

//function formatHeadersText(headersText) {
//  condense any headers containing newlines
//  return headersText.replace(/(\n[^:\n]+)+(?=\r\n)/g, function(value) { return value.replace(/\r?\n/g, ", ");});
//}

export { RequestResponseInfo };
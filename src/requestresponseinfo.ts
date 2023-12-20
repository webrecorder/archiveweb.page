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
    this._created = new Date();

    this.requestId = requestId;

    this.ts = null;

    // request data
    this.method = null;
    this.url = null;
    this.protocol = "HTTP/1.1";

    this.requestHeaders = null;
    this.requestHeadersText = null;

    this.postData = null;
    this.hasPostData = false;

    // response data
    this.status = 0;
    this.statusText = null;

    this.responseHeaders = null;
    this.responseHeadersList = null;
    this.responseHeadersText = null;

    this.payload = null;

    this.fromServiceWorker = false;

    this.fetch = false;

    this.resourceType = null;

    this.extraOpts = {};
  }

  fillRequest(params) {
    this.url = params.request.url;
    this.method = params.request.method;
    if (!this.requestHeaders) {
      this.requestHeaders = params.request.headers;
    }
    this.postData = params.request.postData;
    this.hasPostData = params.request.hasPostData;

    if (params.type) {
      this.resourceType = params.type;
    }

    //this.loaderId = params.loaderId;
  }

  fillFetchRequestPaused(params) {
    this.fillRequest(params);

    this.status = params.responseStatusCode;
    this.statusText = getStatusText(this.status);

    this.responseHeadersList = params.responseHeaders;

    this.fetch = true;
    this.resourceType = params.resourceType;
  }

  fillResponseRedirect(params) {
    this._fillResponse(params.redirectResponse);
  }

  isSelfRedirect() {
    if (this.status < 300 || this.status >= 400 || this.status === 304) {
      return false;
    }
    try {
      const redirUrl = new URL(this.responseHeaders["location"], this.url).href;
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
      this.status &&
      this.status != 304 &&
      this.url
    ) {
      return;
    }

    this.url = response.url.split("#")[0];

    this._fillResponse(response);
  }

  _fillResponse(response) {
    this.status = response.status;
    this.statusText = response.statusText || getStatusText(this.status);

    this.protocol = response.protocol;

    if (response.requestHeaders) {
      this.requestHeaders = response.requestHeaders;
    }
    if (response.requestHeadersText) {
      this.requestHeadersText = response.requestHeadersText;
    }

    this.responseHeaders = response.headers;

    if (response.headersText) {
      this.responseHeadersText = response.headersText;
    }

    this.fromServiceWorker = !!response.fromServiceWorker;

    if (response.securityDetails) {
      const issuer = response.securityDetails.issuer || "";
      const ctc =
        response.securityDetails.certificateTransparencyCompliance ===
        "compliant"
          ? "1"
          : "0";
      this.extraOpts.cert = { issuer, ctc };
    }
  }

  fillResponseReceivedExtraInfo(params) {
    this.responseHeaders = params.headers;
    if (params.headersText) {
      this.responseHeadersText = params.headersText;
    }
  }

  toDBRecord(payload, pageInfo) {
    // don't save 304 (todo: turn into 'revisit' style entry?)
    // extra check for 206, should already be skipped
    if (
      this.method === "OPTIONS" ||
      this.method === "HEAD" ||
      this.status == 304 ||
      this.status === 206
    ) {
      return null;
    }

    if (
      !this.url ||
      (!this.url.startsWith("https:") && !this.url.startsWith("http:"))
    ) {
      return;
    }

    if (!pageInfo.id) {
      console.log("Skipping No Page Id for: " + this.url);
      return null;
    }

    if (!payload) {
      payload = new Uint8Array([]);
    }

    this.ts = new Date().getTime();

    const respHeaders = this.getResponseHeadersDict(payload.length);
    const reqHeaders = this.getRequestHeadersDict();

    const mime = (respHeaders.headers.get(CONTENT_TYPE) || "").split(";")[0];
    const cookie = reqHeaders.headers.get("cookie");

    if (cookie) {
      respHeaders.headersDict["x-wabac-preset-cookie"] = cookie;
    }

    const reqUrl = this.url;

    if (this.method && this.method !== "GET") {
      const convData = {
        url: this.url,
        headers: reqHeaders.headers,
        method: this.method,
        postData: this.postData || "",
      };
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
        this.url = convData.url.slice(0, MAX_URL_LENGTH);
      }
    }

    const data = {
      url: this.url,
      ts: this.ts,
      status: this.status,
      statusText: this.statusText,
      pageId: pageInfo.id,
      payload,
      mime,
      respHeaders: respHeaders.headersDict,
      reqHeaders: reqHeaders.headersDict,
      extraOpts: this.extraOpts,
    };

    if (this.method !== "GET") {
      data.method = this.method;
      if (this.postData) {
        if (typeof this.postData === "string") {
          data.requestBody = encoder.encode(this.postData);
        } else {
          data.requestBody = this.postData;
        }
        data.requestUrl = reqUrl;
      }
    }

    return data;
  }

  fillFromDBRecord(record) {
    this.url = record.url;
    this.ts = record.ts;

    this.status = record.status;
    this.statusText = record.statusText;

    this.payload = record.payload;
    this.requestHeaders = record.reqHeaders || {};
    this.responseHeaders = record.respHeaders || {};
  }

  getResponseHeadersText() {
    let headers = `${this.protocol} ${this.status} ${this.statusText}\r\n`;

    for (const header of Object.keys(this.responseHeaders)) {
      headers += `${header}: ${this.responseHeaders[header].replace(
        /\n/g,
        ", ",
      )}\r\n`;
    }
    headers += "\r\n";
    return headers;
  }

  hasRequest() {
    return this.method && (this.requestHeaders || this.requestHeadersText);
  }

  getRequestHeadersDict() {
    return this._getHeadersDict(this.requestHeaders, null);
  }

  getResponseHeadersDict(length) {
    return this._getHeadersDict(
      this.responseHeaders,
      this.responseHeadersList,
      length,
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
        headers = new Headers(headersDict);
      } catch (e) {
        console.warn(e);
        headers = new Headers();
      }
    }

    return { headers, headersDict };
  }

  isValidBinary() {
    if (!this.payload) {
      return false;
    }

    const length = this.payload.length;

    const { headers } = this.getResponseHeadersDict();
    const contentType = headers.get(CONTENT_TYPE);
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

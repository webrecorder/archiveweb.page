"use strict";

import { STATUS_CODES } from 'http';


// ===========================================================================
class RequestResponseInfo
{
  constructor(requestId) {
    this.requestId = requestId;

    this.datetime = null;

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
  }

  fillRequest(params) {
    this.url = params.request.url;
    this.method = params.request.method;
    this.requestHeaders = params.request.headers;
    this.postData = params.request.postData;
    this.hasPostData = params.request.hasPostData;
  }

  fillFetchRequestPaused(params) {
    this.fillRequest(params);

    this.status = params.responseStatusCode;
    this.statusText = STATUS_CODES[this.status];

    this.responseHeadersList = params.responseHeaders;

    this.fetch = true;
  }

  fillResponseReceived(params) {
    // if initial fetch was a 200, but now replacing with 304, don't!
    if (params.response.status == 304 && this.status && this.status != 304 && this.url) {
      return;
    }

    this.url = params.response.url.split("#")[0];

    this.status = params.response.status;
    this.statusText = params.response.statusText || STATUS_CODES[this.status];

    this.protocol = params.response.protocol;

    this.requestHeaders = params.response.requestHeaders;
    this.requestHeadersText = params.response.requestHeadersText;

    this.responseHeaders = params.response.headers;
    this.responseHeadersText = params.response.headersText;

    this.fromServiceWorker = params.response.fromServiceWorker;
  }

  fillResponseReceivedExtraInfo(params) {
    this.responseHeaders = params.headers
    if (params.headersText) {
      this.responseHeadersText = params.headersText;
    }
  }

  hasRequest() {
    return this.method && (this.requestHeaders || this.requestHeadersText);
  }

  getResponseHeadersText() {
    return this._getHeadersText(this.responseHeaders, this.responseHeadersText);
  }

  getRequestHeadersText() {
    return this._getHeadersText(this.requestHeaders, this.requestHeadersText);
  }

  _getHeadersText(headersDict, headersText) {
    if (headersText) {
      // condense any headers containing newlines
      return pending.responseHeadersText.replace(/(\n[^:\n]+)+(?=\r\n)/g, function(value) { return value.replace(/\r?\n/g, ", ")});
    }

    let headers = `${this.protocol} ${this.status} ${this.statusText}\r\n`;

    for (let header of this.responseHeadersList) {
       headers += `${header.name}: ${header.value.replace(/\n/g, ', ')}\r\n`;
    }
    headers += `\r\n`;
    return headers;
  }

  getRequestHeadersDict() {
    return this._getHeadersDict(this.requestHeaders, null);
  }

  getResponseHeadersDict() {
    return this._getHeadersDict(this.responseHeaders, this.responseHeadersList);
  }

  _getHeadersDict(headersDict, headersList) {
    if (!headersDict && headersList) {
      headersDict = {};

      for (let header of headersList) {
        headersDict[header.name] = header.value.replace(/\n/g, ', ');
      }
    }

    let headers = null;

    if (!headersDict) {
      return {headers: new Headers(), headersDict: {}};
    }

    try {
      headers = new Headers(headersDict);
    } catch (e) {
      for (let key of Object.keys(headersDict)) {
        if (key[0] === ":") {
          delete headersDict[key];
          continue;
        }
        headersDict[key] = headersDict[key].replace(/\n/g, ', ');
      }
      try {
        headers = new Headers(headersDict);
      } catch (e) {
        console.warn(e);
        headers = new Headers();
      }
    }

    return {headers, headersDict};
  }
}

export { RequestResponseInfo };

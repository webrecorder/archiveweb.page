"use strict";

import { getStatusText } from 'http-status-codes';


// ===========================================================================
class RequestResponseInfo
{
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

  fillResponseReceived(params) {
    // if initial fetch was a 200, but now replacing with 304, don't!
    if (params.response.status == 304 && this.status && this.status != 304 && this.url) {
      return;
    }

    this.url = params.response.url.split("#")[0];

    this._fillResponse(params.response);
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
  }

  fillResponseReceivedExtraInfo(params) {
    this.responseHeaders = params.headers
    if (params.headersText) {
      this.responseHeadersText = params.headersText;
    }
  }

  toDBRecord(payload, pageInfo) {
    // don't save 304 (todo: turn into 'revisit' style entry?)
    // extra check for 206, should already be skipped
    if (this.method === "OPTIONS" || this.status == 304 || this.status === 206) {
      return null;
    }

    if (!this.url || (!this.url.startsWith("https:") && !this.url.startsWith("http:"))) {
      return;
    }

    if (!pageInfo.id) {
      console.log("Skipping No Page Id for: " + this.url);
      return null;
    }

    if (!payload) {
      payload = Buffer.from([]);
    }

    this.ts = new Date().getTime();

    const respHeaders = this.getResponseHeadersDict();
    const reqHeaders = this.getRequestHeadersDict();

    const mime = (respHeaders.headers.get("content-type") || "").split(";")[0];
    const cookie = reqHeaders.headers.get("cookie");

    if (cookie) {
      respHeaders.headersDict["x-wabac-preset-cookie"] = cookie;
    }

    const data = {url: this.url,
                  ts: this.ts,
                  status: this.status,
                  statusText:this.statusText,
                  pageId: pageInfo.id,
                  payload,
                  mime,
                  respHeaders: respHeaders.headersDict,
                  reqHeaders: reqHeaders.headersDict,
                  extraOpts: this.extraOpts
                 };

    if (this.method !== "GET") {
      data.method = this.method;
    }

    if (this.postData) {
      if (this.method === "POST") {
        const contentType = (data.reqHeaders["Content-Type"] || "").split(";", 1)[0];
        let query = null;

        switch (contentType) {
          case "application/x-www-form-urlencoded":
            query = this.postData;
            break;

          case "application/json":
            query = "__wb_json_data=" + this.postData.replace(/\n/g, "");
            break;
        }

        if (query)  {
          data.url += (data.url.indexOf("?") > 0 ? "&" : "?") + query;
          data.method = "GET";
        } else {
          data.postData = this.postData;
        }
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

  getResponseHeadersText(headersDict) {
    let headers = `${this.protocol} ${this.status} ${this.statusText}\r\n`;

    for (const header of Object.keys(this.responseHeaders)) {
       headers += `${header}: ${this.responseHeaders[header].replace(/\n/g, ', ')}\r\n`;
    }
    headers += `\r\n`;
    return headers;
  }

  hasRequest() {
    return this.method && (this.requestHeaders || this.requestHeadersText);
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

      for (const header of headersList) {
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
      for (const key of Object.keys(headersDict)) {
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


function formatHeadersText(headersText) {
  // condense any headers containing newlines
  return headersText.replace(/(\n[^:\n]+)+(?=\r\n)/g, function(value) { return value.replace(/\r?\n/g, ", ")});
}



export { RequestResponseInfo };

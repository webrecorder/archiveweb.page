"use strict";

import { WARCWriterBase } from 'node-warc';
import { CDPRequestInfo } from 'node-warc/lib/requestCapturers';
import { WritableStream } from 'memory-streams';
import { STATUS_CODES } from 'http';

self.recorders = {};

let detachListener = false;

function initCDP(tabId) {
  self.recorders[tabId] = new Recorder(tabId);
  self.recorders[tabId].attach();

  if (!detachListener) {
    chrome.debugger.onDetach.addListener((source, reason) => {
        console.log('Canceled.. Download WARC?');
        if (self.recorders[source.tabId]) {
          self.recorders[source.tabId].download();
        }
      });

    detachListener = true;
  }
}


class Recorder {
  constructor(tabId) {
    this.tabId = tabId;
    this.writer = new BlobWriter();
  }

  attach() {
    chrome.debugger.attach({tabId: this.tabId}, '1.3', () => {
      this.start();
    });
  }

  download() {
    const blob = new Blob([this.writer._warcOutStream.toBuffer()], {"type": "application/octet-stream"});
    const url = URL.createObjectURL(blob);
    console.log(url);
    chrome.downloads.download({"url": url, "filename": "wabacext.warc", "conflictAction": "overwrite", "saveAs": false});
  }

  async start() {
    await this.send("Fetch.enable", {patterns: [{urlPattern: "*", requestStage: "Response"}]});
    await this.send("Network.setCacheDisabled", {cacheDisabled: true});

    chrome.debugger.onEvent.addListener(async (dId, message, params) => {
      switch (message) {
        case "Fetch.requestPaused":
          try {
            await this.handleResponse(params);
          } catch (e) {
            console.log(e);
          }

          try {
            await this.send("Fetch.continueRequest", {requestId: params.requestId});
          } catch (e) {
            console.log("Continue failed for: " + params.url);
            console.log(e);
          }
          break;
      }
    });

    await this.send("Runtime.evaluate", {expression: "window.location.reload()"});
    //chrome.tabs.executeScript(this.tabId, {code: 'window.location.refresh()'});
  }

  noResponseForStatus(status) {
    return (status === 204 || (status >= 300 && status < 400));
  }

  async handleResponse(params) {
    const reqresp = CDPRequestInfo.fromRequest(params);
    reqresp.status = params.responseStatusCode;
    reqresp.responseHeaders = params.responseHeaders;

    let payload = null;

    if (reqresp.status === 206) {
      chrome.tabs.sendMessage(this.tabId, {"msg": "asyncFetch", "req": params.request});
      return;
    }

    if (!this.noResponseForStatus(reqresp.status)) {
      try {
        payload = await this.send("Fetch.getResponseBody", {requestId: params.requestId});

        if (payload.base64Encoded) {
          payload = Buffer.from(payload.body, 'base64')
        } else {
          payload = Buffer.from(payload.body, 'utf8')
        }

      } catch (e) {
        console.log('no buffer for: ' + reqresp.url + " " + reqresp.status);
      }
    }

    if (!payload) {
      payload = Buffer.from([]);
    }

    if (reqresp.hasPostData && !reqresp.postData) {
      try {
        let postRes = await this.send('Network.getRequestPostData', {requestId: reqresp.requestId});
        reqresp.postData = Buffer.from(postRes.postData, 'utf8');
      } catch(e) {
        console.log("Error getting POST data: " + e);
      }
    }

    this.writer.writeRequestResponseRecords(
      reqresp.url, 
      {
        headers: reqresp.serializeRequestHeaders(),
        data: reqresp.postData
      },

      {
        headers: this._serializeResponseHeaders(reqresp),
        data: payload
      }
    );
  }

  _serializeResponseHeaders(reqresp) {
    const statusMsg = STATUS_CODES[reqresp.status];

    let headers = `HTTP/1.1 ${reqresp.status} ${statusMsg}\r\n`;

    let hadCE = false;

    for (let header of reqresp.responseHeaders) {
      if (header.name === "content-encoding") {
        hadCE = true;
        break;
      }
    }

    for (let header of reqresp.responseHeaders) {
      switch (header.name) {
        case "status":
          continue;
      
        case "content-encoding":
          header.name = "x-ignored-content-encoding";
          break;

        case "transfer-encoding":
          header.name = "x-ignored-transfer-encoding";
          break;

        case "content-length":
          if (hadCE) {
            header.name = "x-ignored-content-length";
          }
          break;
      }
      
      headers += `${header.name}: ${header.value}\r\n`;
    }
    headers += `\r\n`;
    return headers;
  }

  async send(command, params) {
    return new Promise((resolve, reject) => {

      const callback = (res) => {
        if (res) {
          resolve(res);
        } else {
          reject(chrome.runtime.lastError.message);
        }
      }

      params = params || null;

      chrome.debugger.sendCommand({tabId: this.tabId}, command, params, callback);
    });
  }
}


// ======================================================
class BlobWriter extends WARCWriterBase {
  constructor() {
    super();
    //this._warcOutStream = new WARCOutStream();
    this._warcOutStream = new WritableStream();
    this.opts = {"gzip": true, "appending": false}

    let now = new Date().toISOString()
    this._now = now.substr(0, now.indexOf('.')) + 'Z'
  }
}

// ======================================================
class WARCOutStream
{
  write(data) {
    console.log(data);
  }
  on() {}
}


export { initCDP };

"use strict";

import { WARCWriterBase } from 'node-warc';
import { CDPRequestInfo } from 'node-warc/lib/requestCapturers';
//import { WritableStream } from 'memory-streams';
import { STATUS_CODES } from 'http';

import { Writable } from 'stream';

self.recorders = {};

function initCDP(tabId) {
  if (!self.recorders[tabId]) {
    self.recorders[tabId] = new Recorder(tabId);
  } else {
    console.log('Resuming Recording on: ' + tabId);
  }

  self.recorders[tabId].attach();
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

    this._onDetach = (tab, reason) => {
      if (this.tabId !== tab.tabId) {
        console.log('wrong tab: ' + tab.tabId);
        console.log(params);
        return;
      }
      console.log('Canceled.. Download WARC?');
      chrome.tabs.sendMessage(this.tabId, {"msg": "stopRecord"});
      this.download();
      
      chrome.debugger.onDetach.removeListener(this._onDetach);
      chrome.debugger.onEvent.removeListener(this._onEvent);
      chrome.tabs.onUpdated.removeListener(this._onTabChanged);
      clearInterval(this._updateId);
    }

    chrome.debugger.onDetach.addListener(this._onDetach);

    //this._onMessageFromTab = (request, sender, sendResponse) => {
    //  if (request.
    //}

    //chrome.runtime.onMessage.addListener(this._onMessageFromTab);

    this._onTabChanged = (tabId, changeInfo, tab) => {
      if (this.tabId === tabId && changeInfo.status === "complete") {
        console.log('Send Start Record');
        chrome.tabs.sendMessage(this.tabId, {"msg": "startRecord", "size": this.writer.getLength()});
      }
    }

    chrome.tabs.onUpdated.addListener(this._onTabChanged);

    this._updateId = setInterval(() => chrome.tabs.sendMessage(this.tabId, {"msg": "update", "size": this.writer.getLength()}), 1000);
  };


  download() {
    const blob = new Blob([this.writer._warcOutStream.toBuffer()], {"type": "application/octet-stream"});
    const url = URL.createObjectURL(blob);
    console.log(url);
    chrome.downloads.download({"url": url, "filename": "wr-ext.warc", "conflictAction": "overwrite", "saveAs": false});
    URL.revokeObjectURL(blob);
  }

  async start() {
    await this.send("Fetch.enable", {patterns: [{urlPattern: "*", requestStage: "Response"}]});
    await this.send("Network.setCacheDisabled", {cacheDisabled: true});

    this._onEvent = async (tab, message, params) => {
      if (this.tabId !== tab.tabId) {
        console.log('wrong tab: ' + tab.tabId);
        console.log(params);
        return;
      }

      switch (message) {
        case "Fetch.requestPaused":
          try {
            await this.handleResponse(params);
          } catch (e) {
            console.log(e);
          }

          try {
            const rw = await this.rewriteResponse(params);

            if (!rw) {
              await this.send("Fetch.continueRequest", {requestId: params.requestId});
            }
          } catch (e) {
            console.log("Continue failed for: " + params.request.url);
            console.log(e);
          }
          break;
      }
    };

    chrome.debugger.onEvent.addListener(this._onEvent);

    await this.send("Runtime.evaluate", {expression: "window.location.reload()"});
    //chrome.tabs.executeScript(this.tabId, {code: 'window.location.refresh()'});
  }

  async rewriteResponse(params) {
    if (params.request.url.indexOf("youtube.com") < 0) {
      return false;
    }

    const ct = this._getContentType(params.responseHeaders);

    if (ct !== "text/html") {
      return false;
    }

    const string = params.payload.toString("utf8");

    if (!string.length) {
      return false;
    }

    function ruleReplace(string) {
      return x => string.replace('{0}', x);
    }

    const youtubeRules = [
      [/ytplayer.load\(\);/, ruleReplace('ytplayer.config.args.dash = "0"; ytplayer.config.args.dashmpd = ""; {0}')],
      [/yt\.setConfig.*PLAYER_CONFIG.*args":\s*{/, ruleReplace('{0} "dash": "0", dashmpd: "", ')],
      [/"player":.*"args":{/, ruleReplace('{0}"dash":"0","dashmpd":"",')],
    ];

    const rw = new BaseRewriter(youtubeRules);

    const newString = rw.rewrite(string);

    const base64Str = new Buffer(newString).toString("base64");

    try {
      await this.send("Fetch.fulfillRequest",
        {"requestId": params.requestId,
         "responseCode": params.responseStatusCode,
         "responseHeaders": params.responseHeaders,
         "body": base64Str
        });
      console.log("Replace succeeded? for: " + params.request.url);
      return true;
    } catch (e) {
      console.log("Fulfill Failed for: " + params.request.url + " " + e);
    }

    return false;

  }

  _getContentType(headers) {
    for (let header of headers) {
      if (header.name === "content-type") {
        return header.value.split(";")[0];
      }
    }

    return null;
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
      setTimeout(() => {
        console.log('Start Async Fetch For: ' + params.request.url);
        chrome.tabs.sendMessage(this.tabId, {"msg": "asyncFetch", "req": params.request});
      }, 500);
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

    console.log("Total: " + this.writer.getLength());
    //chrome.tabs.sendMessage(this.tabId, {"msg": "update", "size": this.writer.getLength()});

    params.payload = payload;
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

  getLength() {
    return this._warcOutStream.length;
  }
}


// ======================================================
class WritableStream extends Writable {
  constructor() {
    super();
    this.length = 0;
  }

  write(chunk, encoding, callback) {
    const res = super.write(chunk, encoding, callback);

    this.length += chunk.length;

    if (!res) {
      this.emit('drain');
    }

    return res;
  }

  _write(chunk, encoding, callback) {
    return this.write(chunk, encoding, callback);
  }

  end(chunk, encoding, callback) {
    const res = super.end(chunk, encoding, callback);
    this.emit('finish');
    return res;
  }

  toBuffer() {
    let buffers = [];

    for (let buffer of this._writableState.buffer) {
      buffers.push(buffer.chunk);
    }
  
    return Buffer.concat(buffers);
  }
}



// ======================================================
class BaseRewriter
{
  constructor(rules) {
    this.rules = rules;
    this.compileRules();
  }

  compileRules() {
    let rxBuff = '';

    for (let rule of this.rules) {
      if (rxBuff) {
        rxBuff += "|";
      }
      rxBuff += `(${rule[0].source})`;
    }

    const rxString = `(?:${rxBuff})`;

    this.rx = new RegExp(rxString, 'gm');
  }

  doReplace(params) {
    const offset = params[params.length - 2];
    const string = params[params.length - 1];

    for (let i = 0; i < this.rules.length; i++) {
      const curr = params[i];
      if (!curr) {
        continue;
      }

      const result = this.rules[i][1].call(this, curr, offset, string);
      if (result) {
        return result;
      }
    }
  }

  rewrite(text) {
    return text.replace(this.rx, (match, ...params) => this.doReplace(params));
  }
}



export { initCDP };

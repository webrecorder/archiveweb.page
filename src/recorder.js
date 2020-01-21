"use strict";

import { WARCWriterBase } from 'node-warc';
import { CDPRequestInfo } from 'node-warc/lib/requestCapturers';
//import { WritableStream } from 'memory-streams';
import { STATUS_CODES } from 'http';

import { Writable } from 'stream';
import prettyBytes from 'pretty-bytes';

self.recorders = {};

const DEBUG = false;

function ruleReplace(string) {
  return x => string.replace('{0}', x);
}

function repl(string) {
  return x => string;
}

const RW_RULES = [
  {
    contains: "youtube.com",
    rxRules: [
      [/ytplayer.load\(\);/, ruleReplace('ytplayer.config.args.dash = "0"; ytplayer.config.args.dashmpd = ""; {0}')],
      [/yt\.setConfig.*PLAYER_CONFIG.*args":\s*{/, ruleReplace('{0} "dash": "0", dashmpd: "", ')],
      [/"player":.*"args":{/, ruleReplace('{0}"dash":"0","dashmpd":"",')],
    ]
  },
  {
    contains: "vimeo.com/video",
    rxRules: [
      [/\"dash\"[:]/, repl('"__dash":')],
      [/\"hls\"[:]/, repl('"__hls":')],
    ]
  }
];




function initCDP(tabId) {
  if (!self.recorders[tabId]) {
    self.recorders[tabId] = new Recorder({"tabId": tabId});
  } else {
    console.log('Resuming Recording on: ' + tabId);
  }

  self.recorders[tabId].attach();
}

// ===========================================================================
class Recorder {
  constructor(debuggee, tabId) {
    this.debuggee = debuggee;
    this.tabId = debuggee.tabId || tabId;
    this.writer = new BlobWriter();
    this.pendingRequests = null;

    this._promises = {};
    this.id = 1;

    this.sessions = {};
  }

  attach() {
    console.log('chrome.debugger: Attempting attach to: ' + JSON.stringify(this.debuggee));
    chrome.debugger.attach(this.debuggee, '1.3', () => {
      this.start();
    });

    this._onDetach = (tab, reason) => {
      if (this.tabId !== tab.tabId && this.targetId != tab.targetId) {
        console.log('wrong tab: ' + tab.tabId);
        return;
      }
      console.log('Canceled... Download WARC?');
      chrome.tabs.sendMessage(this.tabId, {"msg": "stopRecord"});
      this.download();
      
      chrome.debugger.onDetach.removeListener(this._onDetach);
      chrome.debugger.onEvent.removeListener(this._onEvent);
      chrome.tabs.onUpdated.removeListener(this._onTabChanged);
      clearInterval(this._updateId);
      this.pendingRequests = null;
    }

    this.pendingRequests = {};

    chrome.debugger.onDetach.addListener(this._onDetach);

    //this._onMessageFromTab = (request, sender, sendResponse) => {
    //  if (request.
    //}

    //chrome.runtime.onMessage.addListener(this._onMessageFromTab);

    this._onTabChanged = (tabId, changeInfo, tab) => {
      if (this.tabId === tabId && changeInfo.status === "complete") {
        chrome.tabs.sendMessage(this.tabId, {"msg": "startRecord", "size": prettyBytes(this.writer.getLength())});
      }
    }

    chrome.tabs.onUpdated.addListener(this._onTabChanged);

    this._updateId = setInterval(() => chrome.tabs.sendMessage(this.tabId, {"msg": "update", "size": prettyBytes(this.writer.getLength())}), 3000);
  };


  download() {
    const blob = new Blob([this.writer._warcOutStream.toBuffer()], {"type": "application/octet-stream"});
    const url = URL.createObjectURL(blob);
    //console.log(url);
    chrome.downloads.download({"url": url, "filename": "wr-ext.warc", "conflictAction": "overwrite", "saveAs": false});
    URL.revokeObjectURL(blob);
  }

  async start() {
    console.log('chrome.debugger attached to: ' + JSON.stringify(this.debuggee));
    this._onEvent = async (tab, message, params) => {
      if (this.tabId !== tab.tabId && this.targetId != tab.targetId) {
        console.log('wrong tab: ' + tab.tabId);
        console.log(params);
        return;
      }

      await this.processMessage(message, params, []);
    };

    chrome.debugger.onEvent.addListener(this._onEvent);

    await this.sessionInit(null);

    await this.send("Runtime.evaluate", {expression: "window.location.reload()"});
  }

  async sessionInit(sessions) {
    try {
      //await this.send("ServiceWorker.stopAllWorkers", null, sessions);
      await this.send('Target.setAutoAttach', {autoAttach: true, waitForDebuggerOnStart: true, flatten: false }, sessions);
      await this.send("Fetch.enable", {patterns: [{urlPattern: "*", requestStage: "Response"}]}, sessions);
      await this.send("Network.enable", null, sessions);
      await this.send("Network.setCacheDisabled", {cacheDisabled: true}, sessions);
    } catch (e) {
      console.log("Session Init Error: " + e);
    }
  }

  async processMessage(method, params, sessions) {
    switch (method) {
      case "Target.attachedToTarget":
        sessions.push(params.sessionId);
        console.log("Target Attached: " + params.targetInfo.type + " " + params.targetInfo.url);
        this.sessions[params.sessionId] = {"id": 1, "type": params.targetInfo.type};
        //self.recorders[params.targetInfo.targetId] = new Recorder({targetId: params.targetInfo.targetId}, this.tabId);
        //self.recorders[params.targetInfo.targetId].attach();
        

        await this.sessionInit(sessions);
        await this.send('Runtime.runIfWaitingForDebugger', null, sessions);
        break;

      case "Target.detachedFromTarget":
        delete this.sessions[params.sessionId];
        break;

      case "Target.receivedMessageFromTarget":
        if (!this.sessions[params.sessionId]) {
          console.log("no such session: " + params.sessionId);
          console.log(params);
          return;
        }
        sessions.push(params.sessionId);
        this.receiveMessageFromTarget(params, sessions);
        break;

      case "Network.responseReceived":
        if (params.response && params.response.fromServiceWorker) {

          if (!this.pendingRequests[params.requestId]) {
            this.pendingRequests[params.requestId] = {};
          }

          const pending = this.pendingRequests[params.requestId];

          pending.reqresp = CDPRequestInfo.fromResponse(params);

          console.log("Network.responseReceived: " + params.response.url + " " + sessions.length);
        }
        break;

      case "Network.loadingFinished":
        this.handleLoadingFinished(params);
        break;

      case "Network.responseReceivedExtraInfo":
        if (!this.pendingRequests[params.requestId]) {
          this.pendingRequests[params.requestId] = {};
        }

        if (params.headersText) {
          this.pendingRequests[params.requestId].headersText = params.headersText;
        } else if (params.headers) {
          this.pendingRequests[params.requestId].headers = params.headers
        }
        break;

      case "Fetch.requestPaused":
        console.log('Fetch.requestPaused: ' + params.request.url);
        this.handlePaused(params, sessions);
        break;

      default:
        //console.log("Unhandled: " + method);
    }
  }

  receiveMessageFromTarget(params, sessions) {
    const nestedParams = JSON.parse(params.message);

    if (nestedParams.id != undefined) {
      const promise = this._promises[nestedParams.id];
      if (promise) {
        if (DEBUG) {
          console.log("RECV " + promise.method + " " + params.message);
        }
        if (nestedParams.error) {
          promise.reject(nestedParams.error);
        } else {
          promise.resolve(nestedParams.result);
        }
        delete this._promises[nestedParams.id];
      }
    } else if (nestedParams.params != undefined) {
      //console.log("RECV MSG " + nestedParams.method + " " + nestedParams.message);
      this.processMessage(nestedParams.method, nestedParams.params, sessions);
    }
  }

  async handlePaused(params, sessions) {
    try {
      await this.handleFetchResponse(params, sessions);
    } catch (e) {
      console.log(e);
    }

    try {
      const rw = await this.rewriteResponse(params, sessions);

      if (!rw) {
        await this.send("Fetch.continueRequest", {requestId: params.requestId}, sessions);
      }
    } catch (e) {
      console.log("Continue failed for: " + params.request.url);
      console.log(e);
    }
  }

  async rewriteResponse(params, sessions) {
    let rxRules = null;

    for (let rule of RW_RULES) {
      if (params.request.url.indexOf(rule.contains) >= 0) {
        rxRules = rule.rxRules;
        break;
      }
    }

    if (!rxRules) {
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

    const rw = new BaseRewriter(rxRules);

    const newString = rw.rewrite(string);

    const base64Str = new Buffer(newString).toString("base64");

    try {
      await this.send("Fetch.fulfillRequest",
        {"requestId": params.requestId,
         "responseCode": params.responseStatusCode,
         "responseHeaders": params.responseHeaders,
         "body": base64Str
        }, sessions);
      console.log("Replace succeeded? for: " + params.request.url);
      return true;
    } catch (e) {
      console.log("Fulfill Failed for: " + params.request.url + " " + e);
    }

    return false;

  }

  _getContentType(headers) {
    for (let header of headers) {
      if (header.name.toLowerCase() === "content-type") {
        return header.value.split(";")[0];
      }
    }

    return null;
  }

  noResponseForStatus(status) {
    return (status === 204 || (status >= 300 && status < 400));
  }

  async handleLoadingFinished(params, sessions) {
    const pending = this.pendingRequests[params.requestId];

    if (!pending || !pending.reqresp) {
      return;
    }

    await this.commitRecords(params, pending.reqresp, sessions, false);
  }

  async handleFetchResponse(params, sessions) {
    const reqresp = CDPRequestInfo.fromRequest(params);
    reqresp.status = params.responseStatusCode;
    reqresp.responseHeadersList = params.responseHeaders;

    if (reqresp.status === 206) {
      setTimeout(() => {
        console.log('Start Async Fetch For: ' + params.request.url);
        chrome.tabs.sendMessage(this.tabId, {"msg": "asyncFetch", "req": params.request});
      }, 500);
      return;
    }

    params.payload = await this.commitRecords(params, reqresp, sessions, true);
  }

  async commitRecords(params, reqresp, sessions, isFetch) {
    let payload = null;

    const networkId = isFetch ? params.networkId : params.requestId;

    if (!this.noResponseForStatus(reqresp.status)) {
      try {
        const method = isFetch ? "Fetch.getResponseBody" : "Network.getResponseBody"; 
        payload = await this.send(method, {requestId: params.requestId}, sessions);

        if (payload.base64Encoded) {
          payload = Buffer.from(payload.body, 'base64')
        } else {
          payload = Buffer.from(payload.body, 'utf8')
        }

      } catch (e) {
        console.log(e);
        console.log('no buffer for: ' + reqresp.url + " " + reqresp.status);
      }
    }

    if (!payload) {
      payload = Buffer.from([]);
    }

    if (reqresp.hasPostData && !reqresp.postData) {
      try {
        let postRes = await this.send('Network.getRequestPostData', {requestId: reqresp.requestId}, sessions);
        reqresp.postData = Buffer.from(postRes.postData, 'utf8');
      } catch(e) {
        console.log("Error getting POST data: " + e);
      }
    }

    const url = reqresp.url.split("#")[0];

    if (reqresp.method && reqresp._getReqHeaderObj()) {
      this.writer.writeRequestResponseRecords(
        url, 
        {
          headers: reqresp.serializeRequestHeaders(),
          data: reqresp.postData
        },

        {
          headers: this._serializeResponseHeaders(reqresp, networkId),
          data: payload
        }
      );
    } else {
      this.writer.writeResponseRecord(
        url,
        this._serializeResponseHeaders(reqresp, networkId),
        payload
      ); 
    }

    console.log("Total: " + this.writer.getLength());
    //chrome.tabs.sendMessage(this.tabId, {"msg": "update", "size": this.writer.getLength()});
    return payload;
  }

  _serializeResponseHeaders(reqresp, networkId) {
    const pending = this.pendingRequests[networkId];

    if (pending) {
      delete this.pendingRequests[networkId];
      if (pending.responseHeadersText) {
        // condense any headers containing newlines
        return pending.responseHeadersText.replace(/(\n[^:\n]+)+(?=\r\n)/g, function(value) { return value.replace(/\r?\n/g, ", ")});
      }
      if (pending.responseHeaders) {
        reqresp.responseHeaders = pending.responseHeaders;
        return reqresp.serializeResponseHeaders();
      }
    }

    if (reqresp.responseHeaders) {
      return reqresp.serializeResponseHeaders();
    }

    //console.log('no pending for: ' + reqresp.url + " " + networkId);
    //console.log(pending);

    const statusMsg = STATUS_CODES[reqresp.status];

    let headers = `HTTP/1.1 ${reqresp.status} ${statusMsg}\r\n`;

    let hadCE = false;

    for (let header of reqresp.responseHeadersList) {
      if (header.name === "content-encoding") {
        hadCE = true;
        break;
      }
    }

    for (let header of reqresp.responseHeadersList) {
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

  send(method, params, sessions) {
    let promise = null;

    params = params || null;
    sessions = sessions || [];

    for (let i = sessions.length - 1; i >= 0; i--) {
      //const id = this.sessions[sessionId].id++;
      const id = this.id++;

      const p = new Promise((resolve, reject) => {
        this._promises[id] = {resolve, reject, method};
      });

      if (!promise) {
        promise = p;
      }

      //let message = params ? {id, method, params} : {id, method};
      const message = JSON.stringify({id, method, params});

      //const sessionId = sessions[sessions.length - 1 - i];
      const sessionId = sessions[i];

      params = {sessionId, message};
      method = 'Target.sendMessageToTarget';
    }

    let prr;
    const p = new Promise((resolve, reject) => {
      prr = {resolve, reject, method};
    });

    if (!promise) {
      promise = p;
    }

    const callback = (res) => {
      if (res) {
        prr.resolve(res);
      } else {
        prr.reject(chrome.runtime.lastError.message);
      }
    }

    if (DEBUG) {
      console.log("SEND " + JSON.stringify({command: method, params}));
    }

    chrome.debugger.sendCommand(this.debuggee, method, params, callback);
    return promise;
  }
}


// ===========================================================================
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


// ===========================================================================
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


// ===========================================================================
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

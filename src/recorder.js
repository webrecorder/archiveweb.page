"use strict";

import { WARCWriterBase } from 'node-warc';
import { CDPRequestInfo } from 'node-warc/lib/requestCapturers';

import { STATUS_CODES } from 'http';

import { Writable } from 'stream';
import prettyBytes from 'pretty-bytes';

import { fuzzyMatcher } from 'wabac/src/fuzzymatcher';

import { baseRules as baseDSRules } from 'wabac/src/rewrite'; 


// ===========================================================================
self.recorders = {};

const DEBUG = false;


// ===========================================================================
function initCDP(tabId) {
  if (!self.recorders[tabId]) {
    self.recorders[tabId] = new Recorder({"tabId": tabId});
  } else {
    //console.log('Resuming Recording on: ' + tabId);
  }

  self.recorders[tabId].attach();
}


// ===========================================================================
class Recorder {
  constructor(debuggee, tabId) {
    this.debuggee = debuggee;
    this.tabId = debuggee.tabId || tabId;
    this.writer = new BlobWriter();
    this.writer = new CacheWriter("wr-ext.cache");
    this.pendingRequests = null;

    this.running = false;

    this.frameId = null;
    this.frameUrl = null;
    this.historyMap = {};

    this.pages = null;

    this._promises = {};

    this.id = 1;
    this.sessions = {};
  }

  attach() {
    let lastTitle;

    this._onTabChanged = (tabId, changeInfo, tab) => {
      if (this.tabId === tabId && changeInfo.status === "complete" && this.running) {

        if (tab.title !== lastTitle) {
          this.pages.push({url: tab.url, title: tab.title, date: new Date().toISOString()});
          lastTitle = tab.title;

          chrome.storage.local.set({"pages": this.pages});
        }

        chrome.tabs.sendMessage(this.tabId, {"msg": "startRecord", "size": prettyBytes(this.writer.getLength())});
      }
    }

    this._onDetach = (tab, reason) => {
      if (this.tabId !== tab.tabId && this.targetId != tab.targetId) {
        console.warn('wrong tab: ' + tab.tabId);
        return;
      }
      //console.log('Canceled... Download WARC?');
      chrome.tabs.sendMessage(this.tabId, {"msg": "stopRecord"});
      //this.download();
      
      chrome.debugger.onDetach.removeListener(this._onDetach);
      chrome.debugger.onEvent.removeListener(this._onEvent);
      chrome.tabs.onUpdated.removeListener(this._onTabChanged);

      clearInterval(this._updateId);
      this.pendingRequests = null;

      this.running = false;
    }

    this.running = true;

    this.pendingRequests = {};

    chrome.debugger.onDetach.addListener(this._onDetach);

    chrome.tabs.onUpdated.addListener(this._onTabChanged);

    chrome.debugger.attach(this.debuggee, '1.3', () => {
      this.start();
    });

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
    this.pages = await this._loadPages();

    this._onEvent = async (tab, message, params) => {
      if (this.tabId !== tab.tabId && this.targetId != tab.targetId) {
        console.warn('wrong tab: ' + tab.tabId);
        console.warn(params);
        return;
      }

      await this.processMessage(message, params, []);
    };

    chrome.debugger.onEvent.addListener(this._onEvent);

    await this.sessionInit([]);

    await this.send("Runtime.evaluate", {expression: "window.location.reload()"});
  }

  _loadPages() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(["pages"], (result) => {
        if (result.pages === undefined) {
          result.pages = [];
          chrome.storage.local.set(result);
        }
        resolve(result.pages);
      });
    });
  }

  async sessionInit(sessions) {
    try {
      await this.send('Target.setAutoAttach', {autoAttach: true, waitForDebuggerOnStart: true, flatten: false }, sessions);
      await this.send("Fetch.enable", {patterns: [{urlPattern: "*", requestStage: "Response"}]}, sessions);
      //await this.send("Fetch.enable", {patterns: [{urlPattern: "*", requestStage: "Response"}, {urlPattern: "*", requestStage: "Request"}]}, sessions);
      await this.send("Network.enable", null, sessions);

      if (!sessions.length) {
        await this.send("Page.enable");

        //await this.send("Debugger.enable");
        //await this.send("DOM.enable");
        //await this.send("DOMDebugger.setEventListenerBreakpoint", {'eventName': 'beforeunload'});
      }
      //await this.send("Network.setCacheDisabled", {cacheDisabled: true}, sessions);
    } catch (e) {
      console.warn("Session Init Error: " + e);
    }
  }

  async processMessage(method, params, sessions) {
    switch (method) {
      case "Target.attachedToTarget":
        sessions.push(params.sessionId);
        //console.warn("Target Attached: " + params.targetInfo.type + " " + params.targetInfo.url);
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
          console.warn("no such session: " + params.sessionId);
          console.warn(params);
          return;
        }
        sessions.push(params.sessionId);
        this.receiveMessageFromTarget(params, sessions);
        break;

      case "Network.responseReceived":
        //console.warn("Network Response: " + params.response.url);
        if (params.response) {
          if (!this.pendingRequests[params.requestId]) {
            this.pendingRequests[params.requestId] = {};
          }

          const pending = this.pendingRequests[params.requestId];

          pending.reqresp = CDPRequestInfo.fromResponse(params);

          //console.log("Network.responseReceived: " + params.response.url + " " + sessions.length);
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
        let continued = false;

        try {
          if ((params.responseStatusCode || params.responseErrorReason)) {
            continued = await this.handlePaused(params, sessions);
          }
        } catch(e) {
          console.warn(e);
        }

        if (!continued) {
          await this.send("Fetch.continueRequest", {requestId: params.requestId }, sessions);
        }
        break;

      case "Page.frameNavigated":
        if (!params.frame.parentId) {
          //console.log("New Page: " + params.frame.url + " " + params.frame.id);
          if (this.frameId != params.frame.id) {
            this.historyMap = {};
          }

          this.frameId = params.frame.id;
          this.frameUrl = params.frame.url;
        }
        break;

      case "Page.loadEventFired":
        {
          const result = await this.send("Page.getNavigationHistory", null, sessions);
          const id = result.currentIndex;
          if (id === result.entries.length - 1 && this.historyMap[id] !== result.entries[id].url) {
            console.log("New Page: " + JSON.stringify(result.entries[id]));
            this.historyMap[id] = result.entries[id].url;
          }
        }
        break;

      case "Page.navigatedWithinDocument":
        if (!sessions.length) {
          const result = await this.send("Page.getNavigationHistory", null, sessions);
          const id = result.currentIndex;
          if (id === result.entries.length - 1 && this.historyMap[id] !== result.entries[id].url) {
            console.log("New History Entry: " + JSON.stringify(result.entries[id]));
            this.historyMap[id] = result.entries[id].url;
          }
        }
        break;

      case "Debugger.paused":
        console.log("Paused for full text!");

        try {
          const domText = await this.send('DOM.getDocument', {'depth': -1, 'pierce': true});
          console.log(JSON.stringify(domText).length);
        } catch(e) {
          console.log(e);
        }

        await this.send("Debugger.resume", null, sessions);
        break;

      default:
        //if (!method.startsWith("Network.")) {
        //  console.log(method);
        //}
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
    let payload = null;

    try {
      payload = await this.handleFetchResponse(params, sessions);
    } catch (e) {
      console.warn(e);
    }

    try {
      return await this.rewriteResponse(params, payload, sessions);
    } catch (e) {
      console.error("Continue failed for: " + params.request.url);
      console.error(e);
    }

    return false;
  }

  async rewriteResponse(params, payload, sessions) {
    if (!payload) {
      return false;
    }

    const rw = baseDSRules.getRewriter(params.request.url);

    if (rw === baseDSRules.defaultRewriter) {
      return false;
    }

    const ct = this._getContentType(params.responseHeaders);

    if (ct !== "text/html") {
      return false;
    }

    const string = payload.toString("utf-8");

    if (!string.length) {
      return false;
    }

    console.log("Rewrite Response for: " + params.request.url);

    const newString = rw.rewrite(string);

    const base64Str = new Buffer(newString).toString("base64");

    try {
      await this.send("Fetch.fulfillRequest",
        {"requestId": params.requestId,
         "responseCode": params.responseStatusCode,
         "responseHeaders": params.responseHeaders,
         "body": base64Str
        }, sessions);
      //console.log("Replace succeeded? for: " + params.request.url);
      return true;
    } catch (e) {
      console.warn("Fulfill Failed for: " + params.request.url + " " + e);
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
    delete this.pendingRequests[params.requestId];

    if (!pending || pending.fetch || !pending.reqresp) {
      return;
    }

    return await this.commitRecords(params, pending.reqresp, sessions,
              pending, "Network.getResponseBody");
  }

  async handleFetchResponse(params, sessions) {
    const pending = this.pendingRequests[params.networkId];
    if (pending) {
      pending.fetch = true;
    }
    //delete this.pendingRequests[params.networkId];

    const reqresp = CDPRequestInfo.fromRequest(params);
    reqresp.status = params.responseStatusCode;
    reqresp.responseHeadersList = params.responseHeaders;

    return await this.commitRecords(params, reqresp, sessions,
              pending, "Fetch.getResponseBody");
  }

  async commitRecords(params, reqresp, sessions, pending, method) {
    let payload = null;

    if (!reqresp.url.startsWith("https:") && !reqresp.url.startsWith("http:")) {
      return null;
    }

    if (reqresp.status === 206) {
      await sleep(500);
      //console.log('Start Async Fetch For: ' + params.request.url);
      chrome.tabs.sendMessage(this.tabId, {"msg": "asyncFetch", "req": params.request});
      return null;
    }

    if (!this.noResponseForStatus(reqresp.status)) {
      try {
        payload = await this.send(method, {requestId: params.requestId}, sessions);

        if (payload.base64Encoded) {
          payload = Buffer.from(payload.body, 'base64')
        } else {
          payload = Buffer.from(payload.body, 'utf-8')
        }

      } catch (e) {
        console.warn(e);
        console.warn('no buffer for: ' + reqresp.url + " " + reqresp.status);
      }
    }

    if (reqresp.hasPostData && !reqresp.postData) {
      try {
        let postRes = await this.send('Network.getRequestPostData', {requestId: reqresp.requestId}, sessions);
        reqresp.postData = Buffer.from(postRes.postData, 'utf-8');
      } catch(e) {
        console.warn("Error getting POST data: " + e);
      }
    }

    const url = reqresp.url.split("#")[0];

    this.writer.processRequestResponse(url, reqresp, pending, payload);

    //console.log("Total: " + this.writer.getLength());
    //chrome.tabs.sendMessage(this.tabId, {"msg": "update", "size": this.writer.getLength()});
    return payload;
  }

  send(method, params = null, sessions = []) {
    let promise = null;

    //params = params || null;
    //sessions = sessions || [];

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
    this._warcOutStream = new VirtWritableStream();
    this.opts = {"gzip": true, "appending": false}

    let now = new Date().toISOString()
    this._now = now.substr(0, now.indexOf('.')) + 'Z'
  }

  getLength() {
    return this._warcOutStream.getLength();
  }

  processRequestResponse(url, reqresp, pending, payload) {
    const responseHeaders = responseHeadersToText(reqresp, pending);

    if (!payload) {
      payload = Buffer.from([]);
    }

    if (reqresp.method && reqresp._getReqHeaderObj()) {
      this.writeRequestResponseRecords(
        url, 
        {
          headers: reqresp.serializeRequestHeaders(),
          data: reqresp.postData
        },

        {
          headers: responseHeaders,
          data: payload
        }
      );
    } else {
      this.writeResponseRecord(
        url,
        responseHeaders,
        payload
      ); 
    }
  }
}


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

      console.log('cached: ' + url);

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
class VirtWritableStream extends Writable {
  constructor() {
    super();
    this.chunks = [];

    this.writer = window.virtualWriter;

    this.writer.addEventListener("writeend", () => {
      this._writeNext();
    });

    this.writer.addEventListener("error", (err) => {
      console.warn("Wrtier Err: " + err);
    });
  }

  getLength() {
    return this.writer.length;
  }

  write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this._writeNext();
    return true;
  }

  _writeNext() {
    if (this.writer.readyState === this.writer.WRITING) {
      return;
    }

    if (!this.chunks.length) {
      this.emit('drain');
      return;
    }

    const chunk = this.chunks.shift();

    const res = this.writer.write(new Blob([chunk], {type: "application/octet-stream"}));

    this.emit('drain');
  }

  end(chunk, encoding, callback) {
    this.write(chunk, encoding, callback);
    this.emit('finish');
    return this;
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


// ===========================================================================
function sleep(time) {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

// ===========================================================================
function responseHeadersToText(reqresp, pending) {
  if (pending) {
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

  const statusMsg = STATUS_CODES[reqresp.status];

  let headers = `HTTP/1.1 ${reqresp.status} ${statusMsg}\r\n`;

  for (let header of reqresp.responseHeadersList) {
     headers += `${header.name}: ${header.value.replace('\n', ', ')}\r\n`;
  }
  headers += `\r\n`;
  return headers;
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



export { initCDP };

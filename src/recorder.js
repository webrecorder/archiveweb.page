"use strict";

import prettyBytes from 'pretty-bytes';

import { STATUS_CODES } from 'http';

import { baseRules as baseDSRules } from 'wabac/src/rewrite'; 

import { CacheWriter } from './cachewriter';
import { WARCWriter } from './warcwriter';


// ===========================================================================
self.recorders = {};

const DEBUG = false;


// ===========================================================================
class Recorder {
  static startRecorder(tabId) {
    if (!self.recorders[tabId]) {
      self.recorders[tabId] = new Recorder({"tabId": tabId});
    } else {
      //console.log('Resuming Recording on: ' + tabId);
    }

    self.recorders[tabId].attach();
  }

  constructor(debuggee, tabId) {
    this.debuggee = debuggee;
    this.tabId = debuggee.tabId || tabId;
    //this.writer = new BlobWriter();
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

    if (this.running) {
      console.warn("Already Attached!");
      return;
    }

    this._onTabChanged = (tabId, changeInfo, tab) => {
      if (this.tabId === tabId && changeInfo.status === "complete" && this.running) {

        if (tab.title !== lastTitle) {
          this.pages.push({url: tab.url, title: tab.title, date: new Date().toISOString()});
          lastTitle = tab.title;

          chromeStoreSet("pages", this.pages);
        }

        this.updateFileSize();
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

    this._updateId = setInterval(() => this.updateFileSize(), 3000);
  };


  download() {
    const blob = new Blob([this.writer._warcOutStream.toBuffer()], {"type": "application/octet-stream"});
    const url = URL.createObjectURL(blob);
    //console.log(url);
    chrome.downloads.download({"url": url, "filename": "wr-ext.warc", "conflictAction": "overwrite", "saveAs": false});
    URL.revokeObjectURL(blob);
  }

  async updateFileSize() {
    const size = this.writer.getLength();
    chrome.tabs.sendMessage(this.tabId, {"msg": "startRecord", "size": prettyBytes(size)});
  }

  async start() {
    this.pages = (await chromeStoreLoad("pages")) || [];

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

  pendingReqResp(requestId) {
    if (!this.pendingRequests[requestId]) {
      this.pendingRequests[requestId] = new RequestResponseInfo(requestId);
    } else if (requestId !== this.pendingRequests[requestId].requestId) {
      console.error("Wrong Req Id!");
    }

    return this.pendingRequests[requestId];
  }

  removeReqResp(requestId) {
    const reqresp = this.pendingRequests[requestId];
    delete this.pendingRequests[requestId];
    return reqresp;
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
          this.pendingReqResp(params.requestId).fillResponseReceived(params);
        }
        break;

      case "Network.loadingFinished":
        this.handleLoadingFinished(params);
        break;

      case "Network.responseReceivedExtraInfo":
        this.pendingReqResp(params.requestId).fillResponseReceivedExtraInfo(params);
        break;

      case "Network.requestWillBeSent":
        this.pendingReqResp(params.requestId).fillRequest(params);
        //this.pendingReqResp(params.requestId).method = params.request.method;
        //console.log(params.request);
        break;

      case "Fetch.requestPaused":
        //console.log('Fetch.requestPaused: ' + params.request.url);
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

          this.initPage(params);
        }
        break;

      case "Page.loadEventFired":
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

  async initPage(params) {
    // New Pagee Setup WIP
    const result = await this.send("Page.getNavigationHistory");
    const id = result.currentIndex;

    // allow duplicate pages for now
    //if (id !== result.entries.length - 1 || this.historyMap[id] === result.entries[id].url) {
    //  return;
    //}

    //console.log("New Page: " + JSON.stringify(result.entries[id]));

    this.historyMap[id] = result.entries[id].url;
    this.sessionId = this.frameId + "-" + result.entries[id].id;
    //this.pageUrl = result.entries[id].url;
    this.pageDate = new Date();
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
    const reqresp = this.removeReqResp(params.requestId);
    if (!reqresp || reqresp.fetch) {
      return;
    }

    return await this.commitRecords(params, reqresp, sessions,
              "Network.getResponseBody");
  }

  async handleFetchResponse(params, sessions) {
    const reqresp = this.pendingReqResp(params.networkId);
    reqresp.fillFetchRequestPaused(params);

    return await this.commitRecords(params, reqresp, sessions,
              "Fetch.getResponseBody");
  }

  async commitRecords(params, reqresp, sessions, method) {
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
        console.warn('no buffer for: ' + reqresp.url + " " + reqresp.status + " " + reqresp.requestId);
        console.warn(e);
        return null;
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

    // TODO: this should be atomic!
    const currSize = (await chromeStoreLoad("archiveSize")) || 0;
    chromeStoreSet("archiveSize", currSize + payload.length);

    this.writer.processRequestResponse(reqresp, payload, this.sessionId);

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
class RequestResponseInfo
{
  constructor(requestId) {
    this.requestId = requestId;

    this.date = null;

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

    this.fetch = false;
  }

  fillRequest(params) {
    //if (this.url) return;

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
    this.url = params.response.url.split("#")[0];

    this.status = params.response.status;
    this.statusText = params.response.statusText;
    this.protocol = params.response.protocol;

    this.requestHeaders = params.response.requestHeaders;
    this.requestHeadersText = params.response.requestHeadersText;

    this.responseHeaders = params.response.headers;
    this.responseHeadersText = params.response.headersText;
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
       headers += `${header.name}: ${header.value.replace('\n', ', ')}\r\n`;
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

    return {headers, headersDict};
  }
}


// ===========================================================================
function sleep(time) {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

// ===========================================================================
function chromeStoreLoad(prop) {
  return new Promise((resolve) => {
    chrome.storage.local.get([prop], (result) => {
      resolve(result[prop] || null);
    });
  });
}

function chromeStoreSet(prop, value) {
  const set = {};
  set[prop] = value;
  return chrome.storage.local.set(set, (e) => { if (e) console.log(e); });
}



export { Recorder };

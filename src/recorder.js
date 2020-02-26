"use strict";

import prettyBytes from 'pretty-bytes';

import { RequestResponseInfo } from './requestresponseinfo.js';

import { baseRules as baseDSRules } from 'wabac/src/rewrite'; 
import { rewriteDASH, rewriteHLS } from 'wabac/src/rewrite/rewriteVideo'; 

import { sleep, incrArchiveSize } from './utils';

import { fulltext, parseTextFromDom } from './fulltext';


// ===========================================================================
self.recorders = {};

const DEBUG = false;

const CONTENT_SCRIPT_URL = chrome.runtime.getURL("content.js");

const hasInfoBar = (self.chrome && self.chrome.braveWebrecorder != undefined);


// ===========================================================================
class Recorder {
  static startRecorder(tabId, writer) {
    if (!self.recorders[tabId]) {
      self.recorders[tabId] = new Recorder({"tabId": tabId}, writer);
    } else {
      //console.log('Resuming Recording on: ' + tabId);
    }

    self.recorders[tabId].attach();
  }

  static async stopAll() {
    for (const tabId of Object.keys(self.recorders)) {
      if (self.recorders[tabId].running) {
        await self.recorders[tabId].detach();
      }
    }
  }

  static async stopForPage(pageId) {
    for (const tabId of Object.keys(self.recorders)) {
      if (self.recorders[tabId].running && self.recorders[tabId].pageInfo.id === pageId) {
        await self.recorders[tabId].detach();
        return true;
      }
    }

    return false;
  }

  constructor(debuggee, writer) {
    this.debuggee = debuggee;
    this.tabId = debuggee.tabId;

    //this.writer = new BlobWriter();
    //this.writer = new CacheWriter("wr-ext.cache");
    this.writer = writer

    this.pendingRequests = null;

    this.running = false;

    this.frameId = null;
    this.pageCount = 0;
    this.pageInfo = {size: 0};
    this.size = 0;

    this.historyMap = {};

    this._promises = {};

    this._pdfTextDone = null;
    this.pdfURL = null;

    this.id = 1;
    this.sessions = {};

    this._onDetached = (tab, reason) => {
      if (tab && this.tabId !== tab.tabId) {
        return;
      }

      this._stop();

      // target closed, delete recorder as this tab will not be used again
      if (reason === "target_closed") {
        delete self.recorders[this.tabId];
      }
    }

    this._onCanceled = (details) => {
      if (details && details.tabId == this.tabId) {
        this.detach();
      }
    }

    this._onEvent = async (tab, message, params) => {
      if (this.tabId === tab.tabId) {
        await this.processMessage(message, params, []);
      }
    }
  }

  async detach() {
    const domNodes = await this.getFullText();

    const p = new Promise((resolve, reject) => {
      chrome.debugger.detach(this.debuggee, () => {
        if (chrome.runtime.lastError) {
          console.warn(chrome.runtime.lastError.message);
        }
        resolve();
      });
    });

    await p;
    await this._stop(domNodes);
  }

  async _stop(domNodes = null) {
    await this.commitPage(this.pageInfo, domNodes, true);

    chrome.tabs.sendMessage(this.tabId, {"msg": "stopRecord"});
    
    chrome.debugger.onDetach.removeListener(this._onDetached);
    chrome.debugger.onEvent.removeListener(this._onEvent);

    if (hasInfoBar) {
      chrome.braveWebrecorder.onCanceled.removeListener(this._onCanceled);

      chrome.braveWebrecorder.hideInfoBar(this.tabId);
    }

    this.size = 0;

    clearInterval(this._updateId);
    this.pendingRequests = null;

    this.running = false;
  }

  attach() {
    let lastTitle;

    if (this.running) {
      console.warn("Already Attached!");
      return;
    }

    this.running = true;

    this.pageCount = 0;
    this.pendingRequests = {};

    chrome.debugger.onDetach.addListener(this._onDetached);

    chrome.debugger.onEvent.addListener(this._onEvent);

    if (hasInfoBar) {
      chrome.braveWebrecorder.onCanceled.addListener(this._onCanceled);

      chrome.braveWebrecorder.showInfoBar(this.tabId);
    }

    chrome.debugger.attach(this.debuggee, '1.3', () => {
      this.start();
    });

    this._updateId = setInterval(() => this.updateFileSize(), 3000);
  };

  async updateFileSize() {
    const sizeMsg = prettyBytes(this.size);
    chrome.tabs.sendMessage(this.tabId, {"msg": "startRecord", "size": sizeMsg, "showBanner": !hasInfoBar});
    if (hasInfoBar) {
      chrome.braveWebrecorder.setSizeMsg(this.tabId, sizeMsg);
    }
  }

  async start() {
    await this.send("Page.enable");

    await this.send("Page.addScriptToEvaluateOnNewDocument", {source: "window.devicePixelRatio = 1;"});

    await this.sessionInit([]);

    await this.send("Runtime.evaluate", {expression: "window.location.reload()"});
  }

  async sessionInit(sessions) {
    try {
      await this.send("Network.enable", null, sessions);

      await this.send('Target.setAutoAttach', {autoAttach: true, waitForDebuggerOnStart: true, flatten: false }, sessions);

      try {
        await this.send("Fetch.enable", {patterns: [{urlPattern: "*", requestStage: "Response"}]}, sessions);
      } catch(e) {
        //console.log('No Fetch Available');
      }

      // disable cache for now?
      await this.send("Network.setCacheDisabled", {cacheDisabled: true}, sessions);
      // another option: clear cache, but don't disable
      //await this.send("Network.clearBrowserCache", null, sessions);
    } catch (e) {
      console.warn("Session Init Error: ");
      console.log(e);
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
        //console.log("Network Response: " + params.response.url);
        if (params.response) {
          this.pendingReqResp(params.requestId).fillResponseReceived(params);
        }
        break;

      case "Network.loadingFinished":
        await this.handleLoadingFinished(params, sessions);
        break;

      case "Network.responseReceivedExtraInfo":
        this.pendingReqResp(params.requestId).fillResponseReceivedExtraInfo(params);
        break;

      case "Network.requestWillBeSent":
        await this.handleRequestWillBeSent(params);
        break;

      case "Fetch.requestPaused":
        //console.log('Fetch.requestPaused: ' + params.request.url);
        let continued = false;

        try {
          if (params.responseStatusCode || params.responseErrorReason) {
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
        this.initPage(params);
        break;

      case "Page.loadEventFired":
        await this.updatePage();
        break;

      case "Page.navigatedWithinDocument":
        await this.updateHistory(sessions);
        break;

      case "Debugger.paused":
        // only unpause for beforeunload event
        // could be paused for regular breakpoint if debugging via devtools
        if (params.data && params.data.eventName === "listener:beforeunload") {
          await this.unpauseAndFinish(params);
        }
        break;
  
      default:
        //if (method.startsWith("Page.")) {
        //  console.log(method);
        //}
    }
  }

  requestPDFText(rootNode) {
    if (this._pdfTextDone) {
      return;
    }

    const p = new Promise((resolve, reject) => {
      this._pdfTextDone = resolve;
    });

    chrome.tabs.executeScript(this.tabId, {file: "pdf.min.js"}, (results) => {
      chrome.tabs.executeScript(this.tabId, {file: "extractPDF.js"}, (results2) => {
        const code = `extractPDF("${this.pdfURL ? this.pdfURL : ''}")`;
        chrome.tabs.executeScript(this.tabId, {code});
      });
    });

    return p;
  }

  setPDFText(text, tabUrl) {
    if (this.running && text) {
      if (tabUrl !== this.pageInfo.url) {
        console.log("wrong url for pdf text: " + tabUrl);
      } else {
        //console.log("Got PDF Text: " + text.length);

        this.pageInfo.text = text;
      }
    }

    if (this._pdfTextDone) {
      this._pdfTextDone();
    }

    if (this.pdfURL) {
      URL.revokeObjectURL(this.pdfURL);
      this.pdfURL = null;
    }
  }

  async getFullText() {
    if (!this.pageInfo || !this.pageInfo.url) {
      return null;
    }

    if (this.pageInfo.mime === "application/pdf") {
      await this.requestPDFText();
      return null;
    }

    try {
      //const startTime = new Date().getTime();
      return await this.send('DOM.getDocument', {'depth': -1, 'pierce': true});
      //console.log(`Time getting text for ${this.pageInfo.id}: ${(new Date().getTime() - startTime)}`);
    } catch(e) {
      console.log(e);
      return null;
    }
  }

  async unpauseAndFinish(params) {
    let domNodes = null;

    // determine if this is the unload from the injected content script
    // if not, unpause but don't extract full text
    const ourUnload = (params.callFrames[0].url === CONTENT_SCRIPT_URL);

    if (ourUnload) {
      domNodes = await this.getFullText();
    }

    const currPage = this.pageInfo;

    try {
      await this.send("Debugger.resume");
    } catch(e) {
      console.warn(e);
    }

    if (ourUnload) {
      await this.commitPage(currPage, domNodes, true);
    }
  }

  async commitPage(currPage, domNodes, finished) {
    if (!currPage || !currPage.url || !currPage.date) {
      return;
    }

    if (domNodes) {
      currPage.text = parseTextFromDom(domNodes);
    } else if (!currPage.text) {
      console.warn("No Full Text Update");
    }

    currPage.finished = finished;

    await this.writer.addPage(currPage);

    fulltext.addPageText(currPage);
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

  //from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  newPageId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  initPage(params) {
    if (params.frame.parentId) {
      return;
    }

    //console.log("Page.frameNavigated: " + params.frame.url + " " + params.frame.id);
    if (this.frameId != params.frame.id) {
      this.historyMap = {};
    }

    this.frameId = params.frame.id;

    this.pageInfo = {
      id: this.newPageId(),
      url: params.frame.url,
      date: "",
      title: "",
      text: "",
      size: 0,
      finished: false,
      favIconUrl: "",
      mime: params.frame.mimeType
    };

    this._pdfTextDone = null;
  }

  getFavIcon() {
    return new Promise((resolve, reject) => {
      chrome.tabs.get(this.tabId, (tab) => {
        resolve(tab.favIconUrl);
      });
    });
  }

  loadFavIcon(favIconUrl) {
    if (favIconUrl && this.pageInfo && this.pageInfo.favIconUrl != favIconUrl) {
      this.pageInfo.favIconUrl = favIconUrl;

      //if (!await this.writer.db.hasUrlForPage(favIconUrl, this.pageInfo.id)) {
      //console.log("Load Favicon: " + favIconUrl);
      chrome.tabs.sendMessage(this.tabId, {"msg": "asyncFetch", "req": {"url": favIconUrl}});
      //}
    }
  }

  async updatePage() {
    if (!this.pageInfo) {
      console.warn("no page info!");
    }

    const result = await this.send("Page.getNavigationHistory");
    const id = result.currentIndex;

    // allow duplicate pages for now
    //if (id !== result.entries.length - 1 || this.historyMap[id] === result.entries[id].url) {
    //  return;
    //}

    //await this.addText(false);

    this.historyMap[id] = result.entries[id].url;

    this.pageInfo.title = result.entries[id].title || result.entries[id].url;

    const results = await Promise.all([
      this.getFullText(),
      this.getFavIcon(),
    ]);

    if (results[1]) {
      this.loadFavIcon(results[1]);
    }

    await this.commitPage(this.pageInfo, results[0], false);

    // Enable unload pause only on first full page that is being recorded
    if (!this.pageCount++) {
      await this.send("Debugger.enable");
      await this.send("DOMDebugger.setEventListenerBreakpoint", {'eventName': 'beforeunload'});
    }

    await this.updateFileSize();
  }

  async updateHistory(sessions) {
    if (sessions.length) {
      return;
    }

    const result = await this.send("Page.getNavigationHistory", null, sessions);
    const id = result.currentIndex;
    if (id === result.entries.length - 1 && this.historyMap[id] !== result.entries[id].url) {
      //console.log("New History Entry: " + JSON.stringify(result.entries[id]));
      this.historyMap[id] = result.entries[id].url;
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

    const string = payload.toString("utf-8");

    if (!string.length) {
      return false;
    }

    let newString = null;

    const ct = this._getContentType(params.responseHeaders);

    switch (ct) {
      case "application/x-mpegURL":
      case "application/vnd.apple.mpegurl":
        newString = rewriteHLS(string);
        break;

      case "application/dash+xml":
        newString = rewriteDASH(string);
        break;

      case "text/html":
      case "application/json":
      case "text/javascript":
      case "application/javascript":
      case "application/x-javascript":
        const rw = baseDSRules.getRewriter(params.request.url);

        if (rw !== baseDSRules.defaultRewriter) {
          newString = rw.rewrite(string);
        }
        break;
    }

    if (!newString) {
      return false;
    }

    if (newString !== string) {
      console.log("Rewritten Response for: " + params.request.url);
    }

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
    if (!reqresp) {
      return;
    }

    if (!reqresp.url.startsWith("https:") && !reqresp.url.startsWith("http:")) {
      return;
    }

    //reqresp.datetime = new Date().getTime();

    //console.log("Finished: " + reqresp.url);
    let payload = reqresp.payload;

    if (!reqresp.fetch) {
      payload = await this.fetchPayloads(params, reqresp, sessions, "Network.getResponseBody");
    }

    const data = reqresp.toDBRecord(payload, this.pageInfo);

    if (data) {
      await this.commitResource(data);
    }

    // top-level page resource
    if (data && !sessions.length && reqresp.url === this.pageInfo.url) {
      this.pageInfo.date = new Date(reqresp.ts).toISOString();

      if (this.pageInfo.mime === "application/pdf" && data.mime === "application/pdf" && reqresp.payload) {
        const pdfblob = new Blob([reqresp.payload], {type: "application/pdf"});
        this.pdfURL = URL.createObjectURL(pdfblob);
      }
    }
  }

  async handleRequestWillBeSent(params) {
    const reqresp = this.pendingReqResp(params.requestId);

    let data = null;

    if (params.redirectResponse) {
      reqresp.fillResponseRedirect(params);
      data = reqresp.toDBRecord(null, this.pageInfo);
    }

    reqresp.fillRequest(params);

    // commit redirect response, if any
    if (data) {
      await this.commitResource(data);
    }
  }

  async commitResource(data) {
    const sizeCommitted = await this.writer.commitResource(data);

    // increment size counter only if committed
    if (sizeCommitted) {
      incrArchiveSize(sizeCommitted);
      this.pageInfo.size += sizeCommitted;
      this.size += sizeCommitted;

      // increment page size
      await this.writer.addPage(this.pageInfo);
    }
  }

  async handleFetchResponse(params, sessions) {
    const reqresp = this.pendingReqResp(params.networkId);
    reqresp.fillFetchRequestPaused(params);

    return await this.fetchPayloads(params, reqresp, sessions, "Fetch.getResponseBody");
  }

  async fetchPayloads(params, reqresp, sessions, method) {
    let payload;

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

    //console.log("Total: " + this.writer.getLength());
    //chrome.tabs.sendMessage(this.tabId, {"msg": "update", "size": this.writer.getLength()});
    reqresp.payload = payload;
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


export { Recorder };

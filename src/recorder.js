import { RequestResponseInfo } from './requestresponseinfo.js';

import { baseRules as baseDSRules } from '@webrecorder/wabac/src/rewrite';
import { rewriteDASH, rewriteHLS } from '@webrecorder/wabac/src/rewrite/rewriteVideo';

import autofetcher from './autofetcher.js';

const encoder = new TextEncoder("utf-8");

const MAX_CONCURRENT_FETCH = 6;


// ===========================================================================
function sleep(time) {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

// ===========================================================================
class Recorder {
  constructor(contentScriptUrl) {
    this.contentScriptUrl = contentScriptUrl;

    this.flatMode = false;

    this.collId = "";

    this.pendingRequests = {};
    this.numPending = 0;

    this.running = false;

    this.frameId = null;
    this.pageCount = 0;
    this.pageInfo = {size: 0};

    this.sizeNew = 0;
    this.sizeTotal = 0;
    this.numPages = 0;
    this.numUrls = 0;

    this.historyMap = {};

    this._promises = {};

    this._fetchPending = new Map();
    this._fetchQueue = [];
    this._fetchUrls = new Set();

    this._pdfTextDone = null;
    this.pdfURL = null;

    this.failureMsg = null;

    this.id = 1;
    this.sessionSet = new Set();

    this._bgFetchId = setInterval(() => this.doBackgroundFetch(), 10000);
  }

  addExternalInject(path) {
    return `
    (function () {
      window.addEventListener("DOMContentLoaded", () => {
        const e = document.createElement("script");
        e.src = "${this.getExternalInjectURL(path)}";
        document.head.appendChild(e);
      });
    })();
    `
  }

  async detach() {
    const domNodes = await this.getFullText();

    try {
      await Promise.all(this._fetchPending.values());
    } catch(e) {
      console.log(e);
    }

    try {
      await this._doDetach();
    } catch (e) {}

    await this._stop(domNodes);
  }

  _stop(domNodes = null) {
    clearInterval(this._updateId);
    clearInterval(this._cleanupId);

    this.flushPending();
    this.running = false;
    this.pendingRequests = {};
    this.numPending = 0;

    this._doStop();

    return this.commitPage(this.pageInfo, domNodes, true);
  }

  async attach() {
    if (this.running) {
      console.warn("Already Attached!");
      return;
    }

    await this._doAttach();

    this.running = true;

    this._updateId = setInterval(() => this.updateStatus(), 1000);

    this._cleanupId = setInterval(() => this.cleanupStale(), 10000);
  };

  cleanupStale() {
    for (const key of Object.keys(this.pendingRequests)) {
      const reqresp = this.pendingRequests[key];

      if ((new Date() - reqresp._created) > 20000) {
        if (this.noResponseForStatus(reqresp.status)) {
          console.log("Dropping stale: " + key);
        } else {
          console.log(`Committing stale ${reqresp.status} ${reqresp.url}`);
          this.fullCommit(reqresp, []);
        }
        delete this.pendingRequests[key];
      }
    }
  }

  updateStatus() {
    //const sizeMsg = prettyBytes(this.size);

    this.numPending = Object.keys(this.pendingRequests).length + this._fetchPending.size;

    //console.log(Object.values(this.pendingRequests).map((x) => x.status + " " + x.fetch + " " + x.requestId + " " + x.url + " "));

    this.doUpdateStatus();
  }

  getStatusMsg() {
    return {
      recording: this.running,
      sizeTotal: this.sizeTotal,
      sizeNew: this.sizeNew,
      numUrls: this.numUrls,
      numPages: this.numPages,
      numPending: this.numPending,
      pageUrl: this.pageInfo.url,
      pageTs: this.pageInfo.ts,
      failureMsg: this.failureMsg,
      collId: this.collId,
      type: "status"
    }
  }

  get injectScripts() {
    return [autofetcher, this.addExternalInject("ruffle/ruffle.js")];
  }

  async start() {
    await this.send("Page.enable");

    for (const source of this.injectScripts) {
      await this.send("Page.addScriptToEvaluateOnNewDocument", {source});
    }

    await this.sessionInit([]);
    this.failureMsg = null;
  }

  async sessionInit(sessions) {
    try {
      await this.send("Network.enable", null, sessions);

      try {
        await this.send("Fetch.enable", {patterns: [{urlPattern: "*", requestStage: "Response"}]}, sessions);
      } catch(e) {
        console.log('No Fetch Available', e);
      }

      try {
        await this.send("Media.enable", null, sessions);
      } catch(e) {
        console.log("No media events available");
      }

      await this.send('Target.setAutoAttach', {autoAttach: true, waitForDebuggerOnStart: true, flatten: this.flatMode }, sessions);

      // disable cache for now?
      await this.send("Network.setCacheDisabled", {cacheDisabled: true}, sessions);
      await this.send("Network.setBypassServiceWorker", {bypass: true}, sessions);
      // another option: clear cache, but don't disable
      //await this.send("Network.clearBrowserCache", null, sessions);
    } catch (e) {
      console.warn("Session Init Error: ");
      console.log(e);
    }
  }

  pendingReqResp(requestId, reuseOnly = false) {
    if (!this.pendingRequests[requestId]) {
      if (reuseOnly || !requestId) {
        return null;
      }
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

        try {
          this.sessionSet.add(params.sessionId);

          await this.sessionInit(sessions);

          if (params.waitingForDebugger) {
            await this.send('Runtime.runIfWaitingForDebugger', null, sessions);
          }

          console.log("Target Attached: " + params.targetInfo.type + " " + params.targetInfo.url + " " + params.sessionId);
        } catch (e) {
          console.log(e);
          console.warn("Error attaching target: " + params.targetInfo.type + " " + params.targetInfo.url);
        }
        break;

      case "Target.detachedFromTarget":
        //console.log("Detaching: " + params.sessionId);
        this.sessionSet.delete(params.sessionId);
        break;

      case "Target.receivedMessageFromTarget":
        if (!this.sessionSet.has(params.sessionId)) {
          console.warn("no such session: " + params.sessionId);
          console.warn(params);
          return;
        }
        sessions.push(params.sessionId);
        this.receiveMessageFromTarget(params, sessions);
        break;

      case "Network.responseReceived":
        if (params.response) {
          const reqresp = this.pendingReqResp(params.requestId, true);
          if (reqresp) {
            reqresp.fillResponseReceived(params);
          }
        }
        break;

      case "Network.loadingFinished":
        await this.handleLoadingFinished(params, sessions);
        break;

      case "Network.loadingFailed":
        {
          const reqresp = this.removeReqResp(params.requestId);
          if (reqresp && reqresp.status !== 206) {
            console.log(`Loading Failed for: ${reqresp.url} ${params.errorText}`);
          }
          break;
        }

      case "Network.requestServedFromCache":
        this.removeReqResp(params.requestId);
        break;

      case "Network.responseReceivedExtraInfo":
        {
          const reqresp = this.pendingReqResp(params.requestId, true);
          if (reqresp) {
            reqresp.fillResponseReceivedExtraInfo(params);
          }
        }
        break;

      case "Network.requestWillBeSent":
        await this.handleRequestWillBeSent(params);
        break;

      case "Network.requestWillBeSentExtraInfo":
        if (!this.shouldSkip(null, params.headers, null)) {
          this.pendingReqResp(params.requestId).requestHeaders = params.headers;
        }
        break;

      case "Fetch.requestPaused":
        await this.handlePaused(params, sessions);
        break;

      case "Page.frameNavigated":
        this.initPage(params, sessions);
        break;

      case "Page.loadEventFired":
        await this.updatePage(sessions);
        break;

      case "Page.navigatedWithinDocument":
        await this.updateHistory(sessions);
        break;

      case "Page.windowOpen":
        this.handleWindowOpen(params.url, sessions);
        break;

      case "Debugger.paused":
        // only unpause for beforeunload event
        // could be paused for regular breakpoint if debugging via devtools
        if (params.data && params.data.eventName === "listener:beforeunload") {
          await this.unpauseAndFinish(params);
        }
        break;

      case "Media.playerEventsAdded":
        this.parseMediaEventsAdded(params, sessions);
        break;
  
      default:
        //if (method.startsWith("Target.")) {
        //  console.log(method, params);
        //}
        return false;
    }

    return true;
  }

  handleWindowOpen(url, sessions) {
    this.doAsyncFetchInBrowser({url}, sessions);
  }

  requestPDFText(rootNode) {
    if (this._pdfTextDone) {
      return;
    }

    const p = new Promise((resolve, reject) => {
      this._pdfTextDone = resolve;
    });

    //TODO: impl
    this._doPdfExtract();

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
    const ourUnload = (this.contentScriptUrl && params.callFrames[0].url === this.contentScriptUrl);

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
      this.flushPending();

      await this.commitPage(currPage, domNodes, true);
    }
  }

  commitPage(currPage, domNodes, finished) {
    if (!currPage || !currPage.url || !currPage.ts || currPage.url === "about:blank") {
      return;
    }

    if (domNodes) {
      currPage.text = this.parseTextFromDom(domNodes);
    } else if (!currPage.text) {
      console.warn("No Full Text Update");
    }

    currPage.finished = finished;

    return this._doAddPage(currPage);
  }

  commitResource(data, pageInfo) {
    const payloadSize = data.payload.length;
    pageInfo = pageInfo || this.pageInfo;
    pageInfo.size += payloadSize;

    this.sizeTotal += payloadSize;
    this.numUrls++;

    this._doAddResource(data).then((writtenSize) => this.sizeNew += writtenSize);
  }

  receiveMessageFromTarget(params, sessions) {
    const nestedParams = JSON.parse(params.message);

    if (nestedParams.id != undefined) {
      const promise = this._promises[nestedParams.id];
      if (promise) {
        //if (DEBUG) {
        //  console.log("RECV " + promise.method + " " + params.message);
        //}
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

  initPage(params, sessions) {
    if (params.frame.parentId) {
      return false;
    }

    //console.log("Page.frameNavigated: " + params.frame.url + " " + params.frame.id);
    if (this.frameId != params.frame.id) {
      this.historyMap = {};
    }

    this.frameId = params.frame.id;
    this.loaderId = params.frame.loaderId;

    this._initNewPage(params.frame.url, params.frame.mimeType);

    const reqresp = this.removeReqResp(this.loaderId);
    if (reqresp) {
      this.fullCommit(reqresp, sessions);
    }

    return true;
  }

  _initNewPage(url, mime) {
    this.pageInfo = {
      id: this.newPageId(),
      url,
      ts: 0,
      title: "",
      text: "",
      size: 0,
      finished: false,
      favIconUrl: "",
      mime,
    };

    this.numPages++;

    this._fetchUrls.clear();

    this._pdfTextDone = null;
  }

  loadFavIcon(favIconUrl, sessions) {
    if (favIconUrl && this.pageInfo && this.pageInfo.favIconUrl != favIconUrl) {
      this.pageInfo.favIconUrl = favIconUrl;

      this.doAsyncFetch({url: favIconUrl}, sessions);
    }
  }

  async updatePage(sessions) {
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
      this.loadFavIcon(results[1], sessions);
    }

    await this.commitPage(this.pageInfo, results[0], false);

    // Enable unload pause only on first full page that is being recorded
    if (!this.pageCount++) {
      await this.send("Debugger.enable");
      await this.send("DOMDebugger.setEventListenerBreakpoint", {'eventName': 'beforeunload'});
    }

    await this.updateStatus();
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

  shouldSkip(method, headers, resourceType) {
    if (headers && !method) {
      method = headers[":method"];
    }

    if (method === "OPTIONS") {
      return true;
    }

    if (["EventSource", "WebSocket", "Ping"].includes(resourceType)) {
      return true;
    }

    // beacon
    if (resourceType === "Other" && method === "POST") {
      return true;
    }

    // skip eventsource, resourceType may not be set correctly
    if (headers && (headers["accept"] === "text/event-stream" || headers["Accept"] === "text/event-stream")) {
      return true;
    }

    return false;
  }

  async handlePaused(params, sessions) {
    let continued = false;
    let reqresp = null;

    let skip = false;

    if (this.shouldSkip(params.request.method, params.request.headers, params.resourceType)) {
      skip = true;
    } else if (!params.responseStatusCode && !params.responseErrorReason) {
      skip = true;
    }

    try {
      if (!skip) {
        reqresp = await this.handleFetchResponse(params, sessions);
    
        try {
          if (reqresp && reqresp.payload) {
            continued = await this.rewriteResponse(params, reqresp, sessions);
          }
        } catch (e) {
          console.error("Fetch rewrite failed for: " + params.request.url);
          console.error(e);
        }     
      }
    } catch(e) {
      console.warn(e);
    }

    if (!continued) {
      try {
        await this.send("Fetch.continueRequest", {requestId: params.requestId }, sessions);
      } catch(e) {
        console.warn("Continue failed for: " + params.request.url, e);
      }
    }

    // if finished and matches current frameId, commit right away
    if (reqresp && reqresp.payload && reqresp.payload.length && params.frameId === this.frameId && !isNaN(Number(reqresp.requestId))) {
      this.removeReqResp(reqresp.requestId);
      this.fullCommit(reqresp, sessions);
    }
  }

  async rewriteResponse(params, reqresp, sessions) {
    if (!reqresp || !reqresp.payload) {
      return false;
    }

    const payload = reqresp.payload;

    if (!payload.length) {
      return false;
    }

    let newString = null;
    let string = null;

    const ct = this._getContentType(params.responseHeaders);

    switch (ct) {
      case "application/x-mpegURL":
      case "application/vnd.apple.mpegurl":
        string = payload.toString("utf-8");
        newString = rewriteHLS(string, {save: reqresp.extraOpts});
        break;

      case "application/dash+xml":
        string = payload.toString("utf-8");
        newString = rewriteDASH(string, {save: reqresp.extraOpts});
        break;

      case "text/html":
      case "application/json":
      case "text/javascript":
      case "application/javascript":
      case "application/x-javascript":
        string = payload.toString("utf-8");
        const rw = baseDSRules.getRewriter(params.request.url);

        if (rw !== baseDSRules.defaultRewriter) {
          newString = rw.rewrite(string, {live: true});
        }
        break;
    }

    if (!newString) {
      return false;
    }

    if (newString !== string) {
      reqresp.extraOpts = {"rewritten": "1"};
      reqresp.payload = encoder.encode(newString);

      console.log("Rewritten Response for: " + params.request.url);
    }

    const base64Str = Buffer.from(newString).toString("base64");

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
    return (!status || status === 204 || (status >= 300 && status < 400));
  }

  isValidUrl(url) {
    return url && (url.startsWith("https:") || url.startsWith("http:"));
  }

  async handleLoadingFinished(params, sessions) {
    const reqresp = this.removeReqResp(params.requestId);

    if (!reqresp || !reqresp.url) {
      //console.log("unknown request finished: " + params.requestId);
      return;
    }

    if (!this.isValidUrl(reqresp.url)) {
      return;
    }

    let payload = reqresp.payload;

    if (!reqresp.fetch && !payload) {
      // empty response, don't attempt to store it
      if (params.encodedDataLength) {
        payload = await this.fetchPayloads(params, reqresp, sessions, "Network.getResponseBody");
      }
      if (!payload || !payload.length) {
        return;
      }
      reqresp.payload = payload;
    }

    this.fullCommit(reqresp, sessions);
  }

  async fullCommit(reqresp, sessions) {
    const requestId = reqresp.requestId;

    // let doneResolve;

    // const pending = new Promise((resolve) => {
    //   doneResolve = resolve;
    // });

    //this._fetchPending.set(requestId, pending);

    try {
      const data = reqresp.toDBRecord(reqresp.payload, this.pageInfo);

      if (data) {
        await this.commitResource(data);
      }

      // top-level page resource
      if (data && !sessions.length && reqresp.url === this.pageInfo.url) {
        this.pageInfo.ts = reqresp.ts;

        if (this.pageInfo.mime === "application/pdf" && data.mime === "application/pdf" && reqresp.payload) {
          this._doPreparePDF(reqresp);
        }
      }
    } catch(e) {
      console.log("error committing", e);
    }

    //doneResolve();
    //delete this._fetchPending[requestId];
  }

  async handleRequestWillBeSent(params) {
    if (this.shouldSkip(params.request.method, params.request.headers, params.type)) {
      this.removeReqResp(params.requestId);
      return;
    }

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

  async handleFetchResponse(params, sessions) {
    if (!params.networkId) {
      //console.warn(`No networkId for ${params.request.url} ${params.resourceType}`);
    }

    const id = params.networkId || params.requestId;

    const reqresp = this.pendingReqResp(id);

    reqresp.fillFetchRequestPaused(params);

    reqresp.payload = await this.fetchPayloads(params, reqresp, sessions, "Fetch.getResponseBody");

    if (reqresp.status === 206) {
      this.removeReqResp(id);
    }
    
    return reqresp;
  }

  parseMediaEventsAdded(params, sessions) {
    if (!this.pageInfo.id) {
      return;
    }

    for (const {value} of params.events) {
      if (value.indexOf('"kLoad"') > 0) {
        const {url} = JSON.parse(value);
        this.doAsyncFetch({url}, sessions);
        break;
      }
    }
  }

  doAsyncFetch(request, sessions = []) {
    //return this.doAsyncFetchInBrowser(request, sessions);
    return this.doAsyncFetchDirect(request);
  }

  async doAsyncFetchInBrowser(request, sessions) {
    if (this._fetchUrls.has(request.url)) {
      console.log("Skipping, already fetching: " + request.url);
      return;
    }

    this._fetchUrls.add(request.url);

    const expression = `
    (async (url) => {
      console.log("Async Fetching: " + url);
      const resp = await fetch(url, {"redirect": "manual"});
      return resp.status;
    })("${request.url}");
    `;

    console.log("Start Async Load: " + request.url);

    const result = await this.send("Runtime.evaluate", {expression, awaitPromise: true}, sessions);
    console.log("Async Fetch Result: " + JSON.stringify(result));
  }

  async doAsyncFetchDirect(request) {
    if (!request || !this.isValidUrl(request.url)) {
      return;
    }

    if (this._fetchUrls.has(request.url)) {
      console.log("Skipping, already fetching: " + request.url);
      return;
    }

    request.pageInfo = this.pageInfo;

    this._fetchQueue.push(request);

    this.doBackgroundFetch();
  }

  async doBackgroundFetch() {
    if (!this._fetchQueue.length || this._fetchPending.size >= MAX_CONCURRENT_FETCH) {
      return;
    }

    const request = this._fetchQueue.shift();

    if (this._fetchUrls.has(request.url)) {
      console.log("Skipping, already fetching: " + request.url);
      return;
    }

    let doneResolve;
    const fetchId = "fetch-" + this.newPageId();

    try {
      console.log("Start Async Load: " + request.url);

      this._fetchUrls.add(request.url);

      const pending = new Promise((resolve) => {
        doneResolve = resolve;
      });

      this._fetchPending.set(fetchId, pending);

      const opts = {};

      if (request.getResponseHeadersDict) {
        opts.headers = request.getResponseHeadersDict().headers;
        opts.headers.delete("range");
      }

      const resp = await fetch(request.url, opts);
      const payload = await resp.arrayBuffer();

      const reqresp = new RequestResponseInfo(fetchId);
      reqresp.status = resp.status;
      reqresp.statusText = resp.statusText;
      reqresp.responseHeaders = Object.fromEntries(resp.headers);

      reqresp.method = "GET";
      reqresp.url = request.url;
      reqresp.payload = new Uint8Array(payload);

      const data = reqresp.toDBRecord(reqresp.payload, request.pageInfo);

      if (data) {
        await this.commitResource(data, request.pageInfo);
        console.log("Done Async Load: " + request.url);

        if (this.pageInfo !== request.pageInfo) {
          await this.commitPage(request.pageInfo);
        }

      } else {
        console.warn("No Data Committed for: " + request.url + " Status: " + resp.status);
      }

    } catch(e) {
      console.log(e);
      this._fetchUrls.delete(request.url);
    }

    doneResolve();
    this._fetchPending.delete(fetchId);
  }

  async fetchPayloads(params, reqresp, sessions, method) {
    let payload;

    if (reqresp.status === 206) {
      sleep(500).then(() => this.doAsyncFetch(reqresp, sessions));
      reqresp.payload = null;
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
        console.warn('no buffer for: ' + reqresp.url + " " + reqresp.status + " " + reqresp.requestId + " " + method);
        console.warn(e);
        return null;
      }
    } else {
      payload = Buffer.from([]);
    }

    if (reqresp.hasPostData && !reqresp.postData) {
      try {
        let postRes = await this.send('Network.getRequestPostData', {requestId: reqresp.requestId}, sessions);
        reqresp.postData = Buffer.from(postRes.postData, 'utf-8');
      } catch(e) {
        console.warn("Error getting POST data: " + e);
      }
    }

    reqresp.payload = payload;
    return payload;
  }

  flushPending() {
    const oldPendingReqs = this.pendingRequests;
    const pageInfo = this.pageInfo;
    this.pendingRequests = {};

    if (!oldPendingReqs) {
      return;
    }

    for (const [id, reqresp] of Object.entries(oldPendingReqs)) {
      if (reqresp.payload) {
        console.log(`Committing Finished ${id} - ${reqresp.url}`);

        const data = reqresp.toDBRecord(reqresp.payload, pageInfo);

        if (data) {
          this.commitResource(data);
        }

        // top-level page resource
        if (data && reqresp.url === pageInfo.url) {
          pageInfo.ts = reqresp.ts;
        }
        
      } else {
        console.log(`Discarding Payload-less ${reqresp.url}`);
      }
    }
  }

  send(method, params = null, sessions = []) {
    let promise = null;

    if (this.flatMode && sessions.length) {
      return this._doSendCommandFlat(method, params, sessions[sessions.length - 1]);
    }

    for (let i = sessions.length - 1; i >= 0; i--) {
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

    return this._doSendCommand(method, params, promise);
  }

  parseTextFromDom(dom) {
    const accum = [];
    const metadata = {};

    this._parseText(dom.root, metadata, accum);

    return accum.join('\n');
  }

  _parseText(node, metadata, accum) {
    const SKIPPED_NODES = ["script", "style", "header", "footer", "banner-div", "noscript"];
    const EMPTY_LIST = [];
    const TEXT = "#text";
    const TITLE = "title";
    
    const name = node.nodeName.toLowerCase();
      
    if (SKIPPED_NODES.includes(name)) {
      return;
    }

    const children = node.children || EMPTY_LIST;

    if (name === TEXT) {
      const value = node.nodeValue ? node.nodeValue.trim() : '';
      if (value) {
        accum.push(value);
      }
    } else if (name === TITLE) {
      const title = [];

      for (let child of children) {
        this._parseText(child, null, title);
      }
    
      if (metadata) {
        metadata.title = title.join(' ');
      } else {
        accum.push(title.join(' '));
      }
    } else {
      for (let child of children) {
        this._parseText(child, metadata, accum);
      }

      if (node.contentDocument) { 
        this._parseText(node.contentDocument, null, accum);
      } 
    }
  }
}

export { Recorder };

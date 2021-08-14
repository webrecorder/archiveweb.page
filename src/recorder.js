import { RequestResponseInfo } from "./requestresponseinfo.js";

import { baseRules as baseDSRules } from "@webrecorder/wabac/src/rewrite";
import { rewriteDASH, rewriteHLS } from "@webrecorder/wabac/src/rewrite/rewriteVideo";
import { Buffer } from "buffer";

import behaviors from "browsertrix-behaviors/dist/behaviors.js";
import extractPDF from "./extractPDF";

import {
  BEHAVIOR_WAIT_LOAD,
  BEHAVIOR_READY_START,
  BEHAVIOR_RUNNING,
  BEHAVIOR_PAUSED,
  BEHAVIOR_DONE } from "./consts";

const encoder = new TextEncoder("utf-8");

const MAX_CONCURRENT_FETCH = 6;

const MAIN_INJECT_URL = "__awp_main_inject__";

const BEHAVIOR_LOG_FUNC = "__bx_log";

// ===========================================================================
function sleep(time) {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

// ===========================================================================
class Recorder {
  constructor() {
    this.flatMode = false;

    this.collId = "";

    this.pendingRequests = {};
    this.numPending = 0;

    this.running = false;
    this.stopping = false;

    this.frameId = null;
    this.pageInfo = {size: 0};
    this.firstPageStarted = false;

    this.sizeNew = 0;
    this.sizeTotal = 0;
    this.numPages = 0;
    this.numUrls = 0;

    this.historyMap = {};

    this._promises = {};

    this._fetchPending = new Map();
    this._fetchQueue = [];
    this._fetchUrls = new Set();

    this._bindings = {};

    this.pdfLoadURL = null;

    this.pixelRatio = 1;

    this.failureMsg = null;

    this.id = 1;
    this.sessionSet = new Set();

    this._cachePageInfo = null;
    this._cacheSessionNew = 0;
    this._cacheSessionTotal = 0;

    this.behaviorInitStr = JSON.stringify({
      autofetch: true,
      autoplay: true,
      autoscroll: true,
      siteSpecific: true,
      log: BEHAVIOR_LOG_FUNC
    });

    this.behaviorState = BEHAVIOR_WAIT_LOAD;
    this.behaviorData = null;
    this.autorun = false;
  }

  setAutoRunBehavior(autorun) {
    this.autorun = autorun;
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
    `;
  }

  getInjectScript() {
    return behaviors + `;
    self.__bx_behaviors.init(${this.behaviorInitStr});

    window.addEventListener("beforeunload", () => {});` + this.getFlashInjectScript();
  }

  getFlashInjectScript() {
    return `
    (() => {
      const description = "Shockwave Flash 32.0 r0";
      const enabledPlugin = { description };
      navigator.plugins["Shockwave Flash"] = { description };
      function addPlugin(type, suffixes) {
        const mime = { enabledPlugin, description: "", type, suffixes};
        navigator.mimeTypes[type] = mime;
        navigator.mimeTypes[navigator.mimeTypes.length] = mime;
      }
      addPlugin("application/futuresplash", "sp1");
      addPlugin("application/x-shockwave-flash2-preview", "swf");
      addPlugin("application/x-shockwave-flash", "swf");
      addPlugin("application/vnd.adobe.flash-movie", "swf");
    })();
    ` + this.addExternalInject("ruffle/ruffle.js");
  }

  async detach() {
    this.stopping = true;

    const domNodes = await this.getFullText(true);

    if (this.behaviorState === BEHAVIOR_RUNNING) {
      this.toggleBehaviors();
    }

    try {
      await Promise.race([
        Promise.all(this._fetchPending.values()),
        sleep(15000)
      ]);
    } catch(e) {
      console.log(e);
    }

    try {
      await this._doDetach();
    } catch (e) {
      console.log(e);
    }

    await this._stop(domNodes);
  }

  async _stop(domNodes = null) {
    clearInterval(this._updateStatusId);
    clearInterval(this._loopId);
    clearInterval(this._bgFetchId);

    this.flushPending();
    this.running = false;
    this.pendingRequests = {};
    this.numPending = 0;

    await this.commitPage(this.pageInfo, domNodes, true);

    if (this._cleaningUp) {
      await this._cleanupStaleWait;
    } else {
      await this.doUpdateLoop();
    }

    this._doStop();
  }

  async attach() {
    if (this.running) {
      console.warn("Already Attached!");
      return;
    }

    await this._doAttach();

    this.running = true;
    this.stopping = false;

    this._cachePageInfo = null;
    this._cacheSessionNew = 0;
    this._cacheSessionTotal = 0;
    this._cleaningUp = false;
    this._cleanupStaleWait = null;

    this._updateStatusId = setInterval(() => this.updateStatus(), 1000);

    this._loopId = setInterval(() => this.updateLoop(), 10000);

    this._bgFetchId = setInterval(() => this.doBackgroundFetch(), 10000);
  }

  updateLoop() {
    if (!this._cleaningUp) {
      this._cleanupStaleWait = this.doUpdateLoop();
    }
  }

  async doUpdateLoop() {
    this._cleaningUp = true;

    try {
      for (const key of Object.keys(this.pendingRequests)) {
        const reqresp = this.pendingRequests[key];

        if ((new Date() - reqresp._created) > 20000) {
          if (this.noResponseForStatus(reqresp.status)) {
            console.log("Dropping stale: " + key);
          } else {
            console.log(`Committing stale ${reqresp.status} ${reqresp.url}`);
            await this.fullCommit(reqresp, []);
          }
          delete this.pendingRequests[key];
        }
      }

      if (this._cachePageInfo) {
        await this._doAddPage(this._cachePageInfo);
        this._cachePageInfo = null;
      }

      if (this._cacheSessionTotal > 0) {
        await this._doIncSizes(this._cacheSessionTotal, this._cacheSessionNew);
        this._cacheSessionTotal = 0;
        this._cacheSessionNew = 0;
      }

    } finally {
      this._cleaningUp = false;
    }
  }

  updateStatus() {
    const networkPending = Object.keys(this.pendingRequests).length;
    this.numPending = networkPending + this._fetchPending.size;

    if (networkPending === 0 && this._loadedDoneResolve) {
      this._loadedDoneResolve();
    }

    this.doUpdateStatus();
  }

  getStatusMsg() {
    return {
      recording: this.running,
      firstPageStarted: this.firstPageStarted,
      behaviorState: this.behaviorState,
      behaviorData: this.behaviorData,
      autorun: this.autorun,
      sizeTotal: this.sizeTotal,
      sizeNew: this.sizeNew,
      numUrls: this.numUrls,
      numPages: this.numPages,
      numPending: this.numPending,
      pageUrl: this.pageInfo.url,
      pageTs: this.pageInfo.ts,
      failureMsg: this.failureMsg,
      collId: this.collId,
      stopping: this.stopping,
      type: "status"
    };
  }

  async _doInjectTopFrame() {
    await this.newDocEval(MAIN_INJECT_URL, this.getInjectScript());

    await this.exposeFunction(BEHAVIOR_LOG_FUNC, ({data, type}) => {
      switch (type) {
      case "info":
        this.behaviorData = data;
        //console.log("bx log", JSON.stringify(data));
        this.updateStatus();
        break;
      }
    });
  }

  async newDocEval(name, source) {
    source += "\n\n//# sourceURL=" + name;
    await this.send("Page.addScriptToEvaluateOnNewDocument", {source});
  }

  pageEval(name, expression, sessions = []) {
    expression += "\n\n//# sourceURL=" + name;
    return this.send("Runtime.evaluate", {
      expression,
      userGesture: true,
      includeCommandLineAPI: true,
      allowUnsafeEvalBlockedByCSP: true,
      //replMode: true,
      awaitPromise: true,
      //returnByValue: true,
    },
    sessions);
  }

  async _doInjectIframe(sessions) {
    try {
      //console.log("inject to: " + sessions[0]);
      await this.pageEval("__awp_iframe_inject__", this.getInjectScript(), sessions);

    } catch (e) {
      console.warn(e);
    }
  }

  async toggleBehaviors() {
    switch (this.behaviorState) {
    case BEHAVIOR_WAIT_LOAD:
    case BEHAVIOR_DONE:
      break;

    case BEHAVIOR_READY_START:
      this.pageEval("__awp_behavior_run__", "self.__bx_behaviors.run();").then(() => this.behaviorState = BEHAVIOR_DONE);
      this.behaviorState = BEHAVIOR_RUNNING;
      break;

    case BEHAVIOR_RUNNING:
      this.pageEval("__awp_behavior_unpause__", "self.__bx_behaviors.pause();");
      this.behaviorState = BEHAVIOR_PAUSED;
      break;

    case BEHAVIOR_PAUSED:
      this.pageEval("__awp_behavior_unpause__", "self.__bx_behaviors.unpause();");
      this.behaviorState = BEHAVIOR_RUNNING;
      break;
    }

    this.updateStatus();
  }

  async exposeFunction(name, func, sessions = [])
  { 
    this._bindings[name] = func;
    await this.send("Runtime.addBinding", {name}, sessions);

    //await this.newDocEval("__awp_binding_wrap__", `
    //self._${name} = (args) => self.${name}(JSON.stringify(args));`, sessions);
  }

  loaded() {
    this._loaded = new Promise(resolve => this._loadedDoneResolve = resolve);
    return this._loaded;
  }

  async start() {
    this.firstPageStarted = false;

    await this.send("Page.enable");

    await this.send("Runtime.enable");

    await this.initPixRatio();

    await this._doInjectTopFrame();

    await this.sessionInit([]);

    this.failureMsg = null;
  }

  async initPixRatio() {
    const {result} = await this.pageEval("__awp_get_pix_ratio", "window.devicePixelRatio");
    if (result && result.type === "number") {
      this.pixelRatio = result.value;
    }
  }

  async sessionInit(sessions) {
    try {
      await this.send("Network.enable", null, sessions);

      try {
        await this.send("Fetch.enable", {patterns: [{urlPattern: "*", requestStage: "Response"}]}, sessions);
      } catch(e) {
        console.log("No Fetch Available", e);
      }

      try {
        await this.send("Media.enable", null, sessions);
      } catch(e) {
        console.log("No media events available");
      }

      await this.send("Target.setAutoAttach", {autoAttach: true, waitForDebuggerOnStart: true, flatten: this.flatMode }, sessions);

      // disable cache for now?
      await this.send("Network.setCacheDisabled", {cacheDisabled: true}, sessions);
      await this.send("Network.setBypassServiceWorker", {bypass: true}, sessions);
      // another option: clear cache, but don't disable
      await this.send("Network.clearBrowserCache", null, sessions);
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

        const type = params.targetInfo.type;

        const allowAttach = type !== "service_worker";

        if (allowAttach) {
          await this.sessionInit(sessions);
        }

        if (params.waitingForDebugger) {
          await this.send("Runtime.runIfWaitingForDebugger", null, sessions);
        }

        if (allowAttach) {
          console.log("Target Attached: " + type + " " + params.targetInfo.url + " " + params.sessionId);

          if (type === "page" || type === "iframe") {
            await this._doInjectIframe(sessions);
          }
        } else {
          console.log("Not allowed attach for: " + type + " " + params.targetInfo.url + " " + params.sessionId);

          const params2 = this.flatMode ? {sessionId: params.sessionId} : {targetId: params.targetInfo.targetId};
          await this.send("Runtime.runIfWaitingForDebugger", params2, sessions);
        }

      } catch (e) {
        console.log(e);
        console.warn("Error attaching target: " + params.targetInfo.type + " " + params.targetInfo.url);
      }
      break;

    case "Target.detachedFromTarget":
      console.log("Detaching from: " + params.sessionId);
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
        // check if this is a false positive -- a valid download that's already been fetched
        // the abort is just for page, but download will succeed
        if (params.type === "Document" && 
                params.errorText === "net::ERR_ABORTED" &&
                reqresp.isValidBinary()) {
          this.fullCommit(reqresp, sessions);
        } else {
          console.log(`Loading Failed for: ${reqresp.url} ${params.errorText}`);
        }
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

    case "Page.javascriptDialogOpening":
      if (this.behaviorState === BEHAVIOR_RUNNING) {
        await this.send("Page.handleJavaScriptDialog", {accept: false});
      }
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

    case "Runtime.bindingCalled":
      if (this._bindings[params.name]) {
        this._bindings[params.name](JSON.parse(params.payload));
      }
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
    const headers = {"Referer": this.pageInfo.url};
    this.doAsyncFetchDirect({url, headers}, sessions);
  }

  isPagePDF() {
    return this.pageInfo.mime === "application/pdf";
  }

  async extractPDFText() {
    let success = false;
    console.log("pdfLoadURL", this.pdfLoadURL);
    if (this.pdfLoadURL) {
      const res = await this.pageEval("__awp_pdf_extract__", `
      ${extractPDF};

      extractPDF("${this.pdfLoadURL}", "${this.getExternalInjectURL("")}");
      `);

      if (res.result) {
        const {type, value} = res.result;
        if (type === "string") {
          this.pageInfo.text = value;
          success = true;
        }
      }
    }

    return success;
  }

  async getFullText(finishing = false) {
    if (!this.pageInfo || !this.pageInfo.url) {
      return null;
    }

    if (this.isPagePDF() && !finishing) {
      await this.extractPDFText();
      return null;
    }

    try {
      // wait upto 10s for getDocument, otherwise proceed
      return await Promise.race([
        this.send("DOM.getDocument", {"depth": -1, "pierce": true}),
        sleep(10000)
      ]);
    } catch(e) {
      console.log(e);
      return null;
    }
  }

  async unpauseAndFinish(params) {
    let domNodes = null;

    // determine if this is the unload from the injected content script
    // if not, unpause but don't extract full text
    const ourUnload = (params.callFrames[0].url === MAIN_INJECT_URL);

    if (ourUnload && this.behaviorState !== BEHAVIOR_WAIT_LOAD) {
      domNodes = await this.getFullText(true);
    }

    const currPage = this.pageInfo;

    try {
      await this.send("Debugger.resume");
    } catch(e) {
      console.warn(e);
    }

    if (this.behaviorState === BEHAVIOR_RUNNING) {
      await this.toggleBehaviors();
    }

    if (ourUnload && this.behaviorState !== BEHAVIOR_WAIT_LOAD) {
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

    const res = this._doAddPage(currPage);
    if (currPage === this._cachePageInfo) {
      this._cachePageInfo = null;
    }
    return res;
  }

  async commitResource(data, pageInfo) {
    const payloadSize = data.payload.length;
    pageInfo = pageInfo || this.pageInfo;
    pageInfo.size += payloadSize;

    this.sizeTotal += payloadSize;
    this.numUrls++;

    const writtenSize = await this._doAddResource(data);

    this.sizeNew += writtenSize;

    this._cachePageInfo = pageInfo;
    this._cacheSessionTotal += payloadSize;
    this._cacheSessionNew += writtenSize;
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

  async initFirstPage() {
    // Enable unload pause only on first full page that is being recorded
    await this.send("Debugger.enable");
    await this.send("DOMDebugger.setEventListenerBreakpoint", {"eventName": "beforeunload"});
    this.updateStatus();
    this.firstPageStarted = true;
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

    this.pdfLoadURL = null;

    this.behaviorState = BEHAVIOR_WAIT_LOAD;
    this.behaviorData = null;

    this.numPages++;

    this._fetchUrls.clear();

    if (!this.firstPageStarted) {
      this.initFirstPage();
    }

    this.behaviorState = BEHAVIOR_WAIT_LOAD;
  }

  loadFavIcon(favIconUrl, sessions) {
    if (favIconUrl && this.pageInfo && this.pageInfo.favIconUrl != favIconUrl) {
      this.pageInfo.favIconUrl = favIconUrl;

      this.doAsyncFetch({url: favIconUrl}, sessions);
    }
  }

  async updatePage(sessions) {
    //console.log("updatePage", this.pageInfo);

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

    const pageInfo = this.pageInfo;

    const results = await Promise.all([
      this.getFullText(),
      this.getFavIcon(),
    ]);

    if (results[1]) {
      this.loadFavIcon(results[1], sessions);
    }

    await this.commitPage(this.pageInfo, results[0], false);

    this.updateStatus();

    await this.loaded();

    // don't mark as ready if page changed
    if (pageInfo === this.pageInfo) {
      this.behaviorState = BEHAVIOR_READY_START;

      if (this.autorun) {
        await this.toggleBehaviors();
      }
    }
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
    case "application/x-javascript": {
      const rw = baseDSRules.getRewriter(params.request.url);

      if (rw !== baseDSRules.defaultRewriter) {
        string = payload.toString("utf-8");
        newString = rw.rewrite(string, {live: true});
      }
      break;
    }
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
    //const requestId = reqresp.requestId;

    // let doneResolve;

    // const pending = new Promise((resolve) => {
    //   doneResolve = resolve;
    // });

    //this._fetchPending.set(requestId, pending);

    try {
      const data = reqresp.toDBRecord(reqresp.payload, this.pageInfo);

      // top-level page resource
      if (data && !sessions.length && reqresp.url === this.pageInfo.url) {
        this.pageInfo.ts = reqresp.ts;

        if (data.mime === "application/pdf" && reqresp.payload && this.pageInfo) {
          // ensure set for electron
          this.pageInfo.mime = "application/pdf";
          this.pdfLoadURL = reqresp.url;
        } else {
          if (!data.extraOpts) {
            data.extraOpts = {};
          }

          data.extraOpts.pixelRatio = this.pixelRatio;

          // handle storage
          const storage = await this.getStorage(reqresp.url);

          if (storage) {
            data.extraOpts.storage = storage;
          }
        }
      }

      if (data) {
        await this.commitResource(data);
      }

    } catch(e) {
      console.log("error committing", e);
    }

    //doneResolve();
    //delete this._fetchPending[requestId];
  }

  async getStorage(url) {
    // check if recording storage is allowed
    if (!this.recordStorage) {
      return null;
    }

    const securityOrigin = new URL(url).origin;
    const storageId = {securityOrigin, isLocalStorage: true};

    const local = await this.send("DOMStorage.getDOMStorageItems", {storageId});
    storageId.isLocalStorage = false;

    const session = await this.send("DOMStorage.getDOMStorageItems", {storageId});

    return JSON.stringify({local: local.entries, session: session.entries});
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

    if (this.pdfLoadURL && params.request.url === this.pdfLoadURL) {
      return null;
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
      if (value.indexOf("\"kLoad\"") > 0) {
        const {url} = JSON.parse(value);
        this.doAsyncFetch({url}, sessions);
        break;
      }
    }
  }

  async doAsyncFetchInBrowser(request, sessions) {
    this._fetchUrls.add(request.url);

    const expression = `self.__bx_behaviors.doAsyncFetch("${request.url}")`;

    console.log("Start Async Load: " + request.url);

    const result = await this.pageEval("__awp_async_fetch__", expression, sessions);
    console.log("Async Fetch Result: " + JSON.stringify(result));
  }

  async doAsyncFetch(request, sessions) {
    if (!request || !this.isValidUrl(request.url)) {
      return;
    }

    if (this._fetchUrls.has(request.url)) {
      console.log("Skipping, already fetching: " + request.url);
      return;
    }

    request.pageInfo = this.pageInfo;
    request.sessions = sessions;

    this._fetchQueue.push(request);

    this.doBackgroundFetch();
  }

  async doBackgroundFetch() {
    if (!this._fetchQueue.length || this._fetchPending.size >= MAX_CONCURRENT_FETCH || this.stopping) {
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

      if (request.getRequestHeadersDict) {
        opts.headers = request.getRequestHeadersDict().headers;
        opts.headers.delete("range");
      } else if (request.headers) {
        opts.headers = request.headers;
      }

      let resp = await fetch(request.url, opts);
      if (resp.status !== 200) {
        console.warn(`async fetch error ${resp.status}, retrying without headers`);
        resp = await fetch(request.url);
        if (resp.status >= 400) {
          console.warn(`async fetch returned: ${resp.status}, trying in-browser fetch`);
          await this.doAsyncFetchInBrowser(request, request.sessions, true);
          return;
        }
      }

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
        console.log(`Done Async Load (${resp.status}) ${request.url}`);

        if (this.pageInfo !== request.pageInfo) {
          await this.commitPage(request.pageInfo);
        }

      } else {
        console.warn("No Data Committed for: " + request.url + " Status: " + resp.status);
      }

    } catch(e) {
      console.log(e);
      this._fetchUrls.delete(request.url);
    } finally {
      doneResolve();
      this._fetchPending.delete(fetchId);
    }
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
          payload = Buffer.from(payload.body, "base64");
        } else {
          payload = Buffer.from(payload.body, "utf-8");
        }

      } catch (e) {
        console.warn("no buffer for: " + reqresp.url + " " + reqresp.status + " " + reqresp.requestId + " " + method);
        console.warn(e);
        return null;
      }
    } else {
      payload = Buffer.from([]);
    }

    if (reqresp.hasPostData && !reqresp.postData) {
      try {
        let postRes = await this.send("Network.getRequestPostData", {requestId: reqresp.requestId}, sessions);
        reqresp.postData = Buffer.from(postRes.postData, "utf-8");
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
      method = "Target.sendMessageToTarget";
    }

    return this._doSendCommand(method, params, promise);
  }

  parseTextFromDom(dom) {
    const accum = [];
    const metadata = {};

    this._parseText(dom.root, metadata, accum);

    return accum.join("\n");
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
      const value = node.nodeValue ? node.nodeValue.trim() : "";
      if (value) {
        accum.push(value);
      }
    } else if (name === TITLE) {
      const title = [];

      for (let child of children) {
        this._parseText(child, null, title);
      }
    
      if (metadata) {
        metadata.title = title.join(" ");
      } else {
        accum.push(title.join(" "));
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

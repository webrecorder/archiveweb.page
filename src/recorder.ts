import { RequestResponseInfo } from "./requestresponseinfo";

import {
  getCustomRewriter,
  rewriteDASH,
  rewriteHLS,
  removeRangeAsQuery,
} from "@webrecorder/wabac";

import { Buffer } from "buffer";

// @ts-expect-error - Missing types
import behaviors from "browsertrix-behaviors/dist/behaviors.js";
import extractPDF from "@/static/extractPDF.js";

import {
  BEHAVIOR_WAIT_LOAD,
  BEHAVIOR_READY_START,
  BEHAVIOR_RUNNING,
  BEHAVIOR_PAUSED,
  BEHAVIOR_DONE,
} from "./consts";
import { getLocalOption } from "./localstorage";

const encoder = new TextEncoder();

const MAX_CONCURRENT_FETCH = 6;

const MAIN_INJECT_URL = "__awp_main_inject__";

const IFRAME_INJECT_URL = "__awp_iframe_inject__";

const BEHAVIOR_LOG_FUNC = "__bx_log";

// ===========================================================================
// @ts-expect-error - TS7006 - Parameter 'time' implicitly has an 'any' type.
function sleep(time) {
  // @ts-expect-error - TS2794 - Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

type FetchEntry = {
  url: string;
  headers?: Headers;
  rangeReplaced?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sessions?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageInfo?: any;

  rangeRemoved?: boolean;
  doRangeCheck?: boolean;
  redirectOnly?: boolean;
};

// ===========================================================================
class Recorder {
  archiveStorage = false;
  archiveCookies = false;
  archiveFlash = false;
  archiveScreenshots = false;
  archivePDF = false;

  _fetchQueue: FetchEntry[] = [];

  constructor() {
    // @ts-expect-error - TS2339 - Property 'flatMode' does not exist on type 'Recorder'.
    this.flatMode = false;

    // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'Recorder'.
    this.collId = "";

    // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
    this.pendingRequests = {};
    // @ts-expect-error - TS2339 - Property 'numPending' does not exist on type 'Recorder'.
    this.numPending = 0;

    // @ts-expect-error - TS2339 - Property 'running' does not exist on type 'Recorder'.
    this.running = false;
    // @ts-expect-error - TS2339 - Property 'stopping' does not exist on type 'Recorder'.
    this.stopping = false;

    // @ts-expect-error - TS2339 - Property 'frameId' does not exist on type 'Recorder'.
    this.frameId = null;
    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    this.pageInfo = { size: 0 };
    // @ts-expect-error - TS2339 - Property 'firstPageStarted' does not exist on type 'Recorder'.
    this.firstPageStarted = false;

    // @ts-expect-error - TS2339 - Property 'sizeNew' does not exist on type 'Recorder'.
    this.sizeNew = 0;
    // @ts-expect-error - TS2339 - Property 'sizeTotal' does not exist on type 'Recorder'.
    this.sizeTotal = 0;
    // @ts-expect-error - TS2339 - Property 'numPages' does not exist on type 'Recorder'.
    this.numPages = 0;
    // @ts-expect-error - TS2339 - Property 'numUrls' does not exist on type 'Recorder'.
    this.numUrls = 0;

    // @ts-expect-error - TS2339 - Property 'historyMap' does not exist on type 'Recorder'.
    this.historyMap = {};

    // @ts-expect-error - TS2339 - Property '_promises' does not exist on type 'Recorder'.
    this._promises = {};

    // @ts-expect-error - TS2339 - Property '_fetchPending' does not exist on type 'Recorder'.
    this._fetchPending = new Map();

    // @ts-expect-error - TS2339 - Property '_fetchUrls' does not exist on type 'Recorder'.
    this._fetchUrls = new Set();

    // @ts-expect-error - TS2339 - Property '_bindings' does not exist on type 'Recorder'.
    this._bindings = {};

    // @ts-expect-error - TS2339 - Property 'pdfLoadURL' does not exist on type 'Recorder'.
    this.pdfLoadURL = null;

    // @ts-expect-error - TS2339 - Property 'pixelRatio' does not exist on type 'Recorder'.
    this.pixelRatio = 1;

    // @ts-expect-error - TS2339 - Property 'failureMsg' does not exist on type 'Recorder'.
    this.failureMsg = null;

    // @ts-expect-error - TS2339 - Property 'id' does not exist on type 'Recorder'.
    this.id = 1;
    // @ts-expect-error - TS2551 - Property 'sessionSet' does not exist on type 'Recorder'. Did you mean 'sessionClose'?
    this.sessionSet = new Set();

    // @ts-expect-error - TS2339 - Property '_cachePageInfo' does not exist on type 'Recorder'.
    this._cachePageInfo = null;
    // @ts-expect-error - TS2339 - Property '_cacheSessionNew' does not exist on type 'Recorder'.
    this._cacheSessionNew = 0;
    // @ts-expect-error - TS2339 - Property '_cacheSessionTotal' does not exist on type 'Recorder'.
    this._cacheSessionTotal = 0;

    // @ts-expect-error - TS2339 - Property 'behaviorInitStr' does not exist on type 'Recorder'.
    this.behaviorInitStr = JSON.stringify({
      autofetch: true,
      autoplay: true,
      autoscroll: true,
      siteSpecific: true,
      log: BEHAVIOR_LOG_FUNC,
    });

    // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
    this.behaviorState = BEHAVIOR_WAIT_LOAD;
    // @ts-expect-error - TS2339 - Property 'behaviorData' does not exist on type 'Recorder'.
    this.behaviorData = null;
    // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'Recorder'.
    this.autorun = false;

    // @ts-expect-error - TS2339 - Property 'defaultFetchOpts' does not exist on type 'Recorder'.
    this.defaultFetchOpts = {
      redirect: "manual",
    };

    this.initOpts();
  }

  async initOpts() {
    this.archiveCookies = (await getLocalOption("archiveCookies")) === "1";
    this.archiveStorage = (await getLocalOption("archiveStorage")) === "1";
    this.archiveFlash = (await getLocalOption("archiveFlash")) === "1";
    this.archiveScreenshots = (await getLocalOption("archiveScreenshots")) === "1";
    this.archivePDF = (await getLocalOption("archivePDF")) === "1";
  }

  // @ts-expect-error - TS7006 - Parameter 'autorun' implicitly has an 'any' type.
  setAutoRunBehavior(autorun) {
    // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'Recorder'.
    this.autorun = autorun;
  }

  // @ts-expect-error - TS7006 - Parameter 'path' implicitly has an 'any' type.
  addExternalInject(path) {
    return `
    (function () {
      window.addEventListener("DOMContentLoaded", () => {
        const e = document.createElement("script");
        e.src = "${
          // @ts-expect-error - TS2339 - Property 'getExternalInjectURL' does not exist on type 'Recorder'.
          this.getExternalInjectURL(path)
        }";
        document.head.appendChild(e);
      });
    })();
    `;
  }

  getInjectScript() {
    return (
      behaviors +
      `;
    self.__bx_behaviors.init(${
      // @ts-expect-error - TS2339 - Property 'behaviorInitStr' does not exist on type 'Recorder'.
      this.behaviorInitStr
    });

    window.addEventListener("beforeunload", () => {});\n` +
      (this.archiveFlash ? this.getFlashInjectScript() : "")
    );
  }

  getFlashInjectScript() {
    return (
      `
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
    ` + this.addExternalInject("ruffle/ruffle.js")
    );
  }

  async detach() {
    // @ts-expect-error - TS2339 - Property 'running' does not exist on type 'Recorder'.
    if (!this.running) {
      return;
    }

    // @ts-expect-error - TS2339 - Property 'stopping' does not exist on type 'Recorder'.
    this.stopping = true;

    const domSnapshot = await this.getFullText(true);

    // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
    if (this.behaviorState === BEHAVIOR_RUNNING) {
      this.toggleBehaviors();
    }

    try {
      await Promise.race([
        // @ts-expect-error - TS2339 - Property '_fetchPending' does not exist on type 'Recorder'.
        Promise.all(this._fetchPending.values()),
        sleep(15000),
      ]);
    } catch (e) {
      console.log(e);
    }

    try {
      // @ts-expect-error - TS2339 - Property '_doDetach' does not exist on type 'Recorder'.
      await this._doDetach();
    } catch (e) {
      console.log(e);
    }

    await this._stop(domSnapshot);
  }

  async _stop(domSnapshot = null) {
    // @ts-expect-error - TS2339 - Property '_updateStatusId' does not exist on type 'Recorder'.
    clearInterval(this._updateStatusId);
    // @ts-expect-error - TS2339 - Property '_loopId' does not exist on type 'Recorder'.
    clearInterval(this._loopId);
    // @ts-expect-error - TS2339 - Property '_bgFetchId' does not exist on type 'Recorder'.
    clearInterval(this._bgFetchId);

    this.flushPending();
    // @ts-expect-error - TS2339 - Property 'running' does not exist on type 'Recorder'.
    this.running = false;
    // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
    this.pendingRequests = {};
    // @ts-expect-error - TS2339 - Property 'numPending' does not exist on type 'Recorder'.
    this.numPending = 0;

    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    await this.commitPage(this.pageInfo, domSnapshot, true);

    // @ts-expect-error - TS2339 - Property '_cleaningUp' does not exist on type 'Recorder'.
    if (this._cleaningUp) {
      // @ts-expect-error - TS2339 - Property '_cleanupStaleWait' does not exist on type 'Recorder'.
      await this._cleanupStaleWait;
    } else {
      await this.doUpdateLoop();
    }

    // @ts-expect-error - TS2551 - Property '_doStop' does not exist on type 'Recorder'. Did you mean '_stop'?
    this._doStop();
  }

  async attach() {
    // @ts-expect-error - TS2339 - Property 'running' does not exist on type 'Recorder'.
    if (this.running) {
      console.warn("Already Attached!");
      return;
    }

    // @ts-expect-error - TS2339 - Property '_doAttach' does not exist on type 'Recorder'.
    await this._doAttach();

    // @ts-expect-error - TS2339 - Property 'running' does not exist on type 'Recorder'.
    this.running = true;
    // @ts-expect-error - TS2339 - Property 'stopping' does not exist on type 'Recorder'.
    this.stopping = false;

    // @ts-expect-error - TS2339 - Property '_cachePageInfo' does not exist on type 'Recorder'.
    this._cachePageInfo = null;
    // @ts-expect-error - TS2339 - Property '_cacheSessionNew' does not exist on type 'Recorder'.
    this._cacheSessionNew = 0;
    // @ts-expect-error - TS2339 - Property '_cacheSessionTotal' does not exist on type 'Recorder'.
    this._cacheSessionTotal = 0;
    // @ts-expect-error - TS2339 - Property '_cleaningUp' does not exist on type 'Recorder'.
    this._cleaningUp = false;
    // @ts-expect-error - TS2339 - Property '_cleanupStaleWait' does not exist on type 'Recorder'.
    this._cleanupStaleWait = null;

    // @ts-expect-error - TS2339 - Property '_updateStatusId' does not exist on type 'Recorder'.
    this._updateStatusId = setInterval(() => this.updateStatus(), 1000);

    // @ts-expect-error - TS2339 - Property '_loopId' does not exist on type 'Recorder'.
    this._loopId = setInterval(() => this.updateLoop(), 10000);

    // @ts-expect-error - TS2339 - Property '_bgFetchId' does not exist on type 'Recorder'.
    this._bgFetchId = setInterval(() => this.doBackgroundFetch(), 10000);
  }

  updateLoop() {
    // @ts-expect-error - TS2339 - Property '_cleaningUp' does not exist on type 'Recorder'.
    if (!this._cleaningUp) {
      // @ts-expect-error - TS2339 - Property '_cleanupStaleWait' does not exist on type 'Recorder'.
      this._cleanupStaleWait = this.doUpdateLoop();
    }
  }

  async doUpdateLoop() {
    // @ts-expect-error - TS2339 - Property '_cleaningUp' does not exist on type 'Recorder'.
    this._cleaningUp = true;

    try {
      // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
      for (const key of Object.keys(this.pendingRequests)) {
        // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
        const reqresp = this.pendingRequests[key];

        if (!reqresp) {
          continue;
        }

        // @ts-expect-error - TS2362 - The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
        if (new Date() - reqresp._created > 20000) {
          if (this.noResponseForStatus(reqresp.status)) {
            console.log("Dropping stale: " + key);
          } else if (!reqresp.awaitingPayload) {
            console.log(`Committing stale ${reqresp.status} ${reqresp.url}`);
            await this.fullCommit(reqresp, []);
          } else {
            console.log(`Waiting for payload for ${reqresp.url}`);
            continue;
          }
          // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
          delete this.pendingRequests[key];
        }
      }

      // @ts-expect-error - TS2339 - Property '_cachePageInfo' does not exist on type 'Recorder'.
      if (this._cachePageInfo) {
        // @ts-expect-error - TS2339 - Property '_doAddPage' does not exist on type 'Recorder'. | TS2339 - Property '_cachePageInfo' does not exist on type 'Recorder'.
        await this._doAddPage(this._cachePageInfo);
        // @ts-expect-error - TS2339 - Property '_cachePageInfo' does not exist on type 'Recorder'.
        this._cachePageInfo = null;
      }

      // @ts-expect-error - TS2339 - Property '_cacheSessionTotal' does not exist on type 'Recorder'.
      if (this._cacheSessionTotal > 0) {
        // @ts-expect-error - TS2339 - Property '_doIncSizes' does not exist on type 'Recorder'. | TS2339 - Property '_cacheSessionTotal' does not exist on type 'Recorder'. | TS2339 - Property '_cacheSessionNew' does not exist on type 'Recorder'.
        await this._doIncSizes(this._cacheSessionTotal, this._cacheSessionNew);
        // @ts-expect-error - TS2339 - Property '_cacheSessionTotal' does not exist on type 'Recorder'.
        this._cacheSessionTotal = 0;
        // @ts-expect-error - TS2339 - Property '_cacheSessionNew' does not exist on type 'Recorder'.
        this._cacheSessionNew = 0;
      }
    } finally {
      // @ts-expect-error - TS2339 - Property '_cleaningUp' does not exist on type 'Recorder'.
      this._cleaningUp = false;
    }
  }

  updateStatus() {
    // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
    const networkPending = Object.keys(this.pendingRequests).length;
    // @ts-expect-error - TS2339 - Property 'numPending' does not exist on type 'Recorder'. | TS2339 - Property '_fetchPending' does not exist on type 'Recorder'.
    this.numPending = networkPending + this._fetchPending.size;

    // @ts-expect-error - TS2339 - Property '_loadedDoneResolve' does not exist on type 'Recorder'.
    if (networkPending === 0 && this._loadedDoneResolve) {
      // @ts-expect-error - TS2339 - Property '_loadedDoneResolve' does not exist on type 'Recorder'.
      this._loadedDoneResolve();
    }

    // @ts-expect-error - TS2551 - Property 'doUpdateStatus' does not exist on type 'Recorder'. Did you mean 'updateStatus'?
    this.doUpdateStatus();
  }

  getStatusMsg() {
    return {
      // @ts-expect-error - TS2339 - Property 'running' does not exist on type 'Recorder'.
      recording: this.running,
      // @ts-expect-error - TS2339 - Property 'firstPageStarted' does not exist on type 'Recorder'.
      firstPageStarted: this.firstPageStarted,
      // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
      behaviorState: this.behaviorState,
      // @ts-expect-error - TS2339 - Property 'behaviorData' does not exist on type 'Recorder'.
      behaviorData: this.behaviorData,
      // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'Recorder'.
      autorun: this.autorun,
      // @ts-expect-error - TS2339 - Property 'sizeTotal' does not exist on type 'Recorder'.
      sizeTotal: this.sizeTotal,
      // @ts-expect-error - TS2339 - Property 'sizeNew' does not exist on type 'Recorder'.
      sizeNew: this.sizeNew,
      // @ts-expect-error - TS2339 - Property 'numUrls' does not exist on type 'Recorder'.
      numUrls: this.numUrls,
      // @ts-expect-error - TS2339 - Property 'numPages' does not exist on type 'Recorder'.
      numPages: this.numPages,
      // @ts-expect-error - TS2339 - Property 'numPending' does not exist on type 'Recorder'.
      numPending: this.numPending,
      // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
      pageUrl: this.pageInfo.url,
      // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
      pageTs: this.pageInfo.ts,
      // @ts-expect-error - TS2339 - Property 'failureMsg' does not exist on type 'Recorder'.
      failureMsg: this.failureMsg,
      // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'Recorder'.
      collId: this.collId,
      // @ts-expect-error - TS2339 - Property 'stopping' does not exist on type 'Recorder'.
      stopping: this.stopping,
      type: "status",
    };
  }

  async _doInjectTopFrame() {
    await this.newDocEval(MAIN_INJECT_URL, this.getInjectScript());

    // @ts-expect-error - TS7031 - Binding element 'data' implicitly has an 'any' type. | TS7031 - Binding element 'type' implicitly has an 'any' type.
    await this.exposeFunction(BEHAVIOR_LOG_FUNC, ({ data, type }) => {
      switch (type) {
        case "info":
          // @ts-expect-error - TS2339 - Property 'behaviorData' does not exist on type 'Recorder'.
          this.behaviorData = data;
          //console.log("bx log", JSON.stringify(data));
          this.updateStatus();
          break;
      }
    });
  }

  // @ts-expect-error - TS7006 - Parameter 'name' implicitly has an 'any' type. | TS7006 - Parameter 'source' implicitly has an 'any' type.
  async newDocEval(name, source) {
    source += "\n\n//# sourceURL=" + name;
    // @ts-expect-error - TS2345 - Argument of type '{ source: any; }' is not assignable to parameter of type 'null | undefined'.
    await this.send("Page.addScriptToEvaluateOnNewDocument", { source });
  }

  // @ts-expect-error - TS7006 - Parameter 'name' implicitly has an 'any' type. | TS7006 - Parameter 'expression' implicitly has an 'any' type.
  pageEval(name, expression, sessions = []) {
    expression += "\n\n//# sourceURL=" + name;
    return this.send(
      "Runtime.evaluate",
      // @ts-expect-error - TS2345 - Argument of type '{ expression: any; userGesture: boolean; includeCommandLineAPI: boolean; allowUnsafeEvalBlockedByCSP: boolean; awaitPromise: boolean; }' is not assignable to parameter of type 'null | undefined'.
      {
        expression,
        userGesture: true,
        includeCommandLineAPI: true,
        allowUnsafeEvalBlockedByCSP: true,
        //replMode: true,
        awaitPromise: true,
        //returnByValue: true,
      },
      sessions,
    );
  }

  // @ts-expect-error - TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  async _doInjectIframe(sessions) {
    try {
      //console.log("inject to: " + sessions[0]);
      await this.pageEval(IFRAME_INJECT_URL, this.getInjectScript(), sessions);
    } catch (e) {
      console.warn(e);
    }
  }

  toggleBehaviors() {
    // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
    switch (this.behaviorState) {
      case BEHAVIOR_WAIT_LOAD:
      case BEHAVIOR_DONE:
        break;

      case BEHAVIOR_READY_START:
        this.pageEval(
          "__awp_behavior_run__",
          "self.__bx_behaviors.run();",
          // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
        ).then(() => (this.behaviorState = BEHAVIOR_DONE));
        // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
        this.behaviorState = BEHAVIOR_RUNNING;
        break;

      case BEHAVIOR_RUNNING:
        this.pageEval(
          "__awp_behavior_unpause__",
          "self.__bx_behaviors.pause();",
        );
        // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
        this.behaviorState = BEHAVIOR_PAUSED;
        break;

      case BEHAVIOR_PAUSED:
        this.pageEval(
          "__awp_behavior_unpause__",
          "self.__bx_behaviors.unpause();",
        );
        // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
        this.behaviorState = BEHAVIOR_RUNNING;
        break;
    }

    this.updateStatus();
  }

  // @ts-expect-error - TS7006 - Parameter 'name' implicitly has an 'any' type. | TS7006 - Parameter 'func' implicitly has an 'any' type.
  async exposeFunction(name, func, sessions = []) {
    // @ts-expect-error - TS2339 - Property '_bindings' does not exist on type 'Recorder'.
    this._bindings[name] = func;
    // @ts-expect-error - TS2345 - Argument of type '{ name: any; }' is not assignable to parameter of type 'null | undefined'.
    await this.send("Runtime.addBinding", { name }, sessions);

    //await this.newDocEval("__awp_binding_wrap__", `
    //self._${name} = (args) => self.${name}(JSON.stringify(args));`, sessions);
  }

  loaded() {
    // @ts-expect-error - TS2551 - Property '_loaded' does not exist on type 'Recorder'. Did you mean 'loaded'?
    this._loaded = new Promise(
      // @ts-expect-error - TS2339 - Property '_loadedDoneResolve' does not exist on type 'Recorder'.
      (resolve) => (this._loadedDoneResolve = resolve),
    );
    // @ts-expect-error - TS2551 - Property '_loaded' does not exist on type 'Recorder'. Did you mean 'loaded'?
    return this._loaded;
  }

  async start() {
    // @ts-expect-error - TS2339 - Property 'firstPageStarted' does not exist on type 'Recorder'.
    this.firstPageStarted = false;

    await this.send("Page.enable");

    await this.send("DOMSnapshot.enable");

    await this.initPixRatio();

    await this._doInjectTopFrame();

    await this.sessionInit([]);

    // @ts-expect-error - TS2339 - Property 'failureMsg' does not exist on type 'Recorder'.
    this.failureMsg = null;
  }

  async initPixRatio() {
    const { result } = await this.pageEval(
      "__awp_get_pix_ratio",
      "window.devicePixelRatio",
    );
    if (result && result.type === "number") {
      // @ts-expect-error - TS2339 - Property 'pixelRatio' does not exist on type 'Recorder'.
      this.pixelRatio = result.value;
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  async sessionInit(sessions) {
    try {
      await this.send("Network.enable", null, sessions);

      try {
        await this.send(
          "Fetch.enable",
          // @ts-expect-error - TS2345 - Argument of type '{ patterns: { urlPattern: string; requestStage: string; }[]; }' is not assignable to parameter of type 'null | undefined'.
          { patterns: [{ urlPattern: "*", requestStage: "Response" }] },
          sessions,
        );
      } catch (e) {
        console.log("No Fetch Available", e);
      }

      try {
        await this.send("Media.enable", null, sessions);
      } catch (e) {
        console.log("No media events available");
      }

      await this.send(
        "Target.setAutoAttach",
        // @ts-expect-error - TS2345 - Argument of type '{ autoAttach: boolean; waitForDebuggerOnStart: boolean; flatten: any; }' is not assignable to parameter of type 'null | undefined'.
        {
          autoAttach: true,
          waitForDebuggerOnStart: true,
          // @ts-expect-error - TS2339 - Property 'flatMode' does not exist on type 'Recorder'.
          flatten: this.flatMode,
        },
        sessions,
      );

      // disable cache for now?
      await this.send(
        "Network.setCacheDisabled",
        // @ts-expect-error - TS2345 - Argument of type '{ cacheDisabled: boolean; }' is not assignable to parameter of type 'null | undefined'.
        { cacheDisabled: true },
        sessions,
      );
      await this.send(
        "Network.setBypassServiceWorker",
        // @ts-expect-error - TS2345 - Argument of type '{ bypass: boolean; }' is not assignable to parameter of type 'null | undefined'.
        { bypass: true },
        sessions,
      );
      // another option: clear cache, but don't disable
      await this.send("Network.clearBrowserCache", null, sessions);
    } catch (e) {
      console.warn("Session Init Error: ");
      console.log(e);
    }
  }

  async sessionClose(sessions = []) {
    await this.send("Page.disable");
    await this.send("DOMSnapshot.disable");

    await this.send("Debugger.disable");

    await this.send("Network.disable", null, sessions);

    await this.send("Fetch.disable", null, sessions);

    try {
      await this.send("Media.disable", null, sessions);
    } catch (e) {
      // ignore
    }

    // @ts-expect-error - TS2345 - Argument of type '{ autoAttach: boolean; waitForDebuggerOnStart: boolean; }' is not assignable to parameter of type 'null | undefined'.
    await this.send("Target.setAutoAttach", {
      autoAttach: false,
      waitForDebuggerOnStart: false,
    });

    await this.send(
      "Network.setBypassServiceWorker",
      // @ts-expect-error - TS2345 - Argument of type '{ bypass: boolean; }' is not assignable to parameter of type 'null | undefined'.
      { bypass: false },
      sessions,
    );
  }

  // @ts-expect-error - TS7006 - Parameter 'requestId' implicitly has an 'any' type.
  pendingReqResp(requestId, reuseOnly = false) {
    // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
    if (!this.pendingRequests[requestId]) {
      if (reuseOnly || !requestId) {
        return null;
      }
      // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
      this.pendingRequests[requestId] = new RequestResponseInfo(requestId);
      // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
    } else if (requestId !== this.pendingRequests[requestId].requestId) {
      console.error("Wrong Req Id!");
    }

    // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
    return this.pendingRequests[requestId];
  }

  // @ts-expect-error - TS7006 - Parameter 'requestId' implicitly has an 'any' type.
  removeReqResp(requestId) {
    // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
    const reqresp = this.pendingRequests[requestId];
    // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
    delete this.pendingRequests[requestId];
    return reqresp;
  }

  // @ts-expect-error - TS7006 - Parameter 'method' implicitly has an 'any' type. | TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  async processMessage(method, params, sessions) {
    switch (method) {
      case "Target.attachedToTarget":
        sessions.push(params.sessionId);

        try {
          // @ts-expect-error - TS2551 - Property 'sessionSet' does not exist on type 'Recorder'. Did you mean 'sessionClose'?
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
            console.log(
              "Target Attached: " +
                type +
                " " +
                params.targetInfo.url +
                " " +
                params.sessionId,
            );

            if (type === "page" || type === "iframe") {
              await this._doInjectIframe(sessions);
            }
          } else {
            console.log(
              "Not allowed attach for: " +
                type +
                " " +
                params.targetInfo.url +
                " " +
                params.sessionId,
            );

            // @ts-expect-error - TS2339 - Property 'flatMode' does not exist on type 'Recorder'.
            const params2 = this.flatMode
              ? { sessionId: params.sessionId }
              : { targetId: params.targetInfo.targetId };
            await this.send(
              "Runtime.runIfWaitingForDebugger",
              // @ts-expect-error - TS2345 - Argument of type '{ sessionId: any; targetId?: undefined; } | { targetId: any; sessionId?: undefined; }' is not assignable to parameter of type 'null | undefined'.
              params2,
              sessions,
            );
          }
        } catch (e) {
          console.log(e);
          console.warn(
            "Error attaching target: " +
              params.targetInfo.type +
              " " +
              params.targetInfo.url,
          );
        }
        break;

      case "Target.detachedFromTarget":
        console.log("Detaching from: " + params.sessionId);
        // @ts-expect-error - TS2551 - Property 'sessionSet' does not exist on type 'Recorder'. Did you mean 'sessionClose'?
        this.sessionSet.delete(params.sessionId);
        break;

      case "Target.receivedMessageFromTarget":
        // @ts-expect-error - TS2551 - Property 'sessionSet' does not exist on type 'Recorder'. Did you mean 'sessionClose'?
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

      case "Network.loadingFailed": {
        const reqresp = this.removeReqResp(params.requestId);
        if (reqresp && reqresp.status !== 206) {
          // check if this is a false positive -- a valid download that's already been fetched
          // the abort is just for page, but download will succeed
          if (
            params.type === "Document" &&
            params.errorText === "net::ERR_ABORTED" &&
            reqresp.isValidBinary()
          ) {
            this.fullCommit(reqresp, sessions);
          } else {
            console.log(
              `Loading Failed for: ${reqresp.url} ${params.errorText}`,
            );
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
        // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
        if (this.behaviorState === BEHAVIOR_RUNNING) {
          // @ts-expect-error - TS2345 - Argument of type '{ accept: boolean; }' is not assignable to parameter of type 'null | undefined'.
          await this.send("Page.handleJavaScriptDialog", { accept: false });
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
        // @ts-expect-error - TS2339 - Property '_bindings' does not exist on type 'Recorder'.
        if (this._bindings[params.name]) {
          // @ts-expect-error - TS2339 - Property '_bindings' does not exist on type 'Recorder'.
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

  // @ts-expect-error - TS7006 - Parameter 'url' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  handleWindowOpen(url, sessions) {
    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    const headers = new Headers({ Referer: this.pageInfo.url });
    this.doAsyncFetch({ url, headers, redirectOnly: true }, sessions);
  }

  isPagePDF() {
    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    return this.pageInfo.mime === "application/pdf";
  }

  async extractPDFText() {
    let success = false;
    // @ts-expect-error - TS2339 - Property 'pdfLoadURL' does not exist on type 'Recorder'.
    console.log("pdfLoadURL", this.pdfLoadURL);
    // @ts-expect-error - TS2339 - Property 'pdfLoadURL' does not exist on type 'Recorder'.
    if (this.pdfLoadURL) {
      const res = await this.pageEval(
        "__awp_pdf_extract__",
        `
      ${extractPDF};

      extractPDF("${
        // @ts-expect-error - TS2339 - Property 'pdfLoadURL' does not exist on type 'Recorder'.
        this.pdfLoadURL
      }", "${
        // @ts-expect-error - TS2339 - Property 'getExternalInjectURL' does not exist on type 'Recorder'.
        this.getExternalInjectURL("")
      }");
      `,
      );

      if (res.result) {
        const { type, value } = res.result;
        if (type === "string") {
          // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
          this.pageInfo.text = value;
          success = true;
        }
      }
    }

    return success;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async savePDF(pageInfo: any) {
    // @ts-expect-error: ignore param
    await this.send("Emulation.setEmulatedMedia", {type: "screen"});

    // @ts-expect-error: ignore param
    const resp = await this.send("Page.printToPDF", {printBackground: true});

    // @ts-expect-error: ignore param
    await this.send("Emulation.setEmulatedMedia", {type: ""});

    const payload = Buffer.from(resp.data, "base64");
    const mime = "application/pdf";

    const fullData = {
      url: "urn:pdf:" + pageInfo.url,
      ts: new Date().getTime(),
      status: 200,
      statusText: "OK",
      pageId: pageInfo.id,
      mime,
      respHeaders: {"Content-Type": mime, "Content-Length": payload.length + ""},
      reqHeaders: {},
      payload,
      extraOpts: {resource: true},
    };

    console.log("pdf", payload.length);

    // @ts-expect-error - TS2339 - Property '_doAddResource' does not exist on type 'Recorder'.
    await this._doAddResource(fullData);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async saveScreenshot(pageInfo: any) {

    // View Screenshot
    const width = 1920;
    const height = 1080;

    // @ts-expect-error: ignore param
    await this.send("Emulation.setDeviceMetricsOverride", {width, height, deviceScaleFactor: 0, mobile: false});
    // @ts-expect-error: ignore param
    const resp = await this.send("Page.captureScreenshot", {format: "png"});

    const payload = Buffer.from(resp.data, "base64");
    const blob = new Blob([payload], {type: "image/png"});

    await this.send("Emulation.clearDeviceMetricsOverride");
    
    const mime = "image/png";

    const fullData = {
      url: "urn:view:" + pageInfo.url,
      ts: new Date().getTime(),
      status: 200,
      statusText: "OK",
      pageId: pageInfo.id,
      mime,
      respHeaders: {"Content-Type": mime, "Content-Length": payload.length + ""},
      reqHeaders: {},
      payload,
      extraOpts: {resource: true},
    };

    const thumbWidth = 640;
    const thumbHeight = 360;

    const bitmap = await self.createImageBitmap(blob, {resizeWidth: thumbWidth, resizeHeight: thumbHeight});
    
    const canvas = new OffscreenCanvas(thumbWidth, thumbWidth);
    const context = canvas.getContext("bitmaprenderer")!;
    context.transferFromImageBitmap(bitmap);

    const resizedBlob = await canvas.convertToBlob({type: "image/png"});

    const thumbPayload = new Uint8Array(await resizedBlob.arrayBuffer());

    const thumbData = {...fullData,
      url: "urn:thumbnail:" + pageInfo.url,
      respHeaders: {"Content-Type": mime, "Content-Length": thumbPayload.length + ""},
      payload: thumbPayload
    };
    
    // @ts-expect-error - TS2339 - Property '_doAddResource' does not exist on type 'Recorder'.
    await this._doAddResource(fullData);


    // @ts-expect-error - TS2339 - Property '_doAddResource' does not exist on type 'Recorder'.
    await this._doAddResource(thumbData);
  }

  async getFullText(finishing = false) {
    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'. | TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    if (!this.pageInfo?.url) {
      return null;
    }

    if (this.isPagePDF() && !finishing) {
      await this.extractPDFText();
      return null;
    }

    try {
      // wait upto 10s for getDocument, otherwise proceed
      return await Promise.race([
        //this.send("DOM.getDocument", {"depth": -1, "pierce": true}),
        // @ts-expect-error - TS2345 - Argument of type '{ computedStyles: never[]; }' is not assignable to parameter of type 'null | undefined'.
        this.send("DOMSnapshot.captureSnapshot", { computedStyles: [] }),
        sleep(10000),
      ]);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'params' implicitly has an 'any' type.
  async unpauseAndFinish(params) {
    let domSnapshot = null;

    // determine if this is the unload from the injected content script
    // if not, unpause but don't extract full text
    const ourUnload = params.callFrames[0].url === MAIN_INJECT_URL;

    // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
    if (ourUnload && this.behaviorState !== BEHAVIOR_WAIT_LOAD) {
      domSnapshot = await this.getFullText(true);
    }

    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    const currPage = this.pageInfo;

    try {
      await this.send("Debugger.resume");
    } catch (e) {
      console.warn(e);
    }

    // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
    if (this.behaviorState === BEHAVIOR_RUNNING) {
      await this.toggleBehaviors();
    }

    // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
    if (ourUnload && this.behaviorState !== BEHAVIOR_WAIT_LOAD) {
      this.flushPending();

      await this.commitPage(currPage, domSnapshot, true);
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'currPage' implicitly has an 'any' type. | TS7006 - Parameter 'domSnapshot' implicitly has an 'any' type. | TS7006 - Parameter 'finished' implicitly has an 'any' type.
  commitPage(currPage, domSnapshot, finished) {
    if (!currPage?.url || !currPage.ts || currPage.url === "about:blank") {
      return;
    }

    if (domSnapshot) {
      currPage.text = this.parseTextFromDOMSnapshot(domSnapshot);
    } else if (!currPage.text) {
      console.warn("No Full Text Update");
    }

    currPage.finished = finished;

    // @ts-expect-error - TS2339 - Property '_doAddPage' does not exist on type 'Recorder'.
    const res = this._doAddPage(currPage);
    // @ts-expect-error - TS2339 - Property '_cachePageInfo' does not exist on type 'Recorder'.
    if (currPage === this._cachePageInfo) {
      // @ts-expect-error - TS2339 - Property '_cachePageInfo' does not exist on type 'Recorder'.
      this._cachePageInfo = null;
    }
    return res;
  }

  // @ts-expect-error - TS7006 - Parameter 'data' implicitly has an 'any' type. | TS7006 - Parameter 'pageInfo' implicitly has an 'any' type.
  async commitResource(data, pageInfo) {
    const payloadSize = data.payload.length;
    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    pageInfo = pageInfo || this.pageInfo;
    pageInfo.size += payloadSize;

    // @ts-expect-error - TS2339 - Property 'sizeTotal' does not exist on type 'Recorder'.
    this.sizeTotal += payloadSize;
    // @ts-expect-error - TS2339 - Property 'numUrls' does not exist on type 'Recorder'.
    this.numUrls++;

    // @ts-expect-error - TS2339 - Property '_doAddResource' does not exist on type 'Recorder'.
    const writtenSize = await this._doAddResource(data);

    // @ts-expect-error - TS2339 - Property 'sizeNew' does not exist on type 'Recorder'.
    this.sizeNew += writtenSize;

    // @ts-expect-error - TS2339 - Property '_cachePageInfo' does not exist on type 'Recorder'.
    this._cachePageInfo = pageInfo;
    // @ts-expect-error - TS2339 - Property '_cacheSessionTotal' does not exist on type 'Recorder'.
    this._cacheSessionTotal += payloadSize;
    // @ts-expect-error - TS2339 - Property '_cacheSessionNew' does not exist on type 'Recorder'.
    this._cacheSessionNew += writtenSize;
  }

  // @ts-expect-error - TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  receiveMessageFromTarget(params, sessions) {
    const nestedParams = JSON.parse(params.message);

    if (nestedParams.id != undefined) {
      // @ts-expect-error - TS2339 - Property '_promises' does not exist on type 'Recorder'.
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
        // @ts-expect-error - TS2339 - Property '_promises' does not exist on type 'Recorder'.
        delete this._promises[nestedParams.id];
      }
    } else if (nestedParams.params != undefined) {
      //console.log("RECV MSG " + nestedParams.method + " " + nestedParams.message);
      this.processMessage(nestedParams.method, nestedParams.params, sessions);
    }
  }

  //from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  newPageId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // @ts-expect-error - TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  initPage(params, sessions) {
    if (params.frame.parentId) {
      return false;
    }

    //console.log("Page.frameNavigated: " + params.frame.url + " " + params.frame.id);
    // @ts-expect-error - TS2339 - Property 'frameId' does not exist on type 'Recorder'.
    if (this.frameId != params.frame.id) {
      // @ts-expect-error - TS2339 - Property 'historyMap' does not exist on type 'Recorder'.
      this.historyMap = {};
    }

    // @ts-expect-error - TS2339 - Property 'frameId' does not exist on type 'Recorder'.
    this.frameId = params.frame.id;
    // @ts-expect-error - TS2551 - Property 'loaderId' does not exist on type 'Recorder'. Did you mean 'loaded'?
    this.loaderId = params.frame.loaderId;

    this._initNewPage(params.frame.url, params.frame.mimeType);

    // @ts-expect-error - TS2551 - Property 'loaderId' does not exist on type 'Recorder'. Did you mean 'loaded'?
    const reqresp = this.removeReqResp(this.loaderId);
    if (reqresp) {
      this.fullCommit(reqresp, sessions);
    }

    return true;
  }

  initFirstPage() {
    // Disable debugger intercept due to occasional crashes on some pages
    // Enable unload pause only on first full page that is being recorded
    //await this.send("Debugger.enable");
    //await this.send("DOMDebugger.setEventListenerBreakpoint", {"eventName": "beforeunload"});
    this.updateStatus();
    // @ts-expect-error - TS2339 - Property 'firstPageStarted' does not exist on type 'Recorder'.
    this.firstPageStarted = true;
  }

  // @ts-expect-error - TS7006 - Parameter 'url' implicitly has an 'any' type. | TS7006 - Parameter 'mime' implicitly has an 'any' type.
  _initNewPage(url, mime) {
    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
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

    // @ts-expect-error - TS2339 - Property 'pdfLoadURL' does not exist on type 'Recorder'.
    this.pdfLoadURL = null;

    // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
    this.behaviorState = BEHAVIOR_WAIT_LOAD;
    // @ts-expect-error - TS2339 - Property 'behaviorData' does not exist on type 'Recorder'.
    this.behaviorData = null;

    // @ts-expect-error - TS2339 - Property 'numPages' does not exist on type 'Recorder'.
    this.numPages++;

    // @ts-expect-error - TS2339 - Property '_fetchUrls' does not exist on type 'Recorder'.
    this._fetchUrls.clear();

    // @ts-expect-error - TS2339 - Property 'firstPageStarted' does not exist on type 'Recorder'.
    if (!this.firstPageStarted) {
      this.initFirstPage();
    }

    // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
    this.behaviorState = BEHAVIOR_WAIT_LOAD;
  }

  // @ts-expect-error - TS7006 - Parameter 'favIconUrl' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  loadFavIcon(favIconUrl, sessions) {
    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'. | TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    if (favIconUrl && this.pageInfo && this.pageInfo.favIconUrl != favIconUrl) {
      // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
      this.pageInfo.favIconUrl = favIconUrl;

      this.doAsyncFetch({ url: favIconUrl }, sessions);
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  async updatePage(sessions) {
    //console.log("updatePage", this.pageInfo);

    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
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

    // @ts-expect-error - TS2339 - Property 'historyMap' does not exist on type 'Recorder'.
    this.historyMap[id] = result.entries[id].url;

    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    this.pageInfo.title = result.entries[id].title || result.entries[id].url;

    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    const pageInfo = this.pageInfo;

    if (this.archiveScreenshots) {
      await this.saveScreenshot(pageInfo);
    }

    if (this.archivePDF) {
      await this.savePDF(pageInfo);
    }

    const [domSnapshot, favIcon] = await Promise.all([
      this.getFullText(),
      // @ts-expect-error - TS2339 - Property 'getFavIcon' does not exist on type 'Recorder'.
      this.getFavIcon(),
    ]);

    if (favIcon) {
      this.loadFavIcon(favIcon, sessions);
    }

    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    await this.commitPage(this.pageInfo, domSnapshot, false);

    this.updateStatus();

    await this.loaded();

    // don't mark as ready if page changed
    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    if (pageInfo === this.pageInfo) {
      // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'Recorder'.
      this.behaviorState = BEHAVIOR_READY_START;

      // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'Recorder'.
      if (this.autorun) {
        await this.toggleBehaviors();
      }
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  async updateHistory(sessions) {
    if (sessions.length) {
      return;
    }

    const result = await this.send("Page.getNavigationHistory", null, sessions);
    const id = result.currentIndex;
    if (
      id === result.entries.length - 1 &&
      // @ts-expect-error - TS2339 - Property 'historyMap' does not exist on type 'Recorder'.
      this.historyMap[id] !== result.entries[id].url
    ) {
      //console.log("New History Entry: " + JSON.stringify(result.entries[id]));
      // @ts-expect-error - TS2339 - Property 'historyMap' does not exist on type 'Recorder'.
      this.historyMap[id] = result.entries[id].url;
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'method' implicitly has an 'any' type. | TS7006 - Parameter 'headers' implicitly has an 'any' type. | TS7006 - Parameter 'resourceType' implicitly has an 'any' type.
  shouldSkip(method, headers, resourceType) {
    if (headers && !method) {
      method = headers[":method"];
    }

    if (method === "OPTIONS" || method === "HEAD") {
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
    if (
      headers &&
      (headers["accept"] === "text/event-stream" ||
        headers["Accept"] === "text/event-stream")
    ) {
      return true;
    }

    return false;
  }

  // @ts-expect-error - TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  async handlePaused(params, sessions) {
    let continued = false;
    let reqresp: TODOFixMe = null;

    let skip = false;

    if (
      this.shouldSkip(
        params.request.method,
        params.request.headers,
        params.resourceType,
      )
    ) {
      skip = true;
    } else if (!params.responseStatusCode && !params.responseErrorReason) {
      skip = true;
    }

    try {
      if (!skip) {
        reqresp = await this.handleFetchResponse(params, sessions);

        try {
          if (reqresp?.payload) {
            continued = await this.rewriteResponse(params, reqresp, sessions);
          }
        } catch (e) {
          console.error("Fetch rewrite failed for: " + params.request.url);
          console.error(e);
        }
      }
    } catch (e) {
      console.warn(e);
    }

    if (!continued) {
      try {
        await this.send(
          "Fetch.continueResponse",
          // @ts-expect-error - TS2345 - Argument of type '{ requestId: any; }' is not assignable to parameter of type 'null | undefined'.
          { requestId: params.requestId },
          sessions,
        );
      } catch (e) {
        console.warn("Continue failed for: " + params.request.url, e);
      }
    }

    // if finished and matches current frameId, commit right away
    if (
      reqresp?.payload?.length &&
      // @ts-expect-error - TS2339 - Property 'frameId' does not exist on type 'Recorder'.
      params.frameId === this.frameId &&
      !isNaN(Number(reqresp.requestId))
    ) {
      this.removeReqResp(reqresp.requestId);
      this.fullCommit(reqresp, sessions);
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'reqresp' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  async rewriteResponse(params, reqresp, sessions) {
    if (!reqresp?.payload) {
      return false;
    }

    const payload = reqresp.payload;

    if (!payload.length) {
      return false;
    }

    let newString = null;
    let string = null;

    const { url, extraOpts } = reqresp;

    const ct = this._getContentType(params.responseHeaders);

    switch (ct) {
      case "application/x-mpegURL":
      case "application/vnd.apple.mpegurl":
        string = payload.toString("utf-8");
        newString = rewriteHLS(string, { save: reqresp.extraOpts });
        break;

      case "application/dash+xml":
        string = payload.toString("utf-8");
        newString = rewriteDASH(string, { save: reqresp.extraOpts });
        break;

      case "text/html":
      case "application/json":
      case "text/javascript":
      case "application/javascript":
      case "application/x-javascript": {
        const rw = getCustomRewriter(url, ct === "text/html");

        if (rw) {
          string = payload.toString();
          newString = rw.rewrite(string, { save: extraOpts });
        }
      }
    }

    if (!newString) {
      return false;
    }

    if (newString !== string) {
      reqresp.extraOpts.rewritten = 1;
      reqresp.payload = encoder.encode(newString);

      console.log("Rewritten Response for: " + params.request.url);
    }

    const base64Str = Buffer.from(newString).toString("base64");

    try {
      await this.send(
        "Fetch.fulfillRequest",
        // @ts-expect-error - TS2345 - Argument of type '{ requestId: any; responseCode: any; responseHeaders: any; body: string; }' is not assignable to parameter of type 'null | undefined'.
        {
          requestId: params.requestId,
          responseCode: params.responseStatusCode,
          responseHeaders: params.responseHeaders,
          body: base64Str,
        },
        sessions,
      );
      //console.log("Replace succeeded? for: " + params.request.url);
      return true;
    } catch (e) {
      console.warn("Fulfill Failed for: " + params.request.url + " " + e);
    }

    return false;
  }

  // @ts-expect-error - TS7006 - Parameter 'headers' implicitly has an 'any' type.
  _getContentType(headers) {
    for (const header of headers) {
      if (header.name.toLowerCase() === "content-type") {
        return header.value.split(";")[0];
      }
    }

    return null;
  }

  // @ts-expect-error - TS7006 - Parameter 'status' implicitly has an 'any' type.
  noResponseForStatus(status) {
    return !status || status === 204 || (status >= 300 && status < 400);
  }

  // @ts-expect-error - TS7006 - Parameter 'url' implicitly has an 'any' type.
  isValidUrl(url) {
    return url && (url.startsWith("https:") || url.startsWith("http:"));
  }

  // @ts-expect-error - TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  async handleLoadingFinished(params, sessions) {
    const reqresp = this.removeReqResp(params.requestId);

    if (!reqresp?.url) {
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
        payload = await this.fetchPayloads(
          params,
          reqresp,
          sessions,
          "Network.getResponseBody",
        );
      }
      if (!payload?.length) {
        return;
      }
      reqresp.payload = payload;
    }

    this.fullCommit(reqresp, sessions);
  }

  // @ts-expect-error - TS7006 - Parameter 'reqresp' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  async fullCommit(reqresp, sessions) {
    //const requestId = reqresp.requestId;

    // let doneResolve;

    // const pending = new Promise((resolve) => {
    //   doneResolve = resolve;
    // });

    //this._fetchPending.set(requestId, pending);

    try {
      const data = reqresp.toDBRecord(
        reqresp.payload,
        // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
        this.pageInfo,
        this.archiveCookies,
      );

      // top-level URL is a non-GET request
      if (
        data?.requestUrl &&
        // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
        data.requestUrl === this.pageInfo.url &&
        !sessions.length
      ) {
        // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
        this.pageInfo.url = data.url;
      }

      // top-level page resource
      // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
      if (data && !sessions.length && reqresp.url === this.pageInfo.url) {
        // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
        this.pageInfo.ts = reqresp.ts;

        if (
          data.mime === "application/pdf" &&
          reqresp.payload &&
          // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
          this.pageInfo
        ) {
          // ensure set for electron
          // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
          this.pageInfo.mime = "application/pdf";
          // @ts-expect-error - TS2339 - Property 'pdfLoadURL' does not exist on type 'Recorder'.
          this.pdfLoadURL = reqresp.url;
        } else {
          if (!data.extraOpts) {
            data.extraOpts = {};
          }

          // @ts-expect-error - TS2339 - Property 'pixelRatio' does not exist on type 'Recorder'.
          data.extraOpts.pixelRatio = this.pixelRatio;

          // handle storage
          const storage = await this.getStorage(sessions);

          if (storage) {
            data.extraOpts.storage = storage;
          }
        }
      }

      if (data) {
        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
        await this.commitResource(data);
      }
    } catch (e) {
      console.log("error committing", e);
    }

    //doneResolve();
    //delete this._fetchPending[requestId];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getStorage(sessions: any) {
    // check if recording storage is allowed
    if (!this.archiveStorage) {
      return null;
    }

    const extractStorage = () => {
      const local: [string, string][] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        const value = localStorage.getItem(key);
        if (!value) continue;
        local.push([key, value]);
      }
      const session: [string, string][] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (!key) continue;
        const value = sessionStorage.getItem(key);
        if (!value) continue;
        session.push([key, value]);
      }
      return JSON.stringify({ local, session });
    };

    const { result } = await this.pageEval(
      "__awp_extract_storage",
      `(${extractStorage.toString()})();`,
      sessions,
    );

    if (result && result.type === "string") {
      return result.value;
    } else {
      return null;
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'params' implicitly has an 'any' type.
  async handleRequestWillBeSent(params) {
    if (
      this.shouldSkip(
        params.request.method,
        params.request.headers,
        params.type,
      )
    ) {
      this.removeReqResp(params.requestId);
      return;
    }

    const reqresp = this.pendingReqResp(params.requestId);

    let data = null;

    if (params.redirectResponse) {
      if (reqresp.isSelfRedirect()) {
        console.warn(`Skip self redirect: ${reqresp.url}`);
        this.removeReqResp(params.requestId);
        return;
      }

      reqresp.fillResponseRedirect(params);
      // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
      data = reqresp.toDBRecord(null, this.pageInfo, this.archiveCookies);
    }

    reqresp.fillRequest(params);

    // commit redirect response, if any
    if (data) {
      // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
      await this.commitResource(data);
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  async handleFetchResponse(params, sessions) {
    if (!params.networkId) {
      //console.warn(`No networkId for ${params.request.url} ${params.resourceType}`);
    }

    // @ts-expect-error - TS2339 - Property 'pdfLoadURL' does not exist on type 'Recorder'. | TS2339 - Property 'pdfLoadURL' does not exist on type 'Recorder'.
    if (this.pdfLoadURL && params.request.url === this.pdfLoadURL) {
      return null;
    }

    const id = params.networkId || params.requestId;

    const reqresp = this.pendingReqResp(id);

    reqresp.fillFetchRequestPaused(params);

    reqresp.payload = await this.fetchPayloads(
      params,
      reqresp,
      sessions,
      "Fetch.getResponseBody",
    );

    if (reqresp.status === 206) {
      this.removeReqResp(id);
    }

    return reqresp;
  }

  // @ts-expect-error - TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  parseMediaEventsAdded(params, sessions) {
    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    if (!this.pageInfo.id) {
      return;
    }

    for (const { value } of params.events) {
      if (value.indexOf('"kLoad"') > 0) {
        const { url } = JSON.parse(value);
        this.doAsyncFetch({ url, doRangeCheck: true }, sessions);
        break;
      }
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'request' implicitly has an 'any' type. | TS7006 - Parameter 'resp' implicitly has an 'any' type.
  async attemptFetchRedirect(request: FetchEntry, resp) {
    if (request.redirectOnly && resp.type === "opaqueredirect") {
      const abort = new AbortController();
      // @ts-expect-error - TS2345 - Argument of type '{ abort: AbortController; }' is not assignable to parameter of type 'RequestInit'.
      resp = await fetch(request.url, { abort });
      abort.abort();

      if (resp.redirected) {
        console.warn(`Adding synthetic redirect ${request.url} -> ${resp.url}`);
        return Response.redirect(resp.url, 302);
      }
    }

    console.warn(
      `async fetch error ${resp.status}, opaque due to redirect, retrying in browser`,
    );
    // @ts-expect-error - TS2554 - Expected 2 arguments, but got 3.
    await this.doAsyncFetchInBrowser(request, request.sessions, true);
    return null;
  }

  // @ts-expect-error - TS7006 - Parameter 'request' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  async doAsyncFetchInBrowser(request, sessions) {
    // @ts-expect-error - TS2339 - Property '_fetchUrls' does not exist on type 'Recorder'.
    this._fetchUrls.add(request.url);

    const expression = `self.__bx_behaviors.doAsyncFetch("${request.url}")`;

    console.log("Start Async Load: " + request.url);

    await this.pageEval("__awp_async_fetch__", expression, sessions);
    //console.log("Async Fetch Result: " + JSON.stringify(result));
  }

  // @ts-expect-error - TS7006 - Parameter 'request' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  doAsyncFetch(request: FetchEntry, sessions) {
    if (!request || !this.isValidUrl(request.url)) {
      return;
    }

    if (request.doRangeCheck) {
      const url = removeRangeAsQuery(request.url);
      if (url) {
        request.url = url;
        request.rangeRemoved = true;
      }
    }

    // @ts-expect-error - TS2339 - Property '_fetchUrls' does not exist on type 'Recorder'.
    if (this._fetchUrls.has(request.url)) {
      console.log("Skipping, already fetching: " + request.url);
      return;
    }

    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    request.pageInfo = this.pageInfo;
    request.sessions = sessions;

    this._fetchQueue.push(request);

    this.doBackgroundFetch();
  }

  async doBackgroundFetch() {
    if (
      !this._fetchQueue.length ||
      // @ts-expect-error - TS2339 - Property '_fetchPending' does not exist on type 'Recorder'.
      this._fetchPending.size >= MAX_CONCURRENT_FETCH ||
      // @ts-expect-error - TS2339 - Property 'stopping' does not exist on type 'Recorder'.
      this.stopping
    ) {
      return;
    }

    const request = this._fetchQueue.shift();
    if (!request) {
      return;
    }

    // @ts-expect-error - TS2339 - Property '_fetchUrls' does not exist on type 'Recorder'.
    if (this._fetchUrls.has(request.url)) {
      console.log("Skipping, already fetching: " + request.url);
      return;
    }

    let doneResolve;
    const fetchId = "fetch-" + this.newPageId();

    try {
      console.log("Start Async Load: " + request.url);

      // @ts-expect-error - TS2339 - Property '_fetchUrls' does not exist on type 'Recorder'.
      this._fetchUrls.add(request.url);

      const pending = new Promise((resolve) => {
        doneResolve = resolve;
      });

      // @ts-expect-error - TS2339 - Property '_fetchPending' does not exist on type 'Recorder'.
      this._fetchPending.set(fetchId, pending);

      // @ts-expect-error - TS2339 - Property 'defaultFetchOpts' does not exist on type 'Recorder'.
      const opts = { ...this.defaultFetchOpts };

      if (request.headers) {
        opts.headers = request.headers;
        opts.headers.delete("range");
      }

      let resp = await fetch(request.url, opts);
      if (resp.status === 0) {
        // @ts-expect-error - TS2322 - Type 'Response | null' is not assignable to type 'Response'.
        resp = await this.attemptFetchRedirect(request, resp);
        if (!resp) {
          return;
        }
      } else if (resp.status >= 400) {
        console.warn(
          `async fetch error ${resp.status}, retrying without headers`,
        );
        // @ts-expect-error - TS2339 - Property 'defaultFetchOpts' does not exist on type 'Recorder'.
        resp = await fetch(request.url, this.defaultFetchOpts);
        if (resp.status >= 400) {
          console.warn(
            `async fetch returned: ${resp.status}, trying in-browser fetch`,
          );
          // @ts-expect-error - TS2554 - Expected 2 arguments, but got 3.
          await this.doAsyncFetchInBrowser(request, request.sessions, true);
          return;
        }
      }

      const payload = await resp.arrayBuffer();

      const reqresp = new RequestResponseInfo(fetchId);
      // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RequestResponseInfo'.
      reqresp.status = resp.status;
      // @ts-expect-error - TS2339 - Property 'statusText' does not exist on type 'RequestResponseInfo'.
      reqresp.statusText = resp.statusText;
      // @ts-expect-error - TS2339 - Property 'responseHeaders' does not exist on type 'RequestResponseInfo'.
      reqresp.responseHeaders = Object.fromEntries(resp.headers);

      // @ts-expect-error - TS2339 - Property 'method' does not exist on type 'RequestResponseInfo'.
      reqresp.method = "GET";
      // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RequestResponseInfo'.
      reqresp.url = request.url;
      // @ts-expect-error - TS2339 - Property 'payload' does not exist on type 'RequestResponseInfo'.
      reqresp.payload = new Uint8Array(payload);

      const data = reqresp.toDBRecord(
        // @ts-expect-error - TS2339 - Property 'payload' does not exist on type 'RequestResponseInfo'.
        reqresp.payload,
        request.pageInfo,
        this.archiveCookies,
      );

      if (data) {
        await this.commitResource(data, request.pageInfo);
        console.log(`Done Async Load (${resp.status}) ${request.url}`);

        // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
        if (this.pageInfo !== request.pageInfo) {
          // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
          await this.commitPage(request.pageInfo);
        }
      } else {
        console.warn(
          "No Data Committed for: " + request.url + " Status: " + resp.status,
        );
      }
    } catch (e) {
      console.log(e);
      // @ts-expect-error - TS2339 - Property '_fetchUrls' does not exist on type 'Recorder'.
      this._fetchUrls.delete(request.url);
    } finally {
      // @ts-expect-error - TS2722 - Cannot invoke an object which is possibly 'undefined'.
      doneResolve();
      // @ts-expect-error - TS2339 - Property '_fetchPending' does not exist on type 'Recorder'.
      this._fetchPending.delete(fetchId);
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'reqresp' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type. | TS7006 - Parameter 'method' implicitly has an 'any' type.
  async fetchPayloads(params, reqresp, sessions, method) {
    let payload;

    if (reqresp.status === 206) {
      sleep(500).then(() =>
        this.doAsyncFetch(
          {
            url: reqresp.url,
            headers: reqresp.getRequestHeadersDict().headers,
          },
          sessions,
        ),
      );
      reqresp.payload = null;
      return null;
    } else {
      const changedUrl = removeRangeAsQuery(reqresp.url);

      if (changedUrl) {
        reqresp.url = changedUrl;
        this.removeReqResp(reqresp.requestId);
        sleep(500).then(() =>
          this.doAsyncFetch(
            {
              url: changedUrl,
              headers: reqresp.getRequestHeadersDict().headers,
              rangeRemoved: true,
            },
            sessions,
          ),
        );
        reqresp.payload = null;
        return null;
      }
    }

    if (!this.noResponseForStatus(reqresp.status)) {
      try {
        reqresp.awaitingPayload = true;
        payload = await this.send(
          method,
          // @ts-expect-error - TS2345 - Argument of type '{ requestId: any; }' is not assignable to parameter of type 'null | undefined'.
          { requestId: params.requestId },
          sessions,
        );

        if (payload.base64Encoded) {
          payload = Buffer.from(payload.body, "base64");
        } else {
          payload = Buffer.from(payload.body, "utf-8");
        }
      } catch (e) {
        console.warn(
          "no buffer for: " +
            reqresp.url +
            " " +
            reqresp.status +
            " " +
            reqresp.requestId +
            " " +
            method,
        );
        console.warn(e);
        return null;
      } finally {
        reqresp.awaitingPayload = false;
      }
    } else {
      payload = Buffer.from([]);
    }

    if (reqresp.hasPostData && !reqresp.postData) {
      try {
        const postRes = await this.send(
          "Network.getRequestPostData",
          // @ts-expect-error - TS2345 - Argument of type '{ requestId: any; }' is not assignable to parameter of type 'null | undefined'.
          { requestId: reqresp.requestId },
          sessions,
        );
        reqresp.postData = Buffer.from(postRes.postData, "utf-8");
      } catch (e) {
        console.warn("Error getting POST data: " + e);
      }
    }

    reqresp.payload = payload;
    return payload;
  }

  flushPending() {
    // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
    const oldPendingReqs = this.pendingRequests;
    // @ts-expect-error - TS2339 - Property 'pageInfo' does not exist on type 'Recorder'.
    const pageInfo = this.pageInfo;
    // @ts-expect-error - TS2551 - Property 'pendingRequests' does not exist on type 'Recorder'. Did you mean 'pendingReqResp'?
    this.pendingRequests = {};

    if (!oldPendingReqs) {
      return;
    }

    for (const [id, reqresp] of Object.entries(oldPendingReqs)) {
      // @ts-expect-error - TS2571 - Object is of type 'unknown'.
      if (reqresp.payload) {
        // @ts-expect-error - TS2571 - Object is of type 'unknown'.
        console.log(`Committing Finished ${id} - ${reqresp.url}`);
        // @ts-expect-error - TS2571 - Object is of type 'unknown'. | TS2571 - Object is of type 'unknown'.
        const data = reqresp.toDBRecord(
          // @ts-expect-error - TS2571 - Object is of type 'unknown'. | TS2571 - Object is of type 'unknown'.
          reqresp.payload,
          pageInfo,
          this.archiveCookies,
        );

        if (data) {
          // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
          this.commitResource(data);
        }

        // top-level page resource
        // @ts-expect-error - TS2571 - Object is of type 'unknown'.
        if (data && reqresp.url === pageInfo.url) {
          // @ts-expect-error - TS2571 - Object is of type 'unknown'.
          pageInfo.ts = reqresp.ts;
        }
      } else {
        // @ts-expect-error - TS2571 - Object is of type 'unknown'.
        console.log(`Discarding Payload-less ${reqresp.url}`);
      }
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'method' implicitly has an 'any' type.
  send(method, params = null, sessions = []) {
    let promise = null;

    // @ts-expect-error - TS2339 - Property 'flatMode' does not exist on type 'Recorder'.
    if (this.flatMode && sessions.length) {
      // @ts-expect-error - TS2339 - Property '_doSendCommandFlat' does not exist on type 'Recorder'.
      return this._doSendCommandFlat(
        method,
        params,
        sessions[sessions.length - 1],
      );
    }

    for (let i = sessions.length - 1; i >= 0; i--) {
      // @ts-expect-error - TS2339 - Property 'id' does not exist on type 'Recorder'.
      const id = this.id++;

      const p = new Promise((resolve, reject) => {
        // @ts-expect-error - TS2339 - Property '_promises' does not exist on type 'Recorder'.
        this._promises[id] = { resolve, reject, method };
      });

      if (!promise) {
        promise = p;
      }

      //let message = params ? {id, method, params} : {id, method};
      const message = JSON.stringify({ id, method, params });

      //const sessionId = sessions[sessions.length - 1 - i];
      const sessionId = sessions[i];

      // @ts-expect-error - TS2322 - Type '{ sessionId: never; message: string; }' is not assignable to type 'null'.
      params = { sessionId, message };
      method = "Target.sendMessageToTarget";
    }

    // @ts-expect-error - TS2339 - Property '_doSendCommand' does not exist on type 'Recorder'.
    return this._doSendCommand(method, params, promise);
  }

  // @ts-expect-error - TS7006 - Parameter 'result' implicitly has an 'any' type.
  parseTextFromDOMSnapshot(result) {
    const TEXT_NODE = 3;
    const ELEMENT_NODE = 1;

    const SKIPPED_NODES = [
      "SCRIPT",
      "STYLE",
      "HEADER",
      "FOOTER",
      "BANNER-DIV",
      "NOSCRIPT",
    ];

    const { strings, documents } = result;

    const accum = [];

    for (const doc of documents) {
      const nodeValues = doc.nodes.nodeValue;
      const nodeNames = doc.nodes.nodeName;
      const nodeTypes = doc.nodes.nodeType;
      const parentIndex = doc.nodes.parentIndex;

      for (let i = 0; i < nodeValues.length; i++) {
        if (nodeValues[i] === -1) {
          continue;
        }

        if (nodeTypes[i] === TEXT_NODE) {
          const pi = parentIndex[i];
          if (pi >= 0 && nodeTypes[pi] === ELEMENT_NODE) {
            const name = strings[nodeNames[pi]];

            if (!SKIPPED_NODES.includes(name)) {
              const value = strings[nodeValues[i]].trim();
              if (value) {
                accum.push(value);
              }
            }
          }
        }
      }

      return accum.join("\n");
    }
  }

  // parseTextFromDom(dom) {
  //   const accum = [];
  //   const metadata = {};

  //   this._parseText(dom.root, metadata, accum);

  //   return accum.join("\n");
  // }

  // _parseText(node, metadata, accum) {
  //   const SKIPPED_NODES = ["script", "style", "header", "footer", "banner-div", "noscript"];
  //   const EMPTY_LIST = [];
  //   const TEXT = "#text";
  //   const TITLE = "title";

  //   const name = node.nodeName.toLowerCase();

  //   if (SKIPPED_NODES.includes(name)) {
  //     return;
  //   }

  //   const children = node.children || EMPTY_LIST;

  //   if (name === TEXT) {
  //     const value = node.nodeValue ? node.nodeValue.trim() : "";
  //     if (value) {
  //       accum.push(value);
  //     }
  //   } else if (name === TITLE) {
  //     const title = [];

  //     for (let child of children) {
  //       this._parseText(child, null, title);
  //     }

  //     if (metadata) {
  //       metadata.title = title.join(" ");
  //     } else {
  //       accum.push(title.join(" "));
  //     }
  //   } else {
  //     for (let child of children) {
  //       this._parseText(child, metadata, accum);
  //     }

  //     if (node.contentDocument) {
  //       this._parseText(node.contentDocument, null, accum);
  //     }
  //   }
  // }
}

export { Recorder };

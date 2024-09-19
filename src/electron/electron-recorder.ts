/*eslint-env node */

import { Recorder } from "../recorder";

import path from "path";
import fs from "fs";
// @ts-expect-error - TS7016 - Could not find a declaration file for module 'mime-types'. '/Users/emma/Work/Webrecorder/archiveweb.page/node_modules/mime-types/index.js' implicitly has an 'any' type.
import mime from "mime-types";

const DEBUG = false;

const PROXY_URL = "https://proxy.archiveweb.page/";

// ===========================================================================
class ElectronRecorder extends Recorder {
  constructor({
    // @ts-expect-error - TS7031 - Binding element 'recWC' implicitly has an 'any' type.
    recWC,
    // @ts-expect-error - TS7031 - Binding element 'appWC' implicitly has an 'any' type.
    appWC,
    // @ts-expect-error - TS7031 - Binding element 'collId' implicitly has an 'any' type.
    collId,
    // @ts-expect-error - TS7031 - Binding element 'staticPrefix' implicitly has an 'any' type.
    staticPrefix,
    // @ts-expect-error - TS7031 - Binding element 'recWindow' implicitly has an 'any' type.
    recWindow,
    // @ts-expect-error - TS7031 - Binding element 'popup' implicitly has an 'any' type.
    popup,
    // @ts-expect-error - TS7031 - Binding element 'autorun' implicitly has an 'any' type.
    autorun,
    // @ts-expect-error - TS7031 - Binding element 'userAgent' implicitly has an 'any' type.
    userAgent,
  }) {
    super();
    // @ts-expect-error - TS2339 - Property 'appWC' does not exist on type 'ElectronRecorder'.
    this.appWC = appWC;
    // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'ElectronRecorder'.
    this.collId = collId;

    // @ts-expect-error - TS2339 - Property 'popup' does not exist on type 'ElectronRecorder'.
    this.popup = popup;

    // @ts-expect-error - TS2339 - Property 'staticPrefix' does not exist on type 'ElectronRecorder'.
    this.staticPrefix = staticPrefix;

    // @ts-expect-error - TS2339 - Property 'recWC' does not exist on type 'ElectronRecorder'.
    this.recWC = recWC;
    // @ts-expect-error - TS2339 - Property 'debugger' does not exist on type 'ElectronRecorder'.
    this.debugger = recWC.debugger;

    // @ts-expect-error - TS2339 - Property 'recWindow' does not exist on type 'ElectronRecorder'.
    this.recWindow = recWindow;
    // @ts-expect-error - TS2339 - Property 'frameWC' does not exist on type 'ElectronRecorder'.
    this.frameWC = recWindow.webContents;

    // @ts-expect-error - TS2339 - Property 'flatMode' does not exist on type 'ElectronRecorder'.
    this.flatMode = true;

    // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'ElectronRecorder'.
    this.autorun = autorun;

    // @ts-expect-error - TS2339 - Property 'defaultFetchOpts' does not exist on type 'ElectronRecorder'.
    this.defaultFetchOpts.headers = {
      "User-Agent": userAgent,
    };

    // @ts-expect-error - TS2339 - Property 'shutdownPromise' does not exist on type 'ElectronRecorder'.
    this.shutdownPromise = new Promise(
      // @ts-expect-error - TS2339 - Property '_shutdownResolve' does not exist on type 'ElectronRecorder'.
      (resolve) => (this._shutdownResolve = resolve),
    );

    // @ts-expect-error - TS2339 - Property 'recWC' does not exist on type 'ElectronRecorder'.
    this.recWC.on("did-navigate", (event, url) => {
      this.didNavigateInitPage(url);
    });

    // @ts-expect-error - TS2339 - Property 'appWC' does not exist on type 'ElectronRecorder'.
    this.appWC.on("ipc-message", (event, channel, size) => {
      if (channel === "inc-size") {
        // @ts-expect-error - TS2339 - Property 'sizeNew' does not exist on type 'ElectronRecorder'.
        this.sizeNew += size;
        // @ts-expect-error - TS2339 - Property '_cacheSessionNew' does not exist on type 'ElectronRecorder'.
        this._cacheSessionNew += size;
      }
    });

    // @ts-expect-error - TS2339 - Property 'debugger' does not exist on type 'ElectronRecorder'.
    this.debugger.on("detach", (event, reason) => {
      console.log("detached", reason);
      this._stop();
    });

    // @ts-expect-error - TS2339 - Property 'debugger' does not exist on type 'ElectronRecorder'.
    this.debugger.on("message", (event, message, params, sessionId) => {
      if (DEBUG) {
        console.log(" <= ", message);
      }
      const sessions = sessionId ? [sessionId] : [];
      this.processMessage(message, params, sessions);
    });

    // @ts-expect-error - TS2339 - Property 'recWC' does not exist on type 'ElectronRecorder'.
    this.recWC.on("page-favicon-updated", (event, favicons) => {
      // @ts-expect-error - TS2339 - Property 'favicons' does not exist on type 'ElectronRecorder'.
      this.favicons = favicons;
      for (const icon of favicons) {
        //this.recWC.send("async-fetch", {url: icon});
        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
        this.doAsyncFetch({ url: icon });
      }
    });
  }

  async shutdown() {
    await this.detach();
    // @ts-expect-error - TS2339 - Property 'recWindow' does not exist on type 'ElectronRecorder'.
    this.recWindow.destroy();
    // @ts-expect-error - TS2339 - Property '_shutdownResolve' does not exist on type 'ElectronRecorder'.
    this._shutdownResolve();
  }

  // @ts-expect-error - TS7006 - Parameter 'path' implicitly has an 'any' type.
  getExternalInjectURL(path) {
    return PROXY_URL + path;
  }

  // Electron seems to not always pass through Page.frameNavigated events, so handle via 'did-navigate' instead
  // @ts-expect-error - TS7006 - Parameter 'url' implicitly has an 'any' type.
  didNavigateInitPage(url) {
    // @ts-expect-error - TS2339 - Property 'running' does not exist on type 'ElectronRecorder'.
    if (!this.running || url === "about:blank") {
      return;
    }

    // @ts-expect-error - TS2339 - Property 'nextFrameId' does not exist on type 'ElectronRecorder'.
    if (this.nextFrameId) {
      // @ts-expect-error - TS2339 - Property 'nextFrameId' does not exist on type 'ElectronRecorder'. | TS2339 - Property 'frameId' does not exist on type 'ElectronRecorder'.
      if (this.nextFrameId != this.frameId) {
        // @ts-expect-error - TS2339 - Property 'historyMap' does not exist on type 'ElectronRecorder'.
        this.historyMap = {};
      }

      // @ts-expect-error - TS2339 - Property 'frameId' does not exist on type 'ElectronRecorder'. | TS2339 - Property 'nextFrameId' does not exist on type 'ElectronRecorder'.
      this.frameId = this.nextFrameId;
      // @ts-expect-error - TS2339 - Property 'nextFrameId' does not exist on type 'ElectronRecorder'.
      this.nextFrameId = null;
    }

    this._initNewPage(url, "");
  }

  initPage(/*params, sessions*/) {
    // not called consistently, so just using didNavigateInitPage
    return false;
  }

  // @ts-expect-error - TS7006 - Parameter 'method' implicitly has an 'any' type. | TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  async processMessage(method, params, sessions) {
    if (await super.processMessage(method, params, sessions)) {
      return true;
    }

    switch (method) {
      case "Page.frameStartedLoading":
        // @ts-expect-error - TS2339 - Property 'nextFrameId' does not exist on type 'ElectronRecorder'.
        this.nextFrameId = params.frameId;
        break;

      case "Page.frameStoppedLoading":
        // @ts-expect-error - TS2339 - Property 'nextFrameId' does not exist on type 'ElectronRecorder'.
        this.nextFrameId = null;
        break;
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  async handlePaused(params, sessions) {
    if (!params.request.url.startsWith(PROXY_URL)) {
      return await super.handlePaused(params, sessions);
    }

    this.removeReqResp(params.networkId || params.requestId);

    //console.log(params.request.method + " " + params.request.url);
    const headers = new Headers(params.request.headers);

    // try serve static file from app dir
    let filename = params.request.url.slice(PROXY_URL.length).split("?", 1)[0];
    filename = filename.split("#", 1)[0];

    let ext = path.extname(filename);
    if (!ext) {
      ext = ".html";
      filename += ext;
    }

    // @ts-expect-error - TS2339 - Property 'staticPrefix' does not exist on type 'ElectronRecorder'.
    const fullPath = path.join(this.staticPrefix, filename);

    const data = await fs.promises.readFile(fullPath);

    const base64Str = data.toString("base64");

    const responseHeaders: { name: string; value: string }[] = [];

    const origin = headers.get("origin");

    const mimeType = mime.contentType(ext);

    console.log("PROXY (not recording): " + fullPath);

    if (origin) {
      responseHeaders.push({
        name: "Access-Control-Allow-Origin",
        value: origin,
      });
    }

    if (mimeType) {
      responseHeaders.push({ name: "Content-Type", value: mimeType });
    }

    try {
      await this.send(
        "Fetch.fulfillRequest",
        // @ts-expect-error - TS2345 - Argument of type '{ requestId: any; responseCode: number; responseHeaders: never[]; body: string; }' is not assignable to parameter of type 'null | undefined'.
        {
          requestId: params.requestId,
          responseCode: 200,
          responseHeaders: responseHeaders,
          body: base64Str,
        },
        sessions,
      );
    } catch (e) {
      console.warn(e);
    }
  }

  _doDetach() {
    try {
      // @ts-expect-error - TS2339 - Property 'debugger' does not exist on type 'ElectronRecorder'.
      this.debugger.detach();
    } catch (e) {
      console.warn(e);
    }

    return Promise.resolve();
  }

  _doAttach() {
    // @ts-expect-error - TS2339 - Property 'debugger' does not exist on type 'ElectronRecorder'.
    this.debugger.attach("1.3");
    // @ts-expect-error - TS2551 - Property 'started' does not exist on type 'ElectronRecorder'. Did you mean 'start'?
    this.started = this.start();

    // @ts-expect-error - TS2551 - Property 'started' does not exist on type 'ElectronRecorder'. Did you mean 'start'?
    return this.started;
  }

  _doStop() {
    // send msg
    this.doUpdateStatus();
  }

  doUpdateStatus() {
    const stats = this.getStatusMsg();
    //console.log(stats);
    // @ts-expect-error - TS2339 - Property 'frameWC' does not exist on type 'ElectronRecorder'.
    if (this.frameWC) {
      // @ts-expect-error - TS2339 - Property 'frameWC' does not exist on type 'ElectronRecorder'.
      this.frameWC.send("stats", stats);
    }
    // @ts-expect-error - TS2339 - Property 'popup' does not exist on type 'ElectronRecorder'. | TS2339 - Property 'popup' does not exist on type 'ElectronRecorder'.
    if (this.popup?.webContents) {
      // @ts-expect-error - TS2339 - Property 'popup' does not exist on type 'ElectronRecorder'.
      this.popup.webContents.send("popup", stats);
    }
  }

  getFavIcon() {
    // @ts-expect-error - TS2339 - Property 'favicons' does not exist on type 'ElectronRecorder'. | TS2339 - Property 'favicons' does not exist on type 'ElectronRecorder'. | TS2339 - Property 'favicons' does not exist on type 'ElectronRecorder'.
    return this.favicons?.length ? this.favicons[0] : null;
  }

  // @ts-expect-error - TS7006 - Parameter 'data' implicitly has an 'any' type.
  _doAddResource(data) {
    // if (data.url.startsWith(PROXY_URL)) {
    //   return 0;
    // }

    //console.log("res", data.url);

    // size updated asynchronously via 'inc-size' event
    // @ts-expect-error - TS2339 - Property 'appWC' does not exist on type 'ElectronRecorder'. | TS2339 - Property 'collId' does not exist on type 'ElectronRecorder'.
    this.appWC.send("add-resource", data, this.collId);
    return 0;
  }

  _doAddPage() {
    // @ts-expect-error - TS2339 - Property 'appWC' does not exist on type 'ElectronRecorder'. | TS2339 - Property 'pageInfo' does not exist on type 'ElectronRecorder'. | TS2339 - Property 'collId' does not exist on type 'ElectronRecorder'.
    this.appWC.send("add-page", this.pageInfo, this.collId);
  }

  // @ts-expect-error - TS7006 - Parameter 'totalSize' implicitly has an 'any' type. | TS7006 - Parameter 'writtenSize' implicitly has an 'any' type.
  _doIncSizes(totalSize, writtenSize) {
    // @ts-expect-error - TS2339 - Property 'appWC' does not exist on type 'ElectronRecorder'. | TS2339 - Property 'collId' does not exist on type 'ElectronRecorder'.
    this.appWC.send("inc-sizes", totalSize, writtenSize, this.collId);
  }

  // @ts-expect-error - TS7006 - Parameter 'method' implicitly has an 'any' type. | TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'promise' implicitly has an 'any' type.
  _doSendCommand(method, params, promise) {
    if (DEBUG) {
      console.log(" => ", method, params);
    }
    try {
      // @ts-expect-error - TS2339 - Property 'debugger' does not exist on type 'ElectronRecorder'.
      const p = this.debugger.sendCommand(method, params);
      return promise ? promise : p;
    } catch (e) {
      console.warn(e);
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'method' implicitly has an 'any' type. | TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'sessionId' implicitly has an 'any' type.
  _doSendCommandFlat(method, params, sessionId) {
    try {
      // @ts-expect-error - TS2339 - Property 'debugger' does not exist on type 'ElectronRecorder'.
      return this.debugger.sendCommand(method, params, sessionId);
    } catch (e) {
      console.warn(e);
    }
  }
}

export { ElectronRecorder };

import { Recorder } from '../recorder';

import path from 'path';
import fs from 'fs';
import mime from 'mime-types';

const DEBUG = false;

const PROXY_URL = "https://proxy.archiveweb.page/"


// ===========================================================================
class ElectronRecorder extends Recorder
{
  constructor({recWC, appWC, collId, staticPrefix, recWindow, popup, autorun}) {
    super();
    this.appWC = appWC;
    this.collId = collId;

    this.popup = popup;

    this.staticPrefix = staticPrefix;

    this.recWC = recWC;
    this.debugger = recWC.debugger;

    this.recWindow = recWindow;
    this.frameWC = recWindow.webContents;

    this.flatMode = true;

    this.autorun = autorun;

    this.shutdownPromise = new Promise((resolve) => this._shutdownResolve = resolve);

    this.recWC.on("did-navigate", (event, url) => {
      this.didNavigateInitPage(url);
    });

    this.appWC.on("ipc-message", (event, channel, size) => {
      if (channel === "inc-size") {
        this.sizeNew += size;
        this._cacheSessionNew += size;
      }
    });

    this.debugger.on("detach", (event, reason) => {
      console.log("detached", reason);
      this._stop();
    });

    this.debugger.on("message", (event, message, params, sessionId) => {
      if (DEBUG) {
        console.log(" <= ", message);
      }
      const sessions = sessionId ? [sessionId] : [];
      this.processMessage(message, params, sessions);
    });

    this.recWC.on('page-favicon-updated', (event, favicons) => {
      this.favicons = favicons;
      for (const icon of favicons) {
        //this.recWC.send("async-fetch", {url: icon});
        this.doAsyncFetch({url: icon});
      }
    });
  }

  async shutdown() {
    await this.detach();
    this.recWindow.destroy();
    this._shutdownResolve();
  }

  getExternalInjectURL(path) {
    return PROXY_URL + path;
  }

  // Electron seems to not always pass through Page.frameNavigated events, so handle via 'did-navigate' instead
  didNavigateInitPage(url) {
    if (!this.running || url === "about:blank") {
      return;
    }
    
    if (this.nextFrameId) {
      if (this.nextFrameId != this.frameId) {
        this.historyMap = {};
      }

      this.frameId = this.nextFrameId;
      this.nextFrameId = null;
    }

    this._initNewPage(url, "");
  }

  initPage(params, sessions) {
    // not called consistently, so just using didNavigateInitPage
    return false;
  }

  async processMessage(method, params, sessions) {
    if (await super.processMessage(method, params, sessions)) {
      return true;
    }

    switch (method) {
      case "Page.frameStartedLoading":
        this.nextFrameId = params.frameId;
        break;

      case "Page.frameStoppedLoading":
        this.nextFrameId = null;
        break;
    }
  }

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

    const fullPath = path.join(this.staticPrefix, filename);

    const data = await fs.promises.readFile(fullPath);

    const base64Str = data.toString("base64");

    const responseHeaders = [];

    const origin = headers.get("origin");

    const mimeType = mime.contentType(ext);

    console.log("PROXY (not recording): " + fullPath);

    if (origin) {
      responseHeaders.push({name: "Access-Control-Allow-Origin", value: origin});
    }

    if (mimeType) {
      responseHeaders.push({name: "Content-Type", value: mimeType});
    }

    try {
      await this.send("Fetch.fulfillRequest",
        {"requestId": params.requestId,
         "responseCode": 200,
         "responseHeaders": responseHeaders,
         "body": base64Str
        }, sessions);
    } catch (e) {

    } 
  }

  _doDetach() {
    try {
      this.debugger.detach();
    } catch (e) {
      console.warn(e);
    }

    return Promise.resolve();
  }

  _doAttach() {
    this.debugger.attach('1.3');
    this.started = this.start();

    return this.started;
  }

  _doStop() {
    // send msg
    this.doUpdateStatus();
  }

  doUpdateStatus() {
    const stats = this.getStatusMsg();
    //console.log(stats);
    if (this.frameWC) {
      this.frameWC.send("stats", stats);
    }
    if (this.popup && this.popup.webContents) {
      this.popup.webContents.send("popup", stats);
    }
  }

  getFavIcon() {
    return this.favicons && this.favicons.length ? this.favicons[0] : null;
  }

  async _doAddResource(data) {
    // if (data.url.startsWith(PROXY_URL)) {
    //   return 0;
    // }

    //console.log("res", data.url);

    // size updated asynchronously via 'inc-size' event
    this.appWC.send("add-resource", data, this.collId);
    return 0;
  }

  _doAddPage(pageInfo) {
    this.appWC.send("add-page", this.pageInfo, this.collId);
  }

  _doIncSizes(totalSize, writtenSize) {
    this.appWC.send("inc-sizes", totalSize, writtenSize, this.collId);
  }

  _doSendCommand(method, params, promise) {
    if (DEBUG) {
      console.log(" => ", method, params);
    }
    try {
      const p = this.debugger.sendCommand(method, params);
      return promise ? promise : p;
    } catch (e) {
      console.warn(e);
    }
  }

  _doSendCommandFlat(method, params, sessionId) {
    try {
      return this.debugger.sendCommand(method, params, sessionId);
    } catch(e) {
      console.warn(e);
    }
  }
}

export { ElectronRecorder };
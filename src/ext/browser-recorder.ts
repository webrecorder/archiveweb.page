"use strict";

import { BEHAVIOR_RUNNING } from "../consts";
import { Recorder } from "../recorder";

// ===========================================================================
const DEBUG = false;

const IS_AGREGORE = navigator.userAgent.includes("agregore-browser");

// ===========================================================================
class BrowserRecorder extends Recorder {
  constructor(
    // @ts-expect-error - TS7006 - Parameter 'debuggee' implicitly has an 'any' type.
    debuggee,
    {
      // @ts-expect-error - TS7031 - Binding element 'collId' implicitly has an 'any' type.
      collId,
      // @ts-expect-error - TS7031 - Binding element 'collLoader' implicitly has an 'any' type.
      collLoader,
      waitForTabUpdate = false,
      openUrl = null,
      port = null,
      openWinMap = null,
      autorun = false,
    },
  ) {
    super();

    // @ts-expect-error - TS2339 - Property 'openUrl' does not exist on type 'BrowserRecorder'.
    this.openUrl = openUrl;
    // @ts-expect-error - TS2339 - Property 'waitForTabUpdate' does not exist on type 'BrowserRecorder'.
    this.waitForTabUpdate = waitForTabUpdate;
    // @ts-expect-error - TS2339 - Property 'debuggee' does not exist on type 'BrowserRecorder'.
    this.debuggee = debuggee;
    // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'BrowserRecorder'.
    this.tabId = debuggee.tabId;
    // @ts-expect-error - TS2339 - Property 'openWinMap' does not exist on type 'BrowserRecorder'.
    this.openWinMap = openWinMap;
    // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'BrowserRecorder'.
    this.autorun = autorun;
    // @ts-expect-error - TS2339 - Property 'isAttached' does not exist on type 'BrowserRecorder'.
    this.isAttached = false;

    // @ts-expect-error - TS2339 - Property 'flatMode' does not exist on type 'BrowserRecorder'.
    this.flatMode = IS_AGREGORE;

    // @ts-expect-error - TS2339 - Property 'collLoader' does not exist on type 'BrowserRecorder'.
    this.collLoader = collLoader;
    this.setCollId(collId);

    // @ts-expect-error - TS2339 - Property 'port' does not exist on type 'BrowserRecorder'.
    this.port = port;

    // this.recordStorage = true;
    //getLocalOption("recordStorage").then((res) => (this.recordStorage = !!res));

    // @ts-expect-error - TS2551 - Property '_onDetached' does not exist on type 'BrowserRecorder'. Did you mean '_doDetach'?
    this._onDetached = (tab, reason) => {
      // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'BrowserRecorder'.
      if (tab && this.tabId !== tab.tabId) {
        return;
      }

      // @ts-expect-error - TS2339 - Property 'isAttached' does not exist on type 'BrowserRecorder'.
      this.isAttached = false;

      if (reason === "target_closed") {
        // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'BrowserRecorder'.
        this.tabId = 0;
      }

      this._stop();
    };

    // @ts-expect-error - TS2339 - Property '_onCanceled' does not exist on type 'BrowserRecorder'.
    this._onCanceled = (details) => {
      // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'BrowserRecorder'.
      if (details && details.tabId == this.tabId) {
        this.detach();
      }
    };

    // @ts-expect-error - TS2339 - Property '_onEvent' does not exist on type 'BrowserRecorder'.
    this._onEvent = async (tab, message, params, sessionId) => {
      // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'BrowserRecorder'.
      if (this.tabId === tab.tabId) {
        try {
          const sessions = sessionId ? [sessionId] : [];
          await this.processMessage(message, params, sessions);
        } catch (e) {
          console.warn(e);
          console.log(message);
          console.log(params);
        }
      }
    };
  }

  // @ts-expect-error - TS7006 - Parameter 'path' implicitly has an 'any' type.
  getExternalInjectURL(path) {
    return chrome.runtime.getURL(path);
  }

  // @ts-expect-error - TS7006 - Parameter 'collId' implicitly has an 'any' type.
  setCollId(collId) {
    // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'BrowserRecorder'. | TS2339 - Property 'db' does not exist on type 'BrowserRecorder'.
    if (collId !== this.collId || !this.db) {
      // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'BrowserRecorder'.
      this.collId = collId;
      // @ts-expect-error - TS2339 - Property 'db' does not exist on type 'BrowserRecorder'.
      this.db = null;
      // @ts-expect-error - TS2339 - Property '_initDB' does not exist on type 'BrowserRecorder'. | TS2339 - Property 'collLoader' does not exist on type 'BrowserRecorder'. | TS2339 - Property 'collId' does not exist on type 'BrowserRecorder'.
      this._initDB = this.collLoader.loadColl(this.collId);
    }
  }

  _doDetach() {
    let numOtherRecorders = 0;
    for (const rec of Object.values(self.recorders)) {
      // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'BrowserRecorder'. | TS2339 - Property 'tabId' does not exist on type 'BrowserRecorder'. | TS2339 - Property 'running' does not exist on type 'BrowserRecorder'.
      if (rec.tabId !== this.tabId && rec.running) {
        numOtherRecorders++;
      }
    }

    if (numOtherRecorders > 0) {
      console.log(
        `closing session, not detaching, ${numOtherRecorders} other recording tab(s) left`,
      );
      return this.sessionClose([]);
    } else {
      console.log("detaching debugger, already tabs stopped");
    }

    return new Promise((resolve) => {
      // @ts-expect-error - TS2339 - Property 'debuggee' does not exist on type 'BrowserRecorder'.
      chrome.debugger.detach(this.debuggee, () => {
        if (chrome.runtime.lastError) {
          console.warn(chrome.runtime.lastError.message);
        }
        // @ts-expect-error - TS2339 - Property 'isAttached' does not exist on type 'BrowserRecorder'.
        this.isAttached = false;
        // @ts-expect-error - TS2794 - Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
        resolve();
      });
    });
  }

  _doStop() {
    //chrome.tabs.sendMessage(this.tabId, {"msg": "stopRecord"});

    // @ts-expect-error - TS2339 - Property 'isAttached' does not exist on type 'BrowserRecorder'.
    if (!this.isAttached) {
      // @ts-expect-error - TS2551 - Property '_onDetached' does not exist on type 'BrowserRecorder'. Did you mean '_doDetach'?
      chrome.debugger.onDetach.removeListener(this._onDetached);
    }
    // @ts-expect-error - TS2339 - Property '_onEvent' does not exist on type 'BrowserRecorder'.
    chrome.debugger.onEvent.removeListener(this._onEvent);

    // @ts-expect-error - TS2339 - Property 'db' does not exist on type 'BrowserRecorder'.
    if (this.db) {
      // @ts-expect-error - TS2339 - Property 'db' does not exist on type 'BrowserRecorder'.
      this.db.close();
      // @ts-expect-error - TS2339 - Property 'db' does not exist on type 'BrowserRecorder'.
      this.db = null;
      // @ts-expect-error - TS2339 - Property '_initDB' does not exist on type 'BrowserRecorder'.
      this._initDB = null;
    }

    // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'BrowserRecorder'.
    if (!this.tabId) {
      return;
    }

    this.doUpdateStatus();
  }

  async _doAttach() {
    // @ts-expect-error - TS2339 - Property 'waitForTabUpdate' does not exist on type 'BrowserRecorder'.
    this.waitForTabUpdate = false;

    // @ts-expect-error - TS2339 - Property 'isAttached' does not exist on type 'BrowserRecorder'.
    if (!this.isAttached) {
      // @ts-expect-error - TS2551 - Property '_onDetached' does not exist on type 'BrowserRecorder'. Did you mean '_doDetach'?
      chrome.debugger.onDetach.addListener(this._onDetached);
    }
    // @ts-expect-error - TS2339 - Property '_onEvent' does not exist on type 'BrowserRecorder'.
    chrome.debugger.onEvent.addListener(this._onEvent);

    // @ts-expect-error - TS2339 - Property '_initDB' does not exist on type 'BrowserRecorder'.
    const coll = await this._initDB;
    if (!coll) {
      throw new Error("Collection Not Found");
    }

    // @ts-expect-error - TS2339 - Property 'db' does not exist on type 'BrowserRecorder'.
    this.db = coll.store;

    try {
      // @ts-expect-error - TS2339 - Property 'isAttached' does not exist on type 'BrowserRecorder'.
      if (!this.isAttached) {
        await new Promise((resolve, reject) => {
          // @ts-expect-error - TS2339 - Property 'debuggee' does not exist on type 'BrowserRecorder'.
          chrome.debugger.attach(this.debuggee, "1.3", () => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError.message);
            }
            // @ts-expect-error - TS2339 - Property 'isAttached' does not exist on type 'BrowserRecorder'.
            this.isAttached = true;
            // @ts-expect-error - TS2794 - Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
            resolve();
          });
        });
      }

      await this.start();
      // @ts-expect-error - TS2339 - Property 'failureMsg' does not exist on type 'BrowserRecorder'.
      this.failureMsg = null;

      // @ts-expect-error - TS2339 - Property 'openUrl' does not exist on type 'BrowserRecorder'.
      if (this.openUrl) {
        // @ts-expect-error - TS2345 - Argument of type '{ url: any; }' is not assignable to parameter of type 'null | undefined'.
        await this.send("Page.navigate", {
          // @ts-expect-error - TS2339 - Property 'openUrl' does not exist on type 'BrowserRecorder'.
          url: this.openUrl,
        });
      } else {
        // @ts-expect-error - TS2345 - Argument of type '{ ignoreCache: boolean; scriptToEvaluateOnLoad: string; }' is not assignable to parameter of type 'null | undefined'.
        await this.send("Page.reload", {
          ignoreCache: true,
          scriptToEvaluateOnLoad: this.getInjectScript(),
        });
      }

      this.doUpdateStatus();
    } catch (msg) {
      // @ts-expect-error - TS2339 - Property 'failureMsg' does not exist on type 'BrowserRecorder'.
      this.failureMsg = chrome.runtime.lastError
        ? chrome.runtime.lastError.message
        : msg;
      this.doUpdateStatus();
      throw msg;
    }
  }

  doUpdateStatus() {
    let title, color, text;
    // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'BrowserRecorder'.
    const tabId = this.tabId;

    // @ts-expect-error - TS2339 - Property 'running' does not exist on type 'BrowserRecorder'.
    if (this.running) {
      // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'BrowserRecorder'.
      if (this.behaviorState === BEHAVIOR_RUNNING) {
        title = "Archiving: Autopilot Running!";
        color = "#0096ff";
        text = " ";
        // @ts-expect-error - TS2339 - Property 'numPending' does not exist on type 'BrowserRecorder'.
      } else if (this.numPending === 0) {
        title = "Archiving: No URLs pending, can continue";
        color = "#4d7c0f";
        text = "✓";
      } else {
        // @ts-expect-error - TS2339 - Property 'numPending' does not exist on type 'BrowserRecorder'.
        title = `Archiving: ${this.numPending} URLs pending, please wait`;
        color = "#c5a802";
        // @ts-expect-error - TS2339 - Property 'numPending' does not exist on type 'BrowserRecorder'.
        text = "" + this.numPending;
      }
      // @ts-expect-error - TS2339 - Property 'failureMsg' does not exist on type 'BrowserRecorder'.
    } else if (this.failureMsg) {
      title = "Error: Can't Archive this page";
      text = "X";
      color = "#d30808";
    } else {
      title = "Not Archiving";
      text = "";
      color = "#4d7c0f";
    }

    chrome.action.setTitle({ title, tabId });
    chrome.action.setBadgeBackgroundColor({ color, tabId });
    chrome.action.setBadgeText({ text, tabId });

    // @ts-expect-error - TS2339 - Property 'port' does not exist on type 'BrowserRecorder'.
    if (this.port) {
      const status = this.getStatusMsg();
      // @ts-expect-error - TS2339 - Property 'port' does not exist on type 'BrowserRecorder'.
      this.port.postMessage(status);
    }
  }

  getFavIcon() {
    return new Promise((resolve) => {
      // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'BrowserRecorder'.
      chrome.tabs.get(this.tabId, (tab) => {
        resolve(tab.favIconUrl);
      });
    });
  }

  // @ts-expect-error - TS7006 - Parameter 'data' implicitly has an 'any' type.
  async _doAddResource(data) {
    //console.log(`Commit ${url} @ ${ts}, cookie: ${cookie}, sw: ${reqresp.fromServiceWorker}`);
    let writtenSize = 0;
    const payloadSize = data.payload.length;

    try {
      // @ts-expect-error - TS2339 - Property 'db' does not exist on type 'BrowserRecorder'.
      await this.db.initing;

      // @ts-expect-error - TS2339 - Property 'db' does not exist on type 'BrowserRecorder'.
      if (await this.db.addResource(data)) {
        writtenSize = payloadSize;
      }
    } catch (e) {
      console.warn(`Commit error for ${data.url} @ ${data.ts} ${data.mime}`);
      console.warn(e);
      return;
    }

    // TODO: more accurate size calc?
    //const headerSize = 0;//JSON.stringify(data.respHeaders).length + JSON.stringify(data.reqHeaders).length;

    // increment size counter only if committed
    //incrArchiveSize('dedup', writtenSize);
    //incrArchiveSize('total', payloadSize);
    // this.collLoader.updateSize(this.collId, payloadSize, writtenSize);

    // increment page size
    // await this._doAddPage(this.pageInfo);

    return writtenSize;
  }

  // @ts-expect-error - TS7006 - Parameter 'pageInfo' implicitly has an 'any' type.
  _doAddPage(pageInfo) {
    if (!pageInfo.url) {
      console.warn("Empty Page, Skipping");
      return;
    }
    // @ts-expect-error - TS2339 - Property 'db' does not exist on type 'BrowserRecorder'.
    if (this.db) {
      // @ts-expect-error - TS2339 - Property 'db' does not exist on type 'BrowserRecorder'.
      return this.db.addPage(pageInfo);
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'totalSize' implicitly has an 'any' type. | TS7006 - Parameter 'writtenSize' implicitly has an 'any' type.
  _doIncSizes(totalSize, writtenSize) {
    // @ts-expect-error - TS2339 - Property 'collLoader' does not exist on type 'BrowserRecorder'. | TS2339 - Property 'collId' does not exist on type 'BrowserRecorder'.
    this.collLoader.updateSize(this.collId, totalSize, writtenSize);
  }

  // @ts-expect-error - TS7006 - Parameter 'method' implicitly has an 'any' type. | TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'promise' implicitly has an 'any' type.
  _doSendCommand(method, params, promise) {
    // @ts-expect-error - TS7034 - Variable 'prr' implicitly has type 'any' in some locations where its type cannot be determined.
    let prr;
    const p = new Promise((resolve, reject) => {
      prr = { resolve, reject, method };
    });

    if (!promise) {
      promise = p;
    }

    // @ts-expect-error - TS7006 - Parameter 'res' implicitly has an 'any' type.
    const callback = (res) => {
      if (res) {
        // @ts-expect-error - TS7005 - Variable 'prr' implicitly has an 'any' type.
        prr.resolve(res);
      } else {
        // @ts-expect-error - TS7005 - Variable 'prr' implicitly has an 'any' type.
        prr.reject(
          chrome.runtime.lastError ? chrome.runtime.lastError.message : "",
        );
      }
    };

    if (DEBUG) {
      console.log("SEND " + JSON.stringify({ command: method, params }));
    }

    // @ts-expect-error - TS2339 - Property 'debuggee' does not exist on type 'BrowserRecorder'.
    chrome.debugger.sendCommand(this.debuggee, method, params, callback);
    return promise;
  }

  // @ts-expect-error - TS7006 - Parameter 'method' implicitly has an 'any' type. | TS7006 - Parameter 'params' implicitly has an 'any' type. | TS7006 - Parameter 'sessionId' implicitly has an 'any' type.
  _doSendCommandFlat(method, params, sessionId) {
    if (DEBUG) {
      console.log("SEND " + JSON.stringify({ command: method, params }));
    }

    try {
      return chrome.debugger.sendCommand(
        // @ts-expect-error - TS2339 - Property 'debuggee' does not exist on type 'BrowserRecorder'.
        this.debuggee,
        method,
        params,
        sessionId,
      );
    } catch (e) {
      console.warn(e);
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'url' implicitly has an 'any' type. | TS7006 - Parameter 'sessions' implicitly has an 'any' type.
  handleWindowOpen(url, sessions) {
    super.handleWindowOpen(url, sessions);
    // @ts-expect-error - TS2339 - Property 'openWinMap' does not exist on type 'BrowserRecorder'. | TS2339 - Property 'collId' does not exist on type 'BrowserRecorder'.
    this.openWinMap.set(url, this.collId);
  }
}

export { BrowserRecorder };

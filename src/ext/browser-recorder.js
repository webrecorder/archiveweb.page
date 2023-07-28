"use strict";

import { BEHAVIOR_RUNNING } from "../consts";
import { getLocalOption } from "../localstorage";
import { Recorder }  from "../recorder";


// ===========================================================================
const DEBUG = false;

const IS_AGREGORE = navigator.userAgent.includes("agregore-browser");


// ===========================================================================
class BrowserRecorder extends Recorder {
  constructor(debuggee, {collId, collLoader, waitForTabUpdate = false, openUrl = null, port = null, 
    openWinMap = null, autorun = false}) {
    super();

    this.openUrl = openUrl;
    this.waitForTabUpdate = waitForTabUpdate;
    this.debuggee = debuggee;
    this.tabId = debuggee.tabId;
    this.openWinMap = openWinMap;
    this.autorun = autorun;
    this.isAttached = false;

    this.flatMode = IS_AGREGORE;

    this.collLoader = collLoader;
    this.setCollId(collId);

    this.port = port;

    this.recordStorage = false;
    getLocalOption("recordStorage").then((res) => this.recordStorage = !!res);

    this._onDetached = (tab, reason) => {
      if (tab && this.tabId !== tab.tabId) {
        return;
      }

      this.isAttached = false;

      if (reason === "target_closed") {
        this.tabId = 0;
      }

      this._stop();
    };

    this._onCanceled = (details) => {
      if (details && details.tabId == this.tabId) {
        this.detach();
      }
    };

    this._onEvent = async (tab, message, params, sessionId) => {
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

  getExternalInjectURL(path) {
    return chrome.runtime.getURL(path);
  }

  setCollId(collId) {
    if (collId !== this.collId || !this.db) {
      this.collId = collId;
      this.db = null;
      this._initDB = this.collLoader.loadColl(this.collId);
    }
  }

  _doDetach() {
    let numOtherRecorders = 0;
    for (const rec of Object.values(self.recorders)) {
      if (rec.tabId !== this.tabId && rec.running) {
        numOtherRecorders++;
      }
    }

    if (numOtherRecorders > 0) {
      console.log(`closing session, not detaching, ${numOtherRecorders} other recording tab(s) left`);
      return this.sessionClose([]);
    } else {
      console.log("detaching debugger, already tabs stopped");
    }

    return new Promise((resolve) => {
      chrome.debugger.detach(this.debuggee, () => {
        if (chrome.runtime.lastError) {
          console.warn(chrome.runtime.lastError.message);
        }
        this.isAttached = false;
        resolve();
      });
    });
  }

  _doStop() {
    //chrome.tabs.sendMessage(this.tabId, {"msg": "stopRecord"});

    if (!this.isAttached) {
      chrome.debugger.onDetach.removeListener(this._onDetached);
    }
    chrome.debugger.onEvent.removeListener(this._onEvent);

    if (this.db) {
      this.db.close();
      this.db = null;
      this._initDB = null;
    }

    if (!this.tabId) {
      return;
    }

    this.doUpdateStatus();
  }

  async _doAttach() {
    this.waitForTabUpdate = false;

    if (!this.isAttached) {
      chrome.debugger.onDetach.addListener(this._onDetached);
    }
    chrome.debugger.onEvent.addListener(this._onEvent);

    const coll = await this._initDB;
    if (!coll) {
      throw new Error("Collection Not Found");
    }

    this.db = coll.store;

    try {
      if (!this.isAttached) {
        await new Promise((resolve, reject) => {
          chrome.debugger.attach(this.debuggee, "1.3", async () => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError.message);
            }
            this.isAttached = true;
            resolve();
          });
        });
      }

      await this.start();
      this.failureMsg = null;

      if (this.openUrl) {
        await this.send("Page.navigate", {
          url: this.openUrl,
        });
      } else {
        await this.send("Page.reload", {
          ignoreCache: true,
          scriptToEvaluateOnLoad: this.getInjectScript()
        });
      }

      this.doUpdateStatus();

    } catch (msg) {
      this.failureMsg = chrome.runtime.lastError ? chrome.runtime.lastError.message : msg;
      this.doUpdateStatus();
      throw msg;
    }
  }

  doUpdateStatus() {
    let title, color, text;
    const tabId = this.tabId;

    if (this.running) {
      if (this.behaviorState === BEHAVIOR_RUNNING) {
        title = "Recording: Autopilot Running!";
        color = "#3298dc";
        text = " ";

      } else if (this.numPending === 0) {
        title = "Recording: No URLs pending, can continue";
        color = "#64e986";
        text = " ";

      } else {
        title = `Recording: ${this.numPending} URLs pending, please wait`;
        color = "#bb9f08";
        text = "" + this.numPending;
      }
    } else if (this.failureMsg) {
      title = "Error: Can't Record this page";
      text = "X";
      color = "#F00";
    } else {
      title = "Not Recording";
      text = "";
      color = "#64e986";
    }

    chrome.action.setTitle({title, tabId});
    chrome.action.setBadgeBackgroundColor({color, tabId});
    chrome.action.setBadgeText({text, tabId});

    if (this.port) {
      const status = this.getStatusMsg();
      this.port.postMessage(status);
    }
  }

  getFavIcon() {
    return new Promise((resolve) => {
      chrome.tabs.get(this.tabId, (tab) => {
        resolve(tab.favIconUrl);
      });
    });
  }

  async _doAddResource(data) {
    //console.log(`Commit ${url} @ ${ts}, cookie: ${cookie}, sw: ${reqresp.fromServiceWorker}`);
    let writtenSize = 0;
    const payloadSize = data.payload.length;

    try {
      await this.db.initing;
      
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

  _doAddPage(pageInfo) {
    if (!pageInfo.url) {
      console.warn("Empty Page, Skipping");
      return;
    }
    if (this.db) {
      return this.db.addPage(pageInfo);
    }
  }

  _doIncSizes(totalSize, writtenSize) {
    this.collLoader.updateSize(this.collId, totalSize, writtenSize);
  }

  _doSendCommand(method, params, promise) {
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
        prr.reject(chrome.runtime.lastError ? chrome.runtime.lastError.message : "");
      }
    };

    if (DEBUG) {
      console.log("SEND " + JSON.stringify({command: method, params}));
    }

    chrome.debugger.sendCommand(this.debuggee, method, params, callback);
    return promise;
  }

  _doSendCommandFlat(method, params, sessionId) {
    if (DEBUG) {
      console.log("SEND " + JSON.stringify({command: method, params}));
    }

    try {
      return chrome.debugger.sendCommand(this.debuggee, method, params, sessionId);
    } catch(e) {
      console.warn(e);
    }
  }


  handleWindowOpen(url, sessions) {
    super.handleWindowOpen(url, sessions);
    this.openWinMap.set(url, this.collId);
  }
}

export { BrowserRecorder };

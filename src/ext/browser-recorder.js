"use strict";

import { Recorder }  from "../recorder";


// ===========================================================================
const DEBUG = false;

const hasInfoBar = (self.chrome && self.chrome.braveWebrecorder != undefined);


// ===========================================================================
class BrowserRecorder extends Recorder {
  constructor(debuggee, {collId, collLoader, waitForTabUpdate = false, openUrl = null, port = null, openWinMap = null}) {
    super();

    this.openUrl = openUrl;
    this.waitForTabUpdate = waitForTabUpdate;
    this.debuggee = debuggee;
    this.tabId = debuggee.tabId;
    this.openWinMap = openWinMap;

    this.collLoader = collLoader;
    this.setCollId(collId);

    this.port = port;

    this._onDetached = (tab, reason) => {
      if (tab && this.tabId !== tab.tabId) {
        return;
      }

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

    this._onEvent = async (tab, message, params) => {
      if (this.tabId === tab.tabId) {
        try {
          await this.processMessage(message, params, []);
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
    if (collId !== this.collId) {
      this.collId = collId;
      this.db = null;
      this._initDB = this.collLoader.loadColl(this.collId);
    }
  }

  _doDetach() {
    return new Promise((resolve) => {
      chrome.debugger.detach(this.debuggee, () => {
        if (chrome.runtime.lastError) {
          console.warn(chrome.runtime.lastError.message);
        }
        resolve();
      });
    });
  }

  _doStop() {
    //chrome.tabs.sendMessage(this.tabId, {"msg": "stopRecord"});
    
    chrome.debugger.onDetach.removeListener(this._onDetached);
    chrome.debugger.onEvent.removeListener(this._onEvent);

    if (!this.tabId) {
      return;
    }

    if (hasInfoBar) {
      chrome.braveWebrecorder.onCanceled.removeListener(this._onCanceled);

      chrome.braveWebrecorder.hideInfoBar(this.tabId);
    }

    this.doUpdateStatus();
  }

  async _doAttach() {
    this.waitForTabUpdate = false;

    chrome.debugger.onDetach.addListener(this._onDetached);

    chrome.debugger.onEvent.addListener(this._onEvent);

    if (hasInfoBar) {
      chrome.braveWebrecorder.onCanceled.addListener(this._onCanceled);

      chrome.braveWebrecorder.showInfoBar(this.tabId);
    }

    const coll = await this._initDB;
    if (!coll) {
      throw new Error("Collection Not Found");
    }

    this.db = coll.store;

    try {
      await new Promise((resolve, reject) => {
        chrome.debugger.attach(this.debuggee, "1.3", async () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message);
          }
          resolve();
        });
      });

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
      if (this.numPending === 0) {
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

    chrome.browserAction.setTitle({title, tabId});
    chrome.browserAction.setBadgeBackgroundColor({color, tabId});
    chrome.browserAction.setBadgeText({text, tabId});

    if (this.port) {
      const status = this.getStatusMsg();
      this.port.postMessage(status);
    }
  }

  _doPdfExtract() {
    chrome.tabs.executeScript(this.tabId, {file: "pdf.min.js"}, () => {
      chrome.tabs.executeScript(this.tabId, {file: "extractPDF.js"}, () => {
        const code = `extractPDF("${this.pdfURL ? this.pdfURL : ""}")`;
        chrome.tabs.executeScript(this.tabId, {code});
      });
    });
  }

  _doPdfDone() {
    if (this.pdfURL) {
      URL.revokeObjectURL(this.pdfURL);
      this.pdfURL = null;
    }
  }

  getFavIcon() {
    return new Promise((resolve) => {
      chrome.tabs.get(this.tabId, (tab) => {
        resolve(tab.favIconUrl);
      });
    });
  }

  _doPreparePDF(reqresp) {
    const pdfblob = new Blob([reqresp.payload], {type: "application/pdf"});
    this.pdfURL = URL.createObjectURL(pdfblob);
  }

  async _doAddResource(data) {
    //console.log(`Commit ${url} @ ${ts}, cookie: ${cookie}, sw: ${reqresp.fromServiceWorker}`);
    let writtenSize = 0;
    const payloadSize = data.payload.length;

    await this.db.initing;

    try {
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
    this.collLoader.updateSize(this.collId, payloadSize, writtenSize);

    // increment page size
    await this._doAddPage(this.pageInfo);

    return writtenSize;
  }

  _doAddPage(pageInfo) {
    if (!pageInfo.url) {
      console.warn("Empty Page, Skipping");
      return;
    }
    return this.db.addPage(pageInfo);
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
        prr.reject(chrome.runtime.lastError.message);
      }
    };

    if (DEBUG) {
      console.log("SEND " + JSON.stringify({command: method, params}));
    }

    chrome.debugger.sendCommand(this.debuggee, method, params, callback);
    return promise;
  }

  handleWindowOpen(url, sessions) {
    super.handleWindowOpen(url, sessions);
    this.openWinMap.set(url, this.collId);
  }
}

export { BrowserRecorder };

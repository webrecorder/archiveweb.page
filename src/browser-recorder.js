"use strict";

import { Recorder }  from './recorder';

import { ArchiveDB } from 'wabac/src/archivedb';
import { CollectionLoader } from 'wabac/src/loaders';


const MAIN_DB_KEY = "main.archive";


// ===========================================================================
const DEBUG = false;

const CONTENT_SCRIPT_URL = chrome.runtime.getURL("content.js");

const hasInfoBar = (self.chrome && self.chrome.braveWebrecorder != undefined);


// ===========================================================================
class BrowserRecorder extends Recorder {
  constructor(debuggee, openUrl) {
    super(CONTENT_SCRIPT_URL);
    this.openUrl = openUrl;
    this.debuggee = debuggee;
    this.tabId = debuggee.tabId;

    this.db = new ArchiveDB(MAIN_DB_KEY);
    this.colldb = new CollectionLoader();

    this._onDetached = (tab, reason) => {
      if (tab && this.tabId !== tab.tabId) {
        return;
      }

      this._stop();
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

  _doDetach() {
    return new Promise((resolve, reject) => {
      chrome.debugger.detach(this.debuggee, () => {
        if (chrome.runtime.lastError) {
          console.warn(chrome.runtime.lastError.message);
        }
        resolve();
      });
    });
  }

  _doStop() {
    chrome.tabs.sendMessage(this.tabId, {"msg": "stopRecord"});
    
    chrome.debugger.onDetach.removeListener(this._onDetached);
    chrome.debugger.onEvent.removeListener(this._onEvent);

    if (hasInfoBar) {
      chrome.braveWebrecorder.onCanceled.removeListener(this._onCanceled);

      chrome.braveWebrecorder.hideInfoBar(this.tabId);
    }
  }

  _doAttach() {
    chrome.debugger.onDetach.addListener(this._onDetached);

    chrome.debugger.onEvent.addListener(this._onEvent);

    if (hasInfoBar) {
      chrome.braveWebrecorder.onCanceled.addListener(this._onCanceled);

      chrome.braveWebrecorder.showInfoBar(this.tabId);
    }

    chrome.debugger.attach(this.debuggee, '1.3', async () => {
      await this.start();

      let expression;

      if (this.openUrl) {
        expression = `window.location.href = "${this.openUrl}";`;
      } else {
        expression = "window.location.reload()";
      }
  
      await this.send("Runtime.evaluate", {expression});
    });
  };

  _doUpdateFileSize(sizeMsg) {
    chrome.tabs.sendMessage(this.tabId, {"msg": "startRecord", "size": sizeMsg, "showBanner": !hasInfoBar});
    if (hasInfoBar) {
      chrome.braveWebrecorder.setSizeMsg(this.tabId, sizeMsg);
    }
  }

  _doPdfExtract() {
    chrome.tabs.executeScript(this.tabId, {file: "pdf.min.js"}, (results) => {
      chrome.tabs.executeScript(this.tabId, {file: "extractPDF.js"}, (results2) => {
        const code = `extractPDF("${this.pdfURL ? this.pdfURL : ''}")`;
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
    return new Promise((resolve, reject) => {
      chrome.tabs.get(this.tabId, (tab) => {
        resolve(tab.favIconUrl);
      });
    });
  }

  _doAsyncFetch(request) {
    chrome.tabs.sendMessage(this.tabId, {"msg": "asyncFetch", "req": request});
  }

  _doPreparePDF(reqresp) {
    const pdfblob = new Blob([reqresp.payload], {type: "application/pdf"});
    this.pdfURL = URL.createObjectURL(pdfblob);
  }

  async _doAddResource(data) {
    //console.log(`Commit ${url} @ ${ts}, cookie: ${cookie}, sw: ${reqresp.fromServiceWorker}`);
    let writtenSize = 0;
    const payloadSize = data.payload.length;

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
    this.colldb.updateSize(MAIN_DB_KEY, payloadSize, writtenSize);

    // increment page size
    await this._doAddPage(this.pageInfo);
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
    }

    if (DEBUG) {
      console.log("SEND " + JSON.stringify({command: method, params}));
    }

    chrome.debugger.sendCommand(this.debuggee, method, params, callback);
    return promise;
  }
}

export { BrowserRecorder };

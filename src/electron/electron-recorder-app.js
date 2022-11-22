/*eslint-env node */

import {app, session, BrowserWindow, ipcMain, dialog } from "electron";
import { ElectronRecorder } from "./electron-recorder";

import { ElectronReplayApp, STATIC_PREFIX } from "replaywebpage/src/electron-replay-app";

import path from "path";
import { PassThrough } from "stream";

import fs from "fs";
import util from "util";
import { unusedFilenameSync } from "unused-filename";

import { checkPins, ipfsUnpinAll } from "../utils";

import { ipfsAddWithReplay } from "../ext/ipfsutils.js";
import { initAutoIPFS } from "@webrecorder/wabac/src/ipfs";

app.commandLine.appendSwitch("disable-features", "CrossOriginOpenerPolicy");


// ===========================================================================
class ElectronRecorderApp extends ElectronReplayApp
{
  constructor(opts) {
    super(opts);

    this.userAgent = null;

    this.recorders = new Map();
  }

  get mainWindowWebPreferences() {
    return {
      plugins: true,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      webSecurity: false,
    };
  }

  onAppReady() {
    const sesh = session.defaultSession;

    const ua = sesh.getUserAgent();
    const desktopUA = ua.replace(/ Electron[^\s]+/, "");

    sesh.setUserAgent(desktopUA);

    app.userAgentFallback = desktopUA;
    this.userAgent = desktopUA;

    ipcMain.on("start-rec", (event, opts) => {
      this.createRecordWindow(opts);
    });

    ipcMain.on("start-ipfs", (event, validPins) => {
      this.ipfsStart(validPins);
    });

    ipcMain.on("ipfs-pin", (event, reqId, filename) => {
      this.ipfsPin(event, reqId, filename);
    });

    ipcMain.on("ipfs-unpin", (event, reqId, pinList) => {
      this.ipfsUnpin(event, reqId, pinList);
    });

    sesh.on("will-download", (event, item, webContents) => {
      const origFilename = item.getFilename();

      console.log(`will-download: ${origFilename}`);

      item.setSavePath(unusedFilenameSync(path.join(app.getPath("downloads"), origFilename)));

      ipcMain.on("dlcancel:" + origFilename, () => {
        console.log(`Canceled download for ${origFilename} to ${item.getSavePath()}`);
        item.cancel();
      });

      item.on("updated", (_, state) => {
        const filename = item.getSavePath();

        const dlprogress = {
          filename,
          origFilename,
          currSize: item.getReceivedBytes(),
          totalSize: item.getTotalBytes(),
          startTime: item.getStartTime(),
          state,
        };

        try {
          webContents.send("download-progress", dlprogress);
        } catch (e) {
          console.log("download update failed", e);
        }
      });

      item.once("done", (event, state) => {
        const dlprogress = {
          origFilename,
          state
        };
        try {
          webContents.send("download-progress", dlprogress);
        } catch (e) {
          console.log("download update failed", e);
        }
      });

    });

    //require('@electron/remote/main').initialize();

    super.onAppReady();
  }

  get mainWindowUrl() {
    return "replay/index.html";
  }

  createMainWindow(argv) {
    const theWindow = super.createMainWindow(argv);

    theWindow.on("close", async (event) => {
      if (this.recorders.size) {
        event.preventDefault();
        event.returnValue = false;
        this.handleClose(theWindow);
        return false;
      }
    });

    return theWindow;
  }

  async handleClose(theWindow) {
    const res = await dialog.showMessageBox(theWindow, {
      type: "question",
      buttons: ["Cancel", "Stop Recording and Quit"],
      defaultId: 1,
      cancelId: 0,
      title: "Stop Recording and Quit",
      message: `There are still ${this.recorders.size} active recording sessions. Stop all and quit?`
    });

    // not closing
    if (!res.response) {
      return;
    }

    const promises = [];

    for (const rec of this.recorders.values()) {
      promises.push(rec.shutdownPromise);
      //rec.detach();
      rec.recWindow.close();
    }

    await Promise.all(promises);

    app.exit(0);
  }

  createRecordWindow({url, collId = "", startRec = true, autorun = false} = {}) {
    console.log("start rec window: " + url);

    const recWindow = new BrowserWindow({
      width: this.screenSize.width,
      height: this.screenSize.height,
      isMaximized: true,
      show: true,
      webPreferences: {
        contextIsolation: true,
        webviewTag: true,
        preload: path.join(__dirname, "rec-preload.js")
      }
    });

    recWindow.webContents.on("did-attach-webview", (event, contents) => {
      this.initRecorder(recWindow, contents, url, collId, startRec, autorun);
    });

    recWindow.loadURL(STATIC_PREFIX + "rec-window.html");

    return recWindow;
  }

  async initRecorder(recWindow, recWebContents, url, collId, startRec, autorun, popupView = null) {
    const id = recWebContents.id;

    const recorder = new ElectronRecorder({
      recWC: recWebContents,
      appWC: this.mainWindow.webContents,
      recWindow,
      collId,
      autorun,
      popup: popupView,
      staticPrefix: this.staticContentPath,
      userAgent: this.userAgent,
    });

    recWindow.on("close", (event) => {
      console.log("closing...");
      event.preventDefault();
      recorder.shutdown().then(() => {
        this.recorders.delete(id);
      });
    });

    const newWinContents = popupView ? popupView.webContents : recWindow.webContents;

    newWinContents.on("new-window", (event, url) => {
      event.preventDefault();
      if (url.startsWith(STATIC_PREFIX)) {
        this.mainWindow.loadURL(url);
        this.mainWindow.show();
      }
    });

    ipcMain.on("popup-msg-" + id, async (event, msg) => {
      switch (msg.type) {
      case "startRecording":
        await recorder.attach();
        recWebContents.reload();
        break;

      case "stopRecording":
        await recorder.detach();
        break;

      case "toggleBehaviors":
        await recorder.toggleBehaviors();
        break;
      }
    });

    recWebContents.on("new-window", (event, url, frameName, disposition, options, additionalFeatures, referrer) => {
      event.preventDefault();
      event.newGuest = this.createRecordWindow({url, collId, startRec});
      console.log("new-window", url, frameName, disposition, options, additionalFeatures, referrer);
    });

    recWebContents.on("destroyed", () => {
      this.recorders.delete(id);
    });

    //await recWebContents.loadURL("about:blank");

    recWebContents.clearHistory();

    this.recorders.set(id, recorder);
    if (startRec) {
      await recorder.attach();
    } else {
      newWinContents.send("stats", {
        type: "status",
        recording: false,
        collId,
        pageUrl: url
      });
    }

    if (process.env.NODE_ENV === "development") {
      //recWebContents.openDevTools();
    }

    try {
      recWebContents.loadURL(url);
    } catch (e) {
      console.warn("Load Failed", e);
    }
  }

  async ipfsStart(validPins) {
    const autoipfs = await initAutoIPFS({web3StorageToken: __WEB3_STORAGE_TOKEN__});
    this.autoipfs = autoipfs;

    checkPins(this.ipfsClient, validPins);
  }

  async ipfsPin(event, reqId, filename) {
    let downloadStream = new PassThrough();

    ipcMain.on(reqId, (event, data) => {
      downloadStream.push(data);
      if (!data) {
        ipcMain.removeAllListeners(reqId);
      }
    });

    await this.ipfsClient.initIPFS();

    const readFile = (fileName) => util.promisify(fs.readFile)(fileName);

    const swContent = await readFile(path.join(this.staticContentPath, "replay", "sw.js"));
    const uiContent = await readFile(path.join(this.staticContentPath, "replay", "ui.js"));

    const {car, cid, size} = await ipfsAddWithReplay( 
      filename, downloadStream,
      swContent, uiContent
    );

    const resUrls = await this.autoipfs.uploadCAR(car);
    const url = resUrls[0];

    const data = {
      hash: cid,
      url,
      size,
      ctime: new Date().getTime()
    };

    console.log("ipfs added: " + url);

    event.reply(reqId, data);
  }

  async ipfsUnpin(event, reqId, pinList) {
    if (pinList && pinList.length) {
      await this.ipfsClient.initIPFS();
      await ipfsUnpinAll(this.ipfsClient, pinList);
    }

    event.reply(reqId);
  }
}

export { ElectronRecorderApp };

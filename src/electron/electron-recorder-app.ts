/*eslint-env node */

import {
  app,
  session,
  BrowserWindow,
  ipcMain,
  dialog,
  type HandlerDetails,
  type WindowOpenHandlerResponse,
} from "electron";
import * as electron from "electron";
import { ElectronRecorder } from "./electron-recorder";

import {
  ElectronReplayApp,
  STATIC_PREFIX,
} from "replaywebpage/src/electron-replay-app";

import path from "path";

import { unusedFilenameSync } from "unused-filename";

app.commandLine.appendSwitch("disable-features", "CrossOriginOpenerPolicy");

// ===========================================================================
class ElectronRecorderApp extends ElectronReplayApp {
  // @ts-expect-error - TS7006 - Parameter 'opts' implicitly has an 'any' type.
  constructor(opts) {
    super(opts);

    // @ts-expect-error - TS2339 - Property 'userAgent' does not exist on type 'ElectronRecorderApp'.
    this.userAgent = null;

    // @ts-expect-error - TS2339 - Property 'recorders' does not exist on type 'ElectronRecorderApp'.
    this.recorders = new Map();

    // @ts-expect-error - TS2339 - Property 'certCache' does not exist on type 'ElectronRecorderApp'.
    this.certCache = new Map();
    this.opts = opts;

    // @ts-expect-error - TS2339 - Property 'downloadPath' does not exist on type 'ElectronRecorderApp'.
    this.downloadPath = app.getPath("downloads");
    // @ts-expect-error - TS2339 - Property 'startPage' does not exist on type 'ElectronRecorderApp'.
    this.startPage = "";

    for (let i = 0; i < process.argv.length; i++) {
      if (process.argv[i].startsWith("--download-path=")) {
        // @ts-expect-error - TS2339 - Property 'downloadPath' does not exist on type 'ElectronRecorderApp'.
        this.downloadPath = process.argv[i].split("=")[1];
      } else if (process.argv[i] === "--download-path" && i + 1 < process.argv.length) {
        // @ts-expect-error - TS2339 - Property 'downloadPath' does not exist on type 'ElectronRecorderApp'.
        this.downloadPath = process.argv[i + 1];
      } else if (process.argv[i].startsWith("--start-page=")) {
        // @ts-expect-error - TS2339 - Property 'startPage' does not exist on type 'ElectronRecorderApp'.
        this.startPage = process.argv[i].split("=")[1];
      } else if (process.argv[i] === "--start-page" && i + 1 < process.argv.length) {
        // @ts-expect-error - TS2339 - Property 'startPage' does not exist on type 'ElectronRecorderApp'.
        this.startPage = process.argv[i + 1];
      }
    }
  }

  opts: any;

  // @ts-expect-error - TS2416 - Property 'mainWindowWebPreferences' in type 'ElectronRecorderApp' is not assignable to the same property in base type 'ElectronReplayApp'.
  get mainWindowWebPreferences() {
    return {
      plugins: true,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      sandbox: false,
    };
  }

  onAppReady() {
    const sesh = session.defaultSession;

    ipcMain.on("start-rec", (event, opts) => {
      this.createRecordWindow(opts);
    });

    ipcMain.handle("get-certificate", (event, webContentsId) => {
      console.log(`IPC: get-certificate request for WebContents ID: ${webContentsId}`);
      const wc = electron.webContents.fromId(webContentsId);
      if (!wc) {
        console.warn("WebContents not found for ID:", webContentsId);
        return null;
      }
      try {
        const url = wc.getURL();
        const hostname = new URL(url).hostname;
        // @ts-expect-error - TS2339 - Property 'certCache' does not exist on type 'ElectronRecorderApp'.
        const cert = this.certCache.get(hostname);
        console.log(`Looked up cert for ${hostname}:`, cert ? "Found" : "Not Found");
        return cert || null;
      } catch (e) {
        console.warn("Failed to get certificate", e);
        return null;
      }
    });

    sesh.webRequest.onHeadersReceived((details, callback) => {
      const { url, responseHeaders, method } = details;

      // Allow access to Browsertrix APIs
      if (url.indexOf("/api") >= 0 && responseHeaders) {
        let { statusLine } = details;

        if (method === "OPTIONS") {
          statusLine = "HTTP/1.1 200 OK";
          responseHeaders["Access-Control-Allow-Headers"] = [
            "Authorization, Content-Type",
          ];
          responseHeaders["Access-Control-Allow-Methods"] = ["GET, PUT, POST"];
        }
        responseHeaders["Access-Control-Allow-Origin"] = ["*"];
        callback({ responseHeaders, statusLine });
      } else {
        callback({ responseHeaders });
      }
    });

    sesh.on("will-download", (event, item, webContents) => {
      let origFilename = item.getFilename();

      const urlChain = item.getURLChain() || [];
      const certUrl = urlChain.find(u => u.includes("cert://"));
      if (certUrl) {
         try {
           const host = new URL(certUrl.substring(certUrl.indexOf("cert://"))).hostname;
           if (host) {
             origFilename = `${host}_cert.cer`;
           }
         } catch(e) {}
      }

      console.log(`will-download: ${origFilename}`);

      item.setSavePath(
        // @ts-expect-error - TS2339 - Property 'downloadPath' does not exist on type 'ElectronRecorderApp'.
        unusedFilenameSync(path.join(this.downloadPath, origFilename)),
      );

      ipcMain.on("dlcancel:" + origFilename, () => {
        console.log(
          `Canceled download for ${origFilename} to ${item.getSavePath()}`,
        );
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
          state,
        };
        try {
          webContents.send("download-progress", dlprogress);
        } catch (e) {
          console.log("download update failed", e);
        }
      });
    });

    super.onAppReady();

    // @ts-expect-error - TS2339 - Property 'userAgent' does not exist on type 'ElectronRecorderApp'. | TS2531 - Object is possibly 'null'.
    this.userAgent = this.origUA.replace(/ Electron[^\s]+/, "");

    // @ts-expect-error - TS2339 - Property 'userAgent' does not exist on type 'ElectronRecorderApp'.
    app.userAgentFallback = this.userAgent;
  }

  get mainWindowUrl() {
    let url = "index.html";
    // @ts-expect-error - TS2339 - Property 'startPage' does not exist on type 'ElectronRecorderApp'.
    if (this.startPage) {
      // @ts-expect-error - TS2339 - Property 'startPage' does not exist on type 'ElectronRecorderApp'.
      url += "?startPage=" + encodeURIComponent(this.startPage);
    }
    return url;
  }

  // @ts-expect-error - TS7006 - Parameter 'argv' implicitly has an 'any' type.
  createMainWindow(argv) {
    const theWindow = super.createMainWindow(argv);

    theWindow.on("close", (event) => {
      // @ts-expect-error - TS2339 - Property 'recorders' does not exist on type 'ElectronRecorderApp'.
      if (this.recorders.size) {
        event.preventDefault();
        // @ts-expect-error - TS2339 - Property 'returnValue' does not exist on type '{ preventDefault: () => void; readonly defaultPrevented: boolean; }'.
        event.returnValue = false;
        this.handleClose(theWindow);
        return false;
      }
    });

    return theWindow;
  }

  // @ts-expect-error - TS7006 - Parameter 'theWindow' implicitly has an 'any' type.
  async handleClose(theWindow) {
    const res = await dialog.showMessageBox(theWindow, {
      type: "question",
      buttons: ["Cancel", "Stop Archiving and Quit"],
      defaultId: 1,
      cancelId: 0,
      title: "Stop Archiving and Quit",
      // @ts-expect-error - TS2339 - Property 'recorders' does not exist on type 'ElectronRecorderApp'.
      message: `There are still ${this.recorders.size} active archiving sessions. Stop all and quit?`,
    });

    // not closing
    if (!res.response) {
      return;
    }

    const promises = [];

    // @ts-expect-error - TS2339 - Property 'recorders' does not exist on type 'ElectronRecorderApp'.
    for (const rec of this.recorders.values()) {
      promises.push(rec.shutdownPromise);
      //rec.detach();
      rec.recWindow.close();
    }

    await Promise.all(promises);

    app.exit(0);
  }

  createRecordWindow({
    url = "",
    collId = "",
    startRec = true,
    autorun = false,
  } = {}) {
    const recWindow = new BrowserWindow({
      width: this.screenSize.width,
      height: this.screenSize.height,
      //isMaximized: true,
      show: true,
      webPreferences: {
        contextIsolation: true,
        webviewTag: true,
        preload: path.join(__dirname, "rec-preload.js"),
      },
    });

    recWindow.webContents.on("did-attach-webview", (event, contents) => {
      this.initRecorder(recWindow, contents, url, collId, startRec, autorun);
    });

    recWindow.loadURL(STATIC_PREFIX + "rec-window.html");

    return recWindow;
  }

  async initRecorder(
    // @ts-expect-error - TS7006 - Parameter 'recWindow' implicitly has an 'any' type.
    recWindow,
    // @ts-expect-error - TS7006 - Parameter 'recWebContents' implicitly has an 'any' type.
    recWebContents,
    // @ts-expect-error - TS7006 - Parameter 'url' implicitly has an 'any' type.
    url,
    // @ts-expect-error - TS7006 - Parameter 'collId' implicitly has an 'any' type.
    collId,
    // @ts-expect-error - TS7006 - Parameter 'startRec' implicitly has an 'any' type.
    startRec,
    // @ts-expect-error - TS7006 - Parameter 'autorun' implicitly has an 'any' type.
    autorun,
    //popupView = null,
  ) {
    const id = recWebContents.id;

    const recorder = new ElectronRecorder({
      recWC: recWebContents,
      // @ts-expect-error - TS2531 - Object is possibly 'null'.
      appWC: this.mainWindow.webContents,
      recWindow,
      collId,
      autorun,
      popup: null,
      staticPrefix: this.staticContentPath,
      // @ts-expect-error - TS2339 - Property 'userAgent' does not exist on type 'ElectronRecorderApp'.
      userAgent: this.userAgent,
    });

    // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
    recWindow.on("close", (event) => {
      console.log("closing...");
      event.preventDefault();
      recorder.shutdown().then(() => {
        // @ts-expect-error - TS2339 - Property 'recorders' does not exist on type 'ElectronRecorderApp'.
        this.recorders.delete(id);
      });
    });

    const newWinContents = recWindow.webContents;

    newWinContents.setWindowOpenHandler((details: HandlerDetails) => {
      const { url } = details;
      if (url.startsWith(STATIC_PREFIX)) {
        this.mainWindow!.loadURL(url);
        this.mainWindow!.show();
        return { action: "deny" };
      }

      return { action: "allow" };
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

    recWebContents.setWindowOpenHandler(
      (details: HandlerDetails): WindowOpenHandlerResponse => {
        const { url } = details;

        // Asynchronously create our custom recording window
        setTimeout(() => {
          this.createRecordWindow({ url, collId, startRec });
        }, 0);

        return { action: "deny" };
      },
    );

    recWebContents.on("destroyed", () => {
      // @ts-expect-error - TS2339 - Property 'recorders' does not exist on type 'ElectronRecorderApp'.
      this.recorders.delete(id);
    });

    const archivedCerts = new Set();
    // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
    recWebContents.on("did-navigate", (event, navUrl: string) => {
      try {
        const hostname = new URL(navUrl).hostname;
        // @ts-expect-error - TS2339 - Property 'certCache' does not exist on type 'ElectronRecorderApp'.
        const certObj = this.certCache.get(hostname);
        if (certObj && certObj.certificate && !archivedCerts.has(hostname)) {
          archivedCerts.add(hostname);
          const payload = Buffer.from(certObj.certificate.data, "utf8");
          const data = {
            url: `cert://${hostname}/`,
            ts: Date.now(),
            method: "GET",
            status: 200,
            statusText: "OK",
            mime: "application/x-x509-ca-cert",
            reqHeaders: {},
            respHeaders: {
              "Content-Type": "application/x-x509-ca-cert",
              "Content-Length": payload.length.toString(),
              "Content-Disposition": `attachment; filename="${hostname}_cert.cer"`,
            },
            payload: payload,
            extraOpts: { resource: true },
          };
          // @ts-expect-error - TS2339 - Property 'recorders' does not exist on type 'ElectronRecorderApp'.
          const rec = this.recorders.get(id);
          if (rec && rec.running && rec.appWC) {
            rec.appWC.send("add-resource", data, collId);
          }
        }
      } catch (e) {
        // ignore
      }
    });

    //await recWebContents.loadURL("about:blank");

    recWebContents.clearHistory();

    // @ts-expect-error - TS2339 - Property 'recorders' does not exist on type 'ElectronRecorderApp'.
    this.recorders.set(id, recorder);
    if (startRec) {
      await recorder.attach();
    } else {
      newWinContents.send("stats", {
        type: "status",
        recording: false,
        collId,
        pageUrl: url,
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

    this.setupCertHandler(recWebContents.session);
  }

  // @ts-expect-error - TS7006 - Parameter 'session' implicitly has an 'any' type.
  setupCertHandler(session) {
    if (session._certHandlerInstalled) {
      return;
    }
    session._certHandlerInstalled = true;

    console.log("Installing certificate handler for session");

    // Capture certificates
    session.setCertificateVerifyProc((request: any, callback: any) => {
      const { hostname, certificate, verificationResult, errorCode } = request;
      // console.log("CACHE SET for " + hostname); 
      // @ts-expect-error - TS2339 - Property 'certCache' does not exist on type 'ElectronRecorderApp'.
      this.certCache.set(hostname, { certificate, verificationResult });

      // Default behavior fallback
      if (verificationResult === "net::OK") {
        callback(0);
      } else {
        callback(errorCode);
      }
    });
  }
}

export { ElectronRecorderApp };

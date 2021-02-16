import {app, session, BrowserWindow, BrowserView, ipcMain, dialog} from 'electron';
import { ElectronRecorder } from './electron-recorder';

import { ElectronReplayApp, STATIC_PREFIX } from 'replaywebpage/src/electron-replay-app';

import path from 'path';
import { PassThrough } from 'stream';

import fs from 'fs';
import util from 'util';

import { checkPins, ipfsAddWithReplay, ipfsUnpinAll } from '../utils';


// ===========================================================================
class ElectronRecorderApp extends ElectronReplayApp
{
  constructor(opts) {
    super(opts);

    this.recorders = new Map();
  }

  get mainWindowWebPreferences() {
    return {
      plugins: true,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    }
  }

  onAppReady() {
    const sesh = session.defaultSession;

    const ua = sesh.getUserAgent();
    const desktopUA = ua.replace(/ Electron[^\s]+/, '');

    sesh.setUserAgent(desktopUA);

    app.userAgentFallback = desktopUA;

    ipcMain.on("start-rec", (event, url, collId, startRec) => {
      this.createRecordWindow(url, collId, startRec);
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

    require('@electron/remote/main').initialize();

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

  createRecordWindow(url, collId = "", startRec = true) {
    console.log("start rec window: " + url);

    const recWindow = new BrowserWindow({
      width: this.screenSize.width,
      height: this.screenSize.height - 1,
      isMaximized: true,
      show: true,
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    const view = new BrowserView({webPreferences: {
        partition: "persist:wr",
        plugins: false,
        contextIsolation: true,
      }
    });

    const id = view.webContents.id;

    recWindow.loadURL(STATIC_PREFIX + "locbar.html#" + id);

    const HEADER_HEIGHT = 73;
    recWindow.addBrowserView(view);
    view.setBounds({ x: 0, y: HEADER_HEIGHT, width: this.screenSize.width, height: this.screenSize.height - HEADER_HEIGHT });
    view.setAutoResize({width: true, height: true});
    recWindow.setSize(this.screenSize.width, this.screenSize.height);
    
    recWindow.maximize();

    const popupView = new BrowserView({webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }});

    let popupShown = false;

    function setPopupBounds() {
      const bounds = recWindow.getBounds();
      popupView.setBounds({ x: bounds.width - 400, y: HEADER_HEIGHT - 22, width: 400, height: 300 });
      //popupView.webContents.openDevTools();
    }

    ipcMain.on("popup-toggle-" + id, (event) => {
      if (!popupShown) {
        recWindow.addBrowserView(popupView);
        setPopupBounds();
        popupView.webContents.loadURL(STATIC_PREFIX + "app-popup.html#" + id).then(() => {
          popupView.webContents.send("popup", {
            type: "status",
            recording: false,
            collId,
            pageUrl: url});
        });
      } else {
        recWindow.removeBrowserView(popupView);
      }
      popupShown = !popupShown;
    });

    recWindow.on('resize', (event) => {
      if (popupShown) {
        setPopupBounds();
      }
    });

    const recorder = new ElectronRecorder({
      recWC: view.webContents,
      appWC: this.mainWindow.webContents,
      recWindow,
      collId,
      popup: popupView,
      staticPrefix: this.staticContentPath
    });

    recWindow.on("close", (event) => {
      console.log("closing...")
      event.preventDefault();
      recorder.shutdown().then(() => {
        this.recorders.delete(id);
      });
    });

    popupView.webContents.on("new-window", (event, url, frameName, disposition, options, additionalFeatures, referrer) => {
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
          view.webContents.reload();
          break;

        case "stopRecording":
          await recorder.detach();
          break;
      }
    });

    view.webContents.on("new-window", (event, url, frameName, disposition, options, additionalFeatures, referrer) => {
      event.preventDefault();
      event.newGuest = this.createRecordWindow(url, collId, startRec);
      console.log("new-window", url, frameName, disposition, options, additionalFeatures, referrer);
    });

    view.webContents.on("destroyed", () => {
      this.recorders.delete(id);
    });

    (async () => {
      await view.webContents.loadURL("about:blank");

      view.webContents.clearHistory();
      this.recorders.set(id, recorder);
      if (startRec) {
        await recorder.attach();
      }

      if (process.env.NODE_ENV === "development") {
        view.webContents.openDevTools();
      }

      try {
        view.webContents.loadURL(url);
      } catch (e) {
        console.warn("Load Failed", e);
      }
    })();

    return recWindow;
  }

  async ipfsStart(validPins) {
    await this.ipfsClient.initIPFS();

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

    //const data = await ipfsAddPin(this.ipfsClient, filename, downloadStream);
    const data = await ipfsAddWithReplay(this.ipfsClient, filename, downloadStream,
      swContent, uiContent);

    console.log("ipfs added: " + data.url);

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
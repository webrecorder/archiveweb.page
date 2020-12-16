import {app, session, BrowserWindow, BrowserView, ipcMain} from 'electron';
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

    ipcMain.on("start-rec", (event, url, collId) => {
      this.createRecordWindow(url, collId);
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

  createRecordWindow(url, collId = "") {
    console.log("start rec window: " + url);

    const recWindow = new BrowserWindow({
      width: this.screenSize.width,
      height: this.screenSize.height - 1,
      isMaximized: true,
      show: true,
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true
      }
    });

    const view = new BrowserView({webPreferences: {
        partition: "persist:wr",
        plugins: true
      }
    });

    recWindow.loadURL(STATIC_PREFIX + "locbar.html#" + view.webContents.id);

    const HEADER_HEIGHT = 73;
    recWindow.addBrowserView(view);
    view.setBounds({ x: 0, y: HEADER_HEIGHT, width: this.screenSize.width, height: this.screenSize.height - HEADER_HEIGHT });
    view.setAutoResize({width: true, height: true});
    recWindow.setSize(this.screenSize.width, this.screenSize.height);
    recWindow.maximize();

    const recorder = new ElectronRecorder(view.webContents, this.mainWindow.webContents, collId);

    recWindow.on('close', (event) => {
      console.log("closing...")
      event.preventDefault();
      recorder.detach().then(() => {
        recWindow.destroy()
        this.recorders.delete(view.webContents.id);
      });
    });

    view.webContents.on("new-window", (event, url, frameName, disposition, options, additionalFeatures, referrer) => {
      event.preventDefault();
      event.newGuest = this.createRecordWindow(url);
      console.log("new-window", url, frameName, disposition, options, additionalFeatures, referrer);
    });

    view.webContents.on("destroyed", () => {
      this.recorders.delete(view.webContents.id);
    });

    view.webContents.loadURL("about:blank").then(() => {
      view.webContents.clearHistory();
      this.recorders.set(view.webContents.id, recorder);
      recorder.attach();

      if (process.env.NODE_ENV === "development") {
        view.webContents.openDevTools();
      }

      return recorder.started;
    }).then(() => view.webContents.loadURL(url));

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
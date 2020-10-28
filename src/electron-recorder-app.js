import {app, session, BrowserWindow, BrowserView, ipcMain} from 'electron';
import { ElectronRecorder } from './electron-recorder';

import { ElectronReplayApp, STATIC_PREFIX } from 'replaywebpage/src/electron-replay-app';

import path from 'path';


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

    ipcMain.on("start-rec", (event, url) => {
      this.createRecordWindow(url);
    });

    super.onAppReady();
  }

  createRecordWindow(url) {
    console.log("start rec window: " + url);

    const recWindow = new BrowserWindow({
      width: this.screenSize.width,
      height: this.screenSize.height - 1,
      isMaximized: true,
      show: true,
    });

    recWindow.loadURL(STATIC_PREFIX + "rec.html");

    const view = new BrowserView({webPreferences: {
        partition: "persist:wr",
        plugins: true
      }
    });

    const HEADER_HEIGHT = 70;
    recWindow.setBrowserView(view);
    view.setBounds({ x: 0, y: HEADER_HEIGHT, width: this.screenSize.width, height: this.screenSize.height - HEADER_HEIGHT });
    view.setAutoResize({width: true, height: true});
    recWindow.setSize(this.screenSize.width, this.screenSize.height);
    recWindow.maximize();

    const recorder = new ElectronRecorder(view.webContents, this.mainWindow.webContents);

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
      this.recorders.set(view.webContents.id, recorder);
      recorder.attach();

      return recorder.started;
    }).then(() => view.webContents.loadURL(url));

    return recWindow;
  }
}

export { ElectronRecorderApp };
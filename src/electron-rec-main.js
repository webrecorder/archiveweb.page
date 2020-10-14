import {app, session, BrowserWindow, BrowserView, screen, ipcMain} from 'electron';
import { ElectronRecorder } from './electron-recorder';

import path from 'path';
import fs from 'fs';
import mime from 'mime-types';

import { Headers } from 'node-fetch';
import fetch from 'node-fetch';

global.Headers = Headers;
global.fetch = fetch;

import { PassThrough } from 'stream';

const STATIC_PREFIX = "http://localhost:5471/";

const appPath = app.getAppPath();

const projPath = path.join(appPath, "../");

const staticContentPath = path.join(__dirname, "../wr-ext/replay/");

const pluginPath = path.join(projPath, "plugins", "PepperFlashPlayer.plugin");

let screenSize = {width: 1024, height: 768};

const recorders = new Map();

let mainWindow = null;


// ===========================================================================
app.commandLine.appendSwitch('ppapi-flash-path', pluginPath);

app.whenReady().then(() => main());


// ===========================================================================
// Main entry point
function main() {
  const sesh = session.defaultSession;

  screenSize = screen.getPrimaryDisplay().workAreaSize;

  const ua = sesh.getUserAgent();
  const desktopUA = ua.replace(/ Electron[^\s]+/, '');

  sesh.setUserAgent(desktopUA);

  app.userAgentFallback = desktopUA;

  //app.allowRendererProcessReuse = false;

  //sesh.protocol.interceptStreamProtocol("file", doIntercept);
  sesh.protocol.interceptStreamProtocol("http", doIntercept);
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });

    // Quit when all windows are closed.
  app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    //if (process.platform !== 'darwin')
    app.quit();
  });

  ipcMain.on("start-rec", (event, url) => {
    createRecordWindow(url);
  });

  createMainWindow();
}

// ===========================================================================
function createMainWindow(startPage = "index.html") {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: screenSize.width,
    height: screenSize.height,
    isMaximized: true,
    show: false,
    webPreferences: {
      //plugins: true,
      //webviewTag: true,
      preload: path.join(__dirname, 'preload.js'),
      //nativeWindowOpen: true,
      contextIsolation: true
    }
  }).once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.maximize();
  });

  mainWindow.loadURL(STATIC_PREFIX + startPage);
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }
}

// ===========================================================================
async function doIntercept(request, callback) {
  console.log(`${request.method} ${request.url} from ${request.referrer}`);

  // if local server
  if (request.url.startsWith(STATIC_PREFIX)) {
  
    // try serve static file from app dir
    let filename = request.url.slice(STATIC_PREFIX.length).split("?", 1)[0];
    filename = filename.split("#", 1)[0];

    if (filename === "") {
      filename = "index.html";
    } else if (filename === "docs") {
      filename = "docs/index.html";
    }

    let ext = path.extname(filename);
    if (!ext) {
      ext = ".html";
      filename += ext;
    }

    const mimeType = mime.contentType(ext);

    if (mimeType) {
      const fullPath = path.join(staticContentPath, filename);

      console.log("fullPath: " + fullPath);

      const data = fs.createReadStream(fullPath);

      return callback({statusCode: 200, headers: {"content-type": mimeType}, data});
    }
    
    return notFound(request.url, callback);
  }
}

// ===========================================================================
function bufferToStream(data) {
  const rv = new PassThrough();
  rv.push(data);
  rv.push(null);
  return rv;
}

// ===========================================================================
function notFound(url, callback) {
  console.log("not found: " +  url);
  const data = bufferToStream(`Sorry, the url <b>${url}</b> could not be found in this archive.`);
  callback({statusCode: 404, headers: {"Content-Type": 'text/html; charset="utf-8"'}, data});
}

// ===========================================================================
function createRecordWindow(url) {
  console.log("start rec window: " + url);

  const recWindow = new BrowserWindow({
    width: screenSize.width,
    height: screenSize.height - 1,
    isMaximized: true,
    show: true,
  });

  recWindow.loadURL(STATIC_PREFIX + "rec.html");

  const view = new BrowserView({webPreferences: {
      partition: "persist:wr"
    }
  });

  const HEADER_HEIGHT = 70;
  recWindow.setBrowserView(view);
  view.setBounds({ x: 0, y: HEADER_HEIGHT, width: screenSize.width, height: screenSize.height - HEADER_HEIGHT });
  view.setAutoResize({width: true, height: true});
  recWindow.setSize(screenSize.width, screenSize.height);
  recWindow.maximize();

  const recorder = new ElectronRecorder(view.webContents, mainWindow.webContents);

  recWindow.on('close', (event) => {
    console.log("closing...")
    event.preventDefault();
    recorder.detach().then(() => recWindow.destroy());
  });

  view.webContents.on("new-window", (event, url, frameName, disposition, options, additionalFeatures, referrer) => {
    event.preventDefault();
    event.newGuest = createRecordWindow(url);
    console.log("new-window", url, frameName, disposition, options, additionalFeatures, referrer);
  });

  view.webContents.loadURL("about:blank").then(() => {
    recorders.set(view.webContents.id, recorder);
    recorder.attach();

    return recorder.started;
  }).then(() => view.webContents.loadURL(url));

  return recWindow;
}

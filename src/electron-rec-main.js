import {app, session, BrowserWindow, ipcMain} from 'electron';
import { ElectronRecorder } from './electron-recorder';

import path from 'path';
import fs from 'fs';
import mime from 'mime-types';

import { Headers } from 'node-fetch';

global.Headers = Headers;

import { PassThrough } from 'stream';

const STATIC_PREFIX = "http://localhost:5471/";

const appPath = app.getAppPath();

const projPath = path.join(appPath, "../");

const staticContentPath = path.join(__dirname, "../wr-ext/replay/");

const pluginPath = path.join(projPath, "plugins", "PepperFlashPlayer.plugin");

app.commandLine.appendSwitch('ppapi-flash-path', pluginPath);

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


function bufferToStream(data) {
  const rv = new PassThrough();
  rv.push(data);
  rv.push(null);
  return rv;
}


function notFound(url, callback) {
  console.log("not found: " +  url);
  const data = bufferToStream(`Sorry, the url <b>${url}</b> could not be found in this archive.`);
  callback({statusCode: 404, headers: {"Content-Type": 'text/html; charset="utf-8"'}, data});
}


let mainWindow = null;

function createWindow(startPage = "index.html") {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    isMaximized: true,
    show: false,
    webPreferences: {
      plugins: true,
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js'),
      //nativeWindowOpen: true,
      contextIsolation: false
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const sesh = session.defaultSession;

  //sesh.protocol.interceptStreamProtocol("file", doIntercept);
  sesh.protocol.interceptStreamProtocol("http", doIntercept);

  createWindow();
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  //if (process.platform !== 'darwin')
  app.quit();
});

const recorders = new Map();

app.on('web-contents-created', (event, contents) => {
  contents.on("will-attach-webview", (event, webPrefs, params) => {

    console.log("will-attach", contents.id);

    webPrefs.preloadURL = "file://" + __WEBVIEW_PRELOAD_PATH__;
    webPrefs.plugins = true;

    const recorder = recorders.get(webPrefs.guestInstanceId);

    if (recorder) {
      recorder.openUrl = params.src;
    }

    params.src = "about:blank";
  });

  contents.on("did-attach-webview", (event, newWC) => {
    console.log("did attach", newWC.id);

    const recorder = recorders.get(newWC.id);

    if (recorder) {
      recorder.loadOpenUrl();
      //newWC.loadURL(recorder.openUrl);
    }
  });


  if (contents.getType() === "webview") {    
    const id = contents.id;

    console.log("webview created", id);

    const recorder = new ElectronRecorder(contents, mainWindow.webContents);
    recorders.set(id, recorder);
    recorder.attach();

    console.log("attached debugger", id);

    contents.on("preload-error", (event, preloadPath, error) => {
      console.log(`error ${preloadPath}: ${error}`);
    });

    contents.on("new-window", (event, url, frameName, disposition, options, additionalFeatures, referrer) => {
      //console.log("new-window", url, frameName, disposition, options, additionalFeatures, referrer);
      createWindow("index.html#recUrl=" + url);
    });

    contents.on("destroyed", () => {
      recorders.delete(id);
    });
  }
});


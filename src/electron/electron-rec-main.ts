/*eslint-env node */

import { app } from "electron";
import { ElectronRecorderApp } from "./electron-recorder-app";
import path from "path";

// @ts-expect-error - TS7016 - Could not find a declaration file for module 'btoa'. '/Users/emma/Work/Webrecorder/archiveweb.page/node_modules/btoa/index.js' implicitly has an 'any' type.
import btoa from "btoa";
global.btoa = btoa;

// ===========================================================================
if (process.argv.includes("--disable-cache") || process.argv.includes("--disable-http-cache")) {
  app.commandLine.appendSwitch("disable-http-cache");
}

const recorderApp = new ElectronRecorderApp({
  staticPath: path.join(__dirname, "./"),
  profileName: process.env.AWP_PROFILE_NAME || "archivewebpage",
});

recorderApp.init();

/*eslint-env node */

import { ElectronRecorderApp } from "./electron-recorder-app";
import path from "path";

import btoa from "btoa";
global.btoa = btoa;


// ===========================================================================
const recorderApp = new ElectronRecorderApp({
  staticPath: path.join(__dirname, "./"),
  profileName: process.env.AWP_PROFILE_NAME || "archivewebpage"
});

recorderApp.init();

/*eslint-env node */

import { ElectronRecorderApp } from "./electron-recorder-app";
import path from "path";


// ===========================================================================
const recorderApp = new ElectronRecorderApp({
  staticPath: path.join(__dirname, "./"),
  profileName: "archivewebpage"
});

recorderApp.init();

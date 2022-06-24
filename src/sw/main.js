import { SWReplay } from "@webrecorder/wabac/src/swmain";

import { ExtAPI } from "./api";

import { RecordingCollections } from "./recproxy";

const defaultConfig = {
  injectScripts: ["/ruffle/ruffle.js"],
  baseUrlSourcePrefix: "/replay/index.html",
  //convertPostToGet: true
};

self.sw = new SWReplay({ApiClass: ExtAPI, useIPFS: false, defaultConfig, CollectionsClass: RecordingCollections});

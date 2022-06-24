import { SWReplay } from "@webrecorder/wabac/src/swmain";

import { ExtAPI } from "./api";

import { RecordingCollections } from "./recproxy";

import REC_INDEX_HTML from "../../wr-ext/replay/index.html";
import RWP_INDEX_HTML from "replaywebpage/index.html";

const defaultConfig = {
  injectScripts: ["/ruffle/ruffle.js"],
  baseUrlSourcePrefix: "/replay/index.html",
  //convertPostToGet: true
};

const staticData = new Map();

const prefix = self.registration.scope;

staticData.set(prefix, {type: "text/html", content: RWP_INDEX_HTML});
staticData.set(prefix + "index.html", {type: "text/html", content: RWP_INDEX_HTML});
staticData.set(prefix + "record.html", {type: "text/html", content: REC_INDEX_HTML});

const useIPFS = false;
const ApiClass = ExtAPI;
const CollectionsClass = RecordingCollections;

self.sw = new SWReplay({ApiClass, useIPFS, staticData, defaultConfig, CollectionsClass});

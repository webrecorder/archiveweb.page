import { SWReplay } from "@webrecorder/wabac/src/swmain";

import { ExtAPI, RecordingCollections } from "@webrecorder/awp-sw";

import REC_INDEX_HTML from "../static/index.html";
import RWP_INDEX_HTML from "replaywebpage/index.html";

import { WorkerLoader } from "@webrecorder/wabac/src/loaders";

if (self.registration) {
  const defaultConfig = {
    injectScripts: ["/ruffle/ruffle.js"],
    baseUrlSourcePrefix: "/index.html",
    convertPostToGet: true
  };

  const staticData = new Map();

  const prefix = self.registration.scope;

  // for backwards compatibility to support <replay-web-page> tag
  staticData.set(prefix + "replay.html", {type: "text/html", content: RWP_INDEX_HTML});

  // for use with <record-web-page> tag
  staticData.set(prefix + "record.html", {type: "text/html", content: REC_INDEX_HTML});

  const ApiClass = ExtAPI;
  const CollectionsClass = RecordingCollections;

  const autoipfsOpts = {};

  self.sw = new SWReplay({ApiClass, staticData, autoipfsOpts, defaultConfig, CollectionsClass});
} else {
  new WorkerLoader(self);
}

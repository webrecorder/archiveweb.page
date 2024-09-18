import { SWReplay, WorkerLoader } from "@webrecorder/wabac/swlib";

import { ExtAPI, RecordingCollections } from "@webrecorder/awp-sw";

import REC_INDEX_HTML from "@/static/index.html";
import RWP_INDEX_HTML from "replaywebpage/index.html";

// @ts-expect-error - TS2339 - Property 'registration' does not exist on type 'Window & typeof globalThis'.
if (self.registration) {
  const defaultConfig = {
    injectScripts: ["/ruffle/ruffle.js"],
    baseUrlSourcePrefix: "/replay/index.html",
    convertPostToGet: false,
  };

  const staticData = new Map();

  // @ts-expect-error - TS2339 - Property 'registration' does not exist on type 'Window & typeof globalThis'.
  const prefix = self.registration.scope;

  // for backwards compatibility to support <replay-web-page> tag
  staticData.set(prefix + "replay.html", {
    type: "text/html",
    content: RWP_INDEX_HTML,
  });

  // for use with <record-web-page> tag
  staticData.set(prefix + "record.html", {
    type: "text/html",
    content: REC_INDEX_HTML,
  });

  const ApiClass = ExtAPI;
  const CollectionsClass = RecordingCollections;

  // @ts-expect-error - TS2339 - Property 'sw' does not exist on type 'Window & typeof globalThis'.
  self.sw = new SWReplay({
    ApiClass,
    staticData,
    defaultConfig,
    CollectionsClass,
  });
} else {
  new WorkerLoader(self);
}

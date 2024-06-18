// @ts-expect-error - TS7016 - Could not find a declaration file for module '@webrecorder/wabac/src/swmain'. '/Users/emma/Work/Webrecorder/archiveweb.page/node_modules/@webrecorder/wabac/src/swmain.js' implicitly has an 'any' type.
import { SWReplay } from "@webrecorder/wabac/src/swmain";

// @ts-expect-error - TS2307 - Cannot find module '@webrecorder/awp-sw' or its corresponding type declarations.
import { ExtAPI, RecordingCollections } from "@webrecorder/awp-sw";

import REC_INDEX_HTML from "@/static/replay/index.html";
import RWP_INDEX_HTML from "replaywebpage/index.html";

// @ts-expect-error - TS7016 - Could not find a declaration file for module '@webrecorder/wabac/src/loaders'. '/Users/emma/Work/Webrecorder/archiveweb.page/node_modules/@webrecorder/wabac/src/loaders.js' implicitly has an 'any' type.
import { WorkerLoader } from "@webrecorder/wabac/src/loaders";

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

  const autoipfsOpts = {};

  // @ts-expect-error - TS2339 - Property 'sw' does not exist on type 'Window & typeof globalThis'.
  self.sw = new SWReplay({
    ApiClass,
    staticData,
    autoipfsOpts,
    defaultConfig,
    CollectionsClass,
  });
} else {
  new WorkerLoader(self);
}

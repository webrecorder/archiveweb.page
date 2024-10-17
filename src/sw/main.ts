import { SWReplay, WorkerLoader } from "@webrecorder/wabac/swlib";

import { ExtAPI, RecordingCollections } from "@webrecorder/awp-sw";

import REC_INDEX_HTML from "@/static/index.html";
import RWP_INDEX_HTML from "replaywebpage/index.html";

declare let self: ServiceWorkerGlobalScope;

if (self.registration) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultConfig: Record<string, any> = {
    baseUrlSourcePrefix: "/replay/index.html",
    convertPostToGet: false,
  };

  if (self.location.origin.startsWith("chrome-extension://")) {
    defaultConfig["injectScripts"] = ["/ruffle/ruffle.js"];
  }

  const staticData = new Map();

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (self as any).sw = new SWReplay({
    ApiClass,
    staticData,
    defaultConfig,
    CollectionsClass,
  });
} else {
  new WorkerLoader(self);
}

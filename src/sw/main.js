import { SWReplay } from "@webrecorder/wabac/src/swmain";

import { ExtAPI } from "./api";

import { RecordingCollections } from "./recproxy";

import REC_INDEX_HTML from "../static/replay/index.html";
import { WorkerLoader } from "@webrecorder/wabac/src/loaders";

const RWP_INDEX_HTML = `
<!doctype html>
<html class="no-overflow">
<head><title>ReplayWeb.page</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="./ui.js"></script>
</head>
<body>
  <replay-app-main></replay-app-main>
</body>
</html>
`;

if (self.registration) {
  const defaultConfig = {
    injectScripts: ["/ruffle/ruffle.js"],
    baseUrlSourcePrefix: "/replay/index.html",
    //convertPostToGet: true
  };

  const staticData = new Map();

  const prefix = self.registration.scope;

  // for backwards compatibility to support <replay-web-page> tag
  staticData.set(prefix + "replay.html", {type: "text/html", content: RWP_INDEX_HTML});

  // for use with <record-web-page> tag
  staticData.set(prefix + "record.html", {type: "text/html", content: REC_INDEX_HTML});

  const useIPFS = false;
  const ApiClass = ExtAPI;
  const CollectionsClass = RecordingCollections;

  self.sw = new SWReplay({ApiClass, useIPFS, staticData, defaultConfig, CollectionsClass});
} else {
  new WorkerLoader(self);
}

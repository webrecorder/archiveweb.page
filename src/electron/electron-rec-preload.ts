/*eslint-env node */

"use strict";

import { ensureDefaultColl } from "../utils";

import { loader, getDB } from "replaywebpage/src/electron-preload";

const { ipcRenderer, contextBridge } = require("electron");

// @ts-expect-error - TS7034 - Variable 'downloadCallback' implicitly has type 'any' in some locations where its type cannot be determined.
let downloadCallback;

// ===========================================================================
const globalAPI = {
  // @ts-expect-error - TS7006 - Parameter 'opts' implicitly has an 'any' type.
  record: (opts) => {
    ipcRenderer.send("start-rec", opts);
  },

  // @ts-expect-error - TS7006 - Parameter 'callback' implicitly has an 'any' type.
  setDownloadCallback: (callback) => {
    downloadCallback = callback;
  },

  // @ts-expect-error - TS7006 - Parameter 'dlprogress' implicitly has an 'any' type.
  downloadCancel: (dlprogress) => {
    ipcRenderer.send("dlcancel:" + dlprogress.origFilename);
  },
} as const;
export type GlobalAPI = typeof globalAPI;

contextBridge.exposeInMainWorld("archivewebpage", globalAPI);

// ===========================================================================
ipcRenderer.on("add-resource", async (event, data, collId) => {
  const db = await getDB(collId);

  const payloadSize = data.payload.length;
  let writtenSize = 0;

  try {
    if (await db.addResource(data)) {
      writtenSize += payloadSize;
    }
  } catch (e) {
    console.warn(`Commit error for ${data.url} @ ${data.ts} ${data.mime}`);
    console.warn(e);
    return;
  }

  //loader.updateSize(collId, payloadSize, writtenSize);

  // increment page size
  //db.addPage(pageInfo);

  if (writtenSize) {
    ipcRenderer.send("inc-size", writtenSize);
  }
});

// ===========================================================================
ipcRenderer.on("add-page", async (event, pageInfo, collId) => {
  const db = await getDB(collId);

  db.addPage(pageInfo);
  //console.log("add-page", pageInfo);
});

// ===========================================================================
ipcRenderer.on("inc-sizes", (event, totalSize, writtenSize, collId) => {
  if (totalSize > 0) {
    loader.updateSize(collId, totalSize, writtenSize);
  }
});

// ===========================================================================
ipcRenderer.on("download-progress", (event, progress) => {
  // @ts-expect-error - TS7005 - Variable 'downloadCallback' implicitly has an 'any' type.
  if (downloadCallback) {
    downloadCallback(progress);
  }
});

// ===========================================================================
async function main() {
  await ensureDefaultColl(loader);
}

// // ===========================================================================
main();

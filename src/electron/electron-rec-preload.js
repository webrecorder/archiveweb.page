/*eslint-env node */

"use strict";

import { ensureDefaultColl, ensureDefaultCollAndIPFS } from "../utils";

import { loader, getDB } from "replaywebpage/src/electron-preload";

const { ipcRenderer, contextBridge } = require("electron");

let downloadCallback;


// ===========================================================================
contextBridge.exposeInMainWorld("archivewebpage", {
  record: (opts) => {
    ipcRenderer.send("start-rec", opts);
  },

  setDownloadCallback: (callback) => {
    downloadCallback = callback;
  },

  downloadCancel: (dlprogress) => {
    ipcRenderer.send("dlcancel:" + dlprogress.origFilename);
  }

});


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
ipcRenderer.on("inc-sizes", async (event, totalSize, writtenSize, collId) => {
  if (totalSize > 0) {
    loader.updateSize(collId, totalSize, writtenSize);
  }
});


// ===========================================================================
ipcRenderer.on("download-progress", async (event, progress) => {
  if (downloadCallback) {
    downloadCallback(progress);
  }
});

// ===========================================================================
async function main()
{
  await ensureDefaultColl(loader);
}

// // ===========================================================================
main();

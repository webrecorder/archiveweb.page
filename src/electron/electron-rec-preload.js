/*eslint-env node */

import { ensureDefaultCollAndIPFS } from "../utils";

import { loader, getColl, getDB } from "replaywebpage/src/electron-preload";

import { Downloader } from "../downloader";

const { ipcRenderer, contextBridge } = require("electron");


// ===========================================================================
contextBridge.exposeInMainWorld("archivewebpage", {
  record: (url, collId, startRec) => {
    ipcRenderer.send("start-rec", url, collId, startRec);
  },

  ipfsPin: (collId) => {
    return handleIpfsPin(collId);
  },

  ipfsUnpin: (collId) => {
    return handleIpfsUnpin(collId);
  },
});


// ===========================================================================
ipcRenderer.on("add-resource", async (event, data, pageInfo, collId) => {
  const db = await getDB(collId);

  let writtenSize = 0;
  const payloadSize = data.payload.length;

  try {
    if (await db.addResource(data)) {
      writtenSize = payloadSize;
    }
  } catch (e) {
    console.warn(`Commit error for ${data.url} @ ${data.ts} ${data.mime}`);
    console.warn(e);
    return;
  }

  loader.updateSize(collId, payloadSize, writtenSize);

  // increment page size
  db.addPage(pageInfo);

  if (writtenSize) {
    ipcRenderer.send("inc-size", writtenSize);
  }
});


// ===========================================================================
ipcRenderer.on("add-page", async (event, pageInfo, collId) => {
  const db = await getDB(collId);

  db.addPage(pageInfo);
  console.log("add-page", pageInfo);
});


// ===========================================================================
async function handleIpfsPin(collId) {
  const reqId = "pin-" + collId + (100 * Math.random());

  const coll = await getColl(collId);

  const dl = new Downloader({coll});

  const resp = await dl.download();

  ipcRenderer.send("ipfs-pin", reqId, resp.filename);

  const reader = resp.body.getReader();

  const getHash = new Promise((resolve) => {
    ipcRenderer.once(reqId, async (event, pinData) => {
      if (!coll.config.metadata.ipfsPins) {
        coll.config.metadata.ipfsPins = [];
      }
    
      coll.config.metadata.ipfsPins.push(pinData);
    
      await loader.updateMetadata(collId, coll.config.metadata);

      resolve({"ipfsURL": pinData.url});
    });
  });

  let done = false;

  while (!done) {
    const res = await reader.read();
    done = res.done;
    if (res.value) {
      ipcRenderer.send(reqId, res.value);
    }
  }

  ipcRenderer.send(reqId, null);

  return await getHash;
}

// ===========================================================================
async function handleIpfsUnpin(collId) {
  const reqId = "unpin-" + collId + (100 * Math.random());

  const coll = await getColl(collId);

  if (!coll.config.metadata.ipfsPins) {
    return {"removed": true};
  }

  const removeHashes = new Promise((resolve) => {
    ipcRenderer.once(reqId, async () => {
      coll.config.metadata.ipfsPins = null;
    
      await loader.updateMetadata(collId, coll.config.metadata);

      resolve({"removed": true});
    });
  });

  ipcRenderer.send("ipfs-unpin", reqId, coll.config.metadata.ipfsPins);

  return await removeHashes;
}

// ===========================================================================
async function main()
{
  const validPins = await ensureDefaultCollAndIPFS(loader);

  if (validPins.size) {
    ipcRenderer.send("start-ipfs", validPins);
  }
}

// ===========================================================================
main();

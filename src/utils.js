import { IPFSClient } from "@webrecorder/wabac/src/ipfs";


// ===========================================================================
async function ensureDefaultColl(collLoader)
{
  let colls = await collLoader.listAll();

  if (!colls.length) {
    const metadata = {"title": "My Web Archive"};
    const result = await collLoader.initNewColl(metadata);

    localStorage.setItem("defaultCollId", result.name);

    colls = [result];

  } else {
    const defaultId = localStorage.getItem("defaultCollId");

    for (const coll of colls) {
      if (coll.name === defaultId) {
        return colls;
      }
    }

    localStorage.setItem("defaultCollId", colls[0].name);
  }

  return colls;
}


// ===========================================================================
async function ensureDefaultCollAndIPFS(collLoader) {
  const colls = await ensureDefaultColl(collLoader);
  let hasIpfs = false;

  for (const coll of colls) {
    if (coll.config.metadata.ipfsPins) {
      hasIpfs = true;
      break;
    }
  }

  return hasIpfs;
}


// ===========================================================================
async function ipfsAddPin(ipfsClient, path, content) {
  const resp = await ipfsClient.ipfs.add({path, content}, {wrapWithDirectory: true});

  const hash = resp.cid.toString();

  const url = `ipfs://${hash}/${path}`;

  const size = resp.size;

  const ctime = new Date().getTime();

  return {hash, url, size, ctime};
}


// ===========================================================================
async function ipfsAddWithReplay(ipfsClient, waczPath, waczContent, fetchPrefix) {
  const fileDef = [
    {path: "ui.js"},
    {path: "sw.js"},
    {path: "index.html",
     content: `
     <!doctype html>
     <html class="no-overflow">
     <head>
       <title>ReplayWeb.page</title>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <script src="./ui.js"></script>
     </head>
     <body>
       <replay-app-main source="${waczPath}"></replay-app-main>
     </body>
     </html>`
    }
  ];

  const fileData = [];

  for (const entry of fileDef) {
    let content;

    if (!entry.content) {
      const resp = await fetch(fetchPrefix + entry.path);
      content = await resp.arrayBuffer();
    } else {
      content = new TextEncoder().encode(entry.content);
    }
    fileData.push({path: entry.path, content});
  }

  fileData.push({path: waczPath, content: waczContent});

  const resp = await ipfsClient.ipfs.addAll(fileData, {wrapWithDirectory: true});

  let hash;
  let size = 0;

  for await (const entry of resp) {
    size += entry.size;
    if (entry.path === "") {
      hash = entry.cid.toString();
    }
  }

  const url = `ipfs://${hash}/${waczPath}`;

  const ctime = new Date().getTime();

  return {hash, url, size, ctime};
}


// ===========================================================================
async function ipfsUnpinAll(ipfsClient, pinList) {
  if (pinList) {
    for (const pin of pinList) {
      try {
        await ipfsClient.ipfs.pin.rm(pin.hash);
      } catch (e) {
        console.warn(e);
      }
    }
    ipfsClient.runGC();
  }
  return null;
}

export { ensureDefaultColl, ensureDefaultCollAndIPFS, ipfsAddPin, ipfsAddWithReplay, ipfsUnpinAll };
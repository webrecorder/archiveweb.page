import { initAutoIPFS } from "@webrecorder/wabac/src/ipfs";
import { Downloader } from "../downloader";
import { createInMemoryRepo } from "./inmemrepo";

export async function ipfsPinUnpin(collLoader, collId, isPin, progress = null) {
  const coll = await collLoader.loadColl(collId);
  if (!coll) {
    return {error: "collection_not_found"};
  }

  const autoipfs = await initAutoIPFS();

  if (isPin) {
    const filename = "webarchive.wacz";

    const dl = new Downloader({coll, filename});
    const dlResponse = await dl.download(progress);

    if (!coll.config.metadata.ipfsPins) {
      coll.config.metadata.ipfsPins = [];
    }

    const swContent = await fetchBuffer("sw.js");
    const uiContent = await fetchBuffer("ui.js");

    const {ipfs, cid, size} = await ipfsAddWithReplay( 
      dlResponse.filename, dlResponse.body,
      swContent, uiContent
    );

    const resUrls = await autoipfs.uploadCar(ipfs.dag.export(cid));
    const url = resUrls[0];

    coll.config.metadata.ipfsPins.push({cid: cid.toString(), size, url});

    console.log("ipfs cid added " + url);

    await collLoader.updateMetadata(coll.name, coll.config.metadata);

    return {"ipfsURL": url};

  } else {
    if (coll.config.metadata.ipfsPins) {
      //TODO: need remove support in auto-js-ipfs
      //await ipfsUnpinAll(this, coll.config.metadata.ipfsPins);

      coll.config.metadata.ipfsPins = null;

      await collLoader.updateMetadata(coll.name, coll.config.metadata);
    }

    return {"removed": true};
  }
}

async function fetchBuffer(filename) {
  const resp = await fetch(chrome.runtime.getURL("/replay/" + filename));

  return new Uint8Array(await resp.arrayBuffer());
}

// ===========================================================================
async function ipfsAddWithReplay(waczPath, waczContent, swContent, uiContent) {
  const encoder = new TextEncoder();
  
  const fileDef = [
    {path: "ui.js", content: uiContent},
    {path: "sw.js", content: swContent},
    {path: "index.html",
      content: encoder.encode(`
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
     </html>`)
    }
  ];

  const fileData = [];

  for (const entry of fileDef) {
    fileData.push({path: entry.path, content: entry.content});
  }

  fileData.push({path: waczPath, content: waczContent});

  const ipfs = await createInMemoryRepo();

  const resp = await ipfs.addAll(fileData, {
    wrapWithDirectory: true,
  });

  let cid;
  let size = 0;

  for await (const entry of resp) {
    size += entry.size;
    if (entry.path === "") {
      cid = entry.cid;
    }
  }

  //const url = `ipfs://${hash}/${waczPath}`;

  //const ctime = new Date().getTime();

  return {cid, size};
}

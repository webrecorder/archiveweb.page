
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

  const validPins = new Set();

  for (const coll of colls) {
    if (coll.config.metadata.ipfsPins) {
      coll.config.metadata.ipfsPins.forEach((data) => validPins.add(data.hash));  
    }
  }

  return validPins;
}


// ===========================================================================
async function checkPins(ipfsClient, validPins) {
  const invalidPins = [];

  // don't do anything with pinned data on a shared node
  if (ipfsClient.sharedNode) {
    return;
  }

  for await (const {cid, type} of ipfsClient.ipfs.pin.ls({type: "recursive"})) {
    const hash = cid.toString();

    if (!validPins.has(hash)) {
      invalidPins.push({cid, recursive: true});
    }
  }

  if (invalidPins.length) {
    console.log(`Removing ${invalidPins.length} invalid pins...`);
    for await (const unpin of ipfsClient.ipfs.pin.rmAll(invalidPins));
    console.log(`Running GC`);
    await ipfsClient.runGC();
  }

  if (ipfsClient.customPreload) {
    for (const pin of validPins) {
      console.log(`Preloading pin: ${pin}`)
      await ipfsClient.cacheDirToPreload(pin);
    }
  }
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
async function ipfsAddWithReplay(ipfsClient, waczPath, waczContent, swContent, uiContent) {
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


// ===========================================================================
async function detectLocalIPFS(ports, retries) {
  for (let i = 0; i < retries; i++) {
    for (const port of ports) {
      const origin = `http://127.0.0.1:${port}`;

      try {
        const resp = await fetch(origin + "/api/v0/version");
        if (resp.status === 405) {
          return origin;
        }
      } catch (e) {
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Retrying local IPFS...")
  }

  return null;
}

export { ensureDefaultColl, ensureDefaultCollAndIPFS, checkPins, ipfsAddPin, ipfsAddWithReplay, ipfsUnpinAll, detectLocalIPFS };
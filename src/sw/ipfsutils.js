import { initAutoIPFS } from "@webrecorder/wabac/src/ipfs";
import { Downloader } from "./downloader.js";

import * as UnixFS from "@ipld/unixfs";
import { CarWriter } from "@ipld/car";

// eslint-disable-next-line no-undef
const autoipfsOpts = {web3StorageToken: __WEB3_STORAGE_TOKEN__};

export async function setAutoIPFSUrl(url) {
  autoipfsOpts.daemonURL = url;
}

export async function ipfsAdd(coll, downloaderOpts = {}, progress = null) {
  const autoipfs = await initAutoIPFS(autoipfsOpts);

  const filename = "webarchive.wacz";

  const dl = new Downloader({...downloaderOpts, coll, filename, gzip: false});
  const dlResponse = await dl.download(progress);

  if (!coll.config.metadata.ipfsPins) {
    coll.config.metadata.ipfsPins = [];
  }

  const swContent = await fetchBuffer("sw.js");
  const uiContent = await fetchBuffer("ui.js");

  const {car, cid, size} = await ipfsAddWithReplay( 
    dlResponse.filename, dlResponse.body,
    swContent, uiContent
  );

  const resUrls = await autoipfs.uploadCAR(car);
  const url = resUrls[0];

  coll.config.metadata.ipfsPins.push({cid: cid.toString(), size, url});

  console.log("ipfs cid added " + url);

  return url;
}

export async function ipfsRemove(coll) {
  if (coll.config.metadata.ipfsPins) {
    //TODO: need remove support in auto-js-ipfs
    //await ipfsUnpinAll(this, coll.config.metadata.ipfsPins);

    coll.config.metadata.ipfsPins = null;
    return true;
  }

  return false;
}

async function fetchBuffer(filename) {
  const resp = await fetch(new URL(filename, self.location.href).href);

  return new Uint8Array(await resp.arrayBuffer());
}

async function ipfsWriteBuff(writer, name, content, dir) {
  const file = UnixFS.createFileWriter(writer);
  if (content instanceof Uint8Array) {
    file.write(content); 
  } else if (content[Symbol.asyncIterator]) {
    for await (const chunk of content) {
      file.write(chunk);
    }
  }
  const link = await file.close(); 
  dir.set(name, link);
}

// ===========================================================================
export async function ipfsAddWithReplay(waczPath, waczContent, swContent, uiContent) {
  // eslint-disable-next-line no-undef
  const { readable, writable } = new TransformStream(
    {},
    UnixFS.withCapacity(1048576 * 32)
  );

  const writer = UnixFS.createWriter({ writable });

  const rootDir = UnixFS.createDirectoryWriter(writer);

  const encoder = new TextEncoder();

  const htmlContent = `
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
</html>`;

  await ipfsWriteBuff(writer, "ui.js", uiContent, rootDir);
  await ipfsWriteBuff(writer, "sw.js", swContent, rootDir);
  await ipfsWriteBuff(writer, "index.html", encoder.encode(htmlContent), rootDir);
  await ipfsWriteBuff(writer, waczPath, iterate(waczContent), rootDir);

  const {cid, dagByteLength} = await rootDir.close();

  writer.close();

  const car = encodeCar(cid, readable);

  return {cid, car, size: dagByteLength};
}

export const encodeCar = (root, blocks) => {
  const { writer, out } = CarWriter.create([root]);
  pipe(iterate(blocks), {
    write: block =>
      writer.put({
        // @ts-expect-error - https://github.com/ipld/js-car/pull/97
        cid: block.cid,
        bytes: block.bytes,
      }),
    close: () => writer.close(),
  });

  return out;
};

export const iterate = async function* (stream) {
  const reader = stream.getReader();
  while (true) {
    const next = await reader.read();
    if (next.done) {
      return;
    } else {
      yield next.value;
    }
  }
};

const pipe = async (source, writer) => {
  for await (const item of source) {
    writer.write(item);
  }
  return await writer.close();
};

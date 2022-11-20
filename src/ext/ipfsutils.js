import { initAutoIPFS } from "@webrecorder/wabac/src/ipfs";
import { Downloader } from "../downloader";

import * as UnixFS from "@ipld/unixfs";
import * as RawLeaf from "multiformats/codecs/raw";
import { CarWriter } from "@ipld/car";

export async function ipfsPinUnpin(collLoader, collId, isPin, progress = null) {
  const coll = await collLoader.loadColl(collId);
  if (!coll) {
    return {error: "collection_not_found"};
  }

  // eslint-disable-next-line no-undef
  const autoipfs = await initAutoIPFS({web3StorageToken: __WEB3_STORAGE_TOKEN__});

  if (isPin) {
    const filename = "webarchive.wacz";

    const zipSplitMarker = new Uint8Array([]);
    const warcSplitMarker = new Uint8Array([]);

    const dl = new Downloader({coll, filename, gzip: false, zipSplitMarker, warcSplitMarker});
    const dlResponse = await dl.download(progress);

    if (!coll.config.metadata.ipfsPins) {
      coll.config.metadata.ipfsPins = [];
    }

    const swContent = await fetchBuffer("sw.js");
    const uiContent = await fetchBuffer("ui.js");

    const {car, cid, size} = await ipfsAddWithReplay( 
      dlResponse.filename, dlResponse.body,
      swContent, uiContent, zipSplitMarker, warcSplitMarker
    );

    const resUrls = await autoipfs.uploadCAR(car);
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
async function ipfsAddWithReplay(waczPath, waczContent, swContent, uiContent, zipSplitMarker, warcSplitMarker) {
  // eslint-disable-next-line no-undef
  const { readable, writable } = new TransformStream(
    {},
    UnixFS.withCapacity(1048576 * 500)
  );

  const settings = {
    smallFileEncoder: RawLeaf,
    fileChunkEncoder: RawLeaf
  };

  const writer = UnixFS.createWriter({ writable, settings });

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

  let file = UnixFS.createFileWriter(writer);

  let links = [];
  const fileLinks = [];

  let inZipFile = false;
  let lastChunk = null;
  let currName = null;

  const decoder = new TextDecoder();

  const dirs = {};

  function getDirAndName(fullpath) {
    const parts = fullpath.split("/");
    const filename = parts.pop();
    return [parts.join("/"), filename];
  }

  const waczDir = UnixFS.createDirectoryWriter(writer);

  let count = 0;

  for await (const chunk of iterate(waczContent)) {
    if (chunk === zipSplitMarker && !inZipFile) {
      if (lastChunk) {
        currName = decoder.decode(lastChunk);
        console.log("name", currName);
      }
      inZipFile = true;

      if (count) {
        fileLinks.push(await file.close());
        count = 0;
        file = UnixFS.createFileWriter(writer);
      }

    } else if (chunk === zipSplitMarker && inZipFile) {

      if (count) {
        links.push(await file.close());
        count = 0;
        file = UnixFS.createFileWriter(writer);
      }

      let link = await concat(writer, links);
      links = [];

      fileLinks.push(link);

      const [dirName, filename] = getDirAndName(currName);
      currName = null;

      let dir;

      if (!dirName) {
        dir = waczDir;
      } else {
        if (!dirs[dirName]) {
          dirs[dirName] = UnixFS.createDirectoryWriter(writer);
        }
        dir = dirs[dirName];
      }

      dir.set(filename, link);

      inZipFile = false;
    } else if (chunk === warcSplitMarker && inZipFile) {

      if (count) {
        links.push(await file.close());
        count = 0;
        file = UnixFS.createFileWriter(writer);
      }

    } else if (chunk === warcSplitMarker && !inZipFile) {
      throw new Error("Invalid!")
    } else if (chunk.length > 0) {
      if (!inZipFile) {
        lastChunk = chunk;
      }
      file.write(chunk);
      count++;
    }
  }

  fileLinks.push(await file.close());

  for (const [name, dir] of Object.entries(dirs)) {
    waczDir.set(name, await dir.close());
  }

  // for await (const chunk of iterate(waczContent)) {
  //   if (chunk === splitMarker) {
  //     links.push(await file.close());
  //     file = UnixFS.createFileWriter(writer);
  //   } else {
  //     file.write(chunk);
  //   }
  // }

  const rootDir = UnixFS.createDirectoryWriter(writer);

  await ipfsWriteBuff(writer, "ui.js", uiContent, rootDir);
  await ipfsWriteBuff(writer, "sw.js", swContent, rootDir);
  await ipfsWriteBuff(writer, "index.html", encoder.encode(htmlContent), rootDir);

  rootDir.set("webarchive", await waczDir.close());

  rootDir.set(waczPath, await concat(writer, fileLinks));

  const {cid, contentByteLength} = await rootDir.close();

  writer.close();

  const car = encodeCar(cid, readable);

  console.log("cid", cid.toString());

  return {cid, car, size: contentByteLength};
}

async function concat(writer, links) {
  //TODO: is this the right way to do this?
  const {fileEncoder, hasher, linker} = writer.settings;
  const advanced = fileEncoder.createAdvancedFile(links);
  const bytes = fileEncoder.encode(advanced);
  const hash = await hasher.digest(bytes);
  const cid = linker.createLink(fileEncoder.code, hash);
  const block = { bytes, cid };
  writer.writer.write(block);

  const link = {
    cid,
    contentByteLength: fileEncoder.cumulativeContentByteLength(links),
    dagByteLength: fileEncoder.cumulativeDagByteLength(bytes, links),
  };

  return link;
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

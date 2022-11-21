import { initAutoIPFS } from "@webrecorder/wabac/src/ipfs";
import { Downloader } from "../downloader";

import * as UnixFS from "@ipld/unixfs";
import * as RawLeaf from "multiformats/codecs/raw";
import { CarWriter } from "@ipld/car";

import Queue from "p-queue";
import { Signer } from "../keystore";
import { DEFAULT_SOFTWARE_STRING } from "../utils";

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
    const warcGroupMarker = new Uint8Array([]);

    const softwareString = DEFAULT_SOFTWARE_STRING;

    const signer = new Signer(softwareString);

    const gzip = false;

    const dl = new Downloader({
      coll, filename, gzip,
      softwareString, signer,
      zipSplitMarker, warcSplitMarker, warcGroupMarker, 
    });

    const dlResponse = await dl.download(progress);

    if (!coll.config.metadata.ipfsPins) {
      coll.config.metadata.ipfsPins = [];
    }

    const swContent = await fetchBuffer("sw.js");
    const uiContent = await fetchBuffer("ui.js");

    const { readable, writable } = new TransformStream(
      {},
      UnixFS.withCapacity(1048576 * 32)
    );

    ipfsAddWithReplay(writable, 
      dlResponse.filename, dlResponse.body,
      swContent, uiContent,
      zipSplitMarker, warcSplitMarker, warcGroupMarker
    );

    let url, cid;

    // add
    await readable
      .pipeThrough(new ShardingStream())
      .pipeThrough(new ShardStoringStream(autoipfs))
      .pipeTo(
        new WritableStream({
          write: (res) => {
            cid = res.cid;
            url = res.url;
          },
        })
      );

    coll.config.metadata.ipfsPins.push({cid: cid.toString(), url});

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
async function ipfsAddWithReplay(writable, waczPath, waczContent, swContent, uiContent, 
  zipSplitMarker, warcSplitMarker, warcGroupMarker) {
  // eslint-disable-next-line no-undef
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
  let secondaryLinks = [];

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

      let link;

      if (secondaryLinks.length) {
        if (links.length) {
          throw new Error("invalid state, secondaryLinks + links?");
        }
        link = await concat(writer, secondaryLinks);
        secondaryLinks = [];
      } else {
        link = await concat(writer, links);
        links = [];
      }

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
    } else if (chunk === warcSplitMarker || chunk === warcGroupMarker) {

      if (!inZipFile) {
        throw new Error("invalid state");
      }

      if (count) {
        links.push(await file.close());
        count = 0;
        file = UnixFS.createFileWriter(writer);

        if (chunk === warcGroupMarker) {
          secondaryLinks.push(await concat(writer, links));
          links = [];
        }
      }
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

  const {cid} = await rootDir.close();

  writer.close();

  return cid;
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

// Copied from ipld/js-unixfs test suite

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

export async function encodeBlocks(blocks, root) {
  // @ts-expect-error
  const { writer, out } = CarWriter.create(root);
  /** @type {Error?} */
  let error;
  void (async () => {
    try {
      for await (const block of blocks) {
        // @ts-expect-error
        await writer.put(block);
      }
    } catch (/** @type {any} */ err) {
      error = err;
    } finally {
      await writer.close();
    }
  })();
  const chunks = [];
  for await (const chunk of out) chunks.push(chunk);
  // @ts-expect-error
  if (error != null) throw error;
  const roots = root != null ? [root] : [];
  console.log("chunks", chunks.length);
  return Object.assign(new Blob(chunks), { version: 1, roots });
}

// Copied from https://github.com/web3-storage/w3protocol/blob/main/packages/upload-client/src/sharding.js

const SHARD_SIZE = 1024 * 1024 * 10;
const CONCURRENT_UPLOADS = 3;

/**
 * Shard a set of blocks into a set of CAR files. The last block is assumed to
 * be the DAG root and becomes the CAR root CID for the last CAR output.
 *
 * @extends {TransformStream<import('@ipld/unixfs').Block, import('./types').CARFile>}
 */
export class ShardingStream extends TransformStream {
  /**
   * @param {import('./types').ShardingOptions} [options]
   */
  constructor(options = {}) {
    const shardSize = options.shardSize ?? SHARD_SIZE;
    /** @type {import('@ipld/unixfs').Block[]} */
    let shard = [];
    /** @type {import('@ipld/unixfs').Block[] | null} */
    let readyShard = null;
    let size = 0;

    super({
      async transform(block, controller) {
        if (readyShard != null) {
          controller.enqueue(await encodeBlocks(readyShard));
          readyShard = null;
        }
        if (shard.length && size + block.bytes.length > shardSize) {
          readyShard = shard;
          shard = [];
          size = 0;
        }
        shard.push(block);
        size += block.bytes.length;
      },

      async flush(controller) {
        if (readyShard != null) {
          controller.enqueue(await encodeBlocks(readyShard));
        }

        const rootBlock = shard.at(-1);
        if (rootBlock != null) {
          controller.enqueue(await encodeBlocks(shard, rootBlock.cid));
        }
      },
    });
  }
}

/**
 * Upload multiple DAG shards (encoded as CAR files) to the service.
 *
 * Note: an "upload" must be registered in order to link multiple shards
 * together as a complete upload.
 *
 * The writeable side of this transform stream accepts CAR files and the
 * readable side yields `CARMetadata`.
 *
 * @extends {TransformStream<import('./types').CARFile, import('./types').CARMetadata>}
 */
export class ShardStoringStream extends TransformStream {
  constructor(autoipfs) {
    const queue = new Queue({ concurrency: CONCURRENT_UPLOADS });
    const abortController = new AbortController();
    super({
      async transform(car, controller) {
        void queue.add(
          async () => {
            try {
              //const opts = { ...options, signal: abortController.signal };
              //const cid = await add(conf, car, opts)
              console.log(car);
              const resUrls = await autoipfs.uploadCAR(car);
              console.log(resUrls);

              controller.enqueue({cid: car.roots[0], url: resUrls[0]});

              //const { version, roots, size } = car
              //controller.enqueue({ version, roots, cid, size })
            } catch (err) {
              controller.error(err);
              abortController.abort(err);
            }
          },
          { signal: abortController.signal }
        );

        // retain backpressure by not returning until no items queued to be run
        await queue.onSizeLessThan(1);
      },
      async flush() {
        // wait for queue empty AND pending items complete
        await queue.onIdle();
      },
    });
  }
}
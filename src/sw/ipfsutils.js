import { initAutoIPFS } from "@webrecorder/wabac/src/ipfs";
import { Downloader } from "./downloader.js";

import * as UnixFS from "@ipld/unixfs";
import { CarWriter } from "@ipld/car";
import Queue from "p-queue";
import { Web3StorageAPI } from "auto-js-ipfs";

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

  let concur;
  let shardSize;
  let capacity;

  if (autoipfs instanceof Web3StorageAPI) {
    // for now, web3storage only allows a single-shard uploads, so set this high.
    concur = 1;
    shardSize = 1024 * 1024 * 10000;
    capacity = 1048576 * 200;
  } else {
    concur = 3;
    shardSize = 1024 * 1024 * 10;
    // use default capacity
    capacity = undefined;
  }

  const { readable, writable } = new TransformStream(
    {},
    UnixFS.withCapacity()
  );

  const swContent = await fetchBuffer("sw.js");
  const uiContent = await fetchBuffer("ui.js");

  let url, cid;

  const p = readable
    .pipeThrough(new ShardingStream(shardSize))
    .pipeThrough(new ShardStoringStream(autoipfs, concur))
    .pipeTo(
      new WritableStream({
        write: (res) => {
          url = res.url;
          cid = res.cid;
        },
      })
    );

  ipfsAddWithReplay( 
    writable, 
    dlResponse.filename, dlResponse.body,
    swContent, uiContent
  );

  await p;

  coll.config.metadata.ipfsPins.push({cid: cid.toString(), url});

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
export async function ipfsAddWithReplay(writable, waczPath, waczContent, swContent, uiContent) {

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

  const {cid} = await rootDir.close();

  writer.close();

  //const car = encodeCar(cid, readable);

  //return {cid, readable, size: dagByteLength};
  return cid;
}

// export const encodeCar = (root, blocks) => {
//   const { writer, out } = CarWriter.create([root]);
//   pipe(iterate(blocks), {
//     write: block =>
//       writer.put({
//         // @ts-expect-error - https://github.com/ipld/js-car/pull/97
//         cid: block.cid,
//         bytes: block.bytes,
//       }),
//     close: () => writer.close(),
//   });

//   return out;
// };

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

// const pipe = async (source, writer) => {
//   for await (const item of source) {
//     writer.write(item);
//   }
//   return await writer.close();
// };

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
  constructor(shardSize = SHARD_SIZE) {
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
  constructor(autoipfs, concurrency = CONCURRENT_UPLOADS) {
    const queue = new Queue({ concurrency });
    const abortController = new AbortController();
    super({
      async transform(car, controller) {
        void queue.add(
          async () => {
            try {
              //const opts = { ...options, signal: abortController.signal };
              //const cid = await add(conf, car, opts)
              const resUrls = await autoipfs.uploadCAR(car);

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

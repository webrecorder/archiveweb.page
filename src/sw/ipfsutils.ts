import { type CollMetadata, type Collection } from "@webrecorder/wabac/swlib";
import { Downloader, type DownloaderOpts, type Markers } from "./downloader";

// @ts-expect-error no types
import { create as createAutoIPFS } from "auto-js-ipfs";

import * as UnixFS from "@ipld/unixfs";
import { CarWriter } from "@ipld/car/writer";
import Queue from "p-queue";

import { type Link } from "@ipld/unixfs/file/layout/queue";
import { type FileLink } from "@ipld/unixfs/directory";

const autoipfsOpts = {
  web3StorageToken: __WEB3_STORAGE_TOKEN__,
  daemonURL: "",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let autoipfs: any = null;

type ReplayOpts = {
  filename?: string;
  customSplits?: boolean;
  gzip?: boolean;
  replayBaseUrl?: string;
  showEmbed?: boolean;
  pageUrl?: string;
  pageTitle?: string;
  deepLink?: boolean;
  loading?: boolean;
};

type MetadataWithIPFS = CollMetadata & {
  ipfsPins?: { url: string; cid: string }[] | null;
};

export async function setAutoIPFSUrl(url: string) {
  if (autoipfsOpts.daemonURL !== url) {
    autoipfs = null;
  }
  autoipfsOpts.daemonURL = url;
}

export async function ipfsAdd(
  coll: Collection,
  downloaderOpts: DownloaderOpts,
  replayOpts: ReplayOpts = {},
  progress: (incSize: number, totalSize: number) => void,
) {
  if (!autoipfs) {
    autoipfs = await createAutoIPFS(autoipfsOpts);
  }

  const filename = replayOpts.filename || "webarchive.wacz";

  if (replayOpts.customSplits) {
    const ZIP = new Uint8Array([]);
    const WARC_PAYLOAD = new Uint8Array([]);
    const WARC_GROUP = new Uint8Array([]);
    downloaderOpts.markers = { ZIP, WARC_PAYLOAD, WARC_GROUP };
  }

  const gzip = replayOpts.gzip !== undefined ? replayOpts.gzip : true;

  const dl = new Downloader({ ...downloaderOpts, coll, filename, gzip });
  const dlResponse = await dl.download();

  if (!(dlResponse instanceof Response)) {
    throw new Error(dlResponse.error);
  }

  const metadata: MetadataWithIPFS = coll.config.metadata || {};

  if (!metadata.ipfsPins) {
    metadata.ipfsPins = [];
  }

  let concur;
  let shardSize;
  let capacity;

  if (autoipfs.type === "web3.storage") {
    // for now, web3storage only allows a single-shard uploads, so set this high.
    concur = 1;
    shardSize = 1024 * 1024 * 10000;
    capacity = 1048576 * 200;
  } else {
    concur = 3;
    shardSize = 1024 * 1024 * 5;
    // use default capacity
    // capacity = undefined;
    capacity = 1048576 * 200;
  }

  const { readable, writable } = new TransformStream(
    {},
    UnixFS.withCapacity(capacity),
  );

  const baseUrl = replayOpts.replayBaseUrl || self.location.href;

  const swContent = await fetchBuffer("sw.js", baseUrl);
  const uiContent = await fetchBuffer("ui.js", baseUrl);

  let favicon = null;

  try {
    favicon = await fetchBuffer("icon.png", baseUrl);
  } catch (_e) {
    console.warn("Couldn't load favicon");
  }

  const htmlContent = getReplayHtml(dlResponse.filename!, replayOpts);

  let totalSize = 0;

  if (coll.config.metadata?.size) {
    totalSize =
      coll.config.metadata.size +
      swContent.length +
      uiContent.length +
      (favicon ? favicon.length : 0) +
      htmlContent.length;
  }

  progress(0, totalSize);

  let url = "";
  let cid = "";

  let reject: ((reason?: string) => void) | null = null;

  const p2 = new Promise((res, rej) => (reject = rej));

  const p = readable
    .pipeThrough(new ShardingStream(shardSize))
    .pipeThrough(new ShardStoringStream(autoipfs, concur, reject!))
    .pipeTo(
      new WritableStream({
        write: (res: { url: string; cid: string; size: number }) => {
          if (res.url && res.cid) {
            url = res.url;
            cid = res.cid;
          }
          if (res.size) {
            progress(res.size, totalSize);
          }
        },
      }),
    );

  ipfsGenerateCar(
    writable,
    dlResponse.filename || "",
    dlResponse.body!,
    swContent,
    uiContent,
    htmlContent,
    replayOpts,
    downloaderOpts.markers!,
    favicon,
  ).catch((e: unknown) => console.log("generate car failed", e));

  await Promise.race([p, p2]);

  const res = { cid: cid.toString(), url };

  metadata.ipfsPins.push(res);

  console.log("ipfs cid added " + url);

  return res;
}

export async function ipfsRemove(coll: Collection) {
  if (!autoipfs) {
    autoipfs = await createAutoIPFS(autoipfsOpts);
  }

  const metadata: MetadataWithIPFS = coll.config.metadata || {};

  if (metadata.ipfsPins) {
    for (const { url } of metadata.ipfsPins) {
      try {
        await autoipfs.clear(url);
      } catch (_e) {
        console.log("Failed to unpin");
        autoipfsOpts.daemonURL = "";
        return false;
      }
    }

    metadata.ipfsPins = null;
    return true;
  }

  return false;
}

async function fetchBuffer(filename: string, replayBaseUrl: string) {
  const resp = await fetch(new URL(filename, replayBaseUrl).href);

  return new Uint8Array(await resp.arrayBuffer());
}

async function ipfsWriteBuff(
  writer: UnixFS.View<Uint8Array>,
  name: string,
  content: Uint8Array | AsyncIterable<Uint8Array>,
  dir: UnixFS.DirectoryWriterView<Uint8Array>,
) {
  const file = UnixFS.createFileWriter(writer);
  if (content instanceof Uint8Array) {
    await file.write(content);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (content[Symbol.asyncIterator]) {
    for await (const chunk of content) {
      await file.write(chunk);
    }
  }
  const link = await file.close();
  dir.set(name, link);
}

// ===========================================================================
export async function ipfsGenerateCar(
  writable: WritableStream<UnixFS.Block>,
  waczPath: string,
  waczContent: ReadableStream<Uint8Array>,
  swContent: Uint8Array,
  uiContent: Uint8Array,
  htmlContent: string,
  replayOpts: ReplayOpts,
  markers: Markers | null,
  favicon: Uint8Array | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const writer = UnixFS.createWriter<Uint8Array>({ writable });

  const rootDir = UnixFS.createDirectoryWriter<Uint8Array>(writer);

  const encoder = new TextEncoder();

  await ipfsWriteBuff(writer, "ui.js", uiContent, rootDir);

  if (replayOpts.showEmbed) {
    const replayDir = UnixFS.createDirectoryWriter(writer);
    await ipfsWriteBuff(writer, "sw.js", swContent, replayDir);
    rootDir.set("replay", await replayDir.close());
  } else {
    await ipfsWriteBuff(writer, "sw.js", swContent, rootDir);
  }

  if (favicon) {
    await ipfsWriteBuff(writer, "favicon.ico", favicon, rootDir);
  }

  await ipfsWriteBuff(
    writer,
    "index.html",
    encoder.encode(htmlContent),
    rootDir,
  );

  if (!markers) {
    await ipfsWriteBuff(writer, waczPath, iterate(waczContent), rootDir);
  } else {
    await splitByWarcRecordGroup(
      writer,
      waczPath,
      iterate(waczContent),
      rootDir,
      markers,
    );
  }

  const { cid } = await rootDir.close();

  await writer.close();

  return cid;
}

async function splitByWarcRecordGroup(
  writer: UnixFS.View<Uint8Array>,
  waczPath: string,
  warcIter: AsyncGenerator<Uint8Array>,
  rootDir: UnixFS.DirectoryWriterView<Uint8Array>,
  markers: Markers,
) {
  let links: FileLink[] = [];
  const fileLinks: FileLink[] = [];
  let secondaryLinks: FileLink[] = [];

  let inZipFile = false;
  let lastChunk = null;
  let currName = "";

  const decoder = new TextDecoder();

  const dirs: Record<string, UnixFS.DirectoryWriterView<Uint8Array>> = {};

  const { ZIP, WARC_PAYLOAD, WARC_GROUP } = markers;

  let file = UnixFS.createFileWriter(writer);

  function getDirAndName(fullpath: string): [string, string] {
    const parts = fullpath.split("/");
    const filename = parts.pop() || "";
    return [parts.join("/"), filename];
  }

  const waczDir = UnixFS.createDirectoryWriter(writer);

  let count = 0;

  for await (const chunk of warcIter) {
    if (chunk === ZIP && !inZipFile) {
      if (lastChunk) {
        currName = decoder.decode(lastChunk);
      }
      inZipFile = true;

      if (count) {
        fileLinks.push(await file.close());
        count = 0;
        file = UnixFS.createFileWriter(writer);
      }
    } else if (chunk === ZIP && inZipFile) {
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

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      fileLinks.push(link);

      const [dirName, filename] = getDirAndName(currName);
      currName = "";

      let dir;

      if (!dirName) {
        dir = waczDir;
      } else {
        if (!dirs[dirName]) {
          dirs[dirName] = UnixFS.createDirectoryWriter(writer);
        }
        dir = dirs[dirName];
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      dir.set(filename, link);

      inZipFile = false;
    } else if (chunk === WARC_PAYLOAD || chunk === WARC_GROUP) {
      if (!inZipFile) {
        throw new Error("invalid state");
      }

      if (count) {
        links.push(await file.close());
        count = 0;
        file = UnixFS.createFileWriter(writer);

        if (chunk === WARC_GROUP) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          secondaryLinks.push(await concat(writer, links));
          links = [];
        }
      }
    } else if (chunk.length > 0) {
      if (!inZipFile) {
        lastChunk = chunk;
      }
      await file.write(chunk);
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

  // const rootDir = UnixFS.createDirectoryWriter(writer);

  // await ipfsWriteBuff(writer, "ui.js", uiContent, rootDir);
  // await ipfsWriteBuff(writer, "sw.js", swContent, rootDir);
  // await ipfsWriteBuff(writer, "index.html", encoder.encode(htmlContent), rootDir);

  rootDir.set("webarchive", await waczDir.close());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  rootDir.set(waczPath, await concat(writer, fileLinks));
}

async function concat(
  writer: UnixFS.View<Uint8Array>,
  links: Link[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  //TODO: is this the right way to do this?
  const { fileEncoder, hasher, linker } = writer.settings;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const advanced = (fileEncoder as any).createAdvancedFile(links);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const bytes = fileEncoder.encode(advanced);
  const hash = await hasher.digest(bytes);
  const cid = linker.createLink(fileEncoder.code, hash);
  const block = { bytes, cid };
  writer.writer.write(block);

  const link = {
    cid,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contentByteLength: (fileEncoder as any).cumulativeContentByteLength(links),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dagByteLength: (fileEncoder as any).cumulativeDagByteLength(bytes, links),
  };

  return link;
}

export const iterate = async function* (stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    const next = await reader.read();
    if (next.done) {
      return;
    } else {
      yield next.value;
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function encodeBlocks(blocks: UnixFS.Block[], root?: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { writer, out } = CarWriter.create(root);
  /** @type {Error?} */
  let error;
  void (async () => {
    try {
      for await (const block of blocks) {
        // @ts-expect-error
        await writer.put(block);
      }
    } catch (err: unknown) {
      error = err;
    } finally {
      await writer.close();
    }
  })();
  const chunks = [];
  for await (const chunk of out) chunks.push(chunk);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (error != null) throw error;
  const roots = root != null ? [root] : [];
  console.log("chunks", chunks.length);
  return Object.assign(new Blob(chunks), { version: 1, roots });
}

function getReplayHtml(waczPath: string, replayOpts: ReplayOpts = {}) {
  const { showEmbed, pageUrl, pageTitle, deepLink, loading } = replayOpts;

  return `
<!doctype html>
  <html class="no-overflow">
  <head>
    <title>${pageTitle || "ReplayWeb.page"}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="./ui.js"></script>
    <style>
      html, body, replay-web-page, replay-app-main {
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: 0px;
        padding: 0px;
      }
    </style>
  </head>
  <body>${
    showEmbed
      ? `
    <replay-web-page ${deepLink ? 'deepLink="true" ' : ""} ${
      pageUrl ? `url="${pageUrl}"` : ""
    } loading="${
      loading || ""
    }" embed="replay-with-info" src="${waczPath}"></replay-web-page>`
      : `
    <replay-app-main skipRuffle source="${waczPath}"></replay-app-main>`
  }
  </body>
</html>`;
}

// Copied from https://github.com/web3-storage/w3protocol/blob/main/packages/upload-client/src/sharding.js

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
  constructor(shardSize: number) {
    /** @type {import('@ipld/unixfs').Block[]} */
    let shard: UnixFS.Block[] = [];
    /** @type {import('@ipld/unixfs').Block[] | null} */
    let readyShard: UnixFS.Block[] | null = null;
    let readySize = 0;

    let currSize = 0;

    super({
      async transform(block, controller) {
        if (readyShard != null) {
          const blocks = await encodeBlocks(readyShard);
          const size = readySize;
          controller.enqueue({ blocks, size });
          readyShard = null;
        }
        if (shard.length && currSize + block.bytes.length > shardSize) {
          readyShard = shard;
          readySize = currSize;
          shard = [];
          currSize = 0;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        shard.push(block);
        currSize += block.bytes.length;
      },

      async flush(controller) {
        if (readyShard != null) {
          const blocks = await encodeBlocks(readyShard);
          const size = readySize;
          controller.enqueue({ blocks, size });
        }

        const rootBlock = shard.at(-1);
        if (rootBlock != null) {
          const blocks = await encodeBlocks(shard, rootBlock.cid);
          const size = currSize;
          controller.enqueue({ blocks, size });
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
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    autoipfs: any,
    concurrency: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reject: (reason?: any) => void,
  ) {
    const queue = new Queue({ concurrency });
    const abortController = new AbortController();
    super({
      async transform({ blocks, size }, controller) {
        void queue.add(
          async () => {
            try {
              const cid = blocks.roots[0];

              const resUrls = await autoipfs.uploadCAR(blocks);
              const url = resUrls[0];

              controller.enqueue({ cid, url, size });

              //const { version, roots, size } = car
              //controller.enqueue({ version, roots, cid, size })
            } catch (err) {
              controller.error(err);
              abortController.abort(err);
              autoipfsOpts.daemonURL = "";
              reject(err);
            }
          },
          { signal: abortController.signal },
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

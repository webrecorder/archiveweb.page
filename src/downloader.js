import JSZip from 'jszip';

import { PassThrough } from 'stream';

import { Deflate } from 'pako';

import { createMD5 } from 'hash-wasm';

import { WARCRecord, WARCSerializer } from 'warcio';

import { getTSMillis, getStatusText } from '@webrecorder/wabac/src/utils';



// ===========================================================================
const WACZ_VERSION = "1.0.0";

const encoder = new TextEncoder();

const EMPTY = new Uint8Array([]);

async function* getPayload(payload) {
  yield payload;
}

// ===========================================================================
class ResumePassThrough extends PassThrough
{
  constructor(gen, stats, hasher) {
    super();
    this.gen = gen;
    this.stats = stats;
    this.hasher = hasher;
  }

  resume() {
    super.resume();

    if (!this._started) {
      this.start();
      this._started = true;
    }
  }

  async start() {
    this.stats.size = 0;

    this.hasher.init();

    for await (let chunk of this.gen) {
      if (typeof(chunk) === "string") {
        chunk = encoder.encode(chunk);
      }

      this.push(chunk);
      this.stats.size += chunk.byteLength;
      this.hasher.update(chunk);
    }

    this.stats.hash = this.hasher.digest("hex");

    this.push(null);
  }
}


// ===========================================================================
class Downloader
{
  constructor({coll, format = "wacz", filename = null, pageList = null}) {
    this.db = coll.store;
    this.pageList = pageList;
    this.collId = coll.name;
    this.metadata = coll.config.metadata;

    this.format = format;

    this.filename = filename;

    // determine filename from title, if it exists
    if (!this.filename && coll.config.metadata.title) {
      this.filename = encodeURIComponent(coll.config.metadata.title.toLowerCase().replace(/\s/g, "-"));
    }
    
    if (!this.filename) {
      this.filename = "webarchive";
    }

    this.offset = 0;
    this.resources = [];
    this.textResources = [];

    // compressed index
    this.indexLines = [];
    this.linesPerBlock = 2048;

    this.digestsVisted = {};
    this.hasher = null;

    this.fileStats = [];
  }

  download() {
    switch (this.format) {
      case "wacz":
        return this.downloadWACZ(this.filename);

      case "warc":
        return this.downloadWARC(this.filename);

      default:
        return {"error": "invalid 'format': must be wacz or warc"};
    }
  }

  downloadWARC(filename) {
    filename = (filename || "webarchive").split(".")[0] + ".warc";

    const dl = this;

    const rs = new ReadableStream({
      start(controller) {
        dl.queueWARC(controller, filename);  
      }
    });

    const headers = {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "application/octet-stream"
    };

    const resp = new Response(rs, {headers});
    resp.filename = filename;
    return resp;
  }

  async loadResources() {
    if (this.pageList) {
      for await (const resource of this.db.resourcesByPages(this.pageList)) {
        this.resources.push(resource);
      }
    } else {
      this.resources = await this.db.db.getAll("resources");  
    }
  }

  async queueWARC(controller, filename) {
    await this.loadResources();

    const metadata = this.metadata;

    for await (const chunk of this.generateWARC(filename, metadata)) {
      controller.enqueue(chunk);
    }

    for await (const chunk of this.generateTextWARC(filename)) {
      controller.enqueue(chunk);
    }

    controller.close();
  }

  addFile(zip, filename, generator, compressed = false) {
    const stats = {filename, size: 0}

    if (filename !== "datapackage.json") {
      this.fileStats.push(stats);
    }

    const data = new ResumePassThrough(generator, stats, this.hasher);

    zip.file(filename, data, {
      compression: compressed ? 'DEFLATE' : 'STORE',
      binary: !compressed
    });
  }

  async downloadWACZ(filename) {
    const zip = new JSZip();

    filename = (filename || "webarchive").split(".")[0] + ".wacz";

    await this.loadResources();

    this.hasher = await createMD5();

    this.addFile(zip, "pages/pages.jsonl", this.generatePages(), true);
    this.addFile(zip, "archive/data.warc", this.generateWARC(filename + "#/archive/data.warc"), false);
    this.addFile(zip, "archive/text.warc", this.generateTextWARC(filename + "#/archive/text.warc"), false);

    if (this.resources.length <= this.linesPerBlock) {
      this.addFile(zip, "indexes/index.cdx", this.generateCDX(), true);
    } else {
      this.addFile(zip, "indexes/index.cdx.gz", this.generateCompressedCDX("index.cdx.gz"), false);
      this.addFile(zip, "indexes/index.idx", this.generateIDX(), true);
    }
    
    this.addFile(zip, "datapackage.json", this.generateDataPackage());

    const rs = new ReadableStream({
      start(controller) {
        zip.generateInternalStream({type:"uint8array", streamFiles: true})
        .on('data', (data, metadata) => {
          controller.enqueue(data);
          //console.log(metadata);
        })
        .on('error', (error) => {
          console.log(error);
          controller.close();
        })
        .on('end', () => {
          controller.close();
        })
        .resume();
      }
    });

    const headers = {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "application/zip"
    };

    const response = new Response(rs, {headers});
    response.filename = filename;
    return response;
  }

  async* generateWARC(filename, metadata)  {
    try {
      let offset = 0;

      // if filename provided, add warcinfo
      if (filename) {
        const warcinfo = await this.createWARCInfo(filename, metadata);
        yield warcinfo;
        offset += warcinfo.length;
      }

      for (const resource of this.resources) {
        resource.offset = offset;
        const records = await this.createWARCRecord(resource);
        if (!records) {
          resource.skipped = true;
          continue;
        }

        yield records[0];
        offset += records[0].length;
        resource.length = records[0].length;

        if (records.length > 1) {
          yield records[1];
          offset += records[1].length;
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }

  async* generateTextWARC(filename) {
    try {
      let offset = 0;

      // if filename provided, add warcinfo
      if (filename) {
        const warcinfo = await this.createWARCInfo(filename);
        yield warcinfo;
        offset += warcinfo.length;
      }

      for (const resource of this.textResources) {
        resource.offset = offset;
        const chunk = await this.createTextWARCRecord(resource);
        yield chunk;
        offset += chunk.length;
        resource.length = chunk.length;
      }
    } catch (e) {
      console.warn(e);
    }
  }

  async* generateCDX(raw = false) {
    function getCDX(resource, filename, raw) {

      const data = {
        digest: resource.digest,
        mime: resource.mime,
        offset: resource.offset,
        length: resource.length,
        filename,
        status: resource.status
      }

      const cdx = `${resource.url} ${resource.timestamp} ${JSON.stringify(data)}\n`;

      if (!raw) {
        return cdx;
      } else {
        return [resource, cdx];
      }
    }

    try {
      for await (const resource of this.resources) {
        if (resource.skipped) {
          continue;
        }
        yield getCDX(resource, "data.warc", raw);
      }

      for await (const resource of this.textResources) {
        resource.mime = "text/plain";
        resource.status = 200;
        yield getCDX(resource, "text.warc", raw);
      }

    } catch (e) {
      console.warn(e);
    }
  }

  async* generateCompressedCDX(filename) {
    let offset = 0;

    let chunkDeflater = null;
    let count = 0;
    let key = null;

    const dl = this;

    function finishChunk() {   
      const data = chunkDeflater.result;
      const length = data.length;
  
      const idx = key + " " + JSON.stringify({offset, length, filename});

      dl.indexLines.push(idx);
  
      offset += length;
  
      chunkDeflater = null;
      count = 0;
      key = null;
  
      return data;
    }

    for await (const [resource, cdx] of this.generateCDX(true)) {
      if (!chunkDeflater) {
        chunkDeflater = new Deflate({gzip: true});
      }

      if (!key) {
        key = resource.url + " " + resource.timestamp;
      }

      if (++count === this.linesPerBlock) {
        chunkDeflater.push(cdx, true);
        yield finishChunk();
      } else {
        chunkDeflater.push(cdx);
      }
    }

    if (chunkDeflater) {
      chunkDeflater.push(EMPTY, true);
      yield finishChunk();
    }
  }

  async* generateDataPackage() {
    const root = {};

    root.profile = "data-package";

    root.resources = this.fileStats.map((stats) => {
      return {
        path: stats.filename,
        stats: {
          hash: stats.hash,
          bytes: stats.size,
        },
        hashing: "md5"
      }
    });

    root.wacz_version = WACZ_VERSION;

    root.metadata = this.metadata;

    root.config = {useSurt: false, decodeResponses: false};

    yield JSON.stringify(root, null, 2);
  }

  async* generatePages() {
    const pageIter = this.pageList ? await this.db.getPages(this.pageList) : await this.db.getAllPages();

    yield JSON.stringify({"format": "json-pages-1.0", "id": "pages", "title": "All Pages", "hasText": true});

    for (const page of pageIter) {
      const ts = new Date(page.ts).toISOString();

      const pageData = {
        title: page.title,
        url: page.url,
        id: page.id,
        size: page.size,
        ts};

      if (page.favIconUrl) {
        pageData.favIconUrl = page.favIconUrl;
      }
      if (page.text) {
        pageData.text = page.text;
      }

      yield "\n" + JSON.stringify(pageData);

      if (page.text) {
        this.textResources.push({url: page.url, ts: page.ts, text: page.text});
      }
    }
  }

  async getLists() {
    try {
      const lists = await this.db.getAllCuratedByList();
      console.log(lists);
      return yaml.safeDump(lists, {skipInvalid: true});
    } catch (e) {
      console.log(e);
    }
  }

  async* generateIDX() {
    yield this.indexLines.join("\n");
  }

  async createWARCInfo(filename, metadata) {
    const warcVersion = "WARC/1.1";
    const type = "warcinfo";

    const info = {
      "software": "Webrecorder wabac.js/warcio.js",
      "format": "WARC File Format 1.1",
      "isPartOf": this.metadata.title || this.collId,
    };

    if (metadata) {
      info["json-metadata"] = JSON.stringify(metadata);
    }

    const record = await WARCRecord.createWARCInfo({filename, type, warcVersion}, info);
    const buffer = await WARCSerializer.serialize(record, {gzip: true});
    return buffer;
  }

  async createWARCRecord(resource) {
    const url = resource.url;
    const date = new Date(resource.ts).toISOString();
    resource.timestamp = getTSMillis(date);
    const httpHeaders = resource.respHeaders;
    const warcVersion = "WARC/1.1";

    const pageId = resource.pageId;

    const warcHeaders = {"WARC-Page-ID": pageId};

    if (resource.extraOpts && Object.keys(resource.extraOpts).length) {
      warcHeaders["WARC-JSON-Metadata"] = JSON.stringify(resource.extraOpts);
    }

    if (resource.digest) {
      warcHeaders["WARC-Payload-Digest"] = resource.digest;
    }

    let payload = resource.payload;
    let type = null;

    let refersToUrl, refersToDate;

    const digestOriginal = this.digestsVisted[resource.digest];

    if (resource.digest && digestOriginal) {

      // if exact resource in a row, and same page, then just skip instead of writing revisit
      if (url === this.lastUrl && pageId === this.lastPageId) {
        //console.log("Skip Dupe: " + url);
        return null;
      }

      type = "revisit";
      resource.mime = "warc/revisit";
      payload = EMPTY;

      refersToUrl = digestOriginal.url;
      refersToDate = digestOriginal.date;

    } else if (resource.origURL && resource.origTS) {
      if (!resource.digest) {
        //console.log("Skip fuzzy resource with no digest");
        return null;
      }

      type = "revisit";
      resource.mime = "warc/revisit";
      payload = EMPTY;

      refersToUrl = resource.origURL;
      refersToDate = resource.origTS;

    } else {
      type = "response";
      if (!payload) {
        payload = await this.db.loadPayload(resource);
      }

      if (!payload) {
        //console.log("Skipping No Payload For: " + url, resource);
        return null;
      }

      this.digestsVisted[resource.digest] = {url, date};
    }

    const status = resource.status || 200;
    const statusText = resource.statusText || getStatusText(status);

    const statusline = `HTTP/1.1 ${status} ${statusText}`;

    const record = await WARCRecord.create({
      url, date, type, warcVersion, warcHeaders, statusline, httpHeaders,
      refersToUrl, refersToDate}, getPayload(payload));

    const buffer = await WARCSerializer.serialize(record, {gzip: true});
    if (!resource.digest) {
      resource.digest = record.warcPayloadDigest;
    }

    this.lastPageId = pageId;
    this.lastUrl = url;

    const records = [buffer];

    if (resource.reqHeaders) {
      const reqWarcHeaders = {
        "WARC-Page-ID": pageId,
        "WARC-Concurrent-To": record.warcHeader("WARC-Record-ID")
      };

      const method = resource.method || "GET";
      const urlParsed = new URL(url);
      const statusline = method + " " + url.slice(urlParsed.origin.length);

      const reqRecord = await WARCRecord.create({
        url, date, warcVersion,
        type: "request",
        warcHeaders: reqWarcHeaders,
        httpHeaders: resource.reqHeaders,
        statusline,
      }, getPayload(new Uint8Array([])));

      records.push(await WARCSerializer.serialize(reqRecord, {gzip: true}));
    }

    return records;
  }

  async createTextWARCRecord(resource) {
    const date = new Date(resource.ts).toISOString();
    const timestamp = getTSMillis(date);
    resource.timestamp = timestamp;
    const url = `urn:text:${timestamp}/${resource.url}`;
    resource.url = url;

    const type = "resource";
    const warcHeaders = {"Content-Type": 'text/plain; charset="UTF-8"'};
    const warcVersion = "WARC/1.1";

    const payload = getPayload(encoder.encode(resource.text));

    const record = await WARCRecord.create({url, date, warcHeaders, warcVersion, type}, payload);

    const buffer = await WARCSerializer.serialize(record, {gzip: true});
    if (!resource.digest) {
      resource.digest = record.warcPayloadDigest;
    }
    return buffer;
  }
}

export { Downloader };


import JSZip from 'jszip';

import { PassThrough } from 'stream';

import { Deflate } from 'pako';

import { v5 as uuidv5 } from 'uuid';

import { createSHA256 } from 'hash-wasm';

import { WARCRecord, WARCSerializer } from 'warcio';

import { getTSMillis, getStatusText } from '@webrecorder/wabac/src/utils';


// ===========================================================================
const WACZ_VERSION = "1.1.0";

const encoder = new TextEncoder();

const EMPTY = new Uint8Array([]);

const SPLIT_REQUEST_Q_RX = /(.*?)[?&](?:__wb_method=|__wb_post=)[^&]+&(.*)/;

const LINES_PER_BLOCK = 1024;

const UUID_NAMESPACE = "f9ec3936-7f66-4461-bec4-34f4495ea242";

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
  constructor({coll, format = "wacz", filename = null, pageList = null, signer = null}) {
    this.db = coll.store;
    this.pageList = pageList;
    this.collId = coll.name;
    this.metadata = coll.config.metadata;

    this.createdDate = new Date(coll.config.ctime).toISOString();
    this.modifiedDate = coll.config.metadata.mtime ? new Date(coll.config.metadata.mtime).toISOString() : null;

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

    // compressed index (idx) entries
    this.indexLines = [];

    this.digestsVisted = {};
    this.fileHasher = null;
    this.recordHasher = null;

    this.datapackageDigest = null;
    this.signer = signer;

    this.fileStats = [];
  }

  download(sizeCallback = null) {
    switch (this.format) {
      case "wacz":
        return this.downloadWACZ(this.filename, sizeCallback);

      case "warc":
        return this.downloadWARC(this.filename, sizeCallback);

      default:
        return {"error": "invalid 'format': must be wacz or warc"};
    }
  }

  downloadWARC(filename, sizeCallback = null) {
    filename = (filename || "webarchive").split(".")[0] + ".warc";

    const dl = this;

    const rs = new ReadableStream({
      start(controller) {
        dl.queueWARC(controller, filename, sizeCallback);
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

  async queueWARC(controller, filename, sizeCallback) {
    await this.loadResources();

    for await (const chunk of this.generateWARC(filename)) {
      controller.enqueue(chunk);
      if (sizeCallback) {
        sizeCallback(chunk.length);
      }
    }

    for await (const chunk of this.generateTextWARC(filename)) {
      controller.enqueue(chunk);
      if (sizeCallback) {
        sizeCallback(chunk.length);
      }
    }

    controller.close();
  }

  addFile(zip, filename, generator, compressed = false) {
    const stats = {filename, size: 0}

    if (filename !== "datapackage.json") {
      this.fileStats.push(stats);
    }

    const data = new ResumePassThrough(generator, stats, this.fileHasher);

    zip.file(filename, data, {
      compression: compressed ? 'DEFLATE' : 'STORE',
      binary: !compressed
    });
  }

  recordDigest(data) {
    this.recordHasher.init();
    this.recordHasher.update(data);
    return this.hashType + ":" + this.recordHasher.digest("hex");
  }

  getWARCRecordUUID(name) {
    return `<urn:uuid:${uuidv5(name, UUID_NAMESPACE)}>`;
  }

  async downloadWACZ(filename, sizeCallback) {
    const zip = new JSZip();

    filename = (filename || "webarchive").split(".")[0] + ".wacz";

    await this.loadResources();

    this.fileHasher = await createSHA256();
    this.recordHasher = await createSHA256();
    this.hashType = "sha256";

    this.addFile(zip, "pages/pages.jsonl", this.generatePages(), true);
    this.addFile(zip, "archive/data.warc", this.generateWARC(filename + "#/archive/data.warc", true), false);
    //this.addFile(zip, "archive/text.warc", this.generateTextWARC(filename + "#/archive/text.warc"), false);

    // don't use compressed index if we'll have a single block, need to have at least enough for 2 blocks
    if (this.resources.length < (2 * LINES_PER_BLOCK)) {
      this.addFile(zip, "indexes/index.cdx", this.generateCDX(), true);
    } else {
      this.addFile(zip, "indexes/index.cdx.gz", this.generateCompressedCDX("index.cdx.gz"), false);
      this.addFile(zip, "indexes/index.idx", this.generateIDX(), true);
    }
    
    this.addFile(zip, "datapackage.json", this.generateDataPackage());

    this.addFile(zip, "datapackage-digest.json", this.generateDataManifest());

    const rs = new ReadableStream({
      start(controller) {
        zip.generateInternalStream({type:"uint8array", streamFiles: true})
        .on('data', (data, metadata) => {
          controller.enqueue(data);
          if (sizeCallback) {
            sizeCallback(data.length);
          }
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

  async* generateWARC(filename, digestRecord = false)  {
    try {
      let offset = 0;

      // if filename provided, add warcinfo
      if (filename) {
        const warcinfo = await this.createWARCInfo(filename);
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

        // response record
        yield records[0];
        offset += records[0].length;
        resource.length = records[0].length;
        if (digestRecord) {
          resource.recordDigest = this.recordDigest(records[0]);
        }

        // request record, if any
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
    const getCDX = (resource, filename, raw) => {

      const data = {
        //url: resource.url,
        digest: resource.digest,
        mime: resource.mime,
        offset: resource.offset,
        length: resource.length,
        recordDigest: resource.recordDigest,
        status: resource.status
      }

      if (filename) {
        data.filename = filename;
      }

      if (resource.method && resource.method !== "GET") {
        const m = resource.url.match(SPLIT_REQUEST_Q_RX);
        if (m) {
          data.url = m[1];
          data.requestBody = m[2];
        }
        data.method = resource.method;
      }

      //const surt = getSurt(resource.url);
      const url = resource.url;

      const cdx = `${url} ${resource.timestamp} ${JSON.stringify(data)}\n`;

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

      // for await (const resource of this.textResources) {
      //   resource.mime = "text/plain";
      //   resource.status = 200;
      //   yield getCDX(resource, "text.warc", raw);
      // }

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

    const finishChunk = () => {
      const data = chunkDeflater.result;
      const length = data.length;
      const digest = dl.recordDigest(data);
  
      const idx = key + " " + JSON.stringify({offset, length, digest, filename});

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
        key = cdx.split(" {", 1)[0];
      }

      if (++count === LINES_PER_BLOCK) {
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

  async* generateDataManifest() {
    const digest = this.datapackageDigest;

    const path = "datapackage.json";

    const data = {path, digest};

    if (this.signer) {
      try {
        const {signature, publicKey} = await this.signer.sign(digest);
        data.signature = signature;
        data.publicKey = publicKey;

        this.signer.close();
        this.signer = null;
      } catch(e) {
        // failed to sign
        console.log(e);
      }
    }

    const res = JSON.stringify(data, null, 2);

    yield res;
  }


  async* generateDataPackage() {
    const root = {};

    root.profile = "data-package";

    root.resources = this.fileStats.map((stats) => {
      return {
        path: stats.filename,
        hash: this.hashType + ":" + stats.hash,
        bytes: stats.size,
      }
    });

    root.wacz_version = WACZ_VERSION;

    if (this.metadata.title) {
      root.title = this.metadata.title;
    }
    if (this.metadata.desc) {
      root.description = this.metadata.desc;
    }

    root.software = this.softwareString;
    root.created = this.createdDate;
    if (this.modifiedDate) {
      root.modified = this.modifiedDate;
    }
    //root.config = {decodeResponses: false};

    const datapackageText = JSON.stringify(root, null, 2);
    this.datapackageDigest = this.recordDigest(datapackageText);
    yield datapackageText;
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

  get softwareString() {
    return `Webrecorder ArchiveWeb.page ${__VERSION__} (via warcio.js ${__WARCIO_VERSION__})`;
  }

  async createWARCInfo(filename) {
    const warcVersion = "WARC/1.1";
    const type = "warcinfo";

    const info = {
      "software": this.softwareString,
      "format": "WARC File Format 1.1",
      "isPartOf": this.metadata.title || this.collId,
    };

    //info["json-metadata"] = JSON.stringify(metadata);

    const warcHeaders = {
      "WARC-Record-ID": this.getWARCRecordUUID(JSON.stringify(info))
    };

    const date = this.createdDate;

    const record = await WARCRecord.createWARCInfo({filename, type, date, warcHeaders, warcVersion}, info);
    const buffer = await WARCSerializer.serialize(record, {gzip: true});
    return buffer;
  }

  removeEncodingHeaders(headersMap) {
    let count = 0;
    for (const [name, value] of Object.entries(headersMap)) {
      const lowerName = name.toLowerCase();
      if (lowerName === "content-encoding") {
        delete headersMap[name];
        if (++count === 2) {
          break;
        }
      }
      if (lowerName === "transfer-encoding") {
        delete headersMap[name];
        if (++count === 2) {
          break;
        }
      }
    }
  }

  async createWARCRecord(resource) {
    const url = resource.url;
    const date = new Date(resource.ts).toISOString();
    resource.timestamp = getTSMillis(date);
    const httpHeaders = resource.respHeaders;
    const warcVersion = "WARC/1.1";

    // remove aas never preserved in browser-based capture
    this.removeEncodingHeaders(httpHeaders);

    const pageId = resource.pageId;

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

    const warcHeaders = {
      "WARC-Record-ID": this.getWARCRecordUUID(type + ":" + resource.timestamp + "/" + resource.url),
      "WARC-Page-ID": pageId,
    };

    if (resource.extraOpts && Object.keys(resource.extraOpts).length) {
      warcHeaders["WARC-JSON-Metadata"] = JSON.stringify(resource.extraOpts);
    }

    if (resource.digest) {
      warcHeaders["WARC-Payload-Digest"] = resource.digest;
    }

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
      const type = "request";
      const reqWarcHeaders = {
        "WARC-Record-ID": this.getWARCRecordUUID(type + ":" + resource.timestamp + "/" + resource.url),
        "WARC-Page-ID": pageId,
        "WARC-Concurrent-To": record.warcHeader("WARC-Record-ID"),
      };

      const method = resource.method || "GET";
      const urlParsed = new URL(url);
      const statusline = method + " " + url.slice(urlParsed.origin.length);

      const reqRecord = await WARCRecord.create({
        url, date, warcVersion, type,
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


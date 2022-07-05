import { downloadZip } from "client-zip";

import { Deflate } from "pako";

import { v5 as uuidv5 } from "uuid";

import { createSHA256 } from "hash-wasm";

import { getSurt, WARCRecord, WARCSerializer } from "warcio";

import { getTSMillis, getStatusText } from "@webrecorder/wabac/src/utils";


// ===========================================================================
const WACZ_VERSION = "1.1.1";

const SPLIT_REQUEST_Q_RX = /(.*?)[?&](?:__wb_method=|__wb_post=)[^&]+&(.*)/;

const LINES_PER_BLOCK = 1024;
const RESOURCE_BATCH_SIZE = LINES_PER_BLOCK * 8;

const DEFAULT_UUID_NAMESPACE = "f9ec3936-7f66-4461-bec4-34f4495ea242";

const DATAPACKAGE_FILENAME = "datapackage.json";
const DIGEST_FILENAME = "datapackage-digest.json";

const encoder = new TextEncoder();

const EMPTY = new Uint8Array([]);

async function* getPayload(payload) {
  yield payload;
}

async function* hashingGen(gen, stats, hasher, sizeCallback) {
  stats.size = 0;

  hasher.init();

  for await (let chunk of gen) {
    if (typeof(chunk) === "string") {
      chunk = encoder.encode(chunk);
    }

    yield chunk;
    stats.size += chunk.byteLength;
    if (sizeCallback) {
      sizeCallback(chunk.byteLength);
    }
    hasher.update(chunk);
  }

  stats.hash = hasher.digest("hex");
}

// ===========================================================================
class Downloader
{
  constructor({coll, format = "wacz", filename = null, pageList = null, signer = null,
    softwareString = null, uuidNamespace}) {

    this.db = coll.store;
    this.pageList = pageList;
    this.collId = coll.name;
    this.metadata = coll.config.metadata;

    this.softwareString = softwareString || "ArchiveWeb.page";

    this.uuidNamespace = uuidNamespace || DEFAULT_UUID_NAMESPACE;

    this.createdDate = new Date(coll.config.ctime).toISOString();
    this.modifiedDate = coll.config.metadata.mtime ? new Date(coll.config.metadata.mtime).toISOString() : null;

    this.format = format;
    this.warcVersion = (format === "warc1.0") ? "WARC/1.0" : "WARC/1.1";

    if (format === "warc1.0") {
      this.digestOpts = {algo: "sha-1", prefix: "sha1:", base32: true};
    } else {
      this.digestOpts = {algo: "sha-256", prefix: "sha256:"};
    }

    this.filename = filename;

    // determine filename from title, if it exists
    if (!this.filename && coll.config.metadata.title) {
      this.filename = encodeURIComponent(coll.config.metadata.title.toLowerCase().replace(/\s/g, "-"));
    }
    
    if (!this.filename) {
      this.filename = "webarchive";
    }

    this.offset = 0;
    this.firstResources = [];
    this.textResources = [];
    this.cdxjLines = [];

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
    case "warc1.0":
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

  async loadResourcesBlock(start = []) {
    return await this.db.db.getAll("resources", IDBKeyRange.lowerBound(start, true), RESOURCE_BATCH_SIZE);
  }

  async* iterResources(resources) {
    let start = [];
    let count = 0;

    while (resources.length) {
      const last = resources[resources.length - 1];

      if (this.pageList) {
        resources = resources.filter((res) => this.pageList.includes(res.pageId));
      }
      count += resources.length;
      yield* resources;

      start = [last.url, last.ts];
      resources = await this.loadResourcesBlock(start);
    }
    if (count !== this.numResources) {
      console.warn(`Iterated ${count}, but expected ${this.numResources}`);
    }
  }

  async queueWARC(controller, filename, sizeCallback) {
    this.firstResources = await this.loadResourcesBlock();

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

  addFile(zip, filename, generator, sizeCallback/*, compressed = false*/) {
    const stats = {filename, size: 0};

    if (filename !== DATAPACKAGE_FILENAME && filename !== DIGEST_FILENAME) {
      this.fileStats.push(stats);
    }

    zip.push({
      name: filename,
      lastModified: new Date(),
      input: hashingGen(generator, stats, this.fileHasher, sizeCallback)
    });
  }

  recordDigest(data) {
    this.recordHasher.init();
    this.recordHasher.update(data);
    return this.hashType + ":" + this.recordHasher.digest("hex");
  }

  getWARCRecordUUID(name) {
    return `<urn:uuid:${uuidv5(name, this.uuidNamespace)}>`;
  }

  async downloadWACZ(filename, sizeCallback) {
    filename = (filename || "webarchive").split(".")[0] + ".wacz";

    this.fileHasher = await createSHA256();
    this.recordHasher = await createSHA256();
    this.hashType = "sha256";

    const zip = [];

    this.firstResources = await this.loadResourcesBlock();

    this.addFile(zip, "pages/pages.jsonl", this.generatePages(), sizeCallback, true);
    this.addFile(zip, "archive/data.warc.gz", this.generateWARC(filename + "#/archive/data.warc.gz", true), sizeCallback, false);
    //this.addFile(zip, "archive/text.warc", this.generateTextWARC(filename + "#/archive/text.warc"), false);

    // don't use compressed index if we'll have a single block, need to have at least enough for 2 blocks
    if (this.firstResources.length < (2 * LINES_PER_BLOCK)) {
      this.addFile(zip, "indexes/index.cdx", this.generateCDX(), sizeCallback, true);
    } else {
      this.addFile(zip, "indexes/index.cdx.gz", this.generateCompressedCDX("index.cdx.gz"), sizeCallback, false);
      this.addFile(zip, "indexes/index.idx", this.generateIDX(), sizeCallback, true);
    }
    
    this.addFile(zip, DATAPACKAGE_FILENAME, this.generateDataPackage(), sizeCallback);

    this.addFile(zip, DIGEST_FILENAME, this.generateDataManifest(), sizeCallback);

    const headers = {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "application/zip"
    };

    let response = downloadZip(zip);
    response = new Response(response.body, {headers});
    response.filename = filename;
    return response;
  }

  async* generateWARC(filename, digestRecordAndCDX = false)  {
    try {
      let offset = 0;

      // if filename provided, add warcinfo
      if (filename) {
        const warcinfo = await this.createWARCInfo(filename);
        yield warcinfo;
        offset += warcinfo.length;
      }

      for await (const resource of this.iterResources(this.firstResources)) {
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
        if (digestRecordAndCDX) {
          resource.recordDigest = this.recordDigest(records[0]);
        }

        // request record, if any
        if (records.length > 1) {
          yield records[1];
          offset += records[1].length;
        }

        if (digestRecordAndCDX) {
          this.cdxjLines.push(this.getCDXJ(resource, "data.warc.gz"));
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

  getCDXJ(resource, filename) {
    const data = {
      url: resource.url,
      digest: resource.digest,
      mime: resource.mime,
      offset: resource.offset,
      length: resource.length,
      recordDigest: resource.recordDigest,
      status: resource.status
    };

    if (filename) {
      data.filename = filename;
    }

    if (resource.method && resource.method !== "GET") {
      const m = resource.url.match(SPLIT_REQUEST_Q_RX);
      if (m) {
        data.url = m[1];
        // resource.requestBody is the raw payload, use the converted one from the url for the cdx
        data.requestBody = m[2];
      }
      data.method = resource.method;
    }

    return `${getSurt(resource.url)} ${resource.timestamp} ${JSON.stringify(data)}\n`;
  }

  *generateCDX() {
    this.cdxjLines.sort();

    yield* this.cdxjLines;
  }

  *generateCompressedCDX(filename) {
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
    };

    for (const cdx of this.generateCDX()) {
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
    const hash = this.datapackageDigest;

    const path = DATAPACKAGE_FILENAME;

    const data = {path, hash};

    if (this.signer) {
      try {
        data.signedData = await this.signer.sign(hash, this.createdDate);

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
      const path = stats.filename;
      return {
        name: path.slice(path.lastIndexOf("/") + 1),
        path,
        hash: this.hashType + ":" + stats.hash,
        bytes: stats.size,
      };
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

  /*
  async getLists() {
    try {
      const lists = await this.db.getAllCuratedByList();
      console.log(lists);
      return yaml.safeDump(lists, {skipInvalid: true});
    } catch (e) {
      console.log(e);
    }
  }
*/
  async* generateIDX() {
    yield this.indexLines.join("\n");
  }

  async createWARCInfo(filename) {
    const warcVersion = this.warcVersion;
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
    const buffer = await WARCSerializer.serialize(record, {gzip: true, digest: this.digestOpts});
    return buffer;
  }

  fixupHttpHeaders(headersMap, length) {
    let count = 0;
    for (const [name] of Object.entries(headersMap)) {
      const lowerName = name.toLowerCase();
      switch (lowerName) {
      case "content-encoding":
      case "transfer-encoding":
        delete headersMap[name];
        ++count;
        break;

      case "content-length":
        headersMap[name] = "" + length;
        ++count;
        break;
      }
      if (count === 3) {
        break;
      }
    }
  }

  async createWARCRecord(resource) {
    let url = resource.url;
    const date = new Date(resource.ts).toISOString();
    resource.timestamp = getTSMillis(date);
    const httpHeaders = resource.respHeaders || {};
    const warcVersion = this.warcVersion;

    const pageId = resource.pageId;

    let payload = resource.payload;
    let type = null;

    let refersToUrl, refersToDate;
    let refersToDigest;
    let storeDigest = null;

    let method = "GET";
    let requestBody;

    // non-GET request/response:
    // if original request body + original requestURL is preserved, write that with original method
    // otherwise, just serialize the converted-to-GET form
    if (resource.method && resource.method !== "GET" && resource.requestBody && resource.requestUrl) {
      // ensure payload is an arraybuffer
      requestBody = typeof(resource.requestBody) === "string" ? encoder.encode(resource.requestBody) : resource.requestBody;
      method = resource.method;
      url = resource.requestUrl;
    } else {
      requestBody = new Uint8Array([]);
    }

    const digestOriginal = this.digestsVisted[resource.digest];

    if (resource.digest && digestOriginal) {
      // if exact resource in a row, and same page, then just skip instead of writing revisit
      if (url === this.lastUrl && pageId === this.lastPageId && method === "GET") {
        //console.log("Skip Dupe: " + url);
        return null;
      }

      type = "revisit";
      resource.mime = "warc/revisit";
      payload = EMPTY;

      refersToUrl = digestOriginal.url;
      refersToDate = digestOriginal.date;
      refersToDigest = digestOriginal.payloadDigest || resource.digest;

    } else if (resource.origURL && resource.origTS) {
      if (!resource.digest || !digestOriginal) {
        //console.log("Skip fuzzy resource with no digest");
        return null;
      }

      type = "revisit";
      resource.mime = "warc/revisit";
      payload = EMPTY;

      refersToUrl = resource.origURL;
      refersToDate = new Date(resource.origTS).toISOString();
      refersToDigest = digestOriginal.payloadDigest || resource.digest;

    } else {
      type = "response";
      if (!payload) {
        payload = await this.db.loadPayload(resource);
      }

      if (!payload) {
        //console.log("Skipping No Payload For: " + url, resource);
        return null;
      }

      if (method === "GET") {
        storeDigest = {url, date};
        this.digestsVisted[resource.digest] = storeDigest;
      }
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

    if (refersToDigest) {
      warcHeaders["WARC-Payload-Digest"] = refersToDigest;
    }

    // remove encoding, set content-length as encoding never preserved in browser-based capture
    this.fixupHttpHeaders(httpHeaders, payload.length);

    const record = await WARCRecord.create({
      url, date, type, warcVersion, warcHeaders, statusline, httpHeaders,
      refersToUrl, refersToDate}, getPayload(payload));

    const buffer = await WARCSerializer.serialize(record, {gzip: true, digest: this.digestOpts});
    if (!resource.digest) {
      resource.digest = record.warcPayloadDigest;
    }
    if (storeDigest) {
      storeDigest.payloadDigest = record.warcPayloadDigest;
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

      const urlParsed = new URL(url);
      const statusline = `${method} ${url.slice(urlParsed.origin.length)} HTTP/1.1`;

      const reqRecord = await WARCRecord.create({
        url, date, warcVersion, type,
        warcHeaders: reqWarcHeaders,
        httpHeaders: resource.reqHeaders,
        statusline,
      }, getPayload(requestBody));

      records.push(await WARCSerializer.serialize(reqRecord, {gzip: true, digest: this.digestOpts}));
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
    const warcHeaders = {"Content-Type": "text/plain; charset=\"UTF-8\""};
    const warcVersion = this.warcVersion;

    const payload = getPayload(encoder.encode(resource.text));

    const record = await WARCRecord.create({url, date, warcHeaders, warcVersion, type}, payload);

    const buffer = await WARCSerializer.serialize(record, {gzip: true, digest: this.digestOpts});
    if (!resource.digest) {
      resource.digest = record.warcPayloadDigest;
    }
    return buffer;
  }
}

export { Downloader };


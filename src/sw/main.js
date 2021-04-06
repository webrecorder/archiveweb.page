import { SWCollections, SWReplay } from "@webrecorder/wabac/src/swmain";
import { PAGE_STATE_NEED_REMOTE_SYNC, PAGE_STATE_SYNCED } from "@webrecorder/wabac/src/utils";
import { Downloader } from "../downloader";

import { MultiWACZCollection } from "@webrecorder/wabac/src/multiwacz";

import { ExtAPI } from "./api";
import { Credentials, getUID } from "./cred";
import { S3Sync } from "./s3";

import {  AsyncIterReader } from "warcio";

const defaultConfig = {
  injectScripts: ["/replay/static/js_//ruffle/ruffle.js"],
  baseUrlSourcePrefix: "/replay/index.html"
};


// ===============================================================================
class ShareableCollections extends SWCollections
{
  constructor(...args) {
    super(...args);
    this.credManager = new Credentials();
  }

  async _loadCustomStore(type, config) {
    if (type.startsWith("sync:")) {
      const s3 = await this.loadS3(config.extraConfig.sync);
      return new S3StoreMultiWACZCollection(config, s3, await getUID());
    }
  }

  async loadS3(sync) {
    const credData = await this.credManager.get(sync.cred);
    const s3 = new S3Sync(credData, sync.collId);
    return s3;
  }

  async initNewColl(metadata, extraConfig, type = "archive") {
    if (extraConfig && extraConfig.sync) {
      //const s3 = await this.loadS3(extraConfig.sync);
      //await s3.createNewColl(await getUID());
      type = "sync:" + extraConfig.sync.cred;
    }

    return super.initNewColl(metadata, extraConfig, type);
  }

  async deleteColl(name, keepFileHandle = false) {
    if (this.collections[name] && 
      this.collections[name].store && 
      this.collections[name].store instanceof S3StoreMultiWACZCollection) {
        this.collections[name].store.stopSync();
    }

    return await super.deleteColl(name, keepFileHandle);
  }

  // startSync(collection, name, syncdata) {
  //   this.syncs[name] = setInterval(() => this._doSync(collection, name, syncdata), 30000);
  // }
}

const contribsDir = "contributors/";
const dataDir = "data/";
const manifestFilename = "datapackage.json";


// ===============================================================================
class S3StoreMultiWACZCollection extends MultiWACZCollection
{
  constructor(config, s3, uid) {
    super(config);
    this.s3 = s3;
    this.uid = uid;

    this.collId = this.config.extraConfig.sync.collId;
    //this.storage = this.config.extraConfig.sync.cred;

    try {
      this.fullPath = new URL(this.collId, this.s3.fullPath).href;
    } catch (e) {
      this.fullPath = this.collId;
    }
    
    this.mylogFilename = `${contribsDir}${uid}.jsonl`;

    this._syncId = 0;

    this.userlogs = {};

    this.startSync(60000);
  }

  _initDB(db, oldV, newV, tx) {
    super._initDB(db, oldV, newV, tx);

    if (!oldV) {
      const opslog = db.createObjectStore("opslog", { keyPath: "ts"});
      opslog.createIndex("user", "uid");

      db.createObjectStore("userlogs", { keyPath: "uid"});
    }
  }

  async init() {
    await super.init();

    const userlogs = await this.db.getAll("userlogs") || [];

    for (const log of userlogs) {
      this.userlogs[log.uid] = log.ts;
    }
  }

  async addMyLog(data, commit=true) {
    data = {
      ...data,
      uid: this.uid,
      ts: Date.now()
    };
    await this.db.put("opslog", data);
    if (commit) {
      await this.commitLog();
    }
  }

  async countLog(uid) {
    return await this.db.countFromIndex("opslog", "user", uid);
  }

  async commitLog(commitManifest = true) {
    let mylog = await this.db.getAllFromIndex("opslog", "user", this.uid);

    mylog = mylog.map(entry => JSON.stringify(entry)).join("\n");

    try {
      await this.s3.put(mylog, this.mylogFilename);
    } catch (e) {
      console.warn("Error Committing Log", e);
    }

    if (commitManifest) {
      await this.commitManifest();
    }
  }

  async startSync(interval) {
    await this.initing;

    const count = await this.countLog(this.uid);
    let commit = false;

    if (!count) {
      await this.addMyLog({
        op: "new-contributor"
      }, false);
      commit = true;
    }

    if (await this.s3.head(manifestFilename) <= 0) {
      await this.addMyLog({
        op: "create-coll",
        title: this.config.metadata.title,
        id: this.fullPath,
      }, false);
      commit = true;

    }

    if (commit) {
      await this.commitLog();
    }

    this._syncId = setInterval(() => this.sync(), interval);
  }

  stopSync() {
    if (this._syncId) {
      clearInterval(this._syncId);
      this._syncId = 0;
    }
  }

  close() {
    super.close();
    this.stopSync();
  }

  async commitManifest() {
    const tx = this.db.transaction("opslog", "readonly");

    const datapackage = {
      resources: [],
      contributors: []
    };

    let lastTS = 0;

    for await (const cursor of tx.store) {
      const value = cursor.value;
      switch (value.op) {
      case "create-coll":
        datapackage.title = value.title;
        datapackage.id = value.id;
        datapackage.created = new Date(value.ts).toISOString();
        break;

      case "new-contributor":
        datapackage.contributors.push({
          id: value.uid
        });
        break;

      case "upload":
        datapackage.resources.push({
          path: dataDir + value.filename,
          hash: value.hash,
          bytes: value.size,
          creator: value.uid,
        });
        break;
      }
      lastTS = value.ts;
    }

    if (lastTS) {
      datapackage.modified = new Date(lastTS).toISOString();
    }

    await this.s3.put(JSON.stringify(datapackage, null, 2), manifestFilename);
  }

  async sync() {
    if (this._syncing) {
      console.log("sync in progress");
      return;
    }

    try {
      this._syncing = true;
      await this.outboundSync();
      await this.inboundSync();

    } catch (e) {
      console.warn(e);
    } finally {
      this._syncing = false;
    }
  }

  async inboundSync() {
    console.log("inbound sync");

    const files = [];

    const resp = await this.s3.ls(contribsDir);
    const list = resp.Contents || [];
    for (const entry of list) {
      const filename = entry.Key.slice(resp.Prefix.length);
      const uid = filename.slice(0, -6);

      // don't sync our own data!
      if (uid === this.uid) {
        continue;
      }

      const ts = entry.LastModified.getTime();

      if (this.userlogs[uid] === ts) {
        continue;
      }

      const res = await this.s3.get(contribsDir + filename);
      const reader = new AsyncIterReader(res.Body);

      let first = true;

      for await (const line of reader.iterLines()) {
        if (first) {
          first = false;
          continue;
        }

        const parsed = JSON.parse(line);
        if (parsed.op === "upload" && parsed.filename) {
          files.push(parsed.filename);
        }
      }

      this.userlogs[uid] = ts;
      this.db.put("userlogs", {uid, ts});
    }

    if (files && files.length) {
      await this.syncWacz(files);
    }
  }

  async outboundSync() {
    console.log("outbound sync");
    const pages = await this.getPagesWithState(PAGE_STATE_NEED_REMOTE_SYNC);

    if (!pages.length) {
      return;
    }

    const pageList = pages.map(p => p.id);

    console.log("Syncing: " + pageList);

    const now = new Date();

    const filename = `${now.toISOString().replace(/[^\d]/g, "")}-${this.uid}.wacz`;

    const coll = {
      store: this,
      name: this.collId,
      config: this.config,
    };

    const dl = new Downloader({coll, filename, pageList});

    const resp = await dl.download();

    // todo: multipart upload for larger waczs?
    const blob = await resp.blob();
    const size = blob.size;

    const res = await this.s3.put(blob, dataDir + resp.filename);

    const matches = res.ETag === JSON.stringify(dl.finalHash);

    if (matches) {
      console.log("ETag matches md5!", res.finalHash);
    } else {
      console.log("ETag does not match md5", res.ETag, dl.finalHash);
    }

    for (const page of pages) {
      page.state = PAGE_STATE_SYNCED;
    }

    await this.addPages(pages, "pages", true);

    await this.addMyLog({
      op: "upload",
      filename,
      hash: "md5:" + dl.finalHash,
      size
    });
  }

  getBlockLoader(filename) {
    return new S3BlockLoader(this.s3, filename);
  }
}

// ===============================================================================
class S3BlockLoader
{
  constructor(s3, filename) {
    this.s3 = s3;
    this.filename = filename;
  }

  async getLength() {
    const res = await this.s3.head(dataDir + this.filename);
    return res;
  }

  async getRange(offset, length, streaming = false/*, signal = null*/) {
    const range = `bytes=${offset}-${offset + length - 1}`;
    const res = await this.s3.get(dataDir + this.filename, range);

    if (streaming) {
      return res.Body;
    }

    const reader = new AsyncIterReader(res.Body);
    return await reader.readFully();
  }
}


// ===============================================================================
self.sw = new SWReplay({
  ApiClass: ExtAPI,
  CollectionsClass: ShareableCollections,
  defaultConfig
});

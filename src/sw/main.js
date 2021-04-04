import { SWCollections, SWReplay } from '@webrecorder/wabac/src/swmain';
import { PAGE_STATE_NEED_REMOTE_SYNC, PAGE_STATE_SYNCED } from '@webrecorder/wabac/src/utils';
import { Downloader } from '../downloader';

import { ExtAPI } from './api';
import { Credentials } from './cred';
import { S3Sync } from './sync';

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
    this.syncs = {};
  }

  _createCollection(opts) {
    const collection = super._createCollection(opts);

    const { name, config } = opts;

    if (config && config.extraConfig && config.extraConfig.sync) {
      if (!this.syncs[name]) {
        console.log("starting auto-sync for: " + name);
        this.startSync(collection, config.extraConfig.sync);
      }
    }
    return collection;
  }

  async loadS3(sync) {
    const credData = await this.credManager.get(sync.cred);
    const s3 = new S3Sync(credData);
    return s3;
  }

  async initNewColl(metadata, extraConfig) {
    if (extraConfig && extraConfig.sync) {
      const s3 = await this.loadS3(extraConfig.sync);
      await s3.createNewColl(extraConfig.sync.collId);
    }

    return super.initNewColl(metadata, extraConfig);
  }

  async deleteColl(name, keepFileHandle = false) {
    this.stopSync(name);
    return await super.deleteColl(name, keepFileHandle);
  }

  startSync(collection, name, syncdata) {
    this.syncs[name] = setInterval(() => this._doSync(collection, name, syncdata), 30000);
  }

  stopSync(name) {
    if (this.syncs[name]) {
      clearInterval(this.syncs[name]);
      delete this.syncs[name];
    }
  }

  async _doSync(coll, sync) {
    const s3 = await this.loadS3(sync);

    const pages = await coll.store.getPagesWithState(PAGE_STATE_NEED_REMOTE_SYNC);

    if (!pages.length) {
      return;
    }

    const pageList = pages.map(p => p.id);

    console.log("Syncing: " + pageList);

    const filename = "batch-" + (new Date().toISOString().replace(/:/g, "-")) + ".wacz";

    const dl = new Downloader({coll, format: "wacz", filename, pageList});

    const resp = await dl.download();

    await s3.put(await resp.blob(), resp.filename);

    for (const page of pages) {
      page.state = PAGE_STATE_SYNCED;
    }

    await coll.store.addPages(pages, "pages", true);
  }
}

self.sw = new SWReplay({
  ApiClass: ExtAPI,
  CollectionsClass: ShareableCollections,
  defaultConfig
});

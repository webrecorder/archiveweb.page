"use strict";

import { ArchiveDB } from 'wabac/src/archivedb';

import { clearArchiveSize, incrArchiveSize, MAIN_DB_KEY } from './utils';

import { WARCWriter } from './warcwriter';

import { deleteDB } from 'idb/with-async-ittr.js';


// ===========================================================================
class ArchiveDBExt extends ArchiveDB
{
  constructor(name) {
    super(name || MAIN_DB_KEY);
  }

  async deleteAll() {
    //await deleteDB(this.name);
    await this.clearAll();

    clearArchiveSize();
  }

  async getPageMap(reverse = false) {
    const dir = reverse ? "prev" : "next";
    const tx = this.db.transaction("pages", "readonly");
    const pages = new Map();

    for await (const cursor of tx.store.index("date").iterate(null, dir)) {
      pages.set(cursor.value.id, cursor.value);
    }

    return pages;
  }

  async deletePage(id) {
    const tx = this.db.transaction("pages", "readwrite");
    const page = await tx.store.get(id);
    await tx.store.delete(id);

    const size = await this.deletePageResources(id);

    if (size > 0) {
      incrArchiveSize('dedup', -size);
      incrArchiveSize('total', -page.size);
    }
  }

  async hasUrlForPage(url, pageId) {
    const tx = this.db.transaction("resources", "readonly");

    for await (const cursor of tx.store.iterate(this.getLookupRange(url))) {
      if (cursor.value.pageId === pageId) {
        return true;
      }
    }

    return false;
  }

  async writeToWARC(pageIds) {
    const warcwriter = new WARCWriter();

    const allPages = await this.getPageMap();

    if (!pageIds || !pageIds.length) {
      pageIds = allPages.keys();
    }

    const tx = this.db.transaction("resources", "readonly");

    for (const pageId of pageIds) {
      const page = allPages.get(pageId);
      if (!page) {
        continue;
      }
      warcwriter.writePage(page);
      await warcwriter.writeFromDBIter(tx.store.index("pageId").iterate(pageId));
    }

    return URL.createObjectURL(warcwriter.toBlob());
  }
}

export { ArchiveDBExt };


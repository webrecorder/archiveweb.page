"use strict";

import { ArchiveDB } from 'wabac/src/archivedb';

import { setArchiveSize, incrArchiveSize, MAIN_DB_KEY } from './utils';

import { WARCWriter } from './warcwriter';


// ===========================================================================
class ArchiveDBExt extends ArchiveDB
{
  constructor(name) {
    super(name);
  }

  async deleteAll() {
    try {
      await this.db.clear("resources");
      await this.db.clear("pages");
    } catch (e) {}

    try {
      //await this.db.delete();
      //await indexedDB.deleteDatabase(MAIN_DB_KEY);
    } catch (e) {}

    setArchiveSize(0);
  }

  async getAllPages(reverse = false) {
    if (!reverse) {
      return await this.db.getAllFromIndex("pages", "date");
    }
    const tx = this.db.transaction("pages", "readonly");
    const pages = [];

    for await (const cursor of tx.store.index("date").iterate(null, "prev")) {
      pages.push(cursor.value);
    }

    return pages;
  }

  async deletePage(id) {
    const tx = this.db.transaction("pages", "readwrite");
    const page = await tx.store.get(id);
    await tx.store.delete(id);

    await this.deletePageResources(id);

    if (page) {
      incrArchiveSize(-page.size);
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

  async writeAllToWarc() {
    const tx = this.db.transaction("resources", "readonly");

    const warcwriter = new WARCWriter();

    const blob = await warcwriter.writeFromDBIter(tx.store.index("ts").iterate());

    return URL.createObjectURL(blob);
  }
}

export { ArchiveDBExt };


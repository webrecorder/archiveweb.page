"use strict";

import { ArchiveDBExt } from './archivedbext';

import { fuzzyMatcher } from 'wabac/src/fuzzymatcher';


// ===========================================================================
class DBWriter {
  constructor(name) {
    this.db = new ArchiveDBExt(name);
  }

  addPage(pageInfo) {
    if (!pageInfo.url) {
      console.warn("Empty Page, Skipping");
      return;
    }
    return this.db.addPage(pageInfo);
  }

  async commitResource(data) {
    //console.log(`Commit ${url} @ ${ts}, cookie: ${cookie}, sw: ${reqresp.fromServiceWorker}`);
    try {
      await this.db.addUrl(data);
    } catch (e) {
      console.warn(`Commit error for ${data.url} @ ${data.ts} ${data.mime}`);
      console.warn(e);
    }

    if (data.status > 299) {
      console.log(`Skip fuzzy for ${data.status} ${data.url}`);
      return;
    }

    for (const fuzzyUrl of fuzzyMatcher.fuzzyUrls(data.url)) {
      if (data.url === fuzzyUrl) {
        continue;
      }

      try {
        await this.db.addUrl({url: fuzzyUrl,
                              ts: data.ts,
                              mime: "fuzzy",
                              original: data.url,
                              pageId: data.pageId});
      } catch (e) {
        console.warn(`Fuzzy Add Error: ${fuzzyUrl}`);
      }
    }
  }
}


export { DBWriter };



import { fulltext } from './fulltext';

import { ArchiveDBExt } from './archivedbext';

import { Recorder } from './recorder';

import { registerSW } from './utils';
import { clearArchiveSize, incrArchiveSize } from './utils';


self.archiveSize = {total: 0, dedup: 0};

//const dbWriter = new DBWriter(MAIN_DB_KEY);
const db = new ArchiveDBExt();


// ===========================================================================
chrome.browserAction.onClicked.addListener((tab) => {
  //chrome.tabs.sendMessage(tab.id, {"show": true});
  Recorder.startRecorder(tab.id);
});

chrome.tabs.onCreated.addListener((tab) => {
  if (tab.id && tab.openerTabId && self.recorders[tab.openerTabId] && self.recorders[tab.openerTabId].running) {
    const url = tab.pendingUrl || tab.url;
    if (url.startsWith("https:") || url.startsWith("http:")) {
      Recorder.startRecorder(tab.id);
    }
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId && self.recorders[tabId] && self.recorders[tabId].running && changeInfo.favIconUrl) {
    self.recorders[tabId].loadFavIcon(changeInfo.favIconUrl);
  }
});

chrome.contextMenus.create({"id": "wr", "title": "View Recordings", "contexts": ["all"]});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.create({ url: chrome.runtime.getURL("replay/index.html") });
});

chrome.storage.local.get(["archiveSize"], (result) => {
  if (result.archiveSize) {
    self.archiveSize.total = result.archiveSize.total || 0;
    self.archiveSize.dedup = result.archiveSize.dedup || 0;
  }
});

self._sizeUpdate = setInterval(() => {
  if (self.lastSize && self.lastSize.total != self.archiveSize.total) {
    chrome.storage.local.set({"archiveSize": self.archiveSize}, () => {
      self.lastSize = self.archiveSize;
    });
  }
}, 5000);

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  switch (message.msg) {
    case "archiveSizeIncr":
      incrArchiveSize(message.type, message.size);
      break;

    case "archiveSizeClear":
      clearArchiveSize();
      break;

    case "archiveSizeGet":
      sendResponse({archiveSize: self.archiveSize});
      break;

    case "searchText":
      const result = (fulltext && fulltext.search(message.query));
      sendResponse({result});
      break;

    case "deletePage":
      await Recorder.stopForPage(message.id);

      if (fulltext) {
        fulltext.remove(message.id);
      }
      await db.deletePage(message.id);
      break;

    case "deleteAll":
      await Recorder.stopAll();

      if (fulltext) {
        fulltext.deleteAll();
      } else {
        chrome.storage.local.remove("main.archive");
      }
      //self.archiveSize = 0;
      await db.deleteAll();
      break;

    case "pdfText":
      if (sender.tab && sender.tab.id && self.recorders[sender.tab.id]) {
        self.recorders[sender.tab.id].setPDFText(message.text, sender.tab.url);
      }
      break;
    }
});

chrome.runtime.onInstalled.addListener(registerSW);

chrome.runtime.onStartup.addListener(registerSW);

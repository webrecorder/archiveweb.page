
import { fulltext } from './fulltext';

import { MAIN_DB_KEY } from './utils';
import { DBWriter } from './dbwriter';

import { Recorder } from './recorder';

self.archiveSize = 0;

const dbWriter = new DBWriter(MAIN_DB_KEY);


// ===========================================================================
function init() {
  chrome.browserAction.onClicked.addListener((tab) => {
    //chrome.tabs.sendMessage(tab.id, {"show": true});
    Recorder.startRecorder(tab.id, dbWriter);
  });

  chrome.tabs.onCreated.addListener((tab) => {
    if (tab.id && tab.openerTabId && self.recorders[tab.openerTabId] && self.recorders[tab.openerTabId].running) {
      Recorder.startRecorder(tab.id, dbWriter);
    }
  });

  chrome.contextMenus.create({"id": "wr", "title": "View Recordings", "contexts": ["all"]});

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.create({ url: chrome.runtime.getURL("replay/index.html") });
  });

  chrome.storage.local.get(["archiveSize"], (result) => {
    if (result.archiveSize) {
      self.archiveSize = result.archiveSize;
    }
  });

  self._sizeUpdate = setInterval(() => {
    if (self.lastSize != self.archiveSize) {
      chrome.storage.local.set({"archiveSize": self.archiveSize}, () => {
        self.lastSize = self.archiveSize;
      });
    }
  }, 5000);

  chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    switch (message.msg) {
      case "archiveSizeIncr":
        self.archiveSize += message.size;
        break;

      case "archiveSizeSet":
        self.archiveSize = message.size;
        break;

      case "archiveSizeGet":
        sendResponse({size: self.archiveSize});
        break;

      case "searchText":
        const result = (fulltext && fulltext.search(message.query));
        sendResponse({result});
        break;

      case "deletePage":
        if (fulltext) {
          fulltext.remove(message.id);
        }
        await dbWriter.db.deletePage(message.id);
        break;

      case "deleteAll":
        await Recorder.stopAll();

        if (fulltext) {
          fulltext.deleteAll();
        } else {
          chrome.storage.local.remove("main.archive");
        }
        self.archiveSize = 0;
        await dbWriter.db.deleteAll();
        break;
    }
  });

  registerSW();
}

async function registerSW() {
  const scriptPath = "replay/sw.js?replayPrefix=wabac&stats=true&dbColl=archive:main.archive"

  const scriptURL = chrome.runtime.getURL(scriptPath);

  if (!navigator.serviceWorker.controller || navigator.serverWorker.controller.scriptURL !== scriptURL) {
    await navigator.serviceWorker.register(scriptURL, {scope: chrome.runtime.getURL("replay/")});
  }
}

chrome.runtime.onInstalled.addListener(init);

chrome.runtime.onStartup.addListener(init);

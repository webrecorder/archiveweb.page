import { BrowserRecorder } from './browser-recorder';

import { CollectionLoader } from '@webrecorder/wabac/src/loaders';

import { detectLocalIPFS, ensureDefaultColl, listAllMsg } from '../utils';

import { ExtIPFSClient } from './ipfs';


// ===========================================================================
self.recorders = {};
self.newRecId = null;

let newRecUrl = null;
let newRecCollId = null;

const openWinMap = new Map();

const collLoader = new CollectionLoader();

let ipfsClient = null;


// ===========================================================================

function main() {
  chrome.browserAction.setBadgeBackgroundColor({color: "#64e986"});

  chrome.contextMenus.create({"id": "toggle-rec", "title": "Start Recording", "contexts": ["browser_action"]});
  chrome.contextMenus.create({"id": "view-rec", "title": "View Web Archives", "contexts": ["all"]});
}

chrome.runtime.onConnect.addListener((port) => {
  switch (port.name) {
    case "popup-port":
      popupHandler(port);
      break;

    case "share-port":
      shareHandler(port);
      break;
  }
});

function shareHandler(port) {
  let size = 0;

  port.onMessage.addListener(async (message) => {
    function progress(incSize) {
      size += incSize;
      port.postMessage({size, progress: true});
    }

    const resp = await ipfsClient.ipfsPinUnpin(message.collId, message.pin, progress);
    port.postMessage(resp);
    port.disconnect();
  });
}


function popupHandler(port) {
  if (!port.sender || port.sender.url !== chrome.runtime.getURL("popup.html")) {
    return;
  }

  let tabId = null;

  port.onMessage.addListener(async (message) => {
    switch (message.type) {
      case "startUpdates":
        tabId = message.tabId;
        if (self.recorders[tabId]) {
          self.recorders[tabId].port = port;
          self.recorders[tabId].doUpdateStatus();
        }
        port.postMessage(await listAllMsg(collLoader));
        break;

      case "startRecording":
        startRecorder(tabId, {collId: message.collId, port});
        break;

      case "stopRecording":
        stopRecorder(tabId);
        break;

      case "newColl":
        collLoader.initNewColl({title: message.title}).then(async (newColl) => {
          localStorage.setItem("defaultCollId", newColl.name);
          port.postMessage(await listAllMsg(collLoader));
        });
        break;
    }
  });

  port.onDisconnect.addListener(() => {
    if (self.recorders[tabId]) {
      self.recorders[tabId].port = null;
    }
  });
};


// ===========================================================================
chrome.debugger.onDetach.addListener((tab, reason) => {
  // target closed, delete recorder as this tab will not be used again
  if (reason === "target_closed") {
    delete self.recorders[tab.id];
  }
});

// ===========================================================================
chrome.tabs.onCreated.addListener((tab) => {
  if (!tab.id) {
    return;
  }

  let openUrl = null;
  let start = false;
  let waitForTabUpdate = true;
  let collId = null;

  // start recording from extension in new tab use case
  if (newRecUrl && tab.pendingUrl === "about:blank") {
    start = true;
    openUrl = newRecUrl;
    collId = newRecCollId || localStorage.getItem("defaultCollId");
    newRecUrl = null;
    newRecCollId = null;
  } else if (tab.openerTabId && (!tab.pendingUrl || isValidUrl(tab.pendingUrl)) &&
             self.recorders[tab.openerTabId] && self.recorders[tab.openerTabId].running) {
    collId = self.recorders[tab.openerTabId].collId;

    start = true;
    if (tab.pendingUrl) {
      waitForTabUpdate = false;
      openUrl = tab.pendingUrl;
    }
  }

  if (start) {
    if (openUrl && !isValidUrl(openUrl)) {
      return;
    }
    startRecorder(tab.id, {waitForTabUpdate, collId, openUrl});
  }
});

// ===========================================================================
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId && self.recorders[tabId]) {
    const recorder = self.recorders[tabId];
    if (changeInfo.url) {
      recorder.failureMsg = null;
    }

    if (recorder.waitForTabUpdate) {
      if (isValidUrl(changeInfo.url)) {
        recorder.attach();
      } else {
        recorder.waitForTabUpdate = false;
        delete self.recorders[tabId];
        return;
      }
    }

    if (recorder.running && changeInfo.favIconUrl) {
      recorder.loadFavIcon(changeInfo.favIconUrl);
    }
  } else if (changeInfo.url && openWinMap.has(changeInfo.url)) {
    const collId = openWinMap.get(changeInfo.url);
    openWinMap.delete(changeInfo.url);
    if (!tabId || !isValidUrl(changeInfo.url)) {
      return;
    }
    startRecorder(tabId, {collId})
  }
});

// ===========================================================================
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  delete self.recorders[tabId];
  localStorage.removeItem(`${tabId}-collId`);
});

// ===========================================================================
chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "view-rec":
      chrome.tabs.create({ url: chrome.runtime.getURL("replay/index.html") });
      break;

    case "toggle-rec":
      if (!isRecording(tab.id)) {
        if (isValidUrl(tab.url)) {
          doStartWithRetry(tab.id);
        }
      } else {
        stopRecorder(tab.id);
      }
      break;
  }
});

// ===========================================================================
async function startRecorder(tabId, opts) {
  if (!self.recorders[tabId]) {
    opts.collLoader = collLoader;
    opts.openWinMap = openWinMap;
    self.recorders[tabId] = new BrowserRecorder({tabId}, opts);
  }

  let err = null;

  const {waitForTabUpdate} = opts;

  if (!waitForTabUpdate && !self.recorders[tabId].running) {
    try {
      self.recorders[tabId].setCollId(opts.collId);
      await self.recorders[tabId].attach();
    } catch(e) {
      console.warn(e);
      err = e;
    }
    return err;
  }
}

// ===========================================================================
function stopRecorder(tabId) {
  if (self.recorders[tabId]) {
    self.recorders[tabId].detach();
    return true;
  }

  return false;
}

// ===========================================================================
function isRecording(tabId) {
  return self.recorders[tabId] && self.recorders[tabId].running;
}

// ===========================================================================
function isValidUrl(url) {
  return url && (url === "about:blank" || url.startsWith("https:") || url.startsWith("http:"));
}

// ===========================================================================
async function stopAll() {
  for (const tabId of Object.keys(self.recorders)) {
    if (self.recorders[tabId].running) {
      await self.recorders[tabId].detach();
    }
  }
}


// ===========================================================================
async function stopForPage(pageId) {
  for (const tabId of Object.keys(self.recorders)) {
    if (self.recorders[tabId].running && self.recorders[tabId].pageInfo.id === pageId) {
      await self.recorders[tabId].detach();
      return true;
    }
  }

  return false;
}

// ===========================================================================
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  switch (message.msg) {
    case "pdfText":
      if (sender.tab && sender.tab.id && self.recorders[sender.tab.id]) {
        self.recorders[sender.tab.id].setPDFText(message.text, sender.tab.url);
      }
      break;

    case "startNew":
      newRecUrl = message.url;
      newRecCollId = message.collId;
      chrome.tabs.create({url: "about:blank"});
      break;
    }
});

// ===========================================================================
chrome.runtime.onInstalled.addListener(main);


// ===========================================================================
async function initIpfs() {
  ipfsClient = new ExtIPFSClient(collLoader);

  ipfsClient.init();
}

initIpfs();



import { BrowserRecorder } from './browser-recorder';


// ===========================================================================
self.recorders = {};
self.newRecId = null;

chrome.browserAction.setBadgeBackgroundColor({color: "#64e986"});

// ===========================================================================
chrome.browserAction.onClicked.addListener((tab) => {
  startRecorder(tab.id);
});


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

  const url = tab.pendingUrl;
  let openUrl = null;
  let start = false;

  if (self.newRecUrl) {
    if (url === "about:blank") {
      start = true;
      openUrl = self.newRecUrl;
      self.newRecUrl = null;
    }
  }

  if (!start && tab.openerTabId && self.recorders[tab.openerTabId] && self.recorders[tab.openerTabId].running) {
    start = true;
  }

  if (start) {
    const testUrl = openUrl || url;
    if (testUrl && !testUrl.startsWith("https:") && !testUrl.startsWith("http:")) {
      return;
    }

    startRecorder(tab.id, openUrl, !testUrl);
  }
});

// ===========================================================================
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId && self.recorders[tabId]) {
    if (self.recorders[tabId].waitForTabUpdate && changeInfo.url) {
      self.recorders[tabId].attach();
    }

    if (self.recorders[tabId].running && changeInfo.favIconUrl) {
      self.recorders[tabId].loadFavIcon(changeInfo.favIconUrl);
    }
  }
});

// ===========================================================================
chrome.contextMenus.create({"id": "wr", "title": "View Recordings", "contexts": ["all"]});


chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.create({ url: chrome.runtime.getURL("replay/index.html") });
});


// ===========================================================================
function startRecorder(tabId, openUrl, waitForTabUpdate = false) {
  if (!self.recorders[tabId]) {
    self.recorders[tabId] = new BrowserRecorder({"tabId": tabId}, openUrl, waitForTabUpdate);
  } else {
    //console.log('Resuming Recording on: ' + tabId);
  }

  if (!waitForTabUpdate) {
    self.recorders[tabId].attach();
  }
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
      //console.log(sender.tab.id);
      //self.newRecId = sender.tab.id;
      self.newRecUrl = message.url;
      chrome.tabs.create({url: "about:blank"});
      break;
    }
});

// ===========================================================================
//chrome.runtime.onInstalled.addListener(registerSW);

//chrome.runtime.onStartup.addListener(registerSW);

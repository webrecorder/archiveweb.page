

import { BrowserRecorder } from './browser-recorder';


// ===========================================================================
self.recorders = {};
self.newRecId = null;

function main() {
  chrome.browserAction.setBadgeBackgroundColor({color: "#64e986"});

  chrome.contextMenus.create({"id": "toggle-rec", "title": "Start Recording", "contexts": ["browser_action"]});
  chrome.contextMenus.create({"id": "view-rec", "title": "View Recordings", "contexts": ["all"]});
}

// ===========================================================================
// chrome.browserAction.onClicked.addListener((tab) => {
//   startRecorder(tab.id);
// });


chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== "popup-port") {
    return;
  }

  if (!port.sender || port.sender.url !== chrome.runtime.getURL("popup.html")) {
    return;
  }

  let tabId = null;

  port.onMessage.addListener((message) => {
    switch (message.type) {
      case "startUpdates":
        tabId = message.tabId;
        if (self.recorders[tabId]) {
          self.recorders[tabId].port = port;
          self.recorders[tabId].doUpdateStatus();
        }
        break;

      case "startRecording":
        startRecorder(tabId);
        self.recorders[tabId].port = port;
        break;

      case "stopRecording":
        stopRecorder(tabId);
        break;
    }
  });

  port.onDisconnect.addListener(() => {
    console.log("port disconnect");
    if (self.recorders[tabId]) {
      self.recorders[tabId].port = null;
    }
  });
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
    if (testUrl && !isValidUrl(testUrl)) {
      return;
    }
    startRecorder(tab.id, testUrl, !testUrl);
  }
});

// ===========================================================================
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId && self.recorders[tabId]) {
    if (self.recorders[tabId].waitForTabUpdate && isValidUrl(changeInfo.url)) {
      self.recorders[tabId].attach();
    }

    if (self.recorders[tabId].running && changeInfo.favIconUrl) {
      self.recorders[tabId].loadFavIcon(changeInfo.favIconUrl);
    }
  }
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
          startRecorder(tab.id);
        }
      } else {
        stopRecorder(tab.id);
      }
      break;
  }
});

// ===========================================================================
function startRecorder(tabId, openUrl, waitForTabUpdate = false) {
  if (!self.recorders[tabId]) {
    self.recorders[tabId] = new BrowserRecorder({"tabId": tabId}, openUrl, waitForTabUpdate);
  } else {
    //console.log('Resuming Recording on: ' + tabId);
  }

  if (!waitForTabUpdate && !self.recorders[tabId].running) {
    self.recorders[tabId].attach();
    return true;
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
  return url && (url.startsWith("https:") || url.startsWith("http:"));
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
main();

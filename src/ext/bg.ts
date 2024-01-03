import { BrowserRecorder } from "./browser-recorder";

import { CollectionLoader } from "@webrecorder/wabac/src/loaders";

import { listAllMsg } from "../utils";

import {
  getLocalOption,
  removeLocalOption,
  setLocalOption,
} from "../localstorage";

// ===========================================================================
self.recorders = {};
self.newRecId = null;

let newRecUrl = null;
let newRecCollId = null;

let defaultCollId = null;
let autorun = false;

const openWinMap = new Map();

const collLoader = new CollectionLoader();

const disabledCSPTabs = new Set();

// ===========================================================================

function main() {
  chrome.browserAction.setBadgeBackgroundColor({ color: "#64e986" });

  chrome.contextMenus.create({
    id: "toggle-rec",
    title: "Start Recording",
    contexts: ["browser_action"],
  });
  chrome.contextMenus.create({
    id: "view-rec",
    title: "View Web Archives",
    contexts: ["all"],
  });
}

chrome.runtime.onConnect.addListener((port) => {
  switch (port.name) {
    case "popup-port":
      popupHandler(port);
      break;
  }
});

function popupHandler(port) {
  if (!port.sender || port.sender.url !== chrome.runtime.getURL("popup.html")) {
    return;
  }

  let tabId = null;

  port.onMessage.addListener(async (message) => {
    switch (message.type) {
      case "startUpdates":
        tabId = message.tabId;
        // @ts-expect-error - TS2538 - Type 'null' cannot be used as an index type.
        if (self.recorders[tabId]) {
          // @ts-expect-error - TS2538 - Type 'null' cannot be used as an index type.
          self.recorders[tabId].port = port;
          // @ts-expect-error - TS2538 - Type 'null' cannot be used as an index type.
          self.recorders[tabId].doUpdateStatus();
        }
        port.postMessage(await listAllMsg(collLoader));
        break;

      case "startRecording": {
        const { collId, autorun } = message;
        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 3.
        startRecorder(tabId, { collId, port, autorun }, message.url);
        break;
      }

      case "stopRecording":
        stopRecorder(tabId);
        break;

      case "toggleBehaviors":
        toggleBehaviors(tabId);
        break;

      case "newColl": {
        const { name } = await collLoader.initNewColl({ title: message.title });
        defaultCollId = name;
        port.postMessage(await listAllMsg(collLoader, { defaultCollId }));
        await setLocalOption("defaultCollId", defaultCollId);
        break;
      }
    }
  });

  port.onDisconnect.addListener(() => {
    // @ts-expect-error - TS2538 - Type 'null' cannot be used as an index type.
    if (self.recorders[tabId]) {
      // @ts-expect-error - TS2538 - Type 'null' cannot be used as an index type.
      self.recorders[tabId].port = null;
    }
  });
}

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
    collId = newRecCollId || defaultCollId;
    newRecUrl = null;
    newRecCollId = null;
  } else if (
    tab.openerTabId &&
    (!tab.pendingUrl || isValidUrl(tab.pendingUrl)) &&
    self.recorders[tab.openerTabId] &&
    // @ts-expect-error - TS2339 - Property 'running' does not exist on type 'BrowserRecorder'.
    self.recorders[tab.openerTabId].running
  ) {
    // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'BrowserRecorder'.
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
    startRecorder(
      tab.id,
      { waitForTabUpdate, collId, openUrl, autorun },
      // @ts-expect-error - TS2554 - Expected 2 arguments, but got 3.
      openUrl
    );
  }
});

// ===========================================================================
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (tabId && self.recorders[tabId]) {
    const recorder = self.recorders[tabId];
    if (changeInfo.url) {
      // @ts-expect-error - TS2339 - Property 'failureMsg' does not exist on type 'BrowserRecorder'.
      recorder.failureMsg = null;
    }

    if (changeInfo.url && openWinMap.has(changeInfo.url)) {
      openWinMap.delete(changeInfo.url);
    }

    // @ts-expect-error - TS2339 - Property 'waitForTabUpdate' does not exist on type 'BrowserRecorder'.
    if (recorder.waitForTabUpdate) {
      if (isValidUrl(changeInfo.url)) {
        recorder.attach();
      } else {
        // @ts-expect-error - TS2339 - Property 'waitForTabUpdate' does not exist on type 'BrowserRecorder'.
        recorder.waitForTabUpdate = false;
        delete self.recorders[tabId];
        return;
      }
    }
  } else if (changeInfo.url && openWinMap.has(changeInfo.url)) {
    const collId = openWinMap.get(changeInfo.url);
    openWinMap.delete(changeInfo.url);
    if (!tabId || !isValidUrl(changeInfo.url)) {
      return;
    }
    // @ts-expect-error - TS2554 - Expected 2 arguments, but got 3.
    startRecorder(tabId, { collId, autorun }, changeInfo.url);
  }
});

// ===========================================================================
chrome.tabs.onRemoved.addListener((tabId) => {
  delete self.recorders[tabId];
  removeLocalOption(`${tabId}-collId`);
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
          // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
          startRecorder(tab.id);
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
    self.recorders[tabId] = new BrowserRecorder({ tabId }, opts);
  } else {
    self.recorders[tabId].setAutoRunBehavior(opts.autorun);
  }

  let err = null;

  const { waitForTabUpdate } = opts;

  // @ts-expect-error - TS2339 - Property 'running' does not exist on type 'BrowserRecorder'.
  if (!waitForTabUpdate && !self.recorders[tabId].running) {
    try {
      self.recorders[tabId].setCollId(opts.collId);
      await self.recorders[tabId].attach();
    } catch (e) {
      console.warn(e);
      // @ts-expect-error - TS2322 - Type 'unknown' is not assignable to type 'null'.
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
function toggleBehaviors(tabId) {
  if (self.recorders[tabId]) {
    self.recorders[tabId].toggleBehaviors();
    return true;
  }

  return false;
}

// ===========================================================================
function isRecording(tabId) {
  // @ts-expect-error - TS2339 - Property 'running' does not exist on type 'BrowserRecorder'.
  return self.recorders[tabId] && self.recorders[tabId].running;
}

// ===========================================================================
function isValidUrl(url) {
  return (
    url &&
    (url === "about:blank" ||
      url.startsWith("https:") ||
      url.startsWith("http:"))
  );
}

// ===========================================================================
chrome.runtime.onMessage.addListener(
  async (message /*sender, sendResponse*/) => {
    switch (message.msg) {
      case "startNew":
        newRecUrl = message.url;
        newRecCollId = message.collId;
        autorun = message.autorun;
        // @ts-expect-error - TS2322 - Type 'unknown' is not assignable to type 'null'.
        defaultCollId = await getLocalOption("defaultCollId");
        chrome.tabs.create({ url: "about:blank" });
        break;

      case "disableCSP":
        disableCSPForTab(message.tabId);
        break;
    }
  }
);

// ===========================================================================
async function disableCSPForTab(tabId) {
  if (disabledCSPTabs.has(tabId)) {
    return;
  }

  await new Promise((resolve) => {
    chrome.debugger.attach({ tabId }, "1.3", () => {
      // @ts-expect-error - TS2794 - Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
      resolve();
    });
  });

  await new Promise((resolve) => {
    chrome.debugger.sendCommand(
      { tabId },
      "Page.setBypassCSP",
      { enabled: true },
      (resp) => resolve(resp)
    );
  });

  disabledCSPTabs.add(tabId);

  // hacky: don't detach if any recorders are running, otherwise will disconnect
  for (const rec of Object.values(self.recorders)) {
    // @ts-expect-error - TS2339 - Property 'running' does not exist on type 'BrowserRecorder'.
    if (rec.running) {
      return;
    }
  }

  await new Promise((resolve) => {
    chrome.debugger.detach({ tabId }, () => {
      // @ts-expect-error - TS2794 - Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
      resolve();
    });
  });
}

// ===========================================================================
chrome.runtime.onInstalled.addListener(main);


const MAIN_DB_KEY = "main.archive";

// ===========================================================================
function sleep(time) {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

// ===========================================================================
function clearArchiveSize() {
  if (self.archiveSize != undefined) {
    self.archiveSize.total = 0;
    self.archiveSize.dedup = 0;
  } else {
    chrome.runtime.sendMessage({"msg": "archiveSizeClear"});
  }
}


function incrArchiveSize(type, size) {
  if (self.archiveSize != undefined && self.archiveSize[type] != undefined) {
    self.archiveSize[type] += size;
    if (self.archiveSize[type] < 0) {
      self.archiveSize[type] = 0;
    }
  } else {
    chrome.runtime.sendMessage({"msg": "archiveSizeIncr", "size": size, "type": type});
  }
}


function getArchiveSize(size) {
  if (self.archiveSize != undefined) {
    return self.archiveSize;
  } else {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({"msg": "archiveSizeGet"}, (response) => {
        if (response) {
          resolve(response.archiveSize);
        } else {
          reject(chrome.runtime.lastError.message);
        }
      });
    });
  }
}

function chromeStoreLoad(prop) {
  return new Promise((resolve) => {
    chrome.storage.local.get([prop], (result) => {
      resolve(result[prop] || null);
    });
  });
}

function chromeStoreSet(prop, value) {
  const set = {};
  set[prop] = value;
  return chrome.storage.local.set(set, (e) => { if (e) console.log(e); });
}

async function registerSW() {
  const scriptPath = "replay/sw.js?replayPrefix=wabac&stats=true&dbColl=archive:main.archive"

  const scriptURL = chrome.runtime.getURL(scriptPath);

  if (!navigator.serviceWorker.controller || navigator.serviceWorker.controller.scriptURL !== scriptURL) {
    await navigator.serviceWorker.register(scriptURL, {scope: chrome.runtime.getURL("replay/")});
  }
}




export { sleep, clearArchiveSize, incrArchiveSize, getArchiveSize, MAIN_DB_KEY, registerSW };


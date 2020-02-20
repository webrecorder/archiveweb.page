
const MAIN_DB_KEY = "main.archive";

// ===========================================================================
function sleep(time) {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

// ===========================================================================
function setArchiveSize(size) {
  if (self.archiveSize != undefined) {
    self.archiveSize = size;
  } else {
    chrome.runtime.sendMessage({"msg": "archiveSizeSet", "size": size});
  }
}


function incrArchiveSize(size) {
  if (self.archiveSize != undefined) {
    self.archiveSize += size;
  } else {
    chrome.runtime.sendMessage({"msg": "archiveSizeIncr", "size": size});
  }
}

function getArchiveSize(size) {
  if (self.archiveSize != undefined) {
    return self.archiveSize;
  } else {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({"msg": "archiveSizeGet"}, (response) => {
        if (response) {
          resolve(response.size);
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

export { sleep, setArchiveSize, incrArchiveSize, getArchiveSize, MAIN_DB_KEY };


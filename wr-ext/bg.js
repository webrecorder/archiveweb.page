
//chrome.browserAction.onClicked.addListener(function () {
//  chrome.tabs.create({ url: chrome.runtime.getURL("page.html") });
//});


function init() {
  chrome.browserAction.onClicked.addListener((tab) => {
    //chrome.tabs.sendMessage(tab.id, {"show": true});
    Recorder.startRecorder(tab.id);
  });

  chrome.contextMenus.create({"id": "wr", "title": "View Recordings", "contexts": ["all"]});

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.create({ url: chrome.runtime.getURL("replay/index.html") });
  });


  window.webkitRequestFileSystem(window.PERMANENT, 1024*1024*1000, function(filesystem) {
    window.filesystem = filesystem;
      filesystem.root.getFile('test.warc', {create: true}, function(entry) {
        entry.createWriter(function(writer) {
          window.virtualWriter = writer;

        }, function(fileError) {
          console.log(fileError);
        });
      }, function(err) { console.log(err); });
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.msg) {
      case "truncate":
        if (sender.tab && sender.tab.url.indexOf("chrome-extension://") === 0) {
          window.virtualWriter.truncate(0);
          chrome.storage.local.set({"pages": []});
          sendResponse(true);
        }
        break;
    }
  });

  registerSW();
}

async function registerSW() {
  const scriptPath = "replay/sw.js?replayPrefix=wabac&stats=true&cacheColl=archive:wr-ext.cache"

  const scriptURL = chrome.runtime.getURL(scriptPath);

  if (!navigator.serviceWorker.controller || navigator.serverWorker.controller.scriptURL !== scriptURL) {
    await navigator.serviceWorker.register(scriptURL, {scope: chrome.runtime.getURL("replay/")});
  }
}

chrome.runtime.onInstalled.addListener(init);

chrome.runtime.onStartup.addListener(init);

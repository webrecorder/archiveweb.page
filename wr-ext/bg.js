
//chrome.browserAction.onClicked.addListener(function () {
//  chrome.tabs.create({ url: chrome.runtime.getURL("page.html") });
//});


function init() {
  chrome.browserAction.onClicked.addListener((tab) => {
    //chrome.tabs.sendMessage(tab.id, {"show": true});
    initCDP(tab.id);
  });

  chrome.contextMenus.create({"id": "wr", "title": "View Recordings", "contexts": ["all"]});

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.create({ url: chrome.runtime.getURL("replay/replay.html") });
  });


  window.webkitRequestFileSystem(window.PERMANENT, 1024*1024*1000, function(filesystem) {
    window.filesystem = filesystem;
      filesystem.root.getFile('test.warc', {create: true}, function(entry) {
        entry.createWriter(function(writer) {
          window.virtualWriter = writer;
          //writer.truncate(0);

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
}

chrome.runtime.onInstalled.addListener(init);


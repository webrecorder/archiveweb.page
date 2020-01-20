
//chrome.browserAction.onClicked.addListener(function () {
//  chrome.tabs.create({ url: chrome.runtime.getURL("page.html") });
//});


chrome.browserAction.onClicked.addListener((tab) => {
  //chrome.tabs.sendMessage(tab.id, {"show": true});
  initCDP(tab.id);
});

/*
window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024*100, function(filesystem) {
  window.filesystem = filesystem;
    filesystem.root.getFile('test.warc', {create: true}, function(entry) {
      entry.createWriter(function(writer) {
        let data = new Blob(["Some Text"], { type: "text/plain" });
        writer.write(data);
      }, function(fileError) {
        console.log(fileError);
      });
    }, function(err) { console.log(err); });
});

*/



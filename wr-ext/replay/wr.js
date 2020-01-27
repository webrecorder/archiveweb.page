

function getFile(name, size) {
  name = name || 'test.warc';
  size = size || 1024*1024*100;
  return new Promise((resolve, reject) => {
    window.webkitRequestFileSystem(window.PERMANENT, size, function(filesystem) {
      //window.filesystem = filesystem;
      filesystem.root.getFile(name, {create: false}, function(entry) {
        entry.file(file => resolve(file), err => reject(err));
      });
    });
  });
}

function humanFileSize(size) {
    if (size === 0) return 0;
    var i = Math.floor( Math.log(size) / Math.log(1000) );
    return ( size / Math.pow(1000, i) ).toFixed(0) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

async function init() {
  if (!self.__wabacEmbeds) {
    console.log("no sw init");
  }
  
  await self.__wabacEmbeds;

  const file = await getFile();

  const fileURL = URL.createObjectURL(file);

  document.querySelector("#size").innerText = humanFileSize(file.size);

  const warcFiles = [{"name": file.name, "url": fileURL}];

/*
  navigator.serviceWorker.addEventListener("message", (event) => {
    switch (event.data.msg_type) {
      case "listAll":
        renderColl(event.data.colls);
        break;
    }
  });
*/

  chrome.storage.local.get("pages", (result) => {
    renderColl("archive", result.pages);
  });

  document.querySelector("#download").addEventListener("click", (event) => {
    const blob = new Blob([file], {"type": "application/octet-stream"});
    const blobURL = URL.createObjectURL(blob);
    chrome.downloads.download({"url": blobURL, "filename": "wr-ext.warc", "conflictAction": "overwrite", "saveAs": false});
    event.preventDefault();
    return false;
  });

  document.querySelector("#delete").addEventListener("click", (event) => {
    self.caches.delete("wr-ext.cache").then((res) => console.log("deleted: " + res));
    chrome.runtime.sendMessage({"msg": "truncate"}, (response) => {
      console.log('truncated!');
      window.location.reload();
    });
    event.preventDefault();
    return false;
  });

  //navigator.serviceWorker.controller.postMessage({ "msg_type": "addColl", name: "archive", files: warcFiles });
  navigator.serviceWorker.controller.postMessage({ "msg_type": "addColl", name: "archive", cache: "wr-ext.cache" });
}

function renderColl(name, pageList) {
  const table = document.querySelector("#pages");
  table.innerHTML = "";

  if (!pageList) {
    table.innerHTML = "<i>No Archived Pages Yet</i>";
    return;
  }

  const list = document.createElement("ol");
  

  for (let page of pageList) {
    const ts = page.date.replace(/[-:T]/g, '').slice(0, 14);
    const date = page.date.replace('T', ' ').slice(0, 19);
    list.innerHTML += `<li><i>${date}</i> <b><a href="/replay/wabac/${name}/${ts}/${page.url}">${page.title}</a></b></li>`;
  }

  table.appendChild(list);
}



//window.addEventListener("swready", init);

init();


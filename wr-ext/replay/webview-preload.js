const { ipcRenderer } = require('electron');

const fetchUrls = {};

console.log("webview preload");

window.addEventListener("beforeunload", function() {});

ipcRenderer.on('async-fetch', async (event, data) => {
  console.log('async fetch: ' + data.url);

  if (fetchUrls[data.url]) {
    console.log('async fetch: already fetching, skipping: ' + data.url);
    return;
  }

  fetchUrls[data.url] = true;

  try {
    const resp = await fetch(data.url, {
      method: data.method,
      //headers: data.headers,
      body: data.hasPostData ? data.postData : null
    });
  } catch (e) {
    console.log('Fetch failed for: ' + data.url);
    console.log(e);
    fetchUrls[data.url] = false;
  }
});
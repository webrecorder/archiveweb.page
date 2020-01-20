var fetchUrls = {};
var banner = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.msg) {
    case "asyncFetch":
      doAsyncFetch(msg.req);
      break;

    case "startRecord":
      doStart(msg);
      break;

    case "stopRecord":
      doStop(msg);
      break;

    case "update":
      doUpdateStatus(msg);
      break;
  }
});

function doStart(msg) {
  console.log("Record Start");
  if (!banner) {
    banner = document.createElement("banner-div");
    banner.style.cssText = "top: 0px; left: 0px; position: fixed; width: 100%; padding: 10px 0 10px 8px; color: white; background-color: dodgerblue; font-size: 18px; z-index: 1000000";
    doUpdateStatus(msg);
    document.body.appendChild(banner);
  } else {
    banner.style.display = "";
  }
}

function doStop() {
  if (banner) {
    banner.style.display = "none";
  }
}

function doUpdateStatus(msg) {
  if (banner && msg.size != undefined) {
    banner.innerText = "Recording Size: " + msg.size;
  }
}

async function doAsyncFetch(data) {
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
}

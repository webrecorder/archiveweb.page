console.log('Content Script Started');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.msg) {
    case "asyncFetch":
      doAsyncFetch(request.req);
      break;
  }
});

function doAsyncFetch(data) {
  console.log('async fetch: ' + data.url);

  if (data.headers["Range"]) {
    if (data.headers["Range"] !== "bytes=0-") {
      console.log("Skipping with Range: " + data.headers["Range"]);
      return;
    }

    delete data.headers["Range"];
  }

  fetch(data.url, {
         method: data.method,
         //headers: data.headers,
         body: data.hasPostData ? data.postData : null
  });

}


function attachCDP(tabId) {
  chrome.debugger.attach({tabId: tabId}, '1.3', () => {
    startDebug(tabId);
  });
}

let requests = {};


async function startDebug(tabId) {
  //await send(tabId, "Network.enable");
  await send(tabId, "Fetch.enable", {patterns: [{urlPattern: "*", requestStage: "Response"}]});

  chrome.debugger.onEvent.addListener(async (dId, message, params) => {
    switch (message) {
      //case "Network.responseReceivedExtraInfo":
        //printHeaders(params);
      //break;

      //case "Network.responseReceived":
        //handleNetworkResponse(tabId, params);
      //break;

      case "Network.requestWillBeSent":
        handleNetworkRequestSent(params);
        break;

      case "Network.loadingFinished":
        await printPayload(params.requestId, tabId);
        break;

      case "Fetch.requestPaused":
        await handleResponse(tabId, params);
        break;
    }
  });
}

function handleNetworkRequestSent(params) {
  if (requests[params.requestId]) {
    requests[params.requestId].push({method: params.request.method, url: params.request.url});
  } else {
    requests[params.requestId] = [{method: params.request.method, url: params.request.url}];
  }
}

function handleNetworkResponse(params, tabId) {
  const response = params.response;
  const protocol = response.protocol || "HTTP/1.1";
  const statusLine = `${protocol} ${response.status} ${response.statusText}`;
}


async function printPayload(requestId, tabId) {
  const result = await send(tabId, "Network.getResponseBody", {"requestId": requestId});

  const requestArray = requests[requestId];
  console.log(requestArray);

  const request = (requestArray ? requestArray.shift() : null);

  let url = "";
  let method = "GET";
  let length = 0;

  if (request) {
    url = request.url;
    method = request.method;
    if (requests.length === 0) {
      delete requests[requestId];
    }
  }

  if (result && result.body) {
    length = result.body.length;
  }

  console.log(method + " " + url + " " + length);
}

function printHeaders(params) {
  console.log(params.headersText || params.headers);
}

async function handleResponseStream(tabId, params) {

  let body = '';

  try {
    const stream = await send(tabId, "Fetch.takeResponseBodyAsStream", {requestId: params.requestId});

    let total = 0;

    while (true) {
      const payload = await send(tabId, "IO.read", {"handle": stream.stream});

      const data = payload.base64Encoded ? atob(payload.data) : payload.data;

      body += data;

      //console.log("Read: "  + data.length);
      //total += length;

      if (payload.eof) {
        break;
      }
    }

    console.log(params.request.method + " " + params.request.url + " " + body.length);

  } catch (e) {
    console.log(params.request.method + " " + params.request.url + " No Payload");
  }

  try {
    body = btoa(body);
  } catch (e) {
    const ab = new TextEncoder("utf-8").encode(body);
    body = btoa(String.fromCharCode(...new Uint8Array(ab)));
  }

  //console.log(body);

  const res = await send(tabId, "Fetch.fulfillRequest", {
    requestId: params.requestId,
    responseCode: params.responseStatusCode,
    responseHeaders: params.responseHeaders,
    body: body
  });
}

async function handleResponse(tabId, params) {
  //console.log(params.request.method + " " + params.request.url);
  //console.log(params.request.headers);

  //console.log(params.responseStatusCode);
  //console.log(params.responseHeaders);

  let length = 0;

  try {
    const payload = await send(tabId, "Fetch.getResponseBody", {requestId: params.requestId});

    length = payload.base64Encoded ? atob(payload.body).length : payload.body.length;

    body = payload.body;
  } catch (e) {

  }

  console.log(params.request.method + " " + params.request.url + " -> " + params.responseStatusCode + " " + length);

  if (params.request.url.endsWith(".mp4")) {
    console.log(params.responseHeaders);
  }

  const res = await send(tabId, "Fetch.continueRequest", {requestId: params.requestId});
}


async function send(tabId, command, params) {
  return new Promise((resolve, reject) => {

    const callback = (res) => {
      if (res) {
        resolve(res);
      } else {
        reject(chrome.runtime.lastError.message);
      }
    }

    params = params || null;

    chrome.debugger.sendCommand({tabId: tabId}, command, params, callback);
  });
}



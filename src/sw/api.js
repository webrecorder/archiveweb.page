import { API } from '@webrecorder/wabac/src/api';

import { Downloader } from './downloader';
import { IPFSClient } from '@webrecorder/wabac/src/ipfs';

import { ipfsAddPin, ipfsAddWithReplay, ipfsUnpinAll } from '../utils';


// ===========================================================================
class ExtIPFSClient extends IPFSClient
{
  get initConfig() {
    return {
      Addresses: {
        Delegates: [
          '/dns4/node0.delegate.ipfs.io/tcp/443/https',
          '/dns4/node1.delegate.ipfs.io/tcp/443/https',
          '/dns4/node2.delegate.ipfs.io/tcp/443/https',
          '/dns4/node3.delegate.ipfs.io/tcp/443/https'
        ],
        Swarm: [
          '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
          '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
        ]
      }
    };
  }
}


// ===========================================================================
class ExtAPI extends API
{
  constructor(...args) {
    super(...args);
    this.ipfsClient = null;
  }

  async initIPFS() {
    if (!this.ipfsClient) {
      this.ipfsClient = new ExtIPFSClient();
      await this.ipfsClient.initIPFS();
    }
    return this.ipfsClient;
  }
  
  get routes() {
    return {
      ...super.routes,
      'downloadPages': ':coll/dl',
      'ipfsPin': [':coll/ipfs/pin', 'POST'],
      'ipfsUnpin': [':coll/ipfs/unpin', 'POST']
    };
  }

  async handleApi(request, params) {
    switch (params._route) {
      case "downloadPages":
        coll = await this.collections.loadColl(params.coll);
        if (!coll) {
          return {error: "collection_not_found"};
        }

        const pageQ = params._query.get("pages");
        const pageList = pageQ === "all" ? null : pageQ.split(",");

        const format = params._query.get("format") || "wacz";
        let filename = params._query.get("filename");

        return this.getDownloadResponse({coll, format, filename, pageList});

      case "ipfsPin":
        return await this.ipfsPinUnpin(params.coll, true);

      case "ipfsUnpin":
        return await this.ipfsPinUnpin(params.coll, false);
    }

    return await super.handleApi(request, params);
  }

  getDownloadResponse({coll, format = "wacz", filename = null, pageList = null}) {
    const dl = new Downloader(coll.store, pageList, coll.name, coll.config.metadata);

    // determine filename from title, if it exists
    if (!filename && coll.config.metadata.title) {
      filename = coll.config.metadata.title.toLowerCase().replace(/\s/g, "-");
    }
    if (!filename) {
      filename = "webarchive";
    }

    let resp = null;

    if (format === "wacz") {
      return dl.downloadWACZ(filename);
    } else if (format === "warc") {
      return dl.downloadWARC(filename);
    } else {
      return {"error": "invalid 'format': must be wacz or warc"};
    }
  }

  async ipfsPinUnpin(collId, isPin) {
    const coll = await this.collections.loadColl(collId);
    if (!coll) {
      return {error: "collection_not_found"};
    }

    const ipfsClient = await this.initIPFS();

    if (isPin) {
      const dlResponse = await this.getDownloadResponse({coll});

      if (!coll.config.metadata.ipfsPins) {
        coll.config.metadata.ipfsPins = [];
      }
      
      //const data = await ipfsAddPin(ipfsClient, dlResponse.filename, dlResponse.body);

      const replayIndex = `
<!doctype html>
<html class="no-overflow">
<head>
  <title>ReplayWeb.page</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="./ui.js"></script>
</head>
<body>
  <replay-app-main source="${dlResponse.filename}"></replay-app-main>
</body>
</html>
      `;

      const data = await ipfsAddWithReplay(ipfsClient, 
        dlResponse.filename, dlResponse.body, chrome.runtime.getURL("/replay/"),
          [{
            src: "sw.js",
            target: "sw.js"
          },
          {
            src: "ui.js",
            target: "ui.js"
          },
          {
            content: replayIndex,
            target: "index.html"
          }]
        )

      coll.config.metadata.ipfsPins.push(data);

      console.log("ipfs hash added " + data.url);

      await this.collections.updateMetadata(coll.name, coll.config.metadata);

      return {"ipfsURL": data.url};

    } else {
      if (coll.config.metadata.ipfsPins) {
        await ipfsUnpinAll(ipfsClient, coll.config.metadata.ipfsPins);

        coll.config.metadata.ipfsPins = null;

        await this.collections.updateMetadata(coll.name, coll.config.metadata);
      }

      return {"removed": true};
    }
  }
}

export { ExtAPI };
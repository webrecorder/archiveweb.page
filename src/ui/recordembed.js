
import { Embed } from "replaywebpage";


// ===========================================================================
class RecordEmbed extends Embed
{
  constructor() {
    super();

    this.replaybase = "./replay/";
    this.mainElementName = "archive-web-page-app";
    this.embed = "default";
    this.noWebWorker = true;

    this.proxyPrefix = "https://wabac-cors-proxy.webrecorder.workers.dev/proxy/";

    const baseUrl = new URL(window.location);
    baseUrl.hash = "";

    this.deepLink = true;

    this.coll = "test";

    this.customConfig = {
      "prefix": this.proxyPrefix, 
      "isLive": true,
      //"archivePrefix": this.archivePrefix,
      "baseUrl": baseUrl.href,
      "baseUrlHashReplay": false,
      "recording": true,
      "noPostToGet": true
    };

    this.source = "proxy://" + this.proxyPrefix;
  }

  doDownload() {
    const iframe = this.renderRoot.querySelector("iframe");
    if (!iframe) {
      return;
    }

    let downloaded = null;
    const p = new Promise((resolve) => { downloaded = resolve; });

    window.addEventListener("message", (event) => {
      if (typeof(event.data) === "object" && event.data.msg_type === "downloadedBlob") {
        downloaded(event.data.url);
      }
    }, {once: true});

    iframe.contentWindow.postMessage({msg_type: "downloadToBlob"});

    return p;
  }
}

// ===========================================================================
async function main() {
  customElements.define("record-web-page", RecordEmbed);
}

main();

export { RecordEmbed };

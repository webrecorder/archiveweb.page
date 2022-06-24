
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

    this.config = JSON.stringify({
      "prefix": this.proxyPrefix, 
      "isLive": true,
      //"archivePrefix": this.archivePrefix,
      "baseUrl": baseUrl.href,
      "baseUrlHashReplay": false,
      "recording": true,
      "noPostToGet": true
    });

    this.source = "proxy://" + this.proxyPrefix;
  }

  doUpload(destUrl) {
    const iframe = this.renderRoot.querySelector("iframe");
    if (iframe) {
      iframe.contentWindow.postMessage({msg_type: "upload", destUrl});
    }
  }
}

// ===========================================================================
async function main() {
  customElements.define("record-web-page", RecordEmbed);
}

main();

export { RecordEmbed };

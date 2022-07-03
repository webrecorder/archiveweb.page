
import { Embed } from "replaywebpage";

Embed.setDefaultReplayFile("replay.html");


// ===========================================================================
class RecordEmbed extends Embed
{
  constructor() {
    super();

    this.replaybase = "./replay/";
    this.replayfile = "record.html";
    this.mainElementName = "archive-web-page-app";
    this.embed = "default";
    this.noWebWorker = true;

    this.proxyPrefix = "https://wabac-cors-proxy.webrecorder.workers.dev/proxy/";

    const baseUrl = new URL(window.location);
    baseUrl.hash = "";

    this.customConfig = {
      "prefix": this.proxyPrefix, 
      "isLive": true,
      //"archivePrefix": this.archivePrefix,
      "baseUrl": baseUrl.href,
      "baseUrlHashReplay": false,
      "recording": true,
      "noPostToGet": true
    };

    this.downloaded = null;

    this.source = "proxy://" + this.proxyPrefix;
  }

  handleMessage(event) {
    if (this.downloaded && typeof(event.data) === "object" && event.data.msg_type === "downloadedBlob") {
      this.downloaded(event.data.url);
      this.downloaded = null;
    }
  }

  doDownload() {
    const iframe = this.renderRoot.querySelector("iframe");
    if (!iframe) {
      return;
    }

    const p = new Promise((resolve) => { this.downloaded = resolve; });

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

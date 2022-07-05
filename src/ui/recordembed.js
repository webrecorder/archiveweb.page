
import { Embed } from "replaywebpage";
import { setAppName } from "replaywebpage/src/pageutils";

import awpLogo from "../../assets/awp-logo.svg";

// ===========================================================================
Embed.setDefaultReplayFile("replay.html");
setAppName("Embeddded ArchiveWeb.page");


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
    this.archivePrefix = "";

    const baseUrl = new URL(window.location);
    baseUrl.hash = "";

    this.logo = awpLogo;

    this.customConfig = {
      "prefix": this.proxyPrefix, 
      "isLive": false,
      "archivePrefix": this.archivePrefix,
      "baseUrl": baseUrl.href,
      "baseUrlHashReplay": false,
      "recording": true,
      "noPostToGet": true
    };

    this.downloaded = null;

    this.source = "proxy://" + this.proxyPrefix;
  }

  static get properties() {
    return {
      ...Embed.properties,

      archivePrefix: { type: String },
      proxyPrefix: { type: String }
    };
  }

  updated(changedProperties) {
    if (changedProperties.has("proxyPrefix")) {
      this.customConfig.proxyPrefix = this.proxyPrefix;
    }
    if (changedProperties.has("archivePrefix")) {
      this.customConfig.archivePrefix = this.archivePrefix;
      this.customConfig.isLive = !this.archivePrefix;
    }
    super.updated(changedProperties);
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

import { Embed } from "replaywebpage";

import awpLogo from "../../assets/awp-logo.svg";

// ===========================================================================
Embed.setDefaultReplayFile("replay.html");

// ===========================================================================
class RecordEmbed extends Embed {
  constructor() {
    super();

    this.replaybase = "./replay/";
    this.replayfile = "record.html";
    this.mainElementName = "archive-web-page-app";
    this.appName = "Embedded ArchiveWeb.page";
    this.embed = "default";
    this.noWebWorker = true;

    // @ts-expect-error - TS2339 - Property 'proxyPrefix' does not exist on type 'RecordEmbed'.
    this.proxyPrefix =
      "https://wabac-cors-proxy.webrecorder.workers.dev/proxy/";
    // @ts-expect-error - TS2339 - Property 'archivePrefix' does not exist on type 'RecordEmbed'.
    this.archivePrefix = "";

    // @ts-expect-error - TS2345 - Argument of type 'Location' is not assignable to parameter of type 'string | URL'.
    const baseUrl = new URL(window.location);
    baseUrl.hash = "";

    // @ts-expect-error - TS2339 - Property 'logo' does not exist on type 'RecordEmbed'.
    this.logo = awpLogo;

    // @ts-expect-error - TS2339 - Property 'customConfig' does not exist on type 'RecordEmbed'.
    this.customConfig = {
      // @ts-expect-error - TS2339 - Property 'proxyPrefix' does not exist on type 'RecordEmbed'.
      prefix: this.proxyPrefix,
      isLive: false,
      // @ts-expect-error - TS2339 - Property 'archivePrefix' does not exist on type 'RecordEmbed'.
      archivePrefix: this.archivePrefix,
      baseUrl: baseUrl.href,
      baseUrlHashReplay: false,
      recording: true,
      noPostToGet: true,
    };

    // @ts-expect-error - TS2551 - Property 'downloaded' does not exist on type 'RecordEmbed'. Did you mean 'doDownload'?
    this.downloaded = null;

    // @ts-expect-error - TS2339 - Property 'source' does not exist on type 'RecordEmbed'. | TS2339 - Property 'proxyPrefix' does not exist on type 'RecordEmbed'.
    this.source = "proxy://" + this.proxyPrefix;
  }

  static get properties() {
    return {
      ...Embed.properties,

      archivePrefix: { type: String },
      proxyPrefix: { type: String },
    };
  }

  // @ts-expect-error - TS7006 - Parameter 'changedProperties' implicitly has an 'any' type.
  updated(changedProperties) {
    if (changedProperties.has("proxyPrefix")) {
      // @ts-expect-error - TS2339 - Property 'customConfig' does not exist on type 'RecordEmbed'. | TS2339 - Property 'proxyPrefix' does not exist on type 'RecordEmbed'.
      this.customConfig.proxyPrefix = this.proxyPrefix;
    }
    if (changedProperties.has("archivePrefix")) {
      // @ts-expect-error - TS2339 - Property 'customConfig' does not exist on type 'RecordEmbed'. | TS2339 - Property 'archivePrefix' does not exist on type 'RecordEmbed'.
      this.customConfig.archivePrefix = this.archivePrefix;
      // @ts-expect-error - TS2339 - Property 'customConfig' does not exist on type 'RecordEmbed'. | TS2339 - Property 'archivePrefix' does not exist on type 'RecordEmbed'.
      this.customConfig.isLive = !this.archivePrefix;
    }
    super.updated(changedProperties);
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  handleMessage(event) {
    if (
      // @ts-expect-error - TS2551 - Property 'downloaded' does not exist on type 'RecordEmbed'. Did you mean 'doDownload'?
      this.downloaded &&
      typeof event.data === "object" &&
      event.data.msg_type === "downloadedBlob"
    ) {
      // @ts-expect-error - TS2551 - Property 'downloaded' does not exist on type 'RecordEmbed'. Did you mean 'doDownload'?
      this.downloaded(event.data.url);
      // @ts-expect-error - TS2551 - Property 'downloaded' does not exist on type 'RecordEmbed'. Did you mean 'doDownload'?
      this.downloaded = null;
    }
  }

  doDownload() {
    const iframe = this.renderRoot.querySelector("iframe");
    if (!iframe) {
      return;
    }

    const p = new Promise((resolve) => {
      // @ts-expect-error - TS2551 - Property 'downloaded' does not exist on type 'RecordEmbed'. Did you mean 'doDownload'?
      this.downloaded = resolve;
    });

    // @ts-expect-error - TS2531 - Object is possibly 'null'.
    iframe.contentWindow.postMessage({ msg_type: "downloadToBlob" });

    return p;
  }
}

// ===========================================================================
async function main() {
  customElements.define("record-web-page", RecordEmbed);
}

main();

export { RecordEmbed };

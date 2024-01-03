import { Embed } from "replaywebpage";

import awpLogo from "../../assets/awp-logo.svg";

// ===========================================================================
Embed.setDefaultReplayFile("replay.html");

// ===========================================================================
class RecordEmbed extends Embed {
  constructor() {
    super();

    // @ts-expect-error - TS2339 - Property 'replaybase' does not exist on type 'RecordEmbed'.
    this.replaybase = "./replay/";
    // @ts-expect-error - TS2339 - Property 'replayfile' does not exist on type 'RecordEmbed'.
    this.replayfile = "record.html";
    // @ts-expect-error - TS2339 - Property 'mainElementName' does not exist on type 'RecordEmbed'.
    this.mainElementName = "archive-web-page-app";
    // @ts-expect-error - TS2339 - Property 'appName' does not exist on type 'RecordEmbed'.
    this.appName = "Embedded ArchiveWeb.page";
    // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'RecordEmbed'.
    this.embed = "default";
    // @ts-expect-error - TS2339 - Property 'noWebWorker' does not exist on type 'RecordEmbed'.
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
    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'RecordEmbed'.
    const iframe = this.renderRoot.querySelector("iframe");
    if (!iframe) {
      return;
    }

    const p = new Promise((resolve) => {
      // @ts-expect-error - TS2551 - Property 'downloaded' does not exist on type 'RecordEmbed'. Did you mean 'doDownload'?
      this.downloaded = resolve;
    });

    iframe.contentWindow.postMessage({ msg_type: "downloadToBlob" });

    return p;
  }
}

// ===========================================================================
async function main() {
  // @ts-expect-error - TS2345 - Argument of type 'typeof RecordEmbed' is not assignable to parameter of type 'CustomElementConstructor'.
  customElements.define("record-web-page", RecordEmbed);
}

main();

export { RecordEmbed };

import { property } from "lit/decorators.js";
import { Embed, apiPrefix } from "replaywebpage";

//import awpLogo from "../assets/brand/archivewebpage-icon-color.svg";

// ===========================================================================
Embed.setDefaultReplayFile("replay.html");

type AWPFinishEvent = {
  type: "awp-finish";
  downloadUrl: string;
};

type LiveProxyURLErrorEvent = {
  type: "live-proxy-url-error";
  url: string;
  status: number;
};

// ===========================================================================
export class RecordEmbed extends Embed {
  @property({ type: String })
  proxyPrefix = "https://wabac-cors-proxy.webrecorder.workers.dev/proxy/";

  @property({ type: String })
  archivePrefix = "";

  source: string;

  constructor() {
    super();

    this.replaybase = "./replay/";
    this.replayfile = "record.html";
    this.mainElementName = "archive-web-page-app";
    this.appName = "Embedded ArchiveWeb.page";
    this.embed = "default";
    this.noWebWorker = true;

    this.coll = this.randomId();

    const baseUrl = new URL(window.location.href);
    baseUrl.hash = "";

    this.customConfig = {
      prefix: this.proxyPrefix,
      isLive: false,
      archivePrefix: this.archivePrefix,
      baseUrl: baseUrl.href,
      baseUrlHashReplay: false,
      recording: true,
      noPostToGet: true,
      messageOnProxyErrors: true,
    };

    this.source = "proxy://" + this.proxyPrefix;
  }

  static get properties() {
    return {
      ...Embed.properties,

      archivePrefix: { type: String },
      proxyPrefix: { type: String },
    };
  }

  randomId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  firstUpdated(): void {
    window.addEventListener("beforeunload", () => {
      this.deleteColl();
    });

    this.customConfig!.archivePrefix = this.archivePrefix;
    this.customConfig!.isLive = !this.archivePrefix;
    this.customConfig!.prefix = this.proxyPrefix;
    this.source = "proxy://" + this.proxyPrefix;

    super.firstUpdated();
  }

  async deleteColl() {
    if (this.coll) {
      await fetch(`w/api/c/${this.coll}`, { method: "DELETE" });
    }
  }

  getDownloadUrl() {
    return `${apiPrefix}/c/${this.coll}/dl?format=wacz&pages=all`;
  }

  handleMessage(event: MessageEvent) {
    const iframe = this.renderRoot.querySelector("iframe");

    if (iframe && event.source === iframe.contentWindow) {
      switch (event.data.type) {
        case "awp-finish":
          this.dispatchEvent(
            new CustomEvent<AWPFinishEvent>("awp-finish", {
              detail: event.data,
            }),
          );
          break;

        case "live-proxy-url-error":
          this.dispatchEvent(
            new CustomEvent<LiveProxyURLErrorEvent>("live-proxy-url-error", {
              detail: event.data,
            }),
          );
          break;

        default:
          return super.handleMessage(event);
      }
    }
  }
}

// ===========================================================================
function main() {
  customElements.define("archive-web-page", RecordEmbed);
}

main();

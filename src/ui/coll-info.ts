import { html, css, wrapCss, apiPrefix } from "replaywebpage/src/misc";

import prettyBytes from "pretty-bytes";

import fasDownload from "@fortawesome/fontawesome-free/svgs/solid/download.svg";
import fasUpload from "@fortawesome/fontawesome-free/svgs/solid/upload.svg";
import fasSync from "@fortawesome/fontawesome-free/svgs/solid/sync-alt.svg";
import fasCheck from "@fortawesome/fontawesome-free/svgs/solid/check-circle.svg";
import fasCopy from "@fortawesome/fontawesome-free/svgs/regular/copy.svg";
import fasCaretUp from "@fortawesome/fontawesome-free/svgs/solid/caret-up.svg";
import fasShare from "@fortawesome/fontawesome-free/svgs/solid/share.svg";
import fasReshare from "@fortawesome/fontawesome-free/svgs/solid/retweet.svg";
import fasX from "@fortawesome/fontawesome-free/svgs/solid/times.svg";

import btrixCloud from "../../assets/btrix-cloud.svg";

import { CollInfo } from "replaywebpage";
import wrRec from "../../assets/recLogo.svg";

const REPLAY_URL = "https://replayweb.page/";

//============================================================================
class WrRecCollInfo extends CollInfo {
  constructor() {
    super();
    this.detailed = false;
    this.ipfsURL = null;
    this.shareWait = false;
    this.showShareMenu = false;
    this.shareWarn = false;
    this.shareProgressSize = 0;
    this.shareProgressTotalSize = 0;
  }

  static get properties() {
    return {
      coll: { type: Object },
      detailed: { type: Boolean },
      ipfsURL: { type: String },
      shareWait: { type: Boolean },
      showShareMenu: { type: Boolean },
      shareWarn: { type: Boolean },
      shareProgressSize: { type: Number },
      shareProgressTotalSize: { type: Number },

      isUploadNeeded: { type: Boolean },

      shareOpts: { type: Object },
      btrixOpts: { type: Object },
      ipfsOpts: { type: Object },
    };
  }

  static get styles() {
    return wrapCss(WrRecCollInfo.compStyles);
  }

  static get compStyles() {
    return css`
      :host {
        overflow: visible;
      }

      .columns {
        width: 100%;
      }
      .column {
        word-break: break-word;
        position: relative;
      }

      :host {
        width: 100%;
        height: 100%;
        min-width: 0px;
      }

      :host(.is-list) .columns {
        display: flex !important;
        flex-direction: column;
      }

      :host(.is-list) .column {
        width: 100% !important;
      }

      .minihead {
        font-size: 10px;
        font-weight: bold;
      }

      .button-row {
        align-items: center;
        flex-wrap: wrap;
      }

      .button-row *:not(:last-child) {
        margin-right: 0.5em;
      }

      .progress.is-small.mini {
        height: 2px;
        margin-top: 2px;
        width: calc(100% - 0.5em);
      }

      ${CollInfo.compStyles}
    `;
  }

  firstUpdated() {
    this.renderRoot.addEventListener(
      "click",
      () => (this.showShareMenu = false),
    );

    this.isUploadNeeded =
      this.coll &&
      this.coll.uploadTime &&
      this.coll.mtime > this.coll.uploadTime;
  }

  updated(changedProps) {
    if (changedProps.has("shareOpts") && this.shareOpts) {
      const { ipfsOpts, btrixOpts } = this.shareOpts;
      this.ipfsOpts = ipfsOpts;
      this.btrixOpts = btrixOpts;
    }

    if (changedProps.has("coll") && this.coll) {
      // Fix for loading single collection from previous versions
      if (
        this.coll.id === "main.archive" &&
        this.coll.sourceUrl !== "local://main.archive"
      ) {
        this.coll = { ...this.coll, sourceUrl: "local://main.archive" };
      }

      if (this.coll.ipfsPins && this.coll.ipfsPins.length) {
        this.ipfsURL = this.coll.ipfsPins[this.coll.ipfsPins.length - 1].url;
      }

      this.isUploadNeeded =
        this.coll &&
        this.coll.uploadTime &&
        this.coll.mtime > this.coll.uploadTime;
    }
  }

  render() {
    const coll = this.coll;
    const detailed = this.detailed;

    const hasUpload = !!this.btrixOpts;
    const hasIpfs = !!this.ipfsOpts && this.ipfsOpts.daemonUrl;

    return html`
      <div class="columns">
        <div class="column is-2">
          <p class="minihead">Name</p>
          <span class="subtitle has-text-weight-bold">
            ${detailed
              ? html` ${coll.title} `
              : html` <a href="?source=${encodeURIComponent(coll.sourceUrl)}"
                  >${coll.title}</a
                >`}
          </span>
        </div>

        <div class="column is-2">
          <p class="minihead">Date Created</p>
          ${coll.ctime ? new Date(coll.ctime).toLocaleString() : ""}
        </div>
        <div class="column is-1">
          <p class="minihead">Total Size</p>
          ${prettyBytes(Number(coll.size || 0))}
        </div>

        <div class="column is-2">
          <p class="minihead">Actions</p>
          <div class="button-row is-flex">
            <a
              href="${apiPrefix}/c/${this.coll.id}/dl?format=wacz&pages=all"
              class="button is-small"
              title="Download"
            >
              <span class="icon is-small">
                <fa-icon aria-hidden="true" .svg="${fasDownload}"></fa-icon>
              </span>
            </a>
            <button
              @click="${this.onShowImport}"
              class="button is-small"
              title="Import File"
            >
              <span class="icon">
                <fa-icon aria-hidden="true" .svg="${fasUpload}"></fa-icon>
              </span>
            </button>
            <button
              @click="${this.onShowStart}"
              class="button is-small"
              title="Start Archiving"
            >
              <span class="icon">
                <fa-icon aria-hidden="true" .svg="${wrRec}"></fa-icon>
              </span>
            </button>
          </div>
        </div>

        ${hasUpload
          ? html`
              <div class="column is-1">
                <p class="minihead">Upload</p>
                <div class="button-row is-flex">
                  ${hasUpload ? this.renderBtrixUpload() : ""}
                </div>
              </div>
            `
          : html` <div class="column"></div> `}
        ${hasIpfs
          ? html`
        </div>
          <div class="column">
          <p class="minihead">Share (via IPFS)</p>
          <div class="button-row is-flex">
          ${hasIpfs ? this.renderIPFSSharing() : ""}
          </div>
        </div>
        `
          : ""}
        ${coll.loadUrl
          ? html` <div class="column is-3">
              <p class="minihead">Imported From</p>
              ${coll.loadUrl}
              <a @click="${(e) => this.onCopy(e, coll.loadUrl)}" class="copy"
                ><fa-icon .svg="${fasCopy}"
              /></a>
            </div>`
          : ""}
      </div>
      ${this.shareWarn ? this.renderShareWarn() : ""}
    `;
  }

  renderIPFSSharing() {
    return this.ipfsURL
      ? html`
      <div class="is-flex is-flex-direction-column">
        <div class="dropdown is-up ${this.showShareMenu ? "is-active" : ""}">
          <div class="dropdown-trigger">
            <button @click="${
              this.onShowShareMenu
            }" class="button is-link is-light is-small ${
              this.shareWait ? "is-loading" : ""
            }"" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Sharing!</span>
              <span class="icon">
                <fa-icon .svg=${fasCaretUp}></fa-icon>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu" style="z-index: 100">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <i class="is-size-7">${
                  (this.ipfsOpts && this.ipfsOpts.message) || ""
                }</i>
              </div>
              <hr class="dropdown-divider"/>
              <a @click="${this.onPin}" class="dropdown-item">
                <span class="icon is-small">
                  <fa-icon .svg="${fasReshare}"></fa-icon>
                </span>
                Reshare Latest
              </a>
              <hr class="dropdown-divider"/>
              <a @click="${this.onCopyIPFSLink}" class="dropdown-item">
                <span class="icon is-small">
                  <fa-icon size="0.8em" .svg="${fasShare}"></fa-icon>
                </span>
                Copy IPFS URL
              </a>
              <a @click="${
                this.onCopyGatewayLink
              }" class="has-text-weight-bold dropdown-item">
                <span class="icon is-small">
                  <fa-icon size="0.8em" .svg="${fasShare}"></fa-icon>
                </span>
                Copy Gateway Link
              </a>
              <a @click="${this.onCopyRWPLink}" class="dropdown-item">
                <span class="icon is-small">
                  <fa-icon size="0.8em" .svg="${fasShare}"></fa-icon>
                </span>
                Copy Shareable ReplayWeb.page Link
              </a>
            </div>
          </div>
        </div>
        <progress value="${this.shareProgressSize}" max="${
          this.shareProgressTotalSize
        }" class="progress is-small ${
          this.shareProgressTotalSize ? "mini" : "is-hidden"
        }"></progress>
      </div>

      <button class="button is-small" @click="${this.onUnpin}">
        <span class="icon is-small">
          <fa-icon .svg="${fasX}"></fa-icon>
        </span>
        <span>Stop Sharing</span>
      </button>

      `
      : html`
          <div class="is-flex is-flex-direction-column">
            <button
              class="button is-small ${this.shareWait ? "is-loading" : ""}"
              @click="${this.onPinOrWarn}"
            >
              <span class="icon is-small">
                <fa-icon .svg="${fasShare}"></fa-icon>
              </span>
              <span>Start</span>
            </button>
            <progress
              value="${this.shareProgressSize}"
              max="${this.shareProgressTotalSize}"
              class="progress is-small ${this.shareProgressTotalSize
                ? "mini"
                : "is-hidden"}"
            ></progress>
          </div>
        `;
  }

  renderBtrixUpload() {
    const { uploadId, uploadTime } = this.coll;

    return html`
      <div class="is-flex is-flex-direction-column">
        <button
          @click="${this.onUpload}"
          class="button is-small"
          title="Upload to Cloud"
        >
          <span class="icon">
            ${uploadTime && uploadId
              ? !this.isUploadNeeded
                ? html`
                    <fa-icon
                      aria-hidden="true"
                      class="has-text-success"
                      .svg="${fasCheck}"
                    ></fa-icon>
                  `
                : html`
                    <fa-icon
                      aria-hidden="true"
                      class="has-text-warning-dark"
                      .svg="${fasSync}"
                    ></fa-icon>
                  `
              : html`
                  <fa-icon
                    aria-hidden="true"
                    size="2.2em"
                    .svg="${btrixCloud}"
                  ></fa-icon>
                `}
          </span>
        </button>
      </div>
    `;
  }

  renderShareWarn() {
    return html` <wr-modal
      bgClass="has-background-warning"
      @modal-closed="${() => (this.shareWarn = false)}"
      title="Start Sharing?"
    >
      <div class="content is-size-7">
        <p>
          Do you want to share all the content in "<i>${this.coll.title}</i>"
          via IPFS, a peer-to-peer distributed storage network?
        </p>
        <p>
          Your archiving session will have a unique link which can be shared
          with others to load and replay on-demand in ReplayWeb.page. This
          feature is experimental and likely works best with smaller archives.
        </p>
        <p>You can cancel sharing at any time.</p>
        <p>
          <b
            >Once shared, this data leaves your computer and can be read by
            others.</b
          >
        </p>
        <p>If you do not wish to share this data, click Cancel.</p>
      </div>
      <div class="content">
        <label class="checkbox" for="sharewarn">
          <input @change="${this.toggleShareWarn}" type="checkbox" />
          Don't show this message again
        </label>
      </div>
      <button @click="${this.onPin}" class="button is-primary">Share</button>
      <button @click="${() => (this.shareWarn = false)}" class="button">
        Cancel
      </button>
    </wr-modal>`;
  }

  onShowImport() {
    const coll = this.coll.id;
    const title = this.coll.title;
    this.dispatchEvent(
      new CustomEvent("show-import", {
        bubbles: true,
        composed: true,
        detail: { coll, title },
      }),
    );
  }

  async onShowShareMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    this.showShareMenu = !this.showShareMenu;
  }

  onShowStart() {
    const coll = this.coll.id;
    const title = this.coll.title;
    this.dispatchEvent(
      new CustomEvent("show-start", {
        bubbles: true,
        composed: true,
        detail: { coll, title },
      }),
    );
  }

  toggleShareWarn(event) {
    localStorage.setItem(
      "nosharewarn",
      event.currentTarget.checked ? "1" : "0",
    );
  }

  onPinOrWarn() {
    if (localStorage.getItem("nosharewarn") === "1") {
      this.onPin();
    } else {
      this.shareWarn = true;
    }
  }

  async onPin() {
    this.shareWarn = false;

    this.shareWait = true;

    try {
      const { ipfsURL } = await this.ipfsAdd();

      this.ipfsURL = ipfsURL;

      this.onCopyGatewayLink();
    } catch (e) {
      console.log("ipfs share failed");
      this.dispatchEvent(
        new CustomEvent("ipfs-share-failed", { bubbles: true, composed: true }),
      );
    }

    this.shareWait = false;
  }

  async onUnpin() {
    this.shareWait = true;
    const { removed } = await this.ipfsRemove();

    if (removed) {
      this.ipfsURL = null;
    } else {
      this.dispatchEvent(
        new CustomEvent("ipfs-share-failed", { bubbles: true, composed: true }),
      );
    }
    this.shareWait = false;
  }

  ipfsAdd() {
    this.dispatchEvent(
      new CustomEvent("ipfs-share", { detail: { pending: true } }),
    );

    //let id = 0;
    let pc;

    const p = new Promise((resolve, reject) => (pc = { resolve, reject }));

    const listener = (event) => {
      const { data } = event;

      if (!data || data.collId !== this.coll.id) {
        return;
      }

      switch (data.type) {
        case "ipfsProgress":
          this.shareProgressSize = data.size;
          this.shareProgressTotalSize = data.totalSize || this.coll.size;
          break;

        case "ipfsAdd":
          this.shareProgressSize = 0;
          this.shareProgressTotalSize = 0;
          if (data.result) {
            pc.resolve(data.result);
          } else {
            pc.reject();
          }
          this.dispatchEvent(
            new CustomEvent("ipfs-share", { detail: { pending: false } }),
          );

          navigator.serviceWorker.removeEventListener("message", listener);
          break;
      }
    };

    navigator.serviceWorker.addEventListener("message", listener);

    fetch(`${apiPrefix}/c/${this.coll.id}/ipfs`, {
      method: "POST",
      body: JSON.stringify({
        ipfsDaemonUrl: this.ipfsOpts.daemonUrl,
        gzip: false,
        customSplits: true,
      }),
    }).then((res) => {
      if (!res.ok) {
        pc.reject();
      }
    });

    return p;
  }

  async ipfsRemove() {
    const resp = await fetch(`${apiPrefix}/c/${this.coll.id}/ipfs`, {
      method: "DELETE",
      body: JSON.stringify({
        ipfsDaemonUrl: this.ipfsOpts.daemonUrl,
      }),
    });

    return await resp.json();
  }

  onCopyRWPLink() {
    const params = new URLSearchParams();
    params.set("source", this.ipfsURL);
    const url = REPLAY_URL + params.toString();

    this.showShareMenu = false;
    navigator.clipboard.writeText(url);
  }

  onCopyGatewayLink() {
    const hash = this.ipfsURL.split("/")[2];
    const url = this.ipfsOpts.gatewayUrl + hash + "/";

    this.showShareMenu = false;
    navigator.clipboard.writeText(url);
  }

  onCopyIPFSLink() {
    const ipfsPath = this.ipfsURL.slice(0, this.ipfsURL.lastIndexOf("/") + 1);

    this.showShareMenu = false;
    navigator.clipboard.writeText(ipfsPath);
  }

  onUpload() {
    const detail = { coll: this.coll, isUploadNeeded: this.isUploadNeeded };
    this.dispatchEvent(
      new CustomEvent("do-upload", { bubbles: true, composed: true, detail }),
    );
  }

  async doDelete() {
    if (this.coll.ipfsPins && this.coll.ipfsPins.length) {
      await this.ipfsRemove();
    }

    const resp = await fetch(`${apiPrefix}/c/${this.coll.id}`, {
      method: "DELETE",
    });
    if (resp.status === 200) {
      const json = await resp.json();
      this.colls = json.colls;
    }
  }
}

customElements.define("wr-rec-coll-info", WrRecCollInfo);

export { WrRecCollInfo, wrRec };

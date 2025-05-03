import { html, css, wrapCss, IS_APP, apiPrefix } from "replaywebpage";

// replaywebpage imports
import { ReplayWebApp, Embed, Loader } from "replaywebpage";

import { SWManager } from "replaywebpage";

import fasHelp from "@fortawesome/fontawesome-free/svgs/solid/question-circle.svg";
import fasPlus from "@fortawesome/fontawesome-free/svgs/solid/plus.svg";

import fasUpload from "@fortawesome/fontawesome-free/svgs/solid/upload.svg";
import fasCog from "@fortawesome/fontawesome-free/svgs/solid/cog.svg";

import "./coll";
import "./coll-info";
import "./recordembed";
import "./coll-index";

import { BtrixClient } from "./upload";

import wrRec from "../assets/icons/recLogo.svg";
import awpLogo from "../assets/brand/archivewebpage-icon-color.svg";
import awpBrandLockupColor from "../assets/brand/archivewebpage-lockup-color.svg";
import prettyBytes from "pretty-bytes";

import {
  create as createAutoIpfs,
  DaemonAPI,
  Web3StorageAPI,
  // @ts-expect-error - TS7016 - Could not find a declaration file for module 'auto-js-ipfs'. '/Users/emma/Work/Webrecorder/archiveweb.page/node_modules/auto-js-ipfs/index.js' implicitly has an 'any' type.
} from "auto-js-ipfs";
import { getLocalOption, setLocalOption } from "../localstorage";
import { type BtrixOpts } from "../types";

const VERSION = __AWP_VERSION__;

const DEFAULT_GATEWAY_URL = "https://w3s.link/ipfs/";

const DEFAULT_BTRIX_URL = "https://app.browsertrix.com";

//============================================================================
class ArchiveWebApp extends ReplayWebApp {
  showCollDrop: boolean;
  colls: { id: string; title?: string; loadUrl?: string }[];
  autorun: boolean;
  settingsError: string;
  settingsTab: string;
  ipfsOpts: {
    daemonUrl: string;
    message?: string;
    useCustom: boolean;
    autoDetect: boolean;
    gatewayUrl: string;
  };
  btrixOpts: BtrixOpts | null;
  loadedCollId?: string | null;
  showImport?: boolean;

  archiveCookies: boolean | null = null;
  archiveStorage: boolean | null = null;
  archiveFlash: boolean | null = null;
  archiveScreenshots: boolean | null = null;
  archivePDF: boolean | null = null;

  showIpfsShareFailed = false;

  constructor() {
    super();

    this.navMenuShown = false;
    this.showCollDrop = false;
    this.colls = [];
    this.autorun = false;

    this.settingsError = "";

    this.settingsTab = localStorage.getItem("settingsTab") || "prefs";

    try {
      const res = localStorage.getItem("ipfsOpts");
      this.ipfsOpts = JSON.parse(res!);
    } catch (e) {
      // ignore empty
    }

    this.ipfsOpts ||= {
      daemonUrl: "",
      message: "",
      useCustom: false,
      autoDetect: false,
      gatewayUrl: DEFAULT_GATEWAY_URL,
    };

    try {
      const res = localStorage.getItem("btrixOpts");
      // @ts-expect-error - TS2339 - Property 'btrixOpts' does not exist on type 'ArchiveWebApp'. | TS2345 - Argument of type 'string | null' is not assignable to parameter of type 'string'.
      this.btrixOpts = JSON.parse(res);
      this.doBtrixLogin();
    } catch (e) {
      this.btrixOpts = null;
    }

    if (window.archivewebpage) {
      // @ts-expect-error - TS7006 - Parameter 'progress' implicitly has an 'any' type.
      window.archivewebpage.setDownloadCallback((progress) =>
        this.onDownloadProgress(progress),
      );
    }

    void this.initOpts();
  }

  async initOpts() {
    this.autorun = (await getLocalOption("autorunBehaviors")) === "1";

    const archiveCookies = await getLocalOption("archiveCookies");

    // default to true if unset to match existing behavior
    if (archiveCookies === null || archiveCookies === undefined) {
      await setLocalOption("archiveCookies", "1");
      this.archiveCookies = true;
    } else {
      this.archiveCookies = archiveCookies === "1";
    }

    this.archiveStorage = (await getLocalOption("archiveStorage")) === "1";

    this.archiveFlash = (await getLocalOption("archiveFlash")) === "1";

    const archiveScreenshots = await getLocalOption("archiveScreenshots");

    // default to true if unset to enable screenshots!
    if (archiveScreenshots === null || archiveScreenshots === undefined) {
      await setLocalOption("archiveScreenshots", "1");
      this.archiveScreenshots = true;
    } else {
      this.archiveScreenshots = archiveScreenshots === "1";
    }

    this.archivePDF = (await getLocalOption("archivePDF")) === "1";
  }

  async doBtrixLogin() {
    try {
      // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2345 - Argument of type 'BtrixOpts | null' is not assignable to parameter of type '{ url: any; username: any; password: any; orgName: any; }'.
      this.btrixOpts.client = await BtrixClient.login(this.btrixOpts);
    } catch (e) {
      this.btrixOpts = null;
    }
  }

  get appName() {
    return "ArchiveWeb.page";
  }

  static get properties() {
    return {
      ...ReplayWebApp.properties,

      showStartRecord: { type: Boolean },
      showCollDrop: { type: Boolean },
      colls: { type: Array },
      selCollId: { type: String },
      selCollTitle: { type: String },
      recordUrl: { type: String },
      autorun: { type: Boolean },

      showNew: { type: String },
      showImport: { type: Boolean },
      isImportExisting: { type: Boolean },

      loadedCollId: { type: String },

      showDownloadProgress: { type: Boolean },
      download: { type: Object },

      ipfsOpts: { type: Object },
      btrixOpts: { type: Object },

      uploadCollOpts: { type: Object },

      showSettings: { type: Boolean },
      settingsTab: { type: String },
      settingsError: { type: String },

      showIpfsShareFailed: { type: Boolean },
    };
  }

  initRoute() {
    const pageParams = new URLSearchParams(window.location.search);

    if (pageParams.has("config")) {
      super.initRoute();

      this.handleMessages();
    } else {
      this.inited = true;
      this.sourceUrl = pageParams.get("source") || "";
    }

    if (!this.embed) {
      this.checkIPFS();
    }
  }

  async checkSW() {
    const regs = await navigator.serviceWorker.getRegistrations();
    // Remove double SW
    for (const reg of regs) {
      if (reg.active && reg.active.scriptURL.endsWith("/replay/sw.js")) {
        if (await reg.unregister()) {
          self.location.reload();
        }
      }
    }

    // For App: If no SW, register here
    if (IS_APP && !regs.length) {
      const qp = new URLSearchParams();
      qp.set("injectScripts", "ruffle/ruffle.js");

      this.swmanager = new SWManager({
        name: this.swName + "?" + qp.toString(),
        appName: this.appName,
      });
      this.swmanager
        .register()
        .catch(
          () =>
            (this.swErrorMsg =
              this.swmanager?.renderErrorReport(this.mainLogo) || ""),
        );
    }
  }

  firstUpdated() {
    this.embed = this.pageParams.get("embed") || "";

    if (this.embed) {
      return super.firstUpdated();
    }

    this.checkSW();

    this.initRoute();

    window.addEventListener("popstate", () => {
      this.initRoute();
    });
  }

  handleMessages() {
    // support upload
    window.addEventListener("message", async (event) => {
      if (
        this.embed &&
        this.loadedCollId &&
        typeof event.data === "object" &&
        event.data.msg_type === "downloadToBlob"
      ) {
        const download = await fetch(
          `${apiPrefix}/c/${this.loadedCollId}/dl?format=wacz&pages=all`,
        );
        const blob = await download.blob();
        event.source?.postMessage({
          msg_type: "downloadedBlob",
          coll: this.loadedCollId,
          url: URL.createObjectURL(blob),
        });
      }
    });
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onStartLoad(event) {
    if (this.embed) {
      return;
    }

    this.showImport = false;
    this.sourceUrl = event.detail.sourceUrl;
    this.loadInfo = event.detail;

    // @ts-expect-error - TS2339 - Property 'isImportExisting' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'.
    if (this.isImportExisting && this.selCollId) {
      // @ts-expect-error - TS2339 - Property 'loadInfo' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'.
      this.loadInfo.importCollId = this.selCollId;
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onCollLoaded(event) {
    if (this.loadInfo?.importCollId) {
      if (navigator.serviceWorker.controller) {
        const msg = {
          msg_type: "reload",
          full: true,
          name: this.loadInfo.importCollId,
        };
        navigator.serviceWorker.controller.postMessage(msg);
      }
    }

    if (this.embed) {
      this.loadedCollId = event.detail.collInfo?.coll;
    }

    super.onCollLoaded(event);

    if (
      !event.detail.alreadyLoaded &&
      event.detail.sourceUrl &&
      event.detail.sourceUrl !== this.sourceUrl
    ) {
      this.sourceUrl = event.detail.sourceUrl;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLoadInfo(sourceUrl: string): any {
    this.disableCSP();

    if (this.loadInfo) {
      return this.loadInfo;
    }

    const customColl = sourceUrl.startsWith("local://")
      ? sourceUrl.slice("local://".length)
      : sourceUrl;

    return { customColl };
  }

  async disableCSP() {
    // necessary for chrome 94> up due to new bug introduced
    //
    // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'. | TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
    if (this.embed || !self.chrome?.runtime) {
      return;
    }

    const m = navigator.userAgent.match(/Chrome\/([\d]+)/);
    if (!m || Number(m[1]) < 94) {
      return;
    }

    console.log("attempt to disable CSP to ensure replay works");
    const tabId = await new Promise((resolve) => {
      // @ts-expect-error - TS7006 - Parameter 'msg' implicitly has an 'any' type.
      chrome.tabs.getCurrent((msg) => resolve(msg.id));
    });

    chrome.runtime.sendMessage({
      msg: "disableCSP",
      tabId,
    });
  }

  static get styles() {
    return wrapCss(ArchiveWebApp.appStyles);
  }

  static get appStyles() {
    return wrapCss(css`
      :host {
        font-size: initial;
        overflow: auto;
      }

      wr-rec-coll {
        height: 100%;
        width: 100%;
      }

      .recorder .modal-background {
        background-color: rgba(10, 10, 10, 0.5);
      }

      .recorder .modal-card-head {
        background-color: #97a1ff;
      }

      .extra-padding {
        padding: 1em;
      }

      .less-padding {
        padding-top: 1em;
        padding-bottom: 1em;
      }

      div.field.has-addons {
        flex: auto;
      }

      form {
        flex-grow: 1;
        flex-shrink: 0;
        margin: 0px;
      }

      .dropdown-row {
        display: flex;
        align-items: center;
        margin-bottom: 0.5em;
      }

      .infomsg {
        max-width: 300px;
        padding-right: 8px;
      }

      .rightbar {
        margin-left: auto;
        display: flex;
      }

      .dl-progress {
        display: flex;
        flex-direction: column;
      }

      @media screen and (max-width: 768px) {
        #url {
          border-bottom-right-radius: 4px;
          border-top-right-radius: 4px;
        }

        .no-pad-mobile {
          padding-right: 2px;
        }
      }

      ${ReplayWebApp.appStyles}
    `);
  }

  // HACK: returns the logo requested by ReplayWeb.page's nav as nothing now that the new logo includes both graphics and text. Probably best to refactor this behavior.
  get mainLogo() {
    return "";
  }

  renderNavEnd() {
    return html`<a
        href="https://archiveweb.page/guide"
        target="_blank"
        class="navbar-item is-size-6"
      >
        <fa-icon .svg="${fasHelp}" aria-hidden="true"></fa-icon
        ><span>&nbsp;User Guide</span>
      </a>
      <a
        href="?about"
        @click="${
          // @ts-expect-error - TS7006 - Parameter 'e' implicitly has an 'any' type.
          (e) => {
            e.preventDefault();
            this.showAbout = true;
          }
        }"
        class="navbar-item is-size-6"
        >About
      </a>`;
  }

  renderNavBrand() {
    return html` <fa-icon
      .svg="${awpBrandLockupColor}"
      size=""
      width="9.5rem"
      height="1.25rem"
      aria-hidden="true"
    ></fa-icon>`;
  }

  renderHomeIndex() {
    return html`
      <section class="section less-padding">
        <div class="message is-small">
          <div class="message-body">
            <div class="buttons">
              <button
                class="button is-small no-pad-mobile"
                title="New Archiving Session"
                @click="${
                  // @ts-expect-error - TS2339 - Property 'showNew' does not exist on type 'ArchiveWebApp'.
                  () => (this.showNew = "show")
                }"
              >
                <span class="icon">
                  <fa-icon .svg=${fasPlus}></fa-icon>
                </span>
                <span class="is-hidden-mobile">New Archiving Session</span>
              </button>
              <button
                class="button is-small no-pad-mobile"
                title="Import File"
                @click="${() => (this.showImport = true)}"
              >
                <span class="icon">
                  <fa-icon .svg=${fasUpload}></fa-icon>
                </span>
                <span class="is-hidden-mobile">Import File</span>
              </button>
              <button
                class="button is-small no-pad-mobile"
                title="Start Archiving"
                ?disabled="${!this.colls}"
                @click="${this.onShowStart}"
              >
                <span class="icon">
                  <fa-icon
                    size="1.0em"
                    aria-hidden="true"
                    .svg="${wrRec}"
                  ></fa-icon>
                </span>
                <span class="is-hidden-mobile">Start Archiving</span>
              </button>
              <div class="rightbar">
                <div class="infomsg is-hidden-mobile">
                  The ArchiveWeb.page ${IS_APP ? "App" : "Extension"} allows you
                  to archive webpages directly in your browser!
                </div>
                <button
                  class="button is-small"
                  @click="${
                    // @ts-expect-error - TS2339 - Property 'showSettings' does not exist on type 'ArchiveWebApp'.
                    () => (this.showSettings = true)
                  }"
                >
                  <fa-icon .svg=${fasCog}></fa-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <wr-rec-coll-index
        dateName="Date Created"
        headerName="Archived Items"
        .shareOpts=${{ ipfsOpts: this.ipfsOpts, btrixOpts: this.btrixOpts }}
        @show-start=${this.onShowStart}
        @show-import=${this.onShowImport}
        @colls-updated=${this.onCollsLoaded}
        @ipfs-share-failed=${() => (this.showIpfsShareFailed = true)}
        @do-upload=${
          // @ts-expect-error - TS2339 - Property 'uploadCollOpts' does not exist on type 'ArchiveWebApp'.
          (e) => (this.uploadCollOpts = e.detail)
        }
        style="overflow: visible"
      >
      </wr-rec-coll-index>
    `;
  }

  render() {
    // @ts-expect-error - TS2551 - Property 'showStartRecord' does not exist on type 'ArchiveWebApp'. Did you mean 'onStartRecord'?
    return html` ${this.showStartRecord ? this.renderStartModal() : ""}
    ${
      // @ts-expect-error - TS2339 - Property 'showNew' does not exist on type 'ArchiveWebApp'.
      this.showNew ? this.renderNewCollModal() : ""
    }
    ${this.showImport ? this.renderImportModal() : ""}
    ${
      // @ts-expect-error - TS2551 - Property 'showDownloadProgress' does not exist on type 'ArchiveWebApp'. Did you mean 'onDownloadProgress'? | TS2339 - Property 'download' does not exist on type 'ArchiveWebApp'.
      this.showDownloadProgress && this.download
        ? this.renderDownloadModal()
        : ""
    }
    ${
      // @ts-expect-error - TS2339 - Property 'showSettings' does not exist on type 'ArchiveWebApp'.
      this.showSettings ? this.renderSettingsModal() : ""
    }
    ${this.showIpfsShareFailed ? this.renderIPFSShareFailedModal() : ""}
    ${
      // @ts-expect-error - TS2339 - Property 'uploadCollOpts' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'btrixOpts' does not exist on type 'ArchiveWebApp'.
      this.uploadCollOpts && this.btrixOpts ? this.renderBtrixUploadModal() : ""
    }
    ${super.render()}`;
  }

  renderColl() {
    return html` <wr-rec-coll
      .editable="${true}"
      .clearable="${false}"
      .browsable="${!this.embed}"
      .loadInfo="${this.getLoadInfo(this.sourceUrl || "")}"
      .appLogo="${this.mainLogo}"
      .autoUpdateInterval=${
        // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'ArchiveWebApp'. | TS2551 - Property 'showDownloadProgress' does not exist on type 'ArchiveWebApp'. Did you mean 'onDownloadProgress'?
        this.embed || this.showDownloadProgress ? 0 : 10
      }
      .shareOpts=${{ ipfsOpts: this.ipfsOpts, btrixOpts: this.btrixOpts }}
      .swName=${this.swName ?? null}
      .embed="${this.embed}"
      .sourceUrl="${this.sourceUrl}"
      appName="${this.appName}"
      appVersion=${VERSION}
      @replay-favicons=${this.onFavIcons}
      @update-title=${this.onTitle}
      @coll-loaded=${this.onCollLoaded}
      @show-start=${this.onShowStart}
      @show-import=${this.onShowImport}
      @do-upload=${
        // @ts-expect-error - TS2339 - Property 'uploadCollOpts' does not exist on type 'ArchiveWebApp'.
        (e) => (this.uploadCollOpts = e.detail)
      }
      @about-show=${() => (this.showAbout = true)}
    ></wr-rec-coll>`;
  }

  renderCollList(text = "") {
    return html`
      <div class="dropdown-row">
        <span>${text}&nbsp;</span>
        <div class="select is-small">
          <select @change="${this.onSelectColl}">
            ${this.colls?.map(
              (coll) =>
                html` <option
                  value="${coll.id}"
                  ?selected="${
                    // @ts-expect-error - TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'.
                    this.selCollId === coll.id
                  }"
                >
                  ${coll.title || coll.loadUrl}
                </option>`,
            )}
          </select>
        </div>
      </div>
    `;
  }

  renderStartModal() {
    return html` <wr-modal
      @modal-closed="${
        // @ts-expect-error - TS2551 - Property 'showStartRecord' does not exist on type 'ArchiveWebApp'. Did you mean 'onStartRecord'?
        () => (this.showStartRecord = false)
      }"
      title="Start Archiving"
    >
      ${this.renderCollList("Save To:")}
      <div class="field">
        <label class="checkbox is-size-7">
          <input
            type="checkbox"
            ?checked="${this.autorun}"
            @change="${
              // @ts-expect-error - TS7006 - Parameter 'e' implicitly has an 'any' type.
              (e) => (this.autorun = e.currentTarget.checked)
            }"
          />
          Start With Autopilot
        </label>
      </div>

      <form
        class="is-flex is-flex-direction-column"
        @submit="${this.onStartRecord}"
      >
        <div class="field has-addons">
          <p class="control is-expanded">
            <input
              class="input"
              type="url"
              required
              name="url"
              id="url"
              value="${
                // @ts-expect-error - TS2339 - Property 'recordUrl' does not exist on type 'ArchiveWebApp'.
                this.recordUrl
              }"
              placeholder="Enter a URL to Start Archiving"
            />
          </p>
          <div class="control">
            <button
              type="submit"
              class="button is-hidden-mobile is-outlined is-link"
            >
              <span class="icon">
                <fa-icon
                  size="1.0em"
                  aria-hidden="true"
                  .svg="${wrRec}"
                ></fa-icon>
              </span>
              <span>Go!</span>
            </button>
          </div>
        </div>
        ${IS_APP
          ? html` <label class="checkbox">
              <input id="preview" type="checkbox" /><span
                >&nbsp;Start in Preview Mode (without archiving.)</span
              >
            </label>`
          : ""}
      </form>
    </wr-modal>`;
  }

  renderNewCollModal() {
    return html` <wr-modal
      @modal-closed="${
        // @ts-expect-error - TS2339 - Property 'showNew' does not exist on type 'ArchiveWebApp'.
        () => (this.showNew = null)
      }"
      title="New Archiving Session"
    >
      <form @submit="${this.onNewColl}" class="create-new">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input
              type="text"
              id="new-title"
              name="new-title"
              class="input"
              required
              placeholder="Give this archiving session a name"
            />
          </p>
          <div class="control">
            <button
              type="submit"
              class="button is-hidden-mobile is-primary ${
                // @ts-expect-error - TS2339 - Property 'showNew' does not exist on type 'ArchiveWebApp'.
                this.showNew === "loading" ? "is-loading " : ""
              }"
              ?disabled="${
                // @ts-expect-error - TS2339 - Property 'showNew' does not exist on type 'ArchiveWebApp'.
                this.showNew === "loading"
              }"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </wr-modal>`;
  }

  renderImportModal() {
    return html` <wr-modal
      style="--modal-width: 740px"
      @modal-closed="${() => (this.showImport = false)}"
      title="Import File"
    >
      <wr-chooser
        style="flex: auto"
        .newFullImport="${true}"
        noHead="${true}"
        @load-start=${this.onStartLoad}
      >
      </wr-chooser>
      <div class="is-flex is-flex-wrap-wrap is-align-items-baseline my-2">
        <div class="control">
          <label class="checkbox">
            <input
              type="checkbox"
              name="add-existing"
              .checked="${
                // @ts-expect-error - TS2339 - Property 'isImportExisting' does not exist on type 'ArchiveWebApp'.
                this.isImportExisting
              }"
              @change="${
                // @ts-expect-error - TS7006 - Parameter 'e' implicitly has an 'any' type.
                (e) =>
                  // @ts-expect-error - TS2339 - Property 'isImportExisting' does not exist on type 'ArchiveWebApp'.
                  (this.isImportExisting = e.currentTarget.checked)
              }"
            />
            Add to an existing archived
            item${
              // @ts-expect-error - TS2339 - Property 'isImportExisting' does not exist on type 'ArchiveWebApp'.
              this.isImportExisting ? ":" : ""
            }
          </label>
        </div>
        ${
          // @ts-expect-error - TS2339 - Property 'isImportExisting' does not exist on type 'ArchiveWebApp'.
          this.isImportExisting ? this.renderCollList() : ""
        }
      </div>
    </wr-modal>`;
  }

  renderIPFSShareFailedModal() {
    return html`<wr-modal
      @modal-closed="${() => (this.showIpfsShareFailed = false)}"
      title="IPFS Connection Failed"
    >
      <div>
        <p>
          Sorry, IPFS sharing / unsharing failed as IPFS could not be reached.
        </p>
        <p>(Check the IPFS settings and try again.)</p>
      </div>
    </wr-modal>`;
  }

  renderBtrixUploadModal() {
    return html` <wr-btrix-upload
      .btrixOpts=${this.btrixOpts}
      .uploadColl=${
        // @ts-expect-error - TS2339 - Property 'uploadCollOpts' does not exist on type 'ArchiveWebApp'.
        this.uploadCollOpts
      }
    >
    </wr-btrix-upload>`;
  }

  renderDownloadModal() {
    const renderDLStatus = () => {
      // @ts-expect-error - TS2339 - Property 'download' does not exist on type 'ArchiveWebApp'.
      switch (this.download.state) {
        case "progressing":
          return html`
            <button @click="${this.onDownloadCancel}" class="button is-danger">
              Cancel Download
            </button>
          `;

        case "interrupted":
          return html`
            <p class="has-text-weight-bold has-text-danger">
              The download was interrupted
            </p>
            <button @click="${this.onDownloadCancel}" class="button">
              Close
            </button>
          `;

        case "cancelled":
          return html`
            <p class="has-text-weight-bold has-text-danger">
              The download was canceled
            </p>
            <button @click="${this.onDownloadCancel}" class="button">
              Close
            </button>
          `;

        case "completed":
          return html`
            <p class="has-text-weight-bold has-text-primary">
              Download Completed!
            </p>
            <button @click="${this.onDownloadCancel}" class="button">
              Close
            </button>
          `;
      }
    };

    return html` <wr-modal
      .noBgClose=${true}
      style="--modal-width: 740px"
      @modal-closed="${
        // @ts-expect-error - TS2551 - Property 'showDownloadProgress' does not exist on type 'ArchiveWebApp'. Did you mean 'onDownloadProgress'?
        () => (this.showDownloadProgress = false)
      }"
      title="Download Progress"
    >
      <div class="dl-progress">
        <div>
          Downloading to:
          <i
            >${
              // @ts-expect-error - TS2339 - Property 'download' does not exist on type 'ArchiveWebApp'.
              this.download.filename
            }</i
          >
        </div>
        <div>
          Size Downloaded:
          <b
            >${
              // @ts-expect-error - TS2339 - Property 'download' does not exist on type 'ArchiveWebApp'.
              prettyBytes(this.download.currSize)
            }</b
          >
        </div>
        <div>
          Time Elapsed:
          ${
            // @ts-expect-error - TS2339 - Property 'download' does not exist on type 'ArchiveWebApp'.
            Math.round(Date.now() / 1000 - this.download.startTime)
          }
          seconds
        </div>

        <div class="has-text-centered">${renderDLStatus()}</div>
      </div>
    </wr-modal>`;
  }

  // @ts-expect-error - TS7006 - Parameter 'progress' implicitly has an 'any' type.
  onDownloadProgress(progress) {
    if (progress.filename) {
      // @ts-expect-error - TS2551 - Property 'showDownloadProgress' does not exist on type 'ArchiveWebApp'. Did you mean 'onDownloadProgress'?
      this.showDownloadProgress = true;
      // @ts-expect-error - TS2339 - Property 'download' does not exist on type 'ArchiveWebApp'.
      this.download = progress;
      // @ts-expect-error - TS2339 - Property 'download' does not exist on type 'ArchiveWebApp'.
    } else if (this.download) {
      // @ts-expect-error - TS2339 - Property 'download' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'download' does not exist on type 'ArchiveWebApp'.
      this.download = { ...this.download, state: progress.state };
    }
  }

  onDownloadCancel() {
    if (window.archivewebpage) {
      // @ts-expect-error - TS2339 - Property 'download' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'download' does not exist on type 'ArchiveWebApp'.
      if (this.download && this.download.state === "progressing") {
        // @ts-expect-error - TS2339 - Property 'archivewebpage' does not exist on type 'Window & typeof globalThis'. | TS2339 - Property 'download' does not exist on type 'ArchiveWebApp'.
        window.archivewebpage.downloadCancel(this.download);
      } else {
        // @ts-expect-error - TS2551 - Property 'showDownloadProgress' does not exist on type 'ArchiveWebApp'. Did you mean 'onDownloadProgress'?
        this.showDownloadProgress = false;
      }
    }
  }

  getDeployType() {
    if (IS_APP) {
      return "App";
    }

    if (this.embed) {
      return "Embedded";
    }

    return "Extension";
  }

  renderAbout() {
    return html`
      <div class="modal is-active">
        <div class="modal-background" @click="${this.onAboutClose}"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">About ArchiveWeb.page ${this.getDeployType()}</p>
              <button class="delete" aria-label="close" @click="${
                this.onAboutClose
              }"></button>
            </header>
            <section class="modal-card-body">
              <div class="container">
                <div class="content">
                  <div class="is-flex">
                    <div class="has-text-centered" style="width: 220px">
                      <fa-icon class="logo" size="48px" .svg="${awpLogo}"></fa-icon>
                      <div style="font-size: smaller; margin-bottom: 1em">${this.getDeployType()} v${VERSION}</div>
                    </div>

                    ${
                      IS_APP
                        ? html`
                            <p>
                              ArchiveWeb.page App is a standalone app for Mac,
                              Windows and Linux that allows users to archive
                              webpages as they browse
                            </p>
                          `
                        : html` <p>
                            ArchiveWeb.page allows users to archive webpages
                            directly in your browser!
                          </p>`
                    }
                  </div>

                  <p>See the <a href="https://archiveweb.page/guide" target="_blank">ArchiveWeb.page Guide</a> for more info on how to use this tool.</p>

                  <p>Full source code is available at:
                    <a href="https://github.com/webrecorder/archiveweb.page" target="_blank">https://github.com/webrecorder/archiveweb.page</a>
                  </p>

                  <p>ArchiveWeb.page is part of the <a href="https://webrecorder.net/" target="_blank">Webrecorder Project</a>.</p>

                  <h3>Privacy Policy</h3>
                  <p class="is-size-7">ArchiveWeb.page allows users to archive what they browse, storing captured data directly in the browser.
                  Users can downloaded this data as files to their hard drive. Users can also delete any and all archived data at any time.
                  ArchiveWeb.page does not collect any usage or tracking data.</p>

                  <p class="is-size-7">ArchiveWeb.page includes an experimental sharing option for each archive collection. Users can choose to share select archives on a peer-to-peer network (IPFS) via a unique id.
                  Once shared on this network, the data may become accessible to others.
                  All archived items are private and not shared by default, unless explicitly opted-in by the user. (A warning is displayed when sharing via IPFS.)</p>

                  <h4>Disclaimer of Warranties</h4>
                  <p class="is-size-7">The application is provided "as is" without any guarantees.</p>
                  <details class="is-size-7">
                    <summary>Legalese:</summary>
                    <p style="font-size: 0.8rem">DISCLAIMER OF SOFTWARE WARRANTY. WEBRECORDER SOFTWARE PROVIDES THIS SOFTWARE TO YOU "AS AVAILABLE"
                    AND WITHOUT WARRANTY OF ANY KIND, EXPRESS, IMPLIED OR OTHERWISE,
                    INCLUDING WITHOUT LIMITATION ANY WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.</p>
                  </details>

                  <div class="has-text-centered">
                    <a class="button is-warning" href="#" @click="${
                      this.onAboutClose
                    }">Close</a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>`;
  }

  renderSettingsModal() {
    return html`
      <wr-modal @modal-closed="${this.onCancelSettings}" title="Settings">
        <div class="tabs mb-3">
          <ul>
            <li class="${this.settingsTab === "prefs" ? "is-active" : ""}">
              <a @click=${() => (this.settingsTab = "prefs")}
                >Archiving Settings</a
              >
            </li>
            <li
              class="${this.settingsTab === "browsertrix" ? "is-active" : ""}"
            >
              <a @click=${() => (this.settingsTab = "browsertrix")}
                >Browsertrix</a
              >
            </li>
            <li class="${this.settingsTab === "ipfs" ? "is-active" : ""}">
              <a @click=${() => (this.settingsTab = "ipfs")}>IPFS</a>
            </li>
          </ul>
        </div>

        <form
          class="is-flex is-flex-direction-column is-size-7"
          @submit="${this.onSaveSettings}"
        >
          ${this.settingsTab === "prefs"
            ? html`<fieldset>
                <div class="is-size-6 mt-4">
                  Optional archiving features:
                </div>
                <div class="field is-size-6 mt-4">
                  <input
                    name="prefArchiveScreenshots"
                    id="archiveScreenshots"
                    class="checkbox"
                    type="checkbox"
                    ?checked="${this.archiveScreenshots}"
                  /><span class="ml-1">Save Screenshots</span>
                  <p class="is-size-7 mt-1">
                    Save screenshot + thumbnail of every page on load. Screenshot will be saved as soon as page is done loading.
                  </p>
                </div>
                <div class="field is-size-6 mt-4">
                  <input
                    name="prefArchivePDF"
                    id="archivePDF"
                    class="checkbox"
                    type="checkbox"
                    ?checked="${this.archivePDF}"
                  /><span class="ml-1">Save PDFs</span>
                  <p class="is-size-7 mt-1">
                    Save PDF of each page after page loads (experimental).
                  </p>
                </div>
                <div class="field is-size-6 mt-4">
                  <input
                    name="prefArchiveFlash"
                    id="archiveFlash"
                    class="checkbox"
                    type="checkbox"
                    ?checked="${this.archiveFlash}"
                  /><span class="ml-1">Enable Ruffle for Flash</span>
                  <p class="is-size-7 mt-1">
                    Enables archiving Flash content via injecting the Ruffle
                    emulator into the page. May cause issues with some pages,
                    enable only when archiving websites that contain Flash.
                  </p>
                </div>
                <hr/>
                <div class="is-size-6">
                  Privacy related settings:
                </div>
                <div class="field is-size-6 mt-4">
                  <input
                    name="prefArchiveCookies"
                    id="archiveCookies"
                    class="checkbox"
                    type="checkbox"
                    ?checked="${this.archiveCookies}"
                  /><span class="ml-1">Archive cookies</span>
                  <p class="is-size-7 mt-1">
                    Archiving cookies may expose private information that is
                    <em>normally only shared with the site</em>. When enabled,
                    users should exercise caution about sharing these archived
                    items publicly.
                  </p>
                </div>
                <div class="field is-size-6 mt-4">
                  <input
                    name="prefArchiveStorage"
                    id="archiveStorage"
                    class="checkbox"
                    type="checkbox"
                    ?checked="${this.archiveStorage}"
                  /><span class="ml-1">Archive local storage</span>
                  <p class="is-size-7 mt-1">
                    Archiving local storage will archive information that is
                    generally <em>always private.</em> Archiving local storage
                    may be required for certain paywalled sites but should be
                    avoided where possible.
                  </p>
                  <p class="is-size-7 mt-1">
                    <strong
                      >Sharing content created with this setting enabled may
                      compromise your login credentials.</strong
                    >
                    <br />Archived items created with this settings should
                    generally be kept private!
                  </p>
                </div>
              </fieldset>`
            : ``}
          ${this.settingsTab === "ipfs"
            ? html` <p class="is-size-6 mb-3">
                  Configure settings for sharing archived items to IPFS.
                </p>
                <fieldset>
                  <div class="field">
                    <input
                      name="ipfsAutoDetect"
                      id="ipfsAutoDetect"
                      class="checkbox is-small"
                      type="checkbox"
                      ?checked="${this.ipfsOpts.autoDetect}"
                    /><span class="ml-1">Auto-Detect IPFS</span>
                  </div>
                  <div class="field has-addons">
                    <p class="is-expanded">
                      IPFS Daemon URL (leave blank to auto-detect IPFS):
                      <input
                        class="input is-small"
                        type="url"
                        name="ipfsDaemonUrl"
                        id="ipfsDaemonUrl"
                        value="${this.ipfsOpts.daemonUrl}"
                        placeholder="Set IPFS Daemon URL or set blank to auto-detect IPFS"
                      />
                    </p>
                  </div>
                  <div class="field has-addons">
                    <p class="is-expanded">
                      IPFS Gateway URL:
                      <input
                        class="input is-small"
                        type="url"
                        name="ipfsGatewayUrl"
                        id="ipfsGatewayUrl"
                        value="${this.ipfsOpts.gatewayUrl}"
                        placeholder="${DEFAULT_GATEWAY_URL}"
                      />
                    </p>
                  </div>
                </fieldset>`
            : ""}
          ${this.settingsTab === "browsertrix"
            ? html`
                <p class="is-size-6 mb-3">
                  Configure your credentials to upload archived items to
                  Browsertrix: Webrecorder's cloud-based crawling service.
                </p>
                <p class="is-size-7 p-4 has-background-info">
                  Don't have a Browsertrix account?
                  <a target="_blank" href="https://webrecorder.net/browsertrix/"
                    >Sign up today!</a
                  >
                </p>
                <fieldset>
                  <div class="field has-addons">
                    <p class="is-expanded">
                      Browsertrix URL:
                      <input
                        class="input is-small"
                        type="url"
                        name="btrixUrl"
                        id="btrixUrl"
                        value="${this.btrixOpts?.url || DEFAULT_BTRIX_URL}"
                        placeholder="${DEFAULT_BTRIX_URL}"
                      />
                    </p>
                  </div>
                  <div class="field has-addons">
                    <p class="is-expanded">
                      Username
                      <input
                        class="input is-small"
                        type="text"
                        name="btrixUsername"
                        id="btrixUsername"
                        value="${this.btrixOpts?.username || ""}"
                        placeholder="Username"
                      />
                    </p>
                  </div>
                  <div class="field has-addons">
                    <p class="is-expanded">
                      Password
                      <input
                        class="input is-small"
                        type="password"
                        name="btrixPassword"
                        id="btrixPassword"
                        value="${this.btrixOpts?.password || ""}"
                        placeholder="Password"
                      />
                    </p>
                  </div>
                  <div class="field has-addons">
                    <p class="is-expanded">
                      Organization Name or Slug (Optional)
                      <input
                        class="input is-small"
                        type="text"
                        name="btrixOrgName"
                        id="btrixOrgName"
                        value="${this.btrixOpts?.orgName || ""}"
                        placeholder="my-org"
                      />
                    </p>
                  </div>
                </fieldset>
              `
            : ""}
          <div class="has-text-centered has-text-danger">
            ${this.settingsError}
          </div>
          <div class="has-text-centered mt-4">
            <button class="button is-primary" type="submit">Save</button>
            <button
              class="button"
              type="button"
              @click="${this.onCancelSettings}"
            >
              Cancel
            </button>
          </div>
        </form>
      </wr-modal>
    `;
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  async onNewColl(event) {
    // @ts-expect-error - TS2339 - Property 'showNew' does not exist on type 'ArchiveWebApp'.
    this.showNew = "loading";
    event.preventDefault();
    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'ArchiveWebApp'.
    const title = this.renderRoot.querySelector("#new-title").value;

    const method = "POST";
    const body = JSON.stringify({ metadata: { title } });
    const resp = await fetch(`${apiPrefix}/c/create`, { method, body });
    await resp.json();

    const index = this.renderRoot.querySelector("wr-rec-coll-index")!;
    if (index) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (index as any).loadItems();
    }
    // @ts-expect-error - TS2339 - Property 'showNew' does not exist on type 'ArchiveWebApp'.
    this.showNew = null;
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onSelectColl(event) {
    //this.selCollId = event.currentTarget.getAttribute("data-id");
    //this.selCollTitle = event.currentTarget.getAttribute("data-title");
    //this.showCollDrop = false;
    // @ts-expect-error - TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'.
    this.selCollId = event.currentTarget.value;
  }

  async setDefaultColl() {
    // @ts-expect-error - TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'.
    if (!this.selCollId) {
      // @ts-expect-error - TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'.
      this.selCollId = await getLocalOption("defaultCollId");
    }
    // @ts-expect-error - TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'colls' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'colls' does not exist on type 'ArchiveWebApp'.
    if (!this.selCollId && this.colls?.length) {
      // @ts-expect-error - TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'colls' does not exist on type 'ArchiveWebApp'.
      this.selCollId = this.colls[0].id;
    }
    // copy from localStorage to chrome.storage
    if (
      // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
      self.chrome?.storage?.local &&
      self.localStorage
    ) {
      await setLocalOption(
        "index:sortKey",
        localStorage.getItem("index:sortKey"),
      );
      await setLocalOption(
        "index:sortDesc",
        localStorage.getItem("index:sortDesc"),
      );
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  _setCurrColl(event) {
    if (!(event instanceof CustomEvent)) {
      this.setDefaultColl();
      return;
    }
    const { detail } = event;
    // @ts-expect-error - TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'.
    this.selCollId = detail.coll;
    //this.selCollTitle = event.detail.title;
    if (!this.colls?.length) {
      this.colls = [
        {
          id: detail.coll,
          title: detail.title,
        },
      ];
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onShowStart(event) {
    this._setCurrColl(event);
    // @ts-expect-error - TS2339 - Property 'recordUrl' does not exist on type 'ArchiveWebApp'.
    this.recordUrl = event.detail.url || "https://example.com/";
    // @ts-expect-error - TS2551 - Property 'showStartRecord' does not exist on type 'ArchiveWebApp'. Did you mean 'onStartRecord'?
    this.showStartRecord = true;
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onShowImport(event) {
    this._setCurrColl(event);
    this.showImport = true;
    // @ts-expect-error - TS2339 - Property 'isImportExisting' does not exist on type 'ArchiveWebApp'.
    this.isImportExisting = true;
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onCollsLoaded(event) {
    this.colls = event.detail.colls;
    //this.selCollId = this.colls && this.colls.length ? this.colls[0].id: null;
    this.setDefaultColl();
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  async onStartRecord(event) {
    event.preventDefault();
    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'ArchiveWebApp'.
    const url = this.renderRoot.querySelector("#url").value;

    const previewCheckbox = this.renderRoot.querySelector("#preview");
    // @ts-expect-error - TS2339 - Property 'checked' does not exist on type 'Element'.
    const isPreview = previewCheckbox?.checked;

    // @ts-expect-error - TS2551 - Property 'showStartRecord' does not exist on type 'ArchiveWebApp'. Did you mean 'onStartRecord'?
    this.showStartRecord = false;
    const autorun = this.autorun;

    // @ts-expect-error - TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'.
    const collId = this.selCollId;

    await setLocalOption("defaultCollId", collId);
    await setLocalOption("autorunBehaviors", autorun ? "1" : "0");

    // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'. | TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
    if (self.chrome?.runtime) {
      chrome.runtime.sendMessage({
        msg: "startNew",
        url,
        collId,
        autorun,
      });
    } else if (window.archivewebpage?.record) {
      const startRec = !isPreview;
      window.archivewebpage.record({ url, collId, startRec, autorun });
    }
    return false;
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  override async onTitle(event): void {
    super.onTitle(event);

    if (
      this.embed &&
      this.loadedCollId &&
      event.detail.replayTitle &&
      event.detail.title
    ) {
      try {
        await fetch(`${apiPrefix}/c/${this.loadedCollId}/pageTitle`, {
          method: "POST",
          body: JSON.stringify(event.detail),
        });
      } catch (e) {
        console.warn(e);
      }
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  async onSaveSettings(event) {
    event.preventDefault();

    // IPFS settings
    const daemonUrlText = this.renderRoot.querySelector("#ipfsDaemonUrl");
    const gatewayUrlText = this.renderRoot.querySelector("#ipfsGatewayUrl");
    const autodetectCheck = this.renderRoot.querySelector("#ipfsAutoDetect");

    if (daemonUrlText && gatewayUrlText) {
      // @ts-expect-error - TS2339 - Property 'value' does not exist on type 'Element'.
      const daemonUrl = daemonUrlText.value;
      // @ts-expect-error - TS2339 - Property 'value' does not exist on type 'Element'.
      const gatewayUrl = gatewayUrlText.value;
      // @ts-expect-error - TS2339 - Property 'checked' does not exist on type 'Element'.
      const autoDetect = autodetectCheck?.checked;

      this.ipfsOpts = {
        daemonUrl,
        useCustom: !!daemonUrl,
        gatewayUrl,
        autoDetect,
      };

      await this.checkIPFS();

      localStorage.setItem("ipfsOpts", JSON.stringify(this.ipfsOpts));
    }

    // Browsertrix Settings
    const btrixUrl = this.renderRoot.querySelector("#btrixUrl");
    const btrixUsername = this.renderRoot.querySelector("#btrixUsername");
    const btrixPassword = this.renderRoot.querySelector("#btrixPassword");
    const btrixOrgName = this.renderRoot.querySelector("#btrixOrgName");

    if (btrixUrl && btrixUsername && btrixPassword) {
      // @ts-expect-error - TS2339 - Property 'value' does not exist on type 'Element'.
      const url = btrixUrl.value;
      // @ts-expect-error - TS2339 - Property 'value' does not exist on type 'Element'.
      const username = btrixUsername.value;
      // @ts-expect-error - TS2339 - Property 'value' does not exist on type 'Element'.
      const password = btrixPassword.value;
      // @ts-expect-error - TS2339 - Property 'value' does not exist on type 'Element'.
      const orgName = btrixOrgName?.value || "";

      if (url && username && password) {
        const btrixOpts = { url, username, password, orgName };

        let client;

        try {
          client = await BtrixClient.login(btrixOpts);
          this.settingsError = "";
        } catch (e) {
          this.settingsError =
            "Unable to log in to Browsertrix. Check your credentials.";
          return false;
        }

        localStorage.setItem("btrixOpts", JSON.stringify(btrixOpts));
        this.btrixOpts = { ...btrixOpts, client };
      } else {
        this.btrixOpts = null;
        localStorage.removeItem("btrixOpts");
      }
    }

    const options = ["Cookies", "Storage", "Flash", "Screenshots", "PDF"];

    for (const option of options) {
      const name = "archive" + option;
      const elem = this.renderRoot.querySelector("#" + name);

      if (elem) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)[name] = (elem as HTMLInputElement).checked;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await setLocalOption(name, (this as any)[name] ? "1" : "0");
      }
    }

    localStorage.setItem("settingsTab", this.settingsTab);

    // @ts-expect-error - TS2339 - Property 'showSettings' does not exist on type 'ArchiveWebApp'.
    this.showSettings = false;

    return false;
  }

  onCancelSettings() {
    // @ts-expect-error - TS2339 - Property 'settingsError' does not exist on type 'ArchiveWebApp'.
    this.settingsError = null;
    // @ts-expect-error - TS2339 - Property 'showSettings' does not exist on type 'ArchiveWebApp'.
    this.showSettings = false;
  }

  async checkIPFS() {
    const ipfsOpts = this.ipfsOpts;

    // use auto-js-ipfs to get possible local daemon url (eg. for Brave)
    // if so, send it to the service worker
    if (ipfsOpts.useCustom && ipfsOpts.daemonUrl) {
      ipfsOpts.message = "IPFS Access -- Custom IPFS Daemon";
      return;
    }

    if (!ipfsOpts.daemonUrl && ipfsOpts.autoDetect) {
      const autoipfs = await createAutoIpfs({
        web3StorageToken: __WEB3_STORAGE_TOKEN__,
      });

      if (autoipfs instanceof DaemonAPI) {
        ipfsOpts.daemonUrl = autoipfs.url;
      }

      ipfsOpts.useCustom = false;

      if (autoipfs instanceof Web3StorageAPI) {
        ipfsOpts.message = "Sharing via remote web3.storage";
      } else if (!ipfsOpts.daemonUrl) {
        ipfsOpts.message = "IPFS Access Unknown - Sharing Not Available";
      } else if (ipfsOpts.daemonUrl.startsWith("http://localhost:45")) {
        ipfsOpts.message = "Sharing via Brave IPFS node";
      } else if (ipfsOpts.daemonUrl.startsWith("http://localhost")) {
        ipfsOpts.message = "Sharing via local IPFS node";
      } else {
        ipfsOpts.message = "";
      }
    }
  }
}

customElements.define("archive-web-page-app", ArchiveWebApp);

export { ArchiveWebApp, Loader, Embed };

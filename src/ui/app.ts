import { html, css, wrapCss, IS_APP, apiPrefix } from "replaywebpage/src/misc";

// replaywebpage imports
import { ReplayWebApp, Embed, Loader } from "replaywebpage";

import { SWManager } from "replaywebpage/src/swmanager";

import fasHelp from "@fortawesome/fontawesome-free/svgs/solid/question-circle.svg";
import fasPlus from "@fortawesome/fontawesome-free/svgs/solid/plus.svg";

import fasUpload from "@fortawesome/fontawesome-free/svgs/solid/upload.svg";
import fasCog from "@fortawesome/fontawesome-free/svgs/solid/cog.svg";

import "./coll";
import "./coll-info";
import "./coll-index";
import "./recordembed";

import { BtrixClient } from "./upload";

import wrRec from "../../assets/recLogo.svg";
import wrLogo from "../../assets/awp-logo.svg";
import prettyBytes from "pretty-bytes";

import {
  create as createAutoIpfs,
  DaemonAPI,
  Web3StorageAPI,
} from "auto-js-ipfs";
import { getLocalOption, setLocalOption } from "../localstorage";

const VERSION = __AWP_VERSION__;

const DEFAULT_GATEWAY_URL = "https://w3s.link/ipfs/";

const DEFAULT_BTRIX_URL = "https://app.browsertrix.com";

//============================================================================
class ArchiveWebApp extends ReplayWebApp {
  constructor() {
    super();

    // @ts-expect-error - TS2339 - Property 'navMenuShown' does not exist on type 'ArchiveWebApp'.
    this.navMenuShown = false;
    // @ts-expect-error - TS2339 - Property 'showCollDrop' does not exist on type 'ArchiveWebApp'.
    this.showCollDrop = false;
    // @ts-expect-error - TS2339 - Property 'colls' does not exist on type 'ArchiveWebApp'.
    this.colls = [];
    // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'ArchiveWebApp'.
    this.autorun = false;

    // @ts-expect-error - TS2339 - Property 'settingsError' does not exist on type 'ArchiveWebApp'.
    this.settingsError = "";

    this.settingsTab = localStorage.getItem("settingsTab") || "browsertrix";

    try {
      const res = localStorage.getItem("ipfsOpts");
      // @ts-expect-error - TS2339 - Property 'ipfsOpts' does not exist on type 'ArchiveWebApp'. | TS2345 - Argument of type 'string | null' is not assignable to parameter of type 'string'.
      this.ipfsOpts = JSON.parse(res);
    } catch (e) {
      // ignore empty
    }

    // @ts-expect-error - TS2339 - Property 'ipfsOpts' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'ipfsOpts' does not exist on type 'ArchiveWebApp'.
    this.ipfsOpts = this.ipfsOpts || {
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
      // @ts-expect-error - TS2339 - Property 'btrixOpts' does not exist on type 'ArchiveWebApp'.
      this.btrixOpts = null;
    }

    getLocalOption("autorunBehaviors").then(
      (res) => (this.autorun = res === "1")
    );

    // @ts-expect-error - TS2339 - Property 'archivewebpage' does not exist on type 'Window & typeof globalThis'.
    if (window.archivewebpage) {
      // @ts-expect-error - TS2339 - Property 'archivewebpage' does not exist on type 'Window & typeof globalThis'.
      window.archivewebpage.setDownloadCallback((progress) =>
        this.onDownloadProgress(progress)
      );
    }
  }

  async doBtrixLogin() {
    try {
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
      // @ts-expect-error - TS2339 - Property 'inited' does not exist on type 'ArchiveWebApp'.
      this.inited = true;
      // @ts-expect-error - TS2339 - Property 'sourceUrl' does not exist on type 'ArchiveWebApp'.
      this.sourceUrl = pageParams.get("source") || "";
    }

    // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'ArchiveWebApp'.
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
      this.swmanager = new SWManager({ name: this.swName, appName: this.appName });
      this.swmanager
        .register()
        .catch(
          () =>
            (this.swErrorMsg = this.swmanager.renderErrorReport(this.mainLogo)),
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
        // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'ArchiveWebApp'.
        this.embed &&
        // @ts-expect-error - TS2339 - Property 'loadedCollId' does not exist on type 'ArchiveWebApp'.
        this.loadedCollId &&
        typeof event.data === "object" &&
        event.data.msg_type === "downloadToBlob"
      ) {
        const download = await fetch(
          `${apiPrefix}/c/${this.loadedCollId}/dl?format=wacz&pages=all`
        );
        const blob = await download.blob();
        // @ts-expect-error - TS2531 - Object is possibly 'null'.
        event.source.postMessage({
          msg_type: "downloadedBlob",
          // @ts-expect-error - TS2339 - Property 'loadedCollId' does not exist on type 'ArchiveWebApp'.
          coll: this.loadedCollId,
          url: URL.createObjectURL(blob),
        });
      }
    });
  }

  onStartLoad(event) {
    // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'ArchiveWebApp'.
    if (this.embed) {
      return;
    }

    // @ts-expect-error - TS2551 - Property 'showImport' does not exist on type 'ArchiveWebApp'. Did you mean 'onShowImport'?
    this.showImport = false;
    // @ts-expect-error - TS2339 - Property 'sourceUrl' does not exist on type 'ArchiveWebApp'.
    this.sourceUrl = event.detail.sourceUrl;
    // @ts-expect-error - TS2339 - Property 'loadInfo' does not exist on type 'ArchiveWebApp'.
    this.loadInfo = event.detail;

    // @ts-expect-error - TS2339 - Property 'isImportExisting' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'.
    if (this.isImportExisting && this.selCollId) {
      // @ts-expect-error - TS2339 - Property 'loadInfo' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'.
      this.loadInfo.importCollId = this.selCollId;
    }
  }

  onCollLoaded(event) {
    // @ts-expect-error - TS2339 - Property 'loadInfo' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'loadInfo' does not exist on type 'ArchiveWebApp'.
    if (this.loadInfo && this.loadInfo.importCollId) {
      if (navigator.serviceWorker.controller) {
        const msg = {
          msg_type: "reload",
          full: true,
          // @ts-expect-error - TS2339 - Property 'loadInfo' does not exist on type 'ArchiveWebApp'.
          name: this.loadInfo.importCollId,
        };
        navigator.serviceWorker.controller.postMessage(msg);
      }
    }

    // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'ArchiveWebApp'.
    if (this.embed) {
      // @ts-expect-error - TS2339 - Property 'loadedCollId' does not exist on type 'ArchiveWebApp'.
      this.loadedCollId = event.detail.collInfo && event.detail.collInfo.coll;
    }

    super.onCollLoaded(event);

    if (
      !event.detail.alreadyLoaded &&
      event.detail.sourceUrl &&
      // @ts-expect-error - TS2339 - Property 'sourceUrl' does not exist on type 'ArchiveWebApp'.
      event.detail.sourceUrl !== this.sourceUrl
    ) {
      // @ts-expect-error - TS2339 - Property 'sourceUrl' does not exist on type 'ArchiveWebApp'.
      this.sourceUrl = event.detail.sourceUrl;
    }
  }

  getLoadInfo(sourceUrl) {
    this.disableCSP();

    // @ts-expect-error - TS2339 - Property 'loadInfo' does not exist on type 'ArchiveWebApp'.
    if (this.loadInfo) {
      // @ts-expect-error - TS2339 - Property 'loadInfo' does not exist on type 'ArchiveWebApp'.
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
    if (this.embed || !self.chrome || !self.chrome.runtime) {
      return;
    }

    const m = navigator.userAgent.match(/Chrome\/([\d]+)/);
    if (!m || Number(m[1]) < 94) {
      return;
    }

    console.log("attempt to disable CSP to ensure replay works");
    const tabId = await new Promise((resolve) => {
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

  get mainLogo() {
    return wrLogo;
  }

  renderNavEnd() {
    return html` <a
      href="https://archiveweb.page/guide"
      target="_blank"
      class="navbar-item is-size-6"
    >
      <fa-icon .svg="${fasHelp}" aria-hidden="true"></fa-icon
      ><span>&nbsp;User Guide</span>

      <a
        href="?about"
        @click="${(e) => {
          e.preventDefault();
          // @ts-expect-error - TS2339 - Property 'showAbout' does not exist on type 'ArchiveWebApp'.
          this.showAbout = true;
        }}"
        class="navbar-item is-size-6"
        >About
      </a></a
    >`;
  }

  renderNavBrand() {
    return html` <span
      id="home"
      class="logo-text has-text-weight-bold is-size-6 has-allcaps wide-only"
    >
      <span class="" style="color: #8878c3">archive</span>
      <span class="has-text-link">web.page</span>
      <span class="is-sr-only">Home</span>
    </span>`;
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
                @click="${
                  // @ts-expect-error - TS2551 - Property 'showImport' does not exist on type 'ArchiveWebApp'. Did you mean 'onShowImport'?
                  () => (this.showImport = true)
                }"
              >
                <span class="icon">
                  <fa-icon .svg=${fasUpload}></fa-icon>
                </span>
                <span class="is-hidden-mobile">Import File</span>
              </button>
              <button
                class="button is-small no-pad-mobile"
                title="Start Archiving"
                ?disabled="${
                  // @ts-expect-error - TS2339 - Property 'colls' does not exist on type 'ArchiveWebApp'.
                  !this.colls
                }"
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
        .shareOpts=${
          // @ts-expect-error - TS2339 - Property 'ipfsOpts' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'btrixOpts' does not exist on type 'ArchiveWebApp'.
          { ipfsOpts: this.ipfsOpts, btrixOpts: this.btrixOpts }
        }
        @show-start=${this.onShowStart}
        @show-import=${this.onShowImport}
        @colls-updated=${this.onCollsLoaded}
        @ipfs-share-failed=${
          // @ts-expect-error - TS2339 - Property 'showIpfsShareFailed' does not exist on type 'ArchiveWebApp'.
          () => (this.showIpfsShareFailed = true)
        }
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
    ${
      // @ts-expect-error - TS2551 - Property 'showImport' does not exist on type 'ArchiveWebApp'. Did you mean 'onShowImport'?
      this.showImport ? this.renderImportModal() : ""
    }
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
    ${
      // @ts-expect-error - TS2339 - Property 'showIpfsShareFailed' does not exist on type 'ArchiveWebApp'.
      this.showIpfsShareFailed ? this.renderIPFSShareFailedModal() : ""
    }
    ${
      // @ts-expect-error - TS2339 - Property 'uploadCollOpts' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'btrixOpts' does not exist on type 'ArchiveWebApp'.
      this.uploadCollOpts && this.btrixOpts ? this.renderBtrixUploadModal() : ""
    }
    ${super.render()}`;
  }

  renderColl() {
    return html` <wr-rec-coll
      .editable="${true}"
      .clearable="${
        // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'ArchiveWebApp'.
        this.embed
      }"
      .browsable="${
        // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'ArchiveWebApp'.
        !this.embed
      }"
      .loadInfo="${
        // @ts-expect-error - TS2339 - Property 'sourceUrl' does not exist on type 'ArchiveWebApp'.
        this.getLoadInfo(this.sourceUrl)
      }"
      .appLogo="${this.mainLogo}"
      .autoUpdateInterval=${
        // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'ArchiveWebApp'. | TS2551 - Property 'showDownloadProgress' does not exist on type 'ArchiveWebApp'. Did you mean 'onDownloadProgress'?
        this.embed || this.showDownloadProgress ? 0 : 10
      }
      .shareOpts=${
        // @ts-expect-error - TS2339 - Property 'ipfsOpts' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'btrixOpts' does not exist on type 'ArchiveWebApp'.
        { ipfsOpts: this.ipfsOpts, btrixOpts: this.btrixOpts }
      }
      swName=${
        // @ts-expect-error - TS2339 - Property 'swName' does not exist on type 'ArchiveWebApp'.
        this.swName
      }
      embed="${
        // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'ArchiveWebApp'.
        this.embed
      }"
      sourceUrl="${
        // @ts-expect-error - TS2339 - Property 'sourceUrl' does not exist on type 'ArchiveWebApp'.
        this.sourceUrl
      }"
      appName="${this.appName}"
      appVersion=${VERSION}
      @replay-favicons=${
        // @ts-expect-error - TS2339 - Property 'onFavIcons' does not exist on type 'ArchiveWebApp'.
        this.onFavIcons
      }
      @update-title=${this.onTitle}
      @coll-loaded=${this.onCollLoaded}
      @show-start=${this.onShowStart}
      @show-import=${this.onShowImport}
      @do-upload=${
        // @ts-expect-error - TS2339 - Property 'uploadCollOpts' does not exist on type 'ArchiveWebApp'.
        (e) => (this.uploadCollOpts = e.detail)
      }
      @about-show=${
        // @ts-expect-error - TS2339 - Property 'showAbout' does not exist on type 'ArchiveWebApp'.
        () => (this.showAbout = true)
      }
    ></wr-rec-coll>`;
  }

  renderCollList(text = "") {
    return html`
      <div class="dropdown-row">
        <span>${text}&nbsp;</span>
        <div class="select is-small">
          <select @change="${this.onSelectColl}">
            ${
              // @ts-expect-error - TS2339 - Property 'colls' does not exist on type 'ArchiveWebApp'.
              this.colls &&
              // @ts-expect-error - TS2339 - Property 'colls' does not exist on type 'ArchiveWebApp'.
              this.colls.map(
                (coll) =>
                  html` <option
                    value="${coll.id}"
                    ?selected="${
                      // @ts-expect-error - TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'.
                      this.selCollId === coll.id
                    }"
                  >
                    ${coll.title || coll.loadUrl}
                  </option>`
              )
            }
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
            ?checked="${
              // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'ArchiveWebApp'.
              this.autorun
            }"
            @change="${
              // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'ArchiveWebApp'.
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
      @modal-closed="${() => (this.showNew = null)}"
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
              class="button is-hidden-mobile is-primary ${this.showNew ===
              "loading"
                ? "is-loading "
                : ""}"
              ?disabled="${this.showNew === "loading"}"
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
              .checked="${this.isImportExisting}"
              @change="${(e) =>
                (this.isImportExisting = e.currentTarget.checked)}"
            />
            Add to an existing archived item${this.isImportExisting ? ":" : ""}
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
    return html` <wr-modal
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
      .btrixOpts=${
        // @ts-expect-error - TS2339 - Property 'btrixOpts' does not exist on type 'ArchiveWebApp'.
        this.btrixOpts
      }
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
    // @ts-expect-error - TS2339 - Property 'archivewebpage' does not exist on type 'Window & typeof globalThis'.
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

    // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'ArchiveWebApp'.
    if (this.embed) {
      return "Embedded";
    }

    return "Extension";
  }

  renderAbout() {
    return html`
      <div class="modal is-active">
        <div class="modal-background" @click="${
          // @ts-expect-error - TS2339 - Property 'onAboutClose' does not exist on type 'ArchiveWebApp'.
          this.onAboutClose
        }"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">About ArchiveWeb.page ${this.getDeployType()}</p>
              <button class="delete" aria-label="close" @click="${
                // @ts-expect-error - TS2339 - Property 'onAboutClose' does not exist on type 'ArchiveWebApp'.
                this.onAboutClose
              }"></button>
            </header>
            <section class="modal-card-body">
              <div class="container">
                <div class="content">
                  <div class="is-flex">
                    <div class="has-text-centered" style="width: 220px">
                      <fa-icon class="logo" size="48px" .svg="${wrLogo}"></fa-icon>
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
                      // @ts-expect-error - TS2339 - Property 'onAboutClose' does not exist on type 'ArchiveWebApp'.
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
          <li class="${this.settingsTab === "browsertrix" ? "is-active" : ""}">
            <a @click=${() =>
              (this.settingsTab = "browsertrix")}>Browsertrix</a>
          </li>
          <li class="${this.settingsTab === "ipfs" ? "is-active" : ""}">
            <a @click=${() => (this.settingsTab = "ipfs")}>IPFS</a>
          </li>
        </ul>
      </div>

      <form class="is-flex is-flex-direction-column is-size-7" @submit="${
        this.onSaveSettings
      }">

        ${
          this.settingsTab === "ipfs"
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
            : ""
        }

        ${
          this.settingsTab === "browsertrix"
            ? html`
                <p class="is-size-6 mb-3">
                  Configure your credentials to upload archived items to
                  Browsertrix.
                </p>
                <p class="is-size-7 p-4 has-background-info">
                  Don't have a Browsertrix account? Visit
                  <a target="_blank" href="https://browsertrix.com/"
                    >https://browsertrix.com/</a
                  >
                  for more info.
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
                        value="${(this.btrixOpts && this.btrixOpts.url) ||
                        DEFAULT_BTRIX_URL}"
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
                        value="${this.btrixOpts && this.btrixOpts.username}"
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
                        value="${this.btrixOpts && this.btrixOpts.password}"
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
                        value="${this.btrixOpts && this.btrixOpts.orgName}"
                        placeholder="my-org"
                      />
                    </p>
                  </div>
                </fieldset>
              `
            : ""
        }
        <div class="has-text-centered has-text-danger">${
          this.settingsError
        }</div>
        <div class="has-text-centered mt-4">
          <button class="button is-primary" type="submit">Save</button>
          <button class="button" type="button" @click="${
            this.onCancelSettings
          }">Cancel</button>
        </div>

        <form
          class="is-flex is-flex-direction-column is-size-7"
          @submit="${this.onSaveSettings}"
        >
          ${
            this.settingsTab === "ipfs"
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
              : ""
          }
          ${
            this.settingsTab === "browsertrix"
              ? html`
                  <p class="is-size-6 mb-3">
                    Configure your credentials to upload archived items to
                    Browsertrix Cloud.
                  </p>
                  <fieldset>
                    <div class="field has-addons">
                      <p class="is-expanded">
                        Browsertrix Cloud URL:
                        <input
                          class="input is-small"
                          type="url"
                          name="btrixUrl"
                          id="btrixUrl"
                          value="${this.btrixOpts && this.btrixOpts.url}"
                          placeholder="https://..."
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
                          value="${this.btrixOpts && this.btrixOpts.username}"
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
                          value="${this.btrixOpts && this.btrixOpts.password}"
                          placeholder="Password"
                        />
                      </p>
                    </div>
                    <div class="field has-addons">
                      <p class="is-expanded">
                        Organization Name (Optional)
                        <input
                          class="input is-small"
                          type="text"
                          name="btrixOrgName"
                          id="btrixOrgName"
                          value="${this.btrixOpts && this.btrixOpts.orgName}"
                          placeholder="Organization (optional)"
                        />
                      </p>
                    </div>
                  </fieldset>
                `
              : ""
          }
          <div class="has-text-centered has-text-danger">
            ${
              // @ts-expect-error - TS2339 - Property 'settingsError' does not exist on type 'ArchiveWebApp'.
              this.settingsError
            }
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

    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'ArchiveWebApp'.
    const index = this.renderRoot.querySelector("wr-rec-coll-index");
    if (index) {
      index.loadColls();
    }
    // @ts-expect-error - TS2339 - Property 'showNew' does not exist on type 'ArchiveWebApp'.
    this.showNew = null;
  }

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
    if (!this.selCollId && this.colls && this.colls.length) {
      // @ts-expect-error - TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'colls' does not exist on type 'ArchiveWebApp'.
      this.selCollId = this.colls[0].id;
    }
    // copy from localStorage to chrome.storage
    if (
      // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
      self.chrome &&
      // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
      self.chrome.storage &&
      // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
      self.chrome.storage.local &&
      self.localStorage
    ) {
      await setLocalOption(
        "index:sortKey",
        localStorage.getItem("index:sortKey")
      );
      await setLocalOption(
        "index:sortDesc",
        localStorage.getItem("index:sortDesc")
      );
    }
  }

  _setCurrColl(event) {
    if (!(event instanceof CustomEvent)) {
      this.setDefaultColl();
      return;
    }
    const { detail } = event;
    // @ts-expect-error - TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'.
    this.selCollId = detail.coll;
    //this.selCollTitle = event.detail.title;
    // @ts-expect-error - TS2339 - Property 'colls' does not exist on type 'ArchiveWebApp'. | TS2339 - Property 'colls' does not exist on type 'ArchiveWebApp'.
    if (!this.colls || !this.colls.length) {
      // @ts-expect-error - TS2339 - Property 'colls' does not exist on type 'ArchiveWebApp'.
      this.colls = [
        {
          id: detail.coll,
          title: detail.title,
        },
      ];
    }
  }

  async onShowStart(event) {
    this._setCurrColl(event);
    // @ts-expect-error - TS2339 - Property 'recordUrl' does not exist on type 'ArchiveWebApp'.
    this.recordUrl = event.detail.url || "https://example.com/";
    // @ts-expect-error - TS2551 - Property 'showStartRecord' does not exist on type 'ArchiveWebApp'. Did you mean 'onStartRecord'?
    this.showStartRecord = true;
  }

  onShowImport(event) {
    this._setCurrColl(event);
    // @ts-expect-error - TS2551 - Property 'showImport' does not exist on type 'ArchiveWebApp'. Did you mean 'onShowImport'?
    this.showImport = true;
    // @ts-expect-error - TS2339 - Property 'isImportExisting' does not exist on type 'ArchiveWebApp'.
    this.isImportExisting = true;
  }

  onCollsLoaded(event) {
    // @ts-expect-error - TS2339 - Property 'colls' does not exist on type 'ArchiveWebApp'.
    this.colls = event.detail.colls;
    //this.selCollId = this.colls && this.colls.length ? this.colls[0].id: null;
    this.setDefaultColl();
  }

  async onStartRecord(event) {
    event.preventDefault();
    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'ArchiveWebApp'.
    const url = this.renderRoot.querySelector("#url").value;

    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'ArchiveWebApp'.
    const previewCheckbox = this.renderRoot.querySelector("#preview");
    const isPreview = previewCheckbox && previewCheckbox.checked;

    // @ts-expect-error - TS2551 - Property 'showStartRecord' does not exist on type 'ArchiveWebApp'. Did you mean 'onStartRecord'?
    this.showStartRecord = false;
    // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'ArchiveWebApp'.
    const autorun = this.autorun;

    // @ts-expect-error - TS2339 - Property 'selCollId' does not exist on type 'ArchiveWebApp'.
    const collId = this.selCollId;

    await setLocalOption("defaultCollId", collId);
    await setLocalOption("autorunBehaviors", autorun ? "1" : "0");

    // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'. | TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
    if (self.chrome && self.chrome.runtime) {
      chrome.runtime.sendMessage({
        msg: "startNew",
        url,
        collId,
        autorun,
      });
      // @ts-expect-error - TS2339 - Property 'archivewebpage' does not exist on type 'Window & typeof globalThis'. | TS2339 - Property 'archivewebpage' does not exist on type 'Window & typeof globalThis'.
    } else if (window.archivewebpage && window.archivewebpage.record) {
      const startRec = !isPreview;
      // @ts-expect-error - TS2339 - Property 'archivewebpage' does not exist on type 'Window & typeof globalThis'.
      window.archivewebpage.record({ url, collId, startRec, autorun });
    }
    return false;
  }

  async onTitle(event) {
    super.onTitle(event);

    if (
      // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'ArchiveWebApp'.
      this.embed &&
      // @ts-expect-error - TS2339 - Property 'loadedCollId' does not exist on type 'ArchiveWebApp'.
      this.loadedCollId &&
      event.detail.replayTitle &&
      event.detail.title
    ) {
      try {
        // @ts-expect-error - TS2339 - Property 'loadedCollId' does not exist on type 'ArchiveWebApp'.
        await fetch(`${apiPrefix}/c/${this.loadedCollId}/pageTitle`, {
          method: "POST",
          body: JSON.stringify(event.detail),
        });
      } catch (e) {
        console.warn(e);
      }
    }
  }

  async onSaveSettings(event) {
    event.preventDefault();

    // IPFS settings
    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'ArchiveWebApp'.
    const daemonUrlText = this.renderRoot.querySelector("#ipfsDaemonUrl");
    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'ArchiveWebApp'.
    const gatewayUrlText = this.renderRoot.querySelector("#ipfsGatewayUrl");
    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'ArchiveWebApp'.
    const autodetectCheck = this.renderRoot.querySelector("#ipfsAutoDetect");

    if (daemonUrlText && gatewayUrlText) {
      const daemonUrl = daemonUrlText.value;
      const gatewayUrl = gatewayUrlText.value;
      const autoDetect = autodetectCheck && autodetectCheck.checked;

      // @ts-expect-error - TS2339 - Property 'ipfsOpts' does not exist on type 'ArchiveWebApp'.
      this.ipfsOpts = {
        daemonUrl,
        useCustom: !!daemonUrl,
        gatewayUrl,
        autoDetect,
      };

      await this.checkIPFS();

      // @ts-expect-error - TS2339 - Property 'ipfsOpts' does not exist on type 'ArchiveWebApp'.
      localStorage.setItem("ipfsOpts", JSON.stringify(this.ipfsOpts));
    }

    // Browsertrix Settings
    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'ArchiveWebApp'.
    const btrixUrl = this.renderRoot.querySelector("#btrixUrl");
    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'ArchiveWebApp'.
    const btrixUsername = this.renderRoot.querySelector("#btrixUsername");
    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'ArchiveWebApp'.
    const btrixPassword = this.renderRoot.querySelector("#btrixPassword");
    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'ArchiveWebApp'.
    const btrixOrgName = this.renderRoot.querySelector("#btrixOrgName");

    if (btrixUrl && btrixUsername && btrixPassword) {
      const url = btrixUrl.value;
      const username = btrixUsername.value;
      const password = btrixPassword.value;
      const orgName = (btrixOrgName && btrixOrgName.value) || "";

      if (url && username && password) {
        const btrixOpts = { url, username, password, orgName };

        let client;

        try {
          client = await BtrixClient.login(btrixOpts);
          // @ts-expect-error - TS2339 - Property 'settingsError' does not exist on type 'ArchiveWebApp'.
          this.settingsError = "";
        } catch (e) {
          // @ts-expect-error - TS2339 - Property 'settingsError' does not exist on type 'ArchiveWebApp'.
          this.settingsError =
            "Unable to log in to Browsertrix. Check your credentials.";
          return false;
        }

        localStorage.setItem("btrixOpts", JSON.stringify(btrixOpts));
        // @ts-expect-error - TS2339 - Property 'btrixOpts' does not exist on type 'ArchiveWebApp'.
        this.btrixOpts = { ...btrixOpts, client };
      } else {
        // @ts-expect-error - TS2339 - Property 'btrixOpts' does not exist on type 'ArchiveWebApp'.
        this.btrixOpts = null;
        localStorage.removeItem("btrixOpts");
      }
    }

    // @ts-expect-error - TS2339 - Property 'settingsTab' does not exist on type 'ArchiveWebApp'.
    localStorage.setItem("settingsTab", this.settingsTab);

    // @ts-expect-error - TS2339 - Property 'showSettings' does not exist on type 'ArchiveWebApp'.
    this.showSettings = false;

    return false;
  }

  async onCancelSettings() {
    // @ts-expect-error - TS2339 - Property 'settingsError' does not exist on type 'ArchiveWebApp'.
    this.settingsError = null;
    // @ts-expect-error - TS2339 - Property 'showSettings' does not exist on type 'ArchiveWebApp'.
    this.showSettings = false;
  }

  async checkIPFS() {
    // @ts-expect-error - TS2339 - Property 'ipfsOpts' does not exist on type 'ArchiveWebApp'.
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

// @ts-expect-error - TS2345 - Argument of type 'typeof ArchiveWebApp' is not assignable to parameter of type 'CustomElementConstructor'.
customElements.define("archive-web-page-app", ArchiveWebApp);

export { ArchiveWebApp, Loader, Embed };

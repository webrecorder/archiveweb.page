import { html, css, wrapCss, IS_APP, apiPrefix } from "replaywebpage/src/misc";

// replaywebpage imports
import { ReplayWebApp, Embed, Loader } from "replaywebpage";

import fasHelp from "@fortawesome/fontawesome-free/svgs/solid/question-circle.svg";
import fasPlus from "@fortawesome/fontawesome-free/svgs/solid/plus.svg";

import fasUpload from "@fortawesome/fontawesome-free/svgs/solid/upload.svg";
//import fasCog from "@fortawesome/fontawesome-free/svgs/solid/cog.svg";

import "./coll";
import "./coll-info";
import "./coll-index";
import "./recordembed";

import wrRec from "../../assets/recLogo.svg";
import wrLogo from "../../assets/awp-logo.svg";
import prettyBytes from "pretty-bytes";


// eslint-disable-next-line no-undef
const VERSION = __AWP_VERSION__;


//============================================================================
class ArchiveWebApp extends ReplayWebApp
{
  constructor() {
    super();

    this.navMenuShown = false;
    this.showCollDrop = false;
    this.colls = [];
    this.autorun = localStorage.getItem("autorunBehaviors") === "1";

    if (window.archivewebpage) {
      window.archivewebpage.setDownloadCallback((progress) => this.onDownloadProgress(progress));
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
      download: { type: Object }
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
  }

  handleMessages() {
    // support upload
    window.addEventListener("message", async (event) => {
      if (this.embed && this.loadedCollId && typeof(event.data) === "object" && event.data.msg_type === "downloadToBlob") {
        const download = await fetch(`${apiPrefix}/c/${this.loadedCollId}/dl?format=wacz&pages=all`);
        const blob = await download.blob();
        event.source.postMessage({msg_type: "downloadedBlob", coll: this.loadedCollId, url: URL.createObjectURL(blob)});
      }
    });
  }

  onStartLoad(event) {
    if (this.embed) {
      return;
    }
    
    this.showImport = false;
    this.sourceUrl = event.detail.sourceUrl;
    this.loadInfo = event.detail;

    if (this.isImportExisting && this.selCollId) {
      this.loadInfo.importCollId = this.selCollId;
    }
  }

  onCollLoaded(event) {
    if (this.loadInfo && this.loadInfo.importCollId) {
      if (navigator.serviceWorker.controller) {
        const msg = {"msg_type": "reload", "full": true, "name": this.loadInfo.importCollId};
        navigator.serviceWorker.controller.postMessage(msg);
      }
    }

    if (this.embed) {
      this.loadedCollId = event.detail.collInfo && event.detail.collInfo.coll;
    }

    super.onCollLoaded(event);

    if (!event.detail.alreadyLoaded && event.detail.sourceUrl && event.detail.sourceUrl !== this.sourceUrl) {
      this.sourceUrl = event.detail.sourceUrl;
    }
  }

  getLoadInfo(sourceUrl) {
    this.disableCSP();

    if (this.loadInfo) {
      return this.loadInfo;
    }

    const customColl = sourceUrl.startsWith("local://") ? sourceUrl.slice("local://".length) : sourceUrl;

    return {customColl};
  }

  async disableCSP() {
    // necessary for chrome 94> up due to new bug introduced
    // 
    if (this.embed || (!self.chrome || !self.chrome.runtime)) {
      return;
    }

    const m = navigator.userAgent.match(/Chrome\/([\d]+)/);
    if (!m || Number(m[1]) < 94) {
      return;
    }

    console.log("attempt to disable CSP to ensure replay works");
    let tabId = await new Promise((resolve) => {
      chrome.tabs.getCurrent((msg) => resolve(msg.id));
    });

    chrome.runtime.sendMessage({
      msg: "disableCSP",
      tabId
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
        background-color: rgba(10, 10, 10, 0.50);
      }

      .recorder .modal-card-head {
        background-color: #97a1ff;
      }

      .extra-padding {
        padding: 1.0em;
      }

      .less-padding {
        padding-top: 1.0em;
        padding-bottom: 1.0em;
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
        margin-left: auto;
        max-width: 300px;
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
    return html`
    <a href="https://archiveweb.page/guide" target="_blank" class="navbar-item is-size-6">
    <fa-icon .svg="${fasHelp}" aria-hidden="true"></fa-icon><span>&nbsp;User Guide</span>

    <a href="?about" @click="${(e) => { e.preventDefault(); this.showAbout = true;} }"class="navbar-item is-size-6">About
    </a>`;
  }

  renderNavBrand() {
    return html`
      <span id="home" class="logo-text has-text-weight-bold is-size-6 has-allcaps wide-only">
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
              <button class="button is-small no-pad-mobile" title="Create New..." @click="${() => this.showNew = "show"}">
                <span class="icon">
                  <fa-icon .svg=${fasPlus}></fa-icon>
                </span>
                <span class="is-hidden-mobile">Create New...</span>
              </button>
              <button class="button is-small no-pad-mobile" title="Import Archive..." @click="${() => this.showImport = true}">
                <span class="icon">
                  <fa-icon .svg=${fasUpload}></fa-icon>
                </span>
                <span class="is-hidden-mobile">Import Archive...</span>
              </button>
              <button class="button is-small no-pad-mobile" title="Start Recording..." ?disabled="${!this.colls}" @click="${this.onShowStart}">
                <span class="icon">
                  <fa-icon size="1.0em" aria-hidden="true" .svg="${wrRec}"></fa-icon>
                </span>
                <span class="is-hidden-mobile">Start Recording...</span>
              </button>
              <div class="infomsg is-hidden-mobile">The ArchiveWeb.page ${IS_APP ? "App" : "Extension"} allows you to create web archives directly in your browser!</div>
            </div>
          </div>
        </div> 
      </section>

      <wr-rec-coll-index
       dateName="Date Created"
       headerName="Current Web Archives"
       @show-start=${this.onShowStart}
       @show-import=${this.onShowImport}
       @colls-updated=${this.onCollsLoaded}
       style="overflow: visible"
       >
      </wr-rec-coll-index>
     `;
  }

  render() {
    return html`
    ${this.showStartRecord ? this.renderStartModal() : ""}
    ${this.showNew ? this.renderNewCollModal() : ""}
    ${this.showImport ? this.renderImportModal() : ""}
    ${this.showDownloadProgress && this.download ? this.renderDownloadModal() : ""}
    ${super.render()}`;
  }

  renderColl() {
    return html`
    <wr-rec-coll 
    .editable="${true}"
    .clearable="${this.embed}"
    .browsable="${!this.embed}"
    .loadInfo="${this.getLoadInfo(this.sourceUrl)}"
    .appLogo="${this.mainLogo}"
    .autoUpdateInterval=${this.embed || this.showDownloadProgress ? 0 : 10}
    embed="${this.embed}"
    sourceUrl="${this.sourceUrl}"
    appName="${this.appName}"
    appVersion=${VERSION}
    @replay-favicons=${this.onFavIcons}
    @update-title=${this.onTitle}
    @coll-loaded=${this.onCollLoaded}
    @show-start=${this.onShowStart}
    @show-import=${this.onShowImport}
    @about-show=${() => this.showAbout = true}></wr-rec-coll>`;
  }

  renderCollList(text = "") {
    return html`
    <div class="dropdown-row">
      <span>${text}&nbsp;</span>
      <div class="select is-small">
        <select @change="${this.onSelectColl}">
        ${this.colls && this.colls.map((coll) => html`
          <option value="${coll.id}"
          ?selected="${this.selCollId === coll.id}"
          >${coll.title || coll.loadUrl}</option>`)}
        </select>
      </div>
    </div>
    `;
  }

  renderStartModal() {
    return html`
    <wr-modal @modal-closed="${() => this.showStartRecord = false}" title="Start Recording">
      ${this.renderCollList("Archive To:")}
      <div class="field">
        <label class="checkbox is-size-7">
        <input type="checkbox" ?checked="${this.autorun}" @change="${(e) => this.autorun = e.currentTarget.checked}">
        Start With Autopilot
        </label>
      </div>

      <form class="is-flex is-flex-direction-column" @submit="${this.onStartRecord}">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input class="input" type="url" required
            name="url" id="url" value="${this.recordUrl}"
            placeholder="Enter a URL to Start Recording">
          </p>
          <div class="control">
            <button type="submit" class="button is-hidden-mobile is-outlined is-link">
              <span class="icon">
                <fa-icon size="1.0em" aria-hidden="true" .svg="${wrRec}"></fa-icon>
              </span>
              <span>Go!</span>
            </button>
          </div>
        </div>
        ${IS_APP ? html`
        <label class="checkbox">
          <input id="preview" type="checkbox"><span>&nbsp;Start in Preview Mode (without recording.)</span>
        </label>` : ""}
      </form>
    </wr-modal>`;
  }

  renderNewCollModal() {
    return html`
    <wr-modal @modal-closed="${() => this.showNew = null}" title="Create New Archive">
      <form @submit="${this.onNewColl}" class="create-new">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input type="text" id="new-title" name="new-title" class="input" required placeholder="Enter the title for the new archive">
          </p>
          <div class="control">
            <button type="submit" class="button is-hidden-mobile is-primary ${this.showNew === "loading" ? "is-loading " : ""}" ?disabled="${this.showNew === "loading"}">Create New</button>
          </div>
        </div>
      </form>
    </wr-modal`;
  }

  renderImportModal() {
    return html`
    <wr-modal style="--modal-width: 740px" @modal-closed="${() => this.showImport = false}" title="Import an Existing Archive">
      <wr-chooser
        style="flex: auto"
        .newFullImport="${true}"
        noHead="${true}"
        @load-start=${this.onStartLoad}>
      </wr-chooser>
      <div class="is-flex is-flex-wrap-wrap is-align-items-baseline my-2">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" name="add-existing" .checked="${this.isImportExisting}" @change="${(e) => this.isImportExisting = e.currentTarget.checked}">
            Add to an existing archive collection${this.isImportExisting ? ":" : ""}
          </label>
        </div>
        ${this.isImportExisting ? this.renderCollList() : ""}
      </div>
    </wr-modal`;
  }

  renderDownloadModal() {
    const renderDLStatus = () => {
      switch (this.download.state) {
      case "progressing":
        return html`
          <button @click="${this.onDownloadCancel}" class="button is-danger">Cancel Download</button>
          `;

      case "interrupted":
        return html`
          <p class="has-text-weight-bold has-text-danger">The download was interrupted</p>
          <button @click="${this.onDownloadCancel}" class="button">Close</button>
          `;
    
      case "cancelled":
        return html`
          <p class="has-text-weight-bold has-text-danger">The download was canceled</p>
          <button @click="${this.onDownloadCancel}" class="button">Close</button>
          `;

      case "completed":
        return html`
          <p class="has-text-weight-bold has-text-primary">Download Completed!</p>
          <button @click="${this.onDownloadCancel}" class="button">Close</button>
          `;
      }
    };

    return html`
    <wr-modal .noBgClose=${true} style="--modal-width: 740px" @modal-closed="${() => this.showDownloadProgress = false}" title="Download Progress">
      <div class="dl-progress">
        <div>Downloading to: <i>${this.download.filename}</i></div>
        <div>Size Downloaded: <b>${prettyBytes(this.download.currSize)}</b></div>
        <div>Time Elapsed: ${Math.round((Date.now() / 1000) - this.download.startTime)} seconds</div>

        <div class="has-text-centered">
        ${renderDLStatus()}
        </div>
      </div>
    </wr-modal>`;
  }

  onDownloadProgress(progress) {
    if (progress.filename) {
      this.showDownloadProgress = true;
      this.download = progress;
    } else if (this.download) {
      this.download = {...this.download, state: progress.state};
    }
  }

  onDownloadCancel() {
    if (window.archivewebpage) {
      if (this.download && this.download.state === "progressing") {
        window.archivewebpage.downloadCancel(this.download);
      } else {
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
              <button class="delete" aria-label="close" @click="${this.onAboutClose}"></button>
            </header>
            <section class="modal-card-body">
              <div class="container">
                <div class="content">
                  <div class="is-flex">
                    <div class="has-text-centered" style="width: 220px">
                      <fa-icon class="logo" size="48px" .svg="${wrLogo}"></fa-icon>
                      <div style="font-size: smaller; margin-bottom: 1em">${this.getDeployType()} v${VERSION}</div>
                    </div>

                    ${IS_APP ? html`
                    <p>ArchiveWeb.page App is a standalone app for Mac, Windows and Linux that allows users to create web archives as they browse</p>

                    ` : html`
                    <p>ArchiveWeb.page allows users to create web archives directly in your browser!</p>`}
                  </div>

                  <p>See the <a href="https://archiveweb.page/guide" target="_blank">ArchiveWeb.page Guide</a> for more info on how to use this tool.</p>

                  <p>Full source code is available at:
                    <a href="https://github.com/webrecorder/archiveweb.page" target="_blank">https://github.com/webrecorder/archiveweb.page</a>
                  </p>

                  <p>ArchiveWeb.page is part of the <a href="https://webrecorder.net/" target="_blank">Webrecorder Project</a>.</p>

                  <h3>Privacy Policy</h3>
                  <p class="is-size-7">ArchiveWeb.page allows users to archive what they browse, this archive data is stored directly in the browser.
                  Users can downloaded this data as files to their harddrive. Users can also delete any and all archived data at any time.
                  ArchiveWeb.page does not collect any usage or tracking data.</p>

                  <p class="is-size-7">ArchiveWeb.page includes an experimental sharing option for each archive collection. Users can choose to share select archives on a peer-to-peer network (IPFS) via a unique id.
                  Once shared on this network, the data may become accessible to others.
                  All archives are private and not shared by default, unless explicitly opted-in by the user. (A warning is displayed when sharing via IPFS.)</p>

                  <h4>Disclaimer of Warranties</h4>
                  <p class="is-size-7">The application is provided "as is" without any guarantees.</p>
                  <details class="is-size-7">
                    <summary>Legalese:</summary>
                    <p style="font-size: 0.8rem">DISCLAIMER OF SOFTWARE WARRANTY. WEBRECORDER SOFTWARE PROVIDES THIS SOFTWARE TO YOU "AS AVAILABLE"
                    AND WITHOUT WARRANTY OF ANY KIND, EXPRESS, IMPLIED OR OTHERWISE,
                    INCLUDING WITHOUT LIMITATION ANY WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
                  </details>

                  <div class="has-text-centered">
                    <a class="button is-warning" href="#" @click="${this.onAboutClose}">Close</a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>`;
  }

  async onNewColl(event) {
    this.showNew = "loading";
    event.preventDefault();
    const title = this.renderRoot.querySelector("#new-title").value;

    const method = "POST";
    const body = JSON.stringify({"metadata": {title}});
    const resp = await fetch(`${apiPrefix}/c/create`, {method, body});
    await resp.json();
    
    const index = this.renderRoot.querySelector("wr-rec-coll-index");
    if (index) {
      index.loadColls();
    }
    this.showNew = null;
  }

  onSelectColl(event) {
    //this.selCollId = event.currentTarget.getAttribute("data-id");
    //this.selCollTitle = event.currentTarget.getAttribute("data-title");
    //this.showCollDrop = false;
    this.selCollId = event.currentTarget.value;
  }

  _setCurrColl(event) {
    if (!(event instanceof CustomEvent)) {
      this.selCollId = this.colls && this.colls.length ? this.colls[0].id: null;
      return;
    }
    const { detail } = event;
    this.selCollId = detail.coll;
    //this.selCollTitle = event.detail.title;
    if (!this.colls || !this.colls.length) {
      this.colls = [{
        id: detail.coll,
        title: detail.title
      }];
    }
  }

  async onShowStart(event) {
    this._setCurrColl(event);
    this.recordUrl = event.detail.url || "https://example.com/";
    this.showStartRecord = true;
  }

  onShowImport(event) {
    this._setCurrColl(event);
    this.showImport = true;
    this.isImportExisting = true;
  }

  onCollsLoaded(event) {
    this.colls = event.detail.colls;
    this.selCollId = this.colls && this.colls.length ? this.colls[0].id: null;
  }

  onStartRecord(event) {
    event.preventDefault();
    const url = this.renderRoot.querySelector("#url").value;
    
    this.showStartRecord = false;
    const autorun = this.autorun;

    const collId = this.selCollId;

    localStorage.setItem("autorunBehaviors", autorun ? "1" : "0");

    if (self.chrome && self.chrome.runtime) {
      chrome.runtime.sendMessage({
        msg: "startNew",
        url,
        collId,
        autorun,
      });
    } else if (window.archivewebpage && window.archivewebpage.record) {
      const previewCheckbox = this.renderRoot.querySelector("#preview");
      const startRec = !(previewCheckbox && previewCheckbox.checked);
      window.archivewebpage.record({url, collId, startRec, autorun});
    }
    return false;
  }

  async onTitle(event) {
    super.onTitle(event);

    if (this.embed && this.loadedCollId && event.detail.replayTitle && event.detail.title) {
      try {
        await fetch(`${apiPrefix}/c/${this.loadedCollId}/pageTitle`, {method: "POST", body: JSON.stringify(event.detail)});
      } catch (e) {
        console.warn(e);
      }
    }
  }
}


customElements.define("archive-web-page-app", ArchiveWebApp);

export { ArchiveWebApp, Loader, Embed };

import { LitElement, html, css, wrapCss, IS_APP, clickOnSpacebarPress } from 'replaywebpage/src/misc';

// replaywebpage imports
import { ReplayWebApp, CollIndex, Coll, Embed, Loader } from 'replaywebpage';

import prettyBytes from 'pretty-bytes';

import fasPlus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';
import fasDownload from '@fortawesome/fontawesome-free/svgs/solid/download.svg';
import fasCaretDown from '@fortawesome/fontawesome-free/svgs/solid/caret-down.svg';
import fasShare from '@fortawesome/fontawesome-free/svgs/solid/share.svg';
import fasReshare from '@fortawesome/fontawesome-free/svgs/solid/retweet.svg';
import fasX from '@fortawesome/fontawesome-free/svgs/solid/times.svg';

//import wrText from '../assets/webrecorder-text.svg';
import wrLogo from '../assets/wr-logo.svg';
import wrRec from '../assets/recLogo.svg';


//============================================================================
class ArchiveWebApp extends ReplayWebApp
{
  constructor() {
    super();

    this.navMenuShown = false;
    this.showCollDrop = false;
    this.colls = [];
  }

  get appName() {
    return "ArchiveWeb.page";
  }

  get homeUrl() {
    return "/replay/index.html";
  }

  static get properties() {
    return {
      ...ReplayWebApp.properties,

      recordShown: { type: Boolean },
      showCollDrop: { type: Boolean },
      colls: { type: Array },
      selCollId: { type: String },
      selCollTitle: { type: String }
    }
  }

  initRoute() {
    this.inited = true;
    const pageParams = new URLSearchParams(window.location.search);

    this.sourceUrl = pageParams.get("source") || "";
  }

  getLoadInfo(sourceUrl) {
    const customColl = sourceUrl.startsWith("local://") ? sourceUrl.slice("local://".length) : sourceUrl;

    return {customColl};
  }

  static get styles() {
    return wrapCss(ArchiveWebApp.appStyles);
  }

  static get appStyles() {
    return wrapCss(css`
      :host {
        font-size: initial;
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
  
      @media screen and (max-width: 768px) {
        #url {
          border-bottom-right-radius: 4px;
          border-top-right-radius: 4px;
        }
      }

      ${ReplayWebApp.appStyles}
    `);
  }

  get mainLogo() {
    return wrLogo;
  }

  renderNavEnd() {
    return html``;
  }

  // renderNavBrand() {
  //   return html`
  //   <fa-icon class="wr-text" width="7.0rem" size="" .svg="${wrText}"/>
  //   `;
  // }

  renderNavBrand() {
    return html`
      <span id="home" class="logo-text has-text-weight-bold is-size-6 has-allcaps wide-only">
      <span class="has-text-black">archive</span>
      <span class="has-text-link">web.page</span>
      <span class="is-sr-only">Home</span>
    </span>`;
  }

  renderHomeIndex() {
    return html`
      <section class="section less-padding">
        <div class="columns">
          <div class="column">
            <div class="message is-small is-9">
              <div class="message-header">New Web Archive</div>
              <div class="extra-padding message-body">
                <form class="is-flex" @submit="${this.onNewColl}">
                  <div class="field has-addons">
                    <div class="control is-expanded">
                      <input class="input is-small" id="new-name" type="text" required placeholder="Enter New Archive Name">
                    </div>
                    <div class="control">
                      <button class="button is-small is-success" type="submit">
                        <span class="icon">
                          <fa-icon .svg=${fasPlus}></fa-icon>
                        </span>
                        <span>Create New</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="column is-3 is-hidden-mobile">
            <div class="message is-small">
              <div class="message-body">
                The ArchiveWeb.page ${IS_APP ? "App" : "Chrome extension"} allows you to create web archives directly in your browser!  
              </div>
            </div>
          </div>
        </div>
      </section>

      <wr-rec-coll-index
       dateName="Date Created"
       headerName="Current Web Archives"
       @show-start=${this.onShowStart}
       >
      </wr-rec-coll-index>`;
  }

  render() {
    return html`
    ${this.recordShown ? this.renderStartModal() : ``}
    ${super.render()}`;
  }

  renderColl() {
    return html`
    <wr-rec-coll 
    .editable="${true}"
    .loadInfo="${this.getLoadInfo(this.sourceUrl)}"
    .appLogo="${this.mainLogo}"
    sourceUrl="${this.sourceUrl}"
    appName="${this.appName}"
    @replay-favicons=${this.onFavIcons}
    @update-title=${this.onTitle}
    @coll-loaded=${this.onCollLoaded}
    @show-start=${this.onShowStart}
    @about-show=${(e) => this.showAbout = true}></wr-rec-coll>`;
  }

  renderStartModal() {
    return html`
    <wr-modal @modal-closed="${(e) => this.recordShown = false}" title="Start Recording">
      <div class="dropdown-row">
        <span>Archive To:&nbsp;</span>
        <div class="dropdown ${this.showCollDrop ? 'is-active' : ''}">
          <div class="dropdown-trigger">
            <button @click="${this.onShowDrop}" class="button is-small" aria-haspopup="true" aria-controls="dropdown-menu" ?disabled="${this.recording}">
              <span>${this.selCollTitle}</span>
              <span class="icon">
                <fa-icon .svg=${fasCaretDown}></fa-icon>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              ${this.colls.map((coll) => html`
                <a @click=${this.onSelectColl} data-title="${coll.title}" data-id="${coll.id}" class="dropdown-item">${coll.title}</a>
              `)}
            </div>
          </div>
        </div>
      </div>

      <form class="is-flex" @submit="${this.onStartRecord}">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input class="input" type="url" required
            name="url" id="url" value="https://example.com/"
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
      </form>
    </wr-modal>`;
  }

  renderAbout() {
    return html`
      <div class="modal is-active">
        <div class="modal-background" @click="${this.onAboutClose}"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">About ArchiveWeb.page ${IS_APP ? 'App' : 'Extension'}</p>
              <button class="delete" aria-label="close" @click="${this.onAboutClose}"></button>
            </header>
            <section class="modal-card-body">
              <div class="container">
                <div class="content">
                  <div style="display: flex">
                    <div class="has-text-centered" style="width: 220px">
                      <fa-icon class="logo" size="48px" .svg="${wrLogo}"></fa-icon>
                      <div style="font-size: smaller; margin-bottom: 1em">${IS_APP ? 'App' : 'Extension'} v${__VERSION__}</div>
                    </div>

                    ${IS_APP ? html`
                    <p>ArchiveWeb.page App is a standalone app for Mac, Windows and Linux that allows users to create web archives as they browse</p>

                    ` : html`
                    <p>ArchiveWeb.page allows users to create web archives directly in your browser!</p>`}
                  </div>

                  <p>Full source code is available at:
                    <a href="https://github.com/webrecorder/archiveweb.page" target="_blank">https://github.com/webrecorder/archiveweb.page</a>
                  </p>

                  <p>ArchiveWeb.page is part of the <a href="https://webrecorder.net/" target="_blank">Webrecorder Project</a>.</p>
                  <p>This project is still in beta and some features may not work yet.</p>

                  <h4>Disclaimer of Warranties</h4>
                  <p>The application is provided "as is" without any guarantees.</p>
                  <details>
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

  async onShowDrop(event) {
    const resp = await fetch("./wabac/api/index");
    const data = await resp.json();

    this.colls = data.colls;

    this.showCollDrop = true;
    event.stopPropagation();
  }

  async onNewColl(event) {
    const title = this.renderRoot.querySelector("#new-name").value;

    const method = "POST";
    const body = JSON.stringify({"metadata": {title}});
    const resp = await fetch("./wabac/api/create", {method, body});
    const data = await resp.json();
    console.log(data);
  }

  onSelectColl(event) {
    this.selCollId = event.currentTarget.getAttribute("data-id");
    this.selCollTitle = event.currentTarget.getAttribute("data-title");
    this.showCollDrop = false;
  }

  onShowStart(event) {
    this.selCollId = event.detail.coll;
    this.selCollTitle = event.detail.title;
    this.recordShown = true;
  }

  onStartRecord(event) {
    event.preventDefault();
    const url = this.renderRoot.querySelector("#url").value;
    
    this.recordShown = false;

    if (self.chrome && self.chrome.runtime) {
      chrome.runtime.sendMessage({
        msg: "startNew",
        url,
        collId: this.selCollId,
      });
    } else if (window.archivewebpage && window.archivewebpage.record) {
      window.archivewebpage.record(url, this.selCollId);
    }
    return false;
  }
}


//============================================================================
class WrRecColl extends Coll
{
  renderExtraToolbar(isDropdown = false) {
    if (isDropdown) {
      return '';
    }

    return html`
    <a href="#" role="button"
    class="${!isDropdown ? 'button narrow is-borderless' : 'dropdown-item is-hidden-tablet'}"
      title="Start Recording" aria-label="Start Recording" aria-controls="record"
      @click="${this.onShowStart}" @keyup="${clickOnSpacebarPress}">
      <span class="icon is-small">
        <fa-icon size="1.2em" aria-hidden="true" .svg="${wrRec}"></fa-icon>
      </span>
    </a>`;
  }

  renderCollInfo() {
    return html`
    <div class="info-bg">
      <wr-rec-coll-info
      class="is-list"
      .coll="${this.collInfo}"
      ?detailed="${true}"
      ></wr-rec-coll-info>
    </div>`;
  }

  onShowStart() {
    const coll = this.coll;
    const title = this.collInfo.title;
    this.dispatchEvent(new CustomEvent("show-start", {detail: {coll, title}}));
  }
}

//============================================================================
class WrRecCollIndex extends CollIndex
{
  constructor() {
    super();
    this.deleteConfirm = null;
  }

  static get properties() {
    return {
      ...CollIndex.properties,

      deleteConfirm: { type: Object }
    }
  }

  renderCollInfo(coll) {
    return html`<wr-rec-coll-info data-coll="${coll.id}" .coll=${coll}></wr-rec-coll-info>`;
  }

  render() {
    return html`
    ${super.render()}
    ${this.renderDeleteConfirm()}
    `;
  }

  renderDeleteConfirm() {
    if (!this.deleteConfirm) {
      return null;
    }

    return html`
    <wr-modal bgClass="has-background-grey-lighter" @modal-closed="${(e) => this.deleteConfirm = null}" title="Confirm Delete">
      <p>Are you sure you want to permanentely delete the archive <b>${this.deleteConfirm.title}</b>
      (Size: <b>${prettyBytes(this.deleteConfirm.size)}</b>)</p>
      <button @click="${this.doDelete}"class="button is-danger">Delete</button>
      <button @click="${(e) => this.deleteConfirm = null}" class="button">Cancel</button>
    </wr-modal>`;
  }

  onDeleteColl(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.sortedColls) {
      return;
    }

    const index = Number(event.currentTarget.getAttribute("data-coll-index"));

    this.deleteConfirm = this.sortedColls[index];
  }

  async doDelete() {
    if (!this.deleteConfirm) {
      return;
    }

    this._deleting[this.deleteConfirm.sourceUrl] = true;
    this.requestUpdate();

    const info = this.renderRoot.querySelector(`wr-rec-coll-info[data-coll="${this.deleteConfirm.id}"]`);

    if (info) {
      await info.doDelete();
    }

    this.deleteConfirm = null;
  }

  renderEmpty() {
    return html`No Archives. Click "Create New" above to create a new archive and start recording!`;
  }
}

//============================================================================
class WrRecCollInfo extends LitElement
{
  constructor() {
    super();
    this.detailed = false;
    this.ipfsURL = null;
    this.shareWait = false;
  }

  static get properties() {
    return {
      coll: { type: Object },
      detailed: { type: Boolean },
      ipfsURL: { type: String },
      shareWait: { type: Boolean }
    }
  }

  static get styles() {
    return wrapCss(css`
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
    
    `);
  }

  updated(changedProps) {
    if (changedProps.has("coll") && this.coll) {

      // Fix for loading single collection from previous versions
      if (this.coll.id === "main.archive" && this.coll.sourceUrl !== "local://main.archive") {
        this.coll = {...this.coll, sourceUrl: "local://main.archive"};
      }

      if (this.coll.ipfsPins && this.coll.ipfsPins.length) {
        this.ipfsURL = this.coll.ipfsPins[this.coll.ipfsPins.length - 1].url;
      }
    }
  }

  render() {
    const coll = this.coll;
    const detailed = this.detailed;

    return html`
      <div class="columns">
        <div class="column is-2">
          <p class="minihead">Title</p>
          <span class="subtitle has-text-weight-bold">
            ${detailed ? html`
            ${coll.title}
            ` : html`
            <a href="?source=${encodeURIComponent(coll.sourceUrl)}">${coll.title}</a>`}
          </span>
        </div>

        <div class="column is-2"><p class="minihead">Date Created</p>${coll.ctime ? new Date(coll.ctime).toLocaleString() : ""}</div>
        
        <div class="column is-1"><p class="minihead">Total Size</p>
        ${prettyBytes(Number(coll.size || 0))}
        </div>

        <div class="column is-2">
          <p class="minihead">Actions</p>
          <div class="button-row is-flex">
            <button @click="${this.onDownload}" class="button is-small" title="Download">
              <span class="icon is-small">
                <fa-icon aria-hidden="true" .svg="${fasDownload}"></fa-icon>
              </span>
            </button>
            <button @click="${this.onShowStart}" class="button is-small" title="Start Recording...">
              <span class="icon">
                <fa-icon aria-hidden="true" .svg="${wrRec}"></fa-icon>
              </span>
            </button>
          </div>
        </div>
        
        <div class="column is-size-7">
          <p class="minihead">Sharing (via IPFS)</p>
          <div class="button-row is-flex">
            ${this.ipfsURL ? html`
              <button @click="${this.onCopyLink}" class="button is-link is-light is-small">
                <span class="icon is-small">
                  <fa-icon .svg="${fasShare}"></fa-icon>
                </span>
                <span>Copy Sharable Link</span>
              </button>

              <button class="button is-small ${this.shareWait ? 'is-loading' : ''}" @click="${this.onPin}">
                <span class="icon is-small">
                  <fa-icon .svg="${fasReshare}"></fa-icon>
                </span>
                <span>${!this.ipfsURL ? "Share" : "Reshare Latest"}</span>
              </button>

              <button class="button is-small" @click="${this.onUnpin}">
                <span class="icon is-small">
                  <fa-icon .svg="${fasX}"></fa-icon>
                </span>
                <span>Unshare</span>
              </button>

              `: html`
            
              <button class="button is-small ${this.shareWait ? 'is-loading' : ''}" @click="${this.onPin}">
                <span class="icon is-small">
                  <fa-icon .svg="${fasShare}"></fa-icon>
                </span>
                <span>Start Sharing</span>
              </button>
            `}
          </div>
        </div>
      </div>
      `;
  }

  onDownload() {
    const params = new URLSearchParams();
    params.set("format", "wacz");
    params.set("filename", this.coll.title);
    params.set("pages", "all");

    window.location.href = `/replay/wabac/api/${this.coll.id}/dl?` + params.toString();
  }

  onShowStart() {
    const coll = this.coll.id;
    const title = this.coll.title;
    this.dispatchEvent(new CustomEvent("show-start", {bubbles: true, composed: true, detail: {coll, title}}));
  }

  async onPin() {
    this.shareWait = true;
    const json = await this.ipfsApi(this.coll.id, true);

    if (json.ipfsURL) {
      this.ipfsURL = json.ipfsURL;
    }
    this.onCopyLink();
    this.shareWait = false;
  }

  async onUnpin() {
    this.shareWait = true;
    const json = await this.ipfsApi(this.coll.id, false);

    if (json.removed) {
      this.ipfsURL = null;
    }
    this.shareWait = false;
  }

  ipfsApi(collId, pin) {
    if (window.archivewebpage) {
      return (pin ? 
        window.archivewebpage.ipfsPin(this.coll.id) : 
        window.archivewebpage.ipfsUnpin(this.coll.id));
    }

    // if (useSw) {
    //   return fetch(`./wabac/api/${this.coll.id}/ipfs/${pin ? "pin" : "unpin"}`, {method: "POST"}).then(response => response.json());
    // }

    return new Promise((resolve) => {
      const port = chrome.runtime.connect({name: "share-port"});
      port.onMessage.addListener((message) => {
        resolve(message);
      });
      port.postMessage({collId, pin});
    });
  }

  onCopyLink() {
    const params = new URLSearchParams();
    params.set("source", this.ipfsURL);
    const url = "https://replayweb.page/?" + params.toString();

    navigator.clipboard.writeText(url);
  }

  async doDelete() {
    const resp = await fetch(`./wabac/api/${this.coll.id}`, {method: 'DELETE'});
    if (resp.status === 200) {
      const json = await resp.json();
      this.colls = json.colls;
    }

    if (this.coll.ipfsPins && this.coll.ipfsPins.length) {
      await this.ipfsApi(this.coll.id, false);
    }
  }
}

class WrModal extends LitElement
{
  constructor() {
    super();
    this.title = "";
    this.bgClass = "";
  }

  static get properties() {
    return {
      title: { type: String },
      bgClass: { type: String }
    }
  }

  static get styles() {
    return wrapCss(css`
    .modal-background {
      background-color: rgba(10, 10, 10, 0.50);
    }

    .modal-card-head {
      background-color: var(--background, #97a1ff);
    }
    `);
  }

  render() {
    return html`
    <div class="modal is-active">
      <div class="modal-background" @click="${this.onClose}"></div>
      <div class="modal-card">
        <header class="modal-card-head ${this.bgClass}">
          <p class="modal-card-title is-3">${this.title}</p>
          <button class="delete" aria-label="close" @click="${this.onClose}"></button>
        </header>
        <section class="modal-card-body">
          <slot></slot>
        </section>
      </div>
    </div>`;
  }

  onClose() {
    this.dispatchEvent(new CustomEvent("modal-closed"));
  }
}

customElements.define('wr-modal', WrModal);

customElements.define('wr-rec-coll', WrRecColl);

customElements.define('wr-rec-coll-index', WrRecCollIndex);
customElements.define('wr-rec-coll-info', WrRecCollInfo);

customElements.define('archive-web-page-app', ArchiveWebApp);

//customElements.define("wr-loader", Loader);

export { ArchiveWebApp, Loader, Embed };

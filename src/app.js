import { LitElement, html, css, wrapCss, IS_APP, clickOnSpacebarPress } from 'replaywebpage/src/misc';

import 'replaywebpage/src/pages';
import 'replaywebpage/src/pageentry';
import 'replaywebpage/src/sorter';
import 'replaywebpage/src/url-resources';
import 'replaywebpage/src/story';
import 'replaywebpage/src/replay';

import { WrCollIndex, WrCollInfo } from 'replaywebpage/src/coll-index';

import prettyBytes from 'pretty-bytes';

import { ReplayWebApp } from 'replaywebpage/src/appmain';

import { WrColl } from 'replaywebpage/src/coll';

import fasPlus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';
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
    <div class="recorder modal is-active">
      <div class="modal-background" @click="${(e) => this.recordShown = false}"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-3">Start Recording</p>
          <button class="delete" aria-label="close" @click="${(e) => this.recordShown = false}"></button>
        </header>
        <section class="modal-card-body" @click="${(e) => this.showCollDrop = false}">

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
        </section>
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
    } else if (window.webrecorder && window.webrecorder.record) {
      window.webrecorder.record(url);
    }
    return false;
  }
}


//============================================================================
class WrRecColl extends WrColl
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
class WrRecCollIndex extends WrCollIndex
{
  renderCollInfo(coll) {
    return html`<wr-rec-coll-info .coll=${coll}></wr-rec-coll-info>`;
  }
}

//============================================================================
class WrRecCollInfo extends LitElement
{
  constructor() {
    super();
    this.detailed = false;
    this.ipfsURL = null;
  }

  static get properties() {
    return {
      coll: { type: Object },
      detailed: { type: Boolean },
      ipfsURL: { type: String },
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
    }

    .button-row *:not(:first-child) {
      margin-left: 0.5em;
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
            ${coll.title || coll.filename}
            ` : html`
            <a href="?source=${encodeURIComponent(coll.sourceUrl)}">${coll.title || coll.filename}</a>`}
          </span>
        </div>

        <div class="column is-2"><p class="minihead">Date Created</p>${coll.ctime ? new Date(coll.ctime).toLocaleString() : ""}</div>
        
        <div class="column is-2"><p class="minihead">Total Size</p>${prettyBytes(Number(coll.size || 0))}</div>

        <div class="column is-1">
          <p class="minihead">Add to Archive</p>
          <div class="button-row is-flex">
            <button @click="${this.onShowStart}" class="button is-small" title="Start Recording...">
              <span class="icon">
                <fa-icon aria-hidden="true" .svg="${wrRec}"></fa-icon>
              </span>
              <span>Start...</span>
            </button>
          </div>
        </div>
        
        <div class="column is-size-7">
          <p class="minihead">Sharing (via IPFS)</p>
          <div class="button-row is-flex">
            ${!this.ipfsURL ? html`<i>Not Sharing</i>` : html`
              <button @click="${this.onCopyLink}" class="button is-link is-light is-small">
                <span class="icon is-small">
                  <fa-icon .svg="${fasShare}"></fa-icon>
                </span>
                <span>Copy Sharable Link</span>
              </button>
            `}
            <button class="button is-small" @click="${this.onPin}">
              <span class="icon is-small">
                <fa-icon .svg="${!this.ipfsURL ? fasShare : fasReshare}"></fa-icon>
              </span>
              <span>${!this.ipfsURL ? "Share" : "Reshare Latest"}</span>
            </button>
            <button class="button is-small" ?disabled="${!this.ipfsURL}" @click="${this.onUnpin}">
              <span class="icon is-small">
                <fa-icon .svg="${fasX}"></fa-icon>
              </span>
              <span>Unshare</span>
            </button>
          </div>
        </div>
      </div>
      `;
  }

  onShowStart(event) {
    const coll = this.coll.id;
    const title = this.coll.title;
    this.dispatchEvent(new CustomEvent("show-start", {bubbles: true, composed: true, detail: {coll, title}}));
  }

  async onPin() {
    const resp = await fetch(`./wabac/api/${this.coll.id}/ipfs/pin`, {method: "POST"});
    const json = await resp.json();
    if (json.ipfsURL) {
      this.ipfsURL = json.ipfsURL;
    }
    this.onCopyLink(event);
  }

  async onUnpin() {
    const resp = await fetch(`./wabac/api/${this.coll.id}/ipfs/unpin`, {method: "POST"});
    const json = await resp.json();
    if (json.removed) {
      this.ipfsURL = null;
    }
  }

  onCopyLink(event) {
    event.preventDefault();
    event.stopPropagation();

    const params = new URLSearchParams();
    params.set("source", this.ipfsURL);
    const url = "https://replayweb.page/?" + params.toString();

    navigator.clipboard.writeText(url);
  }
}

customElements.define('wr-rec-coll', WrRecColl);

customElements.define('wr-rec-coll-index', WrRecCollIndex);
customElements.define('wr-rec-coll-info', WrRecCollInfo);

customElements.define('archive-web-page-app', ArchiveWebApp);

export { ArchiveWebApp };

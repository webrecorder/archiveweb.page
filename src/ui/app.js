import { html, css, wrapCss, IS_APP } from 'replaywebpage/src/misc';

// replaywebpage imports
import { ReplayWebApp, Embed, Loader } from 'replaywebpage';

import fasPlus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';
import fasHelp from '@fortawesome/fontawesome-free/svgs/solid/question-circle.svg';

//import wrText from '../assets/webrecorder-text.svg';

import { wrRec } from './coll-info';
import './credui';
import wrLogo from '../../assets/awp-logo.svg';


//============================================================================
class ArchiveWebApp extends ReplayWebApp
{
  constructor() {
    super();

    this.navMenuShown = false;
    this.showCollDrop = false;
    this.colls = [];
    this.currTab = "archives";
    this.showSyncEditor = false;
  }

  get appName() {
    return "ArchiveWeb.page";
  }

  static get properties() {
    return {
      ...ReplayWebApp.properties,

      recordShown: { type: Boolean },
      showCollDrop: { type: Boolean },
      colls: { type: Array },
      selCollId: { type: String },
      selCollTitle: { type: String },
      recordUrl: { type: String },
      currTab: { type: String },

      showSyncEditor: { type: Boolean }
    }
  }

  initRoute() {
    this.inited = true;
    const pageParams = new URLSearchParams(window.location.search);

    this.sourceUrl = pageParams.get("source") || "";
  }

  onStartLoad(event) {
    this.sourceUrl = event.detail.sourceUrl;
    this.loadInfo = event.detail;
  }

  onCollLoaded(event) {
    this.loadInfo = null;
    if (event.detail.sourceUrl && event.detail.sourceUrl !== this.sourceUrl) {
      this.sourceUrl = event.detail.sourceUrl;
      this.pageParams.set("source", this.sourceUrl);
      window.location.search = this.pageParams.toString();
    }
  }

  getLoadInfo(sourceUrl) {
    if (this.loadInfo) {
      return this.loadInfo;
    }

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

      .message-header {
        background-color: #ddddff;
        color: black;
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
    return html`
    <a href="https://archiveweb.page/guide" target="_blank" class="navbar-item is-size-6">
    <fa-icon .svg="${fasHelp}" aria-hidden="true"></fa-icon><span>&nbsp;User Guide</span>

    <a href="?about" @click="${(e) => { e.preventDefault(); this.showAbout = true} }"class="navbar-item is-size-6">About
    </a>`
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
        <div class="tabs is-boxed">
          <ul>
            <li class="${this.currTab === 'archives' ? 'is-active': ''}">
              <a @click="${(e) => this.currTab = 'archives'}">Archives</a>
            </li>
            <li class="${this.currTab === 'add' ? 'is-active': ''}">
              <a @click="${(e) => this.currTab = 'add'}">Add Archives</a>
            </li>
            <li class="${this.currTab === 'cred' ? 'is-active': ''}">
              <a @click="${(e) => this.currTab = 'cred'}">Storage Credentials</a>
            </li>
          </ul>
        </div>
      </section>

      ${this.currTab === 'add' ? this.renderAddTab() : ''}

      ${this.currTab === 'archives' ? html`
      <wr-rec-coll-index
       apiPrefix="${this.baseApiPrefix}"
       dateName="Date Created"
       headerName="Current Web Archives"
       @show-start=${this.onShowStart}
       style="overflow: visible"
       >
      </wr-rec-coll-index>` : ``}
      ${this.currTab === 'cred' ? this.renderCredTab() : ''}
     `
     
     
     ;
  }

  renderCredTab() {
    return html`
    <wr-store-cred apiPrefix="${this.baseApiPrefix}"></wr-store-cred>
    `;
  }

  renderAddTab() {
    return html`
    <section class="section less-padding">
      <div class="columns">
        <div class="column is-5">
          <div class="message is-small">
            <div class="message-header">Create New Web Archive</div>
            <div class="message-body">
              <form class="is-flex is-flex-direction-column" @submit="${this.onNewColl}">
                <div class="field">
                  <div class="control is-expanded">
                    <input class="input is-small" id="new-name" type="text" required placeholder="Enter the Title for this Archive">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <label class="checkbox">
                      <input id="preview" type="checkbox" @change="${(e) => this.showSyncEditor = e.currentTarget.checked}" ?checked="${this.showSyncEditor}">
                      Create a Synched Archive
                    </label>
                  </div>
                </div>
                ${this.showSyncEditor ? html`
                <div class="field">
                  <wr-sync-config apiPrefix="${this.baseApiPrefix}"></wr-sync-config>
                </div>` : ''}
                <div class="field">
                  <div class="control">
                    <button class="button is-primary is-small" type="submit">
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
        <div class="column is-7">
          <wr-chooser .newFullImport="${true}" sizeClass="is-small" @load-start=${this.onStartLoad}></wr-chooser>
        </div>
      </div>
    </section>
    `;
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
    baseApiPrefix="${this.baseApiPrefix}"
    baseReplayPrefix="${this.baseReplayPrefix}"
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
        <div class="select is-small">
          <select @change="${this.onSelectColl}">
          ${this.colls.map((coll) => html`
            <option value="${coll.id}"
            ?selected="${this.selCollId === coll.id}"
            >${coll.title}</option>`)}
          </select>
        </div>
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
        </label>` : ``}
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
                  <div class="is-flex">
                    <div class="has-text-centered" style="width: 220px">
                      <fa-icon class="logo" size="48px" .svg="${wrLogo}"></fa-icon>
                      <div style="font-size: smaller; margin-bottom: 1em">${IS_APP ? 'App' : 'Extension'} v${__VERSION__}</div>
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
                  Users can downloaded this data as files to their hardrive. Users can also delete any and all archived data at any time.
                  ArchiveWeb.page does not collect any usage or tracking data.</p>

                  <p class="is-size-7">ArchiveWeb.page includes an experimental sharing option for each. Users can choose to share select archives on a peer-to-peer network (IPFS) via a unique id.
                  Once shared, data may be accessible to others. (A seperate warning is displayed when sharing)
                  All Archives are private and not shared by default.</p>

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
    const title = this.renderRoot.querySelector("#new-name").value;

    const method = "POST";
    const body = JSON.stringify({"metadata": {title}});
    const resp = await fetch("./wabac/api/c/create", {method, body});
    const data = await resp.json();
  }

  onSelectColl(event) {
    //this.selCollId = event.currentTarget.getAttribute("data-id");
    //this.selCollTitle = event.currentTarget.getAttribute("data-title");
    //this.showCollDrop = false;
    this.selCollId = event.currentTarget.value;
  }

  async onShowStart(event) {
    this.selCollId = event.detail.coll;
    //this.selCollTitle = event.detail.title;
    this.recordUrl = event.detail.url || "https://example.com/"
    this.recordShown = true;

    const resp = await fetch("./wabac/api/c/index");
    const data = await resp.json();

    this.colls = data.colls;
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
      const previewCheckbox = this.renderRoot.querySelector("#preview");
      const startRec = !(previewCheckbox && previewCheckbox.checked);
      window.archivewebpage.record(url, this.selCollId, startRec);
    }
    return false;
  }
}

customElements.define('archive-web-page-app', ArchiveWebApp);

export { ArchiveWebApp, Loader, Embed };

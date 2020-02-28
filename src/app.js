
import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import prettyBytes from 'pretty-bytes';

//import { openDB } from 'idb/with-async-ittr.js';
//import { FullTextFlex as FullText } from './fulltext';

import { ArchiveDBExt } from './archivedbext';

import { sleep, getArchiveSize, MAIN_DB_KEY, registerSW } from './utils';

import {} from "keyword-mark-element/lib/keyword-mark.js";


// ===========================================================================
class PageIndexApp extends LitElement {
  constructor() {
    super();
    this.dbname = "";
    this.query = "";
    this.results = new Map();
    this.archiveSizeTotal = 0;
    this.archiveSizeDedup = 0;

    this.waitingMsg = "";

    this._shouldQuery = false;

    this._refreshCheck = setInterval(() => {
      if (this._shouldQuery) {
        this.doQuery();
      }
    }, 1000);

    chrome.storage.onChanged.addListener((changes, areaName) => this.onStorageChanged(changes, areaName));

    window.addEventListener("hashchange", () => {
      this.query = new URLSearchParams(window.location.hash.substring(1)).get("q") || "";
    });
  }

  static get properties() {
    return {
      dbname: { type: String, reflect: true },
      query: { type: String, reflect: true },
      results: { type: Map },
      archiveSizeDedup: { type: Number },
      archiveSizeTotal: { type: Number },
      waitingMsg: { type: String }
    }
  }

  async firstUpdated() {
    this.db = new ArchiveDBExt(this.dbname);

    //this.fulltext = new FullText(this.dbname);

    await this.db.initing;

    if (window.location.hash) {
      this.query = new URLSearchParams(window.location.hash.substring(1)).get("q") || "";
    }

    await this.doQuery();
  }

  async doQuery() {
    this._shouldQuery = false;

    if (!this.query) {
      this.results = await this.db.getPageMap(true);
    } else {
      //await this.fulltext.load();
      //this.results = this.fulltext.search(this.query).map(data => data.page);
      try {
        const results = await this._doFullText();
        const validResults = new Map();
        for (const result of results) {
          if (result && result.page) {
            validResults.set(result.page.id, result.page);
          }
        }
        this.results = validResults;
      } catch (e) {
        console.warn(e);
        this.results = new Map();
      }
    }

    const archiveSize = await getArchiveSize();
    if (archiveSize) {
      this.archiveSizeTotal = archiveSize.total;
      this.archiveSizeDedup = archiveSize.dedup;
    }
    this.waitingMsg = "";
  }

  async _doFullText() {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({"msg": "searchText", "query": this.query}, (response) => {
        if (response) {
          resolve(response.result || []);
        } else {
          reject(chrome.runtime.lastError.message);
        }
      });
    });
  }

  onStorageChanged(changes, areaName) {
    if (changes.archiveSize || changes[MAIN_DB_KEY]) {
      this._shouldQuery = true;
    }
  }

  onSubmit(event) {
    this.waitingMsg = "Searching...";

    event.preventDefault();
    this.query = this.shadowRoot.querySelector("#query").value.trim();
    window.location.hash = this.query ? "#q=" + this.query : "";
    this.doQuery();
    return false;
  }

  static get styles() {
    return css`
      input {
        font-size: 24px;
        width: 100%;
      }

      .delete, .download {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 4px;
      }

      .num-results {
        margin: 8px 0px 10px 4px;
      }

      .results {
        margin: 10px 10px 30px 10px;
      }

      .delete-all, .download-all {
        font-size: smaller;
      }

      .hidden {
        display: none;
      }

      .spinner {
        /* Spinner size and color */
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 25px;
        border-top-color: #444;
        border-left-color: #444;

        /* Additional spinner styles */
        animation: spinner 400ms linear infinite;
        border-bottom-color: transparent;
        border-right-color: transparent;
        border-style: solid;
        border-width: 2px;
        border-radius: 50%;  
        box-sizing: border-box;
        display: inline-block;
        vertical-align: middle;
        animation: spinner 1s linear infinite;
      }

      /* Animation styles */
      @keyframes spinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

    `;
  }

  render() {
    return html`
      <p>Total Archive Size: <b id="size">${prettyBytes(this.archiveSizeDedup)}</b>&nbsp;(Before deduplication: ${prettyBytes(this.archiveSizeTotal)})</p>
      <form @submit="${this.onSubmit}" class="pure-form">
        <input class="pure-input pure-input-1-2" type="text" id="query" name="query" .value="${this.query}" placeholder="Filter by page text or url">
      </form>

      <div id="status-container" class="${this.waitingMsg ? '' : 'hidden'}"><span class="spinner"></span>${this.waitingMsg}</div>

      ${this.results.size > 0 ? this.renderPages() : html`<i>No Pages Found</i>`}

      <p class="delete-all">
      <img src="./static/trash.svg" class="delete"/><a id="delete" href="#" @click="${this.onDeleteAll}">Delete Archive</a>
      </p>

      <p class="download-all">
      <img src="./static/download.svg" class="download"/><a id="download" href="#" @click="${this.onDownloadAll}">Download Archive</a>
      </p>
    `;
  }

  renderPages() {
    return html`
      <div class="num-results">${this.results.size} Archived Pages:</div>
      <div class="results">
      ${Array.from(this.results.values()).map(page => html`
        <page-result .page="${page}" .app="${this}" query="${this.query}" prefix="/replay/wabac/archive"></page-result>
      `)}
      </div>
    `;
  }

  onDeleteAll(event) {
    event.preventDefault();
    this.waitingMsg = "Deleting All...";

    chrome.runtime.sendMessage({"msg": "deleteAll"});

    return false;
  }

  deletePage(id, title) {
    this.waitingMsg = `Deleting Archived Page: ${title}`;

    chrome.runtime.sendMessage({"msg": "deletePage", "id": id});
  }

  onDownloadAll(event) {
    event.preventDefault();
    this.doDownload(null);
    return false;
  }

  async doDownload(pages) {
    this.waitingMsg = "Downloading...";
    const url = await this.db.writeToWARC(pages);
    chrome.downloads.download({url, filename: 'wr-ext.warc', conflictAction: "overwrite"});
    this.waitingMsg = "";
  }
}


// ===========================================================================
class PageResult extends LitElement
{
  static get styles() {
    return css`
      .main {
        padding-top: 10px;
        padding-bottom: 5px;
      }
      .date {
        padding: 0px 30px 0px 20px;
        display: inline-block;
        vertical-align: middle;
        text-align: right;
      }
      .size {
        padding: 20px;
        display: inline-block;
      }
      .favicon {
        width: 24px;
        height: 24x;
        display: inline-block;
        vertical-align: text-bottom;
      }
      img.favicon {
        filter: drop-shadow(1px 1px 2px grey);
      }
      .page-info {
        padding-left: 10px;
        width: 60%;
        display: inline-block;
        vertical-align: middle;
        word-break: break-all;
      }
      .page-info > .title {
        font-weight: bold;
        font-size: 18px;
        display: inline-block;
      }
      .page-info > .url {
        margin: 4px 0px 0px 2px;
        font-size: 14px;
        color: grey;
        display: inline-block;
      }

      .text {
        padding: 20px;
        font-family: monospace;
        max-height: 200px;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .delete, .download {
        width: 16px;
        height: 20px;
        vertical-align: bottom;
        padding-left: 4px;
      }

      .recording {
        font-style: italic;
      }

      .blinking {
        -webkit-animation: 1s blink ease infinite;
        animation: 1s blink ease infinite;
        margin-left: 20px;
      }
      .curr-recording {
        float: right;
        margin: 25px -100px 0px 0px;
      }
      @keyframes "blink" {
        from, to {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
      }

      @-webkit-keyframes "blink" {
        from, to {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
      }
    `;
  }
 
  static get properties() {
    return {
      app: { type: Object },
      page: { type: Object },
      query: { type: String },
      prefix: { type: String },
      textSnippet: { type: String },
      iconData: { type: String },
    }
  }

  firstUpdated() {
    this.updateIconUrl();
    this.updateSnippet();
  }

  updated(changedProps) {
    const newPage = changedProps.get("page");
    if (newPage) {
      if (newPage.favIconUrl != this.page.favIconUrl) {
        this.updateIconUrl();
      }
      if (newPage.text !== this.page.text) {
        this.updateSnippet();
        return;
      }
    }

    const newQuery = changedProps.get("query");

    if (newQuery != undefined && newQuery !== this.query) {
      this.updateSnippet();
    }
  }

  async updateIconUrl() {
    const result = await this.app.db.lookupUrl(this.page.favIconUrl);

    let payload = null;

    if (result) {
      payload = await this.app.db.loadPayload(result);
    }

    const oldVal = this.iconData;

    try {
      this.iconData = result ? `data:${result.mime};base64,${btoa(String.fromCharCode.apply(null, payload))}` : null;
    } catch (e) {
      this.iconData = null;
    }

    this.requestUpdate('iconData', oldVal);
  }

  updateSnippet() {
    const oldVal = this.textSnippet;

    if (!this.query || !this.page.text) {
      this.textSnippet = null;
      this.requestUpdate('textSnippet', oldVal);
      return;
    }

    let textContent = this.page.text;
    let query = this.query;

    let inx = textContent.indexOf(this.query);

    if (inx < 0) {
      let textLower = textContent.toLowerCase();
      let queryLower = query.toLowerCase();

      inx = textLower.indexOf(queryLower);

      if (inx < 0) {
        this.textSnippet = null;
        this.requestUpdate('textSnippet', oldVal);
        return;
      }

      textContent = textLower;
      query = queryLower;
    }

    let lastInx = textContent.lastIndexOf(query);

    inx = Math.max(inx - 100, 0);
    lastInx = Math.min(lastInx + 200, textContent.length);

    if (inx === 0 && lastInx === textContent.length) {
      this.textSnippet = textContent;
    } else {
      this.textSnippet = "..." + textContent.slice(inx, lastInx) + "...";
    }

    this.requestUpdate('textSnippet', oldVal);
  }

  render() {
    const ts = this.page.date.replace(/[-:T]/g, '').slice(0, 14);
    //const datetime = this.page.date.replace('T', ' ').slice(0, 19);
    const datetime = this.page.date.split('T');
    const date = datetime[0];
    const time = datetime[1].slice(0, 8);

    const size = prettyBytes(this.page.size || 0);

    const fullUrl = `${this.prefix}/${ts}/${this.page.url}`;

    return html`
      <div class="main ${this.page.finished ? '' : 'recording'}">
      <span class="date">${date}<br/>${time}</span>
      ${this.iconData ? html`<img class="favicon" src="${this.iconData}"/>` : html`<span class="favicon"></span>`}
      <span class="page-info">
        <a class="title" href="${fullUrl}"><keyword-mark keywords="${this.query}">${this.page.title}</keyword-mark></a>
        <br/>
        <a class="url" href="${fullUrl}"><keyword-mark keywords="${this.query}">${this.page.url}</keyword-mark></a>
      </span>
      <span class="size">
        ${size}
        <a href="#" @click="${this.onDelete}"><img src="./static/trash.svg" class="delete"/></a>
        <a href="#" @click="${this.onDownload}"><img src="./static/download.svg" class="download"/></a>
      </span>
      ${this.page.finished ? html`` : html`
        <span title="Currently Recording" class="curr-recording"><svg height="12" width="12" class="blinking"><circle cx="6" cy="6" r="6" fill="#d9534f" /></svg>&nbsp;Recording</span>
      `}
      </span>
     ${this.textSnippet ? html`
        <div class="text"><keyword-mark keywords="${this.query}">${this.textSnippet}</keyword-mark></div>` : html``}
      </div>
    `;
  }

  onDelete(event) {
    event.preventDefault();
    this.app.deletePage(this.page.id, this.page.url);
    return false;
  }

  onDownload(event) {
    event.preventDefault();
    this.app.doDownload([this.page.id]);
    return false;
  }
}



document.addEventListener("DOMContentLoaded", () => {
  customElements.define('page-index-app', PageIndexApp);
  customElements.define('page-result', PageResult);

  registerSW();
});

export { PageIndexApp };


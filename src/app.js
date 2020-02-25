
import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import prettyBytes from 'pretty-bytes';

//import { openDB } from 'idb/with-async-ittr.js';
//import { FullTextFlex as FullText } from './fulltext';

import { ArchiveDBExt } from './archivedbext';

import { sleep, getArchiveSize, MAIN_DB_KEY } from './utils';

import {} from "keyword-mark-element/lib/keyword-mark.js";


// ===========================================================================
class PageIndexApp extends LitElement {
  constructor() {
    super();
    this.dbname = "";
    this.query = "";
    this.results = [];
    this.archiveSize = 0;

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
      results: { type: Array },
      archiveSize: { type: Number },
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
    if (!this.query) {
      this.results = await this.db.getAllPages(true);
    } else {
      //await this.fulltext.load();
      //this.results = this.fulltext.search(this.query).map(data => data.page);
      try {
        const results = await this._doFullText();
        const validResults = [];
        for (const result of results) {
          if (result && result.page) {
            validResults.push(result.page);
          }
        }
        this.results = validResults;
      } catch (e) {
        console.warn(e);
        this.results = [];
      }
    }

    this.archiveSize = await getArchiveSize();
    this._shouldQuery = false;
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
    event.preventDefault();
    this.query = this.shadowRoot.querySelector("#query").value;
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
        margin: 8px 0px 20px 4px;
      }

      .results {
        margin: 10px;
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
      <p>Total Archive Size: <b id="size">${prettyBytes(this.archiveSize)}</b></p>
      <form @submit="${this.onSubmit}" class="pure-form">
        <input class="pure-input pure-input-1-2" type="text" id="query" name="query" .value="${this.query}" placeholder="Filter by page text or url">
      </form>

      <div id="status-container" class="${this.waitingMsg ? '' : 'hidden'}"><span class="spinner"></span>${this.waitingMsg}</div>

      ${this.results.length > 0 ? this.renderPages() : html`<i>No Pages Found</i>`}

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
      <div class="num-results">${this.results.length} Archived Pages:</div>
      <div class="results">
      ${this.results.map((page) => html`
        <page-result .page="${page}" .app="${this}" query="${this.query}" prefix="/replay/wabac/archive"></page-result>
      `)}
      </div>
    `;
  }

  onDeleteAll(event) {
    event.preventDefault();
    this.waitingMsg = "Deleting All";

    chrome.runtime.sendMessage({"msg": "deleteAll"});

    return false;
  }

  deletePage(id, url) {
    this.waitingMsg = `Deleting Archived Page: ${url}`;

    chrome.runtime.sendMessage({"msg": "deletePage", "id": id});
  }

  onDownloadAll(event) {
    this.waitingMsg = "Preparing Download...";

    event.preventDefault();
    this.doDownloadAll();
    return false;
  }

  async doDownloadAll() {
    const url = await this.db.writeAllToWarc();
    console.log(url);
    chrome.downloads.download({url, filename: 'wr-ext.warc', conflictAction: "overwrite"});
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
      .date, .size {
        padding: 20px;
      }
      .size {
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
        max-width: 60%;
        display: inline-block;
        vertical-align: middle;
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

      .delete {
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
    const result = await this.app.db.lookupUrl(this.page.favIconUrl, "");
    const oldVal = this.iconData;

    try {
      this.iconData = result ? `data:${result.mime};base64,${btoa(String.fromCharCode.apply(null, result.payload))}` : null;
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
    const date = this.page.date.replace('T', ' ').slice(0, 19);
    const size = prettyBytes(this.page.size || 0);

    return html`
      <div class="main ${this.finished ? '' : 'recording'}">
      <span class="date">${date}</span>
      ${this.iconData ? html`<img class="favicon" src="${this.iconData}"/>` : html`<span class="favicon"></span>`}
      <span class="page-info">
        <a class="title" href="${this.prefix}/${ts}/${this.url}"><keyword-mark keywords="${this.query}">${this.page.title}</keyword-mark></a>
        <br/>
        <a class="url" href="${this.prefix}/${ts}/${this.url}"><keyword-mark keywords="${this.query}">${this.page.url}</keyword-mark></a>
      </span>
      <span class="size">
        ${size}
        <a href="#" @click="${this.onDelete}"><img src="./static/trash.svg" class="delete"/></a>
      ${this.page.finished ? html`` : html`
        <svg height="12" width="12" class="blinking"><circle cx="6" cy="6" r="6" fill="#d9534f" /></svg>
        Currently Recording
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
}



document.addEventListener("DOMContentLoaded", () => {
  customElements.define('page-index-app', PageIndexApp);
  customElements.define('page-result', PageResult);
});

export { PageIndexApp };


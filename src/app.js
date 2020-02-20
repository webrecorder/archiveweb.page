
import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import prettyBytes from 'pretty-bytes';

//import { openDB } from 'idb/with-async-ittr.js';
//import { FullTextFlex as FullText } from './fulltext';

import { ArchiveDBExt } from './dbwriter';

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
        this.results = results.map(data => data.page);
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

      .delete {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 4px;
      }

      .num-results {
        margin: 8px 0px 20px 4px;
      }

      .delete-all {
        margin-top: 30px;
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
    `;
  }

  renderPages() {
    return html`
      <div class="num-results">${this.results.length} Archived Pages:</div>
      ${this.results.map((page) => html`
        <page-result size="${page.size}"
         prefix="/replay/wabac/archive" id="${page.id}" date="${page.date}" ?finished="${page.finished}"
         url="${page.url}" title="${page.title}" text="${page.text}" query="${this.query}"></page-result>
      `)}
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
      .title {
        padding-left: 10px;
        font-size: 18px;
        font-weight: bold;
        max-width: 60%;
        display: inline-flex;
      }
      .text {
        padding: 20px;
        font-family: monospace;
        max-height: 200px;
        overflow-y: scroll;
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
      id: { type: String },
      date: { type: String },
      url: { type: String },
      title: { type: String },
      text: { type: String },
      size: { type: Number },
      query: { type: String },
      prefix: { type: String },
      finished: { type: Boolean }
    }
  }

  render() {
    const ts = this.date.replace(/[-:T]/g, '').slice(0, 14);
    const date = this.date.replace('T', ' ').slice(0, 19);
    const size = prettyBytes(this.size || 0);

    return html`
      <div class="main ${this.finished ? '' : 'recording'}">
      <span class="date">${date}</span>
      <span class="title">
        <a href="${this.prefix}/${ts}/${this.url}">${this.title}</a>
      </span>
     ${this.finished ?
      html`
        <span class="size">${size}<a href="#" @click="${this.onDelete}"><img src="./static/trash.svg" class="delete"/></a></span>` :
      html`
        <span class="size">${size}
          <svg height="12" width="12" class="blinking"><circle cx="6" cy="6" r="6" fill="#d9534f" /></svg>
          Currently Recording
        </span>
      `}

     ${this.query ? html`
        <div class="text"><keyword-mark keywords="${this.query}">${this.text}</keyword-mark></div>` : html``}
      </div>
    `;
  }

  onDelete(event) {
    event.preventDefault();
    if (this.shadowRoot.host.parentNode.host) {
      this.shadowRoot.host.parentNode.host.deletePage(this.id, this.url);
    }

    return false;
  }
}



document.addEventListener("DOMContentLoaded", () => {
  customElements.define('page-index-app', PageIndexApp);
  customElements.define('page-result', PageResult);
});

export { PageIndexApp };


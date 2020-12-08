import { LitElement, html, css, unsafeCSS } from 'lit-element';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import bulma from 'bulma/bulma.sass';

import fasBox from '@fortawesome/fontawesome-free/svgs/solid/square.svg';
import fasCheck from '@fortawesome/fontawesome-free/svgs/solid/check.svg';
import fasX from '@fortawesome/fontawesome-free/svgs/solid/times.svg';
import fasCaretDown from '@fortawesome/fontawesome-free/svgs/solid/caret-down.svg';

import wrRec from '../../assets/recLogo.svg';

import prettyBytes from 'pretty-bytes';

const allCss = unsafeCSS(bulma);
function wrapCss(custom) {
  return [allCss, custom];
}


// ===========================================================================
class RecPopup extends LitElement
{
  constructor() {
    super();

    this.collections = [];
    this.collTitle = "";
    this.collId = "";

    this.tabId = 0;
    this.recording = false;
    this.status = null;

    this.port = null;

    this.pageUrl = "";
    this.pageTs = 0;
    this.replayUrl = "";

    this.canRecord = false;
    this.failureMsg = null;

    this.collDrop = "";
  }

  static get properties() {
    return {
      collections: { type: Array },
      collId: { type: String },
      collTitle: { type: String },
      collDrop: { type: String },

      recording: { type: Boolean },
      status: { type: Object },

      replayUrl: { type: String },
      pageUrl: { type: String },
      pageTs: { type: Number },

      canRecord: { type: Boolean },
      failureMsg: { type: String }
    }
  }

  firstUpdated() {
    this.port = chrome.runtime.connect({name: "popup-port"});

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length) {
        this.tabId = tabs[0].id;
        this.pageUrl = tabs[0].url;
        chrome.browserAction.getTitle({tabId: this.tabId}, (result) => {
          this.recording = (result.indexOf("Recording:") >= 0);
        });

        this.port.postMessage({tabId: this.tabId, type: "startUpdates"});
      }
    });

    document.addEventListener("click", (event) => {
      if (this.collDrop === "show") {
        this.collDrop = "";
      }
    });

    this.port.onMessage.addListener((message) => {
      switch (message.type) {
        case "status":
          this.recording = message.recording;
          this.status = message;
          if (message.pageUrl) {
            this.pageUrl = message.pageUrl;
          }
          if (message.pageTs) {
            this.pageTs = message.pageTs;
          }
          this.failureMsg = message.failureMsg;
          if (this.collId !== message.collId) {
            this.collId = message.collId;
            this.collTitle = this.findTitleFor(this.collId);
            localStorage.setItem(`${this.tabId}-collId`, this.collId);
          }
          break;

        case "collections":
          this.collections = message.collections;
          this.collId = localStorage.getItem(`${this.tabId}-collId`);
          this.collTitle = "";
          if (this.collId) {
            this.collTitle = this.findTitleFor(this.collId);
          }
          // may no longer be valid, try default id
          if (!this.collTitle) {
            this.collId = message.collId;
            this.collTitle = this.findTitleFor(this.collId);
          }
          if (!this.collTitle) {
            this.collTitle = "[No Title]";
          }
          break;
        }
    });
  }

  findTitleFor(match) {
    if (!match) {
      return "";
    }
    for (const coll of this.collections) {
      if (coll.id === this.collId) {
        return coll.title;
      }
    }

    return "";
  }

  updated(changedProperties) {
    if (this.pageUrl && this.pageTs && 
      (changedProperties.has("pageUrl") || changedProperties.has("pageTs") || changedProperties.has("recording") ||
       changedProperties.has("collId"))) {
      
      const params = new URLSearchParams();
      params.set("url", this.pageUrl);
      params.set("ts", new Date(this.pageTs).toISOString().replace(/[-:TZ.]/g, ''));
      params.set("view", "pages");

      this.replayUrl = this.getCollPage() + "#" + params.toString();
    }

    if (changedProperties.has("pageUrl") || changedProperties.has("failureMsg")) {
      this.canRecord = this.pageUrl && (this.pageUrl === "about:blank" || this.pageUrl.startsWith("http:") || this.pageUrl.startsWith("https:"));
    }
  }

  getHomePage() {
    return chrome.runtime.getURL("replay/index.html");
  }

  getCollPage() {
    const sourceParams = new URLSearchParams();
    sourceParams.set("source", "local://" + this.collId);

    return this.getHomePage() + "?" + sourceParams.toString();
  }

  static get styles() {
    return wrapCss(css`
      :host {
        width: 100%;
        height: 100%;
        font-size: initial !important;
      }

      button.button {
        height: 1.5em !important;
        background-color: aliceblue;
      }

      .rec-state {
        margin-right: 1.0em;
        flex: auto;
      }

      .rec-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 0.5em;
      }

      .view-row {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.5em;
        font-size: 1.1em;
      }

      .coll-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding-bottom: 0.5em;
        align-items: center;
        border-bottom: 1px solid lightgrey;
        justify-content: space-between;
      }

      .coll-select {
        align-items: center;
      }

      .dropdown-item {
        width: initial !important;
      }

      .flex-form {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
      }

      .flex-form * {
        padding: 0.5em;
      }

      .session-head {
        margin-top: 1.0em;
        margin-bottom: 0.5em;
        font-style: italic;
        border-bottom: 1px gray solid;
      }

      .status th {
        padding-left: 0.5em;
      }

      .status-ready {
        color: #459558;
        font-style: italic;
      }

      .status-pending {
        color: #bb9f08;
        font-style: italic;
      }
      .error {
        font-size: 12px;
        color: maroon;
      }

      .error p {
        margin-bottom: 1em;
      }
    `);
  }

  renderStatus() {
    if (this.recording) {
      return html`<b>Recording:&nbsp;</b>
        ${this.status && this.status.numPending ? html`
      <span class="status-pending">${this.status.numPending} URLs pending, please wait before loading a new page.</span>
    ` : html`
      <span class="status-ready">Idle, Continue Browsing</span>`}`;
    }

    if (this.failureMsg) {
      return html`
      <div class="error">
        <p>Sorry, there was an error starting recording on this page. Please try again or try a different page.</p>
      </div>
      `;
    }

    if (!this.canRecord) {
      return html`<i>Can't record this page.</i>`;
    }

    return html`<i>Not Recording this Tab</i>`;
  }

  renderDropdown() {
    return html`
    <div class="coll-select is-flex">
      <span class="is-size-7">${this.recording ? "Archiving" : "Archive"} To:&nbsp;</span>
      <div class="dropdown ${this.collDrop === "show" ? 'is-active' : ''}">
        <div class="dropdown-trigger">
          <button @click="${this.onShowDrop}" class="button is-small" aria-haspopup="true" aria-controls="dropdown-menu" ?disabled="${this.recording}">
            <span>${this.collTitle}</span>
            <span class="icon is-small">
              <svg style="width: 0.9em; height: 0.9em"><g>${unsafeSVG(fasCaretDown)}</g></svg>
            </span>
          </button>
        </div>
        ${!this.recording ? html`
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            ${this.collections.map((coll) => html`
              <a @click=${this.onSelectColl} data-title="${coll.title}" data-id="${coll.id}" class="dropdown-item">${coll.title}</a>
            `)}
            <hr class="dropdown-divider">
            <a @click="${(e) => this.collDrop = "create"}" class="dropdown-item">
              Create New Archive...
            </a>
          </div>
        </div>` : html``}
      </div>
      <a target="_blank" href="${this.getCollPage()}" class="is-size-7">&nbsp;View</a>
    </div>
    `;
  }

  renderCollCreate() {
    if (this.collDrop !== "create") {
      return "";
    }

    return html`
    <form @submit="${this.onNewColl}">
      <div class="flex-form">
        <label for="new-name" class="is-size-7 is-italic">New Archive:</label>
        <div class="control">
          <input class="input is-small" id="new-name" type="text" required placeholder="Enter Archive Name">
        </div>
        <button class="button is-small is-outlined" type="submit">
          <svg style="width: 0.9em; height: 0.9em"><g>${unsafeSVG(fasCheck)}</g></svg>
        </button>
        <button @click="${(e) => this.collDrop = ""}" class="button is-small is-outlined" type="button">
          <svg style="width: 0.9em; height: 0.9em"><g>${unsafeSVG(fasX)}</g></svg>
        </button>
      </div>
    </form>
    `;
  }

  render() { 
    return html`
      <div class="container">
        <div class="coll-row">
          ${this.renderDropdown()}
          <a target="_blank" href="${this.getHomePage()}" class="is-size-7">View All</a>
          ${this.renderCollCreate()}
        </div>
        <div class="rec-row">
          <p class="rec-state">
          ${this.renderStatus()}
          </p>
        </div>
        <div class="view-row">
          ${this.canRecord ? html`
          <button
           @click="${!this.recording ? this.onStart : this.onStop}" class="button">
            <span class="icon">
              ${!this.recording ? html`
                <svg style="width: 1.5em; height: 1.5em"><g>${unsafeSVG(wrRec)}</g></svg>` : html`
                <svg style="width: 0.9em; height: 0.9em"><g>${unsafeSVG(fasBox)}</g></svg>`}
            </span>
            <span>${!this.recording ? 'Start' : 'Stop'}</span>
          </button>
          ` : ``}
        </div>
        <div class="view-row">
          ${this.replayUrl ? 
            html`<a target="_blank" href="${this.replayUrl}">View Recorded Page</a>` : ``}
        </div>
        ${this.status && this.status.sizeTotal ? html`
        <div class="session-head">Recorded in this tab</div>
        <table class="status">
          <tr><td>New Size:</td><th>${prettyBytes(this.status.sizeNew)}</th></tr>
          <tr><td>Size:</td><th>${prettyBytes(this.status.sizeTotal)}</th></tr>
          <tr><td>Pages:</td><th>${this.status.numPages}</th></tr>
          <tr><td>URLs:</td><th>${this.status.numUrls}</th></tr>
        </table>` : html``}
      </div>
    `;
  }

  onStart() {
    this.port.postMessage({type: "startRecording", collId: this.collId});
  }

  onStop() {
    this.port.postMessage({type: "stopRecording"});
  }

  onViewPages() {
    chrome.tabs.create({url: chrome.runtime.getURL("replay/index.html") });
  }

  onSelectColl(event) {
    this.collId = event.currentTarget.getAttribute("data-id");
    this.collTitle = event.currentTarget.getAttribute("data-title");
    this.collDrop = "";

    localStorage.setItem(`${this.tabId}-collId`, this.collId);
  }

  onShowDrop(event)  {
    this.collDrop = "show";
    event.stopPropagation();
    event.preventDefault();
  }

  onNewColl() {
    localStorage.removeItem(`${this.tabId}-collId`);

    this.port.postMessage({
      tabId: this.tabId,
      type: "newColl",
      title: this.renderRoot.querySelector("#new-name").value
    });

    this.collDrop = "";
  }
}

customElements.define('wr-popup-viewer', RecPopup);

export { RecPopup };

import { LitElement, html, css, unsafeCSS } from 'lit-element';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import bulma from 'bulma/bulma.sass';

import fasBox from '@fortawesome/fontawesome-free/svgs/solid/square.svg';

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
    this.tabId = 0;
    this.recording = false;
    this.status = null;

    this.port = null;

    this.pageUrl = "";
    this.pageTs = 0;
    this.replayUrl = "";

    this.canRecord = false;
    this.failureMsg = null;
  }

  static get properties() {
    return {
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

    this.port.onMessage.addListener((message) => {
      if (message.type === "status") {
        this.recording = message.recording;
        this.status = message;
        if (message.pageUrl) {
          this.pageUrl = message.pageUrl;
        }
        if (message.pageTs) {
          this.pageTs = message.pageTs;
        }
        this.failureMsg = message.failureMsg;
      }
    });
  }

  updated(changedProperties) {
    if (this.pageUrl && this.pageTs && 
      (changedProperties.has("pageUrl") || changedProperties.has("pageTs") || changedProperties.has("recording"))) {
      
      const params = new URLSearchParams();
      params.set("url", this.pageUrl);
      params.set("ts", new Date(this.pageTs).toISOString().replace(/[-:TZ.]/g, ''));
      params.set("view", "pages");

      this.replayUrl = chrome.runtime.getURL("replay/index.html") + "#" + params.toString();
    }

    if (changedProperties.has("pageUrl") || changedProperties.has("failureMsg")) {
      this.canRecord = this.pageUrl && (this.pageUrl === "about:blank" || this.pageUrl.startsWith("http:") || this.pageUrl.startsWith("https:"));
    }
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
      }

      .view-row {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        margin-top: 0.5em;
        font-size: 1.1em;
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

  render() { 
    return html`
      <div class="container">
        <div class="rec-row">
          <p class="rec-state">
          ${this.renderStatus()}
          </p>
          ${this.canRecord ? html`
          <button
           @click="${!this.recording ? this.onStart : this.onStop}" class="button">
            <span class="icon">
              ${!this.recording ? html`
                <img src="./icon.png"/>` : html`
                <svg style="width: 0.9em; height: 0.9em"><g>${unsafeSVG(fasBox)}</g></svg>`}
            </span>
            <span>${!this.recording ? 'Start' : 'Stop'}</span>
          </button>` : ``}
        </div>
        <div class="view-row">
          <a id="view-pages" target="_blank" href="${chrome.runtime.getURL("replay/index.html")}">
          All Recorded Pages</a>
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
    this.port.postMessage({type: "startRecording"});
  }

  onStop() {
    this.port.postMessage({type: "stopRecording"});
  }

  onViewPages() {
    chrome.tabs.create({url: chrome.runtime.getURL("replay/index.html") });
  }
}

customElements.define('wr-popup-viewer', RecPopup);

export { RecPopup };

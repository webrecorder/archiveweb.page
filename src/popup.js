import { LitElement, html, css, unsafeCSS } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import bulma from "bulma/bulma.sass";

import fasPlus from "@fortawesome/fontawesome-free/svgs/solid/plus.svg";
import fasBox from "@fortawesome/fontawesome-free/svgs/solid/square.svg";
import fasPlay from "@fortawesome/fontawesome-free/svgs/solid/play.svg";
import fasPause from "@fortawesome/fontawesome-free/svgs/solid/pause.svg";
import fasHome from "@fortawesome/fontawesome-free/svgs/solid/home.svg";
import fasQ from "@fortawesome/fontawesome-free/svgs/solid/question.svg";
import fasCheck from "@fortawesome/fontawesome-free/svgs/solid/check.svg";
import fasX from "@fortawesome/fontawesome-free/svgs/solid/times.svg";
import fasCaretDown from "@fortawesome/fontawesome-free/svgs/solid/caret-down.svg";

import wrRec from "../assets/recLogo.svg";

import prettyBytes from "pretty-bytes";

import { getLocalOption, removeLocalOption, setLocalOption } from "./localstorage";

import {
  BEHAVIOR_WAIT_LOAD,
  BEHAVIOR_READY_START,
  BEHAVIOR_RUNNING,
  BEHAVIOR_PAUSED,
  BEHAVIOR_DONE } from "./consts";

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

    this.allowCreate = true;

    this.waitingForStart = false;
    this.waitingForStop = false;
    this.behaviorState = BEHAVIOR_WAIT_LOAD;
    this.behaviorMsg = "";
    this.autorun = false;
  }

  static get properties() {
    return {
      collections: { type: Array },
      collId: { type: String },
      collTitle: { type: String },
      collDrop: { type: String },

      recording: { type: Boolean },
      status: { type: Object },
      waitingForStart: { type: Boolean },

      replayUrl: { type: String },
      pageUrl: { type: String },
      pageTs: { type: Number },

      canRecord: { type: Boolean },
      failureMsg: { type: String },

      behaviorState: { type: String },
      behaviorResults: { type: Object },
      behaviorMsg: { type: String },
      autorun: { type: Boolean }
    };
  }

  async firstUpdated() {
    document.addEventListener("click", () => {
      if (this.collDrop === "show") {
        this.collDrop = "";
      }
    });

    this.autorun = await getLocalOption("autorunBehaviors") === "1";

    this.registerMessages();
  }

  registerMessages() {
    this.port = chrome.runtime.connect({name: "popup-port"});

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length) {
        this.tabId = tabs[0].id;
        this.pageUrl = tabs[0].url;
        chrome.action.getTitle({tabId: this.tabId}, (result) => {
          this.recording = (result.indexOf("Recording:") >= 0);
        });

        this.sendMessage({tabId: this.tabId, type: "startUpdates"});
      }
    });

    this.port.onMessage.addListener((message) => {
      this.onMessage(message);
    });
  }

  sendMessage(message) {
    this.port.postMessage(message);
  }

  async onMessage(message) {
    switch (message.type) {
    case "status":
      this.recording = message.recording;
      if (this.waitingForStart && message.firstPageStarted) {
        this.waitingForStart = false;
      }
      if (this.waitingForStop && !message.recording && !message.stopping) {
        this.waitingForStop = false;
      }
      this.status = message;
      this.behaviorState = message.behaviorState;
      this.behaviorMsg = message.behaviorData && message.behaviorData.msg || "Starting...";
      this.behaviorResults = message.behaviorData && message.behaviorData.state;
      this.autorun = message.autorun;
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
        await setLocalOption(`${this.tabId}-collId`, this.collId);
      }
      break;

    case "collections":
      this.collections = message.collections;
      this.collId = await getLocalOption(`${this.tabId}-collId`);
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
      params.set("ts", new Date(this.pageTs).toISOString().replace(/[-:TZ.]/g, ""));
      params.set("view", "pages");

      this.replayUrl = this.getCollPage() + "#" + params.toString();
    }

    if (changedProperties.has("pageUrl") || changedProperties.has("failureMsg")) {
      this.canRecord = this.pageUrl && (this.pageUrl === "about:blank" || this.pageUrl.startsWith("http:") || this.pageUrl.startsWith("https:"));
    }
  }

  getHomePage() {
    return chrome.runtime.getURL("index.html");
  }

  get extRoot() {
    return chrome.runtime.getURL("");
  }

  getCollPage() {
    const sourceParams = new URLSearchParams();
    sourceParams.set("source", "local://" + this.collId);

    return this.getHomePage() + "?" + sourceParams.toString();
  }

  get notRecordingMessage() {
    return "Not Recording this Tab";
  }

  static get styles() {
    return wrapCss(css`
      :host {
        width: 100%;
        height: 100%;
        font-size: initial !important;
      }

      .button {
        height: 1.5em !important;
        background-color: aliceblue;
      }

      .smallest.button {
        margin: 0.25em;
        background-color: initial;
        padding: 6px 12px;
      }

      .rec-state {
        margin-right: 1.0em;
        flex: auto;
      }

      .status-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-bottom: 0.5em;
        border-bottom: 1px solid lightgrey;
      }

      .view-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.5em;
        font-size: 1.1em;
      }

      .autopilot {
        justify-content: center;
      }

      .coll-select {
        align-items: center;
      }

      .dropdown-item {
        width: initial !important;
      }

      .coll.button {
        max-width: 120px;
      }

      .coll.button span {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
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
        font-style: italic;
      }

      .underline {
        margin-top: 1.0em;
        border-bottom: 1px gray solid;
        margin-bottom: 0.5em;
      }

      .status th {
        padding-left: 0.5em;
      }

      .status {
        font-variant-caps: all-small-caps;
      }

      .status-sep {
        border-bottom: 1px solid black;
        width: 100%;
        height: 10px;
      }

      .status-ready {
        color: #459558;
        font-style: italic;
      }

      .status-autopilot {
        color: #3298dc;
        max-width: 330px;
        text-overflow: wrap;
        word-break: break-all;
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

      .error-msg {
        font-family: monospace;
        font-style: italic;
      }
    `);
  }

  renderStatus() {
    if (this.behaviorState === BEHAVIOR_RUNNING) {
      return html`<span class="status-autopilot">Auto Recording, ${this.behaviorMsg}</span>`;
    }

    if (this.recording) {
      return html`<b>${this.waitingForStop ? "Finishing " : ""} Recording:&nbsp;</b>${this.status && this.status.numPending ? html`
      <span class="status-pending">${this.status.numPending} URLs pending${this.waitingForStop ? "." : ", please wait before loading a new page."}</span>
     ` :
        html`
      <span class="status-ready">Idle, Continue Browsing</span>`}`;
    }

    if (this.failureMsg) {
      return html`
      <div class="error">
        <p>Sorry, there was an error starting recording on this page. Please try again or try a different page.</p>
        <p class="error-msg">Error Details: <i>${this.failureMsg}</i></p>
        <p>If the error persists, check the <a href="https://archiveweb.page/guide/troubleshooting/errors" target="_blank">Common Errors and Issues</a> page in the guide for
          known issues and possible solutions.
        </p>
      </div>
      `;
    }

    if (!this.canRecord) {
      if (this.pageUrl && this.pageUrl.startsWith(this.extRoot)) {
        return html`
          <p class="is-size-7">This page is part of the extension. You can view existing archives from here.
          To start a new recording, click the
          <wr-icon .src="${wrRec}"></wr-icon> button and enter a new URL.
          </p>
        `;
      }

      return html`<i>Can't record this page.</i>`;
    }

    if (this.waitingForStart) {
      return html`<i>Recording will start after the page reloads...</i>`;
    }

    return html`<i>${this.notRecordingMessage}</i>`;
  }

  renderCollDropdown() {
    return html`
    <div class="coll-select">
      <div class="is-size-7">${this.recording ? "Recording" : "Record"} To:&nbsp;</div>
      <div class="dropdown ${this.collDrop === "show" ? "is-active" : ""}">
        <div class="dropdown-trigger">
          <button @click="${this.onShowDrop}" class="coll button is-small" aria-haspopup="true" aria-controls="dropdown-menu" ?disabled="${this.recording}">
            <span>${this.collTitle}</span>
            <span class="icon is-small">
              <wr-icon .src="${fasCaretDown}"></wr-icon>
            </span>
          </button>
        </div>
        ${!this.recording ? html`
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            ${this.allowCreate ? html`
            <a @click="${() => this.collDrop = "create"}" class="dropdown-item">
              <span class="icon is-small">
                <wr-icon .src="${fasPlus}"></wr-icon>
              </span>Create New Archive...
            </a>
            <hr class="dropdown-divider">` : ""}
            ${this.collections.map((coll) => html`
              <a @click=${this.onSelectColl} data-title="${coll.title}" data-id="${coll.id}" class="dropdown-item">${coll.title}</a>
            `)}
          </div>
        </div>` : html``}
      </div>
    </div>
    `;
  }

  renderStartOpt() {
    if (!this.canRecord || this.recording) {
      return "";
    }

    return html`
      <div class="field">
        <label class="checkbox is-size-7">
          <input type="checkbox" ?disabled="${this.recording}" ?checked="${this.autorun}" @change="${this.onToggleAutoRun}">
        Start With Autopilot
        </label>
      </div>
    `;
  }

  renderCollCreate() {
    if (this.collDrop !== "create") {
      return "";
    }

    return html`
    <div class="view-row is-marginless" style="background-color: #ddddff">
      <form @submit="${this.onNewColl}">
        <div class="flex-form">
          <label for="new-name" class="is-size-7 is-italic">Create New Archive:</label>
          <div class="control">
            <input class="input is-small" id="new-name" type="text" required placeholder="Enter Archive Name">
          </div>
          <button class="button is-small is-outlined" type="submit">
            <wr-icon .src=${fasCheck}></wr-icon>
          </button>
          <button @click="${() => this.collDrop = ""}" class="button is-small is-outlined" type="button">
            <wr-icon .src=${fasX}></wr-icon>
          </button>
        </div>
      </form>
    </div>
    `;
  }

  render() { 
    return html`
      <div class="container">
        <div class="status-row">
          <p class="rec-state">
          ${this.renderStatus()}
          </p>
          <a target="_blank" href="https://archiveweb.page/guide/usage" class="smallest button is-small is-inverted">
            <span class="icon is-small">
              <wr-icon size="1.0em" title="Guide" .src="${fasQ}"></wr-icon>
            </span>
          </a>
          <a target="_blank" href="${this.getHomePage()}" class="smallest button is-small is-inverted">
            <span class="icon is-small">
              <wr-icon size="1.0em" title="Home - All Archives" .src="${fasHome}"></wr-icon>
            </span>
          </a>
        </div>
        <div class="view-row">
          ${this.canRecord ? html`
          ${this.renderCollDropdown()}
          <button autofocus
           ?disabled=${this.actionButtonDisabled}
           @click="${!this.recording ? this.onStart : this.onStop}" class="button">
            <span class="icon">
              ${!this.recording ? html`
                <wr-icon .src=${wrRec}></wr-icon>` : html`
                <wr-icon .src=${fasBox}></wr-icon>`}
            </span>
            <span>${!this.recording ? "Start" : "Stop"}</span>
          </button>
          ` : ""}
        </div>
        ${this.renderCollCreate()}
        <div class="view-row is-marginless">
          <div>
            ${this.canRecord ? html`
            <p><a target="_blank" href="${this.getCollPage()}" class="is-size-6">Browse Archive</a></p>` : ""}
          </div>
          ${this.renderStartOpt()}
        </div>

        ${this.recording ? html`
        <div class="view-row autopilot">
          <button @click="${this.onBehaviorToggle}"
          ?disabled="${this.behaviorState === BEHAVIOR_WAIT_LOAD || this.behaviorState === BEHAVIOR_DONE || this.waitingForStop}"
          class="button ${this.behaviorState === BEHAVIOR_DONE ? "is-success" : "is-info"} is-small">
          ${this.behaviorsButtonLabel}
          </button>
        </div>
        ` : ""}

        ${this.status && this.status.sizeTotal ? html`
        <div class="view-row underline">
          <div class="session-head">Recorded in this tab</div>
          ${this.replayUrl ? 
    html`<a target="_blank" class="is-size-6" href="${this.replayUrl}">View Recorded Page</a>` : ""}
        </div>
        <div class="view-row">
          <table class="status">
            <tr><td>Size Stored:</td><th>${prettyBytes(this.status.sizeNew)}</th></tr>
            <tr><td>Size Loaded:</td><th>${prettyBytes(this.status.sizeTotal)}</th></tr>
            <tr><td>Pages:</td><th>${this.status.numPages}</th></tr>
            <tr><td>URLs:</td><th>${this.status.numUrls}</th></tr>

            ${this.behaviorResults && this.behaviorState !== BEHAVIOR_WAIT_LOAD 
              && this.behaviorState !== BEHAVIOR_READY_START ? html`
            <tr class="status-sep"><td></td><td></td></tr>
            ${Object.entries(this.behaviorResults).map(([name, value]) => html`
            <tr><td>${name}</td><th>${value}</th></tr>`
  )}` : ""}

          </table>
        </div>
        ` : html``}
      </div>
    `;
  }

  get actionButtonDisabled() {
    if (this.collDrop === "create") {
      return true;
    }

    return !this.recording ? this.waitingForStart : this.waitingForStop;
  }

  get behaviorsButtonLabel() {
    switch (this.behaviorState) {
     
    case BEHAVIOR_READY_START:
      return html`
        <wr-icon style="fill: white" .src="${fasPlay}"></wr-icon>
        &nbsp;Start Autopilot!`;

    case BEHAVIOR_RUNNING:
      return html`
        <wr-icon style="fill: white" .src="${fasPause}"></wr-icon>
        &nbsp;Pause Autopilot`;

    case BEHAVIOR_PAUSED:
      return html`
        <wr-icon style="fill: white" .src="${fasPlay}"></wr-icon>
        &nbsp;Unpause Autopilot`;

    case BEHAVIOR_DONE:
      return html`
        <wr-icon style="fill: white" .src="${fasCheck}"></wr-icon>
        &nbsp;Autopilot Done`;

    case BEHAVIOR_WAIT_LOAD:
    default:
      return "Autopilot: Waiting for page to load...";
    }
  }

  onStart() {
    this.sendMessage({type: "startRecording", collId: this.collId, url: this.pageUrl, autorun: this.autorun});
    this.waitingForStart = true;
    this.waitingForStop = false;
  }

  onStop() {
    this.sendMessage({type: "stopRecording"});
    this.waitingForStart = false;
    this.waitingForStop = true;
  }

  async onToggleAutoRun(event) {
    this.autorun = event.currentTarget.checked;
    await setLocalOption("autorunBehaviors", this.autorun ? "1" : "0");
  }

  async onSelectColl(event) {
    this.collId = event.currentTarget.getAttribute("data-id");
    this.collTitle = event.currentTarget.getAttribute("data-title");
    this.collDrop = "";

    await setLocalOption(`${this.tabId}-collId`, this.collId);
    await setLocalOption("defaultCollId", this.collId);
  }

  onBehaviorToggle() {
    this.sendMessage({type: "toggleBehaviors"});
  }

  onShowDrop(event)  {
    this.collDrop = "show";
    event.stopPropagation();
    event.preventDefault();
  }

  onNewColl() {
    const title = this.renderRoot.querySelector("#new-name").value;

    this.sendMessage({
      tabId: this.tabId,
      type: "newColl",
      title
    });
    removeLocalOption(`${this.tabId}-collId`);
    this.collDrop = "";
  }
}

// ===========================================================================
class WrIcon extends LitElement
{
  constructor() {
    super();
    this.size = "0.9em";
  }

  static get properties() {
    return {
      src: { type: Object },
      size: { type: String }
    };
  }

  render() {
    return html`
    <svg style="width: ${this.size}; height: ${this.size}"><g>${unsafeSVG(this.src)}</g></svg>
    `;
  }
}

customElements.define("wr-icon", WrIcon);
customElements.define("wr-popup-viewer", RecPopup);

export { RecPopup };

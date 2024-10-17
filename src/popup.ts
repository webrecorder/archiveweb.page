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

import wrRec from "./assets/icons/recLogo.svg";

import prettyBytes from "pretty-bytes";

import {
  getLocalOption,
  removeLocalOption,
  setLocalOption,
} from "./localstorage";

import {
  BEHAVIOR_WAIT_LOAD,
  BEHAVIOR_READY_START,
  BEHAVIOR_RUNNING,
  BEHAVIOR_PAUSED,
  BEHAVIOR_DONE,
} from "./consts";

const allCss = unsafeCSS(bulma);
// @ts-expect-error - TS7006 - Parameter 'custom' implicitly has an 'any' type.
function wrapCss(custom) {
  return [allCss, custom];
}

// ===========================================================================
class RecPopup extends LitElement {
  constructor() {
    super();

    // @ts-expect-error - TS2339 - Property 'collections' does not exist on type 'RecPopup'.
    this.collections = [];
    // @ts-expect-error - TS2339 - Property 'collTitle' does not exist on type 'RecPopup'.
    this.collTitle = "";
    // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'RecPopup'.
    this.collId = "";

    // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'RecPopup'.
    this.tabId = 0;
    // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecPopup'.
    this.recording = false;
    // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RecPopup'.
    this.status = null;

    // @ts-expect-error - TS2339 - Property 'port' does not exist on type 'RecPopup'.
    this.port = null;

    // @ts-expect-error - TS2339 - Property 'pageUrl' does not exist on type 'RecPopup'.
    this.pageUrl = "";
    // @ts-expect-error - TS2339 - Property 'pageTs' does not exist on type 'RecPopup'.
    this.pageTs = 0;
    // @ts-expect-error - TS2339 - Property 'replayUrl' does not exist on type 'RecPopup'.
    this.replayUrl = "";

    // @ts-expect-error - TS2339 - Property 'canRecord' does not exist on type 'RecPopup'.
    this.canRecord = false;
    // @ts-expect-error - TS2339 - Property 'failureMsg' does not exist on type 'RecPopup'.
    this.failureMsg = null;

    // @ts-expect-error - TS2339 - Property 'collDrop' does not exist on type 'RecPopup'.
    this.collDrop = "";

    // @ts-expect-error - TS2339 - Property 'allowCreate' does not exist on type 'RecPopup'.
    this.allowCreate = true;

    // @ts-expect-error - TS2339 - Property 'waitingForStart' does not exist on type 'RecPopup'.
    this.waitingForStart = false;
    // @ts-expect-error - TS2339 - Property 'waitingForStop' does not exist on type 'RecPopup'.
    this.waitingForStop = false;
    // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'RecPopup'.
    this.behaviorState = BEHAVIOR_WAIT_LOAD;
    // @ts-expect-error - TS2339 - Property 'behaviorMsg' does not exist on type 'RecPopup'.
    this.behaviorMsg = "";
    // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'RecPopup'.
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
      autorun: { type: Boolean },
    };
  }

  async firstUpdated() {
    document.addEventListener("click", () => {
      // @ts-expect-error - TS2339 - Property 'collDrop' does not exist on type 'RecPopup'.
      if (this.collDrop === "show") {
        // @ts-expect-error - TS2339 - Property 'collDrop' does not exist on type 'RecPopup'.
        this.collDrop = "";
      }
    });

    // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'RecPopup'.
    this.autorun = (await getLocalOption("autorunBehaviors")) === "1";

    this.registerMessages();
  }

  registerMessages() {
    // @ts-expect-error - TS2339 - Property 'port' does not exist on type 'RecPopup'.
    this.port = chrome.runtime.connect({ name: "popup-port" });

    // @ts-expect-error - TS7006 - Parameter 'tabs' implicitly has an 'any' type.
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length) {
        // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'RecPopup'.
        this.tabId = tabs[0].id;
        // @ts-expect-error - TS2339 - Property 'pageUrl' does not exist on type 'RecPopup'.
        this.pageUrl = tabs[0].url;
        // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'RecPopup'. | TS7006 - Parameter 'result' implicitly has an 'any' type.
        chrome.action.getTitle({ tabId: this.tabId }, (result) => {
          // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecPopup'.
          this.recording = result.indexOf("Recording:") >= 0;
        });

        // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'RecPopup'.
        this.sendMessage({ tabId: this.tabId, type: "startUpdates" });
      }
    });

    // @ts-expect-error - TS2339 - Property 'port' does not exist on type 'RecPopup'.
    this.port.onMessage.addListener((message) => {
      this.onMessage(message);
    });
  }

  // @ts-expect-error - TS7006 - Parameter 'message' implicitly has an 'any' type.
  sendMessage(message) {
    // @ts-expect-error - TS2339 - Property 'port' does not exist on type 'RecPopup'.
    this.port.postMessage(message);
  }

  // @ts-expect-error - TS7006 - Parameter 'message' implicitly has an 'any' type.
  async onMessage(message) {
    switch (message.type) {
      case "status":
        // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecPopup'.
        this.recording = message.recording;
        // @ts-expect-error - TS2339 - Property 'waitingForStart' does not exist on type 'RecPopup'.
        if (this.waitingForStart && message.firstPageStarted) {
          // @ts-expect-error - TS2339 - Property 'waitingForStart' does not exist on type 'RecPopup'.
          this.waitingForStart = false;
        }
        // @ts-expect-error - TS2339 - Property 'waitingForStop' does not exist on type 'RecPopup'.
        if (this.waitingForStop && !message.recording && !message.stopping) {
          // @ts-expect-error - TS2339 - Property 'waitingForStop' does not exist on type 'RecPopup'.
          this.waitingForStop = false;
        }
        // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RecPopup'.
        this.status = message;
        // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'RecPopup'.
        this.behaviorState = message.behaviorState;
        // @ts-expect-error - TS2339 - Property 'behaviorMsg' does not exist on type 'RecPopup'.
        this.behaviorMsg = message.behaviorData?.msg || "Starting...";
        // @ts-expect-error - TS2339 - Property 'behaviorResults' does not exist on type 'RecPopup'.
        this.behaviorResults = message.behaviorData?.state;
        // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'RecPopup'.
        this.autorun = message.autorun;
        if (message.pageUrl) {
          // @ts-expect-error - TS2339 - Property 'pageUrl' does not exist on type 'RecPopup'.
          this.pageUrl = message.pageUrl;
        }
        if (message.pageTs) {
          // @ts-expect-error - TS2339 - Property 'pageTs' does not exist on type 'RecPopup'.
          this.pageTs = message.pageTs;
        }
        // @ts-expect-error - TS2339 - Property 'failureMsg' does not exist on type 'RecPopup'.
        this.failureMsg = message.failureMsg;
        // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'RecPopup'.
        if (this.collId !== message.collId) {
          // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'RecPopup'.
          this.collId = message.collId;
          // @ts-expect-error - TS2339 - Property 'collTitle' does not exist on type 'RecPopup'. | TS2339 - Property 'collId' does not exist on type 'RecPopup'.
          this.collTitle = this.findTitleFor(this.collId);
          // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'RecPopup'. | TS2339 - Property 'collId' does not exist on type 'RecPopup'.
          await setLocalOption(`${this.tabId}-collId`, this.collId);
        }
        break;

      case "collections":
        // @ts-expect-error - TS2339 - Property 'collections' does not exist on type 'RecPopup'.
        this.collections = message.collections;
        // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'RecPopup'. | TS2339 - Property 'tabId' does not exist on type 'RecPopup'.
        this.collId = await getLocalOption(`${this.tabId}-collId`);
        // @ts-expect-error - TS2339 - Property 'collTitle' does not exist on type 'RecPopup'.
        this.collTitle = "";
        // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'RecPopup'.
        if (this.collId) {
          // @ts-expect-error - TS2339 - Property 'collTitle' does not exist on type 'RecPopup'. | TS2339 - Property 'collId' does not exist on type 'RecPopup'.
          this.collTitle = this.findTitleFor(this.collId);
        }
        // may no longer be valid, try default id
        // @ts-expect-error - TS2339 - Property 'collTitle' does not exist on type 'RecPopup'.
        if (!this.collTitle) {
          // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'RecPopup'.
          this.collId = message.collId;
          // @ts-expect-error - TS2339 - Property 'collTitle' does not exist on type 'RecPopup'. | TS2339 - Property 'collId' does not exist on type 'RecPopup'.
          this.collTitle = this.findTitleFor(this.collId);
        }
        // @ts-expect-error - TS2339 - Property 'collTitle' does not exist on type 'RecPopup'.
        if (!this.collTitle) {
          // @ts-expect-error - TS2339 - Property 'collTitle' does not exist on type 'RecPopup'.
          this.collTitle = "[No Title]";
        }
        break;
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'match' implicitly has an 'any' type.
  findTitleFor(match) {
    if (!match) {
      return "";
    }
    // @ts-expect-error - TS2339 - Property 'collections' does not exist on type 'RecPopup'.
    for (const coll of this.collections) {
      // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'RecPopup'.
      if (coll.id === this.collId) {
        return coll.title;
      }
    }

    return "";
  }

  // @ts-expect-error - TS7006 - Parameter 'changedProperties' implicitly has an 'any' type.
  updated(changedProperties) {
    if (
      // @ts-expect-error - TS2339 - Property 'pageUrl' does not exist on type 'RecPopup'.
      this.pageUrl &&
      // @ts-expect-error - TS2339 - Property 'pageTs' does not exist on type 'RecPopup'.
      this.pageTs &&
      (changedProperties.has("pageUrl") ||
        changedProperties.has("pageTs") ||
        changedProperties.has("recording") ||
        changedProperties.has("collId"))
    ) {
      const params = new URLSearchParams();
      // @ts-expect-error - TS2339 - Property 'pageUrl' does not exist on type 'RecPopup'.
      params.set("url", this.pageUrl);
      params.set(
        "ts",
        // @ts-expect-error - TS2339 - Property 'pageTs' does not exist on type 'RecPopup'.
        new Date(this.pageTs).toISOString().replace(/[-:TZ.]/g, ""),
      );
      params.set("view", "pages");

      // @ts-expect-error - TS2339 - Property 'replayUrl' does not exist on type 'RecPopup'.
      this.replayUrl = this.getCollPage() + "#" + params.toString();
    }

    if (
      changedProperties.has("pageUrl") ||
      changedProperties.has("failureMsg")
    ) {
      // @ts-expect-error - TS2339 - Property 'canRecord' does not exist on type 'RecPopup'.
      this.canRecord =
        // @ts-expect-error - TS2339 - Property 'pageUrl' does not exist on type 'RecPopup'.
        this.pageUrl &&
        // @ts-expect-error - TS2339 - Property 'pageUrl' does not exist on type 'RecPopup'.
        (this.pageUrl === "about:blank" ||
          // @ts-expect-error - TS2339 - Property 'pageUrl' does not exist on type 'RecPopup'.
          this.pageUrl.startsWith("http:") ||
          // @ts-expect-error - TS2339 - Property 'pageUrl' does not exist on type 'RecPopup'.
          this.pageUrl.startsWith("https:"));
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
    // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'RecPopup'.
    sourceParams.set("source", "local://" + this.collId);

    return this.getHomePage() + "?" + sourceParams.toString();
  }

  get notRecordingMessage() {
    return "Not Archiving this Tab";
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
        margin-right: 1em;
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
        margin-top: 1em;
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
    // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'RecPopup'.
    if (this.behaviorState === BEHAVIOR_RUNNING) {
      return html`<span class="status-autopilot"
        >Auto Recording,
        ${
          // @ts-expect-error - TS2339 - Property 'behaviorMsg' does not exist on type 'RecPopup'.
          this.behaviorMsg
        }</span
      >`;
    }

    // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecPopup'.
    if (this.recording) {
      return html`<b
          >${
            // @ts-expect-error - TS2339 - Property 'waitingForStop' does not exist on type 'RecPopup'.
            this.waitingForStop ? "Finishing " : ""
          }
          Archiving:&nbsp;</b
        >${
          // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RecPopup'. | TS2339 - Property 'status' does not exist on type 'RecPopup'.
          this.status?.numPending
            ? html`
                <span class="status-pending"
                  >${
                    // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RecPopup'.
                    this.status.numPending
                  }
                  URLs
                  pending${
                    // @ts-expect-error - TS2339 - Property 'waitingForStop' does not exist on type 'RecPopup'.
                    this.waitingForStop
                      ? "."
                      : ", please wait before loading a new page."
                  }</span
                >
              `
            : html` <span class="status-ready">Idle, Continue Browsing</span>`
        }`;
    }

    // @ts-expect-error - TS2339 - Property 'failureMsg' does not exist on type 'RecPopup'.
    if (this.failureMsg) {
      return html`
        <div class="error">
          <p>
            Sorry, there was an error starting archiving on this page. Please
            try again or try a different page.
          </p>
          <p class="error-msg">
            Error Details:
            <i
              >${
                // @ts-expect-error - TS2339 - Property 'failureMsg' does not exist on type 'RecPopup'.
                this.failureMsg
              }</i
            >
          </p>
          <p>
            If the error persists, check the
            <a
              href="https://archiveweb.page/guide/troubleshooting/errors"
              target="_blank"
              >Common Errors and Issues</a
            >
            page in the guide for known issues and possible solutions.
          </p>
        </div>
      `;
    }

    // @ts-expect-error - TS2339 - Property 'canRecord' does not exist on type 'RecPopup'.
    if (!this.canRecord) {
      // @ts-expect-error - TS2339 - Property 'pageUrl' does not exist on type 'RecPopup'. | TS2339 - Property 'pageUrl' does not exist on type 'RecPopup'.
      if (this.pageUrl?.startsWith(this.extRoot)) {
        return html`
          <p class="is-size-7">
            This page is part of the extension. You can view existing archived
            items from here. To start a new archiving session, click the
            <wr-icon .src="${wrRec}"></wr-icon> Start Archiving button and enter
            a new URL.
          </p>
        `;
      }

      return html`<i>Can't archive this page.</i>`;
    }

    // @ts-expect-error - TS2339 - Property 'waitingForStart' does not exist on type 'RecPopup'.
    if (this.waitingForStart) {
      return html`<i>Archiving will start after the page reloads...</i>`;
    }

    return html`<i>${this.notRecordingMessage}</i>`;
  }

  renderCollDropdown() {
    return html`
      <div class="coll-select">
        <div class="is-size-7">
          ${
            // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecPopup'.
            this.recording ? "Currently archiving" : "Save"
          }
          to:&nbsp;
        </div>
        <div
          class="dropdown ${
            // @ts-expect-error - TS2339 - Property 'collDrop' does not exist on type 'RecPopup'.
            this.collDrop === "show" ? "is-active" : ""
          }"
        >
          <div class="dropdown-trigger">
            <button
              @click="${this.onShowDrop}"
              class="coll button is-small"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              ?disabled="${
                // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecPopup'.
                this.recording
              }"
            >
              <span
                >${
                  // @ts-expect-error - TS2339 - Property 'collTitle' does not exist on type 'RecPopup'.
                  this.collTitle
                }</span
              >
              <span class="icon is-small">
                <wr-icon .src="${fasCaretDown}"></wr-icon>
              </span>
            </button>
          </div>
          ${
            // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecPopup'.
            !this.recording
              ? html` <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    ${
                      // @ts-expect-error - TS2339 - Property 'allowCreate' does not exist on type 'RecPopup'.
                      this.allowCreate
                        ? html` <a
                              @click="${
                                // @ts-expect-error - TS2339 - Property 'collDrop' does not exist on type 'RecPopup'.
                                () => (this.collDrop = "create")
                              }"
                              class="dropdown-item"
                            >
                              <span class="icon is-small">
                                <wr-icon .src="${fasPlus}"></wr-icon> </span
                              >New Archiving Session
                            </a>
                            <hr class="dropdown-divider" />`
                        : ""
                    }
                    ${
                      // @ts-expect-error - TS2339 - Property 'collections' does not exist on type 'RecPopup'.
                      this.collections.map(
                        // @ts-expect-error - TS7006 - Parameter 'coll' implicitly has an 'any' type.
                        (coll) => html`
                          <a
                            @click=${this.onSelectColl}
                            data-title="${coll.title}"
                            data-id="${coll.id}"
                            class="dropdown-item"
                            >${coll.title}</a
                          >
                        `,
                      )
                    }
                  </div>
                </div>`
              : html``
          }
        </div>
      </div>
    `;
  }

  renderStartOpt() {
    // @ts-expect-error - TS2339 - Property 'canRecord' does not exist on type 'RecPopup'. | TS2339 - Property 'recording' does not exist on type 'RecPopup'.
    if (!this.canRecord || this.recording) {
      return "";
    }

    return html`
      <div class="field">
        <label class="checkbox is-size-7">
          <input
            type="checkbox"
            ?disabled="${
              // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecPopup'.
              this.recording
            }"
            ?checked="${
              // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'RecPopup'.
              this.autorun
            }"
            @change="${this.onToggleAutoRun}"
          />
          Start With Autopilot
        </label>
      </div>
    `;
  }

  renderCollCreate() {
    // @ts-expect-error - TS2339 - Property 'collDrop' does not exist on type 'RecPopup'.
    if (this.collDrop !== "create") {
      return "";
    }

    return html`
      <div class="view-row is-marginless" style="background-color: #ddddff">
        <form @submit="${this.onNewColl}">
          <div class="flex-form">
            <label for="new-name" class="is-size-7 is-italic"
              >New Archiving Session:</label
            >
            <div class="control">
              <input
                class="input is-small"
                id="new-name"
                type="text"
                required
                placeholder="Enter Archiving Session Name"
              />
            </div>
            <button class="button is-small is-outlined" type="submit">
              <wr-icon .src=${fasCheck}></wr-icon>
            </button>
            <button
              @click="${() =>
                // @ts-expect-error - TS2339 - Property 'collDrop' does not exist on type 'RecPopup'.
                (this.collDrop = "")}"
              class="button is-small is-outlined"
              type="button"
            >
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
          <p class="rec-state">${this.renderStatus()}</p>
          <a
            target="_blank"
            href="https://archiveweb.page/guide/usage"
            class="smallest button is-small is-inverted"
          >
            <span class="icon is-small">
              <wr-icon size="1.0em" title="Guide" .src="${fasQ}"></wr-icon>
            </span>
          </a>
          <a
            target="_blank"
            href="${this.getHomePage()}"
            class="smallest button is-small is-inverted"
          >
            <span class="icon is-small">
              <wr-icon
                size="1.0em"
                title="Home - All Archives"
                .src="${fasHome}"
              ></wr-icon>
            </span>
          </a>
        </div>
        <div class="view-row">
          ${
            // @ts-expect-error - TS2339 - Property 'canRecord' does not exist on type 'RecPopup'.
            this.canRecord
              ? html`
                  ${this.renderCollDropdown()}
                  <button
                    autofocus
                    ?disabled=${this.actionButtonDisabled}
                    @click="${
                      // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecPopup'.
                      !this.recording ? this.onStart : this.onStop
                    }"
                    class="button"
                  >
                    <span class="icon">
                      ${
                        // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecPopup'.
                        !this.recording
                          ? html` <wr-icon .src=${wrRec}></wr-icon>`
                          : html` <wr-icon .src=${fasBox}></wr-icon>`
                      }
                    </span>
                    <span
                      >${
                        // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecPopup'.

                        !this.recording ? "Start Archiving" : "Stop Archiving"
                      }</span
                    >
                  </button>
                `
              : ""
          }
        </div>
        ${this.renderCollCreate()}
        <div class="view-row is-marginless">
          <div>
            ${
              // @ts-expect-error - TS2339 - Property 'canRecord' does not exist on type 'RecPopup'.
              this.canRecord
                ? html` <p>
                    <a
                      target="_blank"
                      href="${this.getCollPage()}"
                      class="is-size-6"
                      >View Archived Pages</a
                    >
                  </p>`
                : ""
            }
          </div>
          ${this.renderStartOpt()}
        </div>

        ${
          // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecPopup'.
          this.recording
            ? html`
                <div class="view-row autopilot">
                  <button
                    @click="${this.onBehaviorToggle}"
                    ?disabled="${
                      // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'RecPopup'.
                      this.behaviorState === BEHAVIOR_WAIT_LOAD ||
                      // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'RecPopup'.
                      this.behaviorState === BEHAVIOR_DONE ||
                      // @ts-expect-error - TS2339 - Property 'waitingForStop' does not exist on type 'RecPopup'.
                      this.waitingForStop
                    }"
                    class="button ${
                      // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'RecPopup'.
                      this.behaviorState === BEHAVIOR_DONE
                        ? "is-success"
                        : "is-info"
                    } is-small"
                  >
                    ${this.behaviorsButtonLabel}
                  </button>
                </div>
              `
            : ""
        }
        ${
          // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RecPopup'. | TS2339 - Property 'status' does not exist on type 'RecPopup'.
          this.status?.sizeTotal
            ? html`
                <div class="view-row underline">
                  <div class="session-head">Archived in this tab</div>
                  ${
                    // @ts-expect-error - TS2339 - Property 'replayUrl' does not exist on type 'RecPopup'.
                    this.replayUrl
                      ? html`<a
                          target="_blank"
                          class="is-size-6"
                          href="${
                            // @ts-expect-error - TS2339 - Property 'replayUrl' does not exist on type 'RecPopup'.
                            this.replayUrl
                          }"
                          >Replay Current Page</a
                        >`
                      : ""
                  }
                </div>
                <div class="view-row">
                  <table class="status">
                    <tr>
                      <td>Size Stored:</td>
                      <th>
                        ${
                          // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RecPopup'.
                          prettyBytes(this.status.sizeNew)
                        }
                      </th>
                    </tr>
                    <tr>
                      <td>Size Loaded:</td>
                      <th>
                        ${
                          // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RecPopup'.
                          prettyBytes(this.status.sizeTotal)
                        }
                      </th>
                    </tr>
                    <tr>
                      <td>Pages:</td>
                      <th>
                        ${
                          // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RecPopup'.
                          this.status.numPages
                        }
                      </th>
                    </tr>
                    <tr>
                      <td>URLs:</td>
                      <th>
                        ${
                          // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'RecPopup'.
                          this.status.numUrls
                        }
                      </th>
                    </tr>

                    ${
                      // @ts-expect-error - TS2339 - Property 'behaviorResults' does not exist on type 'RecPopup'.
                      this.behaviorResults &&
                      // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'RecPopup'.
                      this.behaviorState !== BEHAVIOR_WAIT_LOAD &&
                      // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'RecPopup'.
                      this.behaviorState !== BEHAVIOR_READY_START
                        ? html` <tr class="status-sep">
                              <td></td>
                              <td></td>
                            </tr>
                            ${
                              // @ts-expect-error - TS2339 - Property 'behaviorResults' does not exist on type 'RecPopup'.
                              Object.entries(this.behaviorResults).map(
                                ([name, value]) =>
                                  html` <tr>
                                    <td>${name}</td>
                                    <th>${value}</th>
                                  </tr>`,
                              )
                            }`
                        : ""
                    }
                  </table>
                </div>
              `
            : html``
        }
      </div>
    `;
  }

  get actionButtonDisabled() {
    // @ts-expect-error - TS2339 - Property 'collDrop' does not exist on type 'RecPopup'.
    if (this.collDrop === "create") {
      return true;
    }

    // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecPopup'. | TS2339 - Property 'waitingForStart' does not exist on type 'RecPopup'. | TS2339 - Property 'waitingForStop' does not exist on type 'RecPopup'.
    return !this.recording ? this.waitingForStart : this.waitingForStop;
  }

  get behaviorsButtonLabel() {
    // @ts-expect-error - TS2339 - Property 'behaviorState' does not exist on type 'RecPopup'.
    switch (this.behaviorState) {
      case BEHAVIOR_READY_START:
        return html` <wr-icon style="fill: white" .src="${fasPlay}"></wr-icon>
          &nbsp;Start Autopilot!`;

      case BEHAVIOR_RUNNING:
        return html` <wr-icon style="fill: white" .src="${fasPause}"></wr-icon>
          &nbsp;Pause Autopilot`;

      case BEHAVIOR_PAUSED:
        return html` <wr-icon style="fill: white" .src="${fasPlay}"></wr-icon>
          &nbsp;Unpause Autopilot`;

      case BEHAVIOR_DONE:
        return html` <wr-icon style="fill: white" .src="${fasCheck}"></wr-icon>
          &nbsp;Autopilot Done`;

      case BEHAVIOR_WAIT_LOAD:
      default:
        return "Autopilot: Waiting for page to load...";
    }
  }

  onStart() {
    this.sendMessage({
      type: "startRecording",
      // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'RecPopup'.
      collId: this.collId,
      // @ts-expect-error - TS2339 - Property 'pageUrl' does not exist on type 'RecPopup'.
      url: this.pageUrl,
      // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'RecPopup'.
      autorun: this.autorun,
    });
    // @ts-expect-error - TS2339 - Property 'waitingForStart' does not exist on type 'RecPopup'.
    this.waitingForStart = true;
    // @ts-expect-error - TS2339 - Property 'waitingForStop' does not exist on type 'RecPopup'.
    this.waitingForStop = false;
  }

  onStop() {
    this.sendMessage({ type: "stopRecording" });
    // @ts-expect-error - TS2339 - Property 'waitingForStart' does not exist on type 'RecPopup'.
    this.waitingForStart = false;
    // @ts-expect-error - TS2339 - Property 'waitingForStop' does not exist on type 'RecPopup'.
    this.waitingForStop = true;
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  async onToggleAutoRun(event) {
    // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'RecPopup'.
    this.autorun = event.currentTarget.checked;
    // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'RecPopup'.
    await setLocalOption("autorunBehaviors", this.autorun ? "1" : "0");
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  async onSelectColl(event) {
    // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'RecPopup'.
    this.collId = event.currentTarget.getAttribute("data-id");
    // @ts-expect-error - TS2339 - Property 'collTitle' does not exist on type 'RecPopup'.
    this.collTitle = event.currentTarget.getAttribute("data-title");
    // @ts-expect-error - TS2339 - Property 'collDrop' does not exist on type 'RecPopup'.
    this.collDrop = "";

    // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'RecPopup'. | TS2339 - Property 'collId' does not exist on type 'RecPopup'.
    await setLocalOption(`${this.tabId}-collId`, this.collId);
    // @ts-expect-error - TS2339 - Property 'collId' does not exist on type 'RecPopup'.
    await setLocalOption("defaultCollId", this.collId);
  }

  onBehaviorToggle() {
    this.sendMessage({ type: "toggleBehaviors" });
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onShowDrop(event) {
    // @ts-expect-error - TS2339 - Property 'collDrop' does not exist on type 'RecPopup'.
    this.collDrop = "show";
    event.stopPropagation();
    event.preventDefault();
  }

  onNewColl() {
    // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'value' does not exist on type 'Element'.
    const title = this.renderRoot.querySelector("#new-name").value;

    this.sendMessage({
      // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'RecPopup'.
      tabId: this.tabId,
      type: "newColl",
      title,
    });
    // @ts-expect-error - TS2339 - Property 'tabId' does not exist on type 'RecPopup'.
    removeLocalOption(`${this.tabId}-collId`);
    // @ts-expect-error - TS2339 - Property 'collDrop' does not exist on type 'RecPopup'.
    this.collDrop = "";
  }
}

// ===========================================================================
class WrIcon extends LitElement {
  constructor() {
    super();
    // @ts-expect-error - TS2339 - Property 'size' does not exist on type 'WrIcon'.
    this.size = "0.9em";
  }

  static get properties() {
    return {
      src: { type: Object },
      size: { type: String },
    };
  }

  render() {
    return html`
      <svg
        style="width: ${
          // @ts-expect-error - TS2339 - Property 'size' does not exist on type 'WrIcon'. | TS2339 - Property 'size' does not exist on type 'WrIcon'.
          this.size
        }; height: ${
          // @ts-expect-error - TS2339 - Property 'size' does not exist on type 'WrIcon'. | TS2339 - Property 'size' does not exist on type 'WrIcon'.
          this.size
        }"
      >
        <g>
          ${
            // @ts-expect-error - TS2339 - Property 'src' does not exist on type 'WrIcon'.
            unsafeSVG(this.src)
          }
        </g>
      </svg>
    `;
  }
}

customElements.define("wr-icon", WrIcon);
customElements.define("wr-popup-viewer", RecPopup);

export { RecPopup };

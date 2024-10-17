import {
  LitElement,
  html,
  css,
  wrapCss,
  clickOnSpacebarPress,
} from "replaywebpage";

import fasRefresh from "@fortawesome/fontawesome-free/svgs/solid/redo-alt.svg";
//import fasFullscreen from '@fortawesome/fontawesome-free/svgs/solid/desktop.svg';
//import fasUnfullscreen from '@fortawesome/fontawesome-free/svgs/solid/compress-arrows-alt.svg';

import fasLeft from "@fortawesome/fontawesome-free/svgs/solid/arrow-left.svg";
import fasRight from "@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg";
//import fasMenuV from '@fortawesome/fontawesome-free/svgs/solid/ellipsis-v.svg';

import awpLogo from "../assets/brand/archivewebpage-icon-color.svg";

import "./app-popup";
import { BEHAVIOR_RUNNING } from "../consts";

class RecWindowUI extends LitElement {
  constructor() {
    super();
    // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RecWindowUI'.
    this.url = "about:blank";
    // @ts-expect-error - TS2339 - Property 'isLoading' does not exist on type 'RecWindowUI'.
    this.isLoading = false;
    // @ts-expect-error - TS2339 - Property 'favIconUrl' does not exist on type 'RecWindowUI'.
    this.favIconUrl = null;
    // @ts-expect-error - TS2339 - Property 'favIcons' does not exist on type 'RecWindowUI'.
    this.favIcons = null;

    // @ts-expect-error - TS2551 - Property 'canGoBack' does not exist on type 'RecWindowUI'. Did you mean 'onGoBack'?
    this.canGoBack = false;
    // @ts-expect-error - TS2551 - Property 'canGoForward' does not exist on type 'RecWindowUI'. Did you mean 'onGoForward'?
    this.canGoForward = false;

    // @ts-expect-error - TS2339 - Property 'showPopup' does not exist on type 'RecWindowUI'.
    this.showPopup = false;

    this.initStats();
  }

  initStats() {
    // @ts-expect-error - TS2339 - Property 'stats' does not exist on type 'RecWindowUI'.
    this.stats = null;
    // @ts-expect-error - TS2339 - Property 'numPending' does not exist on type 'RecWindowUI'.
    this.numPending = 0;

    window.addEventListener("message", (event) => {
      if (event.data.stats) {
        // @ts-expect-error - TS2339 - Property 'stats' does not exist on type 'RecWindowUI'.
        this.stats = event.data.stats;
        // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecWindowUI'. | TS2339 - Property 'stats' does not exist on type 'RecWindowUI'.
        this.recording = this.stats.recording;
        // @ts-expect-error - TS2339 - Property 'numPending' does not exist on type 'RecWindowUI'. | TS2339 - Property 'stats' does not exist on type 'RecWindowUI'.
        this.numPending = this.stats.numPending;
        // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'RecWindowUI'. | TS2339 - Property 'stats' does not exist on type 'RecWindowUI'.
        this.autorun = this.stats.behaviorState === BEHAVIOR_RUNNING;
      }
    });
  }

  static get properties() {
    return {
      isLoading: { type: Boolean },
      favIconUrl: { type: String },
      url: { type: String },

      canGoBack: { type: Boolean },
      canGoForward: { type: Boolean },

      stats: { type: Object },
      numPending: { type: Number },
      recording: { type: Boolean },
      autorun: { type: Boolean },

      showPopup: { type: Boolean },
      wcId: { type: Number },
    };
  }

  static get styles() {
    return wrapCss(css`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      webview {
        width: 100%;
        height: 100%;
      }

      wr-app-popup {
        z-index: 200;
        width: 400px;
        background: white;
        position: fixed;
        height: fit-content;
        box-sizing: content-box;
        top: 50px;
        right: 0px;
        padding: 8px;
        border: 1px grey;
        box-shadow: grey 1px 1px 4px;
      }

      .location-bar {
        margin: 4px 4px 0px 0px;
        padding-bottom: 4px;
        width: 100%;
        background-color: white;
        border-bottom: solid 0.1rem #97989a;
      }

      .is-borderless {
        border: 0px;
      }

      input#url {
        border-radius: 4px;
      }

      a.button.is-borderless {
        padding: 0.8em;
      }

      .favicon img {
        width: 20px;
        height: 20px;
        filter: drop-shadow(1px 1px 2px grey);
      }

      form {
        width: 100%;
        margin: 0px 8px;
      }

      .grey-disabled {
        --fa-icon-fill-color: lightgrey;
        color: lightgrey;
      }

      #wr-button.button {
        padding: 0 1.5em 0 1em;
      }

      #wr-button .icon {
        position: relative;
      }

      .overlay {
        position: absolute;
        z-index: 20;
        width: 16px;
        height: 16px;
        bottom: 0px;
        right: 0px;
        margin-right: -4px;
        margin-bottom: -3px;
        border: 2px solid white;
        border-radius: 4px;
        font-size: 9px;
        color: white;
      }

      .overlay-idle {
        background-color: #4d7c0f;
      }

      .overlay-waiting {
        background-color: #c5a802;
      }

      .overlay-auto {
        background-color: #0891b2;
      }
    `);
  }

  render() {
    return html`
      <nav class="location-bar" aria-label="replay">
        <div class="field has-addons">
          <a
            href="#"
            role="button"
            class="button is-borderless"
            @click="${this.onGoBack}"
            @keyup="${clickOnSpacebarPress}"
            title="Back"
            aria-label="Back"
          >
            <span class="icon is-small">
              <fa-icon
                size="1.0em"
                class="${
                  // @ts-expect-error - TS2551 - Property 'canGoBack' does not exist on type 'RecWindowUI'. Did you mean 'onGoBack'?
                  this.canGoBack ? "" : "grey-disabled"
                }"
                aria-hidden="true"
                .svg="${fasLeft}"
              ></fa-icon>
            </span>
          </a>
          <a
            href="#"
            role="button"
            class="button is-borderless"
            @click="${this.onGoForward}"
            @keyup="${clickOnSpacebarPress}"
            title="Forward"
            aria-label="Forward"
          >
            <span class="icon is-small">
              <fa-icon
                size="1.0em"
                class="${
                  // @ts-expect-error - TS2551 - Property 'canGoForward' does not exist on type 'RecWindowUI'. Did you mean 'onGoForward'?
                  this.canGoForward ? "" : "grey-disabled"
                }"
                aria-hidden="true"
                .svg="${fasRight}"
              ></fa-icon>
            </span>
          </a>
          <a
            href="#"
            role="button"
            id="refresh"
            class="button is-borderless ${
              // @ts-expect-error - TS2339 - Property 'isLoading' does not exist on type 'RecWindowUI'.
              this.isLoading ? "is-loading" : ""
            }"
            @click="${this.onRefresh}"
            @keyup="${clickOnSpacebarPress}"
            title="Reload"
            aria-label="Reload"
          >
            <span class="icon is-small">
              ${
                // @ts-expect-error - TS2339 - Property 'isLoading' does not exist on type 'RecWindowUI'.
                !this.isLoading
                  ? html`
                      <fa-icon
                        size="1.0em"
                        class="has-text-grey"
                        aria-hidden="true"
                        .svg="${fasRefresh}"
                      ></fa-icon>
                    `
                  : ""
              }
            </span>
          </a>
          <form @submit="${this.onSubmit}">
            <div
              class="control is-expanded ${
                // @ts-expect-error - TS2339 - Property 'favIconUrl' does not exist on type 'RecWindowUI'.
                this.favIconUrl ? "has-icons-left" : "has-icons-left"
              }"
            >
              <input
                id="url"
                class="input"
                type="url"
                @keydown="${this.onKeyDown}"
                @blur="${this.onLostFocus}"
                .value="${
                  // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RecWindowUI'.
                  this.url
                }"
                placeholder="Enter text to search or a URL to replay"
              />

              ${
                // @ts-expect-error - TS2339 - Property 'favIconUrl' does not exist on type 'RecWindowUI'.
                this.favIconUrl
                  ? html` <span class="favicon icon is-small is-left">
                      <img
                        src="${
                          // @ts-expect-error - TS2339 - Property 'favIconUrl' does not exist on type 'RecWindowUI'.
                          this.favIconUrl
                        }"
                        @error="${this.tryNextIcon}"
                      />
                    </span>`
                  : html``
              }
            </div>
          </form>
          <a
            id="wr-button"
            role="button"
            class="button is-borderless"
            @click="${this.onTogglePopup}"
          >
            <span class="icon is-small">
              <fa-icon
                id="wrlogo"
                size="1.8em"
                .svg="${awpLogo}"
                aria-hidden="true"
              ></fa-icon>
              ${
                // @ts-expect-error - TS2339 - Property 'recording' does not exist on type 'RecWindowUI'.
                this.recording
                  ? // @ts-expect-error - TS2339 - Property 'autorun' does not exist on type 'RecWindowUI'.
                    html` ${this.autorun
                      ? html`<span class="overlay overlay-auto"></span>`
                      : // @ts-expect-error - TS2339 - Property 'numPending' does not exist on type 'RecWindowUI'.
                        !this.numPending
                        ? html` <span class="overlay overlay-idle">✓</span>`
                        : html`
                            <span class="overlay overlay-waiting"
                              >${
                                // @ts-expect-error - TS2339 - Property 'numPending' does not exist on type 'RecWindowUI'.
                                this.numPending
                              }</span
                            >
                          `}`
                  : ""
              }
            </span>
          </a>
        </div>
      </nav>
      ${this.renderWebView()} ${this.renderPopup()}
    `;
  }

  renderWebView() {
    return html` <webview
      allowpopups=""
      partition="persist:wr"
      @did-start-loading="${
        // @ts-expect-error - TS2339 - Property 'isLoading' does not exist on type 'RecWindowUI'.
        () => (this.isLoading = true)
      }"
      @did-stop-loading="${
        // @ts-expect-error - TS2339 - Property 'isLoading' does not exist on type 'RecWindowUI'.
        () => (this.isLoading = false)
      }"
      @page-favicon-updated="${this.onFaviconUpdated}"
      @will-navigate="${this.onWillNavigate}"
      @did-navigate="${this.onDidNavigate}"
      @did-navigate-in-page="${this.onDidNavigateInPage}"
      src="about:blank"
    >
    </webview>`;
  }

  renderPopup() {
    // @ts-expect-error - TS2339 - Property 'showPopup' does not exist on type 'RecWindowUI'.
    if (!this.showPopup) {
      return;
    }

    return html`
      <wr-app-popup
        .msg="${
          // @ts-expect-error - TS2339 - Property 'stats' does not exist on type 'RecWindowUI'.
          this.stats
        }"
        @send-msg="${this.onSendMsg}"
      >
      </wr-app-popup>
    `;
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onSendMsg(event) {
    const msg = event.detail;

    const webview = this.renderRoot.querySelector("webview");

    // @ts-expect-error - TS2339 - Property 'archivewebpage' does not exist on type 'Window & typeof globalThis'.
    if (webview && window.archivewebpage.sendMsg) {
      // @ts-expect-error - TS2339 - Property 'archivewebpage' does not exist on type 'Window & typeof globalThis'. | TS2339 - Property 'getWebContentsId' does not exist on type 'Element'.
      window.archivewebpage.sendMsg(webview.getWebContentsId(), msg);
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onFaviconUpdated(event) {
    // @ts-expect-error - TS2339 - Property 'favIcons' does not exist on type 'RecWindowUI'.
    this.favIcons = event.favicons;
    this.tryNextIcon();
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onWillNavigate(event) {
    // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RecWindowUI'.
    this.url = event.url;

    // @ts-expect-error - TS2551 - Property 'canGoBack' does not exist on type 'RecWindowUI'. Did you mean 'onGoBack'?
    this.canGoBack = event.currentTarget.canGoBack();
    // @ts-expect-error - TS2551 - Property 'canGoForward' does not exist on type 'RecWindowUI'. Did you mean 'onGoForward'?
    this.canGoForward = event.currentTarget.canGoForward();
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onDidNavigate(event) {
    // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RecWindowUI'.
    this.url = event.url;

    // @ts-expect-error - TS2551 - Property 'canGoBack' does not exist on type 'RecWindowUI'. Did you mean 'onGoBack'?
    this.canGoBack = event.currentTarget.canGoBack();
    // @ts-expect-error - TS2551 - Property 'canGoForward' does not exist on type 'RecWindowUI'. Did you mean 'onGoForward'?
    this.canGoForward = event.currentTarget.canGoForward();
    // @ts-expect-error - TS2339 - Property 'isLoading' does not exist on type 'RecWindowUI'.
    this.isLoading = false;
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onDidNavigateInPage(event) {
    // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RecWindowUI'.
    this.url = event.url;

    // @ts-expect-error - TS2551 - Property 'canGoBack' does not exist on type 'RecWindowUI'. Did you mean 'onGoBack'?
    this.canGoBack = event.currentTarget.canGoBack();
    // @ts-expect-error - TS2551 - Property 'canGoForward' does not exist on type 'RecWindowUI'. Did you mean 'onGoForward'?
    this.canGoForward = event.currentTarget.canGoForward();
  }

  onTogglePopup() {
    //ipcRenderer.send("popup-toggle-" + this.wcId);
    // @ts-expect-error - TS2339 - Property 'showPopup' does not exist on type 'RecWindowUI'. | TS2339 - Property 'showPopup' does not exist on type 'RecWindowUI'.
    this.showPopup = !this.showPopup;
  }

  tryNextIcon() {
    // @ts-expect-error - TS2339 - Property 'favIconUrl' does not exist on type 'RecWindowUI'.
    this.favIconUrl =
      // @ts-expect-error - TS2339 - Property 'favIcons' does not exist on type 'RecWindowUI'. | TS2339 - Property 'favIcons' does not exist on type 'RecWindowUI'. | TS2339 - Property 'favIcons' does not exist on type 'RecWindowUI'.
      this.favIcons?.length ? this.favIcons.shift() : null;
  }

  onGoBack() {
    const webview = this.renderRoot.querySelector("webview");
    // @ts-expect-error - TS2551 - Property 'canGoBack' does not exist on type 'RecWindowUI'. Did you mean 'onGoBack'?
    if (webview && this.canGoBack) {
      // @ts-expect-error - TS2339 - Property 'goBack' does not exist on type 'Element'.
      webview.goBack();
    }
  }

  onGoForward() {
    const webview = this.renderRoot.querySelector("webview");
    // @ts-expect-error - TS2551 - Property 'canGoForward' does not exist on type 'RecWindowUI'. Did you mean 'onGoForward'?
    if (webview && this.canGoForward) {
      // @ts-expect-error - TS2339 - Property 'goForward' does not exist on type 'Element'.
      webview.goForward();
    }
  }

  onRefresh() {
    const webview = this.renderRoot.querySelector("webview");
    if (webview) {
      // @ts-expect-error - TS2339 - Property 'reload' does not exist on type 'Element'.
      webview.reload();
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onSubmit(event) {
    event.preventDefault();
    const input = this.renderRoot.querySelector("input");
    const webview = this.renderRoot.querySelector("webview");

    // @ts-expect-error - TS2531 - Object is possibly 'null'.
    if (webview && input.value) {
      // @ts-expect-error - TS2339 - Property 'loadURL' does not exist on type 'Element'. | TS2531 - Object is possibly 'null'.
      webview.loadURL(input.value);
    } else {
      // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'url' does not exist on type 'RecWindowUI'.
      input.value = this.url;
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onKeyDown(event) {
    if (event.key === "Esc" || event.key === "Escape") {
      event.preventDefault();
      // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RecWindowUI'.
      event.currentTarget.value = this.url;
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onLostFocus(event) {
    if (!event.currentTarget.value) {
      // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'RecWindowUI'.
      event.currentTarget.value = this.url;
    }
  }
}

customElements.define("wr-rec-ui", RecWindowUI);

export { RecWindowUI };

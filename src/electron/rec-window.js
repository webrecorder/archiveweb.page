import { LitElement, html, css, wrapCss, clickOnSpacebarPress } from 'replaywebpage/src/misc';

import fasRefresh from '@fortawesome/fontawesome-free/svgs/solid/redo-alt.svg';
//import fasFullscreen from '@fortawesome/fontawesome-free/svgs/solid/desktop.svg';
//import fasUnfullscreen from '@fortawesome/fontawesome-free/svgs/solid/compress-arrows-alt.svg';

import fasLeft from '@fortawesome/fontawesome-free/svgs/solid/arrow-left.svg';
import fasRight from '@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg';
//import fasMenuV from '@fortawesome/fontawesome-free/svgs/solid/ellipsis-v.svg';

import wrLogo from '../../assets/wr-logo.svg';

import './app-popup';

class RecWindowUI extends LitElement
{
  constructor() {
    super();
    this.url = "about:blank";
    this.isLoading = false;
    this.favIconUrl = null;
    this.favIcons = null;

    this.canGoBack = false;
    this.canGoForward = false;

    this.showPopup = false;

    this.initStats();
  }

  initStats() {
    this.stats = null;
    this.numPending = 0;

    window.addEventListener("message", (event) => {
      if (event.data.stats) {
        this.stats = event.data.stats;
        this.recording = this.stats.recording;
        this.numPending = this.stats.numPending;
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

      showPopup: { type: Boolean },
      wcId: { type: Number }
    }
  }

  static get styles() {
    return wrapCss(css`
      :host {
        width: 100%;
        height: 100%;
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
        height: 300px;
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
        border-bottom: solid .1rem #97989A;
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
        padding: 0 1.5em 0 1.0em;
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
        margin-bottom: -4px;
        border: 1px solid black;
        border-radius: 3px;
        font-size: 9px;
        color: white;
      }

      .overlay-idle {
        background-color: #64e986;
      }

      .overlay-waiting {
        background-color: #bb9f08;
      }

    `);
  }

  render() {
    return html`
    <nav class="location-bar" aria-label="replay">
      <div class="field has-addons">
        <a href="#" role="button" class="button is-borderless" @click="${this.onGoBack}" @keyup="${clickOnSpacebarPress}"
                title="Back" aria-label="Back">
          <span class="icon is-small">
            <fa-icon size="1.0em" class="${this.canGoBack ? '' : 'grey-disabled'}" aria-hidden="true" .svg="${fasLeft}"></fa-icon>
          </span>
        </a>
        <a href="#" role="button" class="button is-borderless" @click="${this.onGoForward}" @keyup="${clickOnSpacebarPress}"
                title="Forward" aria-label="Forward">
          <span class="icon is-small">
            <fa-icon size="1.0em" class="${this.canGoForward ? '' : 'grey-disabled'}" aria-hidden="true" .svg="${fasRight}"></fa-icon>
          </span>
        </a>
        <a href="#" role="button" id="refresh" class="button is-borderless ${this.isLoading ? 'is-loading' : ''}" @click="${this.onRefresh}" @keyup="${clickOnSpacebarPress}"
                title="Reload" aria-label="Reload">
          <span class="icon is-small">
            ${!this.isLoading ? html`
            <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${fasRefresh}"></fa-icon>
            ` : ``}
          </span>
        </a>
        <form @submit="${this.onSubmit}">
          <div class="control is-expanded ${this.favIconUrl ? 'has-icons-left' : 'has-icons-left'}">
            <input id="url" class="input" type="url" @keydown="${this.onKeyDown}" @blur="${this.onLostFocus}" .value="${this.url}" placeholder="Enter text to search or a URL to replay"/>
            ${this.favIconUrl ? html`
            <span class="favicon icon is-small is-left">
              <img src="${this.favIconUrl}" @error="${this.tryNextIcon}"/>
            </span>` : html``}
          </div>
        </form>
        <a id="wr-button" role="button" class="button is-borderless" @click="${this.onTogglePopup}">
          <span class="icon is-small">
            <fa-icon id="wrlogo" size="1.8em" .svg="${wrLogo}" aria-hidden="true"></fa-icon>
            ${this.recording ? html`
              ${!this.numPending ? html`
              <span class="overlay overlay-idle"></span>` : html`
              <span class="overlay overlay-waiting">${this.numPending}</span>
              `}` : ``}
          </span>
        </a>
      </div>
    </nav>
    ${this.renderWebView()}
    ${this.renderPopup()}
    `;
  }

  renderWebView() {
    return html`
    <webview
    partition="persist:wr"
    @did-start-loading="${(e) => this.isLoading = true}"
    @did-stop-loading="${(e) => this.isLoading = false}"
    @page-favicon-updated="${this.onFaviconUpdated}"
    @will-navigate="${this.onWillNavigate}"
    @did-navigate="${this.onDidNavigate}"
    @did-navigate-in-page="${this.onDidNavigateInPage}"
    src="about:blank">
    </webview>`;
  }

  renderPopup() {
    if (!this.showPopup) {
      return;
    }

    return html`
    <wr-app-popup .msg="${this.stats}" @send-msg="${this.onSendMsg}">
    </wr-app-popup>
    `;
  }

  onSendMsg(event) {
    const msg = event.detail;

    const webview = this.renderRoot.querySelector("webview");

    if (webview && window.archivewebpage.sendMsg) {
      window.archivewebpage.sendMsg(webview.getWebContentsId(), msg);
    }
  }

  onFaviconUpdated(event) {
    this.favIcons = event.favicons;
    this.tryNextIcon();
  }

  onWillNavigate(event) {
    this.url = event.url;

    this.canGoBack = event.currentTarget.canGoBack();
    this.canGoForward = event.currentTarget.canGoForward();
  }

  onDidNavigate(event) {
    this.url = event.url;

    this.canGoBack = event.currentTarget.canGoBack();
    this.canGoForward = event.currentTarget.canGoForward();
    this.isLoading = false;
  }

  onDidNavigateInPage(event) {
    this.canGoBack = event.currentTarget.canGoBack();
    this.canGoForward = event.currentTarget.canGoForward();
  }

  onTogglePopup() {
    //ipcRenderer.send("popup-toggle-" + this.wcId);
    this.showPopup = !this.showPopup;
  }

  async tryNextIcon() {
    this.favIconUrl = (this.favIcons && this.favIcons.length) ? this.favIcons.shift() : null;
  }

  onGoBack() {
    const webview = this.renderRoot.querySelector("webview");
    if (webview && this.canGoBack) {
      webview.goBack();
    }
  }

  onGoForward() {
    const webview = this.renderRoot.querySelector("webview");
    if (webview && this.canGoForward) {
      webview.goForward();
    }
  }

  onRefresh() {
    const webview = this.renderRoot.querySelector("webview");
    if (webview) {
      webview.reload();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const input = this.renderRoot.querySelector("input");
    const webview = this.renderRoot.querySelector("webview");

    if (webview && input.value) {
      webview.loadURL(input.value);
    } else {
      input.value = this.url;
    }
  }

  onKeyDown(event) {
    if (event.key === "Esc" || event.key === "Escape") {
      event.preventDefault();
      event.currentTarget.value = this.url;
    }
  }

  onLostFocus(event) {
    if (!event.currentTarget.value) {
      event.currentTarget.value = this.url;
    }
  }
}

customElements.define("wr-rec-ui", RecWindowUI);

export { RecWindowUI };
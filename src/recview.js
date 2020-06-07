import { LitElement, html, css } from 'lit-element';
import { wrapCss } from 'replaywebpage/src/misc';

import fasRefresh from '@fortawesome/fontawesome-free/svgs/solid/redo-alt.svg';
import fasFullscreen from '@fortawesome/fontawesome-free/svgs/solid/desktop.svg';
import fasUnfullscreen from '@fortawesome/fontawesome-free/svgs/solid/compress-arrows-alt.svg';

import fasLeft from '@fortawesome/fontawesome-free/svgs/solid/arrow-left.svg';
import fasRight from '@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg';


// ===========================================================================
class RecView extends LitElement
{
  constructor() {
    super();
    this.isLoading = false;
    this.url = "";
    this.displayUrl = "";
    this.title = "";

    this.showAuth = false;
    this.reauthWait = null;
  }

  static get properties() {
    return {
      // external url set by parent
      url: { type: String },

      // actual replay url
      displayUrl: { type: String },
      title: { type: String },

      favIconUrl: { type: String },

      isLoading: { type: Boolean },

      isFullscreen: { type: Boolean },

      canGoBack: { type: Boolean },
      canGoForward: { type: Boolean }
    }
  }

  firstUpdated() {
    this.addEventListener("fullscreenchange", (event) => {
      this.isFullscreen = !!document.fullscreenElement;
    });

    this.displayUrl = this.url;
  }

  onFullscreenToggle() {
    if (!this.isFullscreen) {
      this.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const value = this.renderRoot.querySelector("input").value;
    this.url = value;
    this.favIconUrl = null;
    return false;
  }

  onRefresh(event, forceReload) {
    if (event) {
      event.preventDefault();
    }
    
    if (this.isLoading && !forceReload) {
      return;
    }

    const webview = this.renderRoot.querySelector("webview");

    if (webview) {
      webview.reload();
    }
  }

  static get styles() {
    return wrapCss(css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      webview {
        width: 100vw;
        height: 100%;
        border: 0px;
      }

      .record-bar {
        padding: 1em;
        max-width: none;
        border-bottom: solid .1rem #97989A;
        width: 100%;
        background-color: white;
      }

      .record-bar button:focus {
        border: none;
      }

      input#url {
        border-radius: 4px;
      }

      #datetime {
        position: absolute;
        right: 1em;
        z-index: 10;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0), #FFF 15%, #FFF);
        margin: 5px 0.75em 5px 0;
        line-height: 2;
      }

      .is-borderless {
        border: 0px;
      }

      form {
        width: 100%;
      }

      .favicon img {
        width: 16px;
        height: 16px;
      }

    `);
  }

  render() {
    return html`
    <div class="record-bar">
        <div class="field has-addons">
          <button id="fullscreen" class="is-hidden button is-borderless" @click="${this.onFullscreenToggle}">
            <span class="icon is-small">
              <fa-icon size="1.0em" class="has-text-grey" .svg="${this.isFullscreen ? fasUnfullscreen : fasFullscreen}"></fa-icon>
            </span>
          </button>
          <button class="button is-borderless" @click="${this.onGoBack}" ?disabled="${!this.canGoBack}">
            <span class="icon is-small">
              <fa-icon size="1.0em" class="has-text-grey" .svg="${fasLeft}"></fa-icon>
            </span>
          </button>
          <button class="button is-borderless" @click="${this.onGoForward}" ?disabled="${!this.canGoForward}">
            <span class="icon is-small">
              <fa-icon size="1.0em" class="has-text-grey" .svg="${fasRight}"></fa-icon>
            </span>
          </button>
          <button class="button is-borderless ${this.isLoading ? 'is-loading' : ''}" @click="${this.onRefresh}">
            <span class="icon is-small">
              ${!this.isLoading ? html`
              <fa-icon size="1.0em" class="has-text-grey" .svg="${fasRefresh}"></fa-icon>
              ` : ``}
            </span>
          </button>
          <form @submit="${this.onSubmit}">
            <p class="control is-expanded has-icons-left">
              <input id="url" class="input" type="text" .value="${this.displayUrl}" placeholder="https://... Enter a URL to replay from the archive here">
              <span class="favicon icon is-small is-left">
                ${this.favIconUrl ? html`<img src="${this.favIconUrl}"/>` : ``}
              </span>
            </p>
          </form>
          <p id="datetime" class="control is-hidden-mobile"></p>
        </div>
    </div>

    <webview partition="persist:wr" src="${this.url}" allow="autoplay 'self'; fullscreen"
    @did-start-loading="${(e) => this.isLoading = true}"
    @did-stop-loading="${(e) => this.isLoading = false}"
    @will-navigate="${this.onNavigate}"
    @did-navigate="${this.onNavigate}"
    @page-favicon-updated="${this.onFavIcons}">

    </webview>
    `;
  }

  onNavigate(event) {
    this.displayUrl = event.url;
    this.favIconUrl = null;

    const webview = this.renderRoot.querySelector("webview");
    this.canGoBack = webview.canGoBack();
    this.canGoForward = webview.canGoForward();
  }

  onGoBack() {
    const webview = this.renderRoot.querySelector("webview");
    webview.goBack();
  }

  onGoForward() {
    const webview = this.renderRoot.querySelector("webview");
    webview.goForward();
  }

  onFavIcons(event) {
    if (event.favicons && event.favicons.length) {
      this.favIconUrl = event.favicons[0];
    }
  }
}

customElements.define("wr-rec-view", RecView);

export { RecView };
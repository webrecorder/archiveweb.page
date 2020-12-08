import { LitElement, html, css, wrapCss, rwpLogo, clickOnSpacebarPress } from 'replaywebpage/src/misc';

import fasRefresh from '@fortawesome/fontawesome-free/svgs/solid/redo-alt.svg';
import fasFullscreen from '@fortawesome/fontawesome-free/svgs/solid/desktop.svg';
import fasUnfullscreen from '@fortawesome/fontawesome-free/svgs/solid/compress-arrows-alt.svg';

import fasLeft from '@fortawesome/fontawesome-free/svgs/solid/arrow-left.svg';
import fasRight from '@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg';
import fasMenuV from '@fortawesome/fontawesome-free/svgs/solid/ellipsis-v.svg';

import wrLogo from '../../assets/wr-logo.svg';

//import { ipcRenderer } from 'electron';
import { webContents } from '@electron/remote';


class LocationBar extends LitElement
{
  constructor() {
    super();
    this.url = "";
    this.isLoading = false;
    this.favIconUrl = null;
    this.favIcons = null;

    this.canGoBack = false;
    this.canGoForward = false;

    this.wcId = window.location.hash && Number(window.location.hash.slice(1));

    if (isNaN(this.wcId)) {
      console.warn("No webContents Id!");
      this.wc = null;
    } else {
      this.wc = webContents.fromId(this.wcId);
    }

    if (!this.wc) {
      console.warn("No WebContents");
    } else {
      this.initWC();
    }
  }

  initWC() {
    this.url = this.wc.getURL();

    this.wc.on("did-start-loading", () => this.isLoading = true);
    this.wc.on("did-stop-loading", () => this.isLoading = false);

    this.wc.on('page-favicon-updated', (event, favIcons) => {
      this.favIcons = favIcons;
      this.favIconUrl = (this.favIcons && this.favIcons.length) ? this.favIcons.shift() : null;
    });

    this.wc.on('will-navigate', (event, url) => {
      this.url = url;

      this.canGoBack = this.wc.canGoBack();
      this.canGoForward = this.wc.canGoForward();
    });

    this.wc.on('did-navigate', (event, url) => {
      this.url = url;

      this.canGoBack = this.wc.canGoBack();
      this.canGoForward = this.wc.canGoForward();
      this.isLoading = false;
    });

    this.wc.on('did-navigate-in-page', () => {
      this.canGoBack = this.wc.canGoBack();
      this.canGoForward = this.wc.canGoForward();
    });
  }

  static get properties() {
    return {
      isLoading: { type: Boolean },
      favIconUrl: { type: String },
      url: { type: String },

      canGoBack: { type: Boolean },
      canGoForward: { type: Boolean }
    }
  }

  static get styles() {
    return wrapCss(css`
      :host {
        width: 100%;
        height: 100%;
      }

      .location-bar {
        margin: 4px 4px 4px 0px;
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
          <div class="control is-expanded ${this.favIconUrl ? 'has-icons-left' : ''}">
            <input id="url" class="input" type="url" @keydown="${this.onKeyDown}" @blur="${this.onLostFocus}" .value="${this.url}" placeholder="Enter text to search or a URL to replay"/>
            ${this.favIconUrl ? html`
            <span class="favicon icon is-small is-left">
              <img src="${this.favIconUrl}" @error="${this.tryNextIcon}"/>
            </span>` : html``}
          </div>
        </form>
        <a id="wr-button" role="button" class="button is-borderless">
          <span class="icon is-small">
            ${!this.isLoading ? html`
            <fa-icon id="wrlogo" size="1.8em" .svg="${wrLogo}" aria-hidden="true"></fa-icon>` : html`
            <wr-anim-logo id="wrlogo" size="1.8em" .svg="${wrLogo}" aria-hidden="true"></wr-anim-logo>`
            }
          </span>
        </a>
      </div>
    </nav>`;
  }

  tryNextIcon() {
    this.favIconUrl = (this.favIcons && this.favIcons.length) ? this.favIcons.shift() : null;
  }

  onGoBack() {
    if (this.wc && this.canGoBack) {
      this.wc.goBack();
    }
  }

  onGoForward() {
    if (this.wc && this.canGoForward) {
      this.wc.goForward();
    }
  }

  onRefresh() {
    if (this.wc) {
      this.wc.reload();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const input = this.renderRoot.querySelector("input");

    if (input.value) {
      this.wc.loadURL(input.value);
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

customElements.define("wr-rec-location", LocationBar);

export { LocationBar };
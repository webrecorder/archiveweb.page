import {
  html,
  css,
  wrapCss,
  clickOnSpacebarPress,
  apiPrefix,
} from "replaywebpage";

import fasFullscreen from "@fortawesome/fontawesome-free/svgs/solid/desktop.svg";
import fasUnfullscreen from "@fortawesome/fontawesome-free/svgs/solid/compress-arrows-alt.svg";

import { type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";

import prettyBytes from "pretty-bytes";

import { Item } from "replaywebpage";

import wrRec from "../assets/icons/recLogo.svg";

//============================================================================
class WrRecColl extends Item {
  @property({ type: String })
  sourceUrl: string | null = null;

  @property({ type: Object })
  shareOpts: Record<string, string> = {};

  @property({ type: Boolean })
  showFinish = true;

  @state()
  totalSize = 0;

  _sizeUpdater: Promise<void> | null = null;

  static get styles() {
    return wrapCss(WrRecColl.compStyles);
  }

  static get compStyles() {
    return css`
      .rec-button {
        display: flex;
        flex-direction: row;
        margin: 0 1px;
        align-items: center;
        padding: 0 0.5em;
        min-width: max-content;
        margin-left: 1em;
        height: 40px;
      }

      .button.is-primary-new {
        background-color: #4d7c0f;
        border-color: rgba(0, 0, 0, 0);
        color: rgb(255, 255, 255);
        border-radius: 6px;
      }

      .button.is-primary-new:hover {
        background-color: #3a5f09;
      }

      .size-label {
        margin-left: 0.5em;
        font-weight: bold;
      }

      .dot {
        height: 8px;
        width: 8px;
        background-color: #16a34a;
        border-radius: 50%;
        display: inline-block;
      }

      @media screen and (max-width: 480px) {
        div.has-addons {
          flex-wrap: wrap;
        }

        div.has-addons form {
          flex: 1;
          margin-bottom: 8px;
        }

        .rec-controls {
          width: 100%;
          justify-content: space-between !important;
        }
      }

      ${Item.compStyles}
    `;
  }

  updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    if (
      changedProperties.has("embed") ||
      ((changedProperties.has("item") || changedProperties.has("loadInfo")) &&
        this.loadInfo &&
        this.embed &&
        this.item &&
        !this._sizeUpdater)
    ) {
      this._sizeUpdater = this.runSizeUpdater();
    }

    if (changedProperties.has("favIconUrl") && this.favIconUrl) {
      navigator.serviceWorker.controller?.postMessage({
        msg_type: "update-favicon",
        id: this.item,
        url: this.tabData.url,
        favIconUrl: this.favIconUrl.split("mp_/")[1],
      });
    }
  }

  async runSizeUpdater() {
    try {
      while (this.embed) {
        if (this.item) {
          const resp = await fetch(`${apiPrefix}/c/${this.item}`);
          const json = await resp.json();
          this.totalSize = json.size || 0;
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    } finally {
      this._sizeUpdater = null;
    }
  }

  protected renderToolbarLeft(isDropdown = false) {
    const leftBar = super.renderToolbarLeft();

    if (this.embed) {
      return leftBar;
    }

    return html`${leftBar}<a
        href="#"
        role="button"
        class="${!isDropdown
          ? "button narrow is-borderless"
          : "dropdown-item is-hidden-tablet"}"
        title="Start Archiving"
        aria-label="Start Archiving"
        aria-controls="record"
        @click="${this.onShowStart}"
        @keyup="${clickOnSpacebarPress}"
      >
        <span class="icon is-small">
          <fa-icon size="1.2em" aria-hidden="true" .svg="${wrRec}"></fa-icon>
        </span>
      </a>`;
  }

  protected renderToolbarRight() {
    const rightBar = super.renderToolbarRight();

    if (!this.embed) {
      return rightBar;
    }

    return html`
      <div class="is-flex is-flex-direction-row rec-controls">
        <a
          href="#"
          role="button"
          class="button is-borderless"
          style="margin-top: 2px"
          id="fullscreen"
          @click="${this.onFullscreenToggle}"
          @keyup="${clickOnSpacebarPress}"
          title="${this.isFullscreen ? "Exit Full Screen" : "Full Screen"}"
          aria-label="${this.isFullscreen ? "Exit Fullscreen" : "Fullscreen"}"
        >
          <span class="icon is-small">
            <fa-icon
              size="1.0em"
              class="has-text-grey"
              aria-hidden="true"
              .svg="${this.isFullscreen ? fasUnfullscreen : fasFullscreen}"
            ></fa-icon>
          </span>
        </a>
        <span class="rec-button" title="Archiving">
          <span class="dot"></span>
          <span class="size-label">${prettyBytes(this.totalSize)}</span>
        </span>
        ${this.showFinish
          ? html` <button
              class="button is-primary-new"
              @click="${this.onEmbedFinish}"
              type="button"
            >
              Finish
            </button>`
          : html`
              <a
                class="button is-primary-new"
                role="button"
                download="my-archive.wacz"
                href="${this.downloadUrl}"
                target="_blank"
                >Download</a
              >
            `}
      </div>
    `;
  }

  renderCollInfo() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemInfo = this.itemInfo as any;
    return html` <div class="info-bg">
      <wr-rec-coll-info
        class="is-list"
        .item="${itemInfo}"
        .shareOpts=${this.shareOpts}
        ?detailed="${true}"
      ></wr-rec-coll-info>
    </div>`;
  }

  onShowStart() {
    if (this.embed) {
      return;
    }

    const coll = this.item;
    const title = this.itemInfo?.title || "";
    const url = this.tabData.url;
    this.dispatchEvent(
      new CustomEvent("show-start", { detail: { coll, title, url } }),
    );
  }

  onEmbedFinish() {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        msg_type: "toggle-record",
        id: this.item,
        isRecording: false,
      });
    }
    if (window.parent !== window) {
      window.parent.postMessage({
        type: "awp-finish",
        downloadUrl: this.downloadUrl,
      });
    }
  }

  onHashChange() {
    super.onHashChange();

    if (!this.embed) {
      return;
    }

    const url = this.tabData.url || "";
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      this.tabData.url = "https://" + url;
    }
  }

  navigateTo(value: string) {
    if (
      this.embed &&
      !value.startsWith("https://") &&
      !value.startsWith("http://")
    ) {
      value = "https://" + value;
    }
    super.navigateTo(value);
  }

  get downloadUrl() {
    return new URL(
      `${apiPrefix}/c/${this.item}/dl?format=wacz&pages=all`,
      window.location.href,
    ).href;
  }
}

customElements.define("wr-rec-coll", WrRecColl);

export { WrRecColl };

import { html, css, wrapCss, clickOnSpacebarPress, apiPrefix } from "replaywebpage/src/misc";

import fasDownload from "@fortawesome/fontawesome-free/svgs/solid/download.svg";

import prettyBytes from "pretty-bytes";

import { Coll } from "replaywebpage";
import wrRec from "../../assets/recLogo.svg";


//============================================================================
class WrRecColl extends Coll
{
  constructor() {
    super();
    this._sizeUpdater = null;
    this.totalSize = 0;
  }

  static get properties() {
    return {
      ...Coll.properties,

      totalSize: { type: Number },
      shareOpts: { type: Object },
    };
  }

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
      border: 1px darkgrey solid;
      border-radius: 16px;
      padding: 0 0.5em;
      min-width: max-content;
    }

    .size-label {
      margin-left: 0.5em;
      font-weight: bold;
    }

    ${Coll.compStyles}
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has("embed")) {
      if (this.embed && !this._sizeUpdater) {
        this._sizeUpdater = this.runSizeUpdater();
      }
    }

    super.updated(changedProperties);
  }

  async runSizeUpdater() {
    try {
      while (this.embed) {
        if (this.coll) {
          const resp = await fetch(`${apiPrefix}/c/${this.coll}`);
          const json = await resp.json();
          this.totalSize = json.size || 0;
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } finally {
      this._sizeUpdater = null;
    }
  }

  renderExtraToolbar(isDropdown = false) {
    if (this.embed) {
      if (!isDropdown) {
        return html`
        <span class="rec-button" title="Recording">
          <span class="icon is-small" title="Recording">
            <fa-icon size="1.2em" aria-hidden="true" .svg="${wrRec}"></fa-icon>
          </span>
          <span class="size-label">${prettyBytes(this.totalSize)}</span>
        </span>
        `;
      } else {
        return html`
        <a href="${apiPrefix}/c/${this.coll}/dl?format=wacz&pages=all" role="button" class="dropdown-item" @keyup="${clickOnSpacebarPress}">
          <span class="icon is-small">
            <fa-icon size="1.0em" class="has-text-grey" aria-hidden="true" .svg="${fasDownload}"></fa-icon>
          </span>
          <span>Download Archive</span>
        </a>
        <hr class="dropdown-divider">
        `;
      }
    }

    if (isDropdown) {
      return "";
    }

    return html`
    <a href="#" role="button"
    class="${!isDropdown ? "button narrow is-borderless" : "dropdown-item is-hidden-tablet"}"
      title="Start Recording" aria-label="Start Recording" aria-controls="record"
      @click="${this.onShowStart}" @keyup="${clickOnSpacebarPress}">
      <span class="icon is-small">
        <fa-icon size="1.2em" aria-hidden="true" .svg="${wrRec}"></fa-icon>
      </span>
    </a>`;
  }

  renderCollInfo() {
    return html`
    <div class="info-bg">
      <wr-rec-coll-info
      class="is-list"
      .coll="${this.collInfo}"
      .shareOpts=${this.shareOpts}
      ?detailed="${true}"
      ></wr-rec-coll-info>
    </div>`;
  }

  onShowStart() {
    if (this.embed) {
      return;
    }

    const coll = this.coll;
    const title = this.collInfo.title;
    const url = this.tabData.url;
    this.dispatchEvent(new CustomEvent("show-start", {detail: {coll, title, url}}));
  }
}

customElements.define("wr-rec-coll", WrRecColl);

export { WrRecColl };
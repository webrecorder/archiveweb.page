import {
  html,
  css,
  wrapCss,
  clickOnSpacebarPress,
  apiPrefix,
} from "replaywebpage/misc";

import fasDownload from "@fortawesome/fontawesome-free/svgs/solid/download.svg";

import prettyBytes from "pretty-bytes";

import { Item } from "replaywebpage";
import wrRec from "../assets/icons/recLogo.svg"

//============================================================================
class WrRecColl extends Item {
  constructor() {
    super();
    // @ts-expect-error - TS2551 - Property '_sizeUpdater' does not exist on type 'WrRecColl'. Did you mean 'runSizeUpdater'?
    this._sizeUpdater = null;
    // @ts-expect-error - TS2339 - Property 'totalSize' does not exist on type 'WrRecColl'.
    this.totalSize = 0;
  }

  static get properties() {
    return {
      ...Item.properties,

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

      ${Item.compStyles}
    `;
  }

  // @ts-expect-error - TS7006 - Parameter 'changedProperties' implicitly has an 'any' type.
  updated(changedProperties) {
    if (changedProperties.has("embed")) {
      // @ts-expect-error - TS2339 - Property 'embed' does not exist on type 'WrRecColl'. | TS2551 - Property '_sizeUpdater' does not exist on type 'WrRecColl'. Did you mean 'runSizeUpdater'?
      if (this.embed && !this._sizeUpdater) {
        // @ts-expect-error - TS2551 - Property '_sizeUpdater' does not exist on type 'WrRecColl'. Did you mean 'runSizeUpdater'?
        this._sizeUpdater = this.runSizeUpdater();
      }
    }

    super.updated(changedProperties);
  }

  async runSizeUpdater() {
    try {
      while (this.embed) {
        // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'WrRecColl'.
        if (this.coll) {
          // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'WrRecColl'.
          const resp = await fetch(`${apiPrefix}/c/${this.coll}`);
          const json = await resp.json();
          // @ts-expect-error - TS2339 - Property 'totalSize' does not exist on type 'WrRecColl'.
          this.totalSize = json.size || 0;
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    } finally {
      // @ts-expect-error - TS2551 - Property '_sizeUpdater' does not exist on type 'WrRecColl'. Did you mean 'runSizeUpdater'?
      this._sizeUpdater = null;
    }
  }

  renderExtraToolbar(isDropdown = false) {
    if (this.embed) {
      if (!isDropdown) {
        return html`
          <span class="rec-button" title="Archiving">
            <span class="icon is-small" title="Archiving">
              <fa-icon
                size="1.2em"
                aria-hidden="true"
                .svg="${wrRec}"
              ></fa-icon>
            </span>
            <span class="size-label"
              >${
                // @ts-expect-error - TS2339 - Property 'totalSize' does not exist on type 'WrRecColl'.
                prettyBytes(this.totalSize)
              }</span
            >
          </span>
        `;
      } else {
        return html`
          <a
            href="${apiPrefix}/c/${
              // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'WrRecColl'.
              this.coll
            }/dl?format=wacz&amp;pages=all"
            role="button"
            class="dropdown-item"
            @keyup="${clickOnSpacebarPress}"
          >
            <span class="icon is-small">
              <fa-icon
                size="1.0em"
                class="has-text-grey"
                aria-hidden="true"
                .svg="${fasDownload}"
              ></fa-icon>
            </span>
            <span>Download Archive</span>
          </a>
          <hr class="dropdown-divider" />
        `;
      }
    }

    if (isDropdown) {
      return "";
    }

    return html` <a
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

  renderCollInfo() {
    // @ts-expect-error - TS2339 - Property 'collInfo' does not exist on type 'WrRecColl'.
    console.log(this.collInfo);
    return html` <div class="info-bg">
      <wr-rec-coll-info
        class="is-list"
        .item="${
          // @ts-expect-error - TS2339 - Property 'collInfo' does not exist on type 'WrRecColl'.
          this.collInfo
        }"
        .shareOpts=${
          // @ts-expect-error - TS2339 - Property 'shareOpts' does not exist on type 'WrRecColl'.
          this.shareOpts
        }
        ?detailed="${true}"
      ></wr-rec-coll-info>
    </div>`;
  }

  onShowStart() {
    if (this.embed) {
      return;
    }

    // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'WrRecColl'.
    const coll = this.coll;
    // @ts-expect-error - TS2339 - Property 'collInfo' does not exist on type 'WrRecColl'.
    const title = this.collInfo.title;
    const url = this.tabData.url;
    this.dispatchEvent(
      new CustomEvent("show-start", { detail: { coll, title, url } })
    );
  }
}

customElements.define("wr-rec-coll", WrRecColl);

export { WrRecColl };

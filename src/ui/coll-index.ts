import { CollIndex } from "replaywebpage";

import { html } from "replaywebpage/src/misc";

import prettyBytes from "pretty-bytes";

//============================================================================
class WrRecCollIndex extends CollIndex {
  constructor() {
    super();
    // @ts-expect-error - TS2339 - Property 'deleteConfirm' does not exist on type 'WrRecCollIndex'.
    this.deleteConfirm = null;
    // @ts-expect-error - TS2339 - Property 'ipfsSharePending' does not exist on type 'WrRecCollIndex'.
    this.ipfsSharePending = 0;
  }

  get sortKeys() {
    return [
      { key: "title", name: "Title" },

      // @ts-expect-error - TS2339 - Property 'dateName' does not exist on type 'WrRecCollIndex'.
      { key: "ctime", name: this.dateName },

      { key: "mtime", name: "Date Modified" },

      { key: "size", name: "Total Size" },

      { key: "loadUrl", name: "Source" },
    ];
  }

  firstUpdated() {
    // @ts-expect-error - TS2339 - Property 'loadColls' does not exist on type 'WrRecCollIndex'.
    this.loadColls();

    // @ts-expect-error - TS2339 - Property '_poll' does not exist on type 'WrRecCollIndex'.
    this._poll = setInterval(() => {
      // @ts-expect-error - TS2339 - Property 'ipfsSharePending' does not exist on type 'WrRecCollIndex'.
      if (!this.ipfsSharePending) {
        // @ts-expect-error - TS2339 - Property 'loadColls' does not exist on type 'WrRecCollIndex'.
        this.loadColls();
      }
    }, 10000);
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (
      changedProperties.has("sortedColls") &&
      // @ts-expect-error - TS2339 - Property 'sortedColls' does not exist on type 'WrRecCollIndex'.
      this.sortedColls &&
      // @ts-expect-error - TS2339 - Property 'sortedColls' does not exist on type 'WrRecCollIndex'.
      this.sortedColls.length
    ) {
      // @ts-expect-error - TS2339 - Property 'dispatchEvent' does not exist on type 'WrRecCollIndex'.
      this.dispatchEvent(
        new CustomEvent("colls-updated", {
          // @ts-expect-error - TS2339 - Property 'sortedColls' does not exist on type 'WrRecCollIndex'.
          detail: { colls: this.sortedColls },
        })
      );
    }
  }

  static get properties() {
    return {
      ...CollIndex.properties,

      deleteConfirm: { type: Object },
      shareOpts: { type: Object },
    };
  }

  renderCollInfo(coll) {
    return html` <wr-rec-coll-info
      style="overflow: visible"
      data-coll="${coll.id}"
      .coll=${coll}
      .shareOpts=${
        // @ts-expect-error - TS2339 - Property 'shareOpts' does not exist on type 'WrRecCollIndex'.
        this.shareOpts
      }
      @ipfs-share="${this.onIpfsShare}"
    >
    </wr-rec-coll-info>`;
  }

  render() {
    return html` ${super.render()} ${this.renderDeleteConfirm()} `;
  }

  renderDeleteConfirm() {
    // @ts-expect-error - TS2339 - Property 'deleteConfirm' does not exist on type 'WrRecCollIndex'.
    if (!this.deleteConfirm) {
      return null;
    }

    return html` <wr-modal
      bgClass="has-background-grey-lighter"
      @modal-closed="${
        // @ts-expect-error - TS2339 - Property 'deleteConfirm' does not exist on type 'WrRecCollIndex'.
        () => (this.deleteConfirm = null)
      }"
      title="Confirm Delete"
    >
      <p>
        Are you sure you want to permanentely delete the archive
        <b
          >${
            // @ts-expect-error - TS2339 - Property 'deleteConfirm' does not exist on type 'WrRecCollIndex'.
            this.deleteConfirm.title
          }</b
        >
        (Size:
        <b
          >${
            // @ts-expect-error - TS2339 - Property 'deleteConfirm' does not exist on type 'WrRecCollIndex'.
            prettyBytes(this.deleteConfirm.size)
          }</b
        >)
      </p>
      <button @click="${this.doDelete}" class="button is-danger">Delete</button>
      <button
        @click="${
          // @ts-expect-error - TS2339 - Property 'deleteConfirm' does not exist on type 'WrRecCollIndex'.
          () => (this.deleteConfirm = null)
        }"
        class="button"
      >
        Cancel
      </button>
    </wr-modal>`;
  }

  onIpfsShare(event) {
    if (event.detail.pending) {
      // @ts-expect-error - TS2339 - Property 'ipfsSharePending' does not exist on type 'WrRecCollIndex'.
      this.ipfsSharePending++;
    } else {
      // @ts-expect-error - TS2339 - Property 'ipfsSharePending' does not exist on type 'WrRecCollIndex'.
      this.ipfsSharePending--;
    }
  }

  onDeleteColl(event) {
    event.preventDefault();
    event.stopPropagation();

    // @ts-expect-error - TS2339 - Property 'sortedColls' does not exist on type 'WrRecCollIndex'.
    if (!this.sortedColls) {
      return;
    }

    const index = Number(event.currentTarget.getAttribute("data-coll-index"));

    // @ts-expect-error - TS2339 - Property 'deleteConfirm' does not exist on type 'WrRecCollIndex'. | TS2339 - Property 'sortedColls' does not exist on type 'WrRecCollIndex'.
    this.deleteConfirm = this.sortedColls[index];
  }

  async doDelete() {
    // @ts-expect-error - TS2339 - Property 'deleteConfirm' does not exist on type 'WrRecCollIndex'.
    if (!this.deleteConfirm) {
      return;
    }

    // @ts-expect-error - TS2339 - Property '_deleting' does not exist on type 'WrRecCollIndex'. | TS2339 - Property 'deleteConfirm' does not exist on type 'WrRecCollIndex'.
    this._deleting[this.deleteConfirm.sourceUrl] = true;
    // @ts-expect-error - TS2339 - Property 'requestUpdate' does not exist on type 'WrRecCollIndex'.
    this.requestUpdate();

    // @ts-expect-error - TS2339 - Property 'renderRoot' does not exist on type 'WrRecCollIndex'.
    const info = this.renderRoot.querySelector(
      // @ts-expect-error - TS2339 - Property 'deleteConfirm' does not exist on type 'WrRecCollIndex'.
      `wr-rec-coll-info[data-coll="${this.deleteConfirm.id}"]`
    );

    if (info) {
      await info.doDelete();
    }

    // @ts-expect-error - TS2339 - Property 'deleteConfirm' does not exist on type 'WrRecCollIndex'.
    this.deleteConfirm = null;
  }

  renderEmpty() {
    return html`No archived items. Click "New Archiving Session" above to begin
    archiving pages!`;
  }
}

// @ts-expect-error - TS2345 - Argument of type 'typeof WrRecCollIndex' is not assignable to parameter of type 'CustomElementConstructor'.
customElements.define("wr-rec-coll-index", WrRecCollIndex);

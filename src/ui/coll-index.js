import { CollIndex } from "replaywebpage";

import { html } from "replaywebpage/src/misc";


import prettyBytes from "pretty-bytes";


//============================================================================
class WrRecCollIndex extends CollIndex
{
  constructor() {
    super();
    this.deleteConfirm = null;
    this.ipfsSharePending = 0;
  }

  get sortKeys() {
    return [
      {key: "title",
        name: "Title"},

      {key: "ctime",
        name: this.dateName},

      {key: "mtime",
        name: "Date Modified"},

      {key: "size",
        name: "Total Size"},

      {key: "loadUrl",
        name: "Source"},
    ];
  }

  firstUpdated() {
    this.loadColls();

    this._poll = setInterval(() => {
      if (!this.ipfsSharePending) {
        this.loadColls();
      }
    }, 10000);
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    
    if (changedProperties.has("sortedColls") && this.sortedColls && this.sortedColls.length) {
      this.dispatchEvent(new CustomEvent("colls-updated", {detail: {colls: this.sortedColls}}));
    }
  }

  static get properties() {
    return {
      ...CollIndex.properties,

      deleteConfirm: { type: Object }
    };
  }

  renderCollInfo(coll) {
    return html`
    <wr-rec-coll-info
      style="overflow: visible" data-coll="${coll.id}" .coll=${coll} @ipfs-share="${this.onIpfsShare}">
    </wr-rec-coll-info>`;
  }

  render() {
    return html`
    ${super.render()}
    ${this.renderDeleteConfirm()}
    `;
  }

  renderDeleteConfirm() {
    if (!this.deleteConfirm) {
      return null;
    }

    return html`
    <wr-modal bgClass="has-background-grey-lighter" @modal-closed="${() => this.deleteConfirm = null}" title="Confirm Delete">
      <p>Are you sure you want to permanentely delete the archive <b>${this.deleteConfirm.title}</b>
      (Size: <b>${prettyBytes(this.deleteConfirm.size)}</b>)</p>
      <button @click="${this.doDelete}"class="button is-danger">Delete</button>
      <button @click="${() => this.deleteConfirm = null}" class="button">Cancel</button>
    </wr-modal>`;
  }

  onIpfsShare(event) {
    if (event.detail.pending) {
      this.ipfsSharePending++;
    } else {
      this.ipfsSharePending--;
    }
  }

  onDeleteColl(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.sortedColls) {
      return;
    }

    const index = Number(event.currentTarget.getAttribute("data-coll-index"));

    this.deleteConfirm = this.sortedColls[index];
  }

  async doDelete() {
    if (!this.deleteConfirm) {
      return;
    }

    this._deleting[this.deleteConfirm.sourceUrl] = true;
    this.requestUpdate();

    const info = this.renderRoot.querySelector(`wr-rec-coll-info[data-coll="${this.deleteConfirm.id}"]`);

    if (info) {
      await info.doDelete();
    }

    this.deleteConfirm = null;
  }

  renderEmpty() {
    return html`No Archives. Click "Create New" above to create a new archive and start recording!`;
  }
}

customElements.define("wr-rec-coll-index", WrRecCollIndex);
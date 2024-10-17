import { ItemIndex, html } from "replaywebpage";
import { property } from "lit/decorators.js";

import prettyBytes from "pretty-bytes";
import { type WrRecCollInfo } from "./coll-info";
import { type WrRecItem } from "../types";

import type { PropertyValues } from "lit";

//============================================================================
export class WrRecCollIndex extends ItemIndex {
  @property({ type: Object })
  deleteConfirm: WrRecItem | null = null;
  ipfsSharePending = 0;

  private _poll?: number | NodeJS.Timer;

  sortedItems: WrRecItem[] = [];

  @property({ type: Object })
  shareOpts: unknown;

  get sortKeys() {
    return [
      { key: "title", name: "Title" },

      { key: "ctime", name: this.dateName },

      { key: "mtime", name: "Date Modified" },

      { key: "size", name: "Total Size" },

      { key: "loadUrl", name: "Source" },
    ];
  }

  firstUpdated() {
    this.loadItems();

    this._poll = setInterval(() => {
      if (!this.ipfsSharePending) {
        this.loadItems();
      }
    }, 10000);
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has("sortedItems") && this.sortedItems?.length) {
      this.dispatchEvent(
        new CustomEvent("colls-updated", {
          detail: { colls: this.sortedItems },
        }),
      );
    }
  }

  renderItemInfo(item: WrRecItem) {
    return html` <wr-rec-coll-info
      style="overflow: visible"
      data-coll="${item.id!}"
      .item=${item}
      .shareOpts=${this.shareOpts}
      @ipfs-share="${this.onIpfsShare}"
    >
    </wr-rec-coll-info>`;
  }

  render() {
    return html` ${super.render()} ${this.renderDeleteConfirm()} `;
  }

  renderDeleteConfirm() {
    if (!this.deleteConfirm) {
      return null;
    }

    return html` <wr-modal
      bgClass="has-background-grey-lighter"
      @modal-closed="${() => (this.deleteConfirm = null)}"
      title="Confirm Delete"
    >
      <p>
        Are you sure you want to permanentely delete the archive
        <b>${this.deleteConfirm.title}</b>
        (Size:
        <b>${prettyBytes(Number(this.deleteConfirm.size))}</b>)
      </p>
      <button @click="${this.doDelete}" class="button is-danger">Delete</button>
      <button @click="${() => (this.deleteConfirm = null)}" class="button">
        Cancel
      </button>
    </wr-modal>`;
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onIpfsShare(event) {
    if (event.detail.pending) {
      this.ipfsSharePending++;
    } else {
      this.ipfsSharePending--;
    }
  }

  // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
  onDeleteColl(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.sortedItems) {
      return;
    }

    const index = Number(event.currentTarget.getAttribute("data-coll-index"));

    this.deleteConfirm = this.sortedItems[index];
  }

  async doDelete() {
    if (!this.deleteConfirm) {
      return;
    }

    this._deleting[this.deleteConfirm.sourceUrl] = true;
    this.requestUpdate();

    const info = this.renderRoot.querySelector<WrRecCollInfo>(
      `wr-rec-coll-info[data-coll="${this.deleteConfirm.id}"]`,
    );

    if (info) {
      await info.doDelete();
    }

    this.deleteConfirm = null;
  }

  renderEmpty() {
    return html`No archived items. Click "New Archiving Session" above to begin
    archiving pages!`;
  }
}

customElements.define("wr-rec-coll-index", WrRecCollIndex);

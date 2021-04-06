import { CollIndex } from "replaywebpage";

import { html, css, wrapCss, apiPrefix } from "replaywebpage/src/misc";

import fasPlus from "@fortawesome/fontawesome-free/svgs/solid/plus.svg";
import fasUpload from "@fortawesome/fontawesome-free/svgs/solid/upload.svg";
import fasCog from "@fortawesome/fontawesome-free/svgs/solid/cog.svg";

import prettyBytes from "pretty-bytes";

//import fasBoxPlus from "@fortawesome/fontawesome-free/svgs/solid/plus-square.svg";
//import fasBoxMinus from "@fortawesome/fontawesome-free/svgs/solid/minus-square.svg";


//============================================================================
class WrRecCollIndex extends CollIndex
{
  constructor() {
    super();
    this.deleteConfirm = null;

    this.includeNew = false;
    this.includeImport = false;
    this.showNew = false;
    this.showImport = false;

    this.newFullImport = false;
    this.cred = "";
  }

  firstUpdated() {
    const params = new URLSearchParams();
    params.set("filter", this.typeFilter);
    if (this.cred) {
      params.set("cred", this.cred);
    }
    this.indexParams = params.toString();

    // if (this.cred) {
    //   this.loadStorageColls();
    // }

    this.loadColls();

    //this._poll = setInterval(() => this.loadColls(), 60000);
  }

  // async loadStorageColls() {
  //   await fetch(`${apiPrefix}/cred-list/${this.cred}`);
  // }

  static get properties() {
    return {
      ...CollIndex.properties,

      deleteConfirm: { type: Object },
      showCreatePanel: { type: Boolean },
      showNew: { type: Boolean },
      showImport: { type: Boolean },
      includeNew: { type: Boolean },
      includeImport: { type: Boolean },

      newFullImport: { type: Boolean },

      typeFilter: { type: String  },
      cred: { type: String }
    };
  }

  static get styles() {
    return wrapCss(WrRecCollIndex.compStyles);
  }

  static get compStyles() {
    return css`
    
    .panel-main {
      display: flex;
      align-items: center;
      background-color: var(--panel-color, rgb(210, 249, 214));
    }

    .create-new {
      width: 33%;
      min-width: 150px;
      margin: 0;
      margin-right: 1rem;
    }

    .toolbar {
      margin-left: 0.5em;
      padding: 8px;
      height: 25px;
    }

    .is-active {
      background-color: lightgray;
    }

    ${CollIndex.compStyles}
    `;
  }

  renderCollInfo(coll) {
    return html`
    <wr-rec-coll-info
      style="overflow: visible" data-coll="${coll.id}" .coll=${coll}>
    </wr-rec-coll-info>`;
  }


  renderHeader() {
    return html`
    <div class="panel-heading panel-main">
      <span>${this.headerName}</span>
      ${this.renderButtons()}
    </div>

    ${this.showNew || this.showImport ? html`
    <div class="panel-block is-small is-flex-wrap-wrap" style="background: whitesmoke">
      ${this.showNew ? html`
      <form @submit="${this.onNewColl}" class="create-new">
        ${this.cred ? html`
          <div class="field">
            <p class="control is-expanded">
              <input type="text" id="coll-id" name="coll-id" class="input is-small" required placeholder="Enter a unique id for this collection.">
            </p>
          </div>` : ""}
        <div class="field has-addons">
          <p class="control is-expanded">
            <input type="text" id="new-title" name="new-title" class="input is-small" required placeholder="Enter the title for the new archive">
          </p>
          <div class="control">
            <button type="submit" class="button is-hidden-mobile is-primary is-small">Create New</button>
          </div>
        </div>
      </form>` : ""}
      ${this.showImport ? html`
      <wr-chooser style="flex: auto" .newFullImport="${this.newFullImport}" noHead="${true}"></wr-chooser>` : ""}
    </div>` : ""}
    `;
  }

  renderButtons() {
    return html`
      ${this.includeNew ? html`
      <button @click="${() => { this.showNew = !this.showNew; this.showImport = false; } }" class="button toolbar is-small ${this.showNew ? "is-active" : ""}">
        <fa-icon .svg=${fasPlus}></fa-icon>
      </button>` : ""}

      ${this.includeImport ? html`
      <button @click="${() => { this.showImport = !this.showImport; this.showNew = false;} }" class="button toolbar is-small ${this.showImport ? "is-active" : ""}">
        <fa-icon .svg=${fasUpload}></fa-icon>
      </button>` : ""}

      ${this.cred ? html`
      <button @click="" class="button toolbar is-small">
        <fa-icon .svg=${fasCog}></fa-icon>
      </button>` : ""}
    `;
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

  async onNewColl(event) {
    event.preventDefault();
    if (this.cred) {
      // if (!await this.onTestCred()) {
      //   return false;
      // }
    }

    const data = {
      metadata: {title: this.renderRoot.querySelector("#new-title").value}
    };

    if (this.cred) {
      const sync = {};
      sync.cred = this.cred;
      sync.collId = this.renderRoot.querySelector("#coll-id").value;
      data.extraConfig = {sync};
    }

    const method = "POST";
    const body = JSON.stringify(data);
    const resp = await fetch(`${apiPrefix}/c/create`, {method, body});
    await resp.json();
    this.dispatchEvent(new CustomEvent("coll-created"));
    this.loadColls();
    return false;
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
    return html`
    <div>
      <span>No Archives.</span>
      ${this.includeNew ? html`
      <span>Click <fa-icon size="0.7em" .svg=${fasPlus}></fa-icon> to create a new archive.</span>
      ` : ""}
      ${this.includeImport ? html`
      <span>Click <fa-icon size="0.7em" .svg=${fasUpload}></fa-icon> button above to import an archive.</span>
      ` : ""}
    </div>
    `;
  }
}

customElements.define("wr-rec-coll-index", WrRecCollIndex);

export { WrRecCollIndex };

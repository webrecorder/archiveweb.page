import { LitElement, html, css, wrapCss, apiPrefix } from 'replaywebpage/src/misc';

import fasPlus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';


// ===========================================================================
class WrStorageCred extends LitElement
{
  constructor() {
    super();
    this.credentials = [];
    this.currCred = null;
    this.isNew = true;
    this.fullPath = "";
  }

  static get properties() {
    return {
      credentials: {type: Array},
      currCred: { type: Object },
      isNew: { type: Boolean },
      fullPath: { type: String },
    }
  }

  firstUpdated() {
    this.loadCred();
  }

  static get styles() {
    return wrapCss(css`
      :host {
        height: 100%;
        margin: 1rem;
      }

      .main {
        margin: 2rem;
        max-width: 1024px;
      }

      .columns {
        overflow-y: auto;
      }

      .cred-list {
        border: 1px solid gray;
        min-height: 300px;
      }

      .is-flex-auto {
        flex: auto;
      }

      .saved-heading {
        font-variant: all-small-caps;
        font-style: italic;
      }

      .editor {
        padding-top: 46px;
        max-width: 50%;
      }

      .intro-msg {
        margin: 0 2rem;
      }

      .status {
        font-size: 12px;
        margin-bottom: 0.75rem;
      }

      .full-path {
        font-size: 12px;
        font-family: monospace;
      }
    `);
  }

  render() {
    return html`
    <div class="container">
      <div class="intro-msg">
      <p>Configure remote storage buckets and credentials for synching your local archives with remote storage.</p>
      <p>S3 or any S3-compatible service is supported. Add, Update or Remove S3-compatible storage buckets and credentials below.</p>
      </div>
      <div class="main columns">
        <div class="column">
          <p class="saved-heading heading is-size-5">Saved Credentials</p>
          <aside class="menu cred-list">
            <ul class="menu-list">
              ${this.credentials && this.credentials.length ? this.credentials.map((cred) => html`
              <li>
              <a class="${this.currCred === cred ? 'is-active' : ''} is-flex" @click="${() => this.onEdit(cred)}">
              <span class="is-flex-auto">${cred.name}</span>
              <button class="delete" aria-label="delete" @click="${(e) => this.onDelete(cred)}">
              </button>
              </a>
              </li>
              `) : html`
              <li><i>No Stored Crednentials</i></li>
              `}
            </ul>
          </aside>
        </div>
        <div class="editor column">
          ${this.currCred ? this.renderEditor() : html`
          <button class="button is-primary" @click="${this.onAddNew}">Add New</button>
          `}
        </div>
      </div>
    </div>
    `;
  }

  renderEditor() {
    return html`
    <article class="message">
      <div class="message-header">
        <p>${this.isNew ? "Add New Credentials" : "Update Credentials"}</p>
      </div>
      <div class="message-body">
        <form @submit="${this.onSubmit}">
          <div class="field">
            <label class="label is-small">Name</label>
            <div class="control">
              <input id="name" name="name" class="input is-small" type="text"
              @change="${this.onEditName}" .value="${this.currCred.name || ""}"
              pattern="[\\w-]+" required placeholder="Name for this storage">
            </div>
          </div>
          <div class="field">
            <label class="label is-small">Storage Path (Bucket and Path)</label>
            <div class="control">
              <input id="name" name="name" class="input is-small" type="text"
              @change="${(e) => this.currCred = {...this.currCred, bucketAndPath: e.currentTarget.value, checkTs: 0}}" .value="${this.currCred.bucketAndPath || ""}"
              pattern="[\\w-/%]+" required placeholder="s3://bucket/path/to/webarchives/">
            </div>
          </div>
          <div class="field">
            <label class="label is-small">Endpoint API URL</label>
            <div class="control">
              <input id="endpoint" name="endpoint" class="input is-small" type="url"
              @change="${(e) => this.currCred = {...this.currCred, endpoint: e.currentTarget.value, checkTs: 0}}" .value="${this.currCred.endpoint || ""}"
              required placeholder="https://...">
            </div>
          </div>
          <div class="field">
            <label class="label is-small">Region</label>
            <div class="control">
              <input id="region" name="region" class="input is-small" type="text"
              @change="${(e) => this.currCred = {...this.currCred, region: e.currentTarget.value, checkTs: 0}}" .value="${this.currCred.region || ""}"
              placeholder="Region ID">
            </div>
          </div>
          <div class="field">
            <label class="label is-small">Access Key</label>
            <div class="control">
              <input id="accessKeyId" name="accessKeyId" class="input is-small" type="text"
              @change="${(e) => this.currCred = {...this.currCred, accessKeyId: e.currentTarget.value, checkTs: 0}}" .value="${this.currCred.accessKeyId || ""}"
              required placeholder="Storage Access Id">
            </div>
          </div>
          <div class="field">
            <label class="label is-small">Secret Access Key</label>
            <div class="control">
              <input id="secretAccessKey" name="secretAccessKey" class="input is-small" type="password"
              @change="${(e) => this.currCred = {...this.currCred, secretAccessKey: e.currentTarget.value, checkTs: 0}}" .value="${this.currCred.secretAccessKey || ""}"
              required placeholder="Storage Secret Key">
            </div>
          </div>
          <div class="field">
            <label class="label is-small">Full Root Storage Path</label>
            <span class="full-path">${this.fullPath}</span>
          </div>
          <div class="status">
            ${this.currCred.checkTs && this.currCred.valid ? html`
            <span class="status has-text-success">Bucket exists and credentials valided on ${new Date(this.currCred.checkTs).toLocaleString()}
            ` : this.currCred.checkTs && !this.currCred.valid ? html`
            <span class="status has-text-danger">Sorry, bucket not found or credentils not valid as of ${new Date(this.currCred.checkTs).toLocaleString()}
            ` : ``}
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button type="submit" class="button is-link is-small">${this.isNew ? "Add" : "Update"}</button>
            </div>
            <div class="control">
              <button @click="${() => this.currCred = null}" class="button is-small">Cancel</button>
            </div>
            <div class="control">
              <button class="button is-small" @click="${this.onTestCred}">Test Storage</button>
            </div>
          </div>
        </form>
      </div>
    </article>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has("currCred")) {
      if (!this.currCred) {
        this.fullPath = "";
      } else {
        let bucketAndPath = this.currCred.bucketAndPath;
        if (bucketAndPath.startsWith("s3://")) {
          bucketAndPath = bucketAndPath.slice(5);
        }
        if (!bucketAndPath.endsWith("/")) {
          bucketAndPath += "/";
        }
        this.fullPath = new URL(bucketAndPath, this.currCred.endpoint).href;
      }
    }
  }

  onEditName(event) {
    if (!this.isNew) {
      this.currCred = {...this.currCred};
      this.isNew = true;
    }
    this.currCred.name = event.currentTarget.value;
  }

  async loadCred() {
    const resp = await fetch(`${apiPrefix}/creds`);
    const res = await resp.json();
    if (res.creds) {
      this.credentials = res.creds;
    }
  }

  async saveCred() {
    this.currCred.fullPath = this.fullPath;

    const resp = await fetch(`${apiPrefix}/creds`, {
      method: "PUT",
      body: JSON.stringify(this.currCred)
    });
    const json = await resp.json();
    this.currCred = {...this.currCred, valid: json.valid, checkTs: json.checkTs};

    await this.loadCred();
    this.currCred = null;
  }

  async onTestCred() {
    const resp = await fetch(`${apiPrefix}/test-cred`, {
      method: "POST",
      body: JSON.stringify(this.currCred)
    });
    const json = await resp.json();
    this.currCred = {...this.currCred, valid: json.valid, checkTs: json.checkTs};
    return false;
  }

  onAddNew() {
    this.currCred = {};
    this.isNew = true;
  }

  onEdit(cred) {
    this.currCred = cred;
    this.isNew = false;
  }

  async onDelete(cred) {
    await fetch(`${apiPrefix}/cred/${cred.name}`, {
      method: "DELETE",
    });
    this.currCred = null;
    await this.loadCred();
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.currCred);
    this.saveCred();
    return false;
  }
}

// ===========================================================================
class WrNewColl extends LitElement
{
  constructor() {
    super();
    this.creds = [];
    this.cred = null;
    this.status = "";
    this.valid = false;
    this.collId = "";
    this.archiveUrl = "";
  }

  static get properties() {
    return {
      creds: { type: Array },
      cred: { type: String },
      status: { type: String },
      valid: { type: Boolean },
      collId: { type: String },
      archiveUrl: { type: String },
      title: { type: String },
      showSyncEditor: { type: Boolean }
    }
  }

  firstUpdated() {
    this.loadCred();
  }

  async loadCred() {
    const resp = await fetch(`${apiPrefix}/creds`);
    const res = await resp.json();
    if (res.creds) {
      this.creds = res.creds;
      this.cred = this.creds[0];
    }
  }

  static get styles() {
    return wrapCss(css`
      .less-padding {
        padding-top: 1.0em;
        padding-bottom: 1.0em;
      }

      .display-url {
        font-size: 12px;
        font-family: monospace;
        font-weight: normal;
      }

      .message-header {
        background-color: #ddddff;
        color: black;
      }

    `);
  }

  findCredByName(name) {
    for (const cred of this.creds) {
      if (cred.name === name) {
        return cred;
      }
    }

    return null;
  }

  updated(changedProperties) {
    if (changedProperties.has("cred") || changedProperties.has("collId")) {
      this.archiveUrl = this.cred ? new URL(this.collId, this.cred.fullPath).href : "";
    }

    if (changedProperties.has("title")) {
      this.collId = this.title.replace(/[^\w-]/g, "-").toLowerCase();
    }
  }

  render() {
    return html`
    <section class="section less-padding">
    <div class="columns">
      <div class="column is-5">
        <div class="message is-small">
          <div class="message-header">Create New Web Archive</div>
          <div class="message-body">
            <form id="newform" class="is-flex is-flex-direction-column" @submit="${this.onNewColl}">
              <div class="field">
                <div class="control is-expanded">
                  <input @change="${(e) => this.title = e.currentTarget.value}"class="input is-small" id="new-name" type="text" required placeholder="Enter the Title for this Archive">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input id="preview" type="checkbox" @change="${(e) => this.showSyncEditor = e.currentTarget.checked}" ?checked="${this.showSyncEditor}">
                    Create a Synched Archive
                  </label>
                </div>
              </div>
              ${this.showSyncEditor ? this.renderStorageSelect() : ''}
              <div class="field">
                <div class="control">
                  <button id="newsubmit" class="button is-primary is-small" type="submit">
                    <span class="icon">
                      <fa-icon .svg=${fasPlus}></fa-icon>
                    </span>
                    <span>Create New</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="column is-7">
        <wr-chooser .newFullImport="${true}" sizeClass="is-small" @load-start=${this.onStartLoad}></wr-chooser>
      </div>
    </div>
  </section>`;
  }

  renderStorageSelect() {
    return html`
    <div class="field">
      <label class="label is-small">Select Remote Storage<label>
      <div class="control">
        <div class="select is-small">
          <select @change="${(e) => this.cred = this.findCredByName(e.currentTarget.value)}" required>
            ${this.creds.map(cred => html`
              <option value="${cred.name}">${cred.name}</option>
            `)}
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label is-small">Remote Archive Id<label>
      <div class="control">
        <input class="input is-small" id="collid" type="text" @change="${(e) => this.collId = e.currentTarget.value}"
        required pattern="[\\w-]+" value="${this.collId || ""}">
      </div>
    </div>
    <div class="field">
      <label class="label is-small">Full Remote Storage URL<label>
      <div class="display-url">${this.archiveUrl}</div>
    </div>
    <div class="field">
      <div class="control with-status">
        <button class="button is-small" @click="${this.onTestCred}">Test Storage</button>
        ${this.status ? html`
        <span class="is-pulled-right ${this.valid ? "has-text-primary" : "has-text-danger"}">${this.status}</span>
        ` : ``}
      </div>
    </div>
    `;
  }

  async onNewColl(event) {
    event.preventDefault();
    if (this.showSyncEditor) {
      await this.onTestCred();
      if (!this.valid) {
        return false;
      }
    }

    const data = {
      metadata: {title: this.title}
    };

    if (this.cred.name) {
      const sync = {};
      sync.cred = this.cred.name;
      sync.collId = this.collId;
      data.extraConfig = {sync};
    }

    const method = "POST";
    const body = JSON.stringify(data);
    const resp = await fetch(`${apiPrefix}/c/create`, {method, body});
    const json = await resp.json();
    this.dispatchEvent(new CustomEvent("coll-created"));
  }

  async onTestCred(event) {
    if (event) {
      event.preventDefault();
    }
    if (!this.renderRoot.querySelector("#newform").checkValidity()) {
      this.renderRoot.querySelector("#newsubmit").click();
      return;
    }

    const params = new URLSearchParams();
    params.set("cred", this.cred.name);
    params.set("collId", this.collId);
    const resp = await fetch(`${apiPrefix}/test-cred?${params}`);
    const json = await resp.json();
    if (!json.valid) {
      this.status = "This storage bucket does not exist or is not accessible with the supplied credentials.";
      this.valid = false;
    } else if (json.exists) {
      this.status = "There is already an archive with this id. Choose a new id or select import archive";
      this.valid = false;
    } else {
      this.status = "Storage and archive id are valid!";
      this.valid = true;
    }
    return false;
  }
}

customElements.define('wr-store-cred', WrStorageCred);
customElements.define('wr-new-coll', WrNewColl);
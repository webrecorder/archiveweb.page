import { LitElement, html, css, wrapCss } from 'replaywebpage/src/misc';


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
      apiPrefix: { type: String },
      fullPath: { type: String }
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
        const bucketAndPath = this.currCred.bucketAndPath;
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
    const resp = await fetch(`${this.apiPrefix}/creds`);
    const res = await resp.json();
    if (res.creds) {
      this.credentials = res.creds;
    }
  }

  async saveCred() {
    this.currCred.fullPath = this.fullPath;

    const resp = await fetch(`${this.apiPrefix}/creds`, {
      method: "PUT",
      body: JSON.stringify(this.currCred)
    });
    const json = await resp.json();
    this.currCred = {...this.currCred, valid: json.valid, checkTs: json.checkTs};

    await this.loadCred();
    this.currCred = null;
  }

  async onTestCred(event) {
    event.preventDefault();
    const resp = await fetch(`${this.apiPrefix}/test-cred`, {
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
    await fetch(`${this.apiPrefix}/cred/${cred.name}`, {
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
class SyncConfigEditor extends LitElement
{
  constructor() {
    super();
    this.creds = [];
    this.cred = null;
    this.error = "";
  }

  static get properties() {
    return {
      "creds": { type: Array },
      "cred": { type: String },
      "apiPrefix": { type: String },
      "error": { type: String }
    }
  }

  firstUpdated() {
    this.loadCred();
  }

  async loadCred() {
    const resp = await fetch(`${this.apiPrefix}/creds`);
    const res = await resp.json();
    if (res.creds) {
      this.creds = res.creds;
      this.cred = this.creds[0];
    }
  }

  static get styles() {
    return wrapCss(css`
      :host {
        display: flex;
        flex-direction: column;
        margin: 2em 0;
        background: transparent;
      }
    `);
  }

  createRenderRoot() {
    return this;
  }

  findCredByName(name) {
    for (const cred of this.creds) {
      if (cred.name === name) {
        return cred;
      }
    }

    return null;
  }

  render() {
    return html`
    <div class="field">
      <label class="label is-small">Select Storage Bucket/Credentials<label>
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
      <label class="label is-small">Remote Collection Id<label>
      <div class="control">
        <input class="input is-small" id="collid" type="text" required pattern="[\w]+" placeholder="collection-id">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-small" @click="${this.onTestCred}">Test Storage</button>
      </div>
    </div>
    ${this.error ? html`
    <p class="has-text-danger">${this.error}</p>
    ` : ``}
    `;
  }

  setFullPath(event) {
    let value = event.currentTarget.value;
    if (value.startsWith("s3://")) {
      value = value.slice(5);
    }
    if (value.endsWith("/")) {
      value = value.slice(0, value.length - 1);
    }
    this.fullPath = value;
  }

  async onTestCred(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    params.set("cred", this.cred);
    params.set("path", this.fullPath);
    const resp = await fetch(`${this.apiPrefix}/test-cred?${params}`);
    const res = await resp.json();
    if (res.error) {
      switch (res.error) {
        case "bucket_not_found":
          this.error = "This storage bucket does not exist or is not accessible with the supplied credentials.";
          break;

        default:
          this.error = "Unknown error: " + res.error;
      }
    } else {
      this.error = "";
    }
    return false;
  }

}

customElements.define('wr-store-cred', WrStorageCred);
customElements.define('wr-sync-config', SyncConfigEditor);
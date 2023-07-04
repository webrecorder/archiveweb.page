import { html, css, wrapCss, apiPrefix, LitElement } from "replaywebpage/src/misc";
import prettyBytes from "pretty-bytes";

class BtrixUploader extends LitElement
{
  constructor() {
    super();
    this.pollingUploadState = false;
    this.btrixClient = null;
  }

  static get properties() {
    return {
      btrixOpts: { type: Object },

      coll: { type: Object },
      uploadColl: { type: Object },

      status: { type: String },

      lastUploadId: { type: String },
      lastUploadTime: { type: Number },
      isUploadNeeded: { type: Boolean },

      uploadSize: { type: Number },
      uploadTotal: { type: Number }
    };
  }

  static get styles() {
    return wrapCss(css``);
  }

  updated(changedProps) {
    if (changedProps.has("uploadColl")) {
      this.coll = this.uploadColl;
    }

    if (changedProps.has("coll") && this.coll) {
      this.pollUploadState();
    }
  }

  async pollUploadState() {
    if (this.pollingUploadState) {
      return;
    }

    this.pollingUploadState = true;

    while (true) {
      const resp = await fetch(`${apiPrefix}/c/${this.coll.id}/upload`);
      const json = await resp.json();
      this.status = json.status;
      
      this.lastUploadTime = json.lastUploadTime;
      this.lastUploadId = json.lastUploadId;

      if (this.lastUploadId && (json.mtime <= json.lastUploadTime)) {
        this.checkUploadedExists(this.lastUploadId).then((exists) => {
          this.isUploadNeeded = !exists;
        });
      } else {
        this.isUploadNeeded = true;
      }

      this.uploadSize = json.size;
      this.uploadTotal = json.totalSize;

      if (this.status !== "uploading") {
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    this.pollingUploadState = false;
  }

  render() {
    if (!this.coll) {
      return html``;
    }

    const lastUploadTime = this.lastUploadTime;

    return html`
      <wr-modal
      @modal-closed="${() => this.coll = null}"
      title="Upload To Browsertrix Cloud">
        <table class="is-size-6" style="margin-left: 3.0rem">
          <tr class="is-italic">
            <td class="has-text-right pr-4">Collection:</td>
            <td>${this.coll.title}</td>
          </tr>
          <tr class="is-italic">
            <td class="has-text-right pr-4">Estimated Size:</td>
            <td>${prettyBytes(this.coll.size)}</td>
          </tr>
          ${lastUploadTime ? html`
          <tr class="is-italic">
            <td class="has-text-right pr-4">Last Uploaded At:</td>
            <td>${new Date(lastUploadTime).toISOString()}</td>
          </tr>` : ""}
        </table>
        <div class="is-flex is-flex-direction-column">
          <div class="has-text-centered mt-2 mb-2">
            ${this.renderUploadStatus()}
          </div>
          <div class="has-text-centered mt-4">
            ${this.status === "uploading" ? html`
            <button class="button is-danger" type="button" @click="${this.onCancelUpload}">Cancel Upload</button>
            <button class="button" type="button" @click="${() => this.coll = null}">Close</button>
            ` : html`
            <button class="button ${!this.isUploadNeeded ? "" : "is-primary"}" type="button" @click="${this.onUpload}">${lastUploadTime ? "Upload Again" : "Upload"}</button>
            <button class="button" type="button" @click="${() => this.coll = null}">Cancel</button>
            `}
          </div>
        </div>
      </wr-modal>
    `;
  }

  renderUploadStatus() {
    switch (this.status) {
    case "done":
      return html`<p class="has-text-weight-bold has-text-primary">Upload Finished</p>`;

    case "failed":
      return html`<p class="has-text-weight-bold has-text-danger">Sorry, Upload Failed</p>`;

    case "aborted":
      return html`<p class="has-text-weight-bold has-text-danger">Upload has been canceled</p>`;

    case "uploading":
      return html`
          <progress value="${this.uploadSize}" max="${this.uploadTotal}" class="progress is-primary is-small mt-3 mb-1">
          </progress>
          <p class="has-text-centered is-size-7">
            ${prettyBytes(this.uploadSize || 0)} / ${prettyBytes(this.uploadTotal || 0)}
          </p>`;

    case "idle":
      if (!this.isUploadNeeded) {
        return html`<p class="is-italic">Archive already synched with Browsertrix Cloud.</p>`;
      } else if (this.lastUploadId) {
        return html`<p class="has-text-weight-bold has-text-primary">Archive updated since last upload. Click below to resync.</p>`;
      } else {
        return html`<p class="has-text-weight-bold has-text-primary">Archive not yet uploaded. Click "Upload" below to start.</p>`;
      }
    default:
      return "";
    }
  }

  async onUpload() {
    if (!this.btrixClient) {
      const { url, username, password } = this.btrixOpts;
      this.btrixClient = await BtrixClient.login(url, username, password);
    }

    const org = await this.btrixClient.getOrg(this.btrixOpts.orgName);

    const urlObj = new URL(`/api/orgs/${org}/uploads/stream`, this.btrixClient.url);

    if (this.lastUploadId) {
      urlObj.searchParams.set("replaceId", this.lastUploadId);
    }

    const url = urlObj.href;

    const headers = {"Authorization": this.btrixClient.auth};

    const body = JSON.stringify({url, headers});

    const method = "POST";

    const resp = await fetch(`${apiPrefix}/c/${this.coll.id}/upload?format=wacz&pages=all`, {method, body});

    const json = await resp.json();

    if (json.uploading) {
      this.pollUploadState();
    }
  }

  async onCancelUpload() {
    const method = "POST";
    const body = JSON.stringify({abortUpload: true});
    await fetch(`${apiPrefix}/c/${this.coll.id}/upload`, {method, body});
    this.pollUploadState();
  }

  async checkUploadedExists(uploadId) {
    if (!this.btrixClient) {
      const { url, username, password } = this.btrixOpts;
      this.btrixClient = await BtrixClient.login(url, username, password);
    }

    const org = await this.btrixClient.getOrg(this.btrixOpts.orgName);

    return await this.btrixClient.checkUploadedExists(org, uploadId);
  }
}

customElements.define("wr-btrix-upload", BtrixUploader);

class BtrixClient
{
  static async login(url, username, password) {
    const loginUrl = url + "/api/auth/jwt/login";

    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    const res = await fetch(loginUrl, {method: "POST", body: form});
    const auth = await res.json();
    const {token_type, access_token} = auth;

    const authToken = token_type + " " + access_token;
    return new BtrixClient(url, authToken);
  }

  constructor(url, auth) {
    this.url = url;
    this.auth = auth;
  }

  async fetchAPI(endpoint, method="GET", body=null) {
    const headers = {"Authorization": this.auth};
    try {
      const resp = await fetch(this.url + endpoint, {headers, method, body, duplex: "half"});
      return await resp.json();
    } catch (e) {
      console.warn(e);
      return {};
    }
  }

  async getOrg(name="") {
    const json = await this.fetchAPI("/api/users/me-with-orgs");
    const { orgs } = json;
    if (!orgs || !orgs.length) {
      return null;
    }
    if (!name) {
      return orgs[0].id;
    }
    for (const org of orgs) {
      if (org.name === name) {
        return org.id;
      }
    }
    return orgs[0].id;
  }

  async checkUploadedExists(org, uploadId) {
    const res = await this.fetchAPI(`/api/orgs/${org}/uploads/${uploadId}`);
    return !!res.name;
  }
}

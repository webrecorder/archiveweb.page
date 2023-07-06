import { html, css, wrapCss, apiPrefix, LitElement } from "replaywebpage/src/misc";
import prettyBytes from "pretty-bytes";

import fasSync from "@fortawesome/fontawesome-free/svgs/solid/sync-alt.svg";
import fasCheck from "@fortawesome/fontawesome-free/svgs/solid/check-circle.svg";
import fasExternal from "@fortawesome/fontawesome-free/svgs/solid/external-link-alt.svg";
import fasX from "@fortawesome/fontawesome-free/svgs/solid/times-circle.svg";

// eslint-disable-next-line no-undef
const VERSION = __AWP_VERSION__;

class BtrixUploader extends LitElement
{
  static get properties() {
    return {
      btrixOpts: { type: Object },

      coll: { type: Object },
      uploadColl: { type: Object },

      status: { type: String },

      uploadId: { type: String },
      uploadTime: { type: Number },
      isUploadNeeded: { type: Boolean },

      actualSize: { type: Number },

      uploadSize: { type: Number },
      uploadTotal: { type: Number }
    };
  }

  static get styles() {
    return wrapCss(css``);
  }

  updated(changedProps) {
    if (changedProps.has("uploadColl")) {
      const { coll, isUploadNeeded } = this.uploadColl;
      this.coll = coll;
      this.actualSize = 0;
      this.isUploadNeeded = isUploadNeeded;
      this.uploadTime = this.coll.uploadTime;
      this.uploadId = this.coll.uploadId;
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

    let loop = true;

    while (loop) {
      const resp = await fetch(`${apiPrefix}/c/${this.coll.id}/upload`);
      const json = await resp.json();
      this.status = json.status;
      
      this.uploadTime = json.uploadTime;
      this.uploadId = json.uploadId;

      if (this.status === "uploading") {
        this.isUploadNeeded = false;
      } else if (this.status === "idle" && this.btrixOpts && this.btrixOpts.client && 
                json.uploadTime && json.uploadId && (json.mtime <= json.uploadTime)) {
        this.getRemoteUpload();
      } else if (!this.uploadId) {
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

  async getRemoteUpload() {
    try {
      const upload = await this.btrixOpts.client.getRemoteUpload(this.uploadId);
      //this.coll.title = upload.name;
      this.actualSize = upload.fileSize;
    } catch (e) {
      this.isUploadNeeded = true;
      this.status = "missing";  
    }
  }

  render() {
    if (!this.coll) {
      return html``;
    }

    const uploadTime = this.uploadTime;

    const alreadyUploaded = !this.isUploadNeeded && uploadTime;

    let btrixUploadUrl = "";

    try {
      if (this.btrixOpts.client && this.uploadId) {
        const { client } = this.btrixOpts;
        btrixUploadUrl = new URL(`/orgs/${client.defaultOrg}/artifacts/upload/${this.uploadId}`,
          client.url).href;
      }
    } catch (e) {
      // ignore
    }



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
            <td class="has-text-right pr-4">Local Size:</td>
            <td>${prettyBytes(this.coll.size)}</td>
          </tr>
          ${this.actualSize ? html`
          <tr class="is-italic">
            <td class="has-text-right pr-4">Uploaded Size:</td>
            <td>${prettyBytes(this.actualSize)}</td>
          </tr>` : ""}
          ${uploadTime ? html`
          <tr class="is-italic">
            <td class="has-text-right pr-4">Last Uploaded At:</td>
            <td>${new Date(uploadTime).toLocaleString()}</td>
          </tr>` : ""}
          ${btrixUploadUrl ? html`
          <tr class="is-italic">
            <td class="has-text-right pr-4">Link:</td>
            <td><a href="${btrixUploadUrl}" target="_blank">
            <fa-icon aria-hidden="true" class="" size="0.7em" .svg="${fasExternal}"></fa-icon>
            View in Browsertrix Cloud</a></td>
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
            <button class="button ${!this.isUploadNeeded ? "" : "is-primary"}" type="button" @click="${this.onUpload}">${alreadyUploaded ? "Upload Again" : "Upload"}</button>
            <button class="button" type="button" @click="${() => this.coll = null}" title="Cancel without uploading">Cancel</button>
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
      return html`<p class="has-text-weight-bold has-text-danger">Sorry, Upload Failed, or, the Browsertrix credentials may be incorrect.</p>;
                  <p>Check your credentials in <i>Settings</i> and then click <b>Upload</b> to try again.</p>`;

    case "aborted":
      return html`<p class="has-text-weight-bold has-text-danger">Upload has been canceled</p>`;

    case "uploading":
      return html`
          <progress value="${this.uploadSize}" max="${this.uploadTotal}" class="progress is-primary is-small mt-3 mb-1">
          </progress>
          <p class="has-text-centered is-size-7">
            ${prettyBytes(this.uploadSize || 0)} / ${prettyBytes(this.uploadTotal || 0)}
          </p>`;

    case "missing":
      return html`<p class="has-text-weight-bold has-text-danger">Previously uploaded data not found, or, the Browsertrix credentials may be incorrect.</p>
                  <p>Check your credentials in <i>Settings</i> and then click <b>Upload</b> to try again.</p>`;

    case "idle":
      if (!this.isUploadNeeded) {
        return html`<p class="is-italic">
        <fa-icon aria-hidden="true" class="has-text-success" .svg="${fasCheck}"></fa-icon>
        Archive already uploaded to Browsertrix Cloud.
        ${this.renderDeleteUploaded()}
        </p>
        `;
      } else if (this.uploadId) {
        return html`<p class="has-text-weight-bold has-text-warning-dark">
        <fa-icon aria-hidden="true" class="has-text-warning-dark" .svg="${fasSync}"></fa-icon>
        Archive updated since last upload. Click "Upload" below to upload latest.
        ${this.renderDeleteUploaded()}
        </p>
        `;
      } else {
        return html`<p class="has-text-weight-bold has-text-primary">Archive not yet uploaded. Click "Upload" below to start.</p>`;
      }

    case "deleted":
      return html`<p class="has-text-weight-bold has-text-primary">Upload to Browsertrix Cloud has been deleted.</p>
      <p>(Data is still saved locally in your browser)</p>`;

    case "deleteFailed":
      return html`<p class="has-text-weight-bold has-text-danger">Sorry, deleting upload has failed, or, the Browsertrix credentials may be incorrect.</p>;
                  <p>Check your credentials in <i>Settings</i> and then click <b>Delete</b> to try again.
                  ${this.renderDeleteUploaded()}
                  </p>
                  `;
  
    default:
      return "";
    }
  }

  renderDeleteUploaded() {
    return html`
    <span><button class="button is-small" title="Delete Upload from Browsertrix Cloud" type="button" @click="${this.onDeleteUpload}">
    <fa-icon aria-hidden="true" class="has-text-danger pr-2" .svg="${fasX}"></fa-icon>
    Delete
    </button></span>
    `;
  }

  async onUpload() {
    const client = this.btrixOpts.client;

    const org = await client.getOrg(this.btrixOpts.orgName);

    const urlObj = new URL(`/api/orgs/${org}/uploads/stream`, client.url);

    if (this.uploadId) {
      urlObj.searchParams.set("replaceId", this.uploadId);
    }

    const now = new Date().toLocaleString();
    urlObj.searchParams.set("notes", `Uploaded by ArchiveWeb.page ${VERSION} at ${now}`);

    const url = urlObj.href;

    const headers = {"Authorization": client.auth};

    const body = JSON.stringify({url, headers});

    const method = "POST";

    this.status = "uploading";
    this.uploadSize = 0;
    this.uploadTotal = 0;

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

  async onDeleteUpload() {
    try {
      const { client } = this.btrixOpts;

      if (!client) {
        return;
      }
  
      await client.deleteUpload(this.uploadId);
  
      await fetch(`${apiPrefix}/c/${this.coll.id}/upload`, {method: "DELETE"});

      this.status = "deleted";
      this.isUploadNeeded = true;
      this.uploadTime = this.btrixOpts.uploadTime = null;
      this.uploadId = this.btrixOpts.uploadId = null;

    } catch (e) {
      this.status = "deleteFailed";
    }
  }
}

customElements.define("wr-btrix-upload", BtrixUploader);

export class BtrixClient
{
  static async login({url, username, password, orgName}) {   
    const loginUrl = url + "/api/auth/jwt/login";

    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    const res = await fetch(loginUrl, {method: "POST", body: form});
    const auth = await res.json();
    const {token_type, access_token} = auth;
    if (!access_token || !token_type) {
      throw new Error("Invalid login");
    }

    const authToken = token_type + " " + access_token;
    const client = new BtrixClient(url, authToken);

    const org = await client.getOrg(orgName);
    client.defaultOrg = org;

    return client;
  }

  constructor(url, auth) {
    this.url = url;
    this.auth = auth;
    this.defaultOrg = null;
  }

  async fetchAPI(endpoint, method="GET", body=null) {
    const headers = {"Authorization": this.auth};
    if (method !== "GET") {
      headers["Content-Type"] = "application/json";
    }
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

  async getRemoteUpload(uploadId, orgId = null) {
    const org = this.defaultOrg || orgId;
    const res = await this.fetchAPI(`/api/orgs/${org}/uploads/${uploadId}`);
    if (!res.name) {
      throw new Error("upload_missing");
    }
    return res;
  }

  async deleteUpload(uploadId, orgId = null) {
    const org = this.defaultOrg || orgId;
    const deleteStr = JSON.stringify({crawl_ids: [uploadId]});
    const res = await this.fetchAPI(`/api/orgs/${org}/uploads/delete`, "POST", deleteStr);
    if (!res.deleted) {
      throw new Error("delete_failed");
    }
  }
}

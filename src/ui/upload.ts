import {
  html,
  css,
  wrapCss,
  apiPrefix,
  LitElement,
} from "replaywebpage/src/misc";
import prettyBytes from "pretty-bytes";

import fasSync from "@fortawesome/fontawesome-free/svgs/solid/sync-alt.svg";
import fasCheck from "@fortawesome/fontawesome-free/svgs/solid/check-circle.svg";
import fasExternal from "@fortawesome/fontawesome-free/svgs/solid/external-link-alt.svg";
import fasX from "@fortawesome/fontawesome-free/svgs/solid/times-circle.svg";

// eslint-disable-next-line no-undef
const VERSION = __AWP_VERSION__;

class BtrixUploader extends LitElement {
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
      uploadTotal: { type: Number },
    };
  }

  static get styles() {
    return wrapCss(css``);
  }

  updated(changedProps) {
    if (changedProps.has("uploadColl")) {
      // @ts-expect-error - TS2339 - Property 'uploadColl' does not exist on type 'BtrixUploader'.
      const { coll, isUploadNeeded } = this.uploadColl;
      // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
      this.coll = coll;
      // @ts-expect-error - TS2339 - Property 'actualSize' does not exist on type 'BtrixUploader'.
      this.actualSize = 0;
      // @ts-expect-error - TS2339 - Property 'isUploadNeeded' does not exist on type 'BtrixUploader'.
      this.isUploadNeeded = isUploadNeeded;
      // @ts-expect-error - TS2339 - Property 'uploadTime' does not exist on type 'BtrixUploader'. | TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
      this.uploadTime = this.coll.uploadTime;
      // @ts-expect-error - TS2339 - Property 'uploadId' does not exist on type 'BtrixUploader'. | TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
      this.uploadId = this.coll.uploadId;
    }

    // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
    if (changedProps.has("coll") && this.coll) {
      this.pollUploadState();
    }
  }

  async pollUploadState() {
    // @ts-expect-error - TS2339 - Property 'pollingUploadState' does not exist on type 'BtrixUploader'.
    if (this.pollingUploadState) {
      return;
    }

    // @ts-expect-error - TS2339 - Property 'pollingUploadState' does not exist on type 'BtrixUploader'.
    this.pollingUploadState = true;

    let loop = true;

    while (loop) {
      // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
      const resp = await fetch(`${apiPrefix}/c/${this.coll.id}/upload`);
      const json = await resp.json();
      // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'BtrixUploader'.
      this.status = json.status;

      // @ts-expect-error - TS2339 - Property 'uploadTime' does not exist on type 'BtrixUploader'.
      this.uploadTime = json.uploadTime;
      // @ts-expect-error - TS2339 - Property 'uploadId' does not exist on type 'BtrixUploader'.
      this.uploadId = json.uploadId;

      // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'BtrixUploader'.
      if (this.status === "uploading") {
        // @ts-expect-error - TS2339 - Property 'isUploadNeeded' does not exist on type 'BtrixUploader'.
        this.isUploadNeeded = false;
      } else if (
        // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'BtrixUploader'.
        this.status === "idle" &&
        // @ts-expect-error - TS2339 - Property 'btrixOpts' does not exist on type 'BtrixUploader'.
        this.btrixOpts &&
        // @ts-expect-error - TS2339 - Property 'btrixOpts' does not exist on type 'BtrixUploader'.
        this.btrixOpts.client &&
        json.uploadTime &&
        json.uploadId &&
        json.mtime <= json.uploadTime
      ) {
        this.getRemoteUpload();
        // @ts-expect-error - TS2339 - Property 'uploadId' does not exist on type 'BtrixUploader'.
      } else if (!this.uploadId) {
        // @ts-expect-error - TS2339 - Property 'isUploadNeeded' does not exist on type 'BtrixUploader'.
        this.isUploadNeeded = true;
      }

      // @ts-expect-error - TS2339 - Property 'uploadSize' does not exist on type 'BtrixUploader'.
      this.uploadSize = json.size;
      // @ts-expect-error - TS2339 - Property 'uploadTotal' does not exist on type 'BtrixUploader'.
      this.uploadTotal = json.totalSize;

      // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'BtrixUploader'.
      if (this.status !== "uploading") {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // @ts-expect-error - TS2339 - Property 'pollingUploadState' does not exist on type 'BtrixUploader'.
    this.pollingUploadState = false;
  }

  async getRemoteUpload() {
    try {
      // @ts-expect-error - TS2339 - Property 'btrixOpts' does not exist on type 'BtrixUploader'. | TS2339 - Property 'uploadId' does not exist on type 'BtrixUploader'.
      const upload = await this.btrixOpts.client.getRemoteUpload(this.uploadId);
      //this.coll.title = upload.name;
      // @ts-expect-error - TS2339 - Property 'actualSize' does not exist on type 'BtrixUploader'.
      this.actualSize = upload.fileSize;
    } catch (e) {
      // @ts-expect-error - TS2339 - Property 'isUploadNeeded' does not exist on type 'BtrixUploader'.
      this.isUploadNeeded = true;
      // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'BtrixUploader'.
      this.status = "missing";
    }
  }

  render() {
    // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
    if (!this.coll) {
      return html``;
    }

    // @ts-expect-error - TS2339 - Property 'uploadTime' does not exist on type 'BtrixUploader'.
    const uploadTime = this.uploadTime;

    // @ts-expect-error - TS2339 - Property 'isUploadNeeded' does not exist on type 'BtrixUploader'.
    const alreadyUploaded = !this.isUploadNeeded && uploadTime;

    let btrixUploadUrl = "";

    try {
      // @ts-expect-error - TS2339 - Property 'btrixOpts' does not exist on type 'BtrixUploader'. | TS2339 - Property 'uploadId' does not exist on type 'BtrixUploader'.
      if (this.btrixOpts.client && this.uploadId) {
        // @ts-expect-error - TS2339 - Property 'btrixOpts' does not exist on type 'BtrixUploader'.
        const { client } = this.btrixOpts;
        btrixUploadUrl = new URL(
          // @ts-expect-error - TS2339 - Property 'uploadId' does not exist on type 'BtrixUploader'.
          `/orgs/${client.defaultOrg}/artifacts/upload/${this.uploadId}`,
          client.url
        ).href;
      }
    } catch (e) {
      // ignore
    }

    return html`
      <wr-modal
        @modal-closed="${
          // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
          () => (this.coll = null)
        }"
        title="Upload To Browsertrix Cloud"
      >
        <table class="is-size-6" style="margin-left: 3.0rem">
          <tr class="is-italic">
            <td class="has-text-right pr-4">Collection:</td>
            <td>
              ${
                // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
                this.coll.title
              }
            </td>
          </tr>
          <tr class="is-italic">
            <td class="has-text-right pr-4">Local Size:</td>
            <td>
              ${
                // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
                prettyBytes(this.coll.size)
              }
            </td>
          </tr>
          ${
            // @ts-expect-error - TS2339 - Property 'actualSize' does not exist on type 'BtrixUploader'.
            this.actualSize
              ? html` <tr class="is-italic">
                  <td class="has-text-right pr-4">Uploaded Size:</td>
                  <td>
                    ${
                      // @ts-expect-error - TS2339 - Property 'actualSize' does not exist on type 'BtrixUploader'.
                      prettyBytes(this.actualSize)
                    }
                  </td>
                </tr>`
              : ""
          }
          ${uploadTime
            ? html` <tr class="is-italic">
                <td class="has-text-right pr-4">Last Uploaded At:</td>
                <td>${new Date(uploadTime).toLocaleString()}</td>
              </tr>`
            : ""}
          ${btrixUploadUrl
            ? html` <tr class="is-italic">
                <td class="has-text-right pr-4">Link:</td>
                <td>
                  <a href="${btrixUploadUrl}" target="_blank">
                    <fa-icon
                      aria-hidden="true"
                      class=""
                      size="0.7em"
                      .svg="${fasExternal}"
                    ></fa-icon>
                    View in Browsertrix Cloud</a
                  >
                </td>
              </tr>`
            : ""}
        </table>
        <div class="is-flex is-flex-direction-column">
          <div class="has-text-centered mt-2 mb-2">
            ${this.renderUploadStatus()}
          </div>
          <div class="has-text-centered mt-4">
            ${
              // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'BtrixUploader'.
              this.status === "uploading"
                ? html`
                    <button
                      class="button is-danger"
                      type="button"
                      @click="${this.onCancelUpload}"
                    >
                      Cancel Upload
                    </button>
                    <button
                      class="button"
                      type="button"
                      @click="${
                        // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
                        () => (this.coll = null)
                      }"
                    >
                      Close
                    </button>
                  `
                : html`
                    <button
                      class="button ${
                        // @ts-expect-error - TS2339 - Property 'isUploadNeeded' does not exist on type 'BtrixUploader'.
                        !this.isUploadNeeded ? "" : "is-primary"
                      }"
                      type="button"
                      @click="${this.onUpload}"
                    >
                      ${alreadyUploaded ? "Upload Again" : "Upload"}
                    </button>
                    <button
                      class="button"
                      type="button"
                      @click="${
                        // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
                        () => (this.coll = null)
                      }"
                      title="Cancel without uploading"
                    >
                      Cancel
                    </button>
                  `
            }
          </div>
        </div>
      </wr-modal>
    `;
  }

  renderUploadStatus() {
    // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'BtrixUploader'.
    switch (this.status) {
      case "done":
        return html`<p class="has-text-weight-bold has-text-primary">
          Upload Finished
        </p>`;

      case "failed":
        return html`<p class="has-text-weight-bold has-text-danger">
            Sorry, Upload Failed, or, the Browsertrix credentials may be
            incorrect.
          </p>
          ;
          <p>
            Check your credentials in <i>Settings</i> and then click
            <b>Upload</b> to try again.
          </p>`;

      case "aborted":
        return html`<p class="has-text-weight-bold has-text-danger">
          Upload has been canceled
        </p>`;

      case "uploading":
        return html` <progress
            value="${
              // @ts-expect-error - TS2339 - Property 'uploadSize' does not exist on type 'BtrixUploader'.
              this.uploadSize
            }"
            max="${
              // @ts-expect-error - TS2339 - Property 'uploadTotal' does not exist on type 'BtrixUploader'.
              this.uploadTotal
            }"
            class="progress is-primary is-small mt-3 mb-1"
          ></progress>
          <p class="has-text-centered is-size-7">
            ${
              // @ts-expect-error - TS2339 - Property 'uploadSize' does not exist on type 'BtrixUploader'.
              prettyBytes(this.uploadSize || 0)
            }
            /
            ${
              // @ts-expect-error - TS2339 - Property 'uploadTotal' does not exist on type 'BtrixUploader'.
              prettyBytes(this.uploadTotal || 0)
            }
          </p>`;

      case "missing":
        return html`<p class="has-text-weight-bold has-text-danger">
            Previously uploaded data not found, or, the Browsertrix credentials
            may be incorrect.
          </p>
          <p>
            Check your credentials in <i>Settings</i> and then click
            <b>Upload</b> to try again.
          </p>`;

      case "idle":
        // @ts-expect-error - TS2339 - Property 'isUploadNeeded' does not exist on type 'BtrixUploader'.
        if (!this.isUploadNeeded) {
          return html`<p class="is-italic">
            <fa-icon
              aria-hidden="true"
              class="has-text-success"
              .svg="${fasCheck}"
            ></fa-icon>
            Archive already uploaded to Browsertrix Cloud.
            ${this.renderDeleteUploaded()}
          </p> `;
          // @ts-expect-error - TS2339 - Property 'uploadId' does not exist on type 'BtrixUploader'.
        } else if (this.uploadId) {
          return html`<p class="has-text-weight-bold has-text-warning-dark">
            <fa-icon
              aria-hidden="true"
              class="has-text-warning-dark"
              .svg="${fasSync}"
            ></fa-icon>
            Archive updated since last upload. Click "Upload" below to upload
            latest. ${this.renderDeleteUploaded()}
          </p> `;
        } else {
          return html`<p class="has-text-weight-bold has-text-primary">
            Archive not yet uploaded. Click "Upload" below to start.
          </p>`;
        }

      case "deleted":
        return html`<p class="has-text-weight-bold has-text-primary">
            Upload to Browsertrix Cloud has been deleted.
          </p>
          <p>(Data is still saved locally in your browser)</p>`;

      case "deleteFailed":
        return html`<p class="has-text-weight-bold has-text-danger">
            Sorry, deleting upload has failed, or, the Browsertrix credentials
            may be incorrect.
          </p>
          ;
          <p>
            Check your credentials in <i>Settings</i> and then click
            <b>Delete</b> to try again. ${this.renderDeleteUploaded()}
          </p> `;

      default:
        return "";
    }
  }

  renderDeleteUploaded() {
    return html`
      <span
        ><button
          class="button is-small"
          title="Delete Upload from Browsertrix Cloud"
          type="button"
          @click="${this.onDeleteUpload}"
        >
          <fa-icon
            aria-hidden="true"
            class="has-text-danger pr-2"
            .svg="${fasX}"
          ></fa-icon>
          Delete
        </button></span
      >
    `;
  }

  async onUpload() {
    // @ts-expect-error - TS2339 - Property 'btrixOpts' does not exist on type 'BtrixUploader'.
    const client = this.btrixOpts.client;

    // @ts-expect-error - TS2339 - Property 'btrixOpts' does not exist on type 'BtrixUploader'.
    const org = await client.getOrg(this.btrixOpts.orgName);

    const urlObj = new URL(`/api/orgs/${org}/uploads/stream`, client.url);

    // @ts-expect-error - TS2339 - Property 'uploadId' does not exist on type 'BtrixUploader'.
    if (this.uploadId) {
      // @ts-expect-error - TS2339 - Property 'uploadId' does not exist on type 'BtrixUploader'.
      urlObj.searchParams.set("replaceId", this.uploadId);
    }

    const now = new Date().toLocaleString();
    urlObj.searchParams.set(
      "notes",
      `Uploaded by ArchiveWeb.page ${VERSION} at ${now}`
    );

    const url = urlObj.href;

    const headers = { Authorization: client.auth };

    const body = JSON.stringify({ url, headers });

    const method = "POST";

    // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'BtrixUploader'.
    this.status = "uploading";
    // @ts-expect-error - TS2339 - Property 'uploadSize' does not exist on type 'BtrixUploader'.
    this.uploadSize = 0;
    // @ts-expect-error - TS2339 - Property 'uploadTotal' does not exist on type 'BtrixUploader'.
    this.uploadTotal = 0;

    const resp = await fetch(
      // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
      `${apiPrefix}/c/${this.coll.id}/upload?format=wacz&pages=all`,
      { method, body }
    );

    const json = await resp.json();

    if (json.uploading) {
      this.pollUploadState();
    }
  }

  async onCancelUpload() {
    const method = "POST";
    const body = JSON.stringify({ abortUpload: true });
    // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
    await fetch(`${apiPrefix}/c/${this.coll.id}/upload`, { method, body });
    this.pollUploadState();
  }

  async onDeleteUpload() {
    try {
      // @ts-expect-error - TS2339 - Property 'btrixOpts' does not exist on type 'BtrixUploader'.
      const { client } = this.btrixOpts;

      if (!client) {
        return;
      }

      // @ts-expect-error - TS2339 - Property 'uploadId' does not exist on type 'BtrixUploader'.
      await client.deleteUpload(this.uploadId);

      // @ts-expect-error - TS2339 - Property 'coll' does not exist on type 'BtrixUploader'.
      await fetch(`${apiPrefix}/c/${this.coll.id}/upload`, {
        method: "DELETE",
      });

      // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'BtrixUploader'.
      this.status = "deleted";
      // @ts-expect-error - TS2339 - Property 'isUploadNeeded' does not exist on type 'BtrixUploader'.
      this.isUploadNeeded = true;
      // @ts-expect-error - TS2339 - Property 'uploadTime' does not exist on type 'BtrixUploader'. | TS2339 - Property 'btrixOpts' does not exist on type 'BtrixUploader'.
      this.uploadTime = this.btrixOpts.uploadTime = null;
      // @ts-expect-error - TS2339 - Property 'uploadId' does not exist on type 'BtrixUploader'. | TS2339 - Property 'btrixOpts' does not exist on type 'BtrixUploader'.
      this.uploadId = this.btrixOpts.uploadId = null;
    } catch (e) {
      // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'BtrixUploader'.
      this.status = "deleteFailed";
    }
  }
}

customElements.define("wr-btrix-upload", BtrixUploader);

export class BtrixClient {
  static async login({ url, username, password, orgName }) {
    const loginUrl = url + "/api/auth/jwt/login";

    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    const res = await fetch(loginUrl, { method: "POST", body: form });
    const auth = await res.json();
    const { token_type, access_token } = auth;
    if (!access_token || !token_type) {
      throw new Error("Invalid login");
    }

    const authToken = token_type + " " + access_token;
    const client = new BtrixClient(url, authToken);

    const org = await client.getOrg(orgName);
    // @ts-expect-error - TS2339 - Property 'defaultOrg' does not exist on type 'BtrixClient'.
    client.defaultOrg = org;

    return client;
  }

  constructor(url, auth) {
    // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'BtrixClient'.
    this.url = url;
    // @ts-expect-error - TS2339 - Property 'auth' does not exist on type 'BtrixClient'.
    this.auth = auth;
    // @ts-expect-error - TS2339 - Property 'defaultOrg' does not exist on type 'BtrixClient'.
    this.defaultOrg = null;
  }

  async fetchAPI(endpoint, method = "GET", body = null) {
    // @ts-expect-error - TS2339 - Property 'auth' does not exist on type 'BtrixClient'.
    const headers = { Authorization: this.auth };
    if (method !== "GET") {
      headers["Content-Type"] = "application/json";
    }
    try {
      // @ts-expect-error - TS2339 - Property 'url' does not exist on type 'BtrixClient'.
      const resp = await fetch(this.url + endpoint, {
        headers,
        method,
        body,
        // @ts-expect-error - TS2345 - Argument of type '{ headers: { Authorization: any; }; method: string; body: null; duplex: string; }' is not assignable to parameter of type 'RequestInit'.
        duplex: "half",
      });
      return await resp.json();
    } catch (e) {
      console.warn(e);
      return {};
    }
  }

  async getOrg(name = "") {
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
    // @ts-expect-error - TS2339 - Property 'defaultOrg' does not exist on type 'BtrixClient'.
    const org = this.defaultOrg || orgId;
    const res = await this.fetchAPI(`/api/orgs/${org}/uploads/${uploadId}`);
    if (!res.name) {
      throw new Error("upload_missing");
    }
    return res;
  }

  async deleteUpload(uploadId, orgId = null) {
    // @ts-expect-error - TS2339 - Property 'defaultOrg' does not exist on type 'BtrixClient'.
    const org = this.defaultOrg || orgId;
    const deleteStr = JSON.stringify({ crawl_ids: [uploadId] });
    const res = await this.fetchAPI(
      `/api/orgs/${org}/uploads/delete`,
      "POST",
      // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type 'null | undefined'.
      deleteStr
    );
    if (!res.deleted) {
      throw new Error("delete_failed");
    }
  }
}

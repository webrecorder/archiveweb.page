import {
  html,
  css,
  wrapCss,
  clickOnSpacebarPress,
  apiPrefix,
} from "replaywebpage";

import fasFullscreen from "@fortawesome/fontawesome-free/svgs/solid/desktop.svg";
import fasUnfullscreen from "@fortawesome/fontawesome-free/svgs/solid/compress-arrows-alt.svg";

import { type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";

import prettyBytes from "pretty-bytes";

import { Item } from "replaywebpage";

import wrRec from "../assets/icons/recLogo.svg";

//============================================================================
class WrRecColl extends Item {
  @property({ type: String })
  sourceUrl: string | null = null;

  @property({ type: Object })
  shareOpts: Record<string, string> = {};

  @property({ type: Boolean })
  showFinish = true;

  @state()
  totalSize = 0;

  @state()
  isDownloadingResources = false;

  @state()
  currentHash = '';

  _sizeUpdater: Promise<void> | null = null;

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
        padding: 0 0.5em;
        min-width: max-content;
        margin-left: 1em;
        height: 40px;
      }

      .button.is-primary-new {
        background-color: #4d7c0f;
        border-color: rgba(0, 0, 0, 0);
        color: rgb(255, 255, 255);
        border-radius: 6px;
      }

      .button.is-primary-new:hover {
        background-color: #3a5f09;
      }

      .size-label {
        margin-left: 0.5em;
        font-weight: bold;
      }

      .dot {
        height: 8px;
        width: 8px;
        background-color: #16a34a;
        border-radius: 50%;
        display: inline-block;
      }

      .download-resources-btn {
        margin-left: 0.5em;
      }

      @media screen and (max-width: 480px) {
        div.has-addons {
          flex-wrap: wrap;
        }

        div.has-addons form {
          flex: 1;
          margin-bottom: 8px;
        }

        .rec-controls {
          width: 100%;
          justify-content: space-between !important;
        }
      }

      ${Item.compStyles}
    `;
  }

  updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    if (
      changedProperties.has("embed") ||
      ((changedProperties.has("item") || changedProperties.has("loadInfo")) &&
        this.loadInfo &&
        this.embed &&
        this.item &&
        !this._sizeUpdater)
    ) {
      this._sizeUpdater = this.runSizeUpdater();
    }

    if (changedProperties.has("favIconUrl") && this.favIconUrl) {
      navigator.serviceWorker.controller?.postMessage({
        msg_type: "update-favicon",
        id: this.item,
        url: this.tabData.url,
        favIconUrl: this.favIconUrl.split("mp_/")[1],
      });
    }

    // Add download button to resources tab after render
    this.addDownloadButtonToResources();
  }

  connectedCallback() {
    super.connectedCallback();
    this.currentHash = window.location.hash;
    // Listen for hash changes to show/hide download button
    this._hashChangeHandler = () => {
      this.currentHash = window.location.hash;
      this.requestUpdate();
    };
    window.addEventListener('hashchange', this._hashChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._hashChangeHandler) {
      window.removeEventListener('hashchange', this._hashChangeHandler);
    }
  }

  _hashChangeHandler?: () => void;

  addDownloadButtonToResources() {
    // Only add button if we're on the resources tab
    if (!this.currentHash.includes('view=resources')) {
      return;
    }



    // Try multiple times with increasing delays
    const attempts = [0, 100, 500, 1000, 2000];
    attempts.forEach(delay => {
      setTimeout(() => {
        const pageView = this.renderRoot.querySelector('wr-coll-resources');
        
        if (!pageView || pageView.hasAttribute('data-download-btn-added')) {
          return;
        }

        const shadowRoot = pageView.shadowRoot;
        if (!shadowRoot) {
          return;
        }

        const toolbar = shadowRoot.querySelector('.notification.level.is-marginless');
        if (!toolbar || toolbar.querySelector('.download-all-btn')) {
          return;
        }

        const levelLeft = toolbar.querySelector('.level-left');
        if (!levelLeft) {
          return;
        }

        // Mark as processed before adding button
        pageView.setAttribute('data-download-btn-added', 'true');

        // Create a level-item wrapper for the button
        const levelItem = document.createElement('div');
        levelItem.className = 'level-item';
        
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'button is-small is-primary download-all-btn';
        downloadBtn.innerHTML = `
          <span class="icon is-small">
            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 1em; height: 1em;">
              <path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
            </svg>
          </span>
          <span>Download All</span>
        `;
        downloadBtn.onclick = () => this.downloadDisplayedResources();

        levelItem.appendChild(downloadBtn);
        levelLeft.appendChild(levelItem);
      }, delay);
    });
  }

  async downloadDisplayedResources() {
    if (this.isDownloadingResources) return;
    
    this.isDownloadingResources = true;
    
    try {
      // Get resources from the wr-coll-resources component
      const pageView = this.renderRoot.querySelector('wr-coll-resources');
      
      if (!pageView) {
        alert('Could not find the Resources tab. Please make sure you are on the Resources tab.');
        return;
      }
      
      // Wait a moment for the component to fully initialize
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Access the results property which contains the resources
      // @ts-expect-error - accessing internal property
      const pages = pageView.results || [];
      
      if (pages.length === 0) {
        alert('No resources found. Please make sure you are on the Resources tab and resources are displayed.');
        return;
      }

      // Confirm download
      const confirmed = confirm(
        `Download ${pages.length} resource(s)?\n\n` +
        `This will download all currently displayed resources to your default download folder.`
      );
      
      if (!confirmed) {
        return;
      }

      // Download each resource
      let successCount = 0;
      let failCount = 0;

      for (const page of pages) {
        try {
          await this.downloadResource(page);
          successCount++;
          // Small delay to avoid overwhelming the browser
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (e) {
          console.error(`Failed to download ${(page as unknown).url}:`, e);
          failCount++;
        }
      }

      alert(
        `Download complete!\n\n` +
        `Successfully downloaded: ${successCount}\n` +
        `Failed: ${failCount}`
      );
    } catch (error) {
      alert('An error occurred while downloading resources.');
    } finally {
      this.isDownloadingResources = false;
    }
  }

  async downloadResource(page: unknown) {
    try {
      // Construct the URL for the resource
      const pageData = page;
      const url = pageData.url;
      const timestamp = pageData.ts; // Already in YYYYMMDDHHmmss format
      
      // Use the replay URL format: /w/{collId}/{timestamp}mp_/{url}
      const replayUrl = `/w/${this.item}/${timestamp}mp_/${url}`;
      
      const response = await fetch(replayUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      
      // Generate filename from URL
      const urlObj = new URL(url);
      let filename = urlObj.pathname.split('/').pop() || 'resource';
      
      // If no extension, try to get from content-type
      if (!filename.includes('.')) {
        const contentType = response.headers.get('content-type');
        if (contentType) {
          const ext = this.getExtensionFromMimeType(contentType);
          if (ext) {
            filename += ext;
          }
        }
      }
      
      // Sanitize filename
      filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
      
      // Create download link
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
    } catch (error) {
      throw error;
    }
  }

  getExtensionFromMimeType(mimeType: string): string {
    const mimeMap: Record<string, string> = {
      'text/html': '.html',
      'text/css': '.css',
      'text/javascript': '.js',
      'application/javascript': '.js',
      'application/json': '.json',
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/svg+xml': '.svg',
      'image/webp': '.webp',
      'application/pdf': '.pdf',
      'video/mp4': '.mp4',
      'video/webm': '.webm',
      'audio/mpeg': '.mp3',
      'audio/ogg': '.ogg',
      'application/zip': '.zip',
    };
    
    const baseType = mimeType.split(';')[0].trim();
    return mimeMap[baseType] || '';
  }

  async runSizeUpdater() {
    try {
      while (this.embed) {
        if (this.item) {
          const resp = await fetch(`${apiPrefix}/c/${this.item}`);
          const json = await resp.json();
          this.totalSize = json.size || 0;
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    } finally {
      this._sizeUpdater = null;
    }
  }

  protected renderToolbarLeft(isDropdown = false) {
    const leftBar = super.renderToolbarLeft();

    if (this.embed) {
      return leftBar;
    }

    return html`${leftBar}<a
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

  protected renderToolbarRight() {
    const rightBar = super.renderToolbarRight();

    if (!this.embed) {
      return rightBar;
    }

    return html`
      <div class="is-flex is-flex-direction-row rec-controls">
        <a
          href="#"
          role="button"
          class="button is-borderless"
          style="margin-top: 2px"
          id="fullscreen"
          @click="${this.onFullscreenToggle}"
          @keyup="${clickOnSpacebarPress}"
          title="${this.isFullscreen ? "Exit Full Screen" : "Full Screen"}"
          aria-label="${this.isFullscreen ? "Exit Fullscreen" : "Fullscreen"}"
        >
          <span class="icon is-small">
            <fa-icon
              size="1.0em"
              class="has-text-grey"
              aria-hidden="true"
              .svg="${this.isFullscreen ? fasUnfullscreen : fasFullscreen}"
            ></fa-icon>
          </span>
        </a>
        <span class="rec-button" title="Archiving">
          <span class="dot"></span>
          <span class="size-label">${prettyBytes(this.totalSize)}</span>
        </span>
        ${this.showFinish
          ? html` <button
              class="button is-primary-new"
              @click="${this.onEmbedFinish}"
              type="button"
            >
              Finish
            </button>`
          : html`
              <a
                class="button is-primary-new"
                role="button"
                download="my-archive.wacz"
                href="${this.getDownloadUrl()}"
                target="_blank"
                >Download</a
              >
            `}
      </div>
    `;
  }

  renderCollInfo() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemInfo = this.itemInfo as any;
    return html` <div class="info-bg">
      <wr-rec-coll-info
        class="is-list"
        .item="${itemInfo}"
        .shareOpts=${this.shareOpts}
        ?detailed="${true}"
      ></wr-rec-coll-info>
    </div>`;
  }

  onShowStart() {
    if (this.embed) {
      return;
    }

    const coll = this.item;
    const title = this.itemInfo?.title || "";
    const url = this.tabData.url;
    this.dispatchEvent(
      new CustomEvent("show-start", { detail: { coll, title, url } }),
    );
  }

  onEmbedFinish() {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        msg_type: "toggle-record",
        id: this.item,
        isRecording: false,
      });
    }
    if (window.parent !== window) {
      window.parent.postMessage({
        type: "awp-finish",
        downloadUrl: this.getDownloadUrl(),
      });
    }
  }

  onHashChange() {
    super.onHashChange();

    if (!this.embed) {
      return;
    }

    const url = this.tabData.url || "";
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      this.tabData.url = "https://" + url;
    }
  }

  navigateTo(value: string) {
    if (
      this.embed &&
      !value.startsWith("https://") &&
      !value.startsWith("http://")
    ) {
      value = "https://" + value;
    }
    super.navigateTo(value);
  }

  getDownloadUrl() {
    return new URL(
      `${apiPrefix}/c/${this.item}/dl?format=wacz&pages=all`,
      window.location.href,
    ).href;
  }
}

customElements.define("wr-rec-coll", WrRecColl);

export { WrRecColl };

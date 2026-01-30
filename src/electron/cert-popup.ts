import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import fasLock from "@fortawesome/fontawesome-free/svgs/solid/lock.svg";
import fasLockOpen from "@fortawesome/fontawesome-free/svgs/solid/lock-open.svg";

@customElement("wr-cert-popup")
export class CertPopup extends LitElement {
  @property({ type: Object }) cert: any = null;
  @property({ type: Boolean }) show = false;

  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 50px;
      left: 10px;
      z-index: 1000;
      background: white;
      border: 1px solid #ccc;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      max-width: 400px;
      font-family: sans-serif;
      font-size: 14px;
    }

    .popup-content {
      padding: 15px;
      max-height: 500px;
      overflow-y: auto;
    }

    .close-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      color: #666;
    }

    h3 {
      margin-top: 0;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
    }

    .field {
      margin-bottom: 10px;
    }

    .label {
      font-weight: bold;
      display: block;
      margin-bottom: 2px;
      font-size: 12px;
      color: #555;
    }

    .value {
      word-break: break-all;
      font-family: monospace;
      background: #f5f5f5;
      padding: 2px 4px;
      border-radius: 3px;
    }

    .section-title {
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 5px;
      color: #333;
      border-bottom: 1px solid #eee;
    }
  `;

  render() {
    if (!this.show || !this.cert) {
      return html``;
    }

    return html`
      <div class="popup-content">
        <button class="close-btn" @click="${this.close}">×</button>
        ${this.renderHeader()}
        
        <div class="field">
          <span class="label">Subject</span>
          ${this.renderPrincipal(this.getCertPrincipal('subject'))}
        </div>

        <div class="field">
          <span class="label">Issuer</span>
          ${this.renderPrincipal(this.getCertPrincipal('issuer'))}
        </div>

        <div class="field">
          <span class="label">Validity</span>
          <div class="value">Issued: ${this.formatDate(this.getCertData().validStart)}</div>
          <div class="value">Expires: ${this.formatDate(this.getCertData().validExpiry)}</div>
        </div>

        <div class="field">
          <span class="label">Fingerprint (SHA1)</span>
          <div class="value">${this.getCertData().fingerprint}</div>
        </div>
        
        ${this.getCertData().fingerprint256 ? html`
        <div class="field">
          <span class="label">Fingerprint (SHA256)</span>
          <div class="value">${this.getCertData().fingerprint256}</div>
        </div>` : ""}

        <div class="field">
            <span class="label">Serial Number</span>
            <div class="value">${this.getCertData().serialNumber}</div>
        </div>

      </div>
    `;
  }

  isCertValid() {
    if (!this.cert) return false;

    // Check Electron's verification result if available
    if (this.cert.verificationResult && this.cert.verificationResult !== "net::OK") {
      return false;
    }

    // Fallback/Double-check dates
    const now = Date.now() / 1000;
    if (this.cert.certificate) {
      // Handle wrapped object structure if verificationResult is present
      const innerCert = this.cert.certificate;
      return now >= innerCert.validStart && now <= innerCert.validExpiry;
    }

    // Direct cert object (backward compatibility or if verificationResult missing)
    return now >= this.cert.validStart && now <= this.cert.validExpiry;
  }

  getCertPrincipal(type: 'subject' | 'issuer') {
    if (this.cert.certificate) {
      return this.cert.certificate[type];
    }
    return this.cert[type];
  }

  getCertData() {
    return this.cert.certificate || this.cert;
  }

  renderHeader() {
    const isValid = this.isCertValid();
    const icon = isValid ? fasLock : fasLockOpen;
    const color = isValid ? "#2ea44f" : "#cb2431"; // GitHub Green / Red
    const text = isValid ? "Valid Certificate" : "Invalid Certificate";

    return html`
        <div style="display: flex; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px;">
            <span style="color: ${color}; margin-right: 10px; width: 24px; height: 24px; display: inline-block;">
                <fa-icon .svg="${icon}" size="1.5em"></fa-icon>
            </span>
            <div>
                <h3 style="margin: 0; padding: 0; border: none;">Certificate Details</h3>
                <span style="color: ${color}; font-weight: bold; font-size: 12px;">${text}</span>
            </div>
        </div>
    `;
  }

  renderPrincipal(principal: any) {
    if (!principal) return html`<div class="value">N/A</div>`;

    // Common fields to display first
    const priorityKeys = ['commonName', 'organizationName', 'organizationalUnitName', 'countryName'];

    // Helper to map keys to readable labels
    const labels: Record<string, string> = {
      commonName: 'CN',
      organizations: 'Org',
      organizationUnits: 'OU',
      locality: 'L',
      state: 'ST',
      country: 'C'
    };

    return html`
            <div style="background: #f9f9f9; padding: 5px; border-radius: 4px; border: 1px solid #eee;">
                ${Object.entries(principal).map(([k, v]) => {
      // specific filtering or ordering could go here
      const label = labels[k] || k;
      // Handle arrays (organizations/units are often arrays)
      const value = Array.isArray(v) ? v.join(", ") : v;

      return html`<div style="display: flex; margin-bottom: 2px; align-items: baseline;">
                        <span style="font-weight: bold; min-width: 60px; width: 60px; color: #666; font-size: 11px; margin-right: 5px;">${label}:</span>
                        <span style="flex: 1; word-break: break-all; font-family: monospace; font-size: 12px;">${value}</span>
                     </div>`;
    })}
            </div>
        `;
  }

  formatDate(seconds: number) {
    if (!seconds) return "Invalid Date";
    return new Date(seconds * 1000).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'medium'
    });
  }

  close() {
    this.dispatchEvent(new CustomEvent("close"));
  }
}

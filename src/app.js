import 'replaywebpage/src/pages';
import 'replaywebpage/src/sorter';
import 'replaywebpage/src/coll';
import 'replaywebpage/src/url-resources';
import 'replaywebpage/src/story';
import 'replaywebpage/src/replay';

import { registerSW } from 'replaywebpage/src/pageutils';

import { wrapCss } from 'replaywebpage/src/misc';

import { LitElement, html, css } from 'lit-element';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';

import { openDB } from 'idb/with-async-ittr.js';

import wrText from '../assets/webrecorder-text.svg';
import wrLogo from '../assets/wr-logo.svg';

const MAIN_DB_KEY = "main.archive";


//============================================================================
class ExtApp extends LitElement
{
  constructor() {
    super();

    this.sourceUrl = "local://archive";
    this.loadInfo = {customColl: MAIN_DB_KEY};

    registerSW("sw.js");
    this.initDB();
  }

  async initDB() {
    const colldb = await openDB("collDB", 1, {
      upgrade: (db, oldV, newV, tx) => {
        db.createObjectStore("colls", {keyPath: "name"});
      }
    });

    const data = {
      name: MAIN_DB_KEY,
      type: "archive",
      config: {
        dbname: MAIN_DB_KEY,
        decode: false,
        metadata: {"desc": "", "title": "Local Web Archive"},
        sourceUrl: this.sourceUrl
      }
    }

    await colldb.put("colls", data);
  }

  static get properties() {
    return {
      collInfo: { type: Object },
      query: { type: String },
      sourceUrl: { type: String }
    }
  }

  firstUpdated() {
    //this.doInit();
  }

  static get styles() {
    return wrapCss(css`
      :host {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
      }

      .wr-text {
        height: 64px;
        width: 150px;
        left: 0;
        position: absolute;
      }
    `);
  }

  render() {
    return html`
    <nav class="navbar has-background-info" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item wr-logo-item" title="Webrecorder" href="./main.html">
          <fa-icon id="wrlogo" size="2.5rem" .svg="${wrLogo}"></fa-icon>
        </a>
        <a role="button" @click="${this.onNavMenu}"
        class="navbar-burger burger ${this.navMenuShown ? 'is-active' : ''}" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="./main.html">
          <svg class="wr-text" style="width: 10rem"><g>${unsafeSVG(wrText)}</g></svg>
          </a>
        </div>
      </div>
    </nav>
    <wr-coll .editable="${true}" .loadInfo="${this.loadInfo}" sourceUrl="${this.sourceUrl}"></wr-coll>`;
  }
}

customElements.define('page-index-app', ExtApp);

export { ExtApp };
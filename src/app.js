import 'replaywebpage/src/pages';
import 'replaywebpage/src/pageentry';
import 'replaywebpage/src/sorter';
import 'replaywebpage/src/coll';
import 'replaywebpage/src/url-resources';
import 'replaywebpage/src/story';
import 'replaywebpage/src/replay';
import 'replaywebpage/src/coll-index';

import fasCircle from '@fortawesome/fontawesome-free/svgs/solid/circle.svg';

import { registerSW } from 'replaywebpage/src/pageutils';

import { wrapCss } from 'replaywebpage/src/misc';

import { LitElement, html, css } from 'lit-element';

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

    this.navMenuShown = false;

    registerSW("sw.js");
    this.inited = false;
    this.initDB();
  }

  async initDB() {
    const colldb = await openDB("collDB", 1, {
      upgrade: (db, oldV, newV, tx) => {
        db.createObjectStore("colls", {keyPath: "name"});
      }
    });

    let data = await colldb.get("colls", MAIN_DB_KEY);

    if (!data) {
      let baseUrl = new URL(window.location.href);
      baseUrl.hash = "";
      baseUrl = baseUrl.href;

      const data = {
        name: MAIN_DB_KEY,
        type: "archive",
        config: {
          dbname: MAIN_DB_KEY,
          decode: false,
          metadata: {"desc": "", "title": "My Web Archive"},
          sourceUrl: this.sourceUrl,
          extraConfig: {baseUrl}
        }
      }

      await colldb.put("colls", data);

      while (true) {
        try {
          const resp = await fetch(`./wabac/api/${MAIN_DB_KEY}?all=1`);
          if (resp.status === 200) {
            break;
          }
        } catch (e) {

        }
        await new Promise((resolve) => setTimeout(resolve, 100));
        console.log("Waiting for load...");
      }
    }

    this.inited = true;
  }

  static get properties() {
    return {
      collInfo: { type: Object },
      query: { type: String },
      sourceUrl: { type: String },
      navMenuShown: { type: Boolean },
      recordShown: { type: Boolean },
      inited: { type: Boolean }
    }
  }

  firstUpdated() {
    const hash = window.location.hash;

    if (hash) {
      const params = new URLSearchParams(hash.slice(1));
    }
  }

  static get styles() {
    return wrapCss(css`
      :host {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        display: flex;
        flex-direction: column;
        font-size: initial;
      }

      wr-coll {
        height: 100%;
        width: 100%;
      }

      .recorder .modal-background {
        background-color: rgba(10, 10, 10, 0.50);
      }

      .recorder .modal-card-head {
        background-color: #97a1ff;
      }

      .extra-padding {
        padding: 1.0em;
      }
      .less-padding {
        padding-top: 1.0em;
        padding-bottom: 1.0em;
      }

      div.field.has-addons {
        flex: auto;
      }
      form {
        flex-grow: 1;
        flex-shrink: 0;
        margin: 0px;
      }
  
      @media screen and (max-width: 768px) {
        #url {
          border-bottom-right-radius: 4px;
          border-top-right-radius: 4px;
        }
      }
    `);
  }

  render() {
    return html`
    <nav class="navbar has-background-info" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item wr-logo-item" title="Webrecorder" href="./index.html">
          <fa-icon id="wrlogo" size="2.5rem" .svg="${wrLogo}"></fa-icon>
        </a>
        <a role="button" @click="${(e) => this.navMenuShown = !this.navMenuShown}"
        class="navbar-burger burger ${this.navMenuShown ? 'is-active' : ''}" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu ${this.navMenuShown ? 'is-active' : ''}">
        <div class="navbar-start">
          <a class="navbar-item" href="./index.html">
            <fa-icon class="wr-text" width="10rem" size="" .svg="${wrText}"/>
          </a>
          <div class="navbar-item">
            <p class="control">
            <a class="button is-primary is-rounded is-small" @click="${(e) => this.recordShown = !this.recordShown}">
            <span class="icon"><fa-icon size="0.8em" .svg="${fasCircle}"></fa-icon></span><span>Start Recording...</span>
            </a>
            </p>
          </div>
        </div>
      </div>
    </nav>

    <div class="recorder modal ${this.recordShown ? 'is-active' : ''}">
      <div class="modal-background" @click="${(e) => this.recordShown = false}"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-3">Start Recording</p>
          <button class="delete" aria-label="close" @click="${(e) => this.recordShown = false}"></button>
        </header>
        <section class="modal-card-body">
          <form class="is-flex" @submit="${this.onStartRecord}">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="url" required
                name="url" id="url" value="https://example.com/"
                placeholder="Enter a URL to Start Recording">
              </p>
              <div class="control">
                <button type="submit" class="button is-hidden-mobile is-primary">Start</button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
    ${this.inited ? html`
    <wr-coll
      .editable="${true}"
      .loadInfo="${this.loadInfo}"
      appName="Webrecorder"
      .appLogo="${wrLogo}"
      sourceUrl="${this.sourceUrl}">
    </wr-coll>
    ` : html`
    <p class="loader"></p>`}`;
  }

  onStartRecord(event) {
    event.preventDefault();
    const url = this.renderRoot.querySelector("#url").value;
    
    this.recordShown = false;

    if (self.chrome && self.chrome.runtime) {
      chrome.runtime.sendMessage({"msg": "startNew", url});
    } else if (window.webrecorder && window.webrecorder.record) {
      window.webrecorder.record(url);
    }
    return false;
  }
}

customElements.define('page-index-app', ExtApp);

export { ExtApp };
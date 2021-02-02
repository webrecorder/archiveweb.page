import { ipcRenderer } from "electron";
import { RecPopup } from "../ext/popup";

import { CollectionLoader } from '@webrecorder/wabac/src/loaders';
import { listAllMsg } from "../utils";


// ===========================================================================
class AppRecPopup extends RecPopup
{
  constructor() {
    super();

    this.collLoader = new CollectionLoader();

    this.tabId = window.location.hash && Number(window.location.hash.slice(1));

    this.allowCreate = false;
  }

  static get properties() {
    return {
      ...RecPopup.properties
    }
  }

  firstUpdated() {
    super.firstUpdated();

    listAllMsg(this.collLoader).then((msg) => {
      this.onMessage(msg);
    });
  }

  registerMessages() {
    ipcRenderer.on("popup", (event, message) => {
      this.onMessage(message);
    });
  }

  sendMessage(message) {
    if (message.type === "newColl") {
      this.makeNewColl(message);
      return;
    }

    ipcRenderer.send("popup-msg-" + this.tabId, message);
  }

  async makeNewColl(message) {
    const newColl = await this.collLoader.initNewColl({title: message.title});

    localStorage.setItem("defaultCollId", newColl.name);

    const respMsg = await listAllMsg(this.collLoader);

    this.onMessage(respMsg);
  }

  get notRecordingMessage() {
    return "Not Recording this Window";
  }

  getHomePage() {
    return "replay/index.html";
  }

  get extRoot() {
    return "";
  }
}

customElements.define('wr-app-popup', AppRecPopup);
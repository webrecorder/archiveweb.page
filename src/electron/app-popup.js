//import { ipcRenderer } from "electron";
import { RecPopup } from "../popup";

import { CollectionLoader } from "@webrecorder/wabac/src/loaders";
import { listAllMsg } from "../utils";
import { setLocalOption } from "../localstorage";


// ===========================================================================
class AppRecPopup extends RecPopup
{
  constructor() {
    super();

    this.collLoader = new CollectionLoader();

    //this.tabId = 0;//window.location.hash && Number(window.location.hash.slice(1));

    this.allowCreate = false;

    this.msg = null;
  }

  static get properties() {
    return {
      ...RecPopup.properties,
      msg: { type: Object },
    };
  }

  firstUpdated() {
    super.firstUpdated();

    listAllMsg(this.collLoader).then((msg) => {
      this.onMessage(msg);
    });
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has("msg")) {
      this.onMessage(this.msg);
    }
  }

  registerMessages() {
    // ipcRenderer.on("popup", (event, message) => {
    //   this.onMessage(message);
    // });
  }

  sendMessage(message) {
    if (message.type === "newColl") {
      this.makeNewColl(message);
      return;
    }

    //ipcRenderer.send("popup-msg-" + this.tabId, message);
    this.dispatchEvent(new CustomEvent("send-msg", {detail: message}));
  }

  async makeNewColl(message) {
    const newColl = await this.collLoader.initNewColl({title: message.title});

    await setLocalOption("defaultCollId", newColl.name);

    const respMsg = await listAllMsg(this.collLoader);

    this.onMessage(respMsg);
  }

  get notRecordingMessage() {
    return "Not Recording this Window";
  }

  getHomePage() {
    return "index.html";
  }

  get extRoot() {
    return "";
  }
}

customElements.define("wr-app-popup", AppRecPopup);

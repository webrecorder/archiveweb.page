//import { ipcRenderer } from "electron";
import { RecPopup } from "../popup";

import { CollectionLoader } from "@webrecorder/wabac/swlib";
import { listAllMsg } from "../utils";
import { setLocalOption } from "../localstorage";

// ===========================================================================
class AppRecPopup extends RecPopup {
  constructor() {
    super();

    // @ts-expect-error - TS2339 - Property 'collLoader' does not exist on type 'AppRecPopup'.
    this.collLoader = new CollectionLoader();

    //this.tabId = 0;//window.location.hash && Number(window.location.hash.slice(1));

    // @ts-expect-error - TS2339 - Property 'allowCreate' does not exist on type 'AppRecPopup'.
    this.allowCreate = false;

    // @ts-expect-error - TS2339 - Property 'msg' does not exist on type 'AppRecPopup'.
    this.msg = null;
  }

  static get properties() {
    return {
      ...RecPopup.properties,
      msg: { type: Object },
    };
  }

  // @ts-expect-error - TS2416 - Property 'firstUpdated' in type 'AppRecPopup' is not assignable to the same property in base type 'RecPopup'.
  firstUpdated() {
    super.firstUpdated();

    // @ts-expect-error - TS2339 - Property 'collLoader' does not exist on type 'AppRecPopup'.
    listAllMsg(this.collLoader).then((msg) => {
      this.onMessage(msg);
    });
  }

  // @ts-expect-error - TS7006 - Parameter 'changedProperties' implicitly has an 'any' type.
  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has("msg")) {
      // @ts-expect-error - TS2339 - Property 'msg' does not exist on type 'AppRecPopup'.
      this.onMessage(this.msg);
    }
  }

  registerMessages() {
    // ipcRenderer.on("popup", (event, message) => {
    //   this.onMessage(message);
    // });
  }

  // @ts-expect-error - TS7006 - Parameter 'message' implicitly has an 'any' type.
  sendMessage(message) {
    if (message.type === "newColl") {
      this.makeNewColl(message);
      return;
    }

    //ipcRenderer.send("popup-msg-" + this.tabId, message);
    this.dispatchEvent(new CustomEvent("send-msg", { detail: message }));
  }

  // @ts-expect-error - TS7006 - Parameter 'message' implicitly has an 'any' type.
  async makeNewColl(message) {
    // @ts-expect-error - TS2339 - Property 'collLoader' does not exist on type 'AppRecPopup'.
    const newColl = await this.collLoader.initNewColl({ title: message.title });

    await setLocalOption("defaultCollId", newColl.name);

    // @ts-expect-error - TS2339 - Property 'collLoader' does not exist on type 'AppRecPopup'.
    const respMsg = await listAllMsg(this.collLoader);

    this.onMessage(respMsg);
  }

  get notRecordingMessage() {
    return "Not Archiving this Window";
  }

  getHomePage() {
    return "index.html";
  }

  get extRoot() {
    return "";
  }
}

customElements.define("wr-app-popup", AppRecPopup);

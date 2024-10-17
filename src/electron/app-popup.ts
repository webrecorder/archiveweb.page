//import { ipcRenderer } from "electron";
import { RecPopup } from "../popup";

import { CollectionLoader } from "@webrecorder/wabac/swlib";
import { listAllMsg } from "../utils";
import { setLocalOption } from "../localstorage";
import { type PropertyValues } from "lit";

// ===========================================================================
class AppRecPopup extends RecPopup {
  collLoader = new CollectionLoader();
  allowCreated = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  msg: any = null;

  static get properties() {
    return {
      ...RecPopup.properties,
      msg: { type: Object },
    };
  }

  firstUpdated(): Promise<void> {
    listAllMsg(this.collLoader).then((msg) => {
      this.onMessage(msg);
    });

    return super.firstUpdated();
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has("msg") && this.msg) {
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
    const newColl = await this.collLoader.initNewColl({ title: message.title });

    await setLocalOption("defaultCollId", newColl.name);

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

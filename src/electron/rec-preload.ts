/*eslint-env node */

const { ipcRenderer, contextBridge } = require("electron");

ipcRenderer.on("stats", (event, stats) => {
  window.postMessage({ stats }, window.location.origin);
});

contextBridge.exposeInMainWorld("archivewebpage", {
  // @ts-expect-error - TS7006 - Parameter 'id' implicitly has an 'any' type. | TS7006 - Parameter 'msg' implicitly has an 'any' type.
  sendMsg: (id, msg) => {
    ipcRenderer.send("popup-msg-" + id, msg);
  },
});

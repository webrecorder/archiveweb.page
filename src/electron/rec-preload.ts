/*eslint-env node */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer, contextBridge } = require("electron");

ipcRenderer.on("stats", (event, stats) => {
  window.postMessage({ stats }, window.location.origin);
});

contextBridge.exposeInMainWorld("archivewebpage", {
  sendMsg: (id, msg) => {
    ipcRenderer.send("popup-msg-" + id, msg);
  },
});

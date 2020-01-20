
if (!navigator.serviceWorker.controller) {
  navigator.serviceWorker.register("sw.js", {scope: "/"});
}


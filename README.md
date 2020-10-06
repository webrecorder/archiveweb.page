## Web Archiving Extension

An extension for personal web archiving directly in the browser for Chromium-based browsers!

Stay tuned for more info.

### Architecture

The extension extends the [ReplayWeb.page](https://github.com/webrecorder/replayweb.page) UI and the [wabac.js](https://github.com/ikreymer/wabac.js) service worker for replay.

The extension uses the `chrome.debugger` apis to allow capture of network traffic.

### Install

The extension is found in the `./wr-ext` directory and can be loaded directly in the browser.

Requires Node 10+ and Yarn (recommended)

1. Run `yarn install` to install and `yarn run build` to rebuild.

2. Note: to automatically rebuild extension when source files changes using webpack, run `yarn run start-ext`

2. From `chrome://extensions`, choose 'Load Unpacked Extension' and point to `./wr-ext`

3. Click the Webrecorder icon to start recording. An infobar with 'Webrecorder is debugging this page message' will appear with a cancel option. Press cancel to stop.

4. Right click in the page and select 'View Recordings' to view list of archived pages in the browser. You can also click 'Start Recording' to start a new capture in a new tab.


NOTE: this is **very experimental** and requires additional work to be ready. Do not use for any archiving needs at this time.

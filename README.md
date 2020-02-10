## Web Archiving Extension

An extension for personal web archiving directly in the browser for Chromium-based browsers!

Stay tuned for more info.

### Architecture

The extension uses the `chrome.debugger` apis to allow capture of network traffic.

The extension uses an embedded [wabac.js](https://github.com/ikreymer/wabac.js) for replay.

### Install

Requires Node 10+

1. Run `./build.sh` to build the extension and the wabac.js submodule. (The submodule is built by calling `./build-replay.sh`)

2. In the browser, load `./wr-ext` which contains the extension directory.

3. Click the 'W' icon to start recording. An infobar with 'Webrecorder is debugging this page message' will appear with a cancel option. Press cancel to stop.

4. Right click in the page and select 'View Recordings' to view list of archived pages in the browser.


NOTE: this is **very experimental** and requires additional work to be ready. Do not use for any archiving needs at this time.

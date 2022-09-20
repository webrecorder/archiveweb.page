# ArchiveWeb.page Interactive Archiving Extension and Desktop App

<p align="center"><img src="/assets/awp-logo.svg" width="96" height="96"></p>

ArchiveWeb.page is a JavaScript based system for high-fidelity web archiving directly in the browser.
The system can be used as a Chrome/Chromium based browser extension and also as an Electron app.

The system creates, stores and replays high-fidelity web archives stored directly in the browser (via IndexedDB).

For more detailed info on how to use the extension (and the app when it is available), see the: [ArchiveWeb.page User Guide](https://archiveweb.page/guide)

The initial app release is available on the [Releases page](https://github.com/webrecorder/archiveweb.page/releases)

### Architecture

The extension makes use of the Chrome debugging protocol to capture and save network traffic, and extends the [ReplayWeb.page](https://github.com/webrecorder/replayweb.page) UI and the [wabac.js](https://github.com/ikreymer/wabac.js) service worker system for replay and storage.

The codebase for the extension and Electron app is shared, but they can be deployed in different ways.


### Requirements Building

To developer ArchiveWeb.page, Node 12+ and Yarn are needed.

## Using the Extension

The production version of the extension is published to the [Chrome Web Store](https://chrome.google.com/webstore/detail/webrecorder/fpeoodllldobpkbkabpblcfaogecpndd)

For development, the extension can be installed from the `wr-ext` directory as an unpacked extension.
If you want to make changes to the extension, it should be installed in this way. This will be a different version than the production version of the extension.

1. Clone this repo

2. Open the Chrome Extensions page (chrome://extensions).

3. Choose 'Load Unpacked Extension' and point to the `./wr-ext` directory in your local copy of this repo.

4. Click the extension icon to show the extension popup, start recording, etc...

### Development Workflow

For development, it is recommended to use the dev build of the extension:

1. Run ``yarn install`` and then ``yarn run build-dev`

2. Run ``yarn run start-ext`` -- this will ensure the `wr-ext` directory is rebuilt after any changes to the source.

3. After making changes, the extension still needs to be reloaded in the browser. From the Chrome extensions page, click the reload button to load the latest version.

4. Click the extension icon to show the extension popup, start recording, etc... The dev build of the extension will be grey to differntiate from the production version.


## Using the Electron App (in beta)

The Electron app version is in beta and the latest release can be downloaded from the [Releases page](https://github.com/webrecorder/archiveweb.page/releases)

To run the Electron app development build:

1. Clone this repo.

2. Run ``yarn install`` and then ``yarn run build-dev``

3. Run ``yarn run start-electron`` to start the app.

The Electron App version will open recording in a new window. It is is designed to support Flash, better support for IPFS sharing.
However, it is still in development and may not work yet until the initial release is out.


### Development workflow

After making changes, rerun ``yarn run build-dev`` and ``yarn run start-electron`` to load the app.

### Standalone Build

To create a platform-specific binary, run:

``yarn run pack``

The standalone app will then be available in the `./dist/` directory.


<h1>
    <div align="center">
        <img alt="ArchiveWebpage" src="src/assets/brand/archivewebpage-lockup-color-dynamic.svg" width="90%">
    </div>
</h1>

ArchiveWeb.page is a JavaScript based application for interactive, high-fidelity web archiving that runs directly in the browser. The system can be used as a Chrome/Chromium based browser extension and also as a standalone Electron app.

The system creates, stores, and replays high-fidelity web archives stored directly in the browser's storage (via IndexedDB).

For more detailed info on how to use the extension and standalone app, see the [ArchiveWeb.page User Guide](https://archiveweb.page/guide).

The browser extension is available on the [Chrome Web Store](https://chrome.google.com/webstore/detail/webrecorder/fpeoodllldobpkbkabpblcfaogecpndd).

Downloads for the desktop are are available on the [GitHub Releases page](https://github.com/webrecorder/archiveweb.page/releases).

## Architecture

The extension makes use of the Chrome debugging protocol to capture and save network traffic, and extends the [ReplayWeb.page](https://github.com/webrecorder/replayweb.page) UI and the [wabac.js](https://github.com/webrecorder/wabac.js) service worker system for replay and storage.

The codebase for the extension and Electron app is shared, but they can both be deployed in different ways.

## Building for Development

To develop ArchiveWeb.page, install Node 12+ and Yarn.

### Install the Development Extension

For development, the extension can be built locally and loaded as an unpacked extension. If you want to make changes to the extension, do the following:

1. Clone this repo. Run `yarn install; yarn build-dev`. (You can also run `yarn build` to build the production version but it may be harder to debug).

2. Open the Chrome Extensions page ([chrome://extensions](chrome://extensions)).

3. Choose 'Load Unpacked Extension' and point to the `./dist/ext` directory in your local copy of this repo.

4. Click the extension icon to show the extension popup, start archiving, etc...

### Development Workflow (Extension)

For development, it is recommended to use the dev build of the extension:

1. Run `yarn install` and then `yarn run build-dev`

2. Run `yarn run start-ext` -- this will ensure the `dist/ext` directory is rebuilt after any changes to the source.

3. After making changes, the extension still needs to be reloaded in the browser. From the Chrome extensions page, click the reload button to load the latest version.

4. Click the extension icon to show the extension popup, start recording, etc... The dev build of the extension will be grey to differntiate from the production version.

### Using the Electron App

To run the Electron app development build:

1. Clone this repo.

2. Run `yarn install` and then `yarn run build-dev`

3. Run `yarn run start-electron` to start the app.

The Electron App version will open recording in a new window. It is is designed to support Flash, better support for IPFS sharing.

### Development workflow (Electron App)

After making changes, rerun `yarn run build-dev` and `yarn run start-electron` to load the app.

## Standalone Build

To create a platform-specific binary, run:

`yarn run pack`

The standalone app will then be available in the `./dist/` directory.

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

## Development

The Chromium extension and Electron app are built from the same source code for ease of development.

### Prerequisites

- Node >=12
- Yarn Classic (v1)

### Installation

To build the extension or Electron app locally for development, do the following:

1. Clone this repo:
   ```sh
   git clone https://github.com/webrecorder/archiveweb.page.git
   ```
2. Change the working directory:
   ```sh
   cd archiveweb.page
   ```
3. Install dependencies:
   ```sh
   yarn install
   ```
4. Make development build:
   ```sh
   yarn build-dev
   ```

The development build can now be used to develop the extension or Electron app.

### Developing the Chromium extension

To install the extension locally, load the development build as an unpacked extension:

1. Open the Chrome Extensions page ([chrome://extensions](chrome://extensions)).

2. Choose 'Load Unpacked Extension' and point to the `./dist/ext` directory in your local copy of this repo.

3. Click the extension icon to show the extension popup, start archiving, etc...

#### Update extension on code changes

To watch source code files and recompile the development build on change, run:

```sh
yarn run start-ext
```

Now, saving changes to source will automatically rebuild the `dist/ext` directory.

After making changes, the extension still needs to be reloaded in the browser.

1. From the Chrome extensions page, click the reload button to load the latest version.

2. Click the extension icon to show the extension popup, start recording, etc... The dev build of the extension will be a different color from the production version.

### Developing the Electron app

To start the Electron app using development build:

```sh
yarn run start-electron
```

The Electron app will open recording in a new window. It is is designed to support Flash, better support for IPFS sharing.

#### Update app on change

Currently, the dev workflow for the Electron app does not support automatically rebuilding on file changes.

After making changes, rerun `yarn run build-dev` and `yarn run start-electron` to view your changes in the app.

## Standalone Build

To create a platform-specific binary, run:

```sh
yarn run pack
```

The standalone app will then be available in the `./dist/` directory.

## Web Archiving Extension

An extension for personal web archiving directly in the browser for Chromium-based browsers!

Stay tuned for more info.

### Architecture

The extension extends the [ReplayWeb.page](https://github.com/webrecorder/replayweb.page) UI and the [wabac.js](https://github.com/ikreymer/wabac.js) service worker for replay.

The extension uses the `chrome.debugger` apis to allow capture of network traffic.

### Running

The extension is pre-build and can be found in the `./wr-ext` directory and can be loaded directly in the browser. To use:

1. Clone this repo

2. Open the Chrome Extensions page.

3. Choose 'Load Unpacked Extension' and point to the `./wr-ext` directory in your local copy of this repo.

4. Click the extensions menu to see the Webrecorder icon. For easier access, select Pin to pin the extension.

5. Click the Webrecorder icon to see a popup menu. From here, you can click 'Start' to begin recording.

   An infobar with 'Webrecorder is debugging this page' message will appear with a cancel option.
  
6. Browse any pages that you wish to record! The status indicator for the extension will be green when extension is active,
   and yellow when it is in the process of saving URLs.
   
   
7. To view status of recording, click the Webrecorder icon again to see real-time updates.
    
8. To stop recording, click on 'Stop' from the Webrecorder popup (recommended), or click cancel on the 'Webrecorder is debugging this page' message.

9. From the popup, you can also click on 'View Recorded Page' to see the replay in a new tab, or click 'All Recorded Pages' to see the full collection.


### Build Locally

To update or build the installation locally, Node 12+ and yarn are required.

1. Run `yarn install` to install and `yarn run build` to rebuild.

2. Note: to automatically rebuild extension when source files changes using webpack, run `yarn run start-ext`

3. Follow the instructions above to load the extension, or if already loaded, click 'Reload' from the extensions page.


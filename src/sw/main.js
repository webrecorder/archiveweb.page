import { SWReplay } from '@webrecorder/wabac/src/swmain';

import { ExtAPI } from './api';

const defaultConfig = {
  injectScripts: ["/replay/static/js_//ruffle/ruffle.js"],
  baseUrlSourcePrefix: "/replay/index.html"
};

self.sw = new SWReplay({ApiClass: ExtAPI, defaultConfig});

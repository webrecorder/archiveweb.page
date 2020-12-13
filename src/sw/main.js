import { SWReplay } from '@webrecorder/wabac/src/swmain';

import { ExtAPI } from './api';

self.sw = new SWReplay(null, ExtAPI, false);

import "../globals";

import type { BrowserRecorder } from "./browser-recorder";

declare global {
  interface Window {
    recorders: Record<string, BrowserRecorder>;
    newRecId: string | null;
  }
  let chrome: TODOFixMe;
}

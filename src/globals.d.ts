declare module "*.svg";
declare module "*.html";
declare module "*.scss";
declare module "*.sass";
declare module "@/static/extractPDF.js";
declare const __SW_NAME__: string;
declare const __HELPER_PROXY__: string;
declare const __GDRIVE_CLIENT_ID__: string;
declare const __AWP_VERSION__: string;
declare const __VERSION__: string;
declare const __WEB3_STORAGE_TOKEN__: string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type TODOFixMe = any;

declare const pdfjsLib: TODOFixMe;

interface Window {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  archivewebpage?: import("./electron/electron-rec-preload").GlobalAPI;
}

/* eslint-env node */
/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const GenerateJsonPlugin = require("generate-json-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const AWP_PACKAGE = require("./package.json");
const RWP_PACKAGE = require("./node_modules/replaywebpage/package.json");
const WARCIO_PACKAGE = require("./node_modules/warcio/package.json");

const BANNER = `[name].js is part of the Webrecorder ArchiveWeb.page (https://archiveweb.page) Copyright (C) 2020-${new Date().getFullYear()}, Webrecorder Software. Licensed under the Affero General Public License v3.`;

const manifest = require("./src/ext/manifest.json");

const defaultDefines = {
  __AWP_VERSION__: JSON.stringify(AWP_PACKAGE.version),
  __VERSION__: JSON.stringify(RWP_PACKAGE.version),
  __WARCIO_VERSION__: JSON.stringify(WARCIO_PACKAGE.version),
  __SW_NAME__: JSON.stringify("sw.js"),
  __WEB3_STORAGE_TOKEN__: JSON.stringify(""),
};

const DIST_EXT = path.join(__dirname, "dist", "ext");
const DIST_ELECTRON = path.join(__dirname, "dist", "electron");
const DIST_EMBED = path.join(__dirname, "dist", "embed");

/** @type {import('webpack').Configuration['module']} */
const moduleSettings = {
  rules: [
    {
      test: /\.tsx?$/,
      loader: "ts-loader",
      options: {
        onlyCompileBundledFiles: true,
      },
    },
    {
      test: /\.svg$/,
      use: "svg-inline-loader",
    },
    {
      test: /\.s(a|c)ss$/,
      use: ["css-loader", "sass-loader"],
    },
    {
      test: /(dist\/wombat.js|src\/wombatWorkers.js|behaviors.js|extractPDF.js|ruffle.js|index.html)$/i,
      use: "raw-loader",
    },
  ],
};

/** @type {import('webpack').Configuration['optimization']} */
const optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      extractComments: false,
    }),
  ],
};

/** @type {import('webpack').Configuration['resolve']} */
const resolve = {
  extensions: [".ts", ".js"],
  plugins: [new TsconfigPathsPlugin()],
};

// ===========================================================================
/** @returns {import('webpack').Configuration} */
const electronMainConfig = (/*env, argv*/) => {
  return {
    target: "electron-main",
    mode: "production",
    entry: {
      electron: "./src/electron/electron-rec-main.ts",
    },
    optimization,
    output: {
      path: DIST_ELECTRON,
      filename: "[name].js",
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    plugins: [
      new webpack.DefinePlugin(defaultDefines),
      new webpack.BannerPlugin(BANNER),
      new CopyPlugin({
        patterns: [{ from: "build/extra_prebuilds/", to: "prebuilds" }],
      }),
    ],
    module: moduleSettings,
    resolve,
  };
};

// ===========================================================================
/** @returns {import('webpack').Configuration} */
const electronPreloadConfig = (/*env, argv*/) => {
  return {
    target: "electron-preload",
    mode: "production",
    entry: {
      preload: "./src/electron/electron-rec-preload.ts",
      "rec-preload": "./src/electron/rec-preload.ts",
    },
    optimization,
    output: {
      path: DIST_ELECTRON,
      filename: "[name].js",
    },
    plugins: [new webpack.DefinePlugin(defaultDefines)],
    module: moduleSettings,
    resolve,
  };
};

// ===========================================================================
/**
 * @param {string} outputPath
 * @param {Object} [param1={}]
 * @param {import('webpack').Configuration['plugins']} [param1.plugins=[]]
 * @param {import('copy-webpack-plugin').CopyPlugin['Configuration']['patterns']} [param1.copy=[]]
 * @param {import('webpack').Configuration['entry']} [param1.entry={}]
 * @param {Partial<import('webpack').Configuration>} [param1.extra={}]
 * @param {Partial<import('webpack').Configuration['target']>} [param1.target={}]
 * @param {boolean} [param1.flat=false]
 * @returns {import('webpack').Configuration}
 */
function sharedBuild(
  outputPath,
  {
    plugins = [],
    copy = [],
    entry = {},
    extra = {},
    replayDir = false,
    target = "web",
  } = {},
  argv,
) {
  if (copy.length) {
    plugins.push(new CopyPlugin({ patterns: copy }));
  }

  return {
    mode: "production",
    target,
    entry: {
      ui: "./src/ui/app.ts",
      sw: "./src/sw/main.ts",
      ...entry,
    },
    devtool: argv.mode === "production" ? undefined : "inline-source-map",
    optimization: argv.mode === "production" ? optimization : undefined,
    output: {
      path: outputPath,
      filename: (chunkData) => {
        const name = "[name].js";

        switch (chunkData.chunk.name) {
          case "sw":
            return replayDir ? `./replay/${name}` : name;

          default:
            return name;
        }
      },
      libraryTarget: "global",
      globalObject: "self",
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/^node:*/, (resource) => {
        switch (resource.request) {
          case "node:stream":
            resource.request = "stream-browserify";
            break;
        }
      }),
      new webpack.ProvidePlugin({
        process: "process/browser.js",
        Buffer: ["buffer", "Buffer"],
      }),
      new MiniCssExtractPlugin(),
      new webpack.BannerPlugin(BANNER),
      new webpack.DefinePlugin({ ...defaultDefines }),
      ...plugins,
    ],

    module: moduleSettings,
    resolve,
    ...extra,
  };
}

// ===========================================================================
const extensionWebConfig = (env, argv) => {
  const icon = argv.mode === "production" ? "icon.png" : "icon-dev.png";

  const generateManifest = (name, value) => {
    switch (value) {
      case "$VERSION":
        return AWP_PACKAGE.version;

      case "$ICON":
        return icon;
    }

    return value;
  };

  const plugins = [
    new GenerateJsonPlugin("manifest.json", manifest, generateManifest, 2),
  ];

  const copy = [
    { from: "static", to: "./" },
    { from: "ruffle", to: "./ruffle/" },
  ];

  const entry = {
    bg: "./src/ext/bg.ts",
    popup: "./src/popup.ts",
  };

  return sharedBuild(DIST_EXT, { plugins, copy, entry }, argv);
};

// ===========================================================================
const electronWebConfig = (env, argv) => {
  const entry = {
    "rec-window": "./src/electron/rec-window.ts",
  };

  const copy = [
    { from: "static/", to: "./" },
    { from: "ruffle", to: "./ruffle/" },
    { from: "src/electron/rec-window.html", to: "" },
  ];

  return sharedBuild(DIST_ELECTRON, { copy, entry }, argv);
};

// ===========================================================================
const embedWebConfig = (env, argv) => {
  const copy = [{ from: "src/embed.html", to: "./index.html" }];

  const extra = {
    devServer: {
      compress: true,
      port: 10001,
      open: true,
      static: {
        directory: DIST_EMBED,
      },
    },
  };

  const replayDir = true;

  return sharedBuild(DIST_EMBED, { copy, extra, replayDir }, argv);
};

// ===========================================================================
module.exports = [
  extensionWebConfig,
  electronWebConfig,
  embedWebConfig,
  electronMainConfig,
  electronPreloadConfig,
];

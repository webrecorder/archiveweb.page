/*eslint-env node */

const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const GenerateJsonPlugin = require("generate-json-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const AWP_PACKAGE = require("./package.json");
const RWP_PACKAGE = require("./node_modules/replaywebpage/package.json");
const WARCIO_PACKAGE = require("./node_modules/warcio/package.json");

const BANNER = "[name].js is part of the Webrecorder Extension (https://replayweb.page) Copyright (C) 2020-2021, Webrecorder Software. Licensed under the Affero General Public License v3.";

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


const moduleSettings =  {
  rules: [
    {
      test:  /\.svg$/,
      use: "svg-inline-loader"
    },
    {
      test: /\.s(a|c)ss$/,
      use: ["css-loader", "sass-loader"]
    },
    {
      test: /(dist\/wombat.js|src\/wombatWorkers.js|behaviors.js|extractPDF.js|ruffle.js|index.html)$/i,
      use: "raw-loader",
    }
  ]
};

const optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      extractComments: false,
    }),
  ],
};


// ===========================================================================
const electronMainConfig = (/*env, argv*/) => {
  return {
    target: "electron-main",
    mode: "production",
    entry: {
      "electron": "./src/electron/electron-rec-main.js",
    },
    optimization,
    output: {
      path: DIST_ELECTRON,
      filename: "[name].js"
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    plugins: [
      new webpack.DefinePlugin(defaultDefines),
      new webpack.BannerPlugin(BANNER),
      new CopyPlugin({
        patterns: [
          { from: "build/extra_prebuilds/", to: "prebuilds" },
        ],
      }),
    ],
    module: moduleSettings,
  };
};


// ===========================================================================
const electronPreloadConfig = (/*env, argv*/) => {
  return {
    target: "electron-preload",
    mode: "production",
    entry: {
      "preload": "./src/electron/electron-rec-preload.js",
    },
    optimization,
    output: {
      path: DIST_ELECTRON,
      filename: "[name].js"
    },
    plugins: [
      new webpack.DefinePlugin(defaultDefines),
    ]
  };
};


// ===========================================================================
function sharedBuild(outputPath, {plugins = [], copy = [], entry = {}, extra = {}, flat = false} = {}) {
  if (copy.length) {
    plugins.push(new CopyPlugin({patterns: copy}));
  }

  return {
    mode: "production",
    target: "web",
    entry: {
      "ui": "./src/ui/app.js",
      "sw": "./src/sw/main.js",
      ...entry
    },
    optimization,
    //resolve: {fallback},
    output: {
      path: outputPath,
      filename: (chunkData) => {
        const name = "[name].js";
        const replayName = "./replay/" + name;

        switch (chunkData.chunk.name) {
        case "ui":
          return flat ? name : replayName;

        case "sw":
          return replayName;

        default:
          return name;
        }
      },
      libraryTarget: "global",
      globalObject: "self"
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /^node:*/,
        (resource) => {
          switch (resource.request) {
          case "node:stream":
            resource.request = "stream-browserify";
            break;
          }
        },
      ),
      new webpack.ProvidePlugin({
        process: "process/browser.js",
        Buffer: ["buffer", "Buffer"],
      }),
      new MiniCssExtractPlugin(),
      new webpack.BannerPlugin(BANNER),
      new webpack.DefinePlugin({...defaultDefines}),
      ...plugins
    ],

    module: moduleSettings,
    ...extra
  };
}


// ===========================================================================
const extensionWebConfig = (env, argv) => {
  const icon = (argv.mode === "production") ? "icon.png" : "icon-dev.png";

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
    new GenerateJsonPlugin("manifest.json", manifest, generateManifest, 2)
  ];

  const copy = [
    { from: "src/static/", to: "./" },
  ];

  const entry = {
    "bg": "./src/ext/bg.js",
    "popup": "./src/popup.js"
  };

  return sharedBuild(DIST_EXT, {plugins, copy, entry});
};


// ===========================================================================
const electronWebConfig = (/*env, argv*/) => {
  const entry = {
    "rec-window": "./src/electron/rec-window.js"
  };

  const copy = [
    { from: "src/static/", to: "./" },
    { from: "src/electron/rec-preload.js", to: "" },
    { from: "src/electron/rec-window.html", to: "" },
  ];

  return sharedBuild(DIST_ELECTRON, {copy, entry});
};

// ===========================================================================
const embedWebConfig = (/*env, argv*/) => {
  const copy = [
    { from: "src/embed.html", to: "./index.html" },
  ];

  const extra = {
    devServer: {
      compress: true,
      port: 10001,
      open: true,
      static:  path.join(__dirname),
    }
  };

  const flat = true;

  return sharedBuild(DIST_EMBED, {copy, extra, flat});
};




// ===========================================================================
module.exports = [ extensionWebConfig, electronWebConfig, embedWebConfig, electronMainConfig, electronPreloadConfig ];


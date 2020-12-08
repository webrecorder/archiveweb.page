const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtensionReloader  = require('webpack-extension-reloader');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PACKAGE = require("./package.json");

//const WEBVIEW_PRELOAD_PATH = "file:webview-preload.js";
const WEBVIEW_PRELOAD_PATH = path.join(__dirname, 'src', 'webview-preload.js');

const BANNER = '[name].js is part of the Webrecorder Extension (https://replayweb.page) Copyright (C) 2020, Webrecorder Software. Licensed under the Affero General Public License v3.';

const manifest = require("./src/ext/manifest.json");

const moduleSettings =  {
  rules: [
  {
    test:  /\.svg$/,
    loader: 'svg-inline-loader'
  },
  {
    test: /\.s(a|c)ss$/,
    loaders: ['to-string-loader', 'css-loader', 'sass-loader']
  },
  {
    test: /(dist\/wombat.js|src\/wombatWorkers.js|autofetcher.js)$/i,
    loaders: 'raw-loader',
  }
]};


const electronMainConfig = (env, argv) => {
  return {
    target: 'electron-main',
    mode: 'production',
    entry: {
      'electron': './src/electron/electron-rec-main.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    plugins: [
      new webpack.DefinePlugin({
        __WEBVIEW_PRELOAD_PATH__: JSON.stringify(WEBVIEW_PRELOAD_PATH)
      //  __APP_FILE_SERVE_PREFIX__ : JSON.stringify(APP_FILE_SERVE_PREFIX),
      //  __HELPER_PROXY__ : JSON.stringify(HELPER_PROXY)
      }),
      new webpack.BannerPlugin(BANNER),
    ],
    externals: {
      "bufferutil": "bufferutil",
      "utf-8-validate": "utf-8-validate",
    },
    module: moduleSettings,
  }
};


const electronPreloadConfig = (env, argv) => {
  return {
    target: 'electron-preload',
    mode: 'production',
    entry: {
      'preload': './src/electron/electron-rec-preload.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
  }
};

const electronRendererConfig = (env, argv) => {
  return {
    mode: 'production',
    target: "electron-renderer",
    entry: {
      'locationbar': './src/electron/locationbar.js',
    },

    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      libraryTarget: 'global',
      globalObject: 'self'
    },

    plugins: [
      new MiniCssExtractPlugin(),
    ],

    module: moduleSettings,
  }
};


const extensionConfig = (env, argv) => {
  const icon = (argv.mode === "production") ? "icon.png" : "icon-dev.png";

  const generateManifest = (name, value) => {
    switch (value) {
      case "$VERSION":
        return PACKAGE.version;

      case "$ICON":
        return icon;
    }

    return value;
  };

  return {
    mode: 'production',
    target: "web",
    entry: {
      'bg': './src/ext/bg.js',
      'app': './src/app.js',
      'popup': './src/ext/popup.js',
      'sw': '@webrecorder/wabac/src/sw.js'
    },
    output: {
      path: path.join(__dirname, 'wr-ext'),
      filename: (chunkData) => {
        return chunkData.chunk.name === 'popup' ? '[name].js': './replay/[name].js';
      },
      libraryTarget: 'global',
      globalObject: 'self'
    },

    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(PACKAGE.version)
      }),
      new webpack.BannerPlugin(BANNER),
      new GenerateJsonPlugin('manifest.json', manifest, generateManifest, 2),
      new webpack.DefinePlugin({
        __SW_NAME__: JSON.stringify("sw.js"),
        __IPFS_CORE_URL__: JSON.stringify("/ipfs-core.min.js")
      }),
      new CopyPlugin({
        patterns: [
          { from: 'node_modules/ipfs-core/dist/index.min.js', to: 'ipfs-core.min.js' },
        ]
      })
    ],

    module: moduleSettings,
  }
};


module.exports = [ extensionConfig, electronRendererConfig, electronMainConfig, electronPreloadConfig ];


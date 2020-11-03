const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtensionReloader  = require('webpack-extension-reloader');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');

const PACKAGE = require("./package.json");

//const WEBVIEW_PRELOAD_PATH = "file:webview-preload.js";
const WEBVIEW_PRELOAD_PATH = path.join(__dirname, 'src', 'webview-preload.js');

const BANNER = '[name].js is part of the Webrecorder Extension (https://replayweb.page) Copyright (C) 2020, Webrecorder Software. Licensed under the Affero General Public License v3.';

const manifest = require("./src/manifest.json");

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
      'electron': './src/electron-rec-main.js',
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
    module: moduleSettings,
  }
};


const electronPreloadConfig = (env, argv) => {
  return {
    target: 'electron-preload',
    mode: 'production',
    entry: {
      'preload': './src/electron-rec-preload.js',
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
      'locationbar': './src/locationbar.js',
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
      'bg': './src/bg.js',
      'app': './src/app.js',
      'popup': './src/popup.js',
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
        __VERSION__: JSON.stringify('1.0.0')
      }),
      new webpack.BannerPlugin(BANNER),
      new GenerateJsonPlugin('manifest.json', manifest, generateManifest, 2)
    ],

    module: moduleSettings,
  }
};


module.exports = [ extensionConfig, electronRendererConfig, electronMainConfig, electronPreloadConfig ];


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
    ]
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

const popupConfig = (env, argv) => {
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
      'popup': './src/popup.js',
    },

    output: {
      path: path.join(__dirname, 'wr-ext'),
      filename: '[name].js',
      libraryTarget: 'global',
      globalObject: 'self'
    },

    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.BannerPlugin(BANNER),
      new GenerateJsonPlugin('manifest.json', manifest, generateManifest, 2)
    ],

    module: {
      rules: [
      {
        test:  /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /.*sass$/,
        loaders: ['to-string-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /(dist\/wombat.js|src\/wombatWorkers.js)$/i,
        loaders: 'raw-loader',
      }
     ]
    }
  }
};

const browserConfig = (env, argv) => {
  return {
    mode: 'production',
    target: "web",
    entry: {
      'bg': './src/bg.js',
      'app': './src/app.js',
      'sw': '@webrecorder/wabac/src/sw.js'
    },
    output: {
      path: path.join(__dirname, 'wr-ext', 'replay'),
      filename: '[name].js',
      libraryTarget: 'global',
      globalObject: 'self'
    },

    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify('1.0.0')
      }),
      new webpack.BannerPlugin(BANNER),
    ],

    module: {
      rules: [
      {
        test:  /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /base.scss$/,
        loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /main.scss$/,
        loaders: ['to-string-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /(dist\/wombat.js|src\/wombatWorkers.js|autofetcher.js)$/i,
        loaders: 'raw-loader',
      }
     ]
    }
  }
};


module.exports = [ browserConfig, popupConfig, electronMainConfig, electronPreloadConfig ];


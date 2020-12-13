const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtensionReloader  = require('webpack-extension-reloader');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PACKAGE = require("./package.json");

const IPFS_CORE_URL = "/ipfs-core.min.js";

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
    resolve: {
      alias: {
        "abort-controller": "abort-controller/dist/abort-controller.js",
        "dlv": "dlv/dist/dlv.js",
        "bignumber.js": "bignumber.js/bignumber.js"
      }
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
        __IPFS_CORE_URL__: JSON.stringify("")
      }),
      new webpack.BannerPlugin(BANNER),
      new CopyPlugin({
        patterns: [
          { from: 'wr-ext/replay/', to: 'replay/' },
          { from: 'node_modules/bcrypto/build/Release/bcrypto.node', to: 'build' },
          { from: 'node_modules/leveldown/prebuilds/', to: 'prebuilds' },
        ],
      }),
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
    plugins: [
      // this needs to be defined, but not actually used, as electron app uses
      // ipfs-core from node
      new webpack.DefinePlugin({
        __IPFS_CORE_URL__: JSON.stringify("")
      }),
    ]
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
      new CopyPlugin({
        patterns: [
          { from: 'src/electron/locbar.html', to: '' },
        ]
      })
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
      'ui': './src/ui.js',
      'popup': './src/ext/popup.js',
      'sw': './src/sw/main.js'
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
        __IPFS_CORE_URL__: JSON.stringify(IPFS_CORE_URL)
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


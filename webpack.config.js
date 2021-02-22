const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtensionReloader  = require('webpack-extension-reloader');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const APP_FILE_SERVE_PREFIX = "http://files.replayweb.page/";
const PACKAGE = require("./package.json");
const WARCIO_PACKAGE = require("./node_modules/warcio/package.json");

const IPFS_CORE_URL = "/ipfs-core.min.js";

const BANNER = '[name].js is part of the Webrecorder Extension (https://replayweb.page) Copyright (C) 2020-2021, Webrecorder Software. Licensed under the Affero General Public License v3.';

const manifest = require("./src/ext/manifest.json");


const moduleSettings =  {
  rules: [
  {
    test:  /\.svg$/,
    loader: 'svg-inline-loader'
  },
  {
    test: /\.s(a|c)ss$/,
    use: ['to-string-loader', 'css-loader', 'sass-loader']
  },
  {
    test: /(dist\/wombat.js|src\/wombatWorkers.js|autofetcher.js|ruffle.js)$/i,
    use: 'raw-loader',
  }
]};

const fallbackResolves = {
  /*
  Module not found: Error: Can't resolve 'stream' in 'archiveweb.page/node_modules/wbn/node_modules/cbor/vendor/binary-parse-stream'

    BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
    This is no longer the case. Verify if you need this module and configure a polyfill for it.

    If you want to include a polyfill, you need to:
      - add a fallback 'resolve.fallback: { "stream": require.resolve("stream-browserify") }'
      - install 'stream-browserify'
    If you don't want to include a polyfill, you can use an empty module like this:
      resolve.fallback: { "stream": false }
  */
  // these handpicked from https://github.com/Richienb/node-polyfill-webpack-plugin/blob/master/index.js
  stream: require.resolve("stream-browserify"),
  util: require.resolve("util"),
  buffer: require.resolve("buffer"),
  process: "process/browser"
}


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
      },
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
        __IPFS_CORE_URL__: JSON.stringify(""),
        __APP_FILE_SERVE_PREFIX__ : JSON.stringify(APP_FILE_SERVE_PREFIX),
      }),
      new webpack.BannerPlugin(BANNER),
      new CopyPlugin({
        patterns: [
          { from: 'wr-ext/replay/', to: 'replay/' },
          { from: 'wr-ext/ruffle/', to: 'ruffle/' },
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
        __IPFS_CORE_URL__: JSON.stringify(""),
        __APP_FILE_SERVE_PREFIX__ : JSON.stringify(APP_FILE_SERVE_PREFIX),
      }),
    ]
  }
};

const electronRendererConfig = (env, argv) => {
  return {
    mode: 'production',
    target: "web",
    entry: {
      'rec-window': './src/electron/rec-window.js',
    },

    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      libraryTarget: 'global',
      globalObject: 'self'
    },
    resolve: {
      fallback: fallbackResolves
    },

    plugins: [
      new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns: [
          { from: 'src/electron/rec-preload.js', to: '' },
          { from: 'src/electron/rec-window.html', to: '' },
        ]
      }),
      new webpack.DefinePlugin({
        __IPFS_CORE_URL__: JSON.stringify(""),
        __APP_FILE_SERVE_PREFIX__ : JSON.stringify(APP_FILE_SERVE_PREFIX),
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
      'popup': './src/popup.js',
      'sw': './src/sw/main.js'
    },
    resolve: {
      fallback: fallbackResolves
    },
    output: {
      path: path.join(__dirname, 'wr-ext'),
      filename: (chunkData) => {
        return !['sw', 'ui'].includes(chunkData.chunk.name) ? '[name].js': './replay/[name].js';
      },
      libraryTarget: 'global',
      globalObject: 'self'
    },

    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.BannerPlugin(BANNER),
      new GenerateJsonPlugin('manifest.json', manifest, generateManifest, 2),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        "process": "process/browser"
      }),
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(PACKAGE.version),
        __WARCIO_VERSION__: JSON.stringify(WARCIO_PACKAGE.version),
        __SW_NAME__: JSON.stringify("sw.js"),
        __IPFS_CORE_URL__: JSON.stringify(IPFS_CORE_URL),
        __IPFS_HTTP_CLIENT_URL__: JSON.stringify(""),
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


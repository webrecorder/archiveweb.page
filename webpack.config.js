const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtensionReloader  = require('webpack-extension-reloader');


//const WEBVIEW_PRELOAD_PATH = "file:webview-preload.js";
const WEBVIEW_PRELOAD_PATH = path.join(__dirname, 'src', 'webview-preload.js');



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
      })
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

const browserConfig = (env, argv) => {
  return {
    mode: 'production',
    target: "web",
    entry: {
      'bg': './src/bg.js',
      'app': './src/app.js',
      'sw': 'wabac/src/sw.js'
    },
    output: {
      path: path.join(__dirname, 'wr-ext', 'replay'),
      filename: '[name].js',
      libraryTarget: 'global',
      globalObject: 'self'
    },

    plugins: [
      new MiniCssExtractPlugin(),
      //new ExtensionReloader({
      //  manifest: path.resolve(__dirname, "wr-ext", "manifest.json")
      //}),
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
        test: /(dist\/wombat.js|src\/wombatWorkers.js)$/i,
        loaders: 'raw-loader',
      }
     ]
    }
  }
};


module.exports = [ browserConfig, electronMainConfig, electronPreloadConfig ];


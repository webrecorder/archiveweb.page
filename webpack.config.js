const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtensionReloader  = require('webpack-extension-reloader');

module.exports = {
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

};


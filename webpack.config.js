const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  target: "web",
  entry: {
    'rec': './src/main.js',
    'app': './src/app.js',
  },
  output: {
    path: path.join(__dirname, 'wr-ext'),
    filename: '[name].js',
    libraryTarget: 'global',
    globalObject: 'self'
  },

//  externals: {
//    url: 'URL'
//  },

  plugins: [
    new webpack.IgnorePlugin({resourceRegExp: /fs|untildify/}),
  ],

  devServer: {
    compress: true,
    port: 9990,
  }
};


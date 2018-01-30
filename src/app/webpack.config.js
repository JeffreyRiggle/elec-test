const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../../build');
const APP_DIR = path.resolve(__dirname, './src/client/app');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: 'src/client/app/index.html',
    filename: 'index.html',
    inject: 'body'
});
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: APP_DIR + '/index.jsx',
  target: 'electron',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        {
            test: /\.jsx?/,
            include: APP_DIR,
            loader: 'babel-loader'
        }
    ]
  },
  plugins: [
      HtmlWebpackPluginConfig
  ]
};

module.exports = config;
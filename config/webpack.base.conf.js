/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const npmCfg = require('../package.json');
const projectRoot = path.resolve(__dirname, '../');

var banner = [
  'vue-carousel v' + npmCfg.version,
  '(c) ' + (new Date().getFullYear()) + ' ' + npmCfg.author,
  npmCfg.homepage
].join('\n')

module.exports = {
  entry: './src/',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vue-carousel.js',
    library: 'VueCarousel',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/,
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
}
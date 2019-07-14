const merge = require('webpack-merge')
const base = require('./webpack.common')

module.exports = merge(base, {
  target: 'node',
  output: {
    filename: 'vue-carousel-ssr.js'
  }
})
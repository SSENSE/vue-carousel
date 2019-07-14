const merge = require('webpack-merge')
const base = require('./webpack.prod.js')

module.exports = merge(base, {
  target: 'node',
  output: {
    filename: 'vue-carousel-ssr.min.js'
  }
})
const { resolve } = require('path');

module.exports = function nuxtVueCarousel() {
  this.addPlugin({
    ssr: true,
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue-carousel-ssr.min.js'
  });
}

module.exports.meta = require('../package.json');

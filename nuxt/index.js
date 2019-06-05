const { resolve } = require('path');

module.exports = function nuxtVueCarousel() {
  this.addPlugin({
    ssr: false,
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue-carousel.js'
  });
}

module.exports.meta = require('../package.json');

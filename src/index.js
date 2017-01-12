/* eslint-disable */

var Carousel = require("./Carousel.vue")
var Slide = require("./Slide.vue")

var install = function(Vue) {
  Vue.component("carousel", Carousel)
  Vue.component("slide", Slide)
}

module.exports = {
  'default': install,
  'Carousel': Carousel,
  'Slide': Slide
};

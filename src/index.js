import Carousel from "./Carousel.vue"
import Slide from "./Slide.vue"
import Thumb from "./Thumb.vue"

const install = (Vue) => {
  Vue.component("carousel", Carousel)
  Vue.component("slide", Slide)
  Vue.component("thumb", Thumb)
}

export default {
  install,
}

export {
  Carousel,
  Slide,
  Thumb
}

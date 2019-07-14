import Carousel from "./Carousel.vue";
import Slide from "./Slide.vue";

const install = Vue => {
  Vue.component("carousel", Carousel);
  Vue.component("slide", Slide);
};

export { 
  Carousel, 
  Slide 
};

export default install;
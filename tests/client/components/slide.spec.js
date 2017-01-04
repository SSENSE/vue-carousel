const Vue = require('vue');
const utils = require('../utils');

const Carousel = require('../../../src/Carousel.vue');
const Slide = require('../../../src/Slide.vue');

describe('Slide', () => {
  it('should mount successfully', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, {}, [h(Slide)]),
    });
    const carouselInstance = vm.$children[0];
    const slideInstance = carouselInstance.$children[0];
    expect(slideInstance._isMounted).toBe(true);

    return utils.expectToMatchSnapshot(vm);
  });
});

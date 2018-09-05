const Vue = require('vue');
const utils = require('../utils');

const Carousel = require('../../../src/Carousel.vue');
const Slide = require('../../../src/Slide.vue');

describe('Navigation', () => {
  let vm;
  let carouselInstance;
  let $navigation;

  beforeEach(() => {
    vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, { props: { navigationEnabled: true, perPage: 1 } }, [h(Slide), h(Slide)]),
    });
    carouselInstance = vm.$children[0];
    $navigation = vm.$el.querySelector('.navigation');
  });

  it('should mount successfully', () => {
    expect($navigation).toBeDefined();

    return utils.expectToMatchSnapshot(vm);
  });

  it('should render a next button', () => {
    expect(vm.$el.querySelector('.VueCarousel-navigation-next')).toBeDefined();

    return utils.expectToMatchSnapshot(vm);
  });

  it('should render a prev button', () => {
    expect(vm.$el.querySelector('.VueCarousel-navigation-prev')).toBeDefined();

    return utils.expectToMatchSnapshot(vm);
  });

  it('should trigger page advance when next is clicked', () => {
    return carouselInstance.$nextTick().then(() => {
      expect(carouselInstance.currentPage).toBe(1);

      return utils.expectToMatchSnapshot(vm);
    });
  });

  it('should trigger page advance backward when prev is clicked', () => {
    carouselInstance.goToPage(2);
    vm.$el.querySelector('.VueCarousel-navigation-prev').click();

    return carouselInstance.$nextTick().then(() => {
      expect(carouselInstance.currentPage).toBe(1);

      return utils.expectToMatchSnapshot(vm);
    });
  });
});

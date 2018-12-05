import { mount } from '@vue/test-utils';
const utils = require('../utils');

const Carousel = require('../../../src/Carousel.vue');
const Slide = require('../../../src/Slide.vue');

describe('Navigation', () => {
  let wrapper;
  let vm;
  let $navigation;

  beforeEach(() => {
    wrapper = mount(Carousel, {
      propsData: {
        navigationEnabled: true,
        perPage: 1
      },
      slots: {
        default: [Slide, Slide]
      }
    });
    vm = wrapper.vm;
    $navigation = wrapper.find('.navigation');
  });

  it('should mount successfully', () => {
    expect($navigation).toBeDefined();

    return utils.expectToMatchSnapshot(vm);
  });

  it('should render a next button', () => {
    expect(wrapper.find('.VueCarousel-navigation-next')).toBeDefined();

    return utils.expectToMatchSnapshot(vm);
  });

  it('should render a prev button', () => {
    expect(wrapper.find('.VueCarousel-navigation-prev')).toBeDefined();

    return utils.expectToMatchSnapshot(vm);
  });

  it('should trigger page advance when next is clicked', done => {
    vm.$nextTick(() => {
      expect(vm.currentPage).toBe(1);

      utils.expectToMatchSnapshot(vm);

      done();
    });
  });

  it('should trigger page advance backward when prev is clicked', done => {
    vm.goToPage(2);
    wrapper.find('.VueCarousel-navigation-prev').trigger('click');

    vm.$nextTick(() => {
      expect(vm.currentPage).toBe(1);

      utils.expectToMatchSnapshot(vm);

      done();
    });
  });
});

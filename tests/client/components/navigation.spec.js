import { mount } from '@vue/test-utils';

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

  it('should mount successfully', done => {
    expect($navigation).toBeDefined();

    vm.$nextTick(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });

  it('should render a next button', done => {
    expect(wrapper.find('.VueCarousel-navigation-next')).toBeDefined();

    vm.$nextTick(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });

  it('should render a prev button', done => {
    expect(wrapper.find('.VueCarousel-navigation-prev')).toBeDefined();

    vm.$nextTick(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });

  it('should trigger page advance when next is clicked', done => {
    vm.$nextTick(() => {
      expect(vm.currentPage).toBe(1);

      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  it('should trigger page advance backward when prev is clicked', done => {
    vm.goToPage(2);
    wrapper.find('.VueCarousel-navigation-prev').trigger('click');

    vm.$nextTick(() => {
      expect(vm.currentPage).toBe(1);

      expect(wrapper).toMatchSnapshot();

      done();
    });
  });
});

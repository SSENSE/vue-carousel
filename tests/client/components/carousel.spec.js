/* eslint-disable */

import { mount } from '@vue/test-utils';
const utils = require('../utils');

const Carousel = require('../../../src/Carousel.vue');
const Slide = require('../../../src/Slide.vue');

describe('Carousel', () => {
  it('should mount successfully', () => {
    const wrapper = mount(Carousel);

    expect(wrapper.vm._isMounted).toBeTruthy();

    return utils.expectToMatchSnapshot(wrapper.vm);
  });

  it('should unmount successfully', () => {
    const wrapper = mount(Carousel);

    const carouselInstance = wrapper.vm;
    carouselInstance.$destroy();
    expect(carouselInstance._isDestroyed).toBeTruthy();

    return utils.expectToMatchSnapshot(wrapper.vm);
  });

  it('should be unable to advance backward by default', () => {
    const wrapper = mount(Carousel);

    expect(wrapper.vm.canAdvanceBackward).toBeFalsy();

    return utils.expectToMatchSnapshot(wrapper.vm);
  });

  it('should be unable to advance forward by default (no slides added)', () => {
    const wrapper = mount(Carousel);

    expect(wrapper.vm.canAdvanceForward).toBeFalsy();

    return utils.expectToMatchSnapshot(wrapper.vm);
  });

  it('should apply custom slides per page when responsive param provided', () => {
    const wrapper = mount(Carousel, {
      propsData: {
        perPageCustom: [[0, 20]]
      }
    });

    expect(wrapper.vm.currentPerPage).toBe(20);

    return utils.expectToMatchSnapshot(wrapper.vm);
  });

  it('should fall back to default slides per page when no responsive param provided', () => {
    const wrapper = mount(Carousel, {
      propsData: {
        scrollPerPage: true,
        perPageCustom: [[9999, 20]]
      },
      slots: {
        default: [Slide, Slide, Slide]
      }
    });

    expect(wrapper.vm.currentPerPage).toBe(2);
    expect(wrapper.vm.pageCount).toBe(2);

    return utils.expectToMatchSnapshot(wrapper.vm);
  });

  it('should apply default carousel width when element has 0 width', () => {
    const wrapper = mount(Carousel);

    expect(wrapper.vm.carouselWidth).toBe(0);

    return utils.expectToMatchSnapshot(wrapper.vm);
  });

  it('should apply 200px carousel width when element has 200px width', () => {
    const wrapper = mount(Carousel, {
      slots: {
        default: [Slide, Slide, Slide]
      }
    });

    wrapper.vm.$el.style.width = "200px";

    setTimeout(() => {
      wrapper.vm.computeCarouselWidth();

      expect(wrapper.vm.carouselWidth).toBe(200);

      utils.expectToMatchSnapshot(wrapper.vm);
    }, 2000);
  });

  it('should go to second slide when we have odd number of slides and recompute carousel width', done => {
    const wrapper = mount(Carousel, {
      propsData: {
        scrollPerPage: true,
        perPage: 2
      },
      slots: {
        default: [Slide, Slide, Slide, Slide, Slide]
      }
    });
    wrapper.vm.carouselWidth = 500;

    wrapper.vm.$nextTick(() => {
      wrapper.vm.goToPage(1);
      wrapper.vm.computeCarouselWidth();

      expect(wrapper.vm.currentPage).toBe(1);

      done();
    });
  });

  it('should register 0 slides when 0 slides are added to the slots', () => {
    const wrapper = mount(Carousel);

    expect(wrapper.vm.slideCount).toBe(0);

    return utils.expectToMatchSnapshot(wrapper.vm);
  });

  it('should register 3 slides when 3 slides are added to the slots', () => {
    const wrapper = mount(Carousel, {
      slots: {
        default: [Slide, Slide, Slide]
      }
    });

    expect(wrapper.vm.slideCount).toBe(3);

    return utils.expectToMatchSnapshot(wrapper.vm);
  });

  it('should decrease current page number by 1 when advance page backward is called', done => {
    const wrapper = mount(Carousel, {
      propsData: {
        perPage: 1
      },
      slots: {
        default: [Slide, Slide]
      }
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.goToPage(2);
      wrapper.vm.advancePage('backward');
      expect(wrapper.vm.currentPage).toBe(1);
      utils.expectToMatchSnapshot(wrapper.vm);
      done();
    });
  });

  it('should increase current page number by 1 when advance page is called', done => {
    const wrapper = mount(Carousel, {
      propsData: {
        perPage: 1
      },
      slots: {
        default: [Slide, Slide, Slide, Slide]
      }
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.goToPage(1);
      wrapper.vm.advancePage();
      expect(wrapper.vm.currentPage).toBe(1);
      utils.expectToMatchSnapshot(wrapper.vm);
      done();
    });
  });

  it('should increase current page number by 1 when advance page is called with a non "backward" argument', done => {
    const wrapper = mount(Carousel, {
      propsData: {
        perPage: 1
      },
      slots: {
        default: [Slide, Slide, Slide, Slide]
      }
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.goToPage(1);
      wrapper.vm.advancePage('something');
      expect(wrapper.vm.currentPage).toBe(1);
      utils.expectToMatchSnapshot(wrapper.vm);
      done();
    });
  });

  it('should decrease current slide number by 1 when advance slide backward is called', done => {
    const wrapper = mount(Carousel, {
      propsData: {
        perPage: 1,
        scrollPerPage: false
      },
      slots: {
        default: [Slide, Slide, Slide, Slide]
      }
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.goToPage(2);
      wrapper.vm.advancePage('backward');
      expect(wrapper.vm.currentPage).toBe(1);
      utils.expectToMatchSnapshot(wrapper.vm);
      done();
    });
  });

  it('should loop back to the start when loop is true and advance page non "backward" is called from the last page', done => {
    const wrapper = mount(Carousel, {
      propsData: {
        perPage: 1,
        loop: true
      },
      slots: {
        default: [Slide, Slide]
      }
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.goToPage(1);
      wrapper.vm.advancePage();
      expect(wrapper.vm.currentPage).toBe(0);
      utils.expectToMatchSnapshot(wrapper.vm);
      done();
    });
  });

  it('should loop to the end when loop is true and advance page "backward" is called from the first page', done => {
    const wrapper = mount(Carousel, {
      propsData: {
        perPage: 1,
        loop: true
      },
      slots: {
        default: [Slide, Slide]
      }
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.advancePage('backward');
      expect(wrapper.vm.currentPage).toBe(1);
      utils.expectToMatchSnapshot(wrapper.vm);
      done();
    });
  });

  it('should begin autoplaying when option specified', () => {
    const wrapper = mount(Carousel, {
      propsData: {
        perPage: 1,
        autoplay: true,
        autoplayHoverPause: true
      },
      slots: {
        default: [Slide, Slide]
      }
    });

    expect(wrapper.vm.autoplayInterval).toBeDefined();
    wrapper.vm.pauseAutoplay();
    expect(wrapper.vm.autoplayInterval).toBe(undefined);
    return utils.expectToMatchSnapshot(wrapper.vm);
  });

  it('should reset autoplay when switching slide without autoplayHoverPause', () => {
    const wrapper = mount(Carousel, {
      propsData: {
        perPage: 1,
        autoplay: true,
        autoplayHoverPause: false
      },
      slots: {
        default: [Slide, Slide]
      }
    });

    const spy = jest.spyOn(wrapper.vm, 'restartAutoplay');
    wrapper.vm.goToPage(2);
    expect(wrapper.vm.restartAutoplay).toHaveBeenCalled();
    spy.mockRestore();
    return utils.expectToMatchSnapshot(wrapper.vm);
  });

  it('should not reset autoplay when switching slide with autoplayHoverPause', () => {
    const wrapper = mount(Carousel, {
      propsData: {
        perPage: 1,
        autoplay: true,
        autoplayHoverPause: true
      },
      slots: {
        default: [Slide, Slide]
      }
    });

    const spy = jest.spyOn(wrapper.vm, 'restartAutoplay');
    wrapper.vm.goToPage(2);
    expect(wrapper.vm.restartAutoplay).not.toHaveBeenCalled();
    spy.mockRestore();
    return utils.expectToMatchSnapshot(wrapper.vm);
  });

  it('should set carousel height to slide height', done => {
    const wrapper = mount(Carousel, {
      propsData: {
        adjustableHeight: true,
        perPage: 1,
        speed: 0
      },
      slots: {
        default: [Slide, Slide, Slide]
      },
      sync: false
    });

    // Force the slide to return a specific height
    Object.defineProperty(wrapper.vm.$children[2].$el, 'clientHeight', { value: 200 });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.computeCarouselHeight();
      expect(wrapper.vm.currentHeight).toBe('200px');
      utils.expectToMatchSnapshot(wrapper.vm);
      done();
    });
  });
});

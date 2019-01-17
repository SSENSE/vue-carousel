/* eslint-disable */

import { mount } from '@vue/test-utils';

const Carousel = require('../../../src/Carousel.vue');
const Slide = require('../../../src/Slide.vue');

describe('Carousel component', () => {
  describe('Default mounting properties', () => {
    it('should mount successfully', () => {
      const wrapper = mount(Carousel);

      expect(wrapper.vm._isMounted).toBeTruthy();

      expect(wrapper).toMatchSnapshot();
    });

    it('should unmount successfully', () => {
      const wrapper = mount(Carousel);

      const carouselInstance = wrapper.vm;
      carouselInstance.$destroy();
      expect(carouselInstance._isDestroyed).toBeTruthy();

      expect(wrapper).toMatchSnapshot();
    });

    it('should be unable to advance backward by default', () => {
      const wrapper = mount(Carousel);

      expect(wrapper.vm.canAdvanceBackward).toBeFalsy();

      expect(wrapper).toMatchSnapshot();
    });

    it('should be unable to advance forward by default (no slides added)', () => {
      const wrapper = mount(Carousel);

      expect(wrapper.vm.canAdvanceForward).toBeFalsy();

      expect(wrapper).toMatchSnapshot();
    });

    it('should apply default carousel width when element has 0 width', () => {
      const wrapper = mount(Carousel);

      expect(wrapper.vm.carouselWidth).toBe(0);

      expect(wrapper).toMatchSnapshot();
    });

    it('should register 0 slides when 0 slides are added to the slots', () => {
      const wrapper = mount(Carousel);

      expect(wrapper.vm.slideCount).toBe(0);

      expect(wrapper).toMatchSnapshot();
    });

    it('should register 3 slides when 3 slides are added to the slots', done => {
      const wrapper = mount(Carousel, {
        slots: {
          default: [Slide, Slide, Slide]
        }
      });

      expect(wrapper.vm.slideCount).toBe(3);

      wrapper.vm.$nextTick(() => {
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });
  });

  describe('Adjustable height easing', () => {
    it('should not set adjustable height transition easing', done => {
      const wrapper = mount(Carousel, {
        propsData: {
          adjustableHeight: false,
          adjustableHeightEasing: 'linear',
          speed: 0
        }
      });

      expect(wrapper.vm.transitionStyle).toBe('0s ease transform');

      wrapper.vm.$nextTick(() => {
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });

    it('should set adjustable height transition easing', done => {
      const wrapper = mount(Carousel, {
        propsData: {
          adjustableHeight: true,
          adjustableHeightEasing: 'linear',
          speed: 0
        }
      });

      expect(wrapper.vm.transitionStyle).toBe('0s ease transform, height 0s linear');

      wrapper.vm.$nextTick(() => {
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });
  });

  describe('Autoplay functionality', () => {
    it('should disable autoplay by default', () => {});

    it('should set the autoplay direction to forward by default', () => {});

    it('should set the autoplay hover pause to true by default', () => {});

    it('should set the autoplay timeout to 2000 by default', () => {});

    it('should begin autoplaying when option specified', done => {
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
      wrapper.vm.$nextTick(() => {
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });

    // start on first slide and allow the autoplay to advance to the second slide
    it('should display the second slide after waiting the timeout duration with direction forward', () => {});

    // start on the second slide and allow autoplay to advanced to the first slide
    it('should display the first slide after waiting the timeout duration with direction backward', () => {});

    it('should not allow the autoplay feature to advance on hover', () => {});

    it('should allow the autoplay feature to advance on hover when hover pause false', () => {});

    it('should show the first slide twice when looping is enabled with autoplay', () => {});

    it('should reset autoplay when switching slide without autoplayHoverPause', done => {
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
      wrapper.vm.$nextTick(() => {
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });

    it('should not reset autoplay when switching slide with autoplayHoverPause', done => {
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
      wrapper.vm.$nextTick(() => {
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });
  });

  describe('Center mode', () => {
    it('should not center image when image is less than the container width', () => {});

    it('should center image when image is less than container width and centerMode is true', () => {});
  });

  describe('Custom easing property', () => {
    it('should set easing to ease by default', () => {});

    it('should set easing to the custom easing supplied', () => {});

    // TODO: Should we be testing for valid CSS transition easing like the README suggests?
  });

  describe('Dynamic slide count', () => {
    it('should match the stored snapshot if a new slide is added dynamically', () => {});

    it('should match the stored snapshot if a slide is removed dynamically', () => {});
  });

  describe('Loop functionality', () => {
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
        expect(wrapper).toMatchSnapshot();
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
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });
  });

  describe('Minimum swipe distance', () => {
    it('should set minSwipeDistance to 8 by default', () => {});

    it('should set minSwipeDistance to the custom value of 10', () => {});

    it('should swipe to the second slide when the minSwipeDistance is reached', () => {});

    it('should not swipe to the second slide when the minSwipeDistance is not reached', () => {});
  });

  describe('Mouse drag', () => {
    it('should set the mouseDrag to true by default', () => {});

    it('should set the mouseDrag to false', () => {});

    it('should allow the mouse to drag to the second slide', () => {});

    it('should not allow the mouse to drag to the second slide', () => {});
  });

  describe('Carousel navigation', () => {
    it('should render the navigation component when navigation is enabled', () => {});

    it('should not render the navigation component when navigation is disabled', () => {});

    it('should navigate to slide 2', () => {});

    // TODO: Is this desired functionality?
    it('should navigate to slide to even when navigation is not enabled', () => {});
  });

  describe('Carousel pagination', () => {
    it('should render the pagination component when pagination is enabled', () => {});

    it('should not render the pagination component when pagination is disabled', () => {});

    // TODO: It seems that the pagination component is heavily connected to the carousel, decouple this?
    // If no then we should add tests here in the carousel for it
  });

  describe('Carousel slides per page', () => {
    it('should apply custom slides per page when responsive param provided', () => {
      const wrapper = mount(Carousel, {
        propsData: {
          perPageCustom: [[0, 20]]
        }
      });

      expect(wrapper.vm.currentPerPage).toBe(20);

      expect(wrapper).toMatchSnapshot();
    });

    it('should fall back to default slides per page when no responsive param provided', done => {
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

      wrapper.vm.$nextTick(() => {
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });

    it('should have 2 slides on the current page by default', () => {});

    it('should have 3 slides on the current page when perPage is set to 3', () => {});

    it('should have 3 slides when perPage is set to 6', () => {});

    it('should only have one page when number of slides is less than slides per page', () => {});
  });

  describe('Resistance co-efficient', () => {
    it('should have the resistanceCoef set to 20 by default', () => {});

    it('should set the resistanceCoef to 30', () => {});
  });

  describe('Scrolling per page', () => {
    it('should have scroll per page set to true by default', () => {});

    // TODO: Reconsider updating this test case name
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

    it('should advanced the page by only one slide when scroll per page is false', () => {});
  });

  describe('Space padding', () => {
    it('should have 0 space padding by default', () => {});

    it('should have 0 space padding maximum offset factor by default', () => {});

    it('should have 10 space padding', () => {});

    it('should have 10 space padding maximum offset factor by default', () => {});
  });

  describe('Speed', () => {
    it('should have a speed of 500 by default', () => {});

    it('should have a speed of 600', () => {});
  });

  describe('Tag name', () => {
    it('should only count slides matching the default tagName of slide', () => {});

    it('should only count slides matching tagName', done => {
      const CustomSlide = {
        extends: Slide,
        name: 'CustomSlide',
      };
      const wrapper = mount(Carousel, {
        propsData: {
          tagName: 'CustomSlide'
        },
        slots: {
          default: [CustomSlide, CustomSlide, Slide]
        }
      });
      expect(wrapper.vm.tagName).toBe('CustomSlide');
      expect(wrapper.vm.slideCount).toBe(2);
      wrapper.vm.$nextTick(() => {
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });
  });

  describe('v-model with value prop', () => {
    it('should set currentPage to 1', () => {});

    it('should not change the current page when selecting the same page', () => {});

    it('should not change the current page when value is negative', () => {});

    it('should not change the current page when value is greater than pageCount', () => {});
  });

  describe('Events', () => {
    it('should emit a pageChange event with the page number on page change', () => {});

    it('should emit a slideClick event with the object?? blah on slide click', () => {});

    it('should emit a transitionEnd event on transition end', () => {});
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
      done();
    });
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
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

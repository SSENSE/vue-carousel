import { shallowMount } from '@vue/test-utils';

const Slide = require('../../../src/Slide.vue');

describe('Slide', () => {
  let carousel;

  beforeEach(() => {
    carousel = {
      isTouch: true,
      adjustableHeight: true,
      dragStartX: 0,
      minSwipeDistance: 10,
      perPage: 3,
      currentPage: 0,
      $children: [
        {
          _uid: 0,
          _isMounted: true,
          $el: {
            className: 'VueCarousel-slide'
          }
        }
      ]
    };
  });

  it('should match the stored snapshot', () => {
    const wrapper = shallowMount(Slide, {
      propsData: { title: 'fooTitle' },
      provide: { carousel }
    });

    expect(wrapper).toMatchSnapshot();
  });

  describe('isActive', () => {
    // TODO: Cannot reliably test because of the implementation using _uid
    it.skip('should be the active slide', () => {});

    it('should not be the active slide', () => {
      const wrapper = shallowMount(Slide, {
        propsData: { title: 'fooTitle' },
        provide: { carousel }
      });

      expect(wrapper.vm.isActive).toBeFalsy();
    });
  });

  describe('isCenter', () => {
    it('should not be center slide if there is an even number of slides', () => {
      carousel.perPage = 2;

      const wrapper = shallowMount(Slide, {
        propsData: { title: 'fooTitle' },
        provide: { carousel }
      });

      expect(wrapper.vm.isCenter).toBeFalsy();
    });

    // TODO: Cannot reliably test because of the implementation using _uid
    it.skip('should be the center slide', () => {});

    it('should not be the center slide', () => {
      const wrapper = shallowMount(Slide, {
        propsData: { title: 'fooTitle' },
        provide: { carousel }
      });

      expect(wrapper.vm.isCenter).toBeFalsy();
    });
  });

  describe('isAdjustableHeight', () => {
    it('should be adjustable', () => {
      const wrapper = shallowMount(Slide, {
        propsData: { title: 'fooTitle' },
        provide: { carousel }
      });

      expect(wrapper.vm.isAdjustableHeight).toBeTruthy();
    });

    it('should not be adjustable', () => {
      carousel.adjustableHeight = false;

      const wrapper = shallowMount(Slide, {
        propsData: { title: 'fooTitle' },
        provide: { carousel }
      });

      expect(wrapper.vm.isAdjustableHeight).toBeFalsy();
    });
  });

  describe('onTouchEnd', () => {
    it('should emit slideclick event if carousel isTouch', () => {
      const wrapper = shallowMount(Slide, {
        propsData: { title: 'fooTitle' },
        provide: { carousel }
      });

      wrapper.vm.onTouchEnd({ changedTouches: [{ clientX: 9 }], currentTarget: { dataset: { foo: 'dataset' } } });

      expect(wrapper.emitted().slideclick[0][0]).toEqual({"foo": "dataset"});
    });

    it('should emit slideclick event if carousel is not isTouch', () => {
      carousel.isTouch = false;

      const wrapper = shallowMount(Slide, {
        propsData: { title: 'fooTitle' },
        provide: { carousel }
      });

      wrapper.vm.onTouchEnd({ clientX: 9, currentTarget: { dataset: { foo: 'dataset' } }});

      expect(wrapper.emitted().slideclick[0][0]).toEqual({"foo": "dataset"});
    });

    it('shoud not emit slideclick event', () => {
      const wrapper = shallowMount(Slide, {
        propsData: { title: 'fooTitle' },
        provide: { carousel }
      });

      wrapper.vm.onTouchEnd({ clientX: 11, currentTarget: { dataset: { foo: 'dataset' } } });

      expect(wrapper.emitted().slideclick).toBeUndefined();
    });
  });
});

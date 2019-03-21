import { shallowMount } from '@vue/test-utils';

const Navigation = require('../../../src/Navigation');

describe('Navigation', () => {
  let carousel;

  beforeEach(() => {
    carousel = {
      canAdvanceForward: true,
      canAdvanceBackward: true
    };
  });

  it('should match the stored snapshot', () => {
    const wrapper = shallowMount(Navigation, {
      provide: { carousel },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should render a next button', () => {
    const wrapper = shallowMount(Navigation, {
      provide: { carousel },
    });

    expect(wrapper.find('.VueCarousel-navigation-next').exists()).toBeTruthy();
  });

  it('should render a prev button', () => {
    const wrapper = shallowMount(Navigation, {
      provide: { carousel },
    });

    expect(wrapper.find('.VueCarousel-navigation-prev').exists()).toBeTruthy();
  });

  describe('navigationclick events', () => {
    it('should emit page advance when next is clicked', () => {
      const wrapper = shallowMount(Navigation, {
        provide: { carousel },
      });

      wrapper.find('.VueCarousel-navigation-next').trigger('click');

      expect(wrapper.emitted().navigationclick[0][0]).toBe('forward')
    });

    it('should emit page advance backward when prev is clicked', () => {
      const wrapper = shallowMount(Navigation, {
        provide: { carousel },
      });

      wrapper.find('.VueCarousel-navigation-prev').trigger('click');

      expect(wrapper.emitted().navigationclick[0][0]).toBe('backward')
    });
  });

  describe('canAdvanceForward', () => {
    it('should be able to advance forwards', () => {
      const wrapper = shallowMount(Navigation, {
        provide: { carousel },
      });

      expect(wrapper.vm.canAdvanceForward).toBeTruthy()
    });

    it('should not be able to advance forwards', () => {
      carousel.canAdvanceForward = false;

      const wrapper = shallowMount(Navigation, {
        provide: { carousel },
      });

      expect(wrapper.vm.canAdvanceForward).toBeFalsy();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('canAdvanceBackward', () => {
    it('should be able to advanced backwards', () => {
      const wrapper = shallowMount(Navigation, {
        provide: { carousel },
      });

      expect(wrapper.vm.canAdvanceBackward).toBeTruthy()
    });

    it('should not be able to advanced backwards', () => {
      carousel.canAdvanceBackward = false;

      const wrapper = shallowMount(Navigation, {
        provide: { carousel },
      });

      expect(wrapper.vm.canAdvanceBackward).toBeFalsy();
      expect(wrapper).toMatchSnapshot();
    });
  });
});

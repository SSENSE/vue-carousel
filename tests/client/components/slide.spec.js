import { mount } from '@vue/test-utils';
const utils = require('../utils');

const Carousel = require('../../../src/Carousel.vue');
const Slide = require('../../../src/Slide.vue');

describe('Slide', () => {
  it('should mount successfully', () => {
    const wrapper = mount(Carousel, {
      slots: {
        default: [Slide]
      }
    });
    expect(wrapper.vm.$children[0]._isMounted).toBeTruthy();

    return utils.expectToMatchSnapshot(wrapper.vm);
  });
});

import { mount } from '@vue/test-utils';

const Carousel = require('../../../src/Carousel.vue');
const Slide = require('../../../src/Slide.vue');

describe('Slide', () => {
  it('should mount successfully', done => {
    const wrapper = mount(Carousel, {
      slots: {
        default: [Slide]
      }
    });
    expect(wrapper.vm.$children[0]._isMounted).toBeTruthy();

    wrapper.vm.$nextTick(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

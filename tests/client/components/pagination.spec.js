import { mount } from '@vue/test-utils';

const Carousel = require('../../../src/Carousel.vue');
const Slide = require('../../../src/Slide.vue');

describe('Pagination', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(Carousel, {
      propsData: {
        perPage: 2
      },
      slots: {
        default: [Slide, Slide]
      }
    });
  });

  it('should render a pagination dot for each page by default', () => {
    const dots = wrapper.findAll('.VueCarousel-dot');
    expect(dots.length).toEqual(1);
  });

  describe("scrollPerPage: false", () => {
    beforeEach(() => {
      wrapper = mount(Carousel, {
        propsData: {
          perPage: 2,
          scrollPerPage: false
        },
        slots: {
          default: [Slide, Slide]
        }
      });
    })
    it('should render a pagination dot per slide when scrollPerPage is set to false', () => {
      const dots = wrapper.findAll('.VueCarousel-dot');
      expect(dots.length).toEqual(2);
    });
  });
});

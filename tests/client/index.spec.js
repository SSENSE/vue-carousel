import index, { Carousel, Slide } from '../../src/index.js';
import { createLocalVue } from '@vue/test-utils';

describe('index', () => {
  it('should export a slide component', () => {
    expect(Slide).toBeDefined()
  })

  it('should export a Carousel component', () => {
    expect(Carousel).toBeDefined();
  });

  it('Installs the defauly export as a plugin', () => {
    const vue = createLocalVue();
    vue.use(index);
    expect(vue.options.components.carousel).toBeDefined();
    expect(vue.options.components.slide).toBeDefined();
  })
});

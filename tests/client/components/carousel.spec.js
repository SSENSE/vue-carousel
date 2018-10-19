/* eslint-disable */

const Vue = require('vue');
const utils = require('../utils');

const VueCarousel = require('../../../src/index.js');
const Carousel = require('../../../src/Carousel.vue');
const Slide = require('../../../src/Slide.vue');

Vue.use(VueCarousel.default);

describe('Carousel', () => {
  it('should mount successfully', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel),
    });
    const carouselInstance = vm.$children[0];

    expect(carouselInstance._isMounted).toBe(true);

    return utils.expectToMatchSnapshot(vm);
  });

  it('should unmount successfully', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel),
    });
    const carouselInstance = vm.$children[0];

    carouselInstance.$destroy();
    expect(carouselInstance._isDestroyed).toBe(true);

    return utils.expectToMatchSnapshot(vm);
  });

  it('should be unable to advance backward by default', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel),
    });
    const carouselInstance = vm.$children[0];

    expect(carouselInstance.canAdvanceBackward).toBe(false);

    return utils.expectToMatchSnapshot(vm);
  });

  it('should be unable to advance forward by default (no slides added)', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel),
    });
    const carouselInstance = vm.$children[0];

    expect(carouselInstance.canAdvanceForward).toBe(false);

    return utils.expectToMatchSnapshot(vm);
  });

  it('should apply custom slides per page when responsive param provided', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, { props: { perPageCustom: [[0, 20]] } }),
    });
    const carouselInstance = vm.$children[0];

    expect(carouselInstance.currentPerPage).toBe(20);

    return utils.expectToMatchSnapshot(vm);
  });

  it('should fall back to default slides per page when no responsive param provided', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, { props: { scrollPerPage: true, perPageCustom: [[9999, 20]] } }, [h(Slide), h(Slide), h(Slide)]),
    });
    const carouselInstance = vm.$children[0];

    expect(carouselInstance.currentPerPage).toBe(2);
    expect(carouselInstance.pageCount).toBe(2);

    return utils.expectToMatchSnapshot(vm);
  });

  it('should apply default carousel width when element has 0 width', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel),
    });
    const carouselInstance = vm.$children[0];

    expect(carouselInstance.carouselWidth).toBe(0);

    return utils.expectToMatchSnapshot(vm);
  });

  it('should apply 200px carousel width when element has 200px width', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, {},
      [h(Slide), h(Slide), h(Slide)]
      ),
    });
    const carouselInstance = vm.$children[0];

    carouselInstance.$el.style.width = "200px";

    setTimeout(() => {
      carouselInstance.computeCarouselWidth();

      expect(carouselInstance.carouselWidth).toBe(200);

      return utils.expectToMatchSnapshot(vm);
    }, 2000)
  });

  it('should go to second slide when we have odd number of slides and recompute carousel width', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, {props: { scrollPerPage: true, perPage: 2}},
        [h(Slide), h(Slide), h(Slide), h(Slide), h(Slide)]
      ),
    });
    const carouselInstance = vm.$children[0];
    carouselInstance.carouselWidth = 500;

    return carouselInstance.$nextTick().then(() => {
      carouselInstance.goToPage(1);
      carouselInstance.computeCarouselWidth();

      expect(carouselInstance.currentPage).toBe(1);

      return Promise.resolve();
    });
  });

  it('should register 0 slides when 0 slides are added to the slots', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel),
    });
    const carouselInstance = vm.$children[0];

    expect(carouselInstance.slideCount).toBe(0);

    return utils.expectToMatchSnapshot(vm);
  });

  it('should register 3 slides when 3 slides are added to the slots', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, {}, [h(Slide), h(Slide), h(Slide)]),
    });
    const carouselInstance = vm.$children[0];

    expect(carouselInstance.slideCount).toBe(3);

    return utils.expectToMatchSnapshot(vm);
  });

  it('should decrease current page number by 1 when advance page backward is called', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, { props: { perPage: 1 } }, [h(Slide), h(Slide)]),
    });

    const carouselInstance = vm.$children[0];

    return carouselInstance.$nextTick().then(() => {
      carouselInstance.goToPage(2);
      carouselInstance.advancePage('backward');
      expect(carouselInstance.currentPage).toBe(1);

      return utils.expectToMatchSnapshot(vm);
    });
  });

  it('should increase current page number by 1 when advance page is called', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, { props: { perPage: 1 } }, [h(Slide), h(Slide), h(Slide), h(Slide)]),
    });

    const carouselInstance = vm.$children[0];

    return carouselInstance.$nextTick().then(() => {
      carouselInstance.goToPage(1);
      carouselInstance.advancePage();
      expect(carouselInstance.currentPage).toBe(1);

      return utils.expectToMatchSnapshot(vm);
    });
  });

  it('should increase current page number by 1 when advance page is called with a non "backward" argument', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, { props: { perPage: 1 } }, [h(Slide), h(Slide), h(Slide), h(Slide)]),
    });

    const carouselInstance = vm.$children[0];

    return carouselInstance.$nextTick().then(() => {
      carouselInstance.goToPage(1);
      carouselInstance.advancePage('something');
      expect(carouselInstance.currentPage).toBe(1);

      return utils.expectToMatchSnapshot(vm);
    });
  });
  it('should decrease current slide number by 1 when advance slide backward is called', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, { props: { perPage: 1, scrollPerPage: false } }, [h(Slide), h(Slide), h(Slide), h(Slide)]),
    });

    const carouselInstance = vm.$children[0];

    return carouselInstance.$nextTick().then(() => {
      carouselInstance.goToPage(2);
      carouselInstance.advancePage('backward');
      expect(carouselInstance.currentPage).toBe(1);

      return utils.expectToMatchSnapshot(vm);
    });
  });
  it('should loop back to the start when loop is true and advance page non "backward" is called from the last page', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, { props: { perPage: 1, loop: true } }, [h(Slide), h(Slide)]),
    });

    const carouselInstance = vm.$children[0];

    return carouselInstance.$nextTick().then(() => {
      carouselInstance.goToPage(1);
      carouselInstance.advancePage();
      expect(carouselInstance.currentPage).toBe(0);

      return utils.expectToMatchSnapshot(vm);
    });
  });

  it('should loop to the end when loop is true and advance page "backward" is called from the first page', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, { props: { perPage: 1, loop: true } }, [h(Slide), h(Slide)]),
    });

    const carouselInstance = vm.$children[0];

    return carouselInstance.$nextTick().then(() => {
      carouselInstance.advancePage('backward');
      expect(carouselInstance.currentPage).toBe(1);

      return utils.expectToMatchSnapshot(vm);
    });
  });

  it('should begin autoplaying when option specified', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, { props: { perPage: 1, autoplay: true, autoplayHoverPause: true } }, [h(Slide), h(Slide)]),
    });

    const carouselInstance = vm.$children[0];
    expect(carouselInstance.autoplayInterval).toBeDefined();
    carouselInstance.pauseAutoplay();
    expect(carouselInstance.autoplayInterval).toBe(undefined);
    return utils.expectToMatchSnapshot(vm);
  });

  it('should reset autoplay when switching slide without autoplayHoverPause', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, { props: { perPage: 1, autoplay: true, autoplayHoverPause: false } }, [h(Slide), h(Slide)]),
    });

    const carouselInstance = vm.$children[0];
    const spy = spyOn(carouselInstance, 'restartAutoplay');
    carouselInstance.goToPage(2);
    expect(carouselInstance.restartAutoplay).toHaveBeenCalled();
    return utils.expectToMatchSnapshot(vm);
  });

  it('should not reset autoplay when switching slide with autoplayHoverPause', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, { props: { perPage: 1, autoplay: true, autoplayHoverPause: true } }, [h(Slide), h(Slide)]),
    });

    const carouselInstance = vm.$children[0];
    const spy = spyOn(carouselInstance, 'restartAutoplay');
    carouselInstance.goToPage(2);
    expect(carouselInstance.restartAutoplay).not.toHaveBeenCalled();
    return utils.expectToMatchSnapshot(vm);
  });

  it('should set carousel height to slide height', done => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Carousel, { props: { adjustableHeight: true, perPage: 1, speed: 1 } },
        [h(Slide), h(Slide), h(Slide)]
      ),
    });

    const carouselInstance = vm.$children[0];

    // Force the slide to return a specific height
    Object.defineProperty(carouselInstance.$children[2].$el, 'clientHeight', { value: 200 });

    carouselInstance.$nextTick()
      .then(() => {
        carouselInstance.computeCarouselHeight();
        expect(carouselInstance.currentHeight).toBe('200px');
        utils.expectToMatchSnapshot(vm);
        done();
      })
  });
});

/* eslint-disable */

import Vue from 'vue';
import VueCarousel from '../../../src/index.js';
import Carousel from '../../../src/Carousel.vue';
import Slide from '../../../src/Slide.vue';

import { createAppContainer } from '../utils';

describe('Carousel.vue', (done) => {
  it('should install successfully when used globally', () => {
    Vue.use(VueCarousel);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel></carousel>',
    });
    vm.$mount();
    expect(vm.$children[0]._isMounted).to.equal(true);
  });
  it('should mount successfully', () => {
    Vue.component('carousel', Carousel);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel></carousel>',
    });
    vm.$mount();
    expect(vm.$children[0]._isMounted).to.equal(true);
  });
  it('should unmount successfully', () => {
    Vue.component('carousel', Carousel);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel></carousel>',
    });
    vm.$mount();
    vm.$destroy();
    expect(vm.$children[0]._isDestroyed).to.equal(true);
  });
  it('should have an offset matching the slide width when scroll per page set', () => {
    Vue.component('carousel', Carousel);
    Vue.component('slide', Slide);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel :perPage="1" :scrollPerPage="true"><slide>1</slide><slide>2</slide></carousel>',
    });
    const page = vm.$children[0].currentPage;
    const width = vm.$children[0].slideWidth;
    const perPage = vm.$children[0].currentPerPage;
    const expectedOffset = (page * width * perPage);
    const slideCount = vm.$children[0].slideCount;
    vm.scrollPerPage = true;
    vm.$mount();
    vm.$destroy();
    expect(vm.$children[0].pageCount).to.equal(2);
    expect(vm.$children[0].currentOffset).to.equal(expectedOffset);
  });
  it('should be unable to advance backward by default', () => {
    Vue.component('carousel', Carousel);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel></carousel>',
    });
    vm.$mount();
    vm.$destroy();
    expect(vm.$children[0].canAdvanceBackward).to.equal(false);
  });
  it('should apply custom slides per page when responsive param provided', () => {
    Vue.component('carousel', Carousel);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel :perPageCustom="[[0, 20]]"></carousel>',
    });
    vm.$mount();
    expect(vm.$children[0].currentPerPage).to.equal(20);
  });
  it('should fall back to default slides per page when no responsive param provided', () => {
    Vue.component('carousel', Carousel);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel :perPageCustom="[[9999, 20]]"></carousel>',
    });
    vm.$mount();
    expect(vm.$children[0].currentPerPage).to.equal(2);
  });
  it('should apply default carousel width when element has 0 width', () => {
    Vue.component('carousel', Carousel);
    createAppContainer();
    const el = document.querySelector('#appInner').style.width = "0px";
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel></carousel>',
    });
    vm.$mount();
    vm.$children[0].$el = '';
    vm.$children[0].clientWidth = 0;
    vm.$children[0].getCarouselWidth();
    expect(vm.$children[0].carouselWidth).to.equal(0);
  });
  it('should advance slide number backward when advance page backward is called', () => {
    Vue.component('carousel', Carousel);
    Vue.component('slide', Slide);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel><slide>1</slide><slide>2</slide></carousel>',
    });
    vm.$mount();
    vm.$children[0].currentPage = 2;
    vm.$children[0].advancePage('backward');
    setTimeout(() => {
      expect(vm.$children[0].currentPage).to.equal(1);
      done();
    }, 1000)
  });
  it('should advance slide number when advance page is called', () => {
    Vue.component('carousel', Carousel);
    Vue.component('slide', Slide);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel><slide>1</slide><slide>2</slide></carousel>',
    });
    vm.$mount();
    vm.$children[0].currentPage = 1;
    vm.$children[0].advancePage();
    setTimeout(() => {
      expect(vm.$children[0].currentPage).to.equal(2);
      done();
    }, 1000)
  });
  it('should advance slide number when advance page is called with a non-accepted argument', () => {
    Vue.component('carousel', Carousel);
    Vue.component('slide', Slide);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel><slide>1</slide><slide>2</slide></carousel>',
    });
    vm.$mount();
    vm.$children[0].currentPage = 1;
    vm.$children[0].advancePage('bogus');
    setTimeout(() => {
      expect(vm.$children[0].currentPage).to.equal(2);
      done();
    }, 1000)
  });
  it('should apply dirty checking for width when carousel is initialized in a hidden state', () => {
    Vue.component('carousel', Carousel);
    Vue.component('slide', Slide);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<div id="hidden" style="display: none;"><carousel><slide>1</slide><slide>2</slide></carousel></div>',
    });
    vm.$mount();
    expect(vm.$children[0].pollInterval).to.not.equal(undefined);
    expect(vm.$children[0].getCarouselWidth()).to.equal(0);
    document.querySelector('#hidden').style.display = 'block';
    const recompSpy = new sinon.spy(vm.$children[0].recomputeCarouselWidth);
    setTimeout(() => {
      expect(vm.$children[0].pollInterval).to.equal(undefined);
      expect(vm.$children[0].getCarouselWidth()).to.be.above(0);
      expect(recompSpy.called).to.equal(true);
      done();
    }, 1000);
  });
  
  // @TODO: fix mouse event tests
  // it('should listen on mouse events', (done) => {
  //   Vue.component('carousel', Carousel);
  //   Vue.component('slide', Slide);
  //   createAppContainer();
  //   const vm = new Vue({
  //     el: '#appInner',
  //     template: '<carousel><slide>1</slide><slide>2</slide></carousel>',
  //   });
  //   vm.$mount();
  //   const $el = document.querySelector('.carousel');
  //   $el.dispatchEvent(new Event('mousedown'));
  //   setTimeout(() => {
  //     const spy = new sinon.spy(vm.$children[0].handleMousedown);
  //     expect(spy.called).to.equal(true);
  //     done();
  //   }, 100);
  // });
});

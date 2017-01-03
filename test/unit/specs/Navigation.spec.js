/* eslint-disable */

import Vue from 'vue';
import VueCarousel from '../../../src/index.js';
import Carousel from '../../../src/Carousel.vue';
import Slide from '../../../src/Slide.vue';

import { createAppContainer } from '../utils';

describe('Navigation.vue', (done) => {
  it('should install successfully when used globally', () => {
    Vue.use(VueCarousel);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel :navigationEnabled="true"></carousel>',
    });
    vm.$mount();
    expect(vm.$children[0].$children[0]._isMounted).to.equal(true);
  });
  it('should advance carousel forward when next is clicked', () => {
    Vue.use(VueCarousel);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel :navigationEnabled="true"></carousel>',
    });
    vm.$mount();
    var advancePageSpy = new sinon.spy(vm.$children[0].advancePage);
    document.querySelector('.next').click();
    setTimeout(() => {
      expect(advancePageSpy.called).to.equal(true);
      done();
    }, 1000);
  });
  it('should advance carousel backward when prev is clicked', () => {
    Vue.use(VueCarousel);
    createAppContainer();
    const vm = new Vue({
      el: '#appInner',
      template: '<carousel :navigationEnabled="true"></carousel>',
    });
    vm.$mount();
    var advancePageSpy = new sinon.spy(vm.$children[0].advancePage);
    document.querySelector('.prev').click();
    setTimeout(() => {
      expect(advancePageSpy.called).to.equal(true);
      expect(advancePageSpy.calledWith).to.equal('backward');
      done();
    }, 1000);
  });
});
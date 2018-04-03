/* eslint-disable */

import Vue from "vue"
import { play } from "vue-play"
import Carousel from "../src/Carousel.vue"
import Slide from "../src/Slide.vue"

const containerWidth = 500;
const images = [
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176006_1.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176005_1.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176003_1.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176004_1.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176002_1.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176001_1.jpg"
]

const generateSlideImages = (createElement) => images.map((image) =>
  createElement(Slide, {}, [
    createElement(
      "img",
      {
        style: { width: "100%" },
        attrs: { src: image }
      }
    )
  ])
)

const createContainer = (createElement, width, content) => createElement(
  'div',
  {
    style: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '40px'
    }
  },
  [
    createElement(
      'div',
      {
        style: {
          width: `${width}px`
        }
      },
      content
    )
  ]
)

play("Carousel", module)
  .add("default", h => createContainer(
      h, containerWidth, [h(Carousel, {}, generateSlideImages(h))]
    )
  )
  .add("3 per page", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { perPage: 3 } }, generateSlideImages(h))]
    )
  )
  .add("scroll per page", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { scrollPerPage: true } }, generateSlideImages(h))]
    )
  )
  .add("responsive", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { perPageCustom: [[480, 3], [768, 4]] } }, generateSlideImages(h))]
    )
  )
  .add("autoplay", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { autoplay: true } }, generateSlideImages(h))]
    )
  )
  .add("autoplay, pause on hover", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { autoplay: true, autoplayHoverPause: true } }, generateSlideImages(h))]
    )
  )
  .add("dynamic, add or remove slides", {
    template:
      `<div style="width: 100%; display: flex; justify-content: center; margin-top: 40px;">
        <carousel style="width: 500px;">
          <slide v-for="slide in slideCount">
            <img style="width: 100%;" src="https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176006_1.jpg" />
          </slide>
        </carousel>
        <div style="float: left">
          <button v-on:click="addSlide">Add slide</button>
          <button v-on:click="removeSlide">Remove slide</button>
        </div>
      </div>`,
    components: {
      Carousel,
      Slide
    },
    data() {
      return {
        slideCount: 4
      }
    },
    methods: {
      addSlide() {
        this.slideCount++
      },
      removeSlide() {
        if (this.slideCount > 1) {
          this.slideCount--
        }
      }
    }
  })
  .add("with navigation buttons", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { navigationEnabled: true } }, generateSlideImages(h))]
    )
  )
  .add("with customized navigation buttons", h => createContainer(
      h, containerWidth, [h('style', '.VueCarousel-navigation-button { font-size: 36px; }'), h(Carousel, { props: { paginationColor: '#fac232', paginationActiveColor: '#c9750c', navigationEnabled: true, navigationNextLabel: '👉', navigationPrevLabel: '👈' } }, generateSlideImages(h))]
    )
  )
  .add("with local event on pageChange", {
    template:
      `<div style="width: 100%; display: flex; justify-content: center; margin-top: 40px;">
        <carousel style="width: 500px;" @pagechange="onPageChange">
          <slide v-for="slide in slides">
            <img style="width: 100%;" :src="slide" />
          </slide>
        </carousel>
      </div>`,
    components: {
      Carousel,
      Slide
    },
    data() {
      return {
        slides: images
      }
    },
    methods: {
      onPageChange(currentPage) {
        this.$log(`page changed to ${currentPage}`)
      },
    }
  })
  .add("navigateTo page 2", {
    template:
      `<div style="width: 100%; display: flex; justify-content: center; margin-top: 40px;">
        <carousel style="width: 500px;" :navigateTo="newPage">
          <slide v-for="slide in slides" :key="slide.src">
            <img style="width: 100%;" src="https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176006_1.jpg" />
          </slide>
                    </carousel>
        <div style="float: left; z-index: 1000">
          <button style="position: absolute; bottom: 20px; right: 250px" v-on:click="gotoSlide(0)">Goto page 1</button>
          <button style="position: absolute; bottom: 20px; right: 150px" v-on:click="gotoSlide(1)">Goto page 2</button>
          <button style="position: absolute; bottom: 20px; right: 50px" v-on:click="gotoSlide(2)">Goto page 3</button>
        </div>
      </div>`,
    components: {
      Carousel,
      Slide
    },
    data(){
      return {
        newPage:0,
        slides: images
      }
    },
    methods: {
      gotoSlide(val) {
        this.newPage = val;
      },
    }
  })
  .add("with spacePadding 100px", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { spacePadding: 100, perPage: 1} }, generateSlideImages(h))]
      )
  )


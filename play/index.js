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
      width: `${width}px`
    }
  },
  content
)

play("Carousel", module)
  .add("default", h => createContainer(
      h, containerWidth, [h(Carousel, {}, generateSlideImages(h))]
    )
  )
  .add("scroll per page", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { scrollPerPage: true } }, generateSlideImages(h))]
    )
  )
  .add("responsive", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { perPageCustom: [[480, 3], [768, 4]], scrollPerPage: true } }, generateSlideImages(h))]
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
      `<div>
        <carousel style="width: 500px;">
          <slide v-for="slide in slideCount">
            <img style="width: 100%;" src="https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176006_1.jpg" />
          </slide>
        </carousel>
        <button v-on:click="addSlide">Add slide</button>
        <button v-on:click="removeSlide">Remove slide</button>
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


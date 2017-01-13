/* eslint-disable */

import { play } from "vue-play"
import Carousel from "../src/Carousel.vue"
import Slide from "../src/Slide.vue"
 
const images = [
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176006_1.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176005_1.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176003_1.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176004_1.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176002_1.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176001_1.jpg"
]

const generateSlideImages = (createElement) => {
  return images.map((image) => {
    return createElement(Slide, {}, [
        createElement(
          "img",
          {
            style: { width: "100%" },
            attrs: { src: image }
          }
        )
      ])
  })
}

const createContainer = (createElement, width, content) => {
  return createElement(
    'div',
    { 
      style: {
        width: `${width}px`
      }
    },
    [content]
  )
}

play("Carousel", module)
  .add("default", h => createContainer(h, 500, 
    h(Carousel, {}, generateSlideImages(h)))
  )
  .add("scroll per page", h => createContainer(h, 500, 
    h(Carousel, { props: { scrollPerPage: true } }, generateSlideImages(h)))
  )
  .add("responsive", h => createContainer(h, 500, 
    h(Carousel, { props: { perPageCustom: [[480, 3], [768, 4]], scrollPerPage: true } }, generateSlideImages(h)))
  )
  .add("autoplay", h => createContainer(h, 500, 
    h(Carousel, { props: { autoplay: true } }, generateSlideImages(h)))
  )

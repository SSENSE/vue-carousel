/* eslint-disable */

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
  .add("dynamic slide array", h => {
      const slides = [];
      const addImage = (arr) => {
        arr.push(
          h(Slide, {}, [
            h('img', {
              style: { width: "100%" },
              attrs: { src: images[0] }
            })
          ])
        )
      }

      addImage(slides)
      addImage(slides)
      addImage(slides)
      setInterval(addImage(slides), 5000)
      const carouselVm = h(Carousel, {}, slides)
      return createContainer(
        h, containerWidth, 
        [
          carouselVm,
          h('button', {
            on: {
              click: () => {
                addImage(slides)
                carouselVm.componentOptions.children = slides;
                carouselVm.context.$root.$forceUpdate()
                console.log('carouselVm', carouselVm);
                console.log('slides', slides);
                console.log('clicked')
              }
            }
          }, 'Add slide')
        ]
      )
    }
  )

/* eslint-disable */

import Vue from "vue"
import { play } from "vue-play"
import Carousel from "../src/Carousel.vue"
import Slide from "../src/Slide.vue"

const containerWidth = 500;
const images = [
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176006_1.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176005_2.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176003_3.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176004_4.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176002_5.jpg",
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176001_2.jpg"
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
  .add("Default", h => createContainer(
      h, containerWidth, [h(Carousel, {}, generateSlideImages(h))]
    )
  )
  .add("3 per page", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { perPage: 3 } }, generateSlideImages(h))]
    )
  )
  .add("Scroll per page false", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { scrollPerPage: false } }, generateSlideImages(h))]
    )
  )
  .add("Responsive", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { perPageCustom: [[480, 3], [768, 4]] } }, generateSlideImages(h))]
    )
  )
  .add("Center and hide navigation", {
    template:
      `<div style="width: 100%; display: flex; justify-content: center; margin-top: 40px;">
        <carousel :per-page-custom="[[480, 1], [768, 4]]" :center-mode="true" :navigation-enabled="true" style="width: 500px;">
          <slide v-for="slide in slideCount">
            <img style="width: 100%;" src="https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176006_1.jpg" />
          </slide>
        </carousel>
      </div>`,
    components: {
      Carousel,
      Slide
    },
    data() {
      return {
        slideCount: 3
      }
    }
  })
  .add("Autoplay", h => createContainer(
    h, containerWidth, [h(Carousel, { props: { autoplay: true, autoplayHoverPause: false } }, generateSlideImages(h))]
  )
)
.add("Autoplay, Looping", h => createContainer(
  h, containerWidth, [h(Carousel, { props: { autoplay: true, autoplayHoverPause: false, loop: true } }, generateSlideImages(h))]
)
)
  .add("Autoplay, pause on hover", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { autoplay: true, autoplayHoverPause: true } }, generateSlideImages(h))]
    )
  )
  .add("Dynamic, add or remove slides", {
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
  .add("With navigation buttons", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { navigationEnabled: true } }, generateSlideImages(h))]
    )
  )
  .add("Navigation buttons and scrollPerPage false", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { navigationEnabled: true, scrollPerPage: false } }, generateSlideImages(h))]
    )
  )
  .add("Navigation buttons and scrollPerPage false and loop", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { navigationEnabled: true, scrollPerPage: false, loop: true } }, generateSlideImages(h))]
    )
  )
  .add("With customized navigation buttons", h => createContainer(
      h, containerWidth, [h('style', '.VueCarousel-navigation-button { font-size: 36px; }'), h(Carousel, { props: { paginationColor: '#fac232', paginationActiveColor: '#c9750c', navigationEnabled: true, navigationNextLabel: '👉', navigationPrevLabel: '👈' } }, generateSlideImages(h))]
    )
  )
  .add("With local event on pageChange", {
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
  .add("NavigateTo pages", {
    template:
      `<div style="width: 100%; display: flex; justify-content: center; margin-top: 40px;">
        <carousel style="width: 500px;" :navigateTo="newPage" v-on:pageChange="pageChanged">
          <slide v-for="slide in slides" :key="slide">
            <img style="width: 100%;" :src= slide />
          </slide>
                    </carousel>
        <div style="float: left; z-index: 1000">
          <button style="position: absolute; bottom: 20px; right: 250px" v-on:click="gotoPage(0)">Goto page 1</button>
          <button style="position: absolute; bottom: 20px; right: 150px" v-on:click="gotoPage(1)">Goto page 2</button>
          <button style="position: absolute; bottom: 20px; right: 50px" v-on:click="gotoPage(2)">Goto page 3</button>
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
      gotoPage(val) {
        this.newPage = val;
      },
      pageChanged(val) {
        this.newSlide = val;
      }
    }
  })
  .add("NavigateTo slides", {
    template:
      `<div style="width: 100%; display: flex; justify-content: center; margin-top: 40px;">
        <carousel style="width: 500px;" :navigateTo="newSlide" :scrollPerPage=false v-on:pageChange="pageChanged">
          <slide v-for="slide in slides" :key="slide.src">
            <img style="width: 100%;" :src= slide />
          </slide>
                    </carousel>
        <div style="float: left; z-index: 1000">
          <button style="position: absolute; bottom: 20px; right: 250px" v-on:click="gotoSlide(0)">Goto slide 1</button>
          <button style="position: absolute; bottom: 20px; right: 150px" v-on:click="gotoSlide(1)">Goto slide 2</button>
          <button style="position: absolute; bottom: 20px; right: 50px" v-on:click="gotoSlide(5)">Goto slide 5</button>
        </div>
      </div>`,
    components: {
      Carousel,
      Slide
    },
    data(){
      return {
        newSlide: 0,
        slides: images
      }
    },
    methods: {
      gotoSlide(val) {
        this.newSlide = val;
      },
      pageChanged(val) {
        this.newSlide = val;
      }
    }
  })
  .add("With spacePadding 100px", h => createContainer(
      h, containerWidth, [h(Carousel, { props: { spacePadding: 100, perPage: 1} }, generateSlideImages(h))]
      )
  )
  .add("Transition end", {
    template: `<div style="width: 100%; display: flex; justify-content: center; margin-top: 40px;">
        <carousel
          style="width: 500px;"
          @transitionEnd="handleTransitionEnd"
        >
          <slide v-for="slide in slides" :key="slide.src">
            <img style="width: 100%;" :src= slide />
          </slide>
        </carousel>
      </div>`,
    data() {
      return {
        slides: images
      }
    },
    components: {
      Carousel,
      Slide
    },
    methods: {
      handleTransitionEnd() {
        alert('transition end!')
      }
    }
  })
  .add("Custom width", {
    components: { Carousel, Slide },
    render: h => {
      return createContainer(
        h, containerWidth, [h(Carousel, {
          props: {
            perPage: 1,
            spacePadding: 30
          }
        }, [new Array(8).fill(0).map((item, index) => {
          return h(Slide, {}, [h("div", {
            style: {
              width: "100%",
              height: "400px",
              lineHeight: "400px",
              color: "#fff",
              textAlign: "center",
              fontSize: "30px",
              backgroundColor: (index % 2 === 0) ? "#42b983" : "#ff3c3c"
            }
          }, [index])])
        })])]
      )
    }
  })
  .add("Emit selected element dataset", {
    template:
      `<div style="width: 100%; display: flex; justify-content: center; margin-top: 40px;">
        <carousel style="width: 500px;" :navigateTo="newSlide" :scrollPerPage=false>
          <slide v-for="(slide, index) in slides" :key="slide.src" :data-index="index" v-on:slideClick="onSlideClick">
            <img style="width: 100%;" :src= slide />
          </slide>
        </carousel>
      </div>`,
    components: {
      Carousel,
      Slide
    },
    data(){
      return {
        newSlide: 0,
        slides: images
      }
    },
    methods: {
      onSlideClick (data) {
        this.$log(data)
      }
    }
  })
  .add("Get and set current Page with v-model", {
    template: `
<div>
<div style="text-align: center;">
    <input type="number" v-model="currentPage" style="text-align: center; font-size: 3em; width: 100px;">
</div>
<div style="width: 100%; display: flex; justify-content: center; margin-top: 40px;">
        <carousel
          style="width: 300px;"
          v-model="currentPage"
          :perPage="1"
        >
          <slide v-for="slide in slides" :key="slide.src">
            <img style="width: 100%;" :src= slide />
          </slide>
        </carousel>
      </div>
</div>`,
    data() {
      return {
        currentPage: 0,
        slides: images
      }
    },
    components: {
      Carousel,
      Slide
    },
    methods: {

    }
  })
  .add("With adjustableHeight", {
    template:
      `<div style="width: 100%; display: flex; justify-content: center; margin-top: 40px;">
        <carousel style="width: 300px;" :adjustableHeight="true" :navigationEnabled="true" :perPage="1">
          <slide v-for="(slide, idx) in slides">
            <div style="width: 300px;">
              <img :style="'height: ' + ((idx + 1) * 50) + 'px;'" :src="slide" />
            </div>
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
    }
  })

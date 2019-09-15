<template>
    <div
    id="VueCarousel-vertical-carousel-container"
    >
        <div
        ref="VueCarouselContainer"
        id="VueCarousel-vertical-carousel"
        :style="{ maxHeight: `${maxHeight}px`, }"
        >
            <slot></slot>
        </div>
        <vertical-navigation 
        @down="goDown"
        @up="goUp"
        >
        <template slot="VueCarousel-nav-up" >
            <slot name="VueCarousel-nav-up" />
        </template>
        <template slot="VueCarousel-nav-down" >
            <slot name="VueCarousel-nav-down" />
        </template>
        </vertical-navigation>
    </div>
</template>

<script>
import VerticalNavigation from "./VerticalNavigation";

export default {
  components: {
    VerticalNavigation
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: Number,
      default: 500
    }
  },
  methods: {
    goDown() {
      this.$refs["VueCarouselContainer"].scrollTop += this.$refs[
        "VueCarouselContainer"
      ].firstElementChild.offsetHeight;
    },
    goUp() {
      this.$refs["VueCarouselContainer"].scrollTop -= this.$refs[
        "VueCarouselContainer"
      ].firstElementChild.offsetHeight;
    },
    goToIndex(index) {
      this.$refs["VueCarouselContainer"].scrollTop = this.$refs[
        "VueCarouselContainer"
      ].firstElementChild.offsetHeight * index;
    }
  },
  watch: {
    index(val) {
      this.goToIndex(val);
    }
  }
};
</script>

<style>
#VueCarousel-vertical-carousel-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

#VueCarousel-vertical-carousel {
  width: 100%;
  position: relative;
  overflow: hidden;
}

div {
  scroll-behavior: smooth;
}
</style>

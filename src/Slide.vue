<template>
  <div class="VueCarousel-slide" :class="{'VueCarousel-slide-active': isActive}" tabindex="-1">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "slide",
  data() {
    return {
      width: null
    };
  },
  inject: ["carousel"],
  mounted() {
    if (!this.$isServer) {
      this.$el.addEventListener("dragstart", e => e.preventDefault());
    }
  },
  computed: {
    activeSlides() {
      const { currentPage, perPage, $children, slideCount } = this.carousel;
      const activeSlides = [];
      const children = $children
        .filter(
          child =>
            child.$el && child.$el.className.includes("VueCarousel-slide")
        )
        .map(child => child._uid);

      let i = 0;
      while (i < perPage) {
        const child = children[currentPage * perPage + i];
        activeSlides.push(child);
        i++;
      }

      return activeSlides;
    },
    isActive() {
      return this.activeSlides.includes(this._uid);
    }
  }
};
</script>

<style>
.VueCarousel-slide {
  flex-basis: inherit;
  flex-grow: 0;
  flex-shrink: 0;
  user-select: none;
  backface-visibility: hidden;
  -webkit-touch-callout: none;
  outline: none;
}
</style>

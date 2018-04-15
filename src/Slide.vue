<template>
  <div
    class="VueCarousel-slide"
    tabindex="-1"
    :class="{
      'VueCarousel-slide-active': isActive,
      'VueCarousel-slide-center': isCenter
    }"
  >
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
    /**
     * `isActive` describes whether a slide is visible
     * @return {Boolean} [description]
     */
    isActive() {
      return this.activeSlides.includes(this._uid);
    },
    /**
     * `isCenter` describes whether a slide is in the center of all visible slides
     * if perPage is an even number, we quit
     * @return {Boolean}
     */
    isCenter() {
      const { perPage } = this.carousel;
      if (perPage % 2 === 0 || !this.isActive) return false;
      return (
        this.activeSlides.indexOf(this._uid) ===
        Math.floor(this.carousel.perPage / 2)
      );
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

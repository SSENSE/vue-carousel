<template>
  <div
    v-show="carousel.pageCount > 1"
    class="VueCarousel-pagination"
    v-bind:class="{ [`VueCarousel-pagination--${paginationPositionModifierName}`]: paginationPositionModifierName }"
  >
    <div class="VueCarousel-dot-container" role="tablist" :style="dotContainerStyle">
      <button
        v-for="(page, index) in paginationCount"
        :key="`${page}_${index}`"
        class="VueCarousel-dot"
        aria-hidden="false"
        role="tab"
        :title="getDotTitle(index)"
        :value="getDotTitle(index)"
        :aria-label="getDotTitle(index)"
        :aria-selected="isCurrentDot(index) ? 'true' : 'false'"
        v-bind:class="{ 'VueCarousel-dot--active': isCurrentDot(index) }"
        v-on:click="goToPage(index)"
        :style="dotStyle(index)"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "pagination",
  inject: ["carousel"],
  computed: {
    paginationPositionModifierName() {
      const { paginationPosition } = this.carousel;
      // guard to add only required class modifiers
      if (paginationPosition.indexOf("overlay") < 0) return;
      return paginationPosition;
    },
    paginationPropertyBasedOnPosition() {
      return this.carousel.paginationPosition.indexOf("top") >= 0
        ? "bottom"
        : "top";
    },
    paginationCount() {
      return this.carousel && this.carousel.scrollPerPage
        ? this.carousel.pageCount
        : this.carousel.slideCount || 0;
    },
    dotContainerStyle() {
      const { carousel } = this;
      if (carousel.maxPaginationDotCount === -1)
        return {
          "margin-top": `${carousel.paginationPadding * 2}px`
        };
      const doublePadding = carousel.paginationPadding * 2;
      const containerWidth =
        carousel.maxPaginationDotCount *
        (carousel.paginationSize + doublePadding);
      return {
        "margin-top": `${carousel.paginationPadding * 2}px`,
        overflow: "hidden",
        width: `${containerWidth}px`,
        margin: "0 auto",
        "white-space": "nowrap"
      };
    }
  },
  methods: {
    /**
     * Change page by index
     * @param {number} index
     * return {void}
     */
    goToPage(index) {
      /**
       * @event paginationclick
       * @type {number}
       */
      this.$emit("paginationclick", index);
    },

    /**
     * Check on current dot
     * @param {number} index - dot index
     * @return {boolean}
     */
    isCurrentDot(index) {
      return index === this.carousel.currentPage;
    },

    /**
     * Generate dot title
     * @param {number} index - dot index
     * @return {string}
     */
    getDotTitle(index) {
      return this.carousel.$children[index].title
        ? this.carousel.$children[index].title
        : `Item ${index}`;
    },
    /**
     * Control dots appear and disappear
     * @param {number} index - dot index
     * @return {Object} - dot(buttn) style
     */
    dotStyle(index) {
      const { carousel } = this;
      const basicBtnStyle = {};
      basicBtnStyle[
        `margin-${this.paginationPropertyBasedOnPosition}`
      ] = `${carousel.paginationPadding * 2}px`;

      Object.assign(basicBtnStyle, {
        padding: `${carousel.paginationPadding}px`,
        width: `${carousel.paginationSize}px`,
        height: `${carousel.paginationSize}px`,
        "background-color": `${
          this.isCurrentDot(index)
            ? carousel.paginationActiveColor
            : carousel.paginationColor
        }`
      });

      if (carousel.maxPaginationDotCount === -1) return basicBtnStyle;

      const eachDotsWidth =
        carousel.paginationSize + carousel.paginationPadding * 2;
      const maxReverse = carousel.pageCount - carousel.maxPaginationDotCount;
      const translateAmount =
        carousel.currentPage > maxReverse
          ? maxReverse
          : carousel.currentPage <= carousel.maxPaginationDotCount / 2
            ? 0
            : carousel.currentPage -
              Math.ceil(carousel.maxPaginationDotCount / 2) +
              1;
      const transformWidth = 0 - eachDotsWidth * translateAmount;
      return Object.assign(basicBtnStyle, {
        "-webkit-transform": `translate3d(${transformWidth}px,0,0)`,
        transform: `translate3d(${transformWidth}px,0,0)`,
        "-webkit-transition": `-webkit-transform ${carousel.speed / 1000}s`,
        transition: `transform ${carousel.speed / 1000}s`
      });
    }
  }
};
</script>

<style scoped>
.VueCarousel-pagination {
  width: 100%;
  text-align: center;
}

.VueCarousel-pagination--top-overlay {
  position: absolute;
  top: 0;
}

.VueCarousel-pagination--bottom-overlay {
  position: absolute;
  bottom: 0;
}

.VueCarousel-dot-container {
  display: inline-block;
  margin: 0 auto;
  padding: 0;
}

.VueCarousel-dot {
  display: inline-block;
  cursor: pointer;
  appearance: none;
  border: none;
  background-clip: content-box;
  box-sizing: content-box;
  padding: 0;
  border-radius: 100%;
  outline: none;
}

.VueCarousel-dot:focus {
  outline: 1px solid lightblue;
}
</style>

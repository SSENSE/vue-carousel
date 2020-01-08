<template>
  <div
    v-show="carousel.pageCount > 1"
    class="VueCarousel-pagination"
    v-bind:class="{
      [`VueCarousel-pagination--${paginationPositionModifierName}`]: paginationPositionModifierName
    }"
  >
    <div
      class="VueCarousel-dot-container"
      role="tablist"
      :style="dotContainerStyle"
    >
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
        v-bind:class="[
          { 'VueCarousel-dot--active': isCurrentDot(index) },
          dotClassList[index]
        ]"
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
  data() {
    return {
      dotClassList: []
    };
  },
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
        (carousel.maxPaginationDotCount + 4) *
          (carousel.paginationSize + doublePadding) +
        (carousel.paginationSize + doublePadding);

      return {
        "margin-top": `${carousel.paginationPadding * 2}px`,
        overflow: "hidden",
        width: `${containerWidth}px`,
        "white-space": "nowrap"
      };
    },
    currentPage() {
      return this.carousel.currentPage;
    },
    slideCount() {
      return this.carousel.slideCount;
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

      return basicBtnStyle;
    },
    setDotClassList(className, index) {
      if (this.dotClassList[index] !== undefined) {
        this.dotClassList[index] = className;
      }
    }
  },
  watch: {
    currentPage(newPage, oldPage) {
      const maxDotCount = this.carousel.maxPaginationDotCount;
      if (
        this.carousel.slideCount > maxDotCount &&
        this.dotClassList[newPage].includes("small-scale")
      ) {
        if (newPage > oldPage) {
          this.setDotClassList("", newPage);
          this.setDotClassList("small-scale", newPage + 1);
          this.setDotClassList("extra-small-scale", newPage + 2);
          this.setDotClassList("small-scale", newPage - maxDotCount);
          this.setDotClassList(
            "extra-small-scale",
            newPage - (maxDotCount + 1)
          );
          this.setDotClassList("zero-scale", newPage - (maxDotCount + 2));
        } else {
          this.setDotClassList("", newPage);
          this.setDotClassList("small-scale", newPage + maxDotCount);
          this.setDotClassList("small-scale", newPage - 1);
          this.setDotClassList("extra-small-scale", newPage - 2);
          this.setDotClassList(
            "extra-small-scale",
            newPage + (maxDotCount + 1)
          );
          this.setDotClassList("zero-scale", newPage + (maxDotCount + 2));
        }
      }
    },
    slideCount(count) {
      if (this.carousel.maxPaginationDotCount !== -1) {
        for (let i = 0; i < count; i++) {
          if (i >= this.carousel.maxPaginationDotCount) {
            if (i === this.carousel.maxPaginationDotCount) {
              this.dotClassList[i] = "small-scale";
            } else if (i === this.carousel.maxPaginationDotCount + 1) {
              this.dotClassList[i] = "extra-small-scale";
            } else {
              this.dotClassList[i] = "zero-scale";
            }
          } else {
            this.dotClassList[i] = "";
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.VueCarousel-pagination {
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
  transition: all 0.12s linear;
}

.VueCarousel-dot:focus {
  outline: 1px solid lightblue;
}

.zero-scale {
  transform: scale(0);
  width: 0 !important;
  height: 0 !important;
  padding: 0 !important;
}

.small-scale {
  transform: scale(0.5);
}

.extra-small-scale {
  transform: scale(0.3);
  pointer-events: none;
}
</style>

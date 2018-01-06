<template>
  <div v-show="parentContainer.pageCount > 1"
       :class="{'VueCarousel-pagination':true,'in-side':parentContainer.paginationInSide}"
       :style="paginationPosition">
    <div class="VueCarousel-dot-container">
      <div
        class="VueCarousel-dot"
        v-bind:class="{ 'VueCarousel-dot--active': (index === parentContainer.currentPage) }"
        v-for="(page, index) in parentContainer.pageCount"
        v-on:click="parentContainer.goToPage(index)"
        :style="`
          margin: ${parentContainer.paginationPadding * 2}px 0;
          padding: ${parentContainer.paginationPadding}px;
        `"
      >
        <div
          class="VueCarousel-dot-inner"
          :style="`
            width: ${parentContainer.paginationSize}px;
            height: ${parentContainer.paginationSize}px;
            background: ${(index === parentContainer.currentPage) ? parentContainer.paginationActiveColor : parentContainer.paginationColor};
          `"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pagination",
    data() {
      return {
        parentContainer: this.$parent,
        transformOrigin: "",
      }
    },
    computed: {
      paginationPosition () {
        if (this.parentContainer.paginationInSide) {
          const dotSize = ((2 * this.parentContainer.paginationPadding) +
            this.parentContainer.paginationSize)
          const dotContainerHeight = ((6 * this.parentContainer.paginationPadding) +
            this.parentContainer.paginationSize)
          const dotContainerWidth = dotSize * this.parentContainer.pageCount
          if (this.parentContainer.pageCount % 2 === 1) {
            this.transformOrigin = `calc(50% + ${((this.parentContainer.pageCount - 1) / 2) * dotSize}px) center 0`
          } else {
            this.transformOrigin = `calc(50% + ${(((this.parentContainer.pageCount / 2) - 1) * dotSize) + (dotSize / 2)}px) center 0`
          }
          switch (this.parentContainer.paginationInSideDirection) {
            case "bottom":
              return {bottom: `-${this.parentContainer.paginationPadding * 2}px`}
            case "left":
              return {
                "transform-origin": this.transformOrigin,
                transform: "rotate(90deg)",
                left: `calc(-50% + ${dotContainerHeight / 2}px - ${dotContainerWidth / 2}px + ${this.parentContainer.paginationPadding + this.parentContainer.paginationSize}px)`,
                top: `calc(50% - ${dotContainerHeight / 2}px + ${dotContainerWidth / 2}px - ${this.parentContainer.paginationPadding + this.parentContainer.paginationSize}px)`
              }
            case "right":
              return {
                "transform-origin": this.transformOrigin,
                transform: "rotate(90deg)",
                right: `calc(-50% - ${dotContainerHeight / 2}px + ${dotContainerWidth / 2}px - ${this.parentContainer.paginationPadding + this.parentContainer.paginationSize}px + ${dotContainerHeight}px)`,
                top: `calc(50% - ${dotContainerHeight / 2}px + ${dotContainerWidth / 2}px - ${this.parentContainer.paginationPadding + this.parentContainer.paginationSize}px)`
              }
            case "top":
              return {top: `-${this.parentContainer.paginationPadding * 2}px`}
            default:
              break
          }
        }
        return {}
      }
    },
  }
</script>

<style scoped>
  .VueCarousel-pagination {
    width: 100%;
    float: left;
    text-align: center;
  }

  .VueCarousel-dot-container {
    display: inline-block;
    margin: 0 auto;
  }

  .VueCarousel-dot {
    float: left;
    cursor: pointer;
  }

  .VueCarousel-dot-inner {
    border-radius: 100%;
  }

  .VueCarousel-pagination.in-side {
    position: absolute;
  }
</style>

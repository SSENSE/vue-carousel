<template>
  <div v-show="parentContainer.pageCount > 1" class="VueCarousel-pagination">
    <div class="VueCarousel-dot-container">
      <div
        class="VueCarousel-dot"
        v-bind:class="{ 'VueCarousel-dot--active': (index === parentContainer.currentPage) }"
        v-for="(page, index) in parentContainer.pageCount"
        v-on:click="parentContainer.goToPage(index)"
        :style="`
          margin-top: ${parentContainer.paginationPadding * 2}px;
          padding: ${parentContainer.paginationPadding}px;
        `"
      >
        <div
          class="VueCarousel-dot-inner"
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
    width: 10px;
    height: 10px;
    background: #efefef;
  }
  .VueCarousel-dot--active .VueCarousel-dot-inner {
    background: #000000;
  }
</style>

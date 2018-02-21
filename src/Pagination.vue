<template>
  <div v-show="parentContainer.pageCount > 1" class="VueCarousel-pagination">
    <div class="VueCarousel-dot-container">
      <div
        class="VueCarousel-dot"
        v-bind:class="{ 'VueCarousel-dot--active': (index === parentContainer.currentPage) }"
        v-for="(page, index) in parentContainer.pageCount"
        v-on:click="goToPage(index)"
        :style="`
          margin-top: ${parentContainer.paginationPadding * 2}px;
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
      parentContainer: this.$parent
    };
  },
  methods: {
    goToPage(index) {
      this.$emit("paginationclick", index);
    }
  }
};
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
</style>

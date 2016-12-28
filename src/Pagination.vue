<template>
  <div class="pagination">
    <div class="dot-container">
      <div
        class="dot"
        v-for="(page, index) in parentContainer.pageCount"
        v-on:click="parentContainer.goToPage(index)"
        :style="`
          margin-top: ${parentContainer.pagination.padding * 2}px;
          padding: ${parentContainer.pagination.padding}px;
        `"
      >
        <div
          class="dot-inner"
          :style="`
            width: ${parentContainer.pagination.size}px;
            height: ${parentContainer.pagination.size}px;
            background: ${(index === parentContainer.currentPage) ? parentContainer.pagination.activeColor : parentContainer.pagination.color};
          `"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    data() {
      return {
        parentContainer: this.$parent,
      };
    },
  };
</script>

<style scoped>
  .pagination {
    width: 100%;
    float: left;
    text-align: center;
  }

  .dot-container {
    display: inline-block;
    margin: 0 auto;
  }

  .dot {
    float: left;
    cursor: pointer;
  }

  .dot-inner {
    border-radius: 100%;
  }
</style>

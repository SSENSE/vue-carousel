<template>
  <div class="slide" v-bind:style="`width: ${width}px`">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'slide',
    data() {
      return {
        width: null,
      };
    },
  };
</script>

<style scoped>
  .slide {
    float: left;
  }
</style>

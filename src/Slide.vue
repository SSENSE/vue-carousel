<template>
  <div class="VueCarousel-slide">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "slide",
    data() {
      return {
        width: null,
      }
    }
  }
</script>

<style>
  .VueCarousel-slide {
    flex-basis: inherit;
    flex-grow: 0;
    flex-shrink: 0;
    user-select: none;
  }
</style>

<template>
  <div class="slide"
    v-bind:style="`
      flex-basis: ${width}px;
      visibility: ${width ? 'visible' : 'hidden'}
    `"
    >
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

<style scoped>
  .slide {
    flex-grow: 0;
    flex-shrink: 0;
    user-select: none;
  }
</style>

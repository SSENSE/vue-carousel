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
    },
    mounted() {
      if (this.$isServer) {
        return
      }

      // Disable drag event
      this.$el.addEventListener("dragstart", e => e.preventDefault())
    }
  }
</script>

<style scoped>
  .slide {
    flex-grow: 0;
    flex-shrink: 0;
    user-select: none;

    backface-visibility: hidden;
    -webkit-touch-callout: none;
  }
</style>

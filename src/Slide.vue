<template>
  <div class="VueCarousel-slide">
    <slot></slot>
    <button class="VueCarousel-expand slide-nomodal" @click="handleClick">EXPAND</button>
  </div>
</template>

<script>
  export default {
    name: "slide",
    data() {
      return {
        width: null,
        parentContainer: this.$parent
      }
    },
    methods: {
      handleClick () {
        return this.parentContainer.modalToggle(this)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './scss/var';

  .VueCarousel-slide {
    flex-basis: inherit;
    flex-grow: 0;
    flex-shrink: 0;
    user-select: none;
    position: relative;
    transition: .3s ease all;
  }
  
  .VueCarousel-expand {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: $z-index + 2;
  }
  
</style>

<template>
  <div class="VueCarousel-modal"></div>
</template>

<script>
  export default {
    name: "modal"
  }
</script>

<style lang="scss">
  @import './scss/var';
  
  .VueCarousel-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(black, 0.9);
    z-index: 9;
  }
  
</style>

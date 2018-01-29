<template>
  <div class="VueCarousel-thumb">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "thumb",
  }
</script>

<style>
  .VueCarousel-thumb {
    width:50px;
    height:50px;
  }
</style>

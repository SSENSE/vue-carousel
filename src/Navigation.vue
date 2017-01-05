<template>
  <div class="navigation">
    <a href="#" class="next" v-on:click.prevent="triggerPageAdvance()" v-bind:class="{ disabled: !canAdvanceBackward }">Prev</a>
    <a href="#" class="prev" v-on:click.prevent="triggerPageAdvance('backward')" v-bind:class="{ disabled: !canAdvanceForward }">Next</a>
  </div>
</template>

<script>
  export default {
    name: 'navigation',
    data() {
      return {
        parentContainer: this.$parent,
      };
    },
    computed: {
      canAdvanceForward() {
        return this.parentContainer.canAdvanceForward || false;
      },
      canAdvanceBackward() {
        return this.parentContainer.canAdvanceBackward || false;
      },
    },
    methods: {
      triggerPageAdvance(direction) {
        if (direction) {
          this.$parent.advancePage(direction);
        } else {
          this.$parent.advancePage();
        }
      },
    },
  };
</script>

<style scoped>
  .disabled {
    opacity: 0.5;
    cursor: default;
  }
</style>

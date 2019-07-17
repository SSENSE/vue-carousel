<template>
  <div class="VueCarousel-navigation">
    <button
      type="button"
      aria-label="Previous page"
      :tabindex="canAdvanceBackward ? 0 : -1"
      class="VueCarousel-navigation-button VueCarousel-navigation-prev"
      v-on:click.prevent="triggerPageAdvance('backward')"
      v-bind:class="{ 'VueCarousel-navigation--disabled': !canAdvanceBackward }"
      v-bind:style="`padding: ${clickTargetSize}px; margin-right: -${clickTargetSize}px;`"
      v-html="prevLabel"></button>
    <button
      type="button"
      aria-label="Next page"
      :tabindex="canAdvanceForward ? 0 : -1"
      class="VueCarousel-navigation-button VueCarousel-navigation-next"
      v-on:click.prevent="triggerPageAdvance('forward')"
      v-bind:class="{ 'VueCarousel-navigation--disabled': !canAdvanceForward }"
      v-bind:style="`padding: ${clickTargetSize}px; margin-left: -${clickTargetSize}px;`"
      v-html="nextLabel"></button>
  </div>
</template>

<script>
export default {
  name: "navigation",
  inject: ["carousel"],
  props: {
    /**
     * Amount of padding to apply around the label in pixels
     */
    clickTargetSize: {
      type: Number,
      default: 8
    },
    /**
     * Text content of the navigation next button
     */
    nextLabel: {
      type: String,
      default: "&#9654"
    },
    /**
     * Text content of the navigation prev button
     */
    prevLabel: {
      type: String,
      default: "&#9664"
    }
  },
  computed: {
    /**
     * @return {Boolean} Can the slider move forward?
     */
    canAdvanceForward() {
      return this.carousel.canAdvanceForward || false;
    },
    /**
     * @return {Boolean} Can the slider move backward?
     */
    canAdvanceBackward() {
      return this.carousel.canAdvanceBackward || false;
    }
  },
  methods: {
    /**
     * Trigger page change on +/- 1 depending on the direction
     * @param {"backward"} [direction]
     * @return {void}
     */
    triggerPageAdvance(direction) {
      /**
       * @event paginationclick
       * @type {string}
       */
      this.$emit("navigationclick", direction);
    }
  }
};
</script>

<template>
  <div class="carousel">
    <div
      class="carousel-inner"
      v-bind:style="`
        width: ${carouselInnerWidth}px;
        transform: translateX(${currentOffset}px);
        transition: ${!mousedown || isAnimating ? transitionStyle : 'none'};
      `"
    >
      <slot></slot>
    </div>
    <navigation v-if="navigationEnabled"></navigation>
    <pagination v-if="paginationEnabled && pageCount > 0"></pagination>
</template>

<script>
  import { debounce, runIfBrowser } from './utils/index';

  import Navigation from './Navigation.vue';
  import Pagination from './Pagination.vue';

  export default {
    name: 'carousel',
    components: {
      Navigation,
      Pagination,
    },
    data() {
      return {
        browserWidth: null,
        carouselWidth: null,
        currentPage: 0,
        dragOffset: 0,
        dragStartX: 0,
        isAnimating: false,
        slideCount: null,
        slideWidth: null,
        mousedown: false,
      };
    },
    props: {
      /**
       * Slide transition easing
       * Any valid CSS transition easing accepted
       */
      easing: {
        type: String,
        default: 'ease',
      },
      /**
       * Flag to render the navigation component
       * (next/prev buttons)
       */
      navigationEnabled: {
        type: Boolean,
        default: false,
      },
      /**
       * The fill color of the active pagination dot
       * Any valid CSS color is accepted
       */
      paginationActiveColor: {
        type: String,
        default: '#000000',
      },
      /**
       * The fill color of pagination dots
       * Any valid CSS color is accepted
       */
      paginationColor: {
        type: String,
        default: '#efefef',
      },
      /**
       * Flag to render pagination component
       */
      paginationEnabled: {
        type: Boolean,
        default: true,
      },
      /**
       * The padding inside each pagination dot
       * Pixel values are accepted
       */
      paginationPadding: {
        type: Number,
        default: 10,
      },
      /**
       * The size of each pagination dot
       * Pixel values are accepted
       */
      paginationSize: {
        type: Number,
        default: 10,
      },
      /**
       * Maximum number of slides displayed on each page
       */
      perPage: {
        type: Number,
        default: 2,
      },
      /**
       * Configure the number of visible slides with a particular browser width.
       * This will be an array of arrays, ex. [[320, 2], [1199, 4]]
       * Formatted as [x, y] where x=browser width, and y=number of slides displayed.
       * ex. [1199, 4] means if (window <= 1199) then show 4 slides per page
       */
      perPageCustom: {
        type: Array,
      },
      /**
       * Scroll per page, not per item
       */
      scrollPerPage: {
        type: Boolean,
        default: false,
      },
      /**
       * Slide transition speed
       * Number of milliseconds accepted
       */
      speed: {
        type: Number,
        default: 500,
      },
    },
    computed: {
      /**
       * @return {Boolean} Can the slider move forward?
       */
      canAdvanceForward() {
        return (this.currentPage < (this.pageCount - 1));
      },
      /**
       * @return {Boolean} Can the slider move backward?
       */
      canAdvanceBackward() {
        return (this.currentPage > 0);
      },
      /**
       * Calculated width of the inner wrapper.
       * This wrapper will animate horizontally while navigating.
       * @return {Number} The width of the wrapper in pixels
       */
      carouselInnerWidth() {
        const innerWidth = this.slideWidth * this.slideCount;

        return innerWidth;
      },
      /**
       * Number of slides to display per page in the current context.
       * This is constant unless responsive perPage option is set.
       * @return {Number} The number of slides per page to display
       */
      currentPerPage() {
        if (!this.perPageCustom) {
          return this.perPage; // If no custom breakpoints specified, use the default perPage prop.
        }

        let customItems = null;

        runIfBrowser(() => {
          if (this.browserWidth) {
            customItems = this.getBreakpointSlidesPerPage(this.perPageCustom, this.browserWidth);
          }
        });

        return customItems;
      },
      /**
       * The horizontal distance the inner wrapper is offset while navigating.
       * @return {Number} Pixel value of offset to apply
       */
      currentOffset() {
        const page = this.currentPage;
        const width = this.slideWidth;
        const dragged = this.dragOffset;

        // The offset distance depends on whether the scrollPerPage option is active.
        // If this option is active, the offset will be determined per page rather than per item.
        const offset = (this.scrollPerPage) ? (page * width * this.currentPerPage) : (page * width);

        return (offset + dragged) * -1;
      },
      isHidden() {
        return (this.carouselWidth <= 0);
      },
      /**
       * Calculate the number of pages of slides
       * @return {Number} Number of pages
       */
      pageCount() {
        const slideCount = this.slideCount;
        const perPage = this.currentPerPage;
        let pageCount = 0;

        if (this.scrollPerPage) {
          const pages = Math.ceil(slideCount / perPage);
          pageCount = (pages < 1) ? 1 : pages; // Be sure to not round down to zero pages
        } else {
          pageCount = (slideCount - (this.currentPerPage - 1));
        }
        return pageCount;
      },
      transitionStyle() {
        return `${this.speed / 1000}s ${this.easing} transform`;
      },
    },
    methods: {
      /**
       * Increase/decrease the current page value
       * @param  {String} direction (Optional) The direction to advance
       */
      advancePage(direction) {
        if (direction && direction === 'backward' && this.canAdvanceBackward) {
          this.goToPage(this.currentPage - 1);
        } else if (
          (
            !direction
            || (direction && direction !== 'backward'))
            && this.canAdvanceForward
          ) {
          this.goToPage(this.currentPage + 1);
        }
      },
      /**
       * Calculate the width of each slide
       * @return {Number} Slide width
       */
      calculateSlideWidth() {
        const width = this.carouselWidth;
        const perPage = this.currentPerPage;

        this.slideWidth = width / perPage;
        this.setChildSlideWidth(this.slideWidth);

        return this.slideWidth;
      },
      /**
       * Given a viewport width, find the number of slides to display
       * @param  {Number} width Current viewport width in pixels
       * @return {Number}       Number of slides to display
       */
      getBreakpointSlidesPerPage(breakpointArray, width) {
        const breakpoints = breakpointArray.sort((a, b) => {
          const isMatching = (a[0] > b[0]) ? -1 : 1;
          return isMatching;
        });

        // Reduce the breakpoints to entries where the width is in range
        // The breakpoint arrays are formatted as [widthToMatch, numberOfSlides]
        const matches = breakpoints.filter((breakpoint) => {
          const isMatching = (width >= breakpoint[0]);
          return isMatching;
        });

        // If there is a match, the result should return only
        // the slide count from the first matching breakpoint
        const match = matches[0] && matches[0][1];

        return match || this.perPage;
      },
      /**
       * Get the current browser viewport width
       * @return {Number} Browser's width in pixels
       */
      getBrowserWidth() {
        this.browserWidth = window.innerWidth;
        return this.browserWidth;
      },
      /**
       * Get the width of the carousel DOM element
       * @return {Number} Width of the carousel in pixels
       */
      getCarouselWidth() {
        this.carouselWidth = (this.$el && this.$el.clientWidth) || 0; // Assign globally
        return this.carouselWidth;
      },
      /**
       * Get the number of slides
       * @return {Number} Number of slides
       */
      getSlideCount() {
        return (this.$slots && this.$slots.default && this.$slots.default.length) || 0;
      },
      /**
       * Set the current page to a specific value
       * This function will only apply the change if the value is within the carousel bounds
       * @param  {Number} page The value of the new page number
       */
      goToPage(page) {
        if ((page >= 0) && (page <= this.pageCount)) {
          this.currentPage = page;
        }
      },
      /**
       * Trigger actions when mouse is pressed
       * @param  {Object} e The event object
       */
      handleMousedown(e) {
        if (!e.touches) { e.preventDefault(); }

        this.mousedown = true;
        this.dragStartX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX;

        if ('ontouchstart' in window) {
          this.$el.addEventListener('touchmove', this.handleMousemove);
        } else {
          this.$el.addEventListener('mousemove', this.handleMousemove);
        }
      },
      /**
       * Trigger actions when mouse is released
       * @param  {Object} e The event object
       */
      handleMouseup() {
        this.mousedown = false;
        this.dragOffset = 0;

        if ('ontouchstart' in window) {
          this.$el.removeEventListener('touchmove', this.handleMousemove);
        } else {
          this.$el.removeEventListener('mousemove', this.handleMousemove);
        }
      },
      /**
       * Trigger actions when mouse is pressed and then moved (mouse drag)
       * @param  {Object} e The event object
       */
      handleMousemove(e) {
        if (!this.mousedown) {
          return;
        }

        const eventPosX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX;
        const deltaX = (this.dragStartX - eventPosX); // Distance the mouse has moved

        this.dragOffset = deltaX; // Drag offset to update the carousel's transform in real time

        if (this.dragOffset >= (this.slideWidth / 2)) { // Moved far enough to advance forward?
          this.handleMouseup(); // Unbind the mousemove event
          this.advancePage(); // Trigger the movement forward
        } else if (
          this.dragOffset <= ((this.slideWidth / 2) * -1) // ... far enough to advance backeard?
        ) {
          this.mousedown = false;
          this.handleMouseup(); // Unbind the mousemove event
          this.advancePage('backward'); // Trigger the movement forward
        }
      },
      /**
       * Trigger actions caused by window resizing
       */
      handleResize() {
        this.getBrowserWidth();
        this.recomputeCarouselWidth();
      },
      /**
       * If the carousel is hidden on init, slide widths cannot be calculated.
       * Dirty checking is applied in this case.
       * Once a width is found, the polling is stopped and the carousel is recalculated.
       */
      pollForWidth() {
        if (!this.pollInterval) {
          this.pollInterval = setInterval(() => {
            if (this.getCarouselWidth() > 0) {
              this.recomputeCarouselWidth();
              clearInterval(this.pollInterval);
            }
          }, 100);
        }
      },
      /**
       * Re-compute the width of the carousel and its slides
       */
      recomputeCarouselWidth() {
        this.getCarouselWidth();
        this.calculateSlideWidth();
        this.setCurrentPageInBounds();
      },
      /**
       * Assign widths to child slides within slots
       * @param {Number} width Width to set on slides
       */
      setChildSlideWidth(width) {
        if (this.$slots.default) {
          this.$slots.default.forEach((child) => {
            const slotChild = child;
            slotChild.child.width = width;
          });
        }
      },
      /**
       * When the current page exceeds the carousel bounds, reset it to the maximum allowed
       */
      setCurrentPageInBounds() {
        if (!this.canAdvanceForward) {
          const setPage = (this.pageCount - 1);
          this.currentPage = (setPage >= 0) ? setPage : 0;
        }
      },
    },
    mounted() {
      runIfBrowser(() => {
        this.getBrowserWidth();

        window.addEventListener('resize', debounce(this.handleResize, 16));

        if ('ontouchstart' in window) {
          this.$el.addEventListener('touchstart', this.handleMousedown);
          this.$el.addEventListener('touchend', this.handleMouseup);
        } else {
          this.$el.addEventListener('mousedown', this.handleMousedown);
          this.$el.addEventListener('mouseup', this.handleMouseup);
        }
      });

      this.slideCount = this.getSlideCount();
      this.recomputeCarouselWidth();

      if (this.isHidden) {
        this.pollForWidth();
      }
    },
    destroyed() {
      runIfBrowser(() => {
        window.removeEventListener('resize', this.getBrowserWidth);
      });
    },
  };
</script>

<style scoped>
.carousel {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.carousel-inner {
  backface-visibility: hidden;
}
</style>

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
    <navigation v-if="navigation.enabled"></navigation>
    <pagination v-if="pagination.enabled && pageCount > 0"></pagination>
</template>

<script>
  import { debounce, runIfBrowser } from './utils/index';

  import Navigation from './Navigation.vue';
  import Pagination from './Pagination.vue';

  export default {
    name: 'carousel',
    components: {
      Navigation,
      Pagination
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
       * Navigation settings
       * @type {Object}
       */
      navigation: {
        type: Object,
        default() {
          return {
            enabled: false,
          };
        },
      },
      /**
       * Pagination settings
       * @type {Object}
       */
      pagination: {
        type: Object,
        default() {
          return {
            enabled: true,
            activeColor: '#000000', // any valid CSS color
            color: '#efefef', // any valid CSS color
            padding: 10, // in pixels
            size: 10, // in pixels
            speed: 500, // transition speed in milliseconds
            easing: 'ease', // any valid CSS transform ease
          };
        },
      },
      /**
       * Maximum amount of slides displayed at a time
       */
      perPage: {
        type: Number,
        default: 4,
      },
      /**
       * Preset the number of visible slides with a particular browser width.
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
            customItems = this.getBreakpointSlidesPerPage(this.browserWidth);
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
        return `${this.pagination.speed / 1000}s ${this.pagination.easing} transform`;
      }
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
       * @param  {Number} width Viewport width in pixels
       * @return {Number}       Number of slides to display
       */
      getBreakpointSlidesPerPage(width) {
        let match = null;

        // Look through the prop array for entries where the width matches the breakpoint
        // The array must contain entries with this format: [winWidth, numberOfSlides]
        this.perPageCustom.forEach((breakpoint) => {
          if (!match && width <= breakpoint[0]) {
            match = breakpoint[1]; // If there is a match, return the breakpoint's number of slides
          }
        });

        if (!match) {
          match = this.perPage; // If no match is found, use the default perPage prop
        }

        return match;
      },
      /**
       * Get the current browser viewport width
       * @return {Number} Browser's width in pixels
       */
      getBrowserWidth() {
        this.browserWidth = document.documentElement.clientWidth;
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
        const children = this.$slots.default;
        let count = 0;

        if (!children.length) {
          this.slideCount = 0;
          return 0;
        }
        children.forEach((component) => {
          if (component.child.$options._componentTag === 'slide') { // eslint-disable-line no-underscore-dangle,max-len
            count += 1;
          }
        });

        this.slideCount = count;
        return this.slideCount;
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
        e.preventDefault();

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
        if (this.$slots.default.length > 0) {
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

        window.addEventListener('resize', debounce(() => {
          this.handleResize();
        }, 16));

        if ('ontouchstart' in window) {
          this.$el.addEventListener('touchstart', this.handleMousedown);
          this.$el.addEventListener('touchend', this.handleMouseup);
        } else {
          this.$el.addEventListener('mousedown', this.handleMousedown);
          this.$el.addEventListener('mouseup', this.handleMouseup);
        }
      });

      this.getSlideCount();
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

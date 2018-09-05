<template>
  <section class="VueCarousel">
    <div class="VueCarousel-wrapper"
      ref="VueCarousel-wrapper">
      <div ref="VueCarousel-inner"
        class="VueCarousel-inner"
        role="listbox"
        :style="{
          'transform': `translate(${currentOffset}px, 0)`,
          'transition': dragging ? 'none' : transitionStyle,
          'ms-flex-preferred-size': `${slideWidth}px`,
          'webkit-flex-basis': `${slideWidth}px`,
          'flex-basis': `${slideWidth}px`,
          'visibility': slideWidth ? 'visible' : 'hidden',
          'padding-left': `${padding}px`,
          'padding-right': `${padding}px`
        }">
        <slot></slot>
      </div>
    </div>
    <pagination v-if="paginationEnabled && pageCount > 0"
      @paginationclick="goToPage($event, 'pagination')"/>
    <navigation v-if="navigationEnabled"
      :clickTargetSize="navigationClickTargetSize"
      :nextLabel="navigationNextLabel"
      :prevLabel="navigationPrevLabel"
      @navigationclick="handleNavigation"/>
  </section>
</template>
<script>
import autoplay from "./mixins/autoplay";
import debounce from "./utils/debounce";
import Navigation from "./Navigation.vue";
import Pagination from "./Pagination.vue";
import Slide from "./Slide.vue";

const transitionStartNames = {
  onwebkittransitionstart: "webkitTransitionStart",
  onmoztransitionstart: "transitionstart",
  onotransitionstart: "oTransitionStart otransitionstart",
  ontransitionstart: "transitionstart"
};
const transitionEndNames = {
  onwebkittransitionend: "webkitTransitionEnd",
  onmoztransitionend: "transitionend",
  onotransitionend: "oTransitionEnd otransitionend",
  ontransitionend: "transitionend"
};
const getTransitionStart = () => {
  for (let name in transitionStartNames) {
    if (name in window) {
      return transitionStartNames[name];
    }
  }
};
const getTransitionEnd = () => {
  for (let name in transitionEndNames) {
    if (name in window) {
      return transitionEndNames[name];
    }
  }
};

export default {
  name: "carousel",
  beforeUpdate() {
    this.computeCarouselWidth();
  },
  components: {
    Navigation,
    Pagination,
    Slide
  },
  data() {
    return {
      browserWidth: null,
      carouselWidth: 0,
      currentPage: 0,
      dragging: false,
      dragMomentum: 0,
      dragOffset: 0,
      dragStartY: 0,
      dragStartX: 0,
      isTouch: typeof window !== "undefined" && "ontouchstart" in window,
      offset: 0,
      refreshRate: 16,
      slideCount: 0,
      transitionstart: "transitionstart",
      transitionend: "transitionend"
    };
  },
  mixins: [autoplay],
  // use `provide` to avoid `Slide` being nested with other components
  provide() {
    return {
      carousel: this
    };
  },
  props: {
    /**
     * Support for v-model functionality
     */
    value: {
      type: Number
    },
    /**
     * Slide transition easing
     * Any valid CSS transition easing accepted
     */
    easing: {
      type: String,
      default: "ease"
    },
    /**
     * Minimum distance for the swipe to trigger
     * a slide advance
     */
    minSwipeDistance: {
      type: Number,
      default: 8
    },
    /**
     * Amount of padding to apply around the label in pixels
     */
    navigationClickTargetSize: {
      type: Number,
      default: 8
    },
    /*
     * Flag to toggle mouse dragging
     */
    mouseDrag: {
      type: Boolean,
      default: true
    },
    /**
     * Flag to render the navigation component
     * (next/prev buttons)
     */
    navigationEnabled: {
      type: Boolean,
      default: false
    },
    /**
     * Text content of the navigation next button
     */
    navigationNextLabel: {
      type: String,
      default: "&#9654"
    },
    /**
     * Text content of the navigation prev button
     */
    navigationPrevLabel: {
      type: String,
      default: "&#9664"
    },
    /**
     * The fill color of the active pagination dot
     * Any valid CSS color is accepted
     */
    paginationActiveColor: {
      type: String,
      default: "#000000"
    },
    /**
     * The fill color of pagination dots
     * Any valid CSS color is accepted
     */
    paginationColor: {
      type: String,
      default: "#efefef"
    },
    /**
     * Flag to render pagination component
     */
    paginationEnabled: {
      type: Boolean,
      default: true
    },
    /**
     * The padding inside each pagination dot
     * Pixel values are accepted
     */
    paginationPadding: {
      type: Number,
      default: 10
    },
    /**
     * The size of each pagination dot
     * Pixel values are accepted
     */
    paginationSize: {
      type: Number,
      default: 10
    },
    /**
     * Maximum number of slides displayed on each page
     */
    perPage: {
      type: Number,
      default: 2
    },
    /**
     * Configure the number of visible slides with a particular browser width.
     * This will be an array of arrays, ex. [[320, 2], [1199, 4]]
     * Formatted as [x, y] where x=browser width, and y=number of slides displayed.
     * ex. [1199, 4] means if (window <= 1199) then show 4 slides per page
     */
    perPageCustom: {
      type: Array
    },
    /**
     * Resistance coefficient to dragging on the edge of the carousel
     * This dictates the effect of the pull as you move towards the boundaries
     */
    resistanceCoef: {
      type: Number,
      default: 20
    },
    /**
     * Scroll per page, not per item
     */
    scrollPerPage: {
      type: Boolean,
      default: true
    },
    /**
     * Slide transition speed
     * Number of milliseconds accepted
     */
    speed: {
      type: Number,
      default: 500
    },
    /**
     * Flag to make the carousel loop around when it reaches the end
     */
    loop: {
      type: Boolean,
      default: false
    },
    /**
     * Listen for an external navigation request using this prop.
     * Updated to implement navigation without animation by passing an array instead of a number
     */
    navigateTo: {
      type: [Number, Array],
      default: 0
    },
    /**
     *  Space padding option adds left and right padding style (in pixels) onto VueCarousel-inner.
     */
    spacePadding: {
      type: Number,
      default: 0
    },
    /**
     *  Specify by how much should the space padding value be multiplied of, to re-arange the final slide padding.
     */
    spacePaddingMaxOffsetFactor: {
      type: Number,
      default: 0
    }
  },

  watch: {
    value(val) {
      if (val !== this.currentPage) {
        this.goToPage(val);
        this.render();
      }
    },
    navigateTo: {
      immediate: true,
      handler(val) {
        // checking if val is an array, for arrays typeof returns object
        if (typeof val === "object") {
          if (val[1] == false) {
            // following code is to disable animation
            this.dragging = true;

            // clear dragging after refresh rate
            setTimeout(() => {
              this.dragging = false;
            }, this.refreshRate);
          }

          this.$nextTick(() => {
            this.goToPage(val[0]);
          });
        } else {
          this.$nextTick(() => {
            this.goToPage(val);
          });
        }
      }
    },
    currentPage(val) {
      this.$emit("pageChange", val);
      this.$emit("input", val);
    }
  },

  computed: {
    /**
     * Given a viewport width, find the number of slides to display
     * @param  {Number} width Current viewport width in pixels
     * @return {Number} Number of slides to display
     */
    breakpointSlidesPerPage() {
      if (!this.perPageCustom) {
        return this.perPage;
      }

      const breakpointArray = this.perPageCustom;
      const width = this.browserWidth;

      const breakpoints = breakpointArray.sort(
        (a, b) => (a[0] > b[0] ? -1 : 1)
      );

      // Reduce the breakpoints to entries where the width is in range
      // The breakpoint arrays are formatted as [widthToMatch, numberOfSlides]
      const matches = breakpoints.filter(breakpoint => width >= breakpoint[0]);

      // If there is a match, the result should return only
      // the slide count from the first matching breakpoint
      const match = matches[0] && matches[0][1];

      return match || this.perPage;
    },
    /**
     * @return {Boolean} Can the slider move forward?
     */
    canAdvanceForward() {
      return this.loop || this.offset < this.maxOffset;
    },
    /**
     * @return {Boolean} Can the slider move backward?
     */
    canAdvanceBackward() {
      return this.loop || this.currentPage > 0;
    },
    /**
     * Number of slides to display per page in the current context.
     * This is constant unless responsive perPage option is set.
     * @return {Number} The number of slides per page to display
     */
    currentPerPage() {
      return !this.perPageCustom || this.$isServer
        ? this.perPage
        : this.breakpointSlidesPerPage;
    },
    /**
     * The horizontal distance the inner wrapper is offset while navigating.
     * @return {Number} Pixel value of offset to apply
     */
    currentOffset() {
      return (this.offset + this.dragOffset) * -1;
    },
    isHidden() {
      return this.carouselWidth <= 0;
    },
    /**
     * Maximum offset the carousel can slide
     * Considering the spacePadding
     * @return {Number}
     */
    maxOffset() {
      return (
        this.slideWidth * (this.slideCount - this.currentPerPage) -
        this.spacePadding * this.spacePaddingMaxOffsetFactor
      );
    },
    /**
     * Calculate the number of pages of slides
     * @return {Number} Number of pages
     */
    pageCount() {
      return this.scrollPerPage
        ? Math.ceil(this.slideCount / this.currentPerPage)
        : this.slideCount - 2;
    },
    /**
     * Calculate the width of each slide
     * @return {Number} Slide width
     */
    slideWidth() {
      const width = this.carouselWidth - this.spacePadding * 2;
      const perPage = this.currentPerPage;

      return width / perPage;
    },
    transitionStyle() {
      return `${this.speed / 1000}s ${this.easing} transform`;
    },
    padding() {
      const padding = this.spacePadding;
      return padding > 0 ? padding : false;
    }
  },
  methods: {
    /**
     * @return {Number} The index of the next page
     * */
    getNextPage() {
      if (this.currentPage < this.pageCount - 1) {
        return this.currentPage + 1;
      }
      return this.loop ? 0 : this.currentPage;
    },
    /**
     * @return {Number} The index of the previous page
     * */
    getPreviousPage() {
      if (this.currentPage > 0) {
        return this.currentPage - 1;
      }
      return this.loop ? this.pageCount - 1 : this.currentPage;
    },
    /**
     * Increase/decrease the current page value
     * @param  {String} direction (Optional) The direction to advance
     */
    advancePage(direction) {
      if (direction && direction === "backward" && this.canAdvanceBackward) {
        this.goToPage(this.getPreviousPage(), "navigation");
      } else if (
        (!direction || (direction && direction !== "backward")) &&
        this.canAdvanceForward
      ) {
        this.goToPage(this.getNextPage(), "navigation");
      }
    },
    /**
     * A mutation observer is used to detect changes to the containing node
     * in order to keep the magnet container in sync with the height its reference node.
     */
    attachMutationObserver() {
      const MutationObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;

      if (MutationObserver) {
        const config = { attributes: true, data: true };
        this.mutationObserver = new MutationObserver(() => {
          this.$nextTick(() => {
            this.computeCarouselWidth();
          });
        });
        if (this.$parent.$el) {
          let carouselInnerElements = this.$el.getElementsByClassName(
            "VueCarousel-inner"
          );
          for (let i = 0; i < carouselInnerElements.length; i++) {
            this.mutationObserver.observe(carouselInnerElements[i], config);
          }
        }
      }
    },
    handleNavigation(direction) {
      this.advancePage(direction);
    },
    /**
     * Stop listening to mutation changes
     */
    detachMutationObserver() {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
      }
    },
    /**
     * Get the current browser viewport width
     * @return {Number} Browser"s width in pixels
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
      let carouselInnerElements = this.$el.getElementsByClassName(
        "VueCarousel-inner"
      );
      for (let i = 0; i < carouselInnerElements.length; i++) {
        if (carouselInnerElements[i].clientWidth > 0) {
          this.carouselWidth = carouselInnerElements[i].clientWidth || 0;
        }
      }
      return this.carouselWidth;
    },
    /**
     * Filter slot contents to slide instances and return length
     * @return {Number} The number of slides
     */
    getSlideCount() {
      this.slideCount =
        (this.$slots &&
          this.$slots.default &&
          this.$slots.default.filter(
            slot => slot.tag && slot.tag.indexOf("slide") > -1
          ).length) ||
        0;
    },
    /**
     * Set the current page to a specific value
     * This function will only apply the change if the value is within the carousel bounds
     * @param  {Number} page The value of the new page number
     */
    goToPage(page) {
      if (page >= 0 && page <= this.pageCount) {
        this.offset = this.scrollPerPage
          ? Math.min(
              this.slideWidth * this.currentPerPage * page,
              this.maxOffset
            )
          : Math.min(this.slideWidth * page, this.maxOffset);

        // restart autoplay if specified
        if (this.autoplay && !this.autoplayHoverPause) {
          this.restartAutoplay();
        }

        // update the current page
        this.currentPage = page;
      }
    },
    /**
     * Trigger actions when mouse is pressed
     * @param  {Object} e The event object
     */
    /* istanbul ignore next */
    onStart(e) {
      // alert("start");
      document.addEventListener(
        this.isTouch ? "touchend" : "mouseup",
        this.onEnd,
        true
      );

      document.addEventListener(
        this.isTouch ? "touchmove" : "mousemove",
        this.onDrag,
        true
      );

      this.startTime = e.timeStamp;
      this.dragging = true;
      this.dragStartX = this.isTouch ? e.touches[0].clientX : e.clientX;
      this.dragStartY = this.isTouch ? e.touches[0].clientY : e.clientY;
    },
    /**
     * Trigger actions when mouse is released
     * @param  {Object} e The event object
     */

    onEnd(e) {
      // compute the momemtum speed
      const eventPosX = this.isTouch ? e.changedTouches[0].clientX : e.clientX;
      const deltaX = this.dragStartX - eventPosX;
      this.dragMomentum = deltaX / (e.timeStamp - this.startTime);

      // take care of the minSwipteDistance prop, if not 0 and delta is bigger than delta
      if (
        this.minSwipeDistance !== 0 &&
        Math.abs(deltaX) >= this.minSwipeDistance
      ) {
        const width = this.scrollPerPage
          ? this.slideWidth * this.currentPerPage
          : this.slideWidth;
        this.dragOffset = this.dragOffset + Math.sign(deltaX) * (width / 2);
      }

      this.offset += this.dragOffset;
      this.dragOffset = 0;
      this.dragging = false;

      this.render();

      // clear events listeners
      document.removeEventListener(
        this.isTouch ? "touchend" : "mouseup",
        this.onEnd,
        true
      );
      document.removeEventListener(
        this.isTouch ? "touchmove" : "mousemove",
        this.onDrag,
        true
      );
    },
    /**
     * Trigger actions when mouse is pressed and then moved (mouse drag)
     * @param  {Object} e The event object
     */
    onDrag(e) {
      const eventPosX = this.isTouch ? e.touches[0].clientX : e.clientX;
      const eventPosY = this.isTouch ? e.touches[0].clientY : e.clientY;
      const newOffsetX = this.dragStartX - eventPosX;
      const newOffsetY = this.dragStartY - eventPosY;

      // if it is a touch device, check if we are below the min swipe threshold
      // (if user scroll the page on the component)
      if (this.isTouch && Math.abs(newOffsetX) < Math.abs(newOffsetY)) {
        return;
      }

      e.stopImmediatePropagation();

      this.dragOffset = newOffsetX;
      const nextOffset = this.offset + this.dragOffset;
      if (nextOffset < 0) {
        this.dragOffset = -Math.sqrt(-this.resistanceCoef * this.dragOffset);
      } else if (nextOffset > this.maxOffset) {
        this.dragOffset = Math.sqrt(this.resistanceCoef * this.dragOffset);
      }
    },
    onResize() {
      this.computeCarouselWidth();

      this.dragging = true; // force a dragging to disable animation
      this.render();
      // clear dragging after refresh rate
      setTimeout(() => {
        this.dragging = false;
      }, this.refreshRate);
    },
    render() {
      // add extra slides depending on the momemtum speed
      this.offset +=
        Math.max(
          -this.currentPerPage + 1,
          Math.min(Math.round(this.dragMomentum), this.currentPerPage - 1)
        ) * this.slideWidth;

      // & snap the new offset on a slide or page if scrollPerPage
      const width = this.scrollPerPage
        ? this.slideWidth * this.currentPerPage
        : this.slideWidth;
      this.offset = width * Math.round(this.offset / width);

      // clamp the offset between 0 -> maxOffset
      this.offset = Math.max(0, Math.min(this.offset, this.maxOffset));

      // update the current page
      this.currentPage = this.scrollPerPage
        ? Math.round(this.offset / this.slideWidth / this.currentPerPage)
        : Math.round(this.offset / this.slideWidth);
    },
    /**
     * Re-compute the width of the carousel and its slides
     */
    computeCarouselWidth() {
      this.getSlideCount();
      this.getBrowserWidth();
      this.getCarouselWidth();
      this.setCurrentPageInBounds();
    },
    /**
     * When the current page exceeds the carousel bounds, reset it to the maximum allowed
     */
    setCurrentPageInBounds() {
      if (!this.canAdvanceForward && this.scrollPerPage) {
        const setPage = this.pageCount - 1;
        this.currentPage = setPage >= 0 ? setPage : 0;
        this.offset = Math.max(0, Math.min(this.offset, this.maxOffset));
      }
    },
    handleTransitionStart() {
      this.$emit("transitionStart");
    },
    handleTransitionEnd() {
      this.$emit("transitionEnd");
    }
  },
  mounted() {
    window.addEventListener(
      "resize",
      debounce(this.onResize, this.refreshRate)
    );

    // setup the start event only if touch device or mousedrag activated
    if (this.isTouch || this.mouseDrag) {
      this.$refs["VueCarousel-wrapper"].addEventListener(
        this.isTouch ? "touchstart" : "mousedown",
        this.onStart
      );
    }

    this.attachMutationObserver();
    this.computeCarouselWidth();

    this.transitionstart = getTransitionEnd();
    this.$refs["VueCarousel-inner"].addEventListener(
      this.transitionstart,
      this.handleTransitionStart
    );
    this.transitionend = getTransitionEnd();
    this.$refs["VueCarousel-inner"].addEventListener(
      this.transitionend,
      this.handleTransitionEnd
    );

    this.$emit("mounted");
  },
  beforeDestroy() {
    this.detachMutationObserver();
    window.removeEventListener("resize", this.getBrowserWidth);
    this.$refs["VueCarousel-inner"].removeEventListener(
      this.transitionstart,
      this.handleTransitionStart
    );
    this.$refs["VueCarousel-inner"].removeEventListener(
      this.transitionend,
      this.handleTransitionEnd
    );

    this.$refs["VueCarousel-wrapper"].removeEventListener(
      this.isTouch ? "touchstart" : "mousedown",
      this.onStart
    );
  }
};
</script>
<style>
.VueCarousel {
  position: relative;
}

.VueCarousel-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.VueCarousel-inner {
  display: flex;
  flex-direction: row;
  backface-visibility: hidden;
}
</style>

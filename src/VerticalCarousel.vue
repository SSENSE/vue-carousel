<template>
    <div
      class="VerticalCarousel"
      v-bind:class="{ 'VerticalCarousel--reverse': paginationPosition === 'top' }"
    >
      <div
        class="VerticalCarousel-wrapper"
        ref="VerticalCarousel-wrapper"
      >
        <div
          ref="VerticalCarousel-inner"
          :class="[
            'VerticalCarousel-inner',
            { 'VerticalCarousel-inner--center': isCenterModeEnabled }
          ]"
          :style="{
            'transform': `translate(0, ${currentOffset}px)`, // Adjusted for vertical translation
            'transition': dragging ? 'none' : transitionStyle,
            'ms-flex-preferred-size': `${slideHeight}px`, // Adjusted for vertical carousel
            'webkit-flex-basis': `${slideHeight}px`, // Adjusted for vertical carousel
            'flex-basis': `${slideHeight}px`, // Adjusted for vertical carousel
            'visibility': slideHeight ? 'visible' : 'hidden', // Adjusted for vertical carousel
            'width': `${currentWidth}`, // Adjusted for vertical carousel
            'padding-top': `${padding}px`, // Adjusted for vertical carousel
            'padding-bottom': `${padding}px` // Adjusted for vertical carousel
          }"
        >
          <slot></slot>
        </div>
      </div>
  
      <!-- Navigation slot for arrow buttons -->
      <slot name="navigation" v-if="navigationEnabled">
        <navigation
          v-if="isNavigationRequired"
          :clickTargetSize="navigationClickTargetSize"
          :nextLabel="navigationNextLabel"
          :prevLabel="navigationPrevLabel"
          @navigationclick="handleNavigation"
        />
      </slot>
    </div>
  </template>
  
  <script>
  import Navigation from "./Navigation.vue";
  import Slide from "./Slide.vue";
  import debounce from "./utils/debounce";

  export default {
    name: "VerticalCarousel",
    components: {
      Navigation,
      Slide
    },
    data() {
      return {
        browserHeight: null,
        carouselHeight: 0,
        currentPage: 0,
        dragging: false,
        dragMomentum: 0,
        dragOffset: 0,
        dragStartY: 0,
        isTouch: typeof window !== "undefined" && "ontouchstart" in window,
        offset: 0,
        refreshRate: 16,
        slideCount: 0,
        currentHeight: "auto"
      };
    },
    // use `provide` to avoid `Slide` being nested with other components
    provide() {
      return {
        carousel: this
      };
    },
    props: {
      /**
       *  Adjust the height of the carousel for the current slide
       */
      adjustableHeight: {
        type: Boolean,
        default: false
      },
      /**
       * Slide transition easing for adjustableHeight
       * Any valid CSS transition easing accepted
       */
      adjustableHeightEasing: {
        type: String
      },
      adjustableWidth: {
        type: Boolean,
        default: false
    },
      /**
       *  Center images when the size is less than the container width
       */
      centerMode: {
        type: Boolean,
        default: false
      },
      /**
       * Slide transition easing
       * Any valid CSS transition easing accepted
       */
      easing: {
        type: String,
        validator: function(value) {
          return (
            ["ease"].indexOf(
              value
            ) !== -1 || value.includes("cubic-bezier")
          );
        },
        default: "ease"
      },
     
      mouseDrag: {
        type: Boolean,
        default: true
      },
      /**
       * Flag to toggle touch dragging
       */
      touchDrag: {
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
       * Maximum number of slides displayed on each page
       */
      perPage: {
        type: Number,
        default: 2
      },
      /**
       * Configure the number of visible slides with a particular browser height.
       * This will be an array of arrays, ex. [[2, 320], [4, 1000]]
       * Formatted as [x, y] where x=number, and y=browserheight of slides displayed.
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
       * Name (tag) of slide component
       * Overwrite when extending slide component
       */
      tagName: {
        type: String,
        default: "slide"
      },
      /**
       * Support for v-model functionality
       */
      value: {
        type: Number
      },
      /**
         * Enable top to bottom navigation
         */
      ttb: {
        type: Boolean,
        default: false
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
        this.$emit("page-change", val);
        this.$emit("input", val);
      }
    },
    computed: {
      /**
     * Given a viewport height, find the number of slides to display
     * @return {Number} Number of slides to display
     */
      breakpointSlidesPerPage() {
        if (!this.perPageCustom) {
          return this.perPage;
        }
  
        const breakpointArray = this.perPageCustom;
        const height = this.browserHeight;
  
        const breakpoints = breakpointArray.sort(
          (a, b) => (a[0] > b[0] ? -1 : 1)
        );
  
        // Reduce the breakpoints to entries where the height is in range
        // The breakpoint arrays are formatted as [numofslides, heightToMatch]
        const matches = breakpoints.filter(breakpoint => height >= breakpoint[0]);
  
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
        // Adjusted for vertical offset
         return this.isCenterModeEnabled ? 0 : this.offset * (this.ttl ? 1 : -1);
      },
      isHidden() {
        return this.carouselHeight <= 0;
      },
      /**
       * Maximum offset the carousel can slide
       * Considering the spacePadding
       * @return {Number}
       */
      maxOffset() {
        return Math.max(
            this.slideHeight * (this.slideCount - this.currentPerPage) -
                this.spacePadding * this.spacePaddingMaxOffsetFactor,
          0
        );
      },
      /**
       * Calculate the number of pages of slides
       * @return {Number} Number of pages
       */
      pageCount() {
        return this.scrollPerPage
          ? Math.ceil(this.slideCount / this.currentPerPage)
          : this.slideCount - this.currentPerPage + 1;
      },
      /**
       * Calculate the height of each slide
       * @return {Number} Slide height
       */
       slideHeight() {
        // Adjusted to calculate slide height for vertical carousel
        const height = this.carouselHeight - this.spacePadding * 2;
        const perPage = this.currentPerPage;

        return height / perPage;
        },
      /**
       * @return {Boolean} Is navigation required?
       */
      isNavigationRequired() {
        return this.slideCount > this.currentPerPage;
      },
      /**
       * @return {Boolean} Center images when have less than min currentPerPage value
       */
      isCenterModeEnabled() {
        return this.centerMode && !this.isNavigationRequired;
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
      handleNavigation(direction) {
        this.advancePage(direction);
        this.$emit("navigation-click", direction);
      },
      
      /**
       * Get the current browser viewport width
       * @return {Number} Browser"s width in pixels
       */
      getBrowserHeight() {
        this.browserHeight = window.innerHeight;
        return this.browserHeight;
      },
      /**
       * Get the width of the carousel DOM element
       * @return {Number} Width of the carousel in pixels
       */
      getCarouselWidth() {
        if (!this.adjustableWidth) {
          return "auto";
        }
  
        const slideOffset = this.currentPerPage * (this.currentPage + 1) - 1;
        const maxSlideWidth = [...Array(this.currentPerPage)]
          .map((_, idx) => this.getSlide(slideOffset + idx))
          .reduce(
            (clientWidth, slide) =>
              Math.max(clientWidth, (slide && slide.$el.clientWidth) || 0),
            0
          );
  
        this.currentWidth =
          maxSlideWidth === 0 ? "auto" : `${maxSlideWidth}px`;
  
        return this.currentWidth;
      },
      /**
       * Get the height of the carousel DOM element
       * @return {String} The carousel height
       */
      getCarouselHeight() {
        let carouselInnerElements = this.$el.getElementsByClassName("VueCarousel-inner");
        for (let i = 0; i < carouselInnerElements.length; i++) {
            if (carouselInnerElements[i].clientHeight > 0) {
            this.carouselHeight = carouselInnerElements[i].clientHeight || 0;
            }
        }
        return this.carouselHeight;
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
              slot =>
                slot.tag &&
                slot.tag.match(`^vue-component-\\d+-${this.tagName}$`) !== null
            ).length) ||
          0;
      },
      /**
       * Gets the slide at the specified index
       * @return {Object} The slide at the specified index
       */
      getSlide(index) {
        const slides = this.$children.filter(
          child =>
            child.$vnode.tag.match(`^vue-component-\\d+-${this.tagName}$`) !==
            null
        );
        return slides[index];
      },
      /**
       * Set the current page to a specific value
       * This function will only apply the change if the value is within the carousel bounds
       * for carousel scrolling per page.
       * @param  {Number} page The value of the new page number
       * @param  {string|undefined} advanceType An optional value describing the type of page advance
       */
      goToPage(page, advanceType) {
        if (page >= 0 && page <= this.pageCount) {
          this.offset = this.scrollPerPage
            ? Math.min(
                this.slideWidth * this.currentPerPage * page,
                this.maxOffset
              )
            : this.slideWidth * page;
  
  
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
  
        // detect right click
        if (e.button == 2) {
          return;
        }
  
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
  
        if (this.ttb) {
          this.offset -= this.dragOffset;
        } else {
          this.offset += this.dragOffset;
        }
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
  
        if (this.ttb) {
          if (this.offset == 0 && this.dragOffset > 0) {
            this.dragOffset = Math.sqrt(this.resistanceCoef * this.dragOffset);
          } else if (this.offset == this.maxOffset && this.dragOffset < 0) {
            this.dragOffset = -Math.sqrt(-this.resistanceCoef * this.dragOffset);
          }
        } else {
          if (nextOffset < 0) {
            this.dragOffset = -Math.sqrt(-this.resistanceCoef * this.dragOffset);
          } else if (nextOffset > this.maxOffset) {
            this.dragOffset = Math.sqrt(this.resistanceCoef * this.dragOffset);
          }
        }
      },
      onResize() {
        this.computeCarouselWidth();
        this.computeCarouselHeight();
  
        this.dragging = true; // force a dragging to disable animation
        this.render();
        // clear dragging after refresh rate
        setTimeout(() => {
          this.dragging = false;
        }, this.refreshRate);
      },
      render() {
        // add extra slides depending on the momemtum speed
        if (this.ttb) {
          this.offset -=
            Math.max(
              -this.currentPerPage + 1,
              Math.min(Math.round(this.dragMomentum), this.currentPerPage - 1)
            ) * this.slideWidth;
        } else {
          this.offset +=
            Math.max(
              -this.currentPerPage + 1,
              Math.min(Math.round(this.dragMomentum), this.currentPerPage - 1)
            ) * this.slideWidth;
        }
  
        // & snap the new offset on a slide or page if scrollPerPage
        const width = this.scrollPerPage
          ? this.slideWidth * this.currentPerPage
          : this.slideWidth;
  
        // lock offset to either the nearest page, or to the last slide
        const lastFullPageOffset =
          width * Math.floor(this.slideCount / (this.currentPerPage - 1));
        const remainderOffset =
          lastFullPageOffset +
          this.slideWidth * (this.slideCount % this.currentPerPage);
        if (this.offset > (lastFullPageOffset + remainderOffset) / 2) {
          this.offset = remainderOffset;
        } else {
          this.offset = width * Math.round(this.offset / width);
        }
  
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
      computeCarouselHeight() {
        this.getSlideCount();
        this.getBrowserHeight();
        this.getCarouselHeight();
        this.setCurrentPageInBounds();
      },
      /**
       * Re-compute the height of the carousel and its slides
       */
      computeCarouselWidth() {
        this.getCarouselWidth();
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
      }
    },
    mounted() {
      window.addEventListener(
        "resize",
        debounce(this.onResize, this.refreshRate)
      );
  
      // setup the start event only if touch device or mousedrag activated
      if ((this.isTouch && this.touchDrag) || this.mouseDrag) {
        this.$refs["VueCarousel-wrapper"].addEventListener(
          this.isTouch ? "touchstart" : "mousedown",
          this.onStart
        );
      }
  
      this.computeCarouselWidth();
      this.computeCarouselHeight();
  
      this.$emit("mounted");
    },
  };
  </script>
<style>
/*Basic styles for vertical carousel*/
.VerticalCarousel {
  display: flex;
  flex-direction: column;
  position: relative;
}

.VerticalCarousel--reverse {
  flex-direction: column-reverse;
}

.VerticalCarousel-wrapper {
  height: 100%; 
  position: relative;
  overflow: hidden;
}

.VerticalCarousel-inner {
  display: flex;
  flex-direction: column; 
  backface-visibility: hidden;
  transition: transform 0.5s ease; 
}

.VerticalCarousel-inner--center {
  align-items: center; 
}
</style>
  
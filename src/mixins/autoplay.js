const autoplay = {
  props: {
    /**
     * Time elapsed before advancing slide
     */
    autoplayTimeout: {
      type: Number,
      default: 5000,
    },
    /**
     * Flag to pause autoplay on hover
     */
    autoplayHoverPause: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      autoplay: {
        interval: null,
      }
    }
  },
  destroyed() {
    if (!this.$isServer) {
      this.$el.removeEventListener("mouseenter", this.pauseAutoplay)
      this.$el.removeEventListener("mouseleave", this.startAutoplay)
    }
  },
  methods: {
    pauseAutoplay() {
      if (this.autoplay.interval) {
        clearInterval(this.autoplay.interval)
      }
    },
    startAutoplay() {
      this.autoplay.interval = setInterval(this.advancePage, this.autoplayTimeout)
    },
  },
  mounted() {
    if (!this.$isServer) {
      this.$el.addEventListener("mouseenter", this.pauseAutoplay)
      this.$el.addEventListener("mouseleave", this.startAutoplay)
    }

    this.startAutoplay()
  },
}

export default autoplay

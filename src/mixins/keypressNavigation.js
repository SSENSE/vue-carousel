const keypressNavigation = {
  created() {
    window.addEventListener("keydown", this.keypressNavigation);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keypressNavigation);
  },
  methods: {
    keypressNavigation(e) {
      if (e.keyCode == "37") {
        e.preventDefault();

        let direction = "backward";

        this.advancePage(direction);
        this.$emit("navigation-click", direction);
      }

      if (e.keyCode == "39") {
        e.preventDefault();

        let direction = "forward";

        this.advancePage(direction);
        this.$emit("navigation-click", direction);
      }
    }
  }
};

export default keypressNavigation;

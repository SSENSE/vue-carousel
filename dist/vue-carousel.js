/*!
 * vue-carousel v0.6.4
 * (c) 2017 todd.beauchamp@ssense.com
 * https://github.com/ssense/vue-carousel#readme
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueCarousel"] = factory();
	else
		root["VueCarousel"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Slide = exports.Carousel = undefined;

	var _Carousel = __webpack_require__(1);

	var _Carousel2 = _interopRequireDefault(_Carousel);

	var _Slide = __webpack_require__(22);

	var _Slide2 = _interopRequireDefault(_Slide);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var install = function install(Vue) {
	  Vue.component("carousel", _Carousel2.default);
	  Vue.component("slide", _Slide2.default);
	};

	exports.default = {
	  install: install
	};
	exports.Carousel = _Carousel2.default;
	exports.Slide = _Slide2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(2)

	var Component = __webpack_require__(6)(
	  /* script */
	  __webpack_require__(7),
	  /* template */
	  __webpack_require__(27),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/thomasdrach/Documents/Code/vue-carousel/src/Carousel.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] Carousel.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-74f55575", Component.options)
	  } else {
	    hotAPI.reload("data-v-74f55575", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-74f55575!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Carousel.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-74f55575!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Carousel.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "\n.VueCarousel {\n  position: relative;\n  overflow: hidden;\n}\n.VueCarousel-wrapper {\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n}\n.VueCarousel-inner {\n  display: flex;\n  flex-direction: row;\n  backface-visibility: hidden;\n}\n.VueCarousel-close {\n  display: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 10000000000000000000000;\n}\nbody.modal-active {\n  overflow: hidden;\n}\nbody.modal-active .VueCarousel,\n  body.modal-active .VueCarousel-wrapper {\n    height: 100vh;\n    width: 100vw;\n    z-index: 10000000000000000000000;\n}\nbody.modal-active .VueCarousel-wrapper {\n    width: 80vw;\n    margin: auto;\n}\nbody.modal-active .VueCarousel-close {\n    display: block;\n}\nbody.modal-active .VueCarousel-pagination {\n    position: absolute;\n    z-index: 10000000000000000000000;\n}\nbody.modal-active .VueCarousel-slide {\n    position: relative;\n    z-index: 10000000000000000000000;\n    top: 0;\n    overflow-y: scroll;\n    width: 100vw;\n    height: 100vh;\n}\nbody.modal-active::before {\n    content: \"\";\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background: rgba(0, 0, 0, 0.9);\n    z-index: 10000000000000000000000;\n}\n", ""]);

	// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  // inject cssModules
	  if (cssModules) {
	    var computed = options.computed || (options.computed = {})
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _autoplay = __webpack_require__(8);

	var _autoplay2 = _interopRequireDefault(_autoplay);

	var _debounce = __webpack_require__(9);

	var _debounce2 = _interopRequireDefault(_debounce);

	var _Navigation = __webpack_require__(10);

	var _Navigation2 = _interopRequireDefault(_Navigation);

	var _Pagination = __webpack_require__(15);

	var _Pagination2 = _interopRequireDefault(_Pagination);

	var _Slide = __webpack_require__(22);

	var _Slide2 = _interopRequireDefault(_Slide);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: "carousel",
	  beforeUpdate: function beforeUpdate() {
	    this.computeCarouselWidth();
	  },

	  components: {
	    Navigation: _Navigation2.default,
	    Pagination: _Pagination2.default,
	    Slide: _Slide2.default
	  },
	  data: function data() {
	    return {
	      browserWidth: null,
	      carouselWidth: null,
	      currentPage: 0,
	      dragOffset: 0,
	      dragStartX: 0,
	      mousedown: false,
	      slideCount: 0
	    };
	  },

	  mixins: [_autoplay2.default],
	  props: {
	    easing: {
	      type: String,
	      default: "ease"
	    },

	    minSwipeDistance: {
	      type: Number,
	      default: 8
	    },

	    navigationClickTargetSize: {
	      type: Number,
	      default: 8
	    },

	    navigationEnabled: {
	      type: Boolean,
	      default: false
	    },

	    expandEnabled: {
	      type: Boolean,
	      default: false
	    },

	    navigationNextLabel: {
	      type: String,
	      default: "▶"
	    },

	    navigationPrevLabel: {
	      type: String,
	      default: "◀"
	    },

	    paginationActiveColor: {
	      type: String,
	      default: "#000000"
	    },

	    paginationColor: {
	      type: String,
	      default: "#efefef"
	    },

	    paginationEnabled: {
	      type: Boolean,
	      default: true
	    },

	    paginationPadding: {
	      type: Number,
	      default: 10
	    },

	    paginationSize: {
	      type: Number,
	      default: 10
	    },

	    perPage: {
	      type: Number,
	      default: 2
	    },

	    perPageCustom: {
	      type: Array
	    },

	    scrollPerPage: {
	      type: Boolean,
	      default: false
	    },

	    speed: {
	      type: Number,
	      default: 500
	    }
	  },
	  computed: {
	    breakpointSlidesPerPage: function breakpointSlidesPerPage() {
	      if (!this.perPageCustom) {
	        return this.perPage;
	      }

	      var breakpointArray = this.perPageCustom;
	      var width = this.browserWidth;

	      var breakpoints = breakpointArray.sort(function (a, b) {
	        return a[0] > b[0] ? -1 : 1;
	      });

	      var matches = breakpoints.filter(function (breakpoint) {
	        return width >= breakpoint[0];
	      });

	      var match = matches[0] && matches[0][1];

	      return match || this.perPage;
	    },
	    canAdvanceForward: function canAdvanceForward() {
	      return this.currentPage < this.pageCount - 1;
	    },
	    canAdvanceBackward: function canAdvanceBackward() {
	      return this.currentPage > 0;
	    },
	    currentPerPage: function currentPerPage() {
	      return !this.perPageCustom || this.$isServer ? this.perPage : this.breakpointSlidesPerPage;
	    },
	    currentOffset: function currentOffset() {
	      var page = this.currentPage;
	      var width = this.slideWidth;
	      var dragged = this.dragOffset;

	      var offset = this.scrollPerPage ? page * width * this.currentPerPage : page * width;

	      return (offset + dragged) * -1;
	    },
	    isHidden: function isHidden() {
	      return this.carouselWidth <= 0;
	    },
	    pageCount: function pageCount() {
	      var slideCount = this.slideCount;
	      var perPage = this.currentPerPage;

	      if (this.scrollPerPage) {
	        var pages = Math.ceil(slideCount / perPage);
	        return pages < 1 ? 1 : pages;
	      }

	      return slideCount - (this.currentPerPage - 1);
	    },
	    slideWidth: function slideWidth() {
	      var width = this.carouselWidth;
	      var perPage = this.currentPerPage;

	      return width / perPage;
	    },
	    transitionStyle: function transitionStyle() {
	      return this.speed / 1000 + "s " + this.easing + " transform";
	    }
	  },
	  methods: {
	    advancePage: function advancePage(direction) {
	      if (direction && direction === "backward" && this.canAdvanceBackward) {
	        this.goToPage(this.currentPage - 1);
	      } else if ((!direction || direction && direction !== "backward") && this.canAdvanceForward) {
	        this.goToPage(this.currentPage + 1);
	      }
	    },
	    attachMutationObserver: function attachMutationObserver() {
	      var _this = this;

	      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

	      if (MutationObserver) {
	        var config = { attributes: true, data: true };
	        this.mutationObserver = new MutationObserver(function () {
	          _this.$nextTick(function () {
	            _this.computeCarouselWidth();
	          });
	        });
	        if (this.$parent.$el) {
	          this.mutationObserver.observe(this.$parent.$el, config);
	        }
	      }
	    },
	    detachMutationObserver: function detachMutationObserver() {
	      if (this.mutationObserver) {
	        this.mutationObserver.disconnect();
	      }
	    },
	    getBrowserWidth: function getBrowserWidth() {
	      this.browserWidth = window.innerWidth;
	      return this.browserWidth;
	    },
	    getCarouselWidth: function getCarouselWidth() {
	      this.carouselWidth = this.$el && this.$el.clientWidth || 0;
	      return this.carouselWidth;
	    },
	    getSlideCount: function getSlideCount() {
	      this.slideCount = this.$slots && this.$slots.default && this.$slots.default.filter(function (slot) {
	        return slot.tag && slot.tag.indexOf("slide") > -1;
	      }).length || 0;
	    },
	    goToPage: function goToPage(page) {
	      if (page >= 0 && page <= this.pageCount) {
	        this.currentPage = page;
	        this.$emit("pageChange", this.currentPage);
	      }
	    },
	    handleMousedown: function handleMousedown(e) {
	      if (!e.touches) {
	        e.preventDefault();
	      }

	      this.mousedown = true;
	      this.dragStartX = "ontouchstart" in window ? e.touches[0].clientX : e.clientX;
	    },
	    handleMouseup: function handleMouseup() {
	      this.mousedown = false;
	      this.dragOffset = 0;
	    },
	    handleMousemove: function handleMousemove(e) {
	      if (!this.mousedown) {
	        return;
	      }

	      var eventPosX = "ontouchstart" in window ? e.touches[0].clientX : e.clientX;
	      var deltaX = this.dragStartX - eventPosX;

	      this.dragOffset = deltaX;

	      if (this.dragOffset > this.minSwipeDistance) {
	        this.handleMouseup();
	        this.advancePage();
	      } else if (this.dragOffset < -this.minSwipeDistance) {
	        this.handleMouseup();
	        this.advancePage("backward");
	      }
	    },
	    computeCarouselWidth: function computeCarouselWidth() {
	      this.getSlideCount();
	      this.getBrowserWidth();
	      this.getCarouselWidth();
	      this.setCurrentPageInBounds();
	    },
	    setCurrentPageInBounds: function setCurrentPageInBounds() {
	      if (!this.canAdvanceForward) {
	        var setPage = this.pageCount - 1;
	        this.currentPage = setPage >= 0 ? setPage : 0;
	      }
	    },
	    modalToggle: function modalToggle() {
	      var bodyClass = document.body.classList;
	      if (bodyClass.contains("modal-active")) {
	        return bodyClass.remove("modal-active");
	      }
	      return bodyClass.add("modal-active");
	    },
	    addHotKeys: function addHotKeys() {
	      var vm = this;
	      window.addEventListener("keyup", function (e) {
	        if (e.key === "Escape") {
	          return vm.modalToggle();
	        }
	        return false;
	      });
	    }
	  },
	  mounted: function mounted() {
	    if (!this.$isServer) {
	      window.addEventListener("resize", (0, _debounce2.default)(this.computeCarouselWidth, 16));

	      if ("ontouchstart" in window) {
	        this.$el.addEventListener("touchstart", this.handleMousedown);
	        this.$el.addEventListener("touchend", this.handleMouseup);
	        this.$el.addEventListener("touchmove", this.handleMousemove);
	      } else {
	        this.$el.addEventListener("mousedown", this.handleMousedown);
	        this.$el.addEventListener("mouseup", this.handleMouseup);
	        this.$el.addEventListener("mousemove", this.handleMousemove);
	      }
	    }
	    this.addHotKeys();
	    this.attachMutationObserver();
	    this.computeCarouselWidth();
	  },
	  destroyed: function destroyed() {
	    if (!this.$isServer) {
	      this.detachMutationObserver();
	      window.removeEventListener("resize", this.getBrowserWidth);
	      if ("ontouchstart" in window) {
	        this.$el.removeEventListener("touchmove", this.handleMousemove);
	      } else {
	        this.$el.removeEventListener("mousemove", this.handleMousemove);
	      }
	    }
	  }
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var autoplay = {
	  props: {
	    autoplay: {
	      type: Boolean,
	      default: false
	    },

	    autoplayTimeout: {
	      type: Number,
	      default: 2000
	    },

	    autoplayHoverPause: {
	      type: Boolean,
	      default: true
	    }
	  },
	  data: function data() {
	    return {
	      autoplayInterval: null
	    };
	  },
	  destroyed: function destroyed() {
	    if (!this.$isServer) {
	      this.$el.removeEventListener("mouseenter", this.pauseAutoplay);
	      this.$el.removeEventListener("mouseleave", this.startAutoplay);
	    }
	  },

	  methods: {
	    pauseAutoplay: function pauseAutoplay() {
	      if (this.autoplayInterval) {
	        this.autoplayInterval = clearInterval(this.autoplayInterval);
	      }
	    },
	    startAutoplay: function startAutoplay() {
	      if (this.autoplay) {
	        this.autoplayInterval = setInterval(this.advancePage, this.autoplayTimeout);
	      }
	    }
	  },
	  mounted: function mounted() {
	    if (!this.$isServer && this.autoplayHoverPause) {
	      this.$el.addEventListener("mouseenter", this.pauseAutoplay);
	      this.$el.addEventListener("mouseleave", this.startAutoplay);
	    }

	    this.startAutoplay();
	  }
	};

	exports.default = autoplay;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var debounce = function debounce(func, wait, immediate) {
	  var timeout = void 0;
	  return function () {
	    var context = undefined;
	    var later = function later() {
	      timeout = null;
	      if (!immediate) {
	        func.apply(context);
	      }
	    };
	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	    if (callNow) {
	      func.apply(context);
	    }
	  };
	};

	exports.default = debounce;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(11)

	var Component = __webpack_require__(6)(
	  /* script */
	  __webpack_require__(13),
	  /* template */
	  __webpack_require__(14),
	  /* scopeId */
	  "data-v-7fed18e9",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/thomasdrach/Documents/Code/vue-carousel/src/Navigation.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] Navigation.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7fed18e9", Component.options)
	  } else {
	    hotAPI.reload("data-v-7fed18e9", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7fed18e9&scoped=true!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Navigation.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7fed18e9&scoped=true!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Navigation.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "\n.VueCarousel-navigation[data-v-7fed18e9] {\n  position: absolute;\n  z-index: 10000000000000000000000;\n  width: 100%;\n  top: 50%;\n}\n.VueCarousel-navigation-button[data-v-7fed18e9] {\n  position: absolute;\n  top: 50%;\n  box-sizing: border-box;\n  color: #000;\n  text-decoration: none;\n}\n.VueCarousel-navigation-next[data-v-7fed18e9] {\n  right: 3rem;\n  transform: translateY(-50%) translateX(100%);\n}\n.VueCarousel-navigation-prev[data-v-7fed18e9] {\n  left: 3rem;\n  transform: translateY(-50%) translateX(-100%);\n}\n.VueCarousel-navigation--disabled[data-v-7fed18e9] {\n  opacity: 0;\n  cursor: default;\n}\n", ""]);

	// exports


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: "navigation",
	  data: function data() {
	    return {
	      parentContainer: this.$parent
	    };
	  },

	  props: {
	    clickTargetSize: {
	      type: Number,
	      default: 20
	    },

	    nextLabel: {
	      type: String,
	      default: "▶"
	    },

	    prevLabel: {
	      type: String,
	      default: "◀"
	    }
	  },
	  computed: {
	    canAdvanceForward: function canAdvanceForward() {
	      return this.parentContainer.canAdvanceForward || false;
	    },
	    canAdvanceBackward: function canAdvanceBackward() {
	      return this.parentContainer.canAdvanceBackward || false;
	    }
	  },
	  methods: {
	    triggerPageAdvance: function triggerPageAdvance(direction) {
	      if (direction) {
	        this.$parent.advancePage(direction);
	      } else {
	        this.$parent.advancePage();
	      }
	    }
	  }
	};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "VueCarousel-navigation"
	  }, [_c('a', {
	    staticClass: "VueCarousel-navigation-button VueCarousel-navigation-prev",
	    class: {
	      'VueCarousel-navigation--disabled': !_vm.canAdvanceBackward
	    },
	    style: (("padding: " + _vm.clickTargetSize + "px; margin-right: -" + _vm.clickTargetSize + "px;")),
	    attrs: {
	      "href": "#"
	    },
	    domProps: {
	      "innerHTML": _vm._s(_vm.prevLabel)
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.triggerPageAdvance('backward')
	      }
	    }
	  }), _vm._v(" "), _c('a', {
	    staticClass: "VueCarousel-navigation-button VueCarousel-navigation-next",
	    class: {
	      'VueCarousel-navigation--disabled': !_vm.canAdvanceForward
	    },
	    style: (("padding: " + _vm.clickTargetSize + "px; margin-left: -" + _vm.clickTargetSize + "px;")),
	    attrs: {
	      "href": "#"
	    },
	    domProps: {
	      "innerHTML": _vm._s(_vm.nextLabel)
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.triggerPageAdvance()
	      }
	    }
	  })])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7fed18e9", module.exports)
	  }
	}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(16)

	var Component = __webpack_require__(6)(
	  /* script */
	  __webpack_require__(20),
	  /* template */
	  __webpack_require__(21),
	  /* scopeId */
	  "data-v-7e42136f",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/thomasdrach/Documents/Code/vue-carousel/src/Pagination.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] Pagination.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7e42136f", Component.options)
	  } else {
	    hotAPI.reload("data-v-7e42136f", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(18)("372e9a51", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7e42136f&scoped=true!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Pagination.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7e42136f&scoped=true!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Pagination.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "\n.VueCarousel-pagination[data-v-7e42136f] {\n  float: left;\n  text-align: center;\n}\n.VueCarousel-dot-container[data-v-7e42136f] {\n  display: inline-block;\n  margin: 0 auto;\n}\n.VueCarousel-dot[data-v-7e42136f] {\n  float: left;\n  cursor: pointer;\n}\n.VueCarousel-dot-inner[data-v-7e42136f] {\n  border-radius: 100%;\n}\n", ""]);

	// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	  Modified by Evan You @yyx990803
	*/

	var hasDocument = typeof document !== 'undefined'

	if (false) {
	  if (!hasDocument) {
	    throw new Error(
	    'vue-style-loader cannot be used in a non-browser environment. ' +
	    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
	  ) }
	}

	var listToStyles = __webpack_require__(19)

	/*
	type StyleObject = {
	  id: number;
	  parts: Array<StyleObjectPart>
	}

	type StyleObjectPart = {
	  css: string;
	  media: string;
	  sourceMap: ?string
	}
	*/

	var stylesInDom = {/*
	  [id: number]: {
	    id: number,
	    refs: number,
	    parts: Array<(obj?: StyleObjectPart) => void>
	  }
	*/}

	var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
	var singletonElement = null
	var singletonCounter = 0
	var isProduction = false
	var noop = function () {}

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

	module.exports = function (parentId, list, _isProduction) {
	  isProduction = _isProduction

	  var styles = listToStyles(parentId, list)
	  addStylesToDom(styles)

	  return function update (newList) {
	    var mayRemove = []
	    for (var i = 0; i < styles.length; i++) {
	      var item = styles[i]
	      var domStyle = stylesInDom[item.id]
	      domStyle.refs--
	      mayRemove.push(domStyle)
	    }
	    if (newList) {
	      styles = listToStyles(parentId, newList)
	      addStylesToDom(styles)
	    } else {
	      styles = []
	    }
	    for (var i = 0; i < mayRemove.length; i++) {
	      var domStyle = mayRemove[i]
	      if (domStyle.refs === 0) {
	        for (var j = 0; j < domStyle.parts.length; j++) {
	          domStyle.parts[j]()
	        }
	        delete stylesInDom[domStyle.id]
	      }
	    }
	  }
	}

	function addStylesToDom (styles /* Array<StyleObject> */) {
	  for (var i = 0; i < styles.length; i++) {
	    var item = styles[i]
	    var domStyle = stylesInDom[item.id]
	    if (domStyle) {
	      domStyle.refs++
	      for (var j = 0; j < domStyle.parts.length; j++) {
	        domStyle.parts[j](item.parts[j])
	      }
	      for (; j < item.parts.length; j++) {
	        domStyle.parts.push(addStyle(item.parts[j]))
	      }
	      if (domStyle.parts.length > item.parts.length) {
	        domStyle.parts.length = item.parts.length
	      }
	    } else {
	      var parts = []
	      for (var j = 0; j < item.parts.length; j++) {
	        parts.push(addStyle(item.parts[j]))
	      }
	      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
	    }
	  }
	}

	function createStyleElement () {
	  var styleElement = document.createElement('style')
	  styleElement.type = 'text/css'
	  head.appendChild(styleElement)
	  return styleElement
	}

	function addStyle (obj /* StyleObjectPart */) {
	  var update, remove
	  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

	  if (styleElement) {
	    if (isProduction) {
	      // has SSR styles and in production mode.
	      // simply do nothing.
	      return noop
	    } else {
	      // has SSR styles but in dev mode.
	      // for some reason Chrome can't handle source map in server-rendered
	      // style tags - source maps in <style> only works if the style tag is
	      // created and inserted dynamically. So we remove the server rendered
	      // styles and inject new ones.
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }

	  if (isOldIE) {
	    // use singleton mode for IE9.
	    var styleIndex = singletonCounter++
	    styleElement = singletonElement || (singletonElement = createStyleElement())
	    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
	    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
	  } else {
	    // use multi-style-tag mode in all other cases
	    styleElement = createStyleElement()
	    update = applyToTag.bind(null, styleElement)
	    remove = function () {
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }

	  update(obj)

	  return function updateStyle (newObj /* StyleObjectPart */) {
	    if (newObj) {
	      if (newObj.css === obj.css &&
	          newObj.media === obj.media &&
	          newObj.sourceMap === obj.sourceMap) {
	        return
	      }
	      update(obj = newObj)
	    } else {
	      remove()
	    }
	  }
	}

	var replaceText = (function () {
	  var textStore = []

	  return function (index, replacement) {
	    textStore[index] = replacement
	    return textStore.filter(Boolean).join('\n')
	  }
	})()

	function applyToSingletonTag (styleElement, index, remove, obj) {
	  var css = remove ? '' : obj.css

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = replaceText(index, css)
	  } else {
	    var cssNode = document.createTextNode(css)
	    var childNodes = styleElement.childNodes
	    if (childNodes[index]) styleElement.removeChild(childNodes[index])
	    if (childNodes.length) {
	      styleElement.insertBefore(cssNode, childNodes[index])
	    } else {
	      styleElement.appendChild(cssNode)
	    }
	  }
	}

	function applyToTag (styleElement, obj) {
	  var css = obj.css
	  var media = obj.media
	  var sourceMap = obj.sourceMap

	  if (media) {
	    styleElement.setAttribute('media', media)
	  }

	  if (sourceMap) {
	    // https://developer.chrome.com/devtools/docs/javascript-debugging
	    // this makes source maps inside style tags work properly in Chrome
	    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
	    // http://stackoverflow.com/a/26603875
	    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
	  }

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = css
	  } else {
	    while (styleElement.firstChild) {
	      styleElement.removeChild(styleElement.firstChild)
	    }
	    styleElement.appendChild(document.createTextNode(css))
	  }
	}


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	/**
	 * Translates the list format produced by css-loader into something
	 * easier to manipulate.
	 */
	module.exports = function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = {
	      id: parentId + ':' + i,
	      css: css,
	      media: media,
	      sourceMap: sourceMap
	    }
	    if (!newStyles[id]) {
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: "pagination",
	  data: function data() {
	    return {
	      parentContainer: this.$parent
	    };
	  }
	};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.parentContainer.pageCount > 1),
	      expression: "parentContainer.pageCount > 1"
	    }],
	    staticClass: "VueCarousel-pagination"
	  }, [_c('div', {
	    staticClass: "VueCarousel-dot-container"
	  }, _vm._l((_vm.parentContainer.pageCount), function(page, index) {
	    return _c('div', {
	      staticClass: "VueCarousel-dot",
	      class: {
	        'VueCarousel-dot--active': (index === _vm.parentContainer.currentPage)
	      },
	      style: (("\n        margin-top: " + (_vm.parentContainer.paginationPadding * 2) + "px;\n        padding: " + (_vm.parentContainer.paginationPadding) + "px;\n      ")),
	      on: {
	        "click": function($event) {
	          _vm.parentContainer.goToPage(index)
	        }
	      }
	    }, [_c('div', {
	      staticClass: "VueCarousel-dot-inner",
	      style: (("\n          width: " + (_vm.parentContainer.paginationSize) + "px;\n          height: " + (_vm.parentContainer.paginationSize) + "px;\n          background: " + ((index === _vm.parentContainer.currentPage) ? _vm.parentContainer.paginationActiveColor : _vm.parentContainer.paginationColor) + ";\n        "))
	    })])
	  }))])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7e42136f", module.exports)
	  }
	}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(23)

	var Component = __webpack_require__(6)(
	  /* script */
	  __webpack_require__(25),
	  /* template */
	  __webpack_require__(26),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/thomasdrach/Documents/Code/vue-carousel/src/Slide.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] Slide.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-f8171128", Component.options)
	  } else {
	    hotAPI.reload("data-v-f8171128", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-f8171128!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Slide.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-f8171128!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Slide.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "\n.VueCarousel-slide {\n  flex-basis: inherit;\n  flex-grow: 0;\n  flex-shrink: 0;\n  user-select: none;\n  position: relative;\n  transition: .3s ease all;\n}\n.VueCarousel-expand {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  z-index: 10000000000000000000000;\n}\n", ""]);

	// exports


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: "slide",
	  data: function data() {
	    return {
	      width: null,
	      parentContainer: this.$parent
	    };
	  },

	  methods: {
	    handleClick: function handleClick() {
	      return this.parentContainer.modalToggle(this);
	    }
	  }
	};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "VueCarousel-slide"
	  }, [_vm._t("default"), _vm._v(" "), _c('button', {
	    staticClass: "VueCarousel-expand",
	    on: {
	      "click": _vm.handleClick
	    }
	  }, [_vm._v("EXPAND")])], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-f8171128", module.exports)
	  }
	}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "VueCarousel"
	  }, [_c('div', {
	    staticClass: "VueCarousel-wrapper"
	  }, [_c('div', {
	    staticClass: "VueCarousel-inner",
	    style: (("\n        transform: translateX(" + _vm.currentOffset + "px);\n        transition: " + _vm.transitionStyle + ";\n        flex-basis: " + _vm.slideWidth + "px;\n        visibility: " + (_vm.slideWidth ? 'visible' : 'hidden') + "\n      "))
	  }, [_vm._t("default")], 2)]), _vm._v(" "), (_vm.paginationEnabled && _vm.pageCount > 0) ? _c('pagination') : _vm._e(), _vm._v(" "), (_vm.navigationEnabled) ? _c('navigation', {
	    attrs: {
	      "clickTargetSize": _vm.navigationClickTargetSize,
	      "nextLabel": _vm.navigationNextLabel,
	      "prevLabel": _vm.navigationPrevLabel
	    }
	  }) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "VueCarousel-close"
	  }, [_c('button', {
	    on: {
	      "click": function($event) {
	        _vm.modalToggle()
	      }
	    }
	  }, [_vm._v("CLOSE")])])], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-74f55575", module.exports)
	  }
	}

/***/ })
/******/ ])
});
;
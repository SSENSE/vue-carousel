---
title: API
---

## Global config

### adjustableHeight

Adjust the height of the carousel for the current slide.

* **Type**: `Boolean`
* **Default**: `false`

### adjustableHeightEasing

Slide transition easing for adjustableHeight.

* **Type**: `String`

### autoplay

Flag to enable autoplay.

* **Type**: `Boolean`
* **Default**: `false`

### autoplayDirection

Sets the autoplay direction for the carousel during autoplay.

* **Type**: `String`
* **Default**: `forward`

### autoplayTimeout

Time elapsed before advancing slide in autoplay.

* **Type**: `Number`
* **Default**: `2000`

### autoplayHoverPause

Flag to pause autoplay on hover.

* **Type**: `Boolean`
* **Default**: `true`

### centerMode

Center images when the size is less than the container width

* **Type**: `Boolean`
* **Default**: `false`

### easing

Transition speed between slides. Any valid CSS transition easing is accepted.

* **Type**: `String`
* **Default**: `ease`

### loop

Flag to make the carousel loop (wrap) when it reaches either end.

* **Type**: `Boolean`
* **Default**: `false`

### minSwipeDistance

Minimum distance in pixels to swipe before a slide advance is triggered.

* **Type**: `Number`
* **Default**: `8`

### mouseDrag

Flag to toggle mouse dragging.

* **Type**: `Boolean`
* **Default** `true`

### perPage

Maximum number of slides displayed on each page.

* **Type**: `Number`
* **Default**: `2`

### perPageCustom

Configure the number of visible slides for responsive breakpoints.

This will be an array of arrays. Each array is formatted as [x, y] where x is the browser width, and y is the number of slides displayed.

* **Type**: `Array`
* **Usage**:

``` html
<carousel :per-page-custom="[[768, 3], [1024, 4]]">
```

A mobile-first strategy is used to determine the matching breakpoint. In the above example, the [perPage](/vue-carousel/api#perPage) variable has not been set, so the default of **2** is used. If the window size is greater than or equal to 768px, then 3 slides are shown. If the width is greater than or equal to 1024, then 4 slides are shown.

### resistanceCoef

Resistance coefficient to dragging on the edge of the carousel. This dictates the effect of the pull as you move towards the boundaries.

* **Type**: `Number`
* **Default**: `20`

### scrollPerPage

Scroll per page, not per item.

* **Type**: `Boolean`
* **Default**: `true`

### size

Size of each pagination dot. Pixel values are accepted.

* **Type** `Number`
* **Default**: `10`

### spacePadding

Stage padding option adds left and right padding style (in pixels) onto VueCarousel-inner.

* **Type**: `Number`
* **Default**: `0`

### spacePaddingMaxOffsetFactor

Specify by how much should the space padding value be multiplied of, to re-arange the final slide padding.

* **Type** `Number`
* **Default**: `0`

### speed

Slide transition speed. Number of milliseconds accepted.

* **Type** `Number`
* **Default**: `500`

### value

Support for v-model functionality.
Setting this value will change the current page to the number inputted (if between 0 and pageCount).

* **Type** `Number`

## Navigation

Configure the navigation component (next/prev buttons)

### navigationEnabled

Flag to render the navigation component (next/prev buttons).

* **Type**: `Boolean`
* **Default**: `false`

### navigateTo

Allow carousel parent to programatically navigate to a specific slide (zero based index). Recommend using parent data attribute pageNo and carousel pageChange event to keep pageNo in sync with carousel.currentPage to handle subsequent navigation.

* **Type**: `Number`
* **Default**: 0

### navigationClickTargetSize

Amount of padding to apply around the label in pixels.

* **Type**: `Number`
* **Default**: `8`

### navigationNextLabel

Text content of the navigation next button.

* **Type**: `String`
* **Default**: `▶`

### navigationPrevLabel

Text content of the navigation prev button.

* **Type**: `String`
* **Default**: `◀`

### navigateTo

Allow carousel parent to programatically navigate to a specific slide (zero based index). Recommend using parent data attribute pageNo and carousel pageChange event to keep pageNo in sync with carousel.currentPage to handle subsequent navigation. To disable the sliding animation the following syntax is to be followed-  :navigateTo=[index, false] where index is the slide number (starts from zero) you want to navigate to.
* **Type**: `Number` | `Array`
* **Default**: 0

## Pagination

Configure the pagination component (clickable page dots)

### paginationEnabled

Flag to render pagination component.

* **Type**: `Boolean`
* **Default**: `true`

### paginationActiveColor

The fill color of the active pagination dot. Any valid CSS color is accepted.

* **Type**: `String`
* **Default**: `#000000`

### paginationColor

The fill color of pagination dots. Any valid CSS color is accepted.

* **Type**: `String`
* **Default**: `#efefef`

### paginationPosition

The position of pagination dots. Possible values are `bottom`, `bottom-overlay`, `top` and `top-overlay`. The overlay values place the pagination component over the images.

* **Type**: `String`
* **Default**: `bottom`

### paginationPadding

The padding inside each pagination dot. Pixel values are accepted.

* **Type**: `Number`
* **Default**: `10`

### paginationSize

The size of each pagination dot. Pixel values are accepted.

* **Type**: `Number`
* **Default**: `10`

### spacePadding

Stage padding option adds left and right padding style (in pixels) onto VueCarousel-inner.

* **Type**: `Number`
* **Default**: `0`

## Custom Pagination & Navigation

Use named slots to render pagination and navigation using components.

``` html
  <carousel>
    <slide>
      Slide 1 Content
    </slide>
    <slide>
      Slide 2 Content
    </slide>

    <numbered-pagination slot="pagination" />
    <stylish-navigation slot="navigation" />
  </carousel>
```

Your components can access the `carousel` provider by adding the following to you component configuration:

```
  name: "numbered-pagination",
  inject: ["carousel"]
```

## Events

Events emitted from components

### page-change

`page-change` event emits the value of the current page.

* **Type**: `Number`
* **Emitter**: `Carousel`

### slide-click

`slide-click` event throws the *dataset* object of the selected element.

* **Type**: `Object`
* **Emitter**: `Slide`

### transition-start

`transition-start` event is thrown when the transition starts.

* **Type**: `none`
* **Emitter**: `Carousel`

### transition-end

`transition-end` event is thrown when the transition end is reached.

* **Type**: `none`
* **Emitter**: `Carousel`

> Lowercase versions of the above events are also emitted, namely—`pagechange`, `slideclick`, `transitionstart` and `transitionend`.


### navigation-click

Emits when the a navigation button is clicked, with the current direction (`backward` or `forward`)

* **Type**: `String`
* **Emitter**: `Carousel`

### pagination-click

Emits when a pagination button is clicked, with the current `pageNumber`

* **Type**: `Number`
* **Emitter**: `Carousel`

> Lowercase versions of the above events are also emitted, namely—`pagechange`, `slideclick`, `transitionstart` and `transitionend`.

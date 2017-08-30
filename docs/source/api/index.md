---
title: API
---

## Global config

### autoplay

Flag to enable autoplay

* **Type**: `Boolean`
* **Default**: `false`

### autoplayTimeout

Time elapsed before advancing slide

* **Type**: `Number`
* **Default**: `2000`

### autoplayHoverPause

Flag to pause autoplay on hover

* **Type**: `Boolean`
* **Default**: `false`

### loop

Flag to make the carousel loop (wrap) when it reaches either end.

* **Type**: `Boolean`
* **Default**: `false`

### easing

Transition speed between slides. Any valid CSS transition easing is accepted.

* **Type**: `String`
* **Default**: `ease`

### minSwipeDistance

Minimum distance in pixels to swipe before a slide advance is triggered

* **Type**: `Number`
* **Default**: `8`

### perPage

Maximum number of slides displayed on each page

* **Type**: `Number`
* **Default**: `2`

### perPageCustom

Configure the number of visible slides for responsive breakpoints.

This will be an array of arrays. Each array is formatted as [x, y] where x is the browser width, and y is the number of slides displayed.

* **Type**: `Array`
* **Usage**:

``` html
<carousel :perPageCustom="[[768, 3], [1024, 4]]">
```

A mobile-first strategy is used to determine the matching breakpoint. In the above example, the [perPage](/vue-carousel/api#perPage) variable has not been set, so the default of **2** is used. If the window size is greater than or equal to 768px, then 3 slides are shown. If the width is greater than or equal to 1024, then 4 slides are shown.

### scrollPerPage

Scroll per page, not per item.

* **Type**: `Boolean`
* **Default**: `false`

### speed

Size of each pagination dot. Pixel values are accepted.

* **Type** `Number`
* **Default**: `10`

## Navigation

Configure the navigation component (next/prev buttons)

### navigationClickTargetSize

Amount of padding to apply around the label in pixels

* **Type**: `Number`
* **Default**: `8`

### navigationEnabled

* **Type**: `Boolean`
* **Default**: `false`

### navigationNextLabel

Text content of the navigation next button

* **Type**: `String`
* **Default**: `▶`

### navigationPrevLabel

Text content of the navigation prev button

* **Type**: `String`
* **Default**: `◀`

## Pagination

Configure the pagination component (clickable page dots)

### paginationEnabled

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

### paginationPadding

The padding inside each pagination dot. Pixel values are accepted.

* **Type**: `Number`
* **Default**: `10`

### paginationSize

The size of each pagination dot. Pixel values are accepted.

* **Type**: `Number`
* **Default**: `10`

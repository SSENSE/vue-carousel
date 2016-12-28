---
title: API
---

## Global config

### easing

Transition speed between slides. Any valid CSS transition easing is accepted.

* **Type**: `String`
* **Default**: `ease`

### perPage

Maximum number of slides displayed on each page

* **Type**: `Number`
* **Default**: `4`

### perPageCustom

Configure the number of visible slides for responsive breakpoints.

This will be an array of arrays. Each array is formatted as [x, y] where x is the browser width, and y is the number of slides displayed.

* **Type**: `Array`
* **Usage**:

``` html
<carousel :perPageCustom="[[320, 2], [1199, 4]]">
```
In this case if (window width <= 1199px) then show 4 slides per page.

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

* **Type**: `Object`
* **Usage**:

``` html
<carousel :navigation="{ enabled: true }">
```

### enabled

* **Type**: `Boolean`
* **Default**: `false`

## Pagination

Configure the pagination component (clickable page dots)

* **Type**: `Object`
* **Usage**:

``` html
<carousel :pagination="{ activeColor: '#ff0' }">
```

### enabled

* **Type**: `Boolean`
* **Default**: `false`

### activeColor

The fill color of the active pagination dot. Any valid CSS color is accepted.

* **Type**: `String`
* **Default**: `#000000`

### activeColor

The fill color of pagination dots. Any valid CSS color is accepted.

* **Type**: `String`
* **Default**: `#efefef`

### padding

The padding inside each pagination dot. Pixel values are accepted.

* **Type**: `Number`
* **Default**: `10`

### size

The size of each pagination dot. Pixel values are accepted.

* **Type**: `Number`
* **Default**: `10`

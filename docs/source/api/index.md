---
title: API
---

## Global config

### easing

Transition speed between slides. Any valid CSS transition easing is accepted.
* **Type:** `String`
* **Default**: `ease`

### speed

Size of each pagination dot. Pixel values are accepted.
* **Type:** `Number`
* **Default**: `10`

## Navigation

Configure the navigation component (next/prev buttons)

* **Type**: `Object`
* **Usage**:

``` html
<carousel :navigation="{ enabled: true }">
```

### enabled

* **Type:** `Boolean`
* **Default**: `false`

## Pagination

Configure the pagination component (clickable page dots)

* **Type**: `Object`
* **Usage**:

``` html
<carousel :pagination="{ activeColor: '#ff0' }">
```

### enabled

* **Type:** `Boolean`
* **Default**: `false`

### activeColor

The fill color of the active pagination dot. Any valid CSS color is accepted.
* **Type:** `String`
* **Default**: `#000000`

### activeColor

The fill color of pagination dots. Any valid CSS color is accepted.
* **Type:** `String`
* **Default**: `#efefef`

### padding

The padding inside each pagination dot. Pixel values are accepted.
* **Type:** `Number`
* **Default**: `10`

### size

The size of each pagination dot. Pixel values are accepted.
* **Type:** `Number`
* **Default**: `10`

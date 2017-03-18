---
title: Guide
---

## Installation

``` bash
npm install -S vue-carousel
```

## Usage (Global)

You may install Vue Carousel globally:

``` js
import Vue from 'vue';
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
```
This will make **&lt;carousel&gt;** and **&lt;slide&gt;** available to all components within your Vue app.

## Usage (Local)

Include the carousel directly into your component using import:

``` js
import { Carousel, Slide } from 'vue-carousel';

export default {
  ...
  components: {
    Carousel,
    Slide
  }
  ...
};
```

## HTML Structure

Once the **Carousel** and **Slide** components are installed globally or imported, they can be used in templates in the following manner:

``` html
  <carousel>
    <slide>
      Slide 1 Content
    </slide>
    <slide>
      Slide 2 Content
    </slide>
  </carousel>
```
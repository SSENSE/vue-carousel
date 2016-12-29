# Vue Carousel

![Vue Carousel]
(https://ssense.github.io/vue-carousel/images/logo.png)

[Installation and usage guide](https://ssense.github.io/vue-carousel/guide/)
[API guide](https://ssense.github.io/vue-carousel/api/)
[Examples](https://ssense.github.io/vue-carousel/examples/)

## Installation

``` bash
npm install -S @ssense/vue-carousel
```

## Usage (Global)

You may install Vue Carousel globally:

``` js
import Vue from 'vue';
import VueCarousel from '@ssense/vue-carousel';

Vue.use(VueCarousel);
```
This will make **&lt;carousel&gt;** and **&lt;slide&gt;** available to all components within your Vue app.

## Usage (Local)

Include the carousel directly into your component using import:

``` js
import { Carousel, Slide } from '@ssense/vue-carousel';

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
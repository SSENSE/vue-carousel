# Vue Carousel

[![Build Status](https://travis-ci.org/SSENSE/vue-carousel.svg?branch=master)](https://travis-ci.org/SSENSE/vue-carousel)
[![Coverage Status](https://coveralls.io/repos/github/SSENSE/vue-carousel/badge.svg?branch=master)](https://coveralls.io/github/SSENSE/vue-carousel?branch=master)
[![Latest Stable Version](https://img.shields.io/npm/v/@ssense/vue-carousel.svg)](https://www.npmjs.com/package/@ssense/vue-carousel)

**WARNING: vue-carousel is at pre-alpha stage of development and may undergo significant changes.**

**Feel free to submit issues and feature requests [here](https://github.com/SSENSE/vue-carousel/issues)**.

* [Full documentation](https://ssense.github.io/vue-carousel)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

``` bash
npm install -S @ssense/vue-carousel
```

* [Full installation and usage guide](https://ssense.github.io/vue-carousel/guide/)

## Usage

### Global

You may install Vue Carousel globally:

``` js
import Vue from 'vue';
import VueCarousel from '@ssense/vue-carousel';

Vue.use(VueCarousel);
```
This will make **&lt;carousel&gt;** and **&lt;slide&gt;** available to all components within your Vue app.

### Local

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

### HTML Structure

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

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

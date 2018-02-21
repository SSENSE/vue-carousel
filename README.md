# Vue Carousel

[![Build Status](https://travis-ci.org/SSENSE/vue-carousel.svg?branch=master)](https://travis-ci.org/SSENSE/vue-carousel)
[![Coverage Status](https://coveralls.io/repos/github/SSENSE/vue-carousel/badge.svg?branch=master)](https://coveralls.io/github/SSENSE/vue-carousel?branch=master)
[![Latest Stable Version](https://img.shields.io/npm/v/vue-carousel.svg)](https://www.npmjs.com/package/vue-carousel)

**WARNING: vue-carousel is at pre-alpha stage of development and may undergo significant changes.**

**Feel free to submit issues and feature requests [here](https://github.com/SSENSE/vue-carousel/issues)**.

**[Full documentation and examples](https://ssense.github.io/vue-carousel)**

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [License](#license)

## Installation

``` bash
npm install vue-carousel
```

or if you prefer yarn

``` bash
yarn add vue-carousel
```

## Usage

### Global

You may install Vue Carousel globally:

``` js
import Vue from 'vue';
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
```
This will make **&lt;carousel&gt;** and **&lt;slide&gt;** available to all components within your Vue app.

### Local

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

## Development

A sandboxed dev environment is provided by [vue-play](https://github.com/vue-play/vue-play). Changes made to the component files will appear in real time in the sandbox. 

To begin development, run:

``` bash
npm install 
npm run dev
```

or, if you prefer yarn

``` bash
yarn install 
yarn dev
```

then navigate to `http://localhost:5000`

To modify and add sandbox scenarios, edit `play/index.js`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

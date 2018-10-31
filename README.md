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

### Configuration
| Property                  | Type    | Default | Description                                                                                                                                                                                                                                                                           |
|:--------------------------|:--------|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| autoplay                  | Boolean | false   | Flag to enable autoplay           
| autoplayTimeout           | Number  | 2000    | Time elapsed before advancing slide     
| autoplayHoverPause        | Boolean | false   | Flag to pause autoplay on hover
| easing                    | String  | ease    | Slide transition easing. Any valid CSS transition easing accepted.                                                                                                                                                                                                                    |
| minSwipeDistance          | Number  | 8       | Minimum distance for the swipe to trigger a slide advance.                                                                                                                                                                                                                            |
| navigationClickTargetSize | Number  | 8       | Amount of padding to apply around the label in pixels.                                                                                                                                                                                                                                |
| mouseDrag                 | Boolean | true    | Flag to toggle mouse dragging.                                                                                                                                                                                                                                                        |
| touchDrag                 | Boolean | true    | Flag to toggle touch dragging.                                                                                                                                                                                                                                                        |

| navigationEnabled         | Boolean | false   | Flag to render the navigation component (next/prev buttons).                                                                                                                                                                                                                          |
| navigationNextLabel       | String  | ▶       | Text content of the navigation next button.                                                                                                                                                                                                                                           |
| navigationPrevLabel       | String  | ◀       | Text content of the navigation prev button.                                                                                                                                                                                                                                           |
| paginationActiveColor     | String  | #000000 | The fill color of the active pagination dot. Any valid CSS color is accepted.                                                                                                                                                                                                         |
| paginationColor           | String  | #efefef | The fill color of pagination dots. Any valid CSS color is accepted.                                                                                                                                                                                                                   |
| paginationEnabled         | Boolean | true    | Flag to render pagination component.                                                                                                                                                                                                                                                  |
| paginationPadding         | Number  | 10      | The padding inside each pagination dot. Pixel values are accepted.                                                                                                                                                                                                                    |
| paginationSize            | Number  | 10      | The size of each pagination dot. Pixel values are accepted.                                                                                                                                                                                                                           |
| perPage                   | Number  | 2       | Maximum number of slides displayed on each page.                                                                                                                                                                                                                                      |
| perPageCustom             | Array   |         | Configure the number of visible slides with a particular browser width. This will be an array of arrays, ex. [[320, 2], [1199, 4]]. Formatted as [x, y] where x=browser width, and y=number of slides displayed. Ex. [1199, 4] means if (window <= 1199) then show 4 slides per page. |
| resistanceCoef            | Number  | 20      | Resistance coefficient to dragging on the edge of the carousel. This dictates the effect of the pull as you move towards the boundaries.                                                                                                                                              |
| scrollPerPage             | Boolean | true   | Scroll per page, not per item.                                                                                                                                                                                                                                                        |
| speed                     | Number  |         | Slide transition speed. Number of milliseconds accepted.                                                                                                                                                                                                                              |
| loop                      | Boolean | false   | Flag to make the carousel loop around when it reaches the end.                                                                                                                                                                                                                        |
| navigateTo                | Number  | 0       | Listen for an external navigation request using this prop.                                                                                                                                                                                                                            |
| spacePadding              | Number  | 0       | Stage padding option adds left and right padding style (in pixels) onto VueCarousel-inner.                                                                                                                                                                                            |

### Events
| Event                     | Type    | Emitter  | Description                                                                                                                                                                                                                                                                           |
|:--------------------------|:--------|:---------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| slideClick                | Object  | Slide    | "slideClick" event throws the *dataset* object of the selected element                                                                                                                                                                                                          |

### HTML Structure

Once the **Carousel** and **Slide** components are installed globally or imported, they can be used in templates in the following manner:

``` vue
  <carousel :per-page="1" :navigate-to="someLocalProperty" mouse-drag="false">
    <slide>
      Slide 1 Content
    </slide>
    <slide>
      Slide 2 Content
    </slide>
  </carousel>
```

To listen for the 'slideClick' event you can do the following:

``` vue
  <carousel>
    <slide
        data-index="0"
        data-name="MySlideName"
        @slideClick="handleSlideClick">
      Slide 1 Content
    </slide>
    ...
  </carousel>
```

``` js
  handleSlideClick (dataset) => {
    console.log(dataset.index, dataset.name)
  }
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

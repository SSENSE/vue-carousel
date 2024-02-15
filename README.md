# Vue Carousel

[![Build Status](https://travis-ci.org/SSENSE/vue-carousel.svg?branch=master)](https://travis-ci.org/SSENSE/vue-carousel)
[![Coverage Status](https://coveralls.io/repos/github/SSENSE/vue-carousel/badge.svg?branch=master)](https://coveralls.io/github/SSENSE/vue-carousel?branch=master)
[![Latest Stable Version](https://img.shields.io/npm/v/vue-carousel.svg)](https://www.npmjs.com/package/vue-carousel)

**WARNING: vue-carousel is at pre-alpha stage of development and may undergo significant changes.**

**Feel free to submit issues and feature requests [here](https://github.com/SSENSE/vue-carousel/issues)**.

**[Full documentation and examples](https://ssense.github.io/vue-carousel)**

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [License](#license)

## Introduction
Welcome to Vue Carousel! This lightweight and customizable slide carousel is an open-source project built with Javascript and Vue.js, providing a seamless way to showcase your images or content in a visually appealing manner. Whether you're creating a portfolio, a product showcase, or a simple image slider, Vue Carousel offers a smooth and interactive experience for your users. This project is designed to seamlessly integrate into your web applications creating sleek and intuitive user interfaces. Its user-friendly setup and configurations make Vue Carousel easily accessible for developers of all levels, allowing you to deliver a captivating user experience without dealing with overly complex code. Overall, Vue Carousel aims to elevate your web projects by presenting content in a visually engaging and interactive manner.

## Features
- **Easy Integration:** This project is built upon Vue.js, allowing it to be easily imported into any project.
- **Customizable Styles:** Modify the appearance of the carousel to match your preferred design choices by changing the sizing, transitions, and color with ease.
- **Responsive Design:** Vue Carousel is designed to be responsive and user friendly, ensuring a consistent and engaging experience across various devices.
- **Navigation Controls:** Users can easily navigate through the images by sliding the carousel, using the provided dots, or through arrow buttons.
- **Automatic Rotation:** Optionally, the carousel can automatically rotate through the slides at a specified interval.
- **Lightweight and Fast:** This project is optimized for performance and ensures quick loading times and smooth transitions.

## Requirements
In order to use Vue Carousel, you must have [npm](https://docs.npmjs.com/getting-started) or [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) installed, as well as an up to date version of [Node.js](https://nodejs.org/en/download).

## Installation

To install using npm, run the following command in your command prompt:

``` bash
npm install vue-carousel
```

Alternatively, to install using yarn, run this command in your command prompt:

``` bash
yarn add vue-carousel
```

## Usage

### Global

To utilize Vue Carousel globally throughout your project, import both the 'vue' and 'vue-carousel' components by adding the following Javascript code to the top of your App.js file.

``` js
import Vue from 'vue';
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
```
This will make **&lt;carousel&gt;** and **&lt;slide&gt;** available to all components within your Vue app.

### Local

If you instead wish to use Vue Carousel locally in your project, simply import the 'Carousel' and 'Slide' components locally by including the following Javascript code at the top of the desired file.

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
This will make **&lt;carousel&gt;** and **&lt;slide&gt;** available in your selected file.

### Configuration
The following is a comprehensive list of each element that can be configured in order to match the desired styling for your page. This includes options in sizing, color, transitions, positioning, and more.
| Property                    | Type    | Default | Description                                                                                                                                                                                                                                                                           |
|:----------------------------|:--------|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| adjustableHeight            | Boolean | false   | Adjust the height of the carousel for the current slide.
| adjustableHeightEasing      | String  |         | Slide transition easing for adjustableHeight. Any valid CSS transition easing accepted.
| autoplay                    | Boolean | false   | Flag to enable autoplay.                                                                                                                                                                                                                                                              |
| autoplayDirection           | String  | forward | Sets the autoplay direction for the carousel during autoplay. By default it is forward but can also be set to backward. If an incorrect string is supplied it will default to forward.                                                                                                |
| autoplayHoverPause          | Boolean | true    | Flag to pause autoplay on hover.                                                                                                                                                                                                                                                      |
| autoplayTimeout             | Number  | 2000    | Time elapsed before advancing slide in autoplay.                                                                                                                                                                                                                                      |
| centerMode                  | Boolean | false   | Center images when the size is less than the container width.                                                                                                                                                                                                                         |
| easing                      | String  | ease    | Slide transition easing. Any valid CSS transition easing accepted.                                                                                                                                                                                                                    |
| loop                        | Boolean | false   | Flag to make the carousel loop around when it reaches the end.                                                                                                                                                                                                                        |
| minSwipeDistance            | Number  | 8       | Minimum distance for the swipe to trigger a slide advance.                                                                                                                                                                                                                            |
| mouseDrag                   | Boolean | true    | Flag to toggle mouse dragging.                                                                                                                                                                                                                                                        |
| navigateTo                  | Number, Array  | 0       | Listen for an external navigation request using this prop. When the supplied prop is of type Number the slide with the matching index is animated into view, however you can disable this animation by supplying an Array consisting of exactly two element: the new slide index and a boolean indication whether the change should be animated or not (eg. [3, false] would mean "go to the slide with index 3 without animation").                                                                                                                                                                                                                            |
| navigationClickTargetSize   | Number  | 8       | Amount of padding to apply around the label in pixels.                                                                                                                                                                                                                                |
| navigationEnabled           | Boolean | false   | Flag to render the navigation component (next/prev buttons).                                                                                                                                                                                                                          |
| navigationNextLabel         | String  | ▶       | Text content of the navigation next button.                                                                                                                                                                                                                                           |
| navigationPrevLabel         | String  | ◀       | Text content of the navigation prev button.                                                                                                                                                                                                                                           |
| paginationActiveColor       | String  | #000000 | The fill color of the active pagination dot. Any valid CSS color is accepted.                                                                                                                                                                                                         |
| paginationColor             | String  | #efefef | The fill color of pagination dots. Any valid CSS color is accepted.                                                                                                                                                                                                                   |
| paginationPosition          | String  | bottom  | The position of pagination dots. Possible values are `bottom`, `bottom-overlay`, `top` and `top-overlay`. The overlay values place the pagination component over the images.                                                                                                          |
| paginationEnabled           | Boolean | true    | Flag to render pagination component.                                                                                                                                                                                                                                                  |
| paginationPadding           | Number  | 10      | The padding inside each pagination dot. Pixel values are accepted.                                                                                                                                                                                                                    |
| paginationSize              | Number  | 10      | The size of each pagination dot. Pixel values are accepted.                                                                                                                                                                                                                           |
| perPage                     | Number  | 2       | Maximum number of slides displayed on each page.                                                                                                                                                                                                                                      |
| perPageCustom               | Array   |         | Configure the number of visible slides with a particular browser width. This will be an array of arrays, ex. [[320, 2], [1199, 4]]. Formatted as [x, y] where x=browser width, and y=number of slides displayed. Ex. [1199, 4] means if (window >= 1199) then show 4 slides per page. |
| resistanceCoef              | Number  | 20      | Resistance coefficient to dragging on the edge of the carousel. This dictates the effect of the pull as you move towards the boundaries.                                                                                                                                              |
| scrollPerPage               | Boolean | true    | Scroll per page, not per item.                                                                                                                                                                                                                                                        |
| spacePadding                | Number  | 0       | Stage padding option adds left and right padding style (in pixels) onto VueCarousel-inner.                                                                                                                                                                                            |
| spacePaddingMaxOffsetFactor | Number  | 0       | Specify by how much should the space padding value be multiplied of, to re-arange the final slide padding.                                                                                                                                                                            |
| speed                       | Number  | 500     | Slide transition speed. Number of milliseconds accepted.                                                                                                                                                                                                                              |
| tagName                     | String  | slide   | Name (tag) of slide component. Overwrite with coponent name when extending slide component.                                                                                                                                                                                           |
| touchDrag                   | Boolean | true    | Flag to toggle touch dragging.                                                                                                                                                                                                                                                        |
| value                       | Number  |         | Support for v-model functionality. Setting this value will change the current page to the number inputted (if between 0 and pageCount).                                                                                                                                               |


### Events
The following is a comprehensive list of each of the trackable events which can be used to prompt other actions on your page. 
| Event                     | Type    | Emitter  | Description                                                                                                                                                                                                                                                                           |
|:--------------------------|:--------|:---------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `navigation-click`             |         | Carousel | Emits when the a navigation button is clicked, with the current direction (`backward` or `forward`)                                                                                                                                                                                                                     |
| `pagination-click`             |         | Carousel | Emits when a pagination button is clicked, with the current `pageNumber`                                                                                                                                                                                                                        |
| `page-change`                 | Number  | Carousel | Emits with the current page number.                                                                                                                                                                                                                       |
| `slide-click`                | Object  | Slide    | Emits with the *dataset* object of the selected element                        ··
| `transition-start` | | Carousel | Emits when the transition end is reached                                                                                                                                                  |
| `transition-end`             |         | Carousel | Emits when the transition start is reached                                                                                                     ·                                                                                                               |

Lowercase versions of the above events are also emitted, namely—`pagechange`, `slideclick`, `transitionstart` and `transitionend`.

### HTML Structure

Once the **Carousel** and **Slide** components are installed globally or imported, they can be used in templates in the following manner:

``` vue
  <carousel :per-page="1" :navigate-to="someLocalProperty" :mouse-drag="false">
    <slide>
      Slide 1 Content
    </slide>
    <slide>
      Slide 2 Content
    </slide>
  </carousel>
```

To listen for the 'slideclick' event you can do the following:

``` vue
  <carousel>
    <slide
        data-index="0"
        data-name="MySlideName"
        @slideclick="handleSlideClick">
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

A sandboxed development environment is provided by [vue-play](https://github.com/vue-play/vue-play), allowing you to test various configurations of the Vue Carousel before fully implementing them in your project. As you modify and enhance your Vue Carousel components, the changes will immediately take effect in the sandbox. This tool streamlines development by providing a risk-free space to vizualize and interact with the Vue Carousel components and ensure they meet the needs of your project.

### Getting Started
To begin development, follow these steps:

1. Install project dependencies:
``` bash
yarn install
```

2. Launch the development server:
``` bash
yarn dev
```
3. Open your browser and navigate to `http://localhost:5000` to explore the sandbox environment

### Custom Scenarios

To modify and add sandbox scenarios, edit the `play/index.js` file with your desired use cases and configurations.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

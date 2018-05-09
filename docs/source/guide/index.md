---
title: Guide
---

## Installation

```bash
yarn add vue-carousel   // or npm install -S vue-carousel
```

## Usage (Global)

You may install Vue Carousel globally:

```js
import Vue from 'vue';
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
```

This will make **&lt;carousel&gt;** and **&lt;slide&gt;** available to all components within your Vue app.

## Usage (Local)

Include the carousel directly into your component using import:

```js
import { Carousel, Slide } from 'vue-carousel';

export default {
	components: {
		Carousel,
		Slide
	}
};
```

## HTML Structure

Once the **Carousel** and **Slide** components are installed globally or imported, they can be used in many ways, for example:

##### Statically

```html
  <carousel>
    <slide>
      Slide 1 Content
    </slide>
    <slide>
      Slide 2 Content
    </slide>
  </carousel>
```

##### Programatically

```html
<carousel>
    <slide v-for="(image, index) in images" :key="index">
        <img :alt="'Image ' + (index + 1)" :src="image" />
    </slide>
</carousel>
```

## Events

Vue-carousel emits many events that we can listen to, for example:

##### slideClick

This event is emitted when a slide is clicked. To listen for this event you can do the following:

```html
  <carousel>
    <slide
        data-index="0"
        data-name="MySlideName"
        @slideClick="handleSlideClick">
      Slide 1 Content
    </slide>
  </carousel>
```

```
  handleSlideClick (dataset) => {
    console.log(dataset.index, dataset.name)
  }
```

##### transitionEnd

This event is emitted when the slide has finished paginating. To listen for this event you can do the following:

```html
  <carousel
       style="width: 500px;"
       @transitionEnd="handleTransitionEnd"
     >
       <slide v-for="slide in slides" :key="slide.src">
         <img style="width: 100%;" :src= slide />
       </slide>
  </carousel>
```

```
  handleTransitionEnd() => {
    console.log('the transition has ended!')
  }
```

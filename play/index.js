/* eslint-disable */

import { play } from 'vue-play';
import Carousel from '../src/Carousel.vue';
import Slide from '../src/Slide.vue';
 
const images = [
  'https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176006_1.jpg',
  'https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176005_1.jpg',
  'https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176003_1.jpg',
  'https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176004_1.jpg',
  'https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176002_1.jpg',
  'https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176001_1.jpg'
];

const generateSlideImages = (createElement) => {
  return images.map((image) => {
    return createElement(Slide, {}, [
        createElement(
          'img',
          {
            style: { width: '100%' },
            attrs: { src: image }
          }
        )
      ]);
  });
};

play('Carousel', module)
  .add('default, with images', h => h(
    'div', 
    { style: { width: '500px' } },
    [h(Carousel, {}, generateSlideImages(h))]
    )
  )
  .add('scroll per page, with images', h => h(
    'div', 
    {
      style: { width: '500px' },
    },
    [
      h(Carousel, { props: { scrollPerPage: true } }, generateSlideImages(h))
    ])
  )
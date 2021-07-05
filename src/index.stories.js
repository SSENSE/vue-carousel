import Vue from "vue";
import installer from "./index.js";

installer.install(Vue);

const prefix =
  "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/";

const images = [
  "171924M176006_1.jpg",
  "171924M176005_2.jpg",
  "171924M176003_3.jpg",
  "171924M176004_4.jpg",
  "171924M176002_5.jpg",
  "171924M176001_2.jpg"
].map(img => prefix + img);

const slides = images.map(
  image => `<slide><img width='100%' src='${image}'/></slide>`
);

export default { title: "Vue Carousel" };

export const withDefault = () => `<carousel>${slides.join("")}</carousel>`;

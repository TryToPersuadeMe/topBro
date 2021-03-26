var casesSlider = new Swiper(".cases", {
  slidesPerView: 1,
  speed: 500,
  watchOverflow: true,
  centeredSlides: true,

  effect: "cube",
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },

  pagination: {
    el: ".cases__pagination",
    type: "bullets",
    clickable: true,
    dynamicBullets: true,
  },
});

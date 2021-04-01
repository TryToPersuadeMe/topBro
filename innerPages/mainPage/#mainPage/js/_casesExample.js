var descriptionSlider = new Swiper(".casesExample__slider", {
  spaceBetween: 20,
  watchOverflow: true,
  speed: 800,
  autoHeight: true,

  scrollbar: {
    el: ".allBloggers__scrollbar",
    hide: false,
  },

  navigation: {
    nextEl: ".allBloggers-button-next",
    prevEl: ".allBloggers-button-prev",
  },

  breakpoints: {
    // when window width is >= 640px

    320: {
      slidesPerView: 1,
    },

    769: {
      slidesPerView: 1.3,
    },

    1025: {
      slidesPerView: 1.5,
    },
  },
});

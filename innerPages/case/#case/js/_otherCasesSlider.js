var allBloggersSliderSection = new Swiper(".otherCasesSlider__slider", {
  spaceBetween: 20,
  // centeredSlides: true,
  // slidesPerView: "auto",
  speed: 500,
  watchOverflow: true,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    400: {
      slidesPerView: 1.3,
    },
    481: {
      slidesPerView: 1.5,
    },

    601: {
      slidesPerView: 2,
    },

    768: {
      slidesPerView: 2.5,
    },
    // when window width is >= 480px
    1000: {
      slidesPerView: 3,
    },
    // when window width is >= 640px
  },
});

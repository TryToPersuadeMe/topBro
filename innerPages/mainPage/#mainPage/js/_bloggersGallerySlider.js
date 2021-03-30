var exclusiveBloggersSlider = new Swiper(".bloggersGallery__slider", {
  spaceBetween: 20,
  watchOverflow: true,
  speed: 800,

  slidesPerView: "auto",
  scrollbar: {
    el: ".customScrollbar",
    hide: false,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  observer: true,
  observeParents: true,
  observeSlideChildren: true,

  on: {
    beforeInit: function () {
      if (window.innerWidth > 1350) this.destroy(false, false);
    },
    resize: function () {
      if (window.innerWidth > 1350) {
        this.destroy(false, false);
        this.update();
      } else {
        this.init();
        this.update();
      }
    },
  },

  breakpoints: {
    // when window width is >= 640px
    // 320: {
    //   slidesPerView: 4,
    // },
    // 1299: {
    //   slidesPerView: 9,
    // },
  },
});

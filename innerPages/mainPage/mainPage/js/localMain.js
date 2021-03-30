var descriptionSlider = new Swiper(".casesExample__slider", {
  spaceBetween: 20,
  watchOverflow: true,
  speed: 800,
  autoHeight: true,
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
;
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
;

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
;
var commentsSlider = new Swiper(".ourClientsSection__comments-slider ", {
  slidesPerView: 1,
  centeredSlides: true,

  speed: 600,
  autoHeight: true,
});

var clientsSlider = new Swiper(".ourClientsSection__clienInfo-slider", {
  spaceBetween: 50,
  speed: 600,
  centeredSlides: true,
  navigation: {
    nextEl: ".comment-button-next",
    prevEl: ".comment-button-prev",
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    376: {
      spaceBetween: 30,
    },
    481: {
      slidesPerView: "auto",
    },
  },

  on: {
    function() {
      this.updateProgress();
      this.updateSize();
      this.updateSlides();
    },
  },
});

commentsSlider.controller.control = clientsSlider;
clientsSlider.controller.control = commentsSlider;
clientsSlider.slideTo(Math.round(clientsSlider.slides.length / 2));
;

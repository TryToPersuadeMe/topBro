var commentsSlider = new Swiper(".ourClientsSection__comments-slider ", {
  slidesPerView: 1,
  centeredSlides: true,

  speed: 600,
  autoHeight: true,
});

var clientsSlider = new Swiper(".ourClientsSection__clienInfo-slider", {
  slidesPerView: "auto",
  speed: 600,
  autoHeight: true,
  centeredSlides: true,
  spaceBetween: 30,

  //   freeMode: true,
  watchSlidesVisibility: true,
  //   watchSlidesProgress: true,

  breakpoints: {
    320: {
      spaceBetween: 10,
    },
    376: {
      spaceBetween: 30,
    },
  },
});

commentsSlider.controller.control = clientsSlider;
clientsSlider.controller.control = commentsSlider;
clientsSlider.slideTo(Math.round(clientsSlider.slides.length / 2));

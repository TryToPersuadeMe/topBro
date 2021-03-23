var allBloggersSliderSection = new Swiper(".allBloggers__slider", {
  slidesPerView: "auto",
  spaceBetween: 20,
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
});

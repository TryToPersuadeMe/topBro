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
;
const watchVideo = () => {
  const $container = document.querySelector(".videoGallery__galleryGrid");

  $container.addEventListener("click", () => {
    if (event.target.classList.contains("videoCard")) {
      let iFrame = event.target.querySelector(".videoCard__iframeVideo");
      iFrame.setAttribute("src", iFrame.dataset.src);
      event.target.classList.add("active");
    }
  });
};

watchVideo();
;

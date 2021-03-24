var allBloggersSliderSection = new Swiper(".allBloggers__slider", {
  spaceBetween: 20,
  // centeredSlides: true,
  // slidesPerView: "auto",
  speed: 500,
  watchOverflow: true,
  scrollbar: {
    el: ".allBloggers__scrollbar",
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
    1200: {
      slidesPerView: 4,
    },
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
var personalCardCustomScroll = new Swiper(".personalCard__containerInfo", {
  direction: "vertical",
  slidesPerView: "auto",
  freeMode: true,
  freeModeMomentum: false,
  freeModeMomentumBounce: false,
  scrollbar: {
    el: ".personalCard__scrollBar",
  },
  mousewheel: true,
});
;

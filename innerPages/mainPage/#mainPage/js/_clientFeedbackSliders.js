var commentsSlider = new Swiper(".ourClientsSection__comments-slider ", {
  slidesPerView: 1,
  centeredSlides: true,

  speed: 600,
  autoHeight: true,
  on: {
    init: function () {
      // this.$wrapperEl[0].insertAdjacentHTML("afterbegin", `<div class="swiper-slide dummySlide comment"></div>`);
      // this.$wrapperEl[0].insertAdjacentHTML("afterbegin", `<div class="swiper-slide dummySlide clientInfo"></div>`);

      this.updateProgress();
      this.updateSize();
      this.updateSlides();
    },
    // beforeTransitionStart: function () {
    //   if (this.activeIndex <= 1) {
    //     this.allowSlidePrev = false;
    //   } else {
    //     this.allowSlidePrev = true;
    //   }
    // },

    // activeIndexChange: function () {
    //   if (this.activeIndex == 0) {
    //     this.slideTo(1);
    //   }
    // },
  },
});

var clientsSlider = new Swiper(".ourClientsSection__clienInfo-slider", {
  spaceBetween: 50,
  speed: 600,
  // slidesPerView: "auto",
  centeredSlides: true,
  navigation: {
    nextEl: ".comment-button-next",
    prevEl: ".comment-button-prev",
  },

  breakpoints: {
    320: {
      slidesPerView: 1.1,
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
    init: function () {
      // this.$wrapperEl[0].insertAdjacentHTML("beforeend", `<div class="swiper-slide dummySlide clientInfo"></div>`);

      this.updateProgress();
      this.updateSize();
      this.updateSlides();
    },
    // beforeTransitionStart: function () {
    //   if (this.activeIndex <= 1) {
    //     this.allowSlidePrev = false;
    //   } else {
    //     this.allowSlidePrev = true;
    //   }
    // },

    // activeIndexChange: function () {
    //   if (this.activeIndex == 0) {
    //     this.slideTo(1);
    //   }
    // },
  },
});

commentsSlider.controller.control = clientsSlider;
clientsSlider.controller.control = commentsSlider;
clientsSlider.slideTo(Math.round(1));

const q = document.querySelectorAll(".comment");
const qw = document.querySelectorAll(".clientInfo");

console.log(q);
console.log(qw);

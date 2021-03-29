var descriptionSlider = new Swiper(".casesExample__slider", {
  slidesPerView: 1.5,
  spaceBetween: 20,
  watchOverflow: true,
  speed: 800,

  scrollbar: {
    el: ".customScrollbar",
    hide: false,
  },

  observer: true,
  observeParents: true,
  observeSlideChildren: true,

  // on: {
  //   afterInit: function () {
  //     // && this.$wrapperEl[0].children.length != 1
  //     this.$wrapperEl[0].insertAdjacentHTML(
  //       "beforeend",
  //       `<a class="swiper-slide dummySlide caseBox" style="opacity:0;visibility:hidden"></a>`
  //     );
  //   },

  //   resize: function () {
  //     const $lastSlide = this.slides[this.slides.length - 1];
  //     console.log($lastSlide);
  //     if (window.innerWidth < 480 && $lastSlide.classList.contains("dummySlide")) {
  //       $lastSlide.remove();
  //     } else if (window.innerWidth > 480 && !$lastSlide.classList.contains("dummySlide")) {
  //       this.$wrapperEl[0].insertAdjacentHTML("beforeend", `<a class="swiper-slide dummySlide caseBox" ></a>`);
  //     }
  //   },
  // },
});
;

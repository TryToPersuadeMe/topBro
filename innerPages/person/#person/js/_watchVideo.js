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

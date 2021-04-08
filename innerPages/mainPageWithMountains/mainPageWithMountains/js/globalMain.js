class responsiveHeader {
  constructor(props) {
    this.navigation = document.querySelector("." + props.navigation);
    this.burgerIcon = document.querySelector("." + props.burgerIcon);
    this.burgerIcon_active = props.burgerIcon_active;

    this.htmlBody = document.querySelector("body");

    this.BurgerClick();
    this.WindowClick();
  }

  openState() {
    this.navigation.classList.add("active");
    this.burgerIcon.classList.add(this.burgerIcon_active);
    this.htmlBody.classList.add("bodyOverlay_active");
  }

  closeState() {
    this.navigation.classList.remove("active");
    this.burgerIcon.classList.remove(this.burgerIcon_active);
    this.htmlBody.classList.remove("bodyOverlay_active");
  }

  BurgerClick() {
    this.burgerIcon.addEventListener("click", () => {
      if (!event.currentTarget.classList.contains(this.burgerIcon_active)) {
        this.openState();
      } else {
        this.closeState();
      }
    });
  }

  WindowClick() {
    document.addEventListener("click", () => {
      if (event.target.classList.contains("bodyOverlay_active")) {
        this.closeState();
      }
    });
  }
}

const headerBurgerMenu = new responsiveHeader({
  navigation: "header",
  burgerIcon: "burgerIcon",
  burgerIcon_active: "burgerIcon_active",
});
;
window.onload = function () {
  const $anchors = document.querySelectorAll("a");
  $anchors.forEach((item) => item.classList.add("hoverable"));

  trackMouse(".hoverable", ".js-pointer");
};

function trackMouse(hover, pointer) {
  var $hover = document.querySelectorAll(hover);
  var $pointer = document.querySelector(pointer);

  var off = 50;
  var first = !0;

  function mouseX(evt) {
    if (!evt) evt = window.event;
    if (evt.pageX) return evt.pageX;
    else if (evt.clientX)
      return evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    else return 0;
  }

  function mouseY(evt) {
    if (!evt) evt = window.event;
    if (evt.pageY) return evt.pageY;
    else if (evt.clientY)
      return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    else return 0;
  }

  function follow(evt) {
    if (first) {
      first = !1;
      $pointer.style.opacity = 1;
    }

    TweenMax.to($pointer, 0.2, {
      left: parseInt(mouseX(evt)) - off + "px",
      top: parseInt(mouseY(evt)) - off + "px",
      ease: Power3.easeOut,
    });
  }
  document.onmousemove = follow;

  (function hoverable() {
    $hover.forEach(function (item) {
      item.addEventListener("mouseover", function () {
        $pointer.classList.add("hide");
      });
      item.addEventListener("mouseout", function () {
        $pointer.classList.remove("hide");
      });
    });
  })();
}
;
class CallPopUp {
  constructor(props) {
    if (props.button.status) {
      this.$button = document.querySelector("." + props.button.selector);
      this.openButtonClick(props);
    }

    this.$popUp = document.querySelector("." + props.popUp.selector);
    this.$closeIcon = this.$popUp.querySelector("." + props.popUp.closeIcon);

    this.htmlBody = document.querySelector("body");

    this.closeButtonClick();
    this.WindowClick();
  }

  openState() {
    this.$popUp.classList.add("active");
    this.htmlBody.classList.add("bodyOverlay-fullWidth");
  }

  closeState() {
    this.$popUp.classList.remove("active");
    this.htmlBody.classList.remove("bodyOverlay-fullWidth");
  }

  openButtonClick() {
    this.$button.addEventListener("click", () => {
      this.openState();
    });
  }
  closeButtonClick() {
    this.$closeIcon.addEventListener("click", () => {
      this.closeState();
    });
  }

  WindowClick() {
    document.addEventListener("click", () => {
      if (event.target.classList.contains("bodyOverlay-fullWidth") && this.$popUp.classList.contains("active")) {
        this.closeState();
      }
    });
  }
}

const callPopUp = new CallPopUp({
  button: {
    status: true,
    selector: "button-call-popUp-js",
  },

  popUp: {
    selector: "popUp",
    closeIcon: "getFeedBack__closeIcon",
  },
});
;

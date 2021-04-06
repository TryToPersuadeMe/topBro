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

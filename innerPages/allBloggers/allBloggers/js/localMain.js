class Select {
  constructor(el) {
    if (typeof el === "string") {
      el = document.querySelectorAll(el);
    }

    if (typeof el[Symbol.iterator] === "function") {
      return [...el].map((n) => new Select(n));
    }

    this.$select = el;

    this.$visibleLabelText = this.$select.querySelector(".select__visibleText");
    this.$hiddenInput = this.$select.querySelector(".select__input");

    this.$dropdown = this.$select.querySelector(".select__dropdown");
    this.$list = this.$select.querySelector(".select__list");
    this.$label = this.$select.querySelector(".select__label");
    this.$scrollIcon = this.$select.querySelector(".select__scrollIcon");

    this.$body = document.querySelector("body");
    this.maxHeight = 230;
    this.handleClick();
    this.closeState(this.maxHeight);
    this.hanldeClickWindow();
  }

  openState(maxHeight) {
    this.$select.classList.add("open");
    this.$dropdown.style.maxHeight = maxHeight + "px";
    this.addScrollIcon();
  }

  closeState() {
    this.$select.classList.remove("open");
    this.$dropdown.style.maxHeight = "0px";
  }

  /* open/close dropdown list */
  toggleState() {
    if (this.$select.classList.contains("open")) {
      this.closeState();
    } else {
      this.openState(this.maxHeight);
    }
  }

  addScrollIcon() {
    let list_height = this.$list.offsetHeight;
    if (list_height > this.maxHeight) this.$scrollIcon.classList.add("active");
  }

  handleClick() {
    this.$select.addEventListener("mouseup", () => {
      this.toggleState();
      this.handleValue();
    });
  }

  /* change value of input */
  handleValue() {
    if (event.target.classList.contains("select__item")) {
      this.$visibleLabelText.innerText = event.target.innerText;
      this.$hiddenInput.value = this.$visibleLabelText.innerText;
      this.$hiddenInput.setAttribute("name", this.$visibleLabelText.innerText);
    }
  }

  hanldeClickWindow() {
    window.addEventListener("click", () => {
      console.log(document.querySelectorAll(".select__dropdown"));

      if (event.target != this.$label && event.target != this.$hiddenInput) {
        this.closeState();
      }
    });
  }
}

const select = new Select(".select");
;

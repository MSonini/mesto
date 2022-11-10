export default class Popup {
  constructor(popupSelector, closeButtonSelector) {
    this._element = document.querySelector(popupSelector);
    this._closeButton = this._element.querySelector(closeButtonSelector);
  }

  open() {
    document.addEventListener("keydown", this._handleEscPress);
    this._element.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keydown", this._handleEscPress);
    this._element.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._element.addEventListener("click", this._handleOverlayClick);
  }

  _handleEscPress = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOverlayClick = (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__container")
    ) {
      this.close();
    }
  };
}

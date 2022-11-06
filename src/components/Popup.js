export default class Popup {
  constructor(popupSelector, closeButtonSelector) {
    this._element = document.querySelector(popupSelector);
    this._closeButton = this._element.querySelector(closeButtonSelector);
  }

  open() {
    this._element.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._element.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    document.addEventListener("keydown", this._handleEscPress.bind(this));
    this._element.addEventListener(
      "click",
      this._handleOverlayClick.bind(this)
    );
  }

  _handleEscPress(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__container")
    ) {
      this.close();
    }
  }
}

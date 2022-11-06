import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(
    popupSelector,
    closeButtonSelector,
    imageSelector,
    titleSelector
  ) {
    super(popupSelector, closeButtonSelector);
    this._image = this._element.querySelector(imageSelector);
    this._title = this._element.querySelector(titleSelector);
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
    super.open();
  }
}

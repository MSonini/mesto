import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(
    { popupSelector, closeButtonSelector, formSelector, inputSelector },
    submitForm
  ) {
    super(popupSelector, closeButtonSelector);
    this._inputSelector = inputSelector;
    this._submitForm = submitForm;
    this._form = this._element.querySelector(formSelector);
  }

  getInputValues() {
    return Array.from(this._element.querySelectorAll(this._inputSelector)).map(
      (e) => e.value
    );
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener("submit", this._submitForm);
  }

  reset() {
    this._form.reset();
  }

  open({ name, about } = "") {
    if (name && about) {
      const [nameElement, aboutElement] = Array.from(
        this._element.querySelectorAll(this._inputSelector)
      );
      nameElement.value = name;
      aboutElement.value = about;
    }
    super.open();
  }

  // close() {
  //   super.close();
  // }
}

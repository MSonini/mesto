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

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener("submit", (evt) =>
      this._submitForm(evt, this._getInputValues())
    );
  }

  fillInputValues({ name, about }) {
    const [nameElement, aboutElement] = Array.from(
      this._element.querySelectorAll(this._inputSelector)
    );
    nameElement.value = name;
    aboutElement.value = about;
  }

  close() {
    this._form.reset();
    super.close();
  }
}

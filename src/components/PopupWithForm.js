import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(
    { popupSelector, closeButtonSelector, formSelector, inputSelector },
    submitForm
  ) {
    super(popupSelector, closeButtonSelector);
    this._submitForm = submitForm;
    this._form = this._element.querySelector(formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(inputSelector));
  }

  _getInputValues() {
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

  fillInputValues(inputValues) {
    this._inputList.forEach((input) => {
      input.value = inputValues[input.name];
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}

import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(
    {
      popupSelector,
      closeButtonSelector,
      formSelector,
      inputSelector,
      submitButtonSelector,
    },
    submitForm
  ) {
    super(popupSelector, closeButtonSelector);
    this._submitForm = submitForm;
    this._submitButton = this._element.querySelector(submitButtonSelector);
    this._form = this._element.querySelector(formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(inputSelector));
  }

  handleRequest(requestCallBack, buttonText) {
    let text = this._submitButton.textContent;
    this._submitButton.textContent = buttonText;
    requestCallBack();
    this._submitButton.textContent = text;
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

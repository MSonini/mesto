import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(
    { popupSelector, closeButtonSelector, submitButtonSelector },
    submitCallback
  ) {
    super(popupSelector, closeButtonSelector);
    this._submitCallback = submitCallback;
    this._submitButton = this._element.querySelector(submitButtonSelector);
  }

  handleRequest(requestCallBack, buttonText) {
    let text = this._submitButton.textContent;
    this._submitButton.textContent = buttonText;
    requestCallBack(this._cardId, this._card);
    this._submitButton.textContent = text;
  }

  open(cardId, card) {
    this._cardId = cardId;
    this._card = card;
    super.open();
  }

  close() {
    this._card = null;
    this._cardId = null;
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", (evt) =>
      this._submitCallback(evt)
    );
  }
}

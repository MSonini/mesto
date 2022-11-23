import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(
    { popupSelector, closeButtonSelector, submitButtonSelector },
    submitCallback
  ) {
    super(popupSelector, closeButtonSelector);
    this._submitCallback = submitCallback;
    this._submitButton = this._element.querySelector(submitButtonSelector);
    this._submitButtonText = this._submitButton.textContent;
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
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
      this._submitCallback(evt, this._cardId, this._card)
        .then(() => this.close())
        .finally(() => this.renderLoading(false))
    );
  }
}

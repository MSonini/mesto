export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplateElement() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    const btnOpenImage = this._element.querySelector(".card__image-button");
    btnOpenImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    const btnDelete = this._element.querySelector(".card__delete-button");
    btnDelete.addEventListener("click", () => {
      this._element.remove();
    });

    const btnLike = this._element.querySelector(".card__like-button");
    btnLike.addEventListener("click", () => {
      btnLike.classList.toggle("card__like-button_active");
    });
  }

  getElement() {
    this._element = this._getTemplateElement();

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

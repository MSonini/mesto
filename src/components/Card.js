export default class Card {
  constructor(data, handlers, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likesAmount = data.likes;
    this._isLiked = data.isLiked;
    this._isOwner = data.isOwner;
    this._id = data._id;
    this._handleCardClick = handlers.cardClick;
    this._handleLikeClick = handlers.likeClick;
    this._handleDeleteCard = handlers.cardDelete;
    this._templateSelector = templateSelector;
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
      this._handleDeleteCard(this._id, this);
    });

    this._btnLike.addEventListener("click", () => {
      this._handleLikeClick(
        this._id,
        this._isLiked,
        this._renderLikes.bind(this)
      );
    });
  }

  _renderLikes(amount, isLiked) {
    this._likesAmount = amount;
    this._likesAmountElement.textContent = amount;
    if (isLiked) this._btnLike.classList.add("card__like-button_active");
    else this._btnLike.classList.remove("card__like-button_active");
    this._isLiked = isLiked;
  }

  getElement() {
    this._element = this._getTemplateElement();

    this._likesAmountElement =
      this._element.querySelector(".card__like-amount");
    this._btnLike = this._element.querySelector(".card__like-button");

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._element.querySelector(".card__title").textContent = this._name;

    const deleteButton = this._element.querySelector(".card__delete-button");
    deleteButton.style.display = this._isOwner ? "block" : "none";
    this._renderLikes(this._likesAmount, this._isLiked);

    this._setEventListeners();

    return this._element;
  }

  remove() {
    this._element.remove();
  }
}

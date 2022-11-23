import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";

import {
  popupCardSelector,
  popupProfileSelector,
  popupAvatarSelector,
  popupViewSelector,
  popupConfirmSelector,
  inputSelector,
  imageSelector,
  titleSelector,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  containerSelector,
  closeButtonSelector,
  cardTemplateSelector,
  formSelector,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass,
  inputErrorClass,
  btnProfileEdit,
  btnAvatarEdit,
  btnCardAdd,
  BASE_URL,
  AUTH_KEY,
} from "../utils/constants.js";

const formValidators = {};

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: AUTH_KEY,
    "Content-Type": "application/json",
  },
});

const profilePopup = new PopupWithForm(
  {
    popupSelector: popupProfileSelector,
    closeButtonSelector: closeButtonSelector,
    formSelector: formSelector,
    inputSelector: inputSelector,
    submitButtonSelector: submitButtonSelector,
  },
  submitProfileForm
);
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(
  {
    popupSelector: popupCardSelector,
    closeButtonSelector: closeButtonSelector,
    formSelector: formSelector,
    inputSelector: inputSelector,
    submitButtonSelector: submitButtonSelector,
  },
  submitCardForm
);
cardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  {
    popupSelector: popupAvatarSelector,
    closeButtonSelector: closeButtonSelector,
    formSelector: formSelector,
    inputSelector: inputSelector,
    submitButtonSelector: submitButtonSelector,
  },
  submitAvatarForm
);
avatarPopup.setEventListeners();

const viewPopup = new PopupWithImage(
  popupViewSelector,
  closeButtonSelector,
  imageSelector,
  titleSelector
);
viewPopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation(
  {
    popupSelector: popupConfirmSelector,
    closeButtonSelector: closeButtonSelector,
    submitButtonSelector: submitButtonSelector,
  },
  submitCardDeletion
);
deleteCardPopup.setEventListeners();

const user = new UserInfo(
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector
);

const container = new Section((item) => {
  container.addItem(createNewCardElement(item));
}, containerSelector);

function submitProfileForm(evt, { name, about }) {
  evt.preventDefault();
  profilePopup.renderLoading(true);
  return api
    .editProfileInfo({ name, about })
    .then((res) => user.setUserInfo(res))
    .catch(console.log);
}

function submitCardForm(evt, { name, about }) {
  evt.preventDefault();
  cardPopup.renderLoading(true);
  return api
    .addCard({ name, link: about })
    .then((card) => {
      container.addItem(createNewCardElement(card));
    })
    .catch(console.log);
}

function submitAvatarForm(evt, { about }) {
  evt.preventDefault();
  avatarPopup.renderLoading(true);
  return api
    .editProfileAvatar(about)
    .then((res) => {
      user.setUserInfo(res);
    })
    .catch(console.log);
}

function submitCardDeletion(evt, cardId, card) {
  evt.preventDefault();
  deleteCardPopup.renderLoading(true, "Удаление...");
  return api
    .removeCard(cardId)
    .then((res) => {
      card.remove();
    })
    .catch(console.log);
}

btnProfileEdit.addEventListener("click", () => {
  profilePopup.fillInputValues(user.getUserInfo());
  profilePopup.open();
});

btnAvatarEdit.addEventListener("click", () => {
  avatarPopup.open();
});

btnCardAdd.addEventListener("click", () => cardPopup.open());

const enableFormsValidation = (settings = {}) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

window.addEventListener("load", () => {
  Promise.all([api.getProfileData(), api.getCards()])
    .then(([profileData, cards]) => {
      user.setUserInfo(profileData);
      container.renderItems(cards);
    })
    .catch(console.log);
});

enableFormsValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
});

const cardHandlers = {
  cardClick: (name, link) => viewPopup.open(name, link),
  likeClick: (cardId, currentIsLiked, handleLikesCallback) => {
    const res = currentIsLiked ? api.removeLike(cardId) : api.setLike(cardId);
    res.then((card) => {
      const resIsLiked = checkIsLiked(card);
      const resCardsAmout = card.likes.length;
      handleLikesCallback(resCardsAmout, resIsLiked);
    });
  },
  cardDelete: (cardId, card) => deleteCardPopup.open(cardId, card),
};

function checkIsLiked(card) {
  let isLiked = false;
  card.likes.forEach((e) => {
    if (e._id === user.getUserId()) isLiked = true;
  });
  return isLiked;
}

function createNewCardElement(card) {
  const cardData = {
    name: card.name,
    link: card.link,
    likes: card.likes.length,
    isLiked: checkIsLiked(card),
    isOwner: card.owner._id === user.getUserId(),
    _id: card._id,
  };
  return new Card(cardData, cardHandlers, cardTemplateSelector).getElement();
}

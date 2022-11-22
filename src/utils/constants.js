const formSelector = ".popup__form";
const inputSelector = ".popup__input";
const closeButtonSelector = ".popup__close-button";
const submitButtonSelector = ".popup__submit-button";
const inactiveButtonClass = "popup__submit-button_inactive";
const inputErrorClass = "popup__input-error";
const errorClass = "popup__input-error_active";
const imageSelector = ".popup__view-image";
const titleSelector = ".popup__view-name";

const popupProfileSelector = ".popup_type_profile";
const popupCardSelector = ".popup_type_card";
const popupAvatarSelector = ".popup_type_avatar";
const popupViewSelector = ".popup_type_view";
const popupConfirmSelector = ".popup_type_confirm";

const profileNameSelector = ".profile__name";
const profileAboutSelector = ".profile__about";
const profileAvatarSelector = ".profile__avatar";

const cardTemplateSelector = "#card";

const containerSelector = ".elements";

const btnProfileEdit = document.querySelector(".profile__edit-button");
const btnAvatarEdit = document.querySelector(".profile__edit-avatar");
const btnCardAdd = document.querySelector(".profile__add-button");

const BASE_URL = "https://mesto.nomoreparties.co/v1/cohort-54";
const AUTH_KEY = "ad02f25c-8ecc-4315-97b8-cf739e1d74e3";

export {
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
};

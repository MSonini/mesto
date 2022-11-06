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
const popupViewSelector = ".popup_type_view";

const profileNameSelector = ".profile__name";
const profileAboutSelector = ".profile__about";

const cardTemplateSelector = "#card";

const containerSelector = ".elements";

const btnProfileEdit = document.querySelector(".profile__edit-button");
const btnCardAdd = document.querySelector(".profile__add-button");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export {
  initialCards,
  popupCardSelector,
  popupProfileSelector,
  popupViewSelector,
  inputSelector,
  imageSelector,
  titleSelector,
  profileNameSelector,
  profileAboutSelector,
  containerSelector,
  closeButtonSelector,
  cardTemplateSelector,
  formSelector,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass,
  inputErrorClass,
  btnProfileEdit,
  btnCardAdd,
};

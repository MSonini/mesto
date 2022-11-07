import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";

import {
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
} from "../utils/constants.js";

const formValidators = {};

const profilePopup = new PopupWithForm(
  {
    popupSelector: popupProfileSelector,
    closeButtonSelector: closeButtonSelector,
    formSelector: formSelector,
    inputSelector: inputSelector,
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
  },
  submitCardForm
);
cardPopup.setEventListeners();

const viewPopup = new PopupWithImage(
  popupViewSelector,
  closeButtonSelector,
  imageSelector,
  titleSelector
);
viewPopup.setEventListeners();

const user = new UserInfo(profileNameSelector, profileAboutSelector);

const container = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const element = createNewCardElement(item.name, item.link);
      container.addItem(element);
    },
  },
  containerSelector
);

function submitProfileForm(evt, { name, about }) {
  evt.preventDefault();
  user.setUserInfo(name, about);
  profilePopup.close();
}

function submitCardForm(evt, { name, about }) {
  evt.preventDefault();
  const element = createNewCardElement(name, about);
  container.addItem(element);
  cardPopup.close();
}

btnProfileEdit.addEventListener("click", () => {
  profilePopup.fillInputValues(user.getUserInfo());
  profilePopup.open();
});
btnCardAdd.addEventListener("click", () => cardPopup.open());

window.addEventListener("load", function () {
  container.renderItems();
});

const enableFormsValidation = (settings = {}) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableFormsValidation({
  formSelector: formSelector,
  inputSelector: inputSelector,
  submitButtonSelector: submitButtonSelector,
  inactiveButtonClass: inactiveButtonClass,
  inputErrorClass: inputErrorClass,
  errorClass: errorClass,
});

function createNewCardElement(name, link) {
  return new Card({ name, link }, cardTemplateSelector, (name, link) =>
    viewPopup.open(name, link)
  ).getElement();
}

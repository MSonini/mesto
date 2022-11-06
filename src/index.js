import "./pages/index.css";

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section";
import UserInfo from "./components/UserInfo";

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
} from "./utils/constants.js";

const formValidators = {};

const ProfilePopup = new PopupWithForm(
  {
    popupSelector: popupProfileSelector,
    closeButtonSelector: closeButtonSelector,
    formSelector: formSelector,
    inputSelector: inputSelector,
  },
  submitProfileForm
);
ProfilePopup.setEventListeners();

const CardPopup = new PopupWithForm(
  {
    popupSelector: popupCardSelector,
    closeButtonSelector: closeButtonSelector,
    formSelector: formSelector,
    inputSelector: inputSelector,
  },
  submitCardForm
);
CardPopup.setEventListeners();

const ViewPopup = new PopupWithImage(
  popupViewSelector,
  closeButtonSelector,
  imageSelector,
  titleSelector
);
ViewPopup.setEventListeners();

const User = new UserInfo(profileNameSelector, profileAboutSelector);

const Container = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const element = new Card(
        { name: item.name, link: item.link },
        cardTemplateSelector,
        () => ViewPopup.open(item.name, item.link)
      ).getElement();
      Container.addItem(element);
    },
  },
  containerSelector
);

function submitProfileForm(evt) {
  evt.preventDefault();
  User.setUserInfo(...ProfilePopup.getInputValues());
  ProfilePopup.close();
}

function submitCardForm(evt) {
  evt.preventDefault();
  const [name, link] = CardPopup.getInputValues();
  const element = new Card({ name, link }, cardTemplateSelector, () =>
    ViewPopup.open(item.name, item.link)
  ).getElement();
  Container.addItem(element);
  CardPopup.reset();
  CardPopup.close();
}

btnProfileEdit.addEventListener("click", () =>
  ProfilePopup.open(User.getUserInfo())
);
btnCardAdd.addEventListener("click", () => CardPopup.open());

window.addEventListener("load", function () {
  Container.renderItems();
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

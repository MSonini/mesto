import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js';

const formSelector = '.popup__form';
const inputSelector = '.popup__input';
const submitButtonSelector = '.popup__submit-button';
const inactiveButtonClass = 'popup__submit-button_inactive';
const inputErrorClass = 'popup__input-error';
const errorClass = 'popup__input-error_active';

const cardsContainer = document.querySelector('.elements');

const btnCardAdd = document.querySelector('.profile__add-button');
const btnProfileEdit = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popupView = document.querySelector('.popup_type_view');

const formProfile = document.forms['profile-form'];
const formCard = document.forms['card-form'];

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const viewImage = popupView.querySelector('.popup__view-image');
const viewName = popupView.querySelector('.popup__view-name');

const inputProfileName = popupProfile.querySelector('#profile-name');
const inputProfileAbout = popupProfile.querySelector('#profile-about');

const btnProfileSubmit = popupProfile.querySelector(submitButtonSelector);

const inputCardName = formCard.querySelector('#card-name');
const inputCardAbout = formCard.querySelector('#card-about');

const cardTemplateSelector = '#card';

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 


function submitProfileForm(evt) {
    evt.preventDefault();
    
    profileName.textContent = inputProfileName.value;
    profileAbout.textContent = inputProfileAbout.value;

    closePopup(popupProfile);
};

function submitCardForm(evt) {
    evt.preventDefault();
    
    prependCard(inputCardName.value, inputCardAbout.value);
    formCard.reset()

    closePopup(popupCard);
};

function prependCard(name, link) {
    const cardElement = (new Card({name, link}, cardTemplateSelector)).getElement();
    const btnOpenImage = cardElement.querySelector('.card__image-button');
    btnOpenImage.addEventListener('click', () => {
        viewImage.src = link;
        viewImage.alt = name;
        viewName.textContent = name;

        openPopup(popupView);
    });
    cardsContainer.prepend(cardElement);
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }); 
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function openProfileForm() {
    profileName.textContent.trim();
    profileAbout.textContent.trim();

    inputProfileName.value = profileName.textContent;
    inputProfileAbout.value = profileAbout.textContent;

    const inputList = Array.from(popupProfile.querySelectorAll(inputSelector));
    toggleButtonState(inputList, btnProfileSubmit, inactiveButtonClass);

    openPopup(popupProfile);
};

function openCardForm() {
    openPopup(popupCard);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnEscDown);
    popup.removeEventListener('click', closePopupOnOverlayClick);
};

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEscDown);
    popup.addEventListener('click', closePopupOnOverlayClick);
};

function closePopupOnEscDown(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    };
};

function closePopupOnOverlayClick(evt) {
    const target = evt.target;
    if (target.classList.contains('popup_opened') ||
        target.classList.contains('popup__container')) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    };
};

btnProfileEdit.addEventListener('click', openProfileForm);
btnCardAdd.addEventListener('click', openCardForm);

formProfile.addEventListener('submit', submitProfileForm);
formCard.addEventListener('submit', submitCardForm);

window.addEventListener('load', function () {
    initialCards.forEach((item) => {
        prependCard(item.name, item.link);
    });
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const enableFormsValidation = (settings={}) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        new FormValidator(settings, formElement).enableValidation();
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
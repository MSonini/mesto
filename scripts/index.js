const popups = document.querySelectorAll('.popup');

const cardsContainer = document.querySelector('.elements');

const btnCardAdd = document.querySelector('.profile__add-button');
const btnProfileEdit = document.querySelector('.profile__edit-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popupView = document.querySelector('.popup_type_view');

const formProfile = popupProfile.querySelector('.popup__form');
const formCard = popupCard.querySelector('.popup__form');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const inputProfileName = popupProfile.querySelector('#profile-name');
const inputProfileAbout = popupProfile.querySelector('#profile-about');

const inputCardName = formCard.querySelector('#card-name');
const inputCardAbout = formCard.querySelector('#card-about');

const viewImage = popupView.querySelector('.popup__view-image');
const viewName = popupView.querySelector('.popup__view-name');

const cardTemplate = document.querySelector('#card').content;

const formSelector = '.popup__form';
const inputSelector = '.popup__input';
const submitButtonSelector = '.popup__submit-button';
const inactiveButtonClass = 'popup__submit-button_inactive';
const inputErrorClass = 'popup__input-error';
const errorClass = 'popup__input-error_active';


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

    closePopup(popupCard);
};

function prependCard(name, link) {
    cardsContainer.prepend(createCard(name, link));
};

function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;

    const btnOpenImage = cardElement.querySelector('.card__image-button');
    btnOpenImage.addEventListener('click', () => {
        viewImage.src = link;
        viewImage.alt = name;
        viewName.textContent = name;

        openPopup(popupView);
    });

    const btnDelete = cardElement.querySelector('.card__delete-button');
    btnDelete.addEventListener('click', () => {
        cardsContainer.removeChild(cardElement)
    });

    const btnLike = cardElement.querySelector('.card__like-button');
    btnLike.addEventListener('click', () => {
        btnLike.classList.toggle('card__like-button_active');
    });

    return cardElement
}

function openProfileForm() {
    profileName.textContent.trim();
    profileAbout.textContent.trim();

    inputProfileName.value = profileName.textContent;
    inputProfileAbout.value = profileAbout.textContent;

    openPopup(popupProfile);
};

function openCardForm() {
    inputCardName.value = '';
    inputCardAbout.value = '';

    openPopup(popupCard);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');

    const popupCloseButton = popup.querySelector('.popup__close-button')
    popupCloseButton.removeEventListener('click', () => closePopup(popup));

    document.removeEventListener('keydown', closePopupOnEscDown);
    popup.removeEventListener('click', closePopupOnOverlayClick);
};

function openPopup(popup) {
    popup.classList.add('popup_opened');
    
    const popupCloseButton = popup.querySelector('.popup__close-button');
    popupCloseButton.addEventListener('click', () => closePopup(popup));

    const popupSubmitButton = popup.querySelector('.popup__submit-button');
    const formElement = popup.querySelector(formSelector);

    document.addEventListener('keydown', closePopupOnEscDown);
    popup.addEventListener('click', closePopupOnOverlayClick);

    const inputList = Array.from(popup.querySelectorAll(inputSelector));
    if (inputList.length > 0) {
        toggleButtonState(inputList, popupSubmitButton, inactiveButtonClass);
        inputList.forEach((inputElement) => {
            checkInputValidity(formElement, inputElement, errorClass);
        });
    }
};

function closePopupOnEscDown(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(openedPopup);
    };
};

function closePopupOnOverlayClick(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    const target = evt.target;
    if (target.classList.contains('popup_opened') ||
        target.classList.contains('popup__container')) {
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
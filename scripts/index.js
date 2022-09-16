const cardsContainer = document.querySelector('.elements');

const btnCardAdd = document.querySelector('.profile__add-button');
const btnProfileEdit = document.querySelector('.profile__edit-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popupView = document.querySelector('.popup_type_view');

const formProfile = popupProfile.querySelector('.popup__form');
const formCard = popupCard.querySelector('.popup__form');

const btnClosePopupProfile = popupProfile.querySelector('.popup__close-button');
const btnClosePopupCard = popupCard.querySelector('.popup__close-button');
const btnClosePopupView = popupView.querySelector('.popup__close-button');


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
    const name = document.querySelector('.profile__name');
    const about = document.querySelector('.profile__about');
    const inputName = popupProfile.querySelector('.popup__input_type_name');
    const inputAbout = popupProfile.querySelector('.popup__input_type_about');
    
    name.textContent = inputName.value;
    about.textContent = inputAbout.value;

    popupProfile.classList.remove('popup_opened');
};

function submitCardForm(evt) {
    evt.preventDefault();
    const inputName = popupCard.querySelector('.popup__input_type_name').value;
    const inputAbout = popupCard.querySelector('.popup__input_type_about').value;
    
    addCard(inputName, inputAbout);

    popupCard.classList.remove('popup_opened');
};

function addCard(name, link) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;

    const btnOpenImage = cardElement.querySelector('.card__image-button');
    btnOpenImage.addEventListener('click', () => {
        const viewImage = popupView.querySelector('.popup__view-image');
        viewImage.src = link;

        const viewName = popupView.querySelector('.popup__view-name');
        viewName.textContent = name;

        popupView.classList.add('popup_opened');
    });

    const btnDelete = cardElement.querySelector('.card__delete-button');
    btnDelete.addEventListener('click', () => {
        cardsContainer.removeChild(cardElement)
    });

    const btnLike = cardElement.querySelector('.card__like-button');
    btnLike.addEventListener('click', () => {
        btnLike.classList.toggle('card__like-button_active');
    });

    cardsContainer.prepend(cardElement);
};

function openProfileForm() {
    const name = document.querySelector('.profile__name').textContent;
    const about = document.querySelector('.profile__about').textContent;
    const inputName = formProfile.querySelector('.popup__input_type_name');
    const inputAbout = formProfile.querySelector('.popup__input_type_about');

    name.trim();
    about.trim();

    inputName.value = name;
    inputAbout.value = about;

    popupProfile.classList.add('popup_opened');
};

function openCardForm() {
    const inputName = formProfile.querySelector('.popup__input_type_name');
    const inputAbout = formProfile.querySelector('.popup__input_type_about');

    inputName.value = '';
    inputAbout.value = '';

    popupCard.classList.add('popup_opened');
};


btnProfileEdit.addEventListener('click', openProfileForm);
btnCardAdd.addEventListener('click', openCardForm);

formProfile.addEventListener('submit', submitProfileForm);
formCard.addEventListener('submit', submitCardForm);

btnClosePopupProfile.addEventListener('click', () => {
    popupProfile.classList.remove('popup_opened');
});

btnClosePopupCard.addEventListener('click', () => {
    popupCard.classList.remove('popup_opened');
});

btnClosePopupView.addEventListener('click', () => {
    popupView.classList.remove('popup_opened');
});

window.addEventListener('load', function () {
    initialCards.forEach((item) => {
        addCard(item.name, item.link);
    });
});

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if(evt.key === "Escape") {
        popupProfile.classList.remove('popup_opened');
        popupCard.classList.remove('popup_opened');
        popupView.classList.remove('popup_opened');
    }
};
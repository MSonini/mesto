const popups = document.querySelectorAll('.popup');

const cardsContainer = document.querySelector('.elements');

const btnCardAdd = document.querySelector('.profile__add-button');
const btnProfileEdit = document.querySelector('.profile__edit-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popupView = document.querySelector('.popup_type_view');

const formProfile = popupProfile.querySelector('.popup__form');
const formCard = popupCard.querySelector('.popup__form');

const closeButtons = document.querySelectorAll('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const inputName = popupProfile.querySelector('.popup__input_type_name');
const inputAbout = popupProfile.querySelector('.popup__input_type_about');

const viewImage = popupView.querySelector('.popup__view-image');
const viewName = popupView.querySelector('.popup__view-name');

const cardTemplate = document.querySelector('#card').content;


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
    
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;

    closePopup(popupProfile);
};

function submitCardForm(evt) {
    evt.preventDefault();

    const inputName = popupCard.querySelector('.popup__input_type_name').value;
    const inputAbout = popupCard.querySelector('.popup__input_type_about').value;
    
    prependCard(inputName, inputAbout);

    closePopup(popupCard);
};

function prependCard(name, link) {
    const cardElement = createCard(name, link);
    cardsContainer.prepend(cardElement);
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
    const name = document.querySelector('.profile__name').textContent;
    const about = document.querySelector('.profile__about').textContent;
    const inputName = formProfile.querySelector('.popup__input_type_name');
    const inputAbout = formProfile.querySelector('.popup__input_type_about');

    name.trim();
    about.trim();

    inputName.value = name;
    inputAbout.value = about;

    openPopup(popupProfile);
};

function openCardForm() {
    const inputName = formProfile.querySelector('.popup__input_type_name');
    const inputAbout = formProfile.querySelector('.popup__input_type_about');

    inputName.value = '';
    inputAbout.value = '';

    openPopup(popupCard);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

function openPopup(popup) {
    popup.classList.add('popup_opened');
};

btnProfileEdit.addEventListener('click', openProfileForm);
btnCardAdd.addEventListener('click', openCardForm);

formProfile.addEventListener('submit', submitProfileForm);
formCard.addEventListener('submit', submitCardForm);

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });

window.addEventListener('load', function () {
    initialCards.forEach((item) => {
        prependCard(item.name, item.link);
    });
});

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.key === "Escape") {
        popups.forEach((el) => {
            closePopup(el);
        });
    };
};
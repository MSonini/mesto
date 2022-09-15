const formContainer = document.querySelector('.popup__form-container');
const viewContainer = document.querySelector('.popup__view-container')
const cardsContainer = document.querySelector('.elements');

const popupElement = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');

const btnCardAdd = document.querySelector('.profile__add-button');
const btnProfileEdit = document.querySelector('.profile__edit-button');
const btnPopupCloseForm = formContainer.querySelector('.popup__close-button');
const btnPopupCloseView = viewContainer.querySelector('.popup__close-button');


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

function openForm(evt) {
    const target = evt.target || window.event.target;
    
    let titleText;
    let submitText;
    let title = document.querySelector('.popup__title');
    let submit = document.querySelector('.popup__submit-button');
    let name = document.querySelector('.profile__name');
    let about = document.querySelector('.profile__about');
    let name_form = document.querySelector('.popup__input_type_name');
    let about_form = document.querySelector('.popup__input_type_about');

    if (target === btnProfileEdit) {
        titleText = 'Редактировать профиль';
        submitText = 'Сохранить';
        namePlaceholder = 'Имя';
        aboutPlaceholder = 'О себе';
        formElement.type = 'edit';

        name_form.value = name.textContent.trim();
        about_form.value = about.textContent.trim();
    } else {
        titleText = 'Новое место';
        submitText = 'Создать';
        namePlaceholder = 'Название';
        aboutPlaceholder = 'Ссылка на картинку';
        formElement.type = 'add';

        name_form.value = '';
        about_form.value = '';
    };

    title.textContent = titleText;
    submit.textContent = submitText;
    name_form.placeholder = namePlaceholder;
    about_form.placeholder = aboutPlaceholder;

    popupElement.classList.add('popup_opened');
    formContainer.classList.add('popup__form-container_active');
    viewContainer.classList.remove('popup__view-container_active');
};

function closePopup() {
    popupElement.classList.remove('popup_opened');
};

function submitProfileForm(name_form, about_form) {
    let name = document.querySelector('.profile__name');
    let about = document.querySelector('.profile__about');
    
    name.textContent = name_form.value;
    about.textContent = about_form.value;
};

function submitForm(evt) {
    evt.preventDefault();
    const name_form = document.querySelector('.popup__input_type_name');
    const about_form = document.querySelector('.popup__input_type_about');

    if (formElement.type === 'edit') {
        submitProfileForm(name_form, about_form);
    } else {
        addCard(name_form.value, about_form.value);
    };

    formContainer.classList.remove('popup__form-container_active');
    popupElement.classList.remove('popup_opened');
};

function addCard(name, link) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;

    const btnOpenImage = cardElement.querySelector('.card__image-button');
    btnOpenImage.addEventListener('click', () => {
        formContainer.classList.remove('popup__form-container_active');

        console.log(viewContainer)
        const viewImage = viewContainer.querySelector('.popup__view-image');
        viewImage.src = link;

        const viewName = viewContainer.querySelector('.popup__view-name');
        viewName.textContent = name;

        viewContainer.classList.add('popup__view-container_active');
        popupElement.classList.add('popup_opened');
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


btnProfileEdit.addEventListener('click', openForm);
formElement.addEventListener('submit', submitForm);
btnCardAdd.addEventListener('click', openForm);
btnPopupCloseView.addEventListener('click', closePopup);
btnPopupCloseForm.addEventListener('click', closePopup);

window.addEventListener('load', function () {
    initialCards.forEach((item) => {
        addCard(item.name, item.link);
    });
});

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if(evt.key === "Escape") {
        closePopup()
    }
};
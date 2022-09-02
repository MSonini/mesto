let btnClose = document.querySelector('.container__close-button');
let form = document.querySelector('.container__form');
let btnAdd = document.querySelector('.profile__add-button');
let btnEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

function closeEditProfileTab() {
    popup.classList.remove('popup_opened');
};

function submitProfileEdition(evt) {
    evt.preventDefault();

    let name = document.querySelector('.profile__name');
    let about = document.querySelector('.profile__about');
    let name_form = document.querySelector('.container__input_type_name');
    let about_form = document.querySelector('.container__input_type_about');

    name.textContent = name_form.value;
    about.textContent = about_form.value;

    popup.classList.remove('popup_opened');
};

function openEditProfileTab() {
    let name = document.querySelector('.profile__name');
    let about = document.querySelector('.profile__about');
    let name_form = document.querySelector('.container__input_type_name');
    let about_form = document.querySelector('.container__input_type_about');

    name_form.value = name.textContent.trim();
    about_form.value = about.textContent.trim();

    popup.classList.toggle('popup_opened');
};

btnEdit.addEventListener('click', openEditProfileTab);
form.addEventListener('submit', submitProfileEdition);
btnClose.addEventListener('click', closeEditProfileTab);
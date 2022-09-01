let btnClose = document.querySelector('.profile-form__button_type_close');
let form = document.querySelector('.profile-form__container');
let btnAdd = document.querySelector('.profile__button_type_add');
let btnEdit = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');

function closeEditProfileTab() {
    popup.classList.remove('popup_opened');
};

function submitProfileEdition(evt) {
    evt.preventDefault();

    let name = document.querySelector('.profile__name');
    let about = document.querySelector('.profile__about');
    let name_form = document.querySelector('.profile-form__name');
    let about_form = document.querySelector('.profile-form__about');

    name.textContent = name_form.value;
    about.textContent = about_form.value;

    popup.classList.remove('popup_opened');
};

function openEditProfileTab() {
    let name = document.querySelector('.profile__name');
    let about = document.querySelector('.profile__about');
    let name_form = document.querySelector('.profile-form__name');
    let about_form = document.querySelector('.profile-form__about');

    name_form.value = name.textContent.trim();
    about_form.value = about.textContent.trim();

    popup.classList.toggle('popup_opened');
};

btnEdit.addEventListener('click', openEditProfileTab);
form.addEventListener('submit', submitProfileEdition);
btnClose.addEventListener('click', closeEditProfileTab);
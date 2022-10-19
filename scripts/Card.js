export class Card {
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
    }

    _getTemplateElement() {
        return document.querySelector(this._templateSelector)
                        .content.querySelector('.card').cloneNode(true);
    }

    _setEventListeners() {
        const btnDelete = this._element.querySelector('.card__delete-button');
        btnDelete.addEventListener('click', () => {
            this._element.remove();
        });
    
        const btnLike = this._element.querySelector('.card__like-button');
        btnLike.addEventListener('click', () => {
            btnLike.classList.toggle('card__like-button_active');
        });
    }

    getElement() {
        this._element = this._getTemplateElement();

        const cardImage = this._element.querySelector('.card__image');
        cardImage.src = this._link;
        cardImage.alt = this._name;
    
        this._element.querySelector('.card__title').textContent = this._name;
    
        this._setEventListeners()
    
        return this._element
    }
}
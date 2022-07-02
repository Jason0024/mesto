export default class Card {
    //Переедаем данные карточки и cardSelector
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;

        this._cardSelector = cardSelector;
    }

    //Получаем разметку
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element-grid__item')
        .cloneNode(true);

        this._element = cardElement;
    }

    //Устанавливаем метод слушателей событий
    _setEventListeners() {
        this._element.querySelector('.element-grid__pic').addEventListener('click', () => {
            this._handleCardClic();
        });
    
        this._element.querySelector('.element-grid__like').addEventListener('click', () => {
            this._handleCardLike();
        });
        
        this._element.querySelector('.element-grid__delete').addEventListener('click', () => {
            this._handleCardDelete();
        });

    }

    //Модальное окно для просмотра карточки
    _handleCardClic() {
        const _popupModal = document.querySelector('.popup_type_modal');
        const _modalSrc = document.querySelector('.popup__pic');
        const _modalTitle = document.querySelector('.popup__caption');

        openPopup(_popupModal);
        _modalTitle.textContent = this._name;
        _modalSrc.alt = this._name;
        _modalSrc.src = this._link;
    }

    //Лайк карточки
    _handleCardLike() {
        this._element.querySelector('.element-grid__like').classList.toggle('element-grid__like_active');   
    }

    //Удаление карточки
    _handleCardDelete() {
        this._element.remove();
    }

      generateCard() {
        this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.element-grid__pic').src = this._link;
        this._element.querySelector('.element-grid__pic').alt = this._name;
        this._element.querySelector('.element-grid__title').textContent = this._name;
    
        return this._element;
      }
}
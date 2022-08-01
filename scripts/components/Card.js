export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  //Получаем разметку
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element-grid__item')
      .cloneNode(true);

    return cardElement;
  }

  //Лайк карточки
  _handleCardLike() {
    this._likeButton.classList.toggle('element-grid__like_active');
  }

  //Удаление карточки
  _handleCardDelete() {
    this._element.remove();
    this._element = null;
  }

  // Метод слушателя открытия попапа просмотра изображения
  _handleOpenPopup() {
    this._handleCardClick(this._link, this._name);
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup();
    });

    this._likeButton.addEventListener('click', () => {
      this._handleCardLike();
    });

    //this._element.querySelector('.element-grid__delete').addEventListener('click', () => {
    //  this._handleCardDelete();
    //});

  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.element-grid__pic');
    this._likeButton = this._element.querySelector('.element-grid__like');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element-grid__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

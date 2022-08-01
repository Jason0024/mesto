export default class Card {
  constructor({ data, cardSelector, userId, handleCardClick, handleDeleteIconClick, api }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._api = api;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._likes = data.likes;
  }

  //Получаем разметку
  _getTemplate() {
    this._card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element-grid__item')
      .cloneNode(true);

      return this._card;
  }

   // Устанавливаем слушатели на карточку
   _setEventListeners() {
    // открытие попапа просмотра изображения кликом по изображению
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
    // слушатель кнопки удаления карточки
    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteIconClick(this._card, this._cardId);
    })
    // слушатель кнопки лайк
    this._likeBtn.addEventListener('click', () => {
      this._handleLikeCard();
    })
  }

   // Генерируем готовую карточку
   generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element-grid__pic');
    this._likeBtn = this._element.querySelector('.element-grid__like');
    this._likesNumber = this._element.querySelector('.element-grid__likes-number');
    this._deleteBtn = this._element.querySelector('.element-grid__delete');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element-grid__title').textContent = this._name;
    this._hasDeleteBtn();
    this._isCardLiked();
    this._likesNumber.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }

  // Проверка, стоит ли лайк на карточке
  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeBtn.classList.add('element-grid__like_active');
    }
  }

  // поставить/удалить лайк, изменение количества лайков
  _handleLikeCard() {
    if (this._likeBtn.classList.contains('element-grid__like_active')) {
      this._api.deleteLike(this._cardId)
         .then((res) => {
          this._likeBtn.classList.remove('element-grid__like_active');
          this._likesNumber.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      this._api.setLike(this._cardId)
        .then((res) => {
          this._likeBtn.classList.add('element-grid__like_active');
          this._likesNumber.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  // проверяем владельца карточки и убираем кнопку Delete
  _hasDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteBtn.remove();
    }
  }
}

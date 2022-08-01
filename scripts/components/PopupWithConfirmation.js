import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleDeleteCard }) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._form = this._popup.querySelector('.popup__form');
  }

  // Добавляем информацию о конкретной карточке в момент открытия попапа
  open(card, cardId) {
    this._card = card;
    this._cardId = cardId;
    super.open();
  }

  // удаление карточки по нажатию на submit
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleDeleteCard(this._card, this._cardId);
    })
  }
}

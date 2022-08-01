// Находим попап редактирования профиля
export const popupEditProfile = document.querySelector('.popup_type_profile');
// Находим кнопку для открытия попапа редактирования профиля
export const profileEditBtn = document.querySelector('.profile__edit');
// Находим форму попапа редактирования профиля
export const formEditProfile = popupEditProfile.querySelector('.popup__form');
// Находим инпуты формы попапа редактирования профиля
export const nameInput = formEditProfile.querySelector('#name');
export const jobInput = formEditProfile.querySelector('#job');
// Находим попап добавления карточки
export const popupAddNewCard = document.querySelector('.popup_type_photo');
// Находим кнопку для открытия попапа добавления новой карточки
export const popupAddNewCardOpenBtn = document.querySelector('.add-button');
// Находим форму попапа добавления новой карточки
export const formAddNewCard = popupAddNewCard.querySelector('.popup__form');
// Попап редактирования аватара пользователя
export const popupEditAvatar = document.querySelector('.popup_type_avatar');
// Форма редактирования аватара пользователя
export const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
// Кнопка редактирования аватара пользователя
export const buttonEditAvatar = document.querySelector('.profile__avatar-btn');
// аватар пользователя
export const avatar = document.querySelector('.profile__avatar');

// Конфиг валидации
export const config = {
  //formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};



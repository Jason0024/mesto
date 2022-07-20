export const cardAddButton = document.querySelector('.add-button');
export const profileEditButton = document.querySelector('.profile__edit');
export const photosContainer = document.querySelector('.element-grid');

// Фото
export const formPhoto = document.querySelector('.popup__form_photo-type');
export const inputList = Array.from(formPhoto.querySelectorAll('.popup__input'));
export const buttonElement = formPhoto.querySelector('.popup__submit');
export const photoTitleInput = document.querySelector('.popup__input_type_title');
export const photoLinkInput = document.querySelector('.popup__input_type_src');
export const formProfile = document.querySelector('.popup__form_profile-type');

export const popupPhotoCard = document.querySelector('.popup_type_photo');
export const formAddNewCard = popupPhotoCard.querySelector('.popup__form');
export const closePhotoButton = popupPhotoCard.querySelector('.popup__close');

export const popupProfile = document.querySelector('.popup_type_profile');
export const formEditProfile = popupProfile.querySelector('.popup__form');
export const nameInput = formEditProfile.querySelector('#name');
export const jobInput = formEditProfile.querySelector('#job');

export const closeProfileButton = popupProfile.querySelector('.popup__close');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const popupModal = document.querySelector('.popup_type_modal');
export const modalClose = popupModal.querySelector('.popup__close');
export const modalSrc = popupModal.querySelector('.popup__pic');
export const modalTitle = popupModal.querySelector('.popup__caption');

// находим контейнер для карточек
export const cardsContainer = document.querySelector('.elements');

// Конфиг валидации
export const config = {
  //formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const initialCards = [
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

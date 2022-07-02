//Импорт модулей
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { initialCards } from './initialsCards.js'

// Кнопки
const cardAddButton  = document.querySelector('.add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const profileEditButton = document.querySelector('.profile__edit');

// Шаблон для фото
const photosContainer = document.querySelector('.element-grid');
const photoTemplate = document.querySelector('#element-grid-template');

// Попапы
const popupProfile = document.querySelector('.popup_type_profile');
const popupPhotoCard = document.querySelector('.popup_type_photo');

// Профиль
const formProfile = document.querySelector('.popup__form_profile-type');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Фото
const formPhoto = document.querySelector('.popup__form_photo-type');
const inputList = Array.from(formPhoto.querySelectorAll('.popup__input'));
const buttonElement = formPhoto.querySelector('.popup__submit');

const photoTitleInput = document.querySelector('.popup__input_type_title');
const photoLinkInput = document.querySelector('.popup__input_type_src');

const popupModal = document.querySelector('.popup_type_modal');
const image = popupModal.querySelector('.popup__pic');
const modalTitle = popupModal.querySelector('.popup__caption');


initialCards.forEach((item) => {
  const card = new Card(item, '#element-grid-template');

	const cardElement = card.generateCard();

	photosContainer.append(cardElement);
});

// Обработчик «отправки» формы карточки
function handlePhotoFormSubmit (evt) {
    evt.preventDefault();

    const data = {};
    data.name = photoTitleInput.value;
    data.link = photoLinkInput.value;

    const card = new Card(data, '#element-grid-template');
	  const cardElement = card.generateCard();

    photosContainer.prepend(cardElement);

    // Очищаем поля
    formPhoto.reset();

    // Делаем кнопку неактивной
    validation.toggleButtonState(inputList, buttonElement);

    // Закрываем попап
    closePopup(popupPhotoCard);
}

//Попап Профиля
function openPopupProfile() {
  openPopup(popupProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;


  validation.checkInputValidity(formProfile, nameInput);
  validation.checkInputValidity(formProfile, jobInput);
 };

//Обработчик формы профиля
 function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupProfile);
};

//Попап Фото
function openPopupPhoto() {
  openPopup(popupPhotoCard);
};

// Открытие попапа
function openPopup(popup) {
  popup.addEventListener("mousedown", overlayHandler);
  document.addEventListener("keydown", keyHandler);
  popup.classList.add("popup_open");
 };

//Закрытие попапов
popupCloseButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

function closePopup(popup) {
  popup.removeEventListener("mousedown", overlayHandler);
  document.removeEventListener("keydown", keyHandler);
  popup.classList.remove("popup_open");
};


function closeOpenedPopup() {
  const openedPopup = document.querySelector(".popup_open");
  closePopup(openedPopup);
};


function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closeOpenedPopup();
  }
}

function overlayHandler(evt) {
  if (evt.target === evt.currentTarget) {
    closeOpenedPopup(evt.currentTarget);
  }
}

export const config = {
  //formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const validation = new FormValidator(config, '.popup__form');
validation.enableValidation('.popup__form');

//События
cardAddButton.addEventListener('click',openPopupPhoto);
profileEditButton.addEventListener('click', openPopupProfile);

formProfile.addEventListener('submit', handleProfileFormSubmit);
formPhoto.addEventListener('submit', handlePhotoFormSubmit);


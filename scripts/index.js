//Импорт модулей
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { initialCards } from './initialsCards.js'

// Кнопки
const cardAddButton  = document.querySelector('.add-button');
const profileEditButton = document.querySelector('.profile__edit');

// Шаблон для фото
const photosContainer = document.querySelector('.element-grid');
const photoTemplate = document.querySelector('#element-grid-template');

// Попапы
const popupProfile = document.querySelector('.popup_type_profile');
const popupPhotoCard = document.querySelector('.popup_type_photo');
const closeProfileButton = popupProfile.querySelector('.popup__close');
const closePhotoButton = popupPhotoCard.querySelector('.popup__close');

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

export const popupModal = document.querySelector('.popup_type_modal');
const modalClose = popupModal.querySelector('.popup__close');
export const modalSrc = popupModal.querySelector('.popup__pic');
export const modalTitle = popupModal.querySelector('.popup__caption');

// Конфиг валидации
const config = {
  //formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Открытие попапа
export function openPopup(popupName) {  
  // добавляем обработчики закрытия по Escape и клику на overlay
  popupName.addEventListener("mousedown", overlayHandler);
  document.addEventListener("keydown", keyHandler);

  popupName.classList.add("popup_open");
 };
//Закрытие попапа
 function closePopup(popupName) {
   // добавляем обработчики закрытия по Escape и клику на overlay
  popupName.removeEventListener("mousedown", overlayHandler);
  document.removeEventListener("keydown", keyHandler);

  popupName.classList.remove("popup_open");
};

function closeOpenedPopup() {
  const openedPopup = document.querySelector(".popup_open");
  closePopup(openedPopup);
};
//Закрытие попапа по кнопке ESC
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closeOpenedPopup();
  }
}
//Закрытие попапа по Overlay
function overlayHandler(evt) {
  if (evt.target === evt.currentTarget) {
    closeOpenedPopup(evt.currentTarget);
  }
}

// Создаем экземпляр карточки
function createCard(item) {
  const card = new Card(item, '#element-grid-template');
  return card.generateCard();
}

// Обработчик формы для добавления фото
function handlePhotoFormSubmit (evt) {
  evt.preventDefault();

  const data = {};
  data.name = photoTitleInput.value;
  data.link = photoLinkInput.value;

	const newCard = createCard(data);
  photosContainer.prepend(newCard);

  // Очищаем поля
  formPhoto.reset();

  // Делаем кнопку неактивной
  validatePhoto.enableValidation();

  closePopup(popupPhotoCard);
}

// Подгружаем первые карточки
initialCards.forEach((item) => {
	const cardElement = createCard(item);
	photosContainer.append(cardElement);
});

// Обработчик «отправки» формы
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  // Получите значение полей jobInput и nameInput из свойства value
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value; 

  // Закрываем попап
  closePopup(popupProfile);
}

//Попап Профиля
function openPopupProfile() {
  openPopup(popupProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  validateProfile.enableValidation();
 };



const validateProfile = new FormValidator(config, formProfile);
const validatePhoto = new FormValidator(config, formPhoto);
validateProfile.enableValidation();
validatePhoto.enableValidation();

//События

profileEditButton.addEventListener('click', openPopupProfile);
cardAddButton.addEventListener('click', () => { openPopup(popupPhotoCard); });
closeProfileButton.addEventListener('click', () => { closePopup(popupProfile) });
closePhotoButton.addEventListener('click', () => { closePopup(popupPhotoCard) });
modalClose.addEventListener('click', () => { closePopup(popupModal) });

formProfile.addEventListener('submit', handleProfileFormSubmit);
formPhoto.addEventListener('submit', handlePhotoFormSubmit);


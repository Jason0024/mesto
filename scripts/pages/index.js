import './index.css';
//Импорт модулей
import { nameInput, jobInput, config, initialCards, cardAddButton, profileEditButton,
         cardsContainer, formEditProfile, formAddNewCard, buttonEditAvatar, formEditAvatar, avatar } from '../utils/constants.js'
import Section from "../components/Section.js";
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";


/* Функции */
// Заносим данные в форму попапа редактирования профиля
function fillInEditProfileFormInputs({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
};

/* Попап просмотра изображения */
const viewImagePopup = new PopupWithImage('.popup_type_modal');
viewImagePopup.setEventListeners();

// Функционал создания новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: (name, link) => {
      viewImagePopup.open(name, link);
    }}, '.element-grid-template');
  const cardElement = card.generateCard();
  return cardElement;
};

/* Профиль юзера */
// создание экземпляра класса, отвечающего за отображение информации о пользователе
const userInfo = new UserInfo({
  username: '.profile__name',
  job: '.profile__job'
});

// Создание попапа с формой редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (dataForm) => {
    userInfo.setUserInfo(dataForm);
    popupEditProfile.close();
  }
});
popupEditProfile.setEventListeners();

const editAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (data) => {
    avatar.src = data.link;
    editAvatarPopup.close();
  }
});
editAvatarPopup.setEventListeners();
// Обработчик кнопки Edit аватара пользователя
buttonEditAvatar.addEventListener('click', () => {
  formEditAvatarValidator.toggleButtonState();
  editAvatarPopup.open();
});

// Обработчик кнопки Edit попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillInEditProfileFormInputs({
    username: info.username,
    job: info.job
  });
  popupEditProfile.open();
});

/* Карточки с изображениями */
// создание попапа с формой добавления новой карточки
const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_photo',
  handleFormSubmit: (formData) => {
    cardsList.addItem(createCard(formData));
    addCardPopup.close();
  }
});
// добавляем слушатели этому попапу:
addCardPopup.setEventListeners();

// обработчик открытия попапа
cardAddButton.addEventListener('click', () => {
  formAddNewCardValidator.toggleButtonState();
  addCardPopup.open();
})
// отрисовка карточек на странице из массива
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  },
}, cardsContainer);
cardsList.renderItems();

/* Попап удаления карточки */
const deleteCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_delete-card',
  handleFormSubmit: (event) => {
    console.log(event.target);
  }
});
deleteCardPopup.setEventListeners();
const deleteBtn = document.querySelector('.element-grid__delete');
deleteBtn.addEventListener('click', () => {
  deleteCardPopup.open();
});

/* Валидация форм */
// Валидация формы редактирования аватара пользователя
const formEditAvatarValidator = new FormValidator(config, formEditAvatar);
formEditAvatarValidator.enableValidation();
// валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();
// валидация формы добавления новой карточки
const formAddNewCardValidator = new FormValidator(config, formAddNewCard);
formAddNewCardValidator.enableValidation();

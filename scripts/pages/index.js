import './index.css';
//Импорт модулей
import { profileEditBtn, formEditProfile, config, formAddNewCard, popupAddNewCardOpenBtn,
  nameInput, jobInput, buttonEditAvatar, formEditAvatar, avatar } from '../utils/constants.js'
import Section from "../components/Section.js";
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";


/* ---------- API ----------- */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: '0ed17c22-f397-419f-ac16-14e0c634d00d',
    'Content-Type': 'application/json'
  }
});

let userId;

// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

/* -------------- Профиль юзера --------------- */
// Создание экземпляра класса, отвечающего за отображение информации о пользователе
const userInfo = new UserInfo({
  username: '.profile__name',
  job: '.profile__job',
  avatar: '.profile__avatar',
  api
});

// Создание попапа с формой редактирования профиля
const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (dataForm) => {
    editProfilePopup.loading(true);
    api.editUserInfo(dataForm)
      .then((dataForm) => {
        userInfo.setUserInfo(dataForm);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editProfilePopup.loading(false);
      });
  }
});
editProfilePopup.setEventListeners();

// Заносим данные в форму попапа редактирования профиля
function fillInEditProfileFormInputs({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

// Создание попапа редактирования аватара пользователя
const editAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: ({avatar}) => {
    editAvatarPopup.loading(true);
    api.editAvatar({avatar})
      .then(({avatar}) => {
        userInfo.setUserAvatar({avatar: avatar})
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
  }, api
});
editAvatarPopup.setEventListeners();
// Обработчик кнопки Edit аватара пользователя
buttonEditAvatar.addEventListener('click', () => {
  formEditAvatarValidator.toggleButtonState();
  formEditAvatarValidator.resetValidation();
  editAvatarPopup.open();
});
// Обработчик кнопки Edit попапа редактирования профиля
profileEditBtn.addEventListener('click', () => {
  formEditProfileValidator.resetValidation();
  const info = userInfo.getUserInfo();
  fillInEditProfileFormInputs({
    username: info.username,
    job: info.job
  });
  editProfilePopup.open();
});

/* ----------- Карточки с изображениями ----------- */

// Функционал создания новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: '.element-grid-template',
    userId: userId,
    handleCardClick: (name, link) => {
      viewImagePopup.open(name, link);
    },
    handleDeleteIconClick: (card, cardId) => {
      deleteCardPopup.open(card, cardId);
    },
    api: api
  });
  const cardElement = card.generateCard();
  return cardElement;
};
// Создание экземпляра класса Section
const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements');

// Создание попапа с формой добавления новой карточки
const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_photo',
  handleFormSubmit: (formData) => {
    addCardPopup.loading(true);
    api.addCard(formData)
      .then((formData) => {
        cardsList.addItem(createCard(formData));
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        addCardPopup.loading(false);
      });
  }
});
// добавляем слушатели этому попапу:
addCardPopup.setEventListeners();
// обработчик открытия попапа
popupAddNewCardOpenBtn.addEventListener('click', () => {
  formAddNewCardValidator.toggleButtonState();
  formAddNewCardValidator.resetValidation();
  addCardPopup.open();
});

/* Попап удаления карточки */
const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-card',
  handleDeleteCard: (card, cardId) => {
    api.deleteCard(cardId)
      .then(() => {
        card.remove();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
});
deleteCardPopup.setEventListeners();

/* Попап просмотра изображения */
const viewImagePopup = new PopupWithImage('.popup_type_modal');
viewImagePopup.setEventListeners();


/* Валидация форм */
// Валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();
// Валидация формы добавления новой карточки
const formAddNewCardValidator = new FormValidator(config, formAddNewCard);
formAddNewCardValidator.enableValidation();
// Валидация формы редактирования аватара пользователя
const formEditAvatarValidator = new FormValidator(config, formEditAvatar);
formEditAvatarValidator.enableValidation();

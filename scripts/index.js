// Кнопки
const addButton  = document.querySelector('.add-button');
const closeButton = document.querySelectorAll('.popup__close');
const editButton = document.querySelector('.profile__edit');
const deleteButton = document.querySelector('.element-grid__delete');

// Шаблон для фото
const photoContainer = document.querySelector('.element-grid');
const photoTemplate = document.querySelector('#element-grid-template');

// Попапы
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPhoto = document.querySelector('.popup_type_photo');

// Профиль
const formProfile = document.querySelector('.popup__form_profile-type');
const nameInput = document.querySelector('.popup__input_name_type');
const jobInput = document.querySelector('.popup__input_job_type');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Фото
const formPhoto = document.querySelector('.popup__form_photo-type');
const photoTitleInput = document.querySelector('.popup__input_title_type');
const photoLinkInput = document.querySelector('.popup__input_src_type');

const elementTemplate = document.querySelector('.element-grid-template').content;

const initialCards = [
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

// Инициализируем карточки
function addPhoto(name, link) {
  function handleDeletePhoto(e) {
      e.target.closest('.element-grid__item').remove();
  }

  function handleLike(e) {
    e.target.classList.toggle('element-grid__like_active');
  }

  const newPhoto = photoTemplate.content.querySelector('.element-grid__item').cloneNode(true);
  const photoSrc = newPhoto.querySelector('.element-grid__pic');
  const photoTitle = newPhoto.querySelector('.element-grid__title');
  const deleteButton = newPhoto.querySelector('.element-grid__delete');
  const likeButton = newPhoto.querySelector('.element-grid__like');

  photoTitle.textContent = name;
  photoSrc.alt = name;
  photoSrc.src = link;

  function handleModal() {

    const popupModal = document.querySelector('.popup_type_modal');
    const modalSrc = popupModal.querySelector('.popup__pic');
    const modalTitle = popupModal.querySelector('.popup__caption');

    openPopup(popupModal);
    modalTitle.textContent = name;
    modalSrc.alt = name;
    modalSrc.src = link;

  }

  deleteButton.addEventListener('click', handleDeletePhoto);
  likeButton.addEventListener('click', handleLike);
  photoSrc.addEventListener('click', handleModal);

  return newPhoto;
}

initialCards.forEach(function(item) {
  const newCard = addPhoto(item['name'], item['link']);
  photoContainer.append(newCard);
});

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    // Форма добавления фото
    if (photoTitleInput.value && photoLinkInput.value) {
      photoContainer.prepend(addPhoto(photoTitleInput.value, photoLinkInput.value));
      // Очищаем поля
      photoTitleInput.value = '';
      photoLinkInput.value = '';
    }

    // Закрываем попап
    popupClose();
}

// Открытие попапа
function openPopup(event) {
  event.classList.add("popup_open")
 };

//Попап Профиля
function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
 };

//Обработчик формы
 function formSubmitHandlerProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

//Попап Фото
function openPopupPhoto() {
  openPopup(popupPhoto);
};

//Закрытие попапов
closeButton.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
function closePopup(popup) {
  popup.classList.remove("popup_open")
};






//События
addButton.addEventListener('click',openPopupPhoto);
editButton.addEventListener('click', openPopupProfile);

formProfile.addEventListener('submit', formSubmitHandlerProfile);
formPhoto.addEventListener('submit', formSubmitHandler);

// Кнопки
const addCardButton  = document.querySelector('.add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const editProfileButton = document.querySelector('.profile__edit');

// Шаблон для фото
const photosContainer = document.querySelector('.element-grid');
const photoTemplate = document.querySelector('#element-grid-template');

// Попапы
const popup = document.querySelector('.popup');
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
const photoTitleInput = document.querySelector('.popup__input_type_title');
const photoLinkInput = document.querySelector('.popup__input_type_src');

const elementTemplate = document.querySelector('.element-grid-template').content;


// Инициализируем карточки
function createCardElement(name, link) {
  function handleDeletePhoto(e) {
      e.target.closest('.element-grid__item').remove();
  }

  function handleLike(e) {
    e.target.classList.toggle('element-grid__like_active');
  }

  const newCard = photoTemplate.content.querySelector('.element-grid__item').cloneNode(true);
  const photo = newCard.querySelector('.element-grid__pic');
  const photoTitle = newCard.querySelector('.element-grid__title');
  const deleteButton = newCard.querySelector('.element-grid__delete');
  const likeButton = newCard.querySelector('.element-grid__like');

  photoTitle.textContent = name;
  photo.alt = name;
  photo.src = link;

  function openImage() {

    const popupModal = document.querySelector('.popup_type_modal');
    const image = popupModal.querySelector('.popup__pic');
    const modalTitle = popupModal.querySelector('.popup__caption');

    openPopup(popupModal);
    modalTitle.textContent = name;
    image.alt = name;
    image.src = link;

  }

  deleteButton.addEventListener('click', handleDeletePhoto);
  likeButton.addEventListener('click', handleLike);
  photo.addEventListener('click', openImage);

  return newCard;
}

initialCards.forEach(function(item) {
  const newCard = createCardElement(item.name, item.link);
  photosContainer.append(newCard);
});

// Обработчик «отправки» формы карточки
function handleFormProfile (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Форма добавления фото
    if (photoTitleInput.value && photoLinkInput.value) {
      photosContainer.prepend(createCardElement(photoTitleInput.value, photoLinkInput.value));
      // Очищаем поля
      photoTitleInput.value = '';
      photoLinkInput.value = '';
    }

    // Закрываем попап
    closePopup(popupPhotoCard);
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

//Обработчик формы профиля
 function handleSubmitProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

//Попап Фото
function openPopupPhoto() {
  openPopup(popupPhotoCard);
};

//Закрытие попапов
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
function closePopup(popup) {
  popup.classList.remove("popup_open")
};






//События
addCardButton.addEventListener('click',openPopupPhoto);
editProfileButton.addEventListener('click', openPopupProfile);

formProfile.addEventListener('submit', handleSubmitProfile);
formPhoto.addEventListener('submit', handleFormProfile);

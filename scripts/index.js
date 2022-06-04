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
function createPhotoElement(name, link) {
  function handleDeletePhoto(e) {
      e.target.closest('.element-grid__item').remove();
  }

  function handleLike(e) {
    e.target.classList.toggle('element-grid__like_active');
  }

  const newPhotoElement = photoTemplate.content.querySelector('.element-grid__item').cloneNode(true);
  const photoSrcElement = newPhotoElement.querySelector('.element-grid__pic');
  const photoTitle = newPhotoElement.querySelector('.element-grid__title');
  const deleteButton = newPhotoElement.querySelector('.element-grid__delete');
  const likeButton = newPhotoElement.querySelector('.element-grid__like');

  photoTitle.textContent = name;
  photoSrcElement.alt = name;
  photoSrcElement.src = link;

  function openImage() {

    const popupModal = document.querySelector('.popup_type_modal');
    const modalSrcElement = popupModal.querySelector('.popup__pic');
    const modalTitle = popupModal.querySelector('.popup__caption');

    openPopup(popupModal);
    modalTitle.textContent = name;
    modalSrcElement.alt = name;
    modalSrcElement.src = link;

  }

  deleteButton.addEventListener('click', handleDeletePhoto);
  likeButton.addEventListener('click', handleLike);
  photoSrcElement.addEventListener('click', openImage);

  return newPhotoElement;
}

initialCards.forEach(function(item) {
  const newCard = createPhotoElement(item.name, item.link);
  photosContainer.append(newCard);
});

// Обработчик «отправки» формы карточки
function submitFormHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Форма добавления фото
    if (photoTitleInput.value && photoLinkInput.value) {
      photosContainer.prepend(createPhotoElement(photoTitleInput.value, photoLinkInput.value));
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
 function submitFormHandlerProfile(event) {
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

formProfile.addEventListener('submit', submitFormHandlerProfile);
formPhoto.addEventListener('submit', submitFormHandler);

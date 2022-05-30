// Кнопки
const addButton  = document.querySelector('.add-button');
const closeButton = document.querySelectorAll('.popup__close');
const editButton = document.querySelector('.profile__edit');

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


// Инициализируем карточки
function addPhoto(name, link) {

  const newPhoto = photoTemplate.content.querySelector('.element-grid__item').cloneNode(true);
  const photoSrc = newPhoto.querySelector('.element-grid__pic');
  const photoTitle = newPhoto.querySelector('.element-grid__title');

  photoTitle.textContent = name;
  photoSrc.src = link;

  return newPhoto;

}

initialCards.forEach(item => {
  const newCard = addPhoto(item['name'], item['link']);
  photoContainer.append(newCard);
});




//Like
let likes = document.querySelectorAll('.element-grid__like');

for (let i = 0 ; i < likes.length; i++) {
  likes[i].addEventListener('click', function(){
     likes[i].classList.toggle('element-grid__like_active');
   });
}

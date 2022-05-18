// Находим кнопки «Закрыть», «Редактировать» и попап
let closeButton = document.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');

// Открытие-Закрытие попапа
function popupToggle(evt) {
  popup.classList.toggle('popup_opened');
}
// Устанавливаем функцию на кнопки
closeButton.addEventListener('click', popupToggle);
editButton.addEventListener('click', popupToggle);

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

// Обработчик формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получаем значение полей jobInput и nameInput
    let name = nameInput.value;
    let job = jobInput.value;

    // Элементы, куда должны быть вставлены значения
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');

    // Вставляем новые значения
    profileName.textContent = name;
    profileJob.textContent = job;

    // Закрываем попап
    popupToggle();

}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', formSubmitHandler);

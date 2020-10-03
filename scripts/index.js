const buttonOpenPopup = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelector('.close-image');
const buttonSubmitPopup = document.querySelector('.form-edit__submit-button');
const popup = document.querySelector('.overlay');

let formElement = document.querySelector('.form-edit');
let profileName = document.querySelector('.profile__name');
let profileAboutYourself = document.querySelector('.profile__about-yourself');
let nameInput = document.querySelector('.form-edit__input-name');
let jobInput = document.querySelector('.form-edit__input-about-yourself');

nameInput.value = profileName.textContent;
jobInput.value = profileAboutYourself.textContent;

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileAboutYourself.textContent = jobInput.value;
}

// Обработчик открытия и закрытия модального окна (попапа).
const popupToggle = () => {
  popup.classList.toggle('overlay_is-opened');
}

buttonOpenPopup.addEventListener('click', popupToggle);
buttonClosePopup.addEventListener('click', popupToggle);
buttonSubmitPopup.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);

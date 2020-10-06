const buttonOpenPopup = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelector('.form-edit__close-button');
const popup = document.querySelector('.overlay');

let formElement = document.querySelector('.form-edit');
let profileName = document.querySelector('.profile__name');
let profileAboutYourself = document.querySelector('.profile__about-yourself');
let nameInput = document.querySelector('.form-edit__input_name');
let jobInput = document.querySelector('.form-edit__input_about-yourself');

// Обработчик открытия и закрытия модального окна (попапа).
const popupToggle = () => {
  popup.classList.toggle('overlay_is-opened');
  textTransmittingFields ();
};

// Обработчик переноса полей из профиля пользователя в попап
function textTransmittingFields () {
  if (popup.classList.contains('overlay_is-opened') === true) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAboutYourself.textContent;
  }
}

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileAboutYourself.textContent = jobInput.value;
  popupToggle();
}

textTransmittingFields ();
formElement.addEventListener('submit', formSubmitHandler);
buttonOpenPopup.addEventListener('click', popupToggle);
buttonClosePopup.addEventListener('click', popupToggle);

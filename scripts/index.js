import { Card } from './Card.js';
import { FormValidator} from './FormValidator.js';

const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_edit');
const popupAddCard = document.querySelector('.popup_add');
const popupImageCard = document.querySelector('.popup_image');
const popupSubmitButton = popup.querySelector('.popup__submit-button');
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonClosePopupEdit = popupEditProfile.querySelector('.popup__close-button_edit');
const buttonClosePopupAdd = popupAddCard.querySelector('.popup__close-button_add');
const buttonCreateCardAdd = popupAddCard.querySelector('.popup__submit-button_add');

const formElementEdit = popup.querySelector('.popup__form_edit');
const formPopupAdd = document.querySelector('.popup__form_add');
const profileName = document.querySelector('.profile__name');
const profileAboutYourself = document.querySelector('.profile__about-yourself');
const nameInput = popupEditProfile.querySelector('.popup__input_name');
const jobInput = popupEditProfile.querySelector('.popup__input_about-yourself');

// Обработчик открытия и закрытия модального окна (попапа).
const handlePopupToggle = (popup) => {
  popup.classList.toggle('popup_is-opened');
  const activePopup = document.querySelector('.popup_is-opened');
  if (activePopup) {
    document.addEventListener('keydown', onClickEsc);
  }
};

// Обработчик редактирования профиля
const handleEditProfile = () => {
  handlePopupToggle(popupEditProfile);
  if (popup.classList.contains('popup_is-opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAboutYourself.textContent;
    if (formElementEdit.checkValidity()) {
      const inputs = Array.from(formElementEdit.querySelectorAll('.popup__input'));
      inputs.forEach(input => {
        input.classList.remove('popup__input_type_error');
        document.querySelector(`#${input.id}-error`).textContent = '';

      });
      popupSubmitButton.disabled = false;
      popupSubmitButton.classList.remove('popup__submit-button_inactive');
    }
  }
};

// Обработчик «отправки» формы
function handleFormSubmit (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileAboutYourself.textContent = jobInput.value;
  handlePopupToggle(popupEditProfile);
}

formElementEdit.addEventListener('submit', handleFormSubmit);
buttonOpenPopupEdit.addEventListener('click', handleEditProfile);
buttonClosePopupEdit.addEventListener('click', handleEditProfile);

// Инициализация 6-ти карточек mesto по умолчанию
const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];

const cards = document.querySelector('.cards');
const titleInput = popupAddCard.querySelector('.popup__input_title');
const linkInput = popupAddCard.querySelector('.popup__input_link');

// Обработчик вывода на страницу карточек mesto и нажатий на кнопки remove и like
const getItem = (data) => {
  const listCard = new Card(data, '.template');
  listCard.render(cards);
};

// Визаулизация карточек mesto
const visualizeCard = () => {
  initialCards.forEach(getItem);
};

// Обработчик добавления новой карточки mesto
const handleFormCreateNewCard = () => {
  buttonCreateCardAdd.addEventListener('click', () => {
    getItem({
      name: titleInput.value,
      link: linkInput.value
    });
    titleInput.value = '';
    linkInput.value = '';
    handlePopupToggle(popupAddCard);
  });
};

// Обработчик открытия и закрытия модального окна (попапа) добавления новой карточки mesto.
const handleOpenPopupAdd = () => {
  handlePopupToggle(popupAddCard);
  if (!formPopupAdd.checkValidity()) {
    buttonCreateCardAdd.disabled = true;
    buttonCreateCardAdd.classList.add('popup__submit-button_inactive');
  }
};

visualizeCard();
handleFormCreateNewCard();

buttonOpenPopupAdd.addEventListener('click', handleOpenPopupAdd);
buttonClosePopupAdd.addEventListener('click', handleOpenPopupAdd);

// Обработчик закрытия модального окна (попапа) просмотра картинки
const buttonClosePopupImage = document.querySelector('.popup__close-button_image');

const handleCloseCardImage = () => {
  handlePopupToggle(popupImageCard);
};

buttonClosePopupImage.addEventListener('click', handleCloseCardImage);

// Обработчики закрытия попапа по клику на свободном поле и по нажатию клавиши Esc
const closePopup = (activePopup) => {
  if (activePopup) {
    document.removeEventListener('keydown', onClickEsc);
    activePopup.classList.remove('popup_is-opened');
  }
};

const onClickPopupBackground = (event) => {
  const activePopup = document.querySelector('.popup_is-opened');
  if(event.target === event.currentTarget) {
    closePopup(activePopup);
  }
};

const onClickEsc = (event) => {
  const activePopup = document.querySelector('.popup_is-opened');
    if(event.keyCode === 27) {
      closePopup(activePopup);
    }
};

popupEditProfile.addEventListener('click', onClickPopupBackground);
popupAddCard.addEventListener('click', onClickPopupBackground);
popupImageCard.addEventListener('click', onClickPopupBackground);

const formSelector = '.popup__form';
const forms = document.querySelectorAll(formSelector);

// Обработчик перебора и валидации форм
forms.forEach(formElement => {
  const formValidator = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
  }, formElement);

formValidator.enableValidation();
});

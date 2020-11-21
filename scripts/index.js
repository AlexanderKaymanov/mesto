import { Card } from './Card.js';
import { FormValidator} from './FormValidator.js';

const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_edit');
const popupAddCard = document.querySelector('.popup_add');
const popupImageCard = document.querySelector('.popup_image');
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonClosePopupEdit = popupEditProfile.querySelector('.popup__close-button_edit');
const buttonClosePopupAdd = popupAddCard.querySelector('.popup__close-button_add');

const formElementEdit = popup.querySelector('.popup__form_edit');
const formPopupAdd = document.querySelector('.popup__form_add');
const profileName = document.querySelector('.profile__name');
const profileAboutYourself = document.querySelector('.profile__about-yourself');
const nameInput = popupEditProfile.querySelector('.popup__input_name');
const jobInput = popupEditProfile.querySelector('.popup__input_about-yourself');
const cards = document.querySelector('.cards');
const titleInput = popupAddCard.querySelector('.popup__input_title');
const linkInput = popupAddCard.querySelector('.popup__input_link');
const buttonClosePopupImage = document.querySelector('.popup__close-button_image');
const formSelector = '.popup__form';
const forms = document.querySelectorAll(formSelector);
const KEY_CODE_ESC = 27;

// Инициализация 6-ти карточек mesto по умолчанию
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

// ---------------------------------------------------------
// Обработчик открытия модального окна (попапа).
const handleOpenPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', onClickEsc);
};

// Обработчик закрытия модального окна (попапа).
const handleClosePopup = (activePopup) => {
    document.removeEventListener('keydown', onClickEsc);
    activePopup.classList.remove('popup_is-opened');
}

// Обработчик редактирования профиля
const handleEditProfile = () => {
  handleOpenPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutYourself.textContent;
};

// Обработчик «отправки» формы
function handleFormSubmit(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileAboutYourself.textContent = jobInput.value;
  handleClosePopup(popupEditProfile);
}

// Обработчики закрытия попапа по клику на свободном поле
const onClickPopupBackground = (event) => {
  const activePopup = document.querySelector('.popup_is-opened');
  if(event.target === event.currentTarget) {
    handleClosePopup(activePopup);
  }
};

// Обработчики закрытия попапа по нажатию клавиши Esc
const onClickEsc = (event) => {
  const activePopup = document.querySelector('.popup_is-opened');
  if(event.keyCode === KEY_CODE_ESC) {
    handleClosePopup(activePopup);
  }
};

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

// ------------------------------------------------------------------
formElementEdit.addEventListener('submit', handleFormSubmit);
buttonOpenPopupEdit.addEventListener('click', handleEditProfile);

buttonClosePopupEdit.addEventListener('click', () => handleClosePopup(popupEditProfile));
buttonClosePopupAdd.addEventListener('click', () => handleClosePopup(popupAddCard));
buttonClosePopupImage.addEventListener('click', () => handleClosePopup(popupImageCard));

popupEditProfile.addEventListener('click', onClickPopupBackground);
popupAddCard.addEventListener('click', onClickPopupBackground);
popupImageCard.addEventListener('click', onClickPopupBackground);
// ------------------------------------------------------------------

// Обработчик вывода на страницу карточек mesto
const getItems = (data) => {
  const listCard = new Card(data, '.template');
  const cardElement = listCard.render();
  const templateImage = cardElement.querySelector('.card__image');
  const cardText = cardElement.querySelector('.card__text');

  // Обработчик открытия модального окна (попапа) просмотра картинки
  const handleOpenCardImage = () => {
    const popupImageCaption = popupImageCard.querySelector('.popup__image-caption');
    const popupImage = popupImageCard.querySelector('.popup__image');
    popupImageCaption.textContent = cardText.textContent;
    popupImage.src = templateImage.src;
    handleOpenPopup(popupImageCard);
  };

  templateImage.addEventListener('click', handleOpenCardImage);
  return cardElement;
};

// Визаулизация карточек mesto по умолчанию
const visualizeCards = () => {
  const items = initialCards.map(getItems);
  cards.append(...items);
};

// Обработчик добавления новой карточки mesto
function handleFormCreateNewCard(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const item = getItems({
    name: titleInput.value,
    link: linkInput.value
  });
  cards.prepend(item);
  formPopupAdd.reset();
  handleClosePopup(popupAddCard);
};

visualizeCards();

formPopupAdd.addEventListener('submit', handleFormCreateNewCard);
buttonOpenPopupAdd.addEventListener('click', () => handleOpenPopup(popupAddCard));

// Инициализация 6-ти карточек mesto по умолчанию
export const initialCards = [
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

export const popup = document.querySelector('.popup');
export const popupEditProfile = document.querySelector('.popup_edit');
export const popupAddCard = document.querySelector('.popup_add');
export const popupImageCard = document.querySelector('.popup_image');
export const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
export const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
export const buttonClosePopupEdit = popupEditProfile.querySelector('.popup__close-button_edit');

export const formElementEdit = popup.querySelector('.popup__form_edit');
export const formPopupAdd = document.querySelector('.popup__form_add');
export const profileName = document.querySelector('.profile__name');
export const profileAboutYourself = document.querySelector('.profile__about-yourself');
export const nameInput = popupEditProfile.querySelector('.popup__input_name');
export const jobInput = popupEditProfile.querySelector('.popup__input_about-yourself');
export const cards = document.querySelector('.cards');
export const titleInput = popupAddCard.querySelector('.popup__input_title');
export const linkInput = popupAddCard.querySelector('.popup__input_link');

export const formSelector = '.popup__form';
export const forms = document.querySelectorAll(formSelector);
export const KEY_CODE_ESC = 27;

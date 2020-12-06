import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
// import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  popupEditProfile,
  popupAddCard,
  popupImageCard,
  buttonOpenPopupEdit,
  buttonOpenPopupAdd,
  buttonClosePopupEdit,
  profileName,
  profileAboutYourself,
  cards,
  nameInput,
  jobInput,
  forms,
  initialCards
} from '../utils/constants.js';
  import '../pages/index.css';

// ---------------------------------------------------------

const userInfo = new UserInfo(profileName, profileAboutYourself);
const cardImage = new PopupWithImage(popupImageCard);

// «Отправка» формы профиля
const popupProfile = new PopupWithForm({
  handleFormSubmit: (inputsData) => {
    profileName.textContent = inputsData.name;
    profileAboutYourself.textContent = inputsData.about;
    userInfo.setUserInfo(inputsData);
    popupProfile.close();
  }
}, popupEditProfile);

// Открытие профиля для редактирования
const handleEditProfile = () => {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.about;
  popupProfile.open();
};

// Открытие формы добавления новой карточки
const handleOpenAddCardImage = () => {
  formCreateNewCard.open();
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

// Вывод карточек mesto на страницу по умолчанию
const listCard = new Section ({
  data: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        cardImage.open(item);
      }
    }, '.template');
    const cardElement = card.render();
    listCard.addItem(cardElement);
  }
}, cards);

listCard.renderItems();

// Добавление новой карточки mesto
const formCreateNewCard = new PopupWithForm({
  handleFormSubmit: (inputsData) => {
    const card = new Card({
      data: inputsData,
      handleCardClick: () => {
        cardImage.open(inputsData);
      }
    }, '.template');
    const cardElement = card.render();
    listCard.addCard(cardElement);
    formCreateNewCard.close();
  }
}, popupAddCard);

// ------------------------------------------------------------------
buttonOpenPopupEdit.addEventListener('click', handleEditProfile);
buttonClosePopupEdit.addEventListener('click', popupProfile.close());
buttonOpenPopupAdd.addEventListener('click', handleOpenAddCardImage);

popupProfile.setEventListeners();
cardImage.setEventListeners();
formCreateNewCard.setEventListeners();
// ------------------------------------------------------------------

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithFormSubmit } from '../components/PopupWithFormSubmit.js';
import { PopupWithFormAvatar } from '../components/PopupWithFormAvatar.js';
import { Api } from '../components/Api.js';
import {
  popupEditProfile,
  popupAddCard,
  popupImageCard,
  popupAvatar,
  buttonOpenPopupEdit,
  buttonOpenPopupAdd,
  buttonOpenUpdateAvatar,
  buttonOpenDeletingCard,
  buttonClosePopupEdit,
  profileName,
  profileAboutYourself,
  profileAvatar,
  cards,
  nameInput,
  jobInput,
  forms
} from '../utils/constants.js';
  import '../pages/index.css';

// ---------------------------------------------------------

const userInfo = new UserInfo(profileName, profileAboutYourself);
const cardImage = new PopupWithImage(popupImageCard);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
  userUrl: 'https://mesto.nomoreparties.co/v1/cohort-18/users/me',
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-18/cards',
  likesCardUrl: 'https://mesto.nomoreparties.co/v1/cohort-18/cards/likes',
  avatarUrl: 'https://mesto.nomoreparties.co/v1/cohort-18/users/me/avatar',

  headers: {
    authorization: '6f2d29a5-a14d-4e90-b9f8-9b74e64ac498',
    'Content-Type': 'application/json'
  }
});

const initialCards = api.getInitialCards();
const infoUser = api.getInfoUser();

// ------------------------------------------------------
// Загрузка информации о пользователе
infoUser.then((data) => {
  profileName.textContent = data.name;
  profileAboutYourself.textContent = data.about;
  profileAvatar.src = data.avatar;
})

// -----------------------------------------------------
// Отправка формы профиля
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

// ------------------------------------------------------
// Отправка формы обновления аватара
const popupUpdateAvatar = new PopupWithForm({
  handleFormSubmit: (inputsData) => {
    profileAvatar.src = inputsData.avatar;
    userInfo.setUserInfo(item);
    popupUpdateAvatar.close();
  }
}, popupAvatar);

// Открытие формы обновления аватара
const handleOpenUpdateAvatar = () => {
  console.log('Открыть форму avatar');
  popupUpdateAvatar.open();
};
// -------------------------------------------------------
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

// --------------------------------------------------------
// Вывод карточек mesto на страницу по умолчанию
initialCards.then((data) => {
  const listCard = new Section ({
    data: data.map((item) => ({name: item.name, link: item.link, likes: item.likes})),
    renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        // console.log(item);
        cardImage.open(item);
      }
    }, '.template');
    const cardElement = card.render();
    listCard.addItem(cardElement);
  }
}, cards);
listCard.renderItems();
}).catch((err) => {
  console.log(err); // выведем ошибку в консоль
});

// -------------------------------------------------------
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

// Открытие формы добавления новой карточки
const handleOpenAddCardImage = () => {
  formCreateNewCard.open();
};

// ------------------------------------------------------------------
buttonOpenPopupEdit.addEventListener('click', handleEditProfile);
buttonClosePopupEdit.addEventListener('click', popupProfile.close());
buttonOpenPopupAdd.addEventListener('click', handleOpenAddCardImage);
buttonOpenUpdateAvatar.addEventListener('click', handleOpenUpdateAvatar);

popupProfile.setEventListeners();
cardImage.setEventListeners();
formCreateNewCard.setEventListeners();
popupUpdateAvatar.setEventListeners();
// ------------------------------------------------------------------

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
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
  titleInput,
  linkInput,
  forms,
  initialCards
} from '../utils/constants.js';
import '../pages/index.css';

// ---------------------------------------------------------

const popupImage = new Popup(popupImageCard);
const popupEdit = new Popup(popupEditProfile);
const popupAdd = new Popup(popupAddCard);
const userInfo = new UserInfo(profileName, profileAboutYourself);

// «Отправка» формы профиля
const popupProfile = new PopupWithForm({
  handleFormSubmit: (event) => {
    event.preventDefault();
    userInfo.setUserInfo();
    popupProfile.close();
  }
}, popupEditProfile);

popupProfile.setEventListeners();

// Открытие профиля для редактирования
const handleEditProfile = () => {
  popupProfile.open();
  userInfo.getUserInfo();
};

// Открытие формы добавления новой карточки
const handleOpenAddCardImage = () => {
  formCreateNewCard.open();
};

// Закрытие попапа по клику на свободном поле
const onClickPopupBackground = (event) => {
  if(event.target === event.currentTarget) {
    if(popupImageCard === event.currentTarget) {
      popupImage.close();
    } else if(popupAddCard === event.currentTarget) {
      popupAdd.close();
    } else if(popupEditProfile === event.currentTarget) {
      popupEdit.close();
    }
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

// Вывод карточек mesto на страницу по умолчанию
const listCard = new Section ({
  data: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        const cardImage = new PopupWithImage(popupImageCard);
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
  handleFormSubmit: (event) => {
    event.preventDefault();
    const objecCard = {
      name: titleInput.value,
      link: linkInput.value
    };

    const itemCard = new Section ({
      data: objecCard,
      renderer: (item) => {
        const card = new Card({
          data: item,
          handleCardClick: () => {}
        }, '.template');
        const cardElement = card.render();
        itemCard.addCard(cardElement);
      }
    }, cards);

    itemCard.renderItem();
    formCreateNewCard.close();
  }
}, popupAddCard);

// ------------------------------------------------------------------
buttonOpenPopupEdit.addEventListener('click', handleEditProfile);
buttonClosePopupEdit.addEventListener('click', popupProfile.close());
buttonOpenPopupAdd.addEventListener('click', handleOpenAddCardImage);

popupEditProfile.addEventListener('click', onClickPopupBackground);
popupAddCard.addEventListener('click', onClickPopupBackground);
popupImageCard.addEventListener('click', onClickPopupBackground);

popupImage.setEventListeners();
formCreateNewCard.setEventListeners();
// ------------------------------------------------------------------

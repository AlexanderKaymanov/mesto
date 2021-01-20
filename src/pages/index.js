import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithFormSubmit } from '../components/PopupWithFormSubmit.js';
// import { PopupWithFormAvatar } from '../components/PopupWithFormAvatar.js';
import { Api } from '../components/Api.js';
import {
  popupEditProfile,
  popupAddCard,
  popupImageCard,
  popupAvatar,
  popupDeletingCard,
  buttonOpenPopupEdit,
  buttonOpenPopupAdd,
  buttonOpenUpdateAvatar,
  buttonClosePopupEdit,
  profileName,
  profileAboutYourself,
  profileAvatar,
  cards,
  content,
  spinner,
  nameInput,
  jobInput,
  forms
} from '../utils/constants.js';
// import '../pages/index.css';

// ---------------------------------------------------------
const userInfo = new UserInfo(profileName, profileAboutYourself);
const cardImage = new PopupWithImage(popupImageCard);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  userUrl: 'https://mesto.nomoreparties.co/v1/cohort-19/users/me',
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-19/cards',
  likesCardUrl: 'https://mesto.nomoreparties.co/v1/cohort-19/cards/likes',
  avatarUrl: 'https://mesto.nomoreparties.co/v1/cohort-19/users/me/avatar',

  headers: {
    authorization: '762e704b-e6ae-4693-8360-375cfc8f77e1',
    'Content-Type': 'application/json'
  }
});

renderLoading(true);
// ------------------------------------------------------
// Открытие страницы
api.getAllNeededData().then(argument => {
  const [ dataInfoUserPromise, dataInitialCardsPromise ] = argument;
  // Загрузка информации о пользователе
  profileName.textContent = dataInfoUserPromise.name;
  profileAboutYourself.textContent = dataInfoUserPromise.about;
  profileAvatar.src = dataInfoUserPromise.avatar;

  // Вывод на страницу карточек mesto по умолчанию
  const userId = dataInfoUserPromise._id;
  // const ownerId = dataInitialCardsPromise.map((item) => item.owner._id);
  // const сardId = dataInitialCardsPromise.map((item) => item._id);
  // console.log(`ID пользователя - ${userId}`);
  // console.log(`ID владельца карточки - ${ownerId}`);
  // console.log(`ID карточки - ${сardId}`);
  // console.log(dataInitialCardsPromise);
  const listCard = new Section ({
    data: dataInitialCardsPromise.map((item) => ({
      name: item.name,
      link: item.link,
      likes: item.likes,
      owner: item.owner._id,
      _id: item._id
    })),
    renderer: (item) => {
      const card = new Card({
        data: item,
        handleCardClick: () => {
          cardImage.open(item);
        },
        handleDeleteClick: () => {
          const cardId = item._id;
          popupRemoveCard.setSubmitAction(() => {
            const cardElement = card.renderCard();
            console.log(cardElement);
            const cardDelete = api.deleteCard(cardId);
            cardDelete.then(() => card.deleteCard(cardElement))
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              popupRemoveCard.close();
              console.log('Удаление карточки завершено');
            });
          })
          popupRemoveCard.open();
        },
        handleLikeClick: () => {
          const cardId = item._id;
          console.log(cardId);

        }
      }, '.template');
      const cardElement = card.renderCard();
      listCard.addItem(cardElement);
    }
  }, cards);
  listCard.renderItems(userId);
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
})
.finally(() => {
  renderLoading(false);
});
// -----------------------------------------------------
// Отправка формы профиля
const popupProfile = new PopupWithForm({
  handleFormSubmit: (inputsData) => {
    const updateUser = api.updateInfoUser(inputsData);
    updateUser.then((inputsData) => {
    profileName.textContent = inputsData.name;
    profileAboutYourself.textContent = inputsData.about;
    popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
    console.log('Обновление данных пользователя завершено');
    });
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
    const updateAvatarUser = api.updateAvatar(inputsData);
    updateAvatarUser.then((inputsData) => {
    profileAvatar.src = inputsData.avatar;
    // console.log(inputsData);
    popupUpdateAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log('Обновление аватара пользователя завершено');
    });
  }
}, popupAvatar);

// Открытие формы обновления аватара
const handleOpenUpdateAvatar = () => {
  console.log('Открыть форму avatar');
  popupUpdateAvatar.open();
};
// -------------------------------------------------------
// Добавление новой карточки mesto
const formCreateNewCard = new PopupWithForm({
  handleFormSubmit: (inputsData) => {
    console.log(inputsData);
    const cardAdd = api.addCard(inputsData);
    cardAdd.then((item) => {
      console.log(item);
      const userId = item.owner._id;
      console.log(userId);
      const addCardRender = new Section ({
        data: item,
        renderer: (item) => {
          console.log(item);
          const card = new Card({
            data: item
          }, '.template');
          const cardElement = card.renderCard();
          console.log(cardElement);
          addCardRender.addCard(cardElement);
        }
      }, cards);
      console.log(addCardRender);
      addCardRender.renderItem(item);
      formCreateNewCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log('Добавление карточки завершено');
      // location.reload();
    });
  }
}, popupAddCard);
const handleOpenAddCardImage = () => {
  formCreateNewCard.open();
};
// -------------------------------------------------------
// Модальноe окно (попуп) для подтверждения удаления карточки
const popupRemoveCard = new PopupWithFormSubmit({ handleSubmitCallBack: () => {} }, popupDeletingCard);
// const popupRemoveCard = new PopupWithFormSubmit({
  // handleSubmitCallBack: () => {
    // popupRemoveCard.close();
    // console.log('Повторное удаление карточки')
  // }
// }, popupDeletingCard);
// -------------------------------------------------------
// Постановка лайка на карточку

// -------------------------------------------------------
// Удаление лайка с карточки

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
  console.log('Валидация submit');
  formValidator.enableValidation();
  // if (formElement === document.querySelector('.popup__form_deleting-image')) {
  //   console.log('Здесь необходимо активировать submit')
  // }
});
// formValidator.enableValidation();
// -------------------------------------------------------
// Функция спиннера
function renderLoading(isLoading) {
  if (isLoading) {
    spinner.classList.add('spinner_visible');
    content.classList.add('content_hidden');
  } else {
    content.classList.remove('content_hidden');
    spinner.classList.remove('spinner_visible');
  }
}

// ------------------------------------------------------------------
buttonOpenPopupEdit.addEventListener('click', handleEditProfile);
buttonClosePopupEdit.addEventListener('click', popupProfile.close());
buttonOpenUpdateAvatar.addEventListener('click', handleOpenUpdateAvatar);
buttonOpenPopupAdd.addEventListener('click', handleOpenAddCardImage);

popupProfile.setEventListeners();
cardImage.setEventListeners();
popupUpdateAvatar.setEventListeners();
formCreateNewCard.setEventListeners();
popupRemoveCard.setEventListeners();

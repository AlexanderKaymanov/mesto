import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithFormSubmit } from '../components/PopupWithFormSubmit.js';
import { Api } from '../components/Api.js';
import {
  popupEditProfile,
  popupAddCard,
  popupImageCard,
  popupAvatar,
  popupDeletingCard,
  buttonInactiveEditProfile,
  buttonInactiveAddCard,
  buttonInactiveAvatar,
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

// ---------------------------------------------------------
const userInfo = new UserInfo(profileName, profileAboutYourself, profileAvatar);
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
            const cardElement = card.render();
            const cardDelete = api.deleteCard(cardId);
            cardDelete.then(() => card.deleteCard(cardElement))
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
              popupRemoveCard.close();
            });
          })
          popupRemoveCard.open();
        },
        handleLikeClick: () => {
          const cardId = item._id;
          const cardLikesItem = item.likes;
          const likesId = cardLikesItem.map((item) => (item._id));
          const cardElement = card.render();
          // Постановка лайка на карточку
          const putCardLike = () => {
            api.likeCard(cardId)
            .then((res) => {
              const cardLike = res.likes.length;
              card.updateLikes(cardLike);
              card.addLike(cardElement);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
              location.reload();
            })
          };
          // Удаление лайка с карточки
          const deleteCardLike = () => {
            api.deleteLikeCard(cardId)
            .then((res) => {
              const cardLike = res.likes.length;
              card.updateLikes(cardLike);
              card.deleteLike(cardElement);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
              location.reload();
            })
          };
          // Условия при, которых ставится или удаляется лайк
          let userCheck = true;
          if (likesId.length === 0) {
            putCardLike();
            userCheck = false;
          } else {
            likesId.forEach((item) => {
              if (userId === item) {
                deleteCardLike();
                userCheck = false;
              }
            });
            if (userCheck) {
              putCardLike();
            }
          }
        }
      }, '.template');
      const cardElement = card.render();
      listCard.addItem(cardElement);
    }
  }, cards);
  listCard.renderItems(userId);
})
.catch((err) => {
  console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
})
.finally(() => {
  renderLoading(false);
});
// -----------------------------------------------------
// Функция уведомления о процессе загрузки
function notifyDownloading(isDownloading) {
  if (isDownloading) {
    buttonInactiveEditProfile.classList.remove('popup__submit-button_inactive');
    buttonInactiveAddCard.classList.remove('popup__submit-button_inactive');
    buttonInactiveAvatar.classList.remove('popup__submit-button_inactive');
    buttonInactiveEditProfile.textContent = 'Сохранение...';
    buttonInactiveAddCard.textContent = 'Сохранение...';
    buttonInactiveAvatar.textContent = 'Сохранение...';
  } else {
    buttonInactiveEditProfile.textContent = 'Сохранить';
    buttonInactiveAddCard.textContent = 'Создать';
    buttonInactiveAvatar.textContent = 'Сохранить';
    buttonInactiveEditProfile.classList.add('popup__submit-button_inactive');
    buttonInactiveAddCard.classList.add('popup__submit-button_inactive');
    buttonInactiveAvatar.classList.add('popup__submit-button_inactive');
  }
}

// -----------------------------------------------------
// Отправка формы профиля
const popupProfile = new PopupWithForm({
  handleFormSubmit: (inputsData) => {
    notifyDownloading(true);
    const updateUser = api.updateInfoUser(inputsData);
    updateUser.then((inputsData) => {
    profileName.textContent = inputsData.name;
    profileAboutYourself.textContent = inputsData.about;
    popupProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      notifyDownloading(false);
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
    notifyDownloading(true);
    const updateAvatarUser = api.updateAvatar(inputsData);
    updateAvatarUser.then((inputsData) => {
    profileAvatar.src = inputsData.avatar;
    popupUpdateAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      notifyDownloading(false);
    });
  }
}, popupAvatar);

// Открытие формы обновления аватара
const handleOpenUpdateAvatar = () => {
  popupUpdateAvatar.open();
};
// -------------------------------------------------------
// Добавление новой карточки mesto
const formCreateNewCard = new PopupWithForm({
  handleFormSubmit: (inputsData) => {
    notifyDownloading(true);
    const cardAdd = api.addCard(inputsData);
    cardAdd.then((item) => {
      const addCardRender = new Section ({
        data: item,
        renderer: (item) => {
          const card = new Card({
            data: item
          }, '.template');
          const cardElement = card.render();
          addCardRender.addCard(cardElement);
        }
      }, cards);
      addCardRender.renderItem(item);
      formCreateNewCard.close();
      notifyDownloading(false);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
    });
  }
}, popupAddCard);
const handleOpenAddCardImage = () => {
  formCreateNewCard.open();
};
// -------------------------------------------------------
// Модальноe окно (попуп) для подтверждения удаления карточки
const popupRemoveCard = new PopupWithFormSubmit({ handleSubmitCallBack: () => {} }, popupDeletingCard);

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

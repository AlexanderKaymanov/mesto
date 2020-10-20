const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_edit');
const popupAddCard = document.querySelector('.popup_add');
const popupImageCard = document.querySelector('.popup_image');
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonClosePopupEdit = popupEditProfile.querySelector('.popup__close-button_edit');
const buttonClosePopupAdd = popupAddCard.querySelector('.popup__close-button_add');
const buttonCreatCardAdd = popupAddCard.querySelector('.popup__submit-button_add');

let formElementEdit = popup.querySelector('.popup__form_edit');
let formElementAdd = popup.querySelector('.popup__form_add');
let profileName = document.querySelector('.profile__name');
let profileAboutYourself = document.querySelector('.profile__about-yourself');
let nameInput = popupEditProfile.querySelector('.popup__input_name');
let jobInput = popupEditProfile.querySelector('.popup__input_about-yourself');

// Обработчик открытия и закрытия модального окна (попапа).
const popupToggle = (popup) => {
    popup.classList.toggle('popup_is-opened');
};

// Обработчик редактирования профиля
const handlerEditProfile = () => {
    popupToggle(popupEditProfile);
    if (popup.classList.contains('popup_is-opened') === true) {
      nameInput.value = profileName.textContent;
      jobInput.value = profileAboutYourself.textContent;
    }
};

// Обработчик «отправки» формы
function formSubmitHandler (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileAboutYourself.textContent = jobInput.value;
  popupToggle(popupEditProfile);
}

formElementEdit.addEventListener('submit', formSubmitHandler);
buttonOpenPopupEdit.addEventListener('click', handlerEditProfile);
buttonClosePopupEdit.addEventListener('click', handlerEditProfile);

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

const cards = document.querySelector('.cards');
const template = document.querySelector('.template');
const titleInput = popupAddCard.querySelector('.popup__input_title');
const linkInput = popupAddCard.querySelector('.popup__input_link');

// Визаулизация карточек mesto
const renderCard = () => {
  const items = initialCards.map(element => getItems(element));
  cards.append(...items);
};

// Удаление карточки mesto
const handlerRemove = (event) => {
  event.target.closest('.card').remove();
};

// Активация кнопки like на карточке mesto
const handlerLike = (event) => {
  event.target.classList.toggle('card__button_like-active');
};

const popupImage = document.querySelector('.popup_image');
const image = popupImage.querySelector('.popup__image');

// Обработчик вывода на страницу карточек mesto и нажатий на кнопки remove и like
const getItems = (data) => {
  const card = template.content.cloneNode(true);
  card.querySelector('.card__text').textContent = data.name;
  card.querySelector('.card__image').src = data.link;

  const removeButton = card.querySelector('.card__button_remove');
  const likeButton = card.querySelector('.card__button_like');

  removeButton.addEventListener('click', handlerRemove);
  likeButton.addEventListener('click', handlerLike);

  const templateImage = card.querySelector('.card__image');
  const popupNameImage = popupImageCard.querySelector('.popup__image-caption');

  // Обработчик открытия модального окна (попапа) просмотра картинки
  const handlerOpenCardImage = (data) => {
    return () => {
      image.alt = data.name;
      image.src = data.link;
      popupImageCard.querySelector('.popup__image-caption').textContent = data.name;
      popupToggle(popupImageCard);
    };
  };

  templateImage.addEventListener('click', handlerOpenCardImage(data));

  return card;
};

// Обработчик добавления новой карточки mesto
const formCardHandlerdHandler = (event) => {
  buttonCreatCardAdd.addEventListener('click', (event) => {
      event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
      const item = getItems({
      name: titleInput.value,
      link: linkInput.value
    });
    cards.prepend(item);
    titleInput.value = '';
    linkInput.value = '';
    popupToggle(popupAddCard);
  });
};

// Обработчик открытия и закрытия модального окна (попапа) добавления новой карточки mesto.
const hendlerOpenPopupAdd = () => {
  popupToggle(popupAddCard);
};

renderCard();
formCardHandlerdHandler();

buttonOpenPopupAdd.addEventListener('click', hendlerOpenPopupAdd);
buttonClosePopupAdd.addEventListener('click', hendlerOpenPopupAdd);

// Обработчик закрытия модального окна (попапа) просмотра картинки
const buttonClosePopupImage = document.querySelector('.popup__close-button_image'); // popup__close-button_image

const hendlerCloseCardImage = () => {
  popupToggle(popupImageCard);
};

buttonClosePopupImage.addEventListener('click', hendlerCloseCardImage);

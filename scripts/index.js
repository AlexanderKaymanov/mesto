const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_edit');
const popupAddCard = document.querySelector('.popup_add');
const popupImageCard = document.querySelector('.popup_image');
const popupNameImage = popupImageCard.querySelector('.popup__image-caption');
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonClosePopupEdit = popupEditProfile.querySelector('.popup__close-button_edit');
const buttonClosePopupAdd = popupAddCard.querySelector('.popup__close-button_add');
const buttonCreatCardAdd = popupAddCard.querySelector('.popup__submit-button_add');

const formElementEdit = popup.querySelector('.popup__form_edit');
const profileName = document.querySelector('.profile__name');
const profileAboutYourself = document.querySelector('.profile__about-yourself');
const nameInput = popupEditProfile.querySelector('.popup__input_name');
const jobInput = popupEditProfile.querySelector('.popup__input_about-yourself');

// Обработчик открытия и закрытия модального окна (попапа).
const handlePopupToggle = (popup) => {
  popup.classList.toggle('popup_is-opened');
};

// Обработчик редактирования профиля
const handleEditProfile = () => {
  handlePopupToggle(popupEditProfile);
  if (popup.classList.contains('popup_is-opened')) {
      nameInput.value = profileName.textContent;
      jobInput.value = profileAboutYourself.textContent;
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

// Удаление карточки mesto
const handleRemoveCard = (event) => {
  event.target.closest('.card').remove();
};

// Активация кнопки like на карточке mesto
const handleButtonLikeActive = (event) => {
  event.target.classList.toggle('card__button_like-active');
};

const popupImage = document.querySelector('.popup_image');
const image = popupImage.querySelector('.popup__image');

// Обработчик вывода на страницу карточек mesto и нажатий на кнопки remove и like
const getItem = (data) => {
  const card = template.content.cloneNode(true);
  const templateImage = card.querySelector('.card__image');

  card.querySelector('.card__text').textContent = data.name;
  templateImage.src = data.link;

  const removeButton = card.querySelector('.card__button_remove');
  const likeButton = card.querySelector('.card__button_like');

  removeButton.addEventListener('click', handleRemoveCard);
  likeButton.addEventListener('click', handleButtonLikeActive);

  // Обработчик открытия модального окна (попапа) просмотра картинки
  const handlerOpenCardImage = (data) => {
    return () => {
      image.alt = data.name;
      image.src = data.link;
      popupNameImage.textContent = data.name;
      handlePopupToggle(popupImageCard);
    };
  };

  templateImage.addEventListener('click', handlerOpenCardImage(data));

  return card;
};

// Визаулизация карточек mesto
const renderCard = () => {
  const items = initialCards.map(getItem);
  cards.append(...items);
};

// Обработчик добавления новой карточки mesto
const handleFormCreatNewCard = () => {
  buttonCreatCardAdd.addEventListener('click', (event) => {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const item = getItem({
      name: titleInput.value,
      link: linkInput.value
    });
    cards.prepend(item);
    titleInput.value = '';
    linkInput.value = '';
    handlePopupToggle(popupAddCard);
  });
};

// Обработчик открытия и закрытия модального окна (попапа) добавления новой карточки mesto.
const handleOpenPopupAdd = () => {
  handlePopupToggle(popupAddCard);
};

renderCard();
handleFormCreatNewCard();

buttonOpenPopupAdd.addEventListener('click', handleOpenPopupAdd);
buttonClosePopupAdd.addEventListener('click', handleOpenPopupAdd);

// Обработчик закрытия модального окна (попапа) просмотра картинки
const buttonClosePopupImage = document.querySelector('.popup__close-button_image'); // popup__close-button_image

const handleCloseCardImage = () => {
  handlePopupToggle(popupImageCard);
};

buttonClosePopupImage.addEventListener('click', handleCloseCardImage);

const buttonOpenPopup = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelector('.form-edit__close-button');
const popup = document.querySelector('.overlay');

let formElement = document.querySelector('.form-edit');
let profileName = document.querySelector('.profile__name');
let profileAboutYourself = document.querySelector('.profile__about-yourself');
let nameInput = document.querySelector('.form-edit__input_name');
let jobInput = document.querySelector('.form-edit__input_about-yourself');

// Обработчик открытия и закрытия модального окна (попапа).
const popupToggle = () => {
  popup.classList.toggle('overlay_is-opened');
  if (popup.classList.contains('overlay_is-opened') === true) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAboutYourself.textContent;
  }
};

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileAboutYourself.textContent = jobInput.value;
  popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);
buttonOpenPopup.addEventListener('click', popupToggle);
buttonClosePopup.addEventListener('click', popupToggle);

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

const renderCard = () => {
  const items = initialCards.map(element => getItems(element));
  cards.append(...items);
};

const handlerRemove = (evt) => {
  evt.target.closest('.card').remove();
};

const handlerLike = (evt) => {
  evt.target.classList.toggle('card__button_like-active');
};

const getItems = (data) => {
  const card = template.content.cloneNode(true);
  card.querySelector('.card__text').textContent = data.name;
  card.querySelector('.card__image').src = data.link;

  const removeButton = card.querySelector('.card__button_remove');
  const likeButton = card.querySelector('.card__button_like');

  removeButton.addEventListener('click', handlerRemove);
  likeButton.addEventListener('click', handlerLike);

  return card;
};

renderCard();

// console.log (cards);

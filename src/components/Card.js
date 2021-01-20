export class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._template = document.querySelector(templateSelector).content.querySelector('.card');
    this._content = this._template.cloneNode(true);
    // this._cardButtonRemove = this._template.querySelector('.card__button_remove');
  }

  remove(event) {
    console.log('Класс Card remove');
    event.target.closest('.card').remove();
  }

  _like(event) {
    event.target.classList.toggle('card__button_like-active');
  }

  deleteCard(element) {
    this._element = element;
    this._element.remove();
    console.log('Карточка удалена из разметки');
  }

  renderCard() {
    const cardImage  = this._content.querySelector('.card__image');
    const cardText = this._content.querySelector('.card__text');

    cardText.textContent = this._name;
    cardImage.src = this._link;
    this.setEventListeners();
    return this._content;
  }

  render() {
    const cardImage  = this._content.querySelector('.card__image');
    const cardText = this._content.querySelector('.card__text');
    const cardLikes = this._content.querySelector('.card__likes');

    cardText.textContent = this._name;
    cardImage.src = this._link;
    cardLikes.textContent = this._likes.length;
    this.setEventListeners();
    return this._content;
  }

  setEventListeners() {
    const buttonRemove = this._content.querySelector('.card__button_remove');
    const cardButtonLike = this._content.querySelector('.card__button_like');
    const cardImage  = this._content.querySelector('.card__image');

    buttonRemove.addEventListener('click', () => this._handleDeleteClick());
    cardButtonLike.addEventListener('click', (event) => this._like(event));
    cardImage.addEventListener('click', () => this._handleCardClick());
  }
}

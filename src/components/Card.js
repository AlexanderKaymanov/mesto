export class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._template = document.querySelector(templateSelector).content.querySelector('.card');
    this._content = this._template.cloneNode(true);
  }

  updateLikes(cardLike) {
    this.cardLikes = cardLike;
    return this.cardLikes;
  }

  addLike(element) {
    this._element = element;
    const cardLikes = this._element.querySelector('.card__likes');
    this._element.querySelector('.card__button_like').classList.add('card__button_like-active');
    cardLikes.textContent = this.cardLikes;
  }

  deleteLike(element) {
    this._element = element;
    const cardLikes = this._element.querySelector('.card__likes');
    this._element.querySelector('.card__button_like').classList.remove('card__button_like-active');
    cardLikes.textContent = this.cardLikes;
  }

  deleteCard(element) {
    this._element = element;
    this._element.remove();
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
    cardButtonLike.addEventListener('click', () => this._handleLikeClick());
    cardImage.addEventListener('click', () => this._handleCardClick());
  }
}

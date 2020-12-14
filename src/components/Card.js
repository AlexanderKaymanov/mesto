export class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._template = document.querySelector(templateSelector).content.querySelector('.card');
  }

  remove(event) {
    console.log('Класс Card');
    event.target.closest('.card').remove();
  }

  _like(event) {
    event.target.classList.toggle('card__button_like-active');
  }

  render() {
    this._content = this._template.cloneNode(true);
    const cardImage  = this._content.querySelector('.card__image');
    const cardText = this._content.querySelector('.card__text');
    const cardLikes = this._content.querySelector('.card__likes')

    cardText.textContent = this._name;
    cardImage.src = this._link;
    cardLikes.textContent = this._likes.length;
    this.setEventListeners();

    return this._content;
  }

  setEventListeners() {
    const cardButtonRemove = this._content.querySelector('.card__button_remove');
    const cardButtonLike = this._content.querySelector('.card__button_like');
    const cardImage  = this._content.querySelector('.card__image');

    cardButtonRemove.addEventListener('click', (event) => this.remove(event));
    cardButtonLike.addEventListener('click', (event) => this._like(event));
    cardImage.addEventListener('click', () => this._handleCardClick());
  }
}

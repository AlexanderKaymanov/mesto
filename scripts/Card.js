export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._template = document.querySelector(templateSelector).content.querySelector('.card');
  }

  _remove(event) {
    event.target.closest('.card').remove();
  }

  _like(event) {
    event.target.classList.toggle('card__button_like-active');
  }

  render() {
    this._content = this._template.cloneNode(true);
    const cardImage  = this._content.querySelector('.card__image');
    const cardText = this._content.querySelector('.card__text');

    cardText.textContent = this._name;
    cardImage.src = this._link;
    this._setEventListeners();

    return this._content;
  }

  _setEventListeners() {
    const cardButtonRemove = this._content.querySelector('.card__button_remove');
    const cardButtonLike = this._content.querySelector('.card__button_like')

    cardButtonRemove.addEventListener('click', (event) => this._remove(event));
    cardButtonLike.addEventListener('click', (event) => this._like(event));
  }
}

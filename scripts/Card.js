export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._template = document.querySelector(templateSelector).content;
  }

  _remove(event) {
    event.target.closest('.card').remove();
  }

  _like(event) {
    event.target.classList.toggle('card__button_like-active');
  }

  _handleOpenCardImage() {
    this._image = document.querySelector('.popup_image');
    this._image.querySelector('.popup__image-caption').textContent = this._name;
    this._image.querySelector('.popup__image').src = this._link;
    this._image.classList.toggle('popup_is-opened');
  }

  render(cards) {
    this._content = this._template.cloneNode(true);

    this._content.querySelector('.card__text').textContent = this._name;
    this._content.querySelector('.card__image').src = this._link;
    this._content.querySelector('.card__button_remove').addEventListener('click', this._remove.bind(this));
    this._content.querySelector('.card__button_like').addEventListener('click', this._like.bind(this));
    this._content.querySelector('.card__image').addEventListener('click', this._handleOpenCardImage.bind(this));

    cards.prepend(this._content);
  }
}

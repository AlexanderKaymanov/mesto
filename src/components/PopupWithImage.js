import { Popup } from '../components/Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupCardImage = this._popupElement.querySelector('.popup__image');
    this._captionImage = this._popupElement.querySelector('.popup__image-caption');
  }
  open(item) {
    this._popupCardImage.src = item.link;
    this._captionImage.textContent = item.name;
    super.open();
  }
}

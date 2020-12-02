import { Popup } from '../components/Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(item) {
    this._popupSelector.querySelector('.popup__image-caption').textContent = item.name;
    this._popupSelector.querySelector('.popup__image').src = item.link;
    super.open();
  }
}

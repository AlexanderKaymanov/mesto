import { KEY_CODE_ESC } from '../utils/constants.js'

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._element = popupSelector.querySelector('.popup__close-button');
  }

  open() {
    this._popupSelector.classList.add('popup_is-opened');
    document.addEventListener('keydown', (event) => this._handleEscClose(event));
  }

  close() {
    document.removeEventListener('keydown', (event) => this._handleEscClose(event));
    this._popupSelector.classList.remove('popup_is-opened');
  }

  _handleEscClose(event) {
    if(event.keyCode === KEY_CODE_ESC) {
      this.close();
    }
  }

  setEventListeners() {
    this._element.addEventListener('click', () => this.close());
  }
}

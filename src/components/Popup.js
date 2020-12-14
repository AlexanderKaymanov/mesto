import { KEY_CODE_ESC } from '../utils/constants.js'

export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._element = this._popupElement.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.remove('popup_is-opened');
  }

  _handleEscClose(event) {
    if(event.keyCode === KEY_CODE_ESC) {
      this.close();
    }
  }

  setEventListeners() {
    this._element.addEventListener('click', () => this.close());
    this._popupElement.addEventListener('click', (event) => {
      if(event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}

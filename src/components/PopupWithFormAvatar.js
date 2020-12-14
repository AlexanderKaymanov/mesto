import { Popup } from '../components/Popup.js';
export class PopupWithFormAvatar extends Popup {
  constructor({ data, handleFormSubmit }, popupElement) {
    super(popupElement);
    this._data = data.avatar;
    this._handleFormSubmit = handleFormSubmit;
    this._input = this._popupElement.querySelector('.popup__input_avatar');
    this._form = this._popupElement.querySelector('.popup__form');
  }

  _getInputValue() {
    this._inputValue = input.value
    return this._inputValue;
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._data = this._getInputValue();
      console.log(this._data);
      this._handleFormSubmit(this._data);
    });

    super.setEventListeners();
  }
}

import { Popup } from '../components/Popup.js';
export class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupElement) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    this._form = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);
    return this._inputValues;
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputsData = this._getInputValues();
      this._handleFormSubmit(inputsData);
    });

    super.setEventListeners();
  }
}

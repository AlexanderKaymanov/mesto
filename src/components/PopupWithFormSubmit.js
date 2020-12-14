import { Popup } from '../components/Popup.js';
export class PopupWithFormSubmit extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._form = this._popupElement.querySelector('.popup__form');
  }

  setSubmitAction(submitAction) {
    this._handleFormSubmit = submitAction;
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
      console.log('=> PopupWithFormSubmit.setEventListeners')
    });

    super.setEventListeners();
  }
}

import { Popup } from '../components/Popup.js';
export class PopupWithFormSubmit extends Popup {
  constructor({ handleSubmitCallBack }, popupElement) {
    super(popupElement);
    this._handleSubmitCallBack = handleSubmitCallBack;
    this._form = this._popupElement.querySelector('.popup__form');
  }

  setSubmitAction(submitAction) {
    console.log(submitAction);
    this._handleSubmitCallBack = submitAction;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      const setSubmit = this.setSubmitAction;
      this._handleSubmitCallBack(setSubmit);
    });

    super.setEventListeners();
  }
}

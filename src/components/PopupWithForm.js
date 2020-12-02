import { Popup } from '../components/Popup.js';
import {
  nameInput,
  jobInput,
  titleInput,
  linkInput,
  popupEditProfile,
  popupAddCard,
  formElementEdit,
  formPopupAdd,
} from '../utils/constants.js';

export class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._title = titleInput.value;
    this._link = linkInput.value;
    this._name = nameInput.value;
    this._job = jobInput.value;
    return this._name, this._job, this._title, this._link;
  }

  close() {
    if (this._popupSelector === popupEditProfile){
      formElementEdit.reset();
    }
    if (this._popupSelector === popupAddCard) {
      formPopupAdd.reset();
    }
    super.close();
  }

  setEventListeners() {
    if (this._popupSelector === popupEditProfile){
      formElementEdit.addEventListener('submit', (event) => this._handleFormSubmit(event));
    }
    if (this._popupSelector === popupAddCard) {
      formPopupAdd.addEventListener('submit', (event) => this._handleFormSubmit(event));
    }
    super.setEventListeners();
  }
}

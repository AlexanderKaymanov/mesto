import {
  nameInput,
  jobInput
} from '../utils/constants.js';

export class UserInfo {
  constructor(nameElement, jobElement) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
  }

  getUserInfo() {
    nameInput.value = this._nameElement.textContent;
    jobInput.value = this._jobElement.textContent;
  }

  setUserInfo() {
    this._nameElement.textContent = nameInput.value;
    this._jobElement.textContent = jobInput.value;
  }
}

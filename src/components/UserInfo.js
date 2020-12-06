export class UserInfo {
  constructor(userName, userAbout) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userName = document.querySelector('.profile__name');
    this._userAbout = document.querySelector('.profile__about-yourself');
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
  }
}

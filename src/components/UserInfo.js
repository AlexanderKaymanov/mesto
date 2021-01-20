export class UserInfo {
  constructor(userName, userAbout, userAvatar) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar
    this._userName = document.querySelector('.profile__name');
    this._userAbout = document.querySelector('.profile__about-yourself');
    this._userAvatar = document.querySelector('.profile__avatar');
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}

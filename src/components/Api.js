export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._userUrl = options.userUrl;
    this._cardsUrl = options.cardsUrl;
    this._likesCardUrl = options.likesCardUrl;
    this._avatarUrl = options.avatarUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._cardsUrl}`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  getInfoUser() {
    return fetch(`${this._userUrl}`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  updateInfoUser(data) {
    return fetch(`${this._userUrl}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
        })
    },)
    .then(this._checkResponse);
  }

  updateAvatar(data) {
    console.log(data);
    return fetch(`${this._avatarUrl}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
        })
    },)
    .then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._cardsUrl}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
        })
    },)
    .then(this._checkResponse);
  }

  deleteCard(сardId) {
    return fetch(`${this._cardsUrl}/${сardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  getCard(cardId) {
    return fetch(`${this._likesCardUrl}/${cardId}`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  likeCard(сardId) {
    return fetch(`${this._likesCardUrl}/${сardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  deleteLikeCard(сardId) {
    return fetch(`${this._likesCardUrl}/${сardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  getAllNeededData() {
    return Promise.all([this.getInfoUser(), this.getInitialCards()]);
  }
}

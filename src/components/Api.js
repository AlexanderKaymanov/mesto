export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._userUrl = options.userUrl;
    this._cardsUrl = options.cardsUrl;
    this._likesCardUrl = options.likesCardUrl;
    this._avatarUrl = options.avatarUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._cardsUrl}`, {
      method: 'GET',
      headers: this._headers
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInfoUser() {
    return fetch(`${this._userUrl}`, {
      method: 'GET',
      headers: this._headers,
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateInfoUser(nameUser, aboutUser) {
    return fetch(`${userUrl}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: nameUser,
        about: aboutUser
        })
    },)

    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateAvatar(avatarUser) {
    return fetch(`${this._avatarUrl}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUser,
        })
    },)

    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addCard(nameCard, linkCard) {
    return fetch(`${this._cardsUrl}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: nameCard,
        link: linkCard
        })
    },)

    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(сardId) {
    return fetch(`${this._cardsUrl}${сardId}`, {
      method: 'DELETE',
      headers: this._headers
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  likeCard(сardId) {
    return fetch(`${this._likesCardUrl}${сardId}`, {
      method: 'PUT',
      headers: this._headers
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteLikeCard(сardId) {
    return fetch(`${this._likesCardUrl}${сardId}`, {
      method: 'DELETE',
      headers: this._headers
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getAllNeededData() {
    return Promise.all([this.getInfoUser(), this.getInitialCards()]);
  }
}

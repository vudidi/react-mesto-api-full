class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getProfile(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  getCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  editProfile(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  updateAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }

  addCard(name, link, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  getLikes(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  likeCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  removeLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked, token) {
    if (isLiked) {
      return this.removeLike(id, token);
    } else {
      return this.likeCard(id, token);
    }
  }

  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: 'https://api.vudidi-mesto.nomoredomains.xyz',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;

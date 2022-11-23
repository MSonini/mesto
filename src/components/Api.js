export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetchData(resource, method, body = null) {
    return fetch(this._baseUrl + resource, {
      method: method.toUpperCase(),
      body: body ? JSON.stringify(body) : body,
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getProfileData() {
    return this._fetchData("/users/me", "get");
  }

  editProfileInfo(data) {
    return this._fetchData("/users/me", "patch", data);
  }

  editProfileAvatar(avatar) {
    return this._fetchData("/users/me/avatar", "patch", { avatar });
  }

  getCards() {
    return this._fetchData("/cards", "get");
  }

  addCard(data) {
    return this._fetchData("/cards", "post", data);
  }

  removeCard(cardId) {
    return this._fetchData(`/cards/${cardId}`, "delete");
  }

  setLike(cardId) {
    return this._fetchData(`/cards/${cardId}/likes`, "put");
  }

  removeLike(cardId) {
    return this._fetchData(`/cards/${cardId}/likes`, "delete");
  }
}

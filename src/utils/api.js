const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

class Api {
  constructor(data) {
    this._baseUrl = data;
  }

  _serverResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`))
  }

  getData() {
    return fetch(this._baseUrl)
    .then(res => this._serverResponse(res))
  }
}

const api = new Api(baseUrl);

export default api;
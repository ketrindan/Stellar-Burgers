const baseUrl = 'https://norma.nomoreparties.space/api';

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
    return fetch(`${this._baseUrl}/ingredients`)
    .then(res => this._serverResponse(res))
  }

  submitOrder(ids) {
    return fetch(`${this._baseUrl}/orders`, 
    { method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({'ingredients': ids})
    })
    .then((res) => this._serverResponse(res));
  }
}

const api = new Api(baseUrl);

export default api;
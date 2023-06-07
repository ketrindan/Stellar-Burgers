import { getCookie } from "./cookie";

const baseUrl = 'https://norma.nomoreparties.space/api';

class Api {
  constructor(data) {
    this._baseUrl = data;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : res.json()
    .then((err) => Promise.reject(err));
  }

  getData() {
    return fetch(`${this._baseUrl}/ingredients`)
    .then(res => this._checkResponse(res))
  }

  submitOrder(ids) {
    return fetch(`${this._baseUrl}/orders`, 
    { method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({'ingredients': ids})
    })
    .then((res) => this._checkResponse(res));
  }

  forgotPassword(email) {
    return fetch(`${this._baseUrl}/password-reset`, 
    { method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email})
    })
    .then((res) => this._checkResponse(res));
  }

  resetPassword(newPassword, code) {
    return fetch(`${this._baseUrl}/password-reset/reset`, 
    { method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: newPassword,
        token: code,
      })
    })
    .then((res) => this._checkResponse(res));
  }

  register( name, email, password) {
    return fetch(`${this._baseUrl}/auth/register`, 
    { method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      })
    })
    .then((res) => this._checkResponse(res));
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/auth/login`, 
    { method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then((res) => this._checkResponse(res));
  }

  refreshToken(refreshToken) {
    return fetch(`${this._baseUrl}/auth/token`, 
    { method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "token": refreshToken
      })
    })
    .then((res) => this._checkResponse(res));
  }

  logout(refreshToken) {
    return fetch(`${this._baseUrl}/auth/logout`, 
    { method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "token": refreshToken
      })
    })
    .then((res) => this._checkResponse(res));
  }

  getUser() {
    return fetch(`${this._baseUrl}/auth/user`, 
    { method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "authorization": 'Bearer ' + getCookie('token')
      }
    })
    .then((res) => this._checkResponse(res));
  }

  updateUser(name, email, password) {
    return fetch(`${this._baseUrl}/auth/user`, 
    { method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "authorization": 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password
      })
    })
    .then((res) => this._checkResponse(res));
  }
}

const api = new Api(baseUrl);

export default api;
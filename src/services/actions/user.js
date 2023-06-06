import api from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SECCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const setForgotPassword = () => ({
  type: FORGOT_PASSWORD_REQUEST
});

export const setForgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS
});

export const setForgotPasswordFailed = () => ({
  type: FORGOT_PASSWORD_FAILED
});

export const setResetPassword = () => ({
  type: RESET_PASSWORD_REQUEST
});

export const setResetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS
});

export const setResetPasswordFailed = () => ({
  type: RESET_PASSWORD_FAILED
});

export const setRegistration= () => ({
  type: REGISTRATION_REQUEST
});

export const setRegistrationSuccess = (data) => ({
  type: REGISTRATION_SUCCESS,
  payload: data,
});

export const setRegistrationFailed = () => ({
  type: REGISTRATION_FAILED
});

export const setLogin = () => ({
  type: LOGIN_REQUEST
});

export const setLoginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data
});

export const setLoginFailed = () => ({
  type: LOGIN_FAILED
});

export const setRefreshToken= () => ({
  type: REFRESH_TOKEN_REQUEST
});

export const setRefreshTokenSuccess = () => ({
  type: REFRESH_TOKEN_SUCCESS,
});

export const setRefreshTokenFailed = () => ({
  type: REFRESH_TOKEN_FAILED
});

export const setLogout= () => ({
  type: LOGOUT_REQUEST
});

export const setLogoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});
export const setLogoutFailed = () => ({
  type: LOGOUT_FAILED
});

export const setGetUser = () => ({
  type: GET_USER_REQUEST
});

export const setGetUserSuccess = (data) => ({
  type: GET_USER_SUCCESS, 
  payload: data
});

export const setGetUserFailed = () => ({
  type: GET_USER_FAILED
});

export const setUpdateUser = () => ({
  type: UPDATE_USER_REQUEST
});

export const setUpdateUserSuccess = (data) => ({
  type: UPDATE_USER_SUCCESS, 
  payload: data
});

export const setUpdateUserFailed = () => ({
  type: UPDATE_USER_FAILED 
});

export function forgotPassword(email) {
  return (dispatch) => {
    dispatch(setForgotPassword());

    api.forgotPassword(email)
    .then(() => {
      setForgotPasswordSuccess();
    })
    .catch((err) => {
      setForgotPasswordFailed();
      console.log(err);
    })
  }
}

export function resetPassword(newPassword, code) {
  return (dispatch) => {
    dispatch(setResetPassword());

    api.resetPassword(newPassword, code)
    .then(() => {
      setResetPasswordSuccess();
    })
    .catch((err) => {
      setResetPasswordFailed();
      console.log(err)
    })
  }
}

export function register(name, email, password) {
  return (dispatch) => {
    dispatch(setRegistration())

    api.register(name, email, password)
    .then(res => {
      const accessToken = res.accessToken.split('Bearer ')[1];
      setCookie('token', accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setRegistrationSuccess(res));
    })
    .catch((err) => {
      dispatch(setRegistrationFailed());
      console.log(err);
    })
  }
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(setLogin())

    api.login(email, password)
    .then(res => {
      const accessToken = res.accessToken.split('Bearer ')[1];
      setCookie('token', accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setLoginSuccess(res));
    })
    .catch((err) => {
      dispatch(setLoginFailed());
      console.log(err);
    })
  }
}

export function refreshToken(refreshToken, afterRefresh) {
  return (dispatch) => {
    dispatch(setRefreshToken())

    api.refreshToken(refreshToken)
    .then((res) => {
      const accessToken = res.accessToken.split('Bearer ')[1];
      setCookie('token', accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setRefreshTokenSuccess(accessToken));
      dispatch(afterRefresh);
    })
    .catch((err) => {
      dispatch(setRefreshTokenFailed());
      console.log(err);
    })
  }
}

export function logout(refreshToken) {
  return (dispatch) => {
    dispatch(setLogout())

    api.logout(refreshToken)
    .then(() => {
      deleteCookie('token');
      localStorage.removeItem('refreshToken');
      dispatch(setLogoutSuccess());
    })
    .catch((err) => {
      dispatch(setLoginFailed());
      console.log(err);
    })
  }
}

export function getUser(accessToken) {
  return (dispatch) => {
    dispatch(setGetUser())

    api.getUser(accessToken)
    .then((res) => {
      dispatch(setGetUserSuccess(res.user))
    })
    .catch((err) => {
       if (err.message === 'jwt expired') {
        dispatch(refreshToken(localStorage.getItem('refreshToken'), getUser()))
      } else {
        dispatch(setGetUserFailed())
        console.log(err)
      }
    })
  }
}

export function updateUser(name, email, password, accessToken) {
  return (dispatch) => {
    dispatch(setUpdateUser())

    api.updateUser(name, email, password, accessToken)
    .then((res) => {
      dispatch(setUpdateUserSuccess(res.user))
    })
    .catch((err) => {
      if (err.message === 'jwt expired') {
        dispatch(refreshToken(localStorage.getItem('refreshToken'), updateUser()));
      } else {
        dispatch(setUpdateUserFailed())
        console.log(err)
      }
    })
  }
}
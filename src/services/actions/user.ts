import api from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { IUser, IAuthUserSuccess, AppDispatch } from '../../utils/types';

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" = "FORGOT_PASSWORD_FAILED";
export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";

export const REGISTRATION_REQUEST: "REGISTRATION_REQUEST" = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS" = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED: "REGISTRATION_FAILED" = "REGISTRATION_FAILED";
export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";
export const REFRESH_TOKEN_REQUEST: "REFRESH_TOKEN_REQUEST" = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS" = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED: "REFRESH_TOKEN_FAILED" = "REFRESH_TOKEN_FAILED";
export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IRegistrationRequest {
  readonly type: typeof REGISTRATION_REQUEST;
}

export interface IRegistrationSuccess {
  readonly type: typeof REGISTRATION_SUCCESS;
  payload: IAuthUserSuccess;
}

export interface IRegistrationFailed {
  readonly type: typeof REGISTRATION_FAILED;
}

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  payload: IAuthUserSuccess;
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export interface IRefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export interface IRefreshTokenSuccess {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}

export interface IRefreshTokenFailed {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  payload: IUser;
}

export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  payload: IUser;
}

export interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}

export type TUserActions = 
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordFailed
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | IRegistrationRequest
  | IRegistrationSuccess
  | IRegistrationFailed
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailed
  | IRefreshTokenRequest
  | IRefreshTokenSuccess
  | IRefreshTokenFailed
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutFailed
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | IUpdateUserRequest
  | IUpdateUserSuccess
| IUpdateUserFailed;

export const setForgotPasswordRequest = () => ({
  type: FORGOT_PASSWORD_REQUEST
});

export const setForgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS
});

export const setForgotPasswordFailed = () => ({
  type: FORGOT_PASSWORD_FAILED
});

export const setResetPasswordRequest = () => ({
  type: RESET_PASSWORD_REQUEST
});

export const setResetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS
});

export const setResetPasswordFailed = () => ({
  type: RESET_PASSWORD_FAILED
});

export const setRegistrationRequest = () => ({
  type: REGISTRATION_REQUEST
});

export const setRegistrationSuccess = (data: IAuthUserSuccess) => ({
  type: REGISTRATION_SUCCESS,
  payload: data,
});

export const setRegistrationFailed = () => ({
  type: REGISTRATION_FAILED
});

export const setLoginRequest = () => ({
  type: LOGIN_REQUEST
});

export const setLoginSuccess = (data: IAuthUserSuccess) => ({
  type: LOGIN_SUCCESS,
  payload: data
});

export const setLoginFailed = () => ({
  type: LOGIN_FAILED
});

export const setRefreshTokenRequest = () => ({
  type: REFRESH_TOKEN_REQUEST
});

export const setRefreshTokenSuccess = () => ({
  type: REFRESH_TOKEN_SUCCESS,
});

export const setRefreshTokenFailed = () => ({
  type: REFRESH_TOKEN_FAILED
});

export const setLogoutRequest = () => ({
  type: LOGOUT_REQUEST
});

export const setLogoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});
export const setLogoutFailed = () => ({
  type: LOGOUT_FAILED
});

export const setGetUserRequest = () => ({
  type: GET_USER_REQUEST
});

export const setGetUserSuccess = (data: IUser) => ({
  type: GET_USER_SUCCESS, 
  payload: data
});

export const setGetUserFailed = () => ({
  type: GET_USER_FAILED
});

export const setUpdateUser = () => ({
  type: UPDATE_USER_REQUEST
});

export const setUpdateUserSuccess = (data: IUser) => ({
  type: UPDATE_USER_SUCCESS, 
  payload: data
});

export const setUpdateUserFailed = () => ({
  type: UPDATE_USER_FAILED 
});

export function forgotPassword(email: string) {
  return (dispatch: AppDispatch) => {
    dispatch(setForgotPasswordRequest());

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

export function resetPassword(newPassword: string, code: string) {
  return (dispatch: AppDispatch) => {
    dispatch(setResetPasswordRequest());

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

export function register(name: string, email: string, password: string) {
  return (dispatch: AppDispatch) => {
    dispatch(setRegistrationRequest())

    api.register(name, email, password)
    .then(res => {
      const accessToken = res.accessToken.split('Bearer ')[1];
      setCookie('token', accessToken, { path: '/' });
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setRegistrationSuccess(res));
    })
    .catch((err) => {
      dispatch(setRegistrationFailed());
      console.log(err);
    })
  }
}

export function login(email: string, password: string) {
  return (dispatch: AppDispatch) => {
    dispatch(setLoginRequest())

    api.login(email, password)
    .then(res => {
      const accessToken = res.accessToken.split('Bearer ')[1];
      setCookie('token', accessToken, { path: '/' });
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setLoginSuccess(res));
    })
    .catch((err) => {
      dispatch(setLoginFailed());
      console.log(err);
    })
  }
}

export function refreshToken(refreshToken: string, afterRefresh: () => void) {
  return (dispatch: AppDispatch | any) => {
    dispatch(setRefreshTokenRequest())

    api.refreshToken(refreshToken)
    .then((res) => {
      const accessToken = res.accessToken.split('Bearer ')[1];
      setCookie('token', accessToken, { path: '/' });
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setRefreshTokenSuccess());
      dispatch(afterRefresh);
    })
    .catch((err) => {
      dispatch(setRefreshTokenFailed());
      console.log(err);
    })
  }
}

export function logout(refreshToken: string | null) {
  return (dispatch: AppDispatch) => {
    dispatch(setLogoutRequest())

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

export function getUser() {
  return (dispatch: AppDispatch) => {
    dispatch(setGetUserRequest())

    api.getUser()
    .then((res) => {
      dispatch(setGetUserSuccess(res.user))
    })
    .catch((err) => {
      if (err.message === 'jwt expired') {
        // @ts-ignore
        dispatch(refreshToken(localStorage.getItem('refreshToken'), getUser()))
      } else {
        dispatch(setGetUserFailed())
        console.log(err)
      }
    })
  }
}

export function updateUser(name: string, email: string, password: string) {
  return (dispatch: AppDispatch) => {
    dispatch(setUpdateUser())

    api.updateUser(name, email, password)
    .then((res) => {
      dispatch(setUpdateUserSuccess(res.user))
    })
    .catch((err) => {
      if (err.message === 'jwt expired') {
        // @ts-ignore
        dispatch(refreshToken(localStorage.getItem('refreshToken'), updateUser(name, email, password)));
      } else {
        dispatch(setUpdateUserFailed())
        console.log(err)
      }
    })
  }
}
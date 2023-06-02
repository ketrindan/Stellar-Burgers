import api from '../../utils/api';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SECCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

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

export function forgotPassword(email) {
  return (dispatch) => {
    dispatch(setForgotPassword())

    api.forgotPassword(email)
    .then(() => {
      setForgotPasswordSuccess()
    })
    .catch((err) => {
      setForgotPasswordFailed()
      console.log(err)
    })
  }
}

export function resetPassword(newPassword, code) {
  return (dispatch) => {
    dispatch(setResetPassword())

    api.resetPassword(newPassword, code)
    .then(() => {
      setResetPasswordSuccess()
    })
    .catch((err) => {
      setResetPasswordFailed();
      console.log(err)
    })
  }
}
import { userReducer, initialState } from './user';

import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED
} from '../actions/user';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: FORGOT_PASSWORD_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
      }
    )
  })
  
  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    expect(
      userReducer(initialState, {
        type: FORGOT_PASSWORD_SUCCESS,
      })
    ).toEqual(
      {
        ...initialState,
        forgotPasswordRequest: true,
      }
    )
  })

  it('should handle FORGOT_PASSWORD_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: FORGOT_PASSWORD_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        forgotPasswordRequest: false,
        forgotPasswordFailed: true,
      }
    )
  })

  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: RESET_PASSWORD_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      }
    )
  })

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(
      userReducer(initialState, {
        type: RESET_PASSWORD_SUCCESS,
      })
    ).toEqual(
      {
        ...initialState,
        resetPasswordRequest: true,
      }
    )
  })

  it('should handle RESET_PASSWORD_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: RESET_PASSWORD_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      }
    )
  })

  it('should handle REGISTRATION_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: REGISTRATION_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        registrationRequest: true,
        registrationFailed: false,
      }
    )
  })

  it('should handle REGISTRATION_SUCCESS', () => {
    expect(
      userReducer(initialState, {
        type: REGISTRATION_SUCCESS,
        payload: {success: true, user: {email: "qwerty@mail.ru", name: "User"}}
      })
    ).toEqual(
      {
        ...initialState,
        registrationRequest: false,
        user: {email: "qwerty@mail.ru", name: "User"},
      }
    )
  })

  it('should handle REGISTRATION_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: REGISTRATION_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        registrationRequest: false,
        registrationFailed: true,
      }
    )
  })

  it('should handle LOGIN_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: LOGIN_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        loginRequest: true,
        loginFailed: false,
      }
    )
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      userReducer(initialState, {
        type: LOGIN_SUCCESS,
        payload: {success: true, user: {email: "qwerty@mail.ru", name: "User"}}
      })
    ).toEqual(
      {
        ...initialState,
        loginRequest: false,
        user: {email: "qwerty@mail.ru", name: "User"},
      }
    )
  })

  it('should handle LOGIN_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: LOGIN_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        loginRequest: false,
        loginFailed: true,
      }
    )
  })

  it('should handle REFRESH_TOKEN_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: REFRESH_TOKEN_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        refreshTokenRequest: true,
        refreshTokenFailed: false,
      }
    )
  })

  it('should handle REFRESH_TOKEN_SUCCESS', () => {
    expect(
      userReducer(initialState, {
        type: REFRESH_TOKEN_SUCCESS,
      })
    ).toEqual(
      {
        ...initialState,
        refreshTokenRequest: false,
      }
    )
  })

  it('should handle REFRESH_TOKEN_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: REFRESH_TOKEN_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        refreshTokenRequest: false,
        refreshTokenFailed: true,
      }
    )
  })

  it('should handle LOGOUT_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: LOGOUT_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        logoutRequest: true,
        logoutFailed: false,
      }
    )
  })

  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      userReducer(initialState, {
        type: LOGOUT_SUCCESS,
      })
    ).toEqual(
      {
        ...initialState,
        logoutRequest: false,
        user: null,
      }
    )
  })

  it('should handle LOGOUT_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: LOGOUT_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        logoutRequest: false,
        logoutFailed: true,
      }
    )
  })

  it('should handle GET_USER_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: GET_USER_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        getUserRequest: true,
        getUserFailed: false,
      }
    )
  })

  it('should handle GET_USER_SUCCESS', () => {
    expect(
      userReducer(initialState, {
        type: GET_USER_SUCCESS,
        payload: {email: "qwerty@mail.ru", name: "User"}
      })
    ).toEqual(
      {
        ...initialState,
        getUserRequest: false,
        user: {email: "qwerty@mail.ru", name: "User"},
      }
    )
  })

  it('should handle GET_USER_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: GET_USER_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        getUserRequest: false,
        getUserFailed: true,
      }
    )
  })

  it('should handle UPDATE_USER_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: UPDATE_USER_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        updateUserRequest: true,
        updateUserFailed: false,
      }
    )
  })

  it('should handle UPDATE_USER_SUCCESS', () => {
    expect(
      userReducer({...initialState, user: {email: "qwerty@mail.ru", name: "User"}}, {
        type: UPDATE_USER_SUCCESS,
        payload: {email: "qwerty123@mail.ru", name: "UpdatedUser"}
      })
    ).toEqual(
      {
        ...initialState,
        updateUserRequest: false,
        user: {email: "qwerty123@mail.ru", name: "UpdatedUser"},
      }
    )
  })

  it('should handle UPDATE_USER_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: UPDATE_USER_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        updateUserRequest: false,
        updateUserFailed: true,
      }
    )
  })
})  
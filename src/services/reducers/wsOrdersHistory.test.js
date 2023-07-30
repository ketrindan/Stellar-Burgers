import { ordersHistoryReducer, initialState } from './wsOrdersHistory';

import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_FAILED,
  DELETE_ORDER_INFO
} from '../actions/wsOrdersHistory';

const orderData = {
  _id:"64abfbf082e277001bf8d4fd",
  ingredients: [],
  status:"done",
  name:"Био-марсианский традиционный-галактический люминесцентный антарианский краторный бургер",
  createdAt:"2023-07-10T12:39:12.928Z",
  updatedAt:"2023-07-10T12:39:13.039Z",
  number:11968
}

describe('ordersHistory reducer', () => {
  it('should return the initial state', () => {
    expect(ordersHistoryReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      ordersHistoryReducer(initialState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual(
      {
        ...initialState,
        error: undefined,
        wsConnected: true
      }
    )
  })

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      ordersHistoryReducer(initialState, {
        type: WS_CONNECTION_ERROR,
      })
    ).toEqual(
      {
        ...initialState,
        error: true,
        wsConnected: false
      }
    )
  })

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      ordersHistoryReducer(initialState, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual(
      {
        ...initialState,
        error: undefined,
        wsConnected: false,
        messages: []
      }
    )
  })

  it('should handle WS_GET_MESSAGE', () => {
    expect(
      ordersHistoryReducer(initialState, {
        type: WS_GET_MESSAGE,
        payload: {orders: orderData, total: 1, totalToday: 1}
      })
    ).toEqual(
      {
        ...initialState,
        error: undefined,
        messages: [...initialState.messages, {orders: orderData, total: 1, totalToday: 1}]
      }
    )
  })

  it('should handle GET_ORDER_INFO_REQUEST', () => {
    expect(
      ordersHistoryReducer(initialState, {
        type: GET_ORDER_INFO_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        orderInfoRequest: true,
        orderInfoFailed: false,
      }
    )
  })

  it('should handle GET_ORDER_INFO_SUCCESS', () => {
    expect(
      ordersHistoryReducer(initialState, {
        type: GET_ORDER_INFO_SUCCESS,
        payload: orderData
      })
    ).toEqual(
      {
        ...initialState,
        orderInfoRequest: false,
        orderInfo: orderData,
      }
    )
  })

  it('should handle GET_ORDER_INFO_FAILED', () => {
    expect(
      ordersHistoryReducer(initialState, {
        type: GET_ORDER_INFO_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        orderInfoRequest: false,
        orderInfoFailed: true
      }
    )
  })
  
  it('should handle DELETE_ORDER_INFO', () => {
    expect(
      ordersHistoryReducer(initialState, {
        type: DELETE_ORDER_INFO,
      })
    ).toEqual(
      {
        ...initialState,
        orderInfoRequest: false,
        orderInfoFailed: false,
        orderInfo: null,
      }
    )
  })
}) 
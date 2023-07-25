import { ordersHistoryReducer } from './wsOrdersHistory';

import {
  SELECT_ORDER,
  DELETE_SELECTED_ORDER,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../actions/wsOrdersHistory';

const initialState = {
  selectedOrder: null,
  wsConnected: false,
  messages: [],
};

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

  it('should handle SELECT_ORDER', () => {
    expect(
      ordersHistoryReducer(initialState, {
        type: SELECT_ORDER,
        payload: orderData
      })
    ).toEqual(
      {
        ...initialState,
        selectedOrder: orderData
      }
    )
  })
  
  it('should handle DELETE_SELECTED_ORDER', () => {
    expect(
      ordersHistoryReducer(initialState, {
        type: DELETE_SELECTED_ORDER,
      })
    ).toEqual(
      {
        ...initialState,
        selectedOrder: null
      }
    )
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
}) 
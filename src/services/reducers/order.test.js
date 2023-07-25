import { orderReducer } from './order';

import {
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
  SUBMIT_ORDER_FAILED,
  DELETE_ORDER
} from '../actions/order';

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

const orderData = {
  success: true,
  name: "Burger name",
  order: {}
}

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SUBMIT_ORDER_REQUEST', () => {
    expect(
      orderReducer(initialState, {
        type: SUBMIT_ORDER_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        orderRequest: true,
        orderFailed: false,
      }
    )
  })
  
  it('should handle SUBMIT_ORDER_SUCCESS', () => {
    expect(
      orderReducer(initialState, {
        type: SUBMIT_ORDER_SUCCESS,
        payload: orderData,
      })
    ).toEqual(
      {
        ...initialState,
        orderRequest: false,
        order: orderData,
      }
    )
  })

  it('should handle SUBMIT_ORDER_FAILED', () => {
    expect(
      orderReducer(initialState, {
        type: SUBMIT_ORDER_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        orderRequest: false,
        orderFailed: true,
      }
    )
  })

  it('should handle DELETE_ORDER', () => {
    expect(
      orderReducer(initialState, {
        type: DELETE_ORDER,
      })
    ).toEqual(
      {
        ...initialState,
        order: null,
      }
    )
  })
}) 
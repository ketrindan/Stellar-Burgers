import {
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
  SUBMIT_ORDER_FAILED,
  DELETE_ORDER
} from '../actions/order';

const initialState = {
  order: {},
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {

  switch (action.type) {
    case SUBMIT_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case SUBMIT_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        order: action.payload,
      };
    }
    case SUBMIT_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    case DELETE_ORDER: {
      return {
        ...state,
        order: {}
      };
    }
    default: {
      return state;
    }
  }
};
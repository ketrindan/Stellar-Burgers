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

import { IOrdersHistoryState } from '../../utils/types';
import { TOrdersHistoryActions } from '../actions/wsOrdersHistory';

export const initialState: IOrdersHistoryState = {
  wsConnected: false,
  messages: [],
  orderInfoRequest: false,
  orderInfoFailed: false,
  orderInfo: null,
};

export const ordersHistoryReducer = (state = initialState, action: TOrdersHistoryActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        error: true,
        wsConnected: false
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        messages: []
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        error: undefined,
        messages: [...state.messages, action.payload]
      };
    }
    case GET_ORDER_INFO_REQUEST: 
      return {
        ...state,
        orderInfoRequest: true,
        orderInfoFailed: false,
      }
    case GET_ORDER_INFO_SUCCESS: 
      return {
        ...state,
        orderInfoRequest: false,
        orderInfo: action.payload,
      }
    case GET_ORDER_INFO_FAILED:
      return {
        ...state,
        orderInfoRequest: false,
        orderInfoFailed: true,
      }
    case DELETE_ORDER_INFO:
      return {
        ...state,
        orderInfoRequest: false,
        orderInfoFailed: false,
        orderInfo: null,
      }
    default: {
      return state;
    }
  }
};
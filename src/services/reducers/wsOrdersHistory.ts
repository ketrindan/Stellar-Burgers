import {
  SELECT_ORDER,
  DELETE_SELECTED_ORDER,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../actions/wsOrdersHistory';

import { IOrdersHistoryState } from '../../utils/types';
import { TOrdersHistoryActions } from '../actions/wsOrdersHistory';

const initialState: IOrdersHistoryState = {
  selectedOrder: null,
  wsConnected: false,
  messages: [],
};

export const ordersHistoryReducer = (state = initialState, action: TOrdersHistoryActions) => {
  switch (action.type) {
    case SELECT_ORDER: {
      return {
        ...state,
        selectedOrder: action.payload
      };
    }
    case DELETE_SELECTED_ORDER: {
      return {
        ...state,
        selectedOrder: null
      };
    }
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
    default: {
      return state;
    }
  }
};
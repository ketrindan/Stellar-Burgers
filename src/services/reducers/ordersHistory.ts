import {
  SELECT_ORDER,
  DELETE_SELECTED_ORDER,
} from '../actions/ordersHistory';

import { IOrdersHistoryState } from '../../utils/types';
import { TOrdersHistoryActions } from '../actions/ordersHistory';

const initialState: IOrdersHistoryState = {
  selectedOrder: null,
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
    default: {
      return state;
    }
  }
};
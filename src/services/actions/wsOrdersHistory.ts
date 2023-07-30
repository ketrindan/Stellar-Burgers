import api from '../../utils/api';
import { IOrder, IWSMessage } from '../../utils/types';
import { AppDispatch } from '../../utils/types';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';

export const GET_ORDER_INFO_REQUEST: 'GET_ORDER_INFO_REQUEST' = 'GET_ORDER_INFO_REQUEST';
export const GET_ORDER_INFO_SUCCESS: 'GET_ORDER_INFO_SUCCESS' = 'GET_ORDER_INFO_SUCCESS';
export const GET_ORDER_INFO_FAILED: 'GET_ORDER_INFO_FAILED' = 'GET_ORDER_INFO_FAILED';
export const DELETE_ORDER_INFO: 'DELETE_ORDER_INFO' = 'DELETE_ORDER_INFO';

interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWSGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWSMessage;
}

interface IGetOrderInfoRequest {
  readonly type: typeof GET_ORDER_INFO_REQUEST;
}

interface IGetOrderInfoSuccess {
  readonly type: typeof GET_ORDER_INFO_SUCCESS;
  readonly payload: IOrder;
}

interface IGetOrderInfoFailed {
  readonly type: typeof GET_ORDER_INFO_FAILED;
}

interface IDeleteOrderInfo {
  readonly type: typeof DELETE_ORDER_INFO;
}


export type TOrdersHistoryActions = 
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSGetMessage
  | IGetOrderInfoRequest
  | IGetOrderInfoSuccess
  | IGetOrderInfoFailed
| IDeleteOrderInfo;

export const wsStart = (url: string): IWSConnectionStart => {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
}

export const wsSuccess = (): IWSConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
}

export const wsError = (): IWSConnectionError => {
  return {
    type: WS_CONNECTION_ERROR
  };
}

export const wsClose = (): IWSConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED
  };
}

export const wsGetMessage = (message: IWSMessage): IWSGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
}

export const getOrderInfoRequest = (): IGetOrderInfoRequest => {
  return {
    type: GET_ORDER_INFO_REQUEST
  };
}

export const getOrderInfoSuccess = (data: IOrder): IGetOrderInfoSuccess => {
  return {type: GET_ORDER_INFO_SUCCESS, payload: data
  };
}

export const getOrderInfoFailed = (): IGetOrderInfoFailed => {
  return {
    type: GET_ORDER_INFO_FAILED
  };
}

export const deleteOrderInfo = (): IDeleteOrderInfo => {
  return {
    type: DELETE_ORDER_INFO
  };
}

export const getOrderInfo = (orderNumber: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderInfoRequest())

    api.getOrderInfo(orderNumber)
      .then(data => {
        if (data) {
          dispatch(getOrderInfoSuccess(data.orders[0]))
        }
      })
      .catch(() => dispatch(getOrderInfoFailed()))
  }
}
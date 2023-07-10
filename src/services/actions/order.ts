import api from "../../utils/api";
import { IOrderSuccess, AppDispatch } from "../../utils/types";

export const SUBMIT_ORDER_REQUEST: "SUBMIT_ORDER_REQUEST" = 'SUBMIT_ORDER_REQUEST';
export const SUBMIT_ORDER_SUCCESS: "SUBMIT_ORDER_SUCCESS" = 'SUBMIT_ORDER_SUCCESS';
export const SUBMIT_ORDER_FAILED: "SUBMIT_ORDER_FAILED" = 'SUBMIT_ORDER_FAILED';
export const DELETE_ORDER: "DELETE_ORDER" = 'DELETE_ORDER';

export interface ISubmitOrderRequest {
  readonly type: typeof SUBMIT_ORDER_REQUEST;
}

export interface ISubmitOrderSuccess {
  readonly type: typeof SUBMIT_ORDER_SUCCESS;
  readonly payload: IOrderSuccess;
}

export interface ISubmitOrderFailed {
  readonly type: typeof SUBMIT_ORDER_FAILED;
}

export interface IDeleteOrder {
  readonly type: typeof DELETE_ORDER;
}

export type TOrderActions = 
  | ISubmitOrderRequest
  | ISubmitOrderSuccess
  | ISubmitOrderFailed
| IDeleteOrder;

export function setOrder(ids: Array<string>) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: SUBMIT_ORDER_REQUEST
    });
    api.submitOrder(ids)
    .then(data => {
      if (data) {
        dispatch({
          type: SUBMIT_ORDER_SUCCESS,
          payload: data,
        });  
      } else {
        dispatch({
          type: SUBMIT_ORDER_FAILED
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: SUBMIT_ORDER_FAILED
      });
      console.log(err)
    })
  };
}

export const deleteOrder = () => ({
  type: DELETE_ORDER
});
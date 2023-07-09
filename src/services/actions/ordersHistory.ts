import { IOrder } from '../../utils/types';

export const SELECT_ORDER: "SELECT_ORDER" = "SELECT_ORDER";
export const DELETE_SELECTED_ORDER: "DELETE_SELECTED_ORDER" = "DELETE_SELECTED_ORDER";

export interface ISelectOrder {
  readonly type: typeof SELECT_ORDER;
  readonly payload: IOrder;
}

export interface IDeleteSelectedOrder {
  readonly type: typeof DELETE_SELECTED_ORDER;
}

export type TOrdersHistoryActions = 
  | ISelectOrder
| IDeleteSelectedOrder;

export const selectOrder = (order: IOrder) => ({
  type: SELECT_ORDER,
  payload: order,
});

export const deleteSelectedOrder = () => ({
  type: DELETE_SELECTED_ORDER,
});

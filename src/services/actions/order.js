import api from "../../utils/api";

export const SUBMIT_ORDER_REQUEST = 'SUBMIT_ORDER_REQUEST';
export const SUBMIT_ORDER_SUCCESS = 'SUBMIT_ORDER_SUCCESS';
export const SUBMIT_ORDER_FAILED = 'SUBMIT_ORDER_FAILED';
export const DELETE_ORDER = 'DELETE_ORDER';

export function setOrder(ids) {
  return function(dispatch) {
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
  };
}

export const deleteOrder = () => ({
  type: DELETE_ORDER
});
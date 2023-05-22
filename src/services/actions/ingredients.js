import api from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const SELECT_INGREDIENT = "SELECT_INGREDIENT";
export const DELETE_SELECTED_INGREDIENT = "DELETE_SELECTED_INGREDIENT";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    api.getData()
    .then(ingredients => {
      if (ingredients) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: ingredients.data,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    });
  };
}

export const selectIngredient = (ingredient) => ({
  type: SELECT_INGREDIENT,
  payload: ingredient,
});

export const deleteSelectedIngredient = () => ({
  type: DELETE_SELECTED_INGREDIENT,
});
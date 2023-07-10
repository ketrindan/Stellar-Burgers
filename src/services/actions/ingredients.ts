import api from '../../utils/api';
import { IIngredient, AppDispatch } from '../../utils/types';

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";
export const SELECT_INGREDIENT: "SELECT_INGREDIENT" = "SELECT_INGREDIENT";
export const DELETE_SELECTED_INGREDIENT: "DELETE_SELECTED_INGREDIENT" = "DELETE_SELECTED_INGREDIENT";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";
export const CHANGE_ORDER: "CHANGE_ORDER" = "CHANGE_ORDER";

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: IIngredient[];
};

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export interface ISelectIngredient {
  readonly type: typeof SELECT_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IDeleteSelectedIngredient {
  readonly type: typeof DELETE_SELECTED_INGREDIENT;
}

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IAddBun {
  readonly type: typeof ADD_BUN;
  readonly payload: IIngredient;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IDeleteAllIngredients {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export interface ISortIngredients {
  readonly type: typeof CHANGE_ORDER;
  readonly payload: IIngredient[];
}

export type TIngredientsActions = 
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed
  | ISelectIngredient
  | IDeleteSelectedIngredient
  | IAddIngredient
  | IAddBun
  | IDeleteIngredient
  | IDeleteAllIngredients
| ISortIngredients;

export function getIngredients() {
  return function(dispatch: AppDispatch) {
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
    })
    .catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      });
      console.log(err)
    })
  };
}

export const selectIngredient = (ingredient: IIngredient) => ({
  type: SELECT_INGREDIENT,
  payload: ingredient,
});

export const deleteSelectedIngredient = () => ({
  type: DELETE_SELECTED_INGREDIENT,
});

export const addBun = (bun: IIngredient) => {
  return {
    type: ADD_BUN,
    payload: bun,
  };
}

export const addIngredient = (ing: IIngredient, id: string) => {
  return {
    type: ADD_INGREDIENT,
    payload: {...ing, id: id},
  };
}

export const deleteIngredient = (ing: IIngredient) => {
  return {
    type: DELETE_INGREDIENT,
    payload: ing,
  };
}

export const clearConstructor = () => ({
  type: CLEAR_CONSTRUCTOR,
});

export const changeOrder = (mixedIngredients: IIngredient[]) => {
  return {
    type: CHANGE_ORDER,
    payload: mixedIngredients,
  }
}

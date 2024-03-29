import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SELECT_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  CHANGE_ORDER,
} from '../actions/ingredients';

import { IIngredientsState } from '../../utils/types';
import { TIngredientsActions } from '../actions/ingredients';

export const initialState: IIngredientsState = {
  ingredients: [],
  chosenIngredients: [],
  chosenBun: null,
  selectedIngredient: null,
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.payload,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.payload
      };
    }
    case DELETE_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: null
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        chosenBun: action.payload
      }
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        chosenIngredients: [...state.chosenIngredients, action.payload]
      };
    }
    case DELETE_INGREDIENT: {
      return { 
        ...state, 
        chosenIngredients: state.chosenIngredients.filter((i) => i.id !== action.payload.id) 
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        chosenIngredients: [],
        chosenBun: null
      };
    }
    case CHANGE_ORDER: {
      return {
        ...state,
        chosenIngredients: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
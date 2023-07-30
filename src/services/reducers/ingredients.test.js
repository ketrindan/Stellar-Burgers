import { ingredientsReducer, initialState } from "./ingredients";

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

const ingredient = {
  _id:"643d69a5c3f7b9001cfa093e",
  name:"Филе Люминесцентного тетраодонтимформа",
  type:"main",
  proteins:44,
  fat:26,
  carbohydrates:85,
  calories:643,
  price:988,
  image:"https://code.s3.yandex.net/react/code/meat-03.png",
  image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
  __v:0
}

const ingredient2 = {
  _id:"643d69a5c3f7b9001cfa0941",
  name:"Биокотлета из марсианской Магнолии",
  type:"main",
  proteins:420,
  fat:142,
  carbohydrates:242,
  calories:4242,
  price:424,
  image:"https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile:"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v:0
}

const bun = {
  _id:"643d69a5c3f7b9001cfa093c",
  name:"Краторная булка N-200i",
  type:"bun",
  proteins:80,
  fat:24,
  carbohydrates:53,
  calories:420,
  price:1255,
  image:"https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v:0
}

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        ingredientsRequest: true,
        ingredientsFailed: false,
      }
    )
  })
  
  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        payload: [ingredient, ingredient2, bun],
      })
    ).toEqual(
      {
        ...initialState,
        ingredientsRequest: false,
        ingredients: [ingredient, ingredient2, bun],
      }
    )
  })

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        ingredientsRequest: false,
        ingredientsFailed: true,
      }
    )
  })

  it('should handle SELECT_INGREDIENT', () => {
    expect(
      ingredientsReducer(initialState, {
        type: SELECT_INGREDIENT,
        payload: ingredient,
      })
    ).toEqual(
      {
        ...initialState,
        selectedIngredient: ingredient,
      }
    )
  })

  it('should handle DELETE_SELECTED_INGREDIENT', () => {
    expect(
      ingredientsReducer(initialState, {
        type: DELETE_SELECTED_INGREDIENT,
      })
    ).toEqual(
      {
        ...initialState,
        selectedIngredient: null
      }
    )
  })

  it('should handle ADD_BUN', () => {
    expect(
      ingredientsReducer(initialState, {
        type: ADD_BUN,
        payload: bun,
      })
    ).toEqual(
      {
        ...initialState,
        chosenBun: bun
      }
    )
  })

  it('should handle ADD_INGREDIENT', () => {
    expect(
      ingredientsReducer(initialState, {
        type: ADD_INGREDIENT,
        payload: ingredient,
      })
    ).toEqual(
      {
        ...initialState,
        chosenIngredients: [...initialState.chosenIngredients, ingredient]
      }
    )
  })

  it('should handle DELETE_INGREDIENT', () => {
    expect(
      ingredientsReducer(initialState, {
        type: DELETE_INGREDIENT,
        payload: ingredient,
      })
    ).toEqual(
      {
        ...initialState,
        chosenIngredients: initialState.chosenIngredients.filter((i) => i.id !== ingredient.id) 
      }
    )
  })

  it('should handle CLEAR_CONSTRUCTOR', () => {
    expect(
      ingredientsReducer(initialState, {
        type: CLEAR_CONSTRUCTOR,
      })
    ).toEqual(
      {
        ...initialState,
        chosenIngredients: [],
        chosenBun: null
      }
    )
  })

  it('should handle CHANGE_ORDER', () => {
    expect(
      ingredientsReducer({...initialState, chosenIngredients: [ingredient, ingredient2]}, {
        type: CHANGE_ORDER,
        payload: [ingredient2, ingredient]
      })
    ).toEqual(
      {
        ...initialState,
        chosenIngredients: [ingredient2, ingredient]
      }
    )
  })
}) 
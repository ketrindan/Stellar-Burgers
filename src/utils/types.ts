import { store } from "../services/store";
import {Action, ActionCreator} from "redux";
import {ThunkAction}from "redux-thunk";
import {TIngredientsActions} from "../services/actions/ingredients";
import {TOrderActions} from "../services/actions/order";
import {TUserActions} from "../services/actions/user";
export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  id?: string;
}

export interface IIngredientProps {
  data: IIngredient;
  onModalOpen: () => void;
}

export interface IChosenIngredientProps {
  data: IIngredient;
  index: number;
}

export interface IBurgerProps {
  onModalOpen: () => void;
}

export interface IIngredientDetails {
  title?: string;
}

export interface IModal {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

export interface IModalOverlay {
  onClose: () => void;
}

export interface IProtectedRoute {
  element: React.ReactElement;
  onlyUnAuth?: boolean;
}

export interface IMain {
  onIngredientModalOpen: () => void;
  onOrderModalOpen: () => void;
}

export interface IOrderSuccess {
  success: true;
  name: string;
  order: {
    number: number;
  }
}

export interface IUser {
  name: 'string';
  email: 'string';
}

export interface IAuthUserSuccess {
  success: true;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IIngredientsState {
  ingredients: IIngredient[];
  chosenIngredients: IIngredient[];
  chosenBun: IIngredient | null;
  selectedIngredient: IIngredient | null;
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
};

export interface IOrderState {
  order: IOrderSuccess | null,
  orderRequest: boolean,
  orderFailed: boolean,
};

export interface IUserState {
  user: IUser | null,
  forgotPasswordRequest: boolean,
  forgotPasswordFailed: boolean,
  resetPasswordRequest: boolean,
  resetPasswordFailed: boolean,
  registrationRequest: boolean,
  registrationFailed: boolean,
  loginRequest: boolean,
  loginFailed: boolean,
  refreshTokenRequest: boolean,
  refreshTokenFailed: boolean,
  logoutRequest: boolean,
  logoutFailed: boolean,
  getUserRequest: boolean,
  getUserFailed: boolean,
  updateUserRequest: boolean,
  updateUserFailed: boolean,
};

type TApplicationActions  = 
  | TIngredientsActions
  | TOrderActions
  | TUserActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = typeof store.dispatch; 

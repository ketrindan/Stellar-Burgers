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

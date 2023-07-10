import { FC } from 'react';
import { useSelector } from '../../services/hooks';
import { useParams } from "react-router-dom";
import ingredientDetailsStyles from './IngredientDetails.module.css';
import { IIngredientDetails, IIngredient } from '../../utils/types';

const IngredientDetails: FC<IIngredientDetails> = ({title}) => {
  const { id } = useParams();

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const ingredient =  ingredients.find((ingredient: IIngredient)  => ingredient._id === id);

  return (
    <>
      {ingredient &&
      <div className={`${ingredientDetailsStyles.container} mb-5`}>
        {title && <h2 className={`${ingredientDetailsStyles.title} text text_type_main-large mt-30`}>{title}</h2>}
        <img src={ingredient.image} alt="ингредиент" className="mb-4" />
        <p className={`${ingredientDetailsStyles.subtitle} text text_type_main-medium mb-8`}>{ingredient.name}</p>
        <ul className={`${ingredientDetailsStyles.infobox} text text_type_main-default text_color_inactive`}>
          <li className={ingredientDetailsStyles.item}>
            <span>Калории, ккал</span>
            <p className="text text_type_digits-default">{ingredient.calories}</p>
          </li>
          <li className={ingredientDetailsStyles.item}>
            <span>Белки, г</span>
            <p className="text text_type_digits-default">{ingredient.proteins}</p>
          </li>
          <li className={ingredientDetailsStyles.item}>
            <span>Жиры, г</span>
            <p className="text text_type_digits-default">{ingredient.fat}</p>
          </li>
          <li className={ingredientDetailsStyles.item}>
            <span>Углеводы, г</span>
            <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
          </li>
        </ul>
      </div>}
    </>
  )
}

export default IngredientDetails;
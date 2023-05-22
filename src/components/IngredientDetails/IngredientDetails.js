import { useSelector } from 'react-redux';
import ingredientDetailsStyles from './IngredientDetails.module.css';

function IngredirntDetails() {
  const ingredient = useSelector(state => state.ingredients.selectedIngredient)

  return (
    <div className={`${ingredientDetailsStyles.container} mb-5`}>
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
    </div>
  )
}

export default IngredirntDetails;

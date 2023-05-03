import ingredientDetailsStyles from './IngredientDetails.module.css';
import PropTypes from "prop-types";
import { ingredientPropTypes } from '../../utils/prop-types'

function IngredirntDetails(props) {
  return (
    <div className={`${ingredientDetailsStyles.container} mb-5`}>
      <img src={props.data.image} alt="ингредиент" className="mb-4" />
      <p className={`${ingredientDetailsStyles.subtitle} text text_type_main-medium mb-8`}>{props.data.name}</p>
      <ul className={`${ingredientDetailsStyles.infobox} text text_type_main-default text_color_inactive`}>
        <li className={ingredientDetailsStyles.item}>
          <span>Калории, ккал</span>
          <p className="text text_type_digits-default">{props.data.calories}</p>
        </li>
        <li className={ingredientDetailsStyles.item}>
          <span>Белки, г</span>
          <p className="text text_type_digits-default">{props.data.proteins}</p>
        </li>
        <li className={ingredientDetailsStyles.item}>
          <span>Жиры, г</span>
          <p className="text text_type_digits-default">{props.data.fat}</p>
        </li>
        <li className={ingredientDetailsStyles.item}>
          <span>Углеводы, г</span>
          <p className="text text_type_digits-default">{props.data.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

export default IngredirntDetails;

IngredirntDetails.propTypes = {
  data: PropTypes.shape(ingredientPropTypes).isRequired,
};
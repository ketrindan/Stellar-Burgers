import ingredientStyles from './Ingredient.module.css';
import PropTypes from "prop-types";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient(props) {
  return (
    <article className={ingredientStyles.item}>
      <Counter count={1} size="default" />
      <img className={`ml-4 mr-4`} src={props.item.image} alt={`картинка ${props.item.name}`} />
      <div className={ingredientStyles.price_box}>
        <p className="text text_type_digits-default mr-2">{props.item.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`text text_type_main-default ${ingredientStyles.text}`}>{props.item.name}</p>
    </article>
  )
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default Ingredient;
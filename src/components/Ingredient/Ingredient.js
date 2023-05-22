import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import ingredientStyles from './Ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types';
import { selectIngredient } from '../../services/actions/ingredients';

function Ingredient(props) {
  const dispatch = useDispatch();

  function handleClick(e) {
    dispatch(selectIngredient(props.data));
    props.onModalOpen()
  }

  return (
    <article className={ingredientStyles.item} onClick={handleClick}>
      <Counter count={1} size="default" />
      <img className={`ml-4 mr-4`} src={props.data.image} alt={`картинка ${props.data.name}`} />
      <div className={ingredientStyles.price_box}>
        <p className="text text_type_digits-default mr-2">{props.data.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`text text_type_main-default ${ingredientStyles.text}`}>{props.data.name}</p>
    </article>
  )
}

export default Ingredient;

Ingredient.propTypes = {
  data: PropTypes.shape(ingredientPropTypes).isRequired,
  onModalOpen: PropTypes.func.isRequired,
};
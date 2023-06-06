import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import ingredientStyles from './Ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types';
import { selectIngredient } from '../../services/actions/ingredients';

function Ingredient(props) {
  const { _id } = props.data;

  const location = useLocation();

  const chosenBun = useSelector(state => state.ingredients.chosenBun);
  const chosenIngredients = useSelector(state => state.ingredients.chosenIngredients);

  const dispatch = useDispatch();

  function handleClick() {
    dispatch(selectIngredient(props.data));
    props.onModalOpen()
  }

  const [{ opacity }, dragRef] = useDrag({
    type: "chosen_ingredient",
    item: { _id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    }),
  });

  let counter = 0;

  chosenIngredients.forEach((ingredient) => ingredient.name === props.data.name && (counter+= 1));
  chosenBun.name === props.data.name && (counter+= 2);

  return (
    <Link className={ingredientStyles.link} key={_id} to={{
      pathname: `/ingredients/${_id}`
    }} state={{ background: location }}>
      <article className={ingredientStyles.item} onClick={handleClick} ref={dragRef} style={{opacity}} draggable>
        {counter > 0 && <Counter count={counter} size="default" />}
        <img className={`ml-4 mr-4`} src={props.data.image} alt={`картинка ${props.data.name}`} />
        <div className={ingredientStyles.price_box}>
          <p className="text text_type_digits-default mr-2">{props.data.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`text text_type_main-default ${ingredientStyles.text}`}>{props.data.name}</p>
      </article>
    </Link>
  )
}

export default Ingredient;

Ingredient.propTypes = {
  data: PropTypes.shape(ingredientPropTypes).isRequired,
  onModalOpen: PropTypes.func.isRequired,
};
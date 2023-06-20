import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';
import ingredientStyles from './Ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectIngredient } from '../../services/actions/ingredients';
import { IIngredientProps, IIngredient } from '../../utils/types';

const Ingredient: FC<IIngredientProps> = ({data, onModalOpen}) => {
  const { _id } = data;

  const location = useLocation();

  const chosenBun = useSelector((state: any) => state.ingredients.chosenBun);
  const chosenIngredients = useSelector((state: any) => state.ingredients.chosenIngredients);

  const dispatch = useDispatch();

  function handleClick() {
    dispatch(selectIngredient(data));
    onModalOpen()
  }

  const [{ opacity }, dragRef] = useDrag({
    type: "chosen_ingredient",
    item: { _id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    }),
  });

  let counter = 0;

  chosenIngredients.forEach((ingredient: IIngredient) => ingredient.name === data.name && (counter+= 1));
  chosenBun.name === data.name && (counter+= 2);

  return (
    <Link className={ingredientStyles.link} key={_id} to={{
      pathname: `/ingredients/${_id}`
    }} state={{ background: location }}>
      <article className={ingredientStyles.item} onClick={handleClick} ref={dragRef} style={{opacity}} draggable>
        {counter > 0 && <Counter count={counter} size="default" />}
        <img className={`ml-4 mr-4`} src={data.image} alt={`картинка ${data.name}`} />
        <div className={ingredientStyles.price_box}>
          <p className="text text_type_digits-default mr-2">{data.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`text text_type_main-default ${ingredientStyles.text}`}>{data.name}</p>
      </article>
    </Link>
  )
}

export default Ingredient;
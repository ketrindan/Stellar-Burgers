import React, { useMemo, FC } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useNavigate } from 'react-router-dom';
import { useDrop } from "react-dnd";
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { setOrder } from '../../services/actions/order';
import { addBun, addIngredient, clearConstructor } from '../../services/actions/ingredients';
import { v4 as uuidv4 } from 'uuid';
import ChosenIngredient from '../ChosenIngredient/ChosenIngredient';
import { IBurgerProps, IIngredient } from '../../utils/types';

const BurgerConstructor: FC<IBurgerProps> = ({onModalOpen}) => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const chosenBun = useSelector((state) => state.ingredients.chosenBun);
  const chosenIngredients = useSelector((state) => state.ingredients.chosenIngredients);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const total = useMemo(() => {
    if (!chosenBun) {
      return chosenIngredients.reduce((sum: number, current: IIngredient) => sum + current.price, 0)
    } else {
      return chosenBun.price * 2 + chosenIngredients.reduce((sum: number, current: IIngredient) => sum + current.price, 0)
    }
  }, [chosenBun, chosenIngredients]);

  function submitOrder() {
    if (user && chosenBun) {
      const orderIds = chosenIngredients.map((i: IIngredient) => i._id).concat(chosenBun._id);
      dispatch(setOrder(orderIds));
      dispatch(clearConstructor());
      onModalOpen();
    } else {
      navigate('/login')
    }
  }

  function onDropHandler(item: IIngredient) {
    const draggingIngredient = ingredients.find((i: IIngredient) => i._id === item._id)
    if (draggingIngredient && draggingIngredient.type === 'bun') {
      dispatch(addBun(draggingIngredient));
    } else if (draggingIngredient) {
      const id = uuidv4();
      dispatch(addIngredient(draggingIngredient, id));
    }
  }

  const [{isHover}, dropTarget] = useDrop<IIngredient, unknown, { isHover: boolean }>({
    accept: "chosen_ingredient",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      onDropHandler(item);
    },
  });

  const borderColor = isHover ? 'blueviolet' : 'transparent';

  return (
    <section className={`${BurgerConstructorStyles.container} mt-25 pl-4 pt-2 pb-2`} ref={dropTarget} style={{borderColor}} data-cy="constructor">
      {chosenBun ? <div className="ml-8 pr-4" data-cy="constructor-bun-1">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${chosenBun.name} (верх)`}
              price={chosenBun.price}
              thumbnail={chosenBun.image}
            /> 
      </div> : <p className={`${BurgerConstructorStyles.text} text text_type_main-large text_color_inactive`}>Выберите булку</p>
}
      
      {chosenIngredients.length > 0 ? 
        <div className={BurgerConstructorStyles.scrollbox} data-cy="constructor-ingredients">
          {chosenIngredients.map((item: IIngredient, i: number) => (
            item.type !== 'bun' &&
            <ChosenIngredient key={item.id} data={item} index={i}/>
          ))}
        </div> : <p className={`${BurgerConstructorStyles.text} text text_type_main-large text_color_inactive`}>Выберите ингредиенты</p>
      }
      <div className="ml-8 pr-4" data-cy="constructor-bun-2">
        {chosenBun && 
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${chosenBun.name} (низ)`}
            price={chosenBun.price}
            thumbnail={chosenBun.image}
          />
        }
      </div>
      <div className={`${BurgerConstructorStyles.infobox} mt-10 pr-5`}>
        <div className={BurgerConstructorStyles.pricebox}>
          <p className="text text_type_digits-medium mr-2">{total || 0}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={submitOrder} disabled={!chosenBun || chosenIngredients.length === 0}>Оформить заказ</Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;
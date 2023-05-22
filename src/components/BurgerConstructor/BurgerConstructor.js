import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { setOrder } from '../../services/actions/order';

function BurgerConstructor(props) {
  const ingredients = useSelector(state => state.ingredients.ingredients)
  const chosenBun = useSelector(state => state.ingredients.chosenBun);
  const chosenIngredients = useSelector(state => state.ingredients.chosenIngredients);

  const dispatch = useDispatch();

  const total = useMemo(() => chosenBun.price * 2 + chosenIngredients.reduce((sum, current) => sum + current.price, 0), [chosenBun, chosenIngredients]) || 0;

  function submitOrder() {
    const orderIds = chosenIngredients.map(i => i._id).concat(chosenBun._id);
    dispatch(setOrder(orderIds))
    props.onOrderModalOpen()
  }

  return (
    <section className={`${BurgerConstructorStyles.container} pt-25 pl-4 pb-13`}>
      <div className="ml-8 pr-4">
          {chosenBun.name ? 
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${chosenBun.name} (верх)`}
              price={chosenBun.price}
              thumbnail={chosenBun.image}
            /> : <p className={`${BurgerConstructorStyles.text} text text_type_main-large text_color_inactive`}>Выберите булку</p>
          }
      </div>
      <div className={BurgerConstructorStyles.scrollbox}>
        {chosenIngredients.length>0 ? chosenIngredients.map((item) => (
          item.type !== 'bun' && 
          <ul key={item._id} className={BurgerConstructorStyles.item}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </ul>
        )) : <p className="text text_type_main-large text_color_inactive">Выберите ингредиенты</p>
        }
      </div>
      <div className="ml-8 pr-4">
        {chosenBun.name && 
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${chosenBun.name} (низ)`}
            price={chosenBun.price}
            thumbnail={chosenBun.image}
          />
        }
      </div>
      <div className={`${BurgerConstructorStyles.infobox} mt-10`}>
        <div className={BurgerConstructorStyles.pricebox}>
          <p className="text text_type_digits-medium mr-2">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={submitOrder}>Оформить заказ</Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  onOrderModalOpen: PropTypes.func.isRequired,
};
import React from 'react';
import PropTypes from "prop-types";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types';
import BurgerConstructorStyles from './BurgerConstructor.module.css';

function BurgerConstructor(props) {
  const chosenBun = props.data.find(i => i.type === "bun");
  const chosenIngs = props.data.filter(i => i.type !== "bun");

  const total = chosenBun.price + chosenIngs.reduce((sum, current) => sum + current.price, 0) + chosenBun.price;

  return (
    <section className={`${BurgerConstructorStyles.container} pt-25 pl-4 pb-13`}>
      <div className="ml-8 pr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${chosenBun.name} (верх)`}
            price={chosenBun.price}
            thumbnail={chosenBun.image}
          />
      </div>
      <div className={BurgerConstructorStyles.scrollbox}>
        {chosenIngs.map((item) => (
          item.type !== 'bun' && 
          <ul key={item._id} className={BurgerConstructorStyles.item}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </ul>
        ))}
      </div>
      <div className="ml-8 pr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${chosenBun.name} (низ)`}
            price={chosenBun.price}
            thumbnail={chosenBun.image}
          />
      </div>
      <div className={`${BurgerConstructorStyles.infobox} mt-10`}>
        <div className={BurgerConstructorStyles.pricebox}>
          <p className="text text_type_digits-medium mr-2">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientPropTypes)),
};
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import Ingredient from '../Ingredient/Ingredient';
import burgerIngredientsStyles from './BurgerIngredients.module.css';



function BurgerIngredients(props) {
  const ingredients = useSelector(state => state.ingredients.ingredients)

  const [current, setCurrent] = useState('bun');

  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  return (
    <section className={`pt-10 ${burgerIngredientsStyles.container}`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={burgerIngredientsStyles.navtab}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`mt-10 ${burgerIngredientsStyles.items_box}`}>
        <h2 className="text text_type_main-medium mb-6">Булки</h2>
        <ul className={`${burgerIngredientsStyles.list} mb-10 pr-4 pl-4`}>
          {buns.map((item) => (
            <Ingredient key={item._id} data={item} onModalOpen={props.onModalOpen} />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mb-6">Соусы</h2>
        <ul className={`${burgerIngredientsStyles.list} mb-10  pr-4 pl-4`}>
          {sauces.map((item) => (
            <Ingredient key={item._id} data={item} onModalOpen={props.onModalOpen} />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mb-6">Начинки</h2>
        <ul className={`${burgerIngredientsStyles.list} mb-10  pr-4 pl-4`}>
          {mains.map((item) => (
            <Ingredient key={item._id} data={item} onModalOpen={props.onModalOpen} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
};
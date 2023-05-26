import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import Ingredient from '../Ingredient/Ingredient';
import Loader from '../Loader/Loader';
import burgerIngredientsStyles from './BurgerIngredients.module.css';

function BurgerIngredients(props) {
  const ingredientsState = useSelector(state => state.ingredients);
  const ingredients = useSelector(state => state.ingredients.ingredients);

  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  const [current, setCurrent] = useState('bun');

  function setActiveTabTitle() {
    const tabsBorder = (document.querySelector(`.${burgerIngredientsStyles.navtab}`)).getBoundingClientRect().bottom;
    const bunsTitle = (document.querySelector(`#bun`)).getBoundingClientRect().top;
    const saucesTitle = (document.querySelector(`#sauce`)).getBoundingClientRect().top;
    const mainsTitle = (document.querySelector(`#main`)).getBoundingClientRect().top;
    
    const coords = [
      {
        title: 'bun',
        distance: Math.abs(tabsBorder - bunsTitle)
      },
      {
        title: 'sauce',
        distance: Math.abs(tabsBorder - saucesTitle)
      },
      {
        title: 'main',
        distance: Math.abs(tabsBorder - mainsTitle)
      },
    ];

    const distances = coords.map(i => i.distance);
    const minDistance = Math.min(...distances);
    const activeTitle = coords.find(i => i.distance === minDistance).title;

    return activeTitle
  }
  
  function handleScroll(e) {
    e.target.addEventListener('scroll', function() {
      setCurrent(setActiveTabTitle)
    })
  }
  
  function handleTabClick(title) {
    setCurrent(title)
    document.querySelector(`#${title}`).scrollIntoView({behavior: "smooth"})
  }

  return (
    <section className={`${burgerIngredientsStyles.container} pt-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={burgerIngredientsStyles.navtab}>
        <Tab value="bun" active={current === 'bun'} onClick={() => handleTabClick('bun')}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => handleTabClick('sauce')}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={() => handleTabClick('main')}>
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredientsStyles.items_box} mt-10`} onScroll={handleScroll}>
        {ingredientsState.ingredientsRequest && <Loader/> }

        { ingredients.length > 0 &&
          <>
            <h2 className="text text_type_main-medium mb-6" id="bun">Булки</h2>
            <ul className={`${burgerIngredientsStyles.list} mb-10 pr-4 pl-4`}>
              {buns.map((item) => (
                <Ingredient key={item._id} data={item} onModalOpen={props.onModalOpen} />
              ))}
            </ul>
            <h2 className="text text_type_main-medium mb-6" id="sauce">Соусы</h2>
            <ul className={`${burgerIngredientsStyles.list} mb-10  pr-4 pl-4`}>
              {sauces.map((item) => (
                <Ingredient key={item._id} data={item} onModalOpen={props.onModalOpen} />
              ))}
            </ul>
            <h2 className="text text_type_main-medium mb-6" id="main">Начинки</h2>
            <ul className={`${burgerIngredientsStyles.list} mb-10  pr-4 pl-4`}>
              {mains.map((item) => (
                <Ingredient key={item._id} data={item} onModalOpen={props.onModalOpen} />
              ))}
            </ul>
          </>
        }

        {ingredientsState.ingredientsFailed && 
          <div className={burgerIngredientsStyles.error_box}>
            <p className="text text_type_main-default mb-2">Произошла ошибка...</p>
          </div>
        } 

      </div>
    </section>
  )
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
};
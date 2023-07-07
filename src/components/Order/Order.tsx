import { FC } from 'react';
import orderStyles from './Order.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrderProps, IIngredient } from '../../utils/types';
import { v4 as uuid } from 'uuid';

const Order: FC<IOrderProps> = ({data, onModalOpen}) => {
  const location = useLocation();
  const {number, createdAt, name, ingredients} = data;
  const ingredientsData = useSelector((state) => state.ingredients.ingredients);

  const getImage = (ing: string) => {
    const foundIng = ingredientsData.find((ingredientsData) => ingredientsData._id === ing);
    if (foundIng) {
      return foundIng.image;
    }
  }

  const countTotal = () => {
    let total = 0;
    ingredients.forEach((ingredient) => {
      const foundIng = ingredientsData.find((ingredientsData: IIngredient) => ingredientsData._id === ingredient);
      if (foundIng?.price) {
        total += foundIng.price;
      }
    })
    return total;
  }

  function handleClick() {
    onModalOpen()
  }

  return (
    <Link className={orderStyles.link} key={number} to={{
      pathname: `${location.pathname}/${number}`
    }} state={{ background: location }}>
      <article className={orderStyles.item} onClick={handleClick} >
      <div className={orderStyles.header}>
          <p className="text text_type_digits-default">{`#${number}`}</p>
          <p className="text text_type_main-default text_color_inactive">{<FormattedDate date={new Date(createdAt)} />}</p>
        </div>
        <h2 className="text text_type_main-medium">{name}</h2>
        <div className={orderStyles.container}>
          <ul className={orderStyles.ingredients_list}>
            { ingredients.map((ingredient: string, i: number) => {
              if (i < 5) {
                return (
                  <div className={orderStyles.ingredients_list_item} key={uuid()} style={{zIndex: 999 - i}}>
                    <img src={getImage(ingredient)} className={orderStyles.ingredients_image} alt="ingredient_image" />
                  </div>
                )
              } else if (i === 6) {
                return (
                  <div className={`${orderStyles.ingredients_list_item} ${orderStyles.ingredients_list_item_6th}`} key={uuid()}>
                    <p className={`${orderStyles.ingredients_counter} text text_type_digits-default`}>{`+${ingredients.slice(5, ingredients.length).length}`}</p>
                    <img src={getImage(ingredient)} className={`${orderStyles.ingredients_image} ${orderStyles.ingredients_image_6th}`} alt="ingredient_image" />
                  </div>
                )
              }
              return null
            })}
          </ul>
          <div className={orderStyles.total}>
            <span className="text text_type_digits-default">{countTotal()}</span>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      
      </article>
    </Link>
  )
}

export default Order;
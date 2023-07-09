import { FC } from 'react';
import { useSelector } from '../../services/hooks';
import { useParams } from "react-router-dom";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import orderInfoStyles from './OrderInfo.module.css';
import { IOrderInfoProps, IIngredient, IOrder } from '../../utils/types';
import Loader from '../Loader/Loader';

import { data } from '../../utils/data';

const OrderInfo: FC<IOrderInfoProps> = ({fullPage=false}) => {
  const { id } = useParams();

  const order = data.orders.find((order: IOrder)  => order.number === Number(id));
  const ingredientsData = useSelector((state) => state.ingredients.ingredients);

  const orderIngredients = order?.ingredients.map((orderedIng: string) => ingredientsData.find((ingredient: IIngredient) => ingredient._id === orderedIng));
  const ingredientsSet = Array.from(new Set(orderIngredients));

  const countTotal = () => {
    let total = 0;
    order?.ingredients.forEach((ingredient: string) => {
      const foundIng = ingredientsData.find((ingredientsData: IIngredient) => ingredientsData._id === ingredient);
      if (foundIng?.price) {
        total += foundIng.price;
      }
    })
    return total;
  }

  function setStatus(status: string) {
    switch(status) {
      case "done":
        return "Выполнен";
      case "pending":
        return "Готовится";
      default:
        return "Создан";
    }
  }

  const setStyle = (status: string) => {
    switch(status) {
      case "done":
        return {color: '#00CCCC'};
      default:
        return;
    }
  }

  return (
    <>
      { order ? (
        <section className={orderInfoStyles.container}>
          <div className={orderInfoStyles.info}>
            { fullPage && <p className={`text text_type_digits-default mt-30 mb-10 ${orderInfoStyles.number}`}>#{order.number}</p>}
            <h2 className="text text_type_main-medium mb-3">{order.name}</h2>
            <p className={`text text_type_main-default mb-15`} style={setStyle(order?.status)}>{setStatus(order?.status)}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <ul className={`${orderInfoStyles.list}`}>
              { ingredientsSet.map((ingredient: IIngredient | undefined, i: number) => {
                return (
                  <li key={i} className={orderInfoStyles.item}>
                    <div className={orderInfoStyles.ingredient}>
                      <img className={orderInfoStyles.image} src={ingredient?.image} alt=""/>
                      <h3 className={`text text_type_main-default ${orderInfoStyles.title}`}>{ingredient?.name}</h3>
                    </div>
                    <div className={`text text_type_digits-default ${orderInfoStyles.price_box}`}>
                      <span>
                        {`${orderIngredients?.filter(ing => ing?._id === ingredient?._id).length} x` }
                      </span>
                      <div className={orderInfoStyles.price}>
                        <span>{ingredient?.price}</span>
                        <CurrencyIcon type="primary"/>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className={`${orderInfoStyles.total_container} mt-10`}>
              <p className="text text_type_main-default text_color_inactive">{<FormattedDate date = {new Date(order?.createdAt)} />}</p>
              <div className={orderInfoStyles.total}>
                <span className="text text_type_digits-default">{countTotal()}</span>
                <CurrencyIcon type="primary"/>
              </div>
            </div>
          </div>
        </section>) : <Loader/>
      }
    </>
  )
}

export default OrderInfo;
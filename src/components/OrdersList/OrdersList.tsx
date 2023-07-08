import { FC } from 'react';
import ordersListStyles from './OrdersList.module.css';
import Order from '../Order/Order';
import Loader from '../Loader/Loader';
import { IBurgerProps, IOrder } from '../../utils/types';

import { data } from '../../utils/data';

const OrdersList: FC<IBurgerProps> = ({onModalOpen}) => {
  return (
    <section className={ordersListStyles.ordersList}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
      <div
        className={`${ordersListStyles.container} mt-10`}>
        { data ? (
          <ul className={`${ordersListStyles.list} pt-6 pb-10 pr-4 pl-4`}>
            {
              data.orders?.map((order: IOrder, id: number) => (
                <Order key={id} data={order} onModalOpen={onModalOpen} userHistory={false}/>
              ))
            }
          </ul>
        ) : (<Loader />)}
      </div>
    </section>
  )
}

export default OrdersList;
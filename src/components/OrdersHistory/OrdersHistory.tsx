import { FC } from 'react';
import ordersHistoryStyles from './OrdersHistory.module.css';
import Order from '../Order/Order';
import Loader from '../Loader/Loader';
import { IBurgerProps, IOrder } from '../../utils/types';

import { data } from '../../utils/data';

const OrdersHistory: FC<IBurgerProps> = ({onModalOpen}) => {
  return (
    <section className={ordersHistoryStyles.ordersList}>
      <div
        className={ordersHistoryStyles.container}>
        { data ? (
          <ul className={`${ordersHistoryStyles.list} pt-6 pb-10 pr-4 pl-4`}>
            {
              data.orders?.map((order: IOrder, id: number) => (
                <Order key={id} data={order} onModalOpen={onModalOpen} userHistory={true}/>
              ))
            }
          </ul>
        ) : (<Loader />)}
      </div>
    </section>
  )
}

export default OrdersHistory;
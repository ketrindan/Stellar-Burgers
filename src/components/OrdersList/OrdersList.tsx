import { FC } from 'react';
import { useSelector } from '../../services/hooks';
import ordersListStyles from './OrdersList.module.css';
import Order from '../Order/Order';
import Loader from '../Loader/Loader';
import { IOrder } from '../../utils/types';

const OrdersList: FC = () => {
  const messages = useSelector(state => state.ordersHistory.messages);

  return (
    <section className={ordersListStyles.ordersList}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
      <div
        className={`${ordersListStyles.container} mt-10`}>
        { messages.length > 0 ? (
          <ul className={`${ordersListStyles.list} pt-6 pb-10 pr-4 pl-4`}>
            {
              messages[messages.length - 1].orders?.map((order: IOrder, i: number) => (
                <Order key={i} data={order} userHistory={false}/>
              ))
            }
          </ul>
        ) : (<Loader />)}
      </div>
    </section>
  )
}

export default OrdersList;
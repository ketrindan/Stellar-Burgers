import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import ordersHistoryStyles from './OrdersHistory.module.css';
import Order from '../Order/Order';
import Loader from '../Loader/Loader';
import { IOrder } from '../../utils/types';
import { wsStart, wsClose } from '../../services/actions/wsOrdersHistory';

const OrdersHistory: FC = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('token');

  const messages = useSelector(state => state.ordersHistory.messages);
  
  useEffect(() => {
    dispatch(wsStart(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
    return () => {
      dispatch(wsClose());
    }
  }, [dispatch, accessToken])

  return (
    <section className={ordersHistoryStyles.ordersList}>
      <div
        className={ordersHistoryStyles.container}>
        { messages.length > 0 ? (
          <ul className={`${ordersHistoryStyles.list} pt-6 pb-10 pr-4 pl-4`}>
            {
              messages[messages.length - 1].orders?.map((order: IOrder, i: number) => (
                <Order key={i} data={order} userHistory={true}/>
              ))
            }
          </ul>
        ) : (<Loader />)}
      </div>
    </section>
  )
}

export default OrdersHistory;
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import ordersHistoryStyles from './OrdersHistory.module.css';
import Order from '../Order/Order';
import Loader from '../Loader/Loader';
import { IBurgerProps, IOrder } from '../../utils/types';
import { wsStart, wsClose } from '../../services/actions/wsOrdersHistory';
import { getCookie } from '../../utils/cookie';

const OrdersHistory: FC<IBurgerProps> = ({onModalOpen}) => {
  const dispatch = useDispatch();
  const accessToken = getCookie('token');

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
                <Order key={i} data={order} onModalOpen={onModalOpen} userHistory={true}/>
              ))
            }
          </ul>
        ) : (<Loader />)}
      </div>
    </section>
  )
}

export default OrdersHistory;
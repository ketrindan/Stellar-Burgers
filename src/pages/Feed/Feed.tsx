import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/hooks';
import feedStyles from './Feed.module.css';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrdersStats from '../../components/OrdersStats/OrdersStats';
import { IFeedProps } from '../../utils/types';
import { wsStart, wsClose } from '../../services/actions/wsOrdersHistory';

const Feed: FC<IFeedProps> = ({onOrderInfoModalOpen}) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(wsStart("wss://norma.nomoreparties.space/orders/all"));
    return () => {
      dispatch(wsClose());
    }
  }, [dispatch])

  return (
    <section className={feedStyles.feed}>
      <OrdersList onModalOpen={onOrderInfoModalOpen}/>
      <OrdersStats />
    </section>
  )
}

export default Feed;
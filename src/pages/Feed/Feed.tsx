import { FC } from 'react';
import feedStyles from './Feed.module.css';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrdersStats from '../../components/OrdersStats/OrdersStats';
import { IFeedProps } from '../../utils/types';

const Feed: FC<IFeedProps> = ({onOrderInfoModalOpen}) => {
  return (
    <section className={feedStyles.feed}>
      <OrdersList onModalOpen={onOrderInfoModalOpen}/>
      <OrdersStats />
    </section>
  )
}

export default Feed;
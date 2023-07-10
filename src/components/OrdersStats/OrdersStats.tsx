import { FC } from 'react';
import { useSelector } from '../../services/hooks';
import ordersStatsStyles from './OrdersStats.module.css';
import Loader from '../Loader/Loader';
import { IOrder } from '../../utils/types';

const OrdersStats: FC = () => {
  const messages = useSelector(state => state.ordersHistory.messages);

  return (
    <section className={ordersStatsStyles.ordersStats}>
      <>
        { messages.length > 0 ? (
          <>
            <div className={ordersStatsStyles.order_stats}>
              <div>
                <p className="text text_type_main-medium pb-6">Готовы:</p>
                { messages[messages.length - 1].orders?.some((order: IOrder) => order.status === 'done') && (
                  <div className={ordersStatsStyles.container}>
                    <ul className={ordersStatsStyles.list_done}>
                      { messages[messages.length - 1].orders?.filter((order: IOrder) => order.status === 'done').map((order: IOrder, i: number) => {
                        if (i < 10) {
                          return (<li key={i} className="text text_type_digits-default pb-2">
                            {order.number}
                          </li>)
                        }
                        return null
                      })}
                    </ul>
                    <ul className={ordersStatsStyles.list_done}>
                      { messages[messages.length - 1].orders?.filter((order: IOrder) => order.status === 'done').map((order: IOrder, i: number) => {
                        if (i >= 10 && i < 20) {
                          return (<li key={i} className="text text_type_digits-default pb-2">
                            {order.number}
                          </li>)
                        }
                        return null
                      })}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <p className="text text_type_main-medium pb-6">В работе:</p>
                { messages[messages.length - 1].orders?.some((order: IOrder) => order.status === 'pending') && (
                  <div className={ordersStatsStyles.container}>
                    <ul className={ordersStatsStyles.list_pending}>
                      { messages[messages.length - 1].orders?.filter((order: IOrder) => order.status === 'pending').map((order: IOrder, i: number) => {
                        if (i < 10) {
                          return (<li key={i} className="text text_type_digits-default pb-2">
                            {order.number}
                          </li>)
                        }
                        return null
                      })}
                    </ul>
                    <ul className={ordersStatsStyles.list_pending}>
                      { messages[messages.length - 1].orders?.filter((order: IOrder) => order.status === 'pending').map((order: IOrder, i: number) => {
                        if (i >= 10 && i < 20) {
                          return (<li key={i} className="text text_type_digits-default pb-2">
                            {order.number}
                        </li>)
                      }
                      return null
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="text text_type_main-medium">Выполнено за все время:</p>
              <span className={`${ordersStatsStyles.numbers} text text_type_digits-large`}>{messages[messages.length - 1].total}</span>
            </div>
            <div>
              <p className="text text_type_main-medium">Выполнено за сегодня:</p>
              <span className={`${ordersStatsStyles.numbers} text text_type_digits-large`}>{messages[messages.length - 1].totalToday}</span>
            </div>
          </>
        ) : (<Loader/>)}
      </>
    </section>
  )
}

export default OrdersStats;
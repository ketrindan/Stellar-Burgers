import { useSelector } from 'react-redux';
import orderDetailsStyles from './OrderDetails.module.css';
import okImg from '../../images/graphics.svg';
import Loader from '../Loader/Loader';

function OrderDetails() {
  const orderStatus = useSelector(state => state.order);
  const order = useSelector(state => state.order.order);

  return (
    <div className={`${orderDetailsStyles.container} mt-4 mb-20`}>

      {orderStatus.orderRequest && <Loader/> }

      {order.success && 
        <>
          <p className="text text_type_digits-large mb-8">{order.order.number}</p>
          <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
          <img src={okImg} alt="ok" className="mb-15"/>
          <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      }

      {(orderStatus.orderFailed || !order) && 
        <p className="text text_type_main-large mb-2">Произошла ошибка...</p>
      }
      
    </div>
  )
}

export default OrderDetails;

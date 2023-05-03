import orderDetailsStyles from './OrderDetails.module.css';
import PropTypes from "prop-types";
import okImg from '../../images/graphics.svg';

function OrderDetails(props) {
  return (
    <div className={`${orderDetailsStyles.container} mt-4 mb-20`}>
      <p className="text text_type_digits-large mb-8">{props.orderID}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={okImg} alt="ok" className="mb-15"/>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails;

OrderDetails.propTypes = {
  orderID: PropTypes.string.isRequired,
};
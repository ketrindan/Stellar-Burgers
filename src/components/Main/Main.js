import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import PropTypes from "prop-types";
import mainStyles from './Main.module.css';

function Main(props) {
  return (
    <section className={mainStyles.main}>
      <BurgerIngredients onModalOpen={props.onIngredientModalOpen} onIgredientClick={props.onIgredientClick} /> 
      <BurgerConstructor onOrderSubmit={props.onOrderSubmit} /> 
    </section>
  )
}

export default Main;

Main.propTypes = {
  onIngredientModalOpen: PropTypes.func.isRequired,
  onIgredientClick: PropTypes.func.isRequired,
  onOrderSubmit: PropTypes.func.isRequired,
};
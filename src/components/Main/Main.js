import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import PropTypes from "prop-types";
import mainStyles from './Main.module.css';

function Main(props) {
  return (
    <section className={mainStyles.main}>
      <BurgerIngredients onModalOpen={props.onIngredientModalOpen} /> 
      <BurgerConstructor onOrderModalOpen={props.onOrderModalOpen} /> 
    </section>
  )
}

export default Main;

Main.propTypes = {
  onIngredientModalOpen: PropTypes.func.isRequired,
  onOrderModalOpen: PropTypes.func.isRequired,
};
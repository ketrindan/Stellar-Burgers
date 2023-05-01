import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import PropTypes from "prop-types";
import { ingredientPropTypes } from '../../utils/prop-types';
import mainStyles from './Main.module.css';

function Main(props) {
  return (
    <section className={mainStyles.main}>
      <BurgerIngredients data={props.data} /> 
      <BurgerConstructor data={props.data} /> 
    </section>
  )
}

export default Main;

Main.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientPropTypes)).isRequired,
};
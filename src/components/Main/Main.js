import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import PropTypes from "prop-types";
import mainStyles from './Main.module.css';

function Main(props) {
  return (
    <section className={mainStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients onModalOpen={props.onIngredientModalOpen} /> 
        <BurgerConstructor onOrderModalOpen={props.onOrderModalOpen} /> 
      </DndProvider>
    </section>
  )
}

export default Main;

Main.propTypes = {
  onIngredientModalOpen: PropTypes.func.isRequired,
  onOrderModalOpen: PropTypes.func.isRequired,
};
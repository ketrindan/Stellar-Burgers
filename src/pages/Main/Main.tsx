import { FC } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import mainStyles from './Main.module.css';
import { IMain } from '../../utils/types';

const Main: FC<IMain> = ({ onOrderModalOpen }) => {
  return (
    <section className={mainStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients /> 
        <BurgerConstructor onModalOpen={onOrderModalOpen} /> 
      </DndProvider>
    </section>
  )
}

export default Main;
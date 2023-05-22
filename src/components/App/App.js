import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredirntDetails from '../IngredientDetails/IngredientDetails';

import { getIngredients } from '../../services/actions/ingredients';
import { deleteSelectedIngredient } from '../../services/actions/ingredients';
import { deleteOrder } from '../../services/actions/order';

function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);

  const dispatch = useDispatch();

  function handleIngredientModalOpen() {
    setIsIngredientModalOpen(true)
  }

  function handleOrderModalOpen() {
    setIsOrderModalOpen(true)
  }

  function handleAllModalClose() {
    dispatch(deleteSelectedIngredient());
    dispatch(deleteOrder());
    setIsOrderModalOpen(false);
    setIsIngredientModalOpen(false);
  }

  useEffect(() => {    
   dispatch(getIngredients())
  }, [dispatch])

  return (
    <div className={styles.app}>
      <AppHeader />

      <Main 
        onIngredientModalOpen={handleIngredientModalOpen}
        onOrderModalOpen={handleOrderModalOpen}
      />

      {isOrderModalOpen && 
        <Modal onClose={handleAllModalClose}>
          <OrderDetails />
        </Modal>
      }
      
      {isIngredientModalOpen && 
        <Modal onClose={handleAllModalClose} title={"Детали ингредиента"}>
          <IngredirntDetails />
        </Modal>
      }
    </div>
  );
}

export default App;

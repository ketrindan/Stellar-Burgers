import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredirntDetails from '../IngredientDetails/IngredientDetails';
import api from '../../utils/api';

import { IngredientsContext } from '../../services/IngredientsContext';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [ingredient, setIngredient] = useState({});
  const [order, setOrder] = useState({});

  function handleIngredientModalOpen() {
    setIsIngredientModalOpen(true)
  }

  function handleAllModalClose() {
    setIsOrderModalOpen(false)
    setIsIngredientModalOpen(false)
  }

  function handleIngredientClick(item) {
    setIngredient(item);
  }

  function handleOrderSubmit(orderIds) {
    api.submitOrder(orderIds)
    .then((data) => {
      setOrder(data);
      setIsOrderModalOpen(true);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {    
    api.getData()
    .then((data) => {
      setIngredients(data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />

      {ingredients.length > 0 && 
        <IngredientsContext.Provider value={ingredients}>
          <Main 
            onIngredientModalOpen={handleIngredientModalOpen}
            onIgredientClick={handleIngredientClick}
            onOrderSubmit={handleOrderSubmit}
          />
        </IngredientsContext.Provider>
      }

      {isOrderModalOpen && 
        <Modal onClose={handleAllModalClose}>
          <OrderDetails orderID={order.order.number}/>
        </Modal>
      }
      
      {isIngredientModalOpen && 
        <Modal onClose={handleAllModalClose} title={"Детали ингредиента"}>
          <IngredirntDetails data={ingredient}/>
        </Modal>
      }
    </div>
  );
}

export default App;

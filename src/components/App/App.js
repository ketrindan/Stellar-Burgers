import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredirntDetails from '../IngredientDetails/IngredientDetails';
import api from '../../utils/api';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [ingredient, setIngredient] = useState({})

  function handleOrderModalOpen() {
    setIsOrderModalOpen(true)
  }

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
        <Main 
          data={ingredients} 
          onIngredientModalOpen={handleIngredientModalOpen}
          onOrderModalOpen={handleOrderModalOpen}
          onIgredientClick={handleIngredientClick}
        />
      }

      {isOrderModalOpen && 
        <Modal isOpen={handleOrderModalOpen} onClose={handleAllModalClose}>
          <OrderDetails orderID={'034536'}/>
        </Modal>
      }
      {isIngredientModalOpen && 
        <Modal isOpen={handleIngredientModalOpen} onClose={handleAllModalClose} title={"Детали ингредиента"}>
          <IngredirntDetails data={ingredient}/>
        </Modal>
      }
    </div>
  );
}

export default App;

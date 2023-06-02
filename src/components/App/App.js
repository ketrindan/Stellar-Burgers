import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';

import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import Main from '../../pages/Main/Main';
import Register from '../../pages/Register/Register';
import Login from '../../pages/Login/Login';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';

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

      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='*' element={<NotFound />} />
        <Route exact path='/' element={
          <Main 
            onIngredientModalOpen={handleIngredientModalOpen}
            onOrderModalOpen={handleOrderModalOpen}
          />} 
        />
        <Route path='/profile/*' element={<Profile />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />       
      </Routes>

      {isOrderModalOpen && 
        <Modal onClose={handleAllModalClose}>
          <OrderDetails />
        </Modal>
      }
      
      {isIngredientModalOpen && 
        <Modal onClose={handleAllModalClose} title={"Детали ингредиента"}>
          <IngredientDetails />
        </Modal>
      }
    </div>
  );
}

export default App;

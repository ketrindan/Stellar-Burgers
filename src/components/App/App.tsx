import React, {useState, useEffect, FC} from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
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
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import Feed from '../../pages/Feed/Feed';
import OrderInfo from '../OrderInfo/OrderInfo';

import { getIngredients } from '../../services/actions/ingredients';
import { deleteSelectedIngredient } from '../../services/actions/ingredients';
import { deleteSelectedOrder } from '../../services/actions/wsOrdersHistory';
import { deleteOrder } from '../../services/actions/order';
import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie';

const App: FC = () => {
  const ModalSwitch = () => {
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
    const [isOrderInfoModalOpen, setIsOrderInfoModalOpen] = useState(false);

    const selectedOrder = useSelector(state => state.ordersHistory.selectedOrder)

    const accessToken = getCookie('token');

    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();
    let background = location.state && location.state.background;

    function handleIngredientModalOpen() {
      setIsIngredientModalOpen(true)
    }

    function handleOrderModalOpen() {
      setIsOrderModalOpen(true)
    }

    function handleOrderInfoModalOpen() {
      setIsOrderInfoModalOpen(true)
    }

    function handleIngredientModalClose() {
      dispatch(deleteSelectedIngredient());
      setIsIngredientModalOpen(false);
      navigate(-1);
    }

    function handleOrderModalClose() {
      dispatch(deleteOrder());
      setIsOrderModalOpen(false);
    }

    function handleOrderInfoModalClose() {
      dispatch(deleteSelectedOrder());
      setIsOrderInfoModalOpen(false);
      navigate(-1);
    }

    useEffect(() => {    
      dispatch(getIngredients());

      if (accessToken) {
        dispatch(getUser());
      }
    }, [dispatch, accessToken])

    return (
      <div className={styles.app}>
        <AppHeader />

        <Routes location={background || location}>
          <Route path='/register' element={<ProtectedRouteElement element={<Register />} onlyUnAuth={true} />} />
          <Route path='/login' element={<ProtectedRouteElement element={<Login />} onlyUnAuth={true} />} />
          <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPassword />} onlyUnAuth={true} />} />
          <Route path='/reset-password' element={<ProtectedRouteElement element={<ResetPassword />} onlyUnAuth={true} />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={
            <Main 
              onIngredientModalOpen={handleIngredientModalOpen}
              onOrderModalOpen={handleOrderModalOpen}
            />} 
          />
          <Route path='/feed' element={<Feed onOrderInfoModalOpen={handleOrderInfoModalOpen}/>} />
          <Route path='/profile/*' element={<ProtectedRouteElement element={<Profile onOrderInfoModalOpen={handleOrderInfoModalOpen}/>}/>} /> 
          <Route path='/ingredients/:id' element={<IngredientDetails title={"Детали ингредиента"}/>} /> 
          <Route path='/feed/:id' element={<OrderInfo fullPage={true}/>} /> 
          <Route path='/profile/orders/:id' element={<ProtectedRouteElement element={<OrderInfo fullPage={true}/>} />} />       
        </Routes>

        {isOrderModalOpen && 
          <Modal onClose={handleOrderModalClose}>
            <OrderDetails />
          </Modal>
        }
        
        {(background && isIngredientModalOpen) && (
          <Routes>
            <Route path='/ingredients/:id'
              element={<Modal onClose={handleIngredientModalClose} title={"Детали ингредиента"}>
                <IngredientDetails />
              </Modal>} 
            />
          </Routes>
        )}

        {(background && isOrderInfoModalOpen) && (
          <Routes>
            <Route path='/feed/:id'
              element={<Modal onClose={handleOrderInfoModalClose} orderNumber={selectedOrder?.number}>
                <OrderInfo fullPage={false}/>
              </Modal>} 
            />
          </Routes>
        )}

        {(background && isOrderInfoModalOpen) && (
          <Routes>
            <Route path='/profile/orders/:id'
              element={<Modal onClose={handleOrderInfoModalClose} orderNumber={selectedOrder?.number}>
                <OrderInfo fullPage={false} />
              </Modal>} 
            />
          </Routes>
        )}
      </div>
    );
  };

  return (
    <ModalSwitch />
  );
}

export default App;

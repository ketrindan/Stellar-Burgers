import { FC } from 'react';
import profileStyles from './Profile.module.css';
import { NavLink, useMatch } from "react-router-dom";
import { useDispatch } from "../../services/hooks";
import { logout } from '../../services/actions/user';
import { IFeedProps } from '../../utils/types';
import ProfileDetails from '../../components/ProfileDetails/ProfileDetails';
import OrdersHistory from '../../components/OrdersHistory/OrdersHistory';
import { deleteCookie } from '../../utils/cookie';

const Profile: FC<IFeedProps> = ({onOrderInfoModalOpen}) => {
  const profileMatch = useMatch("/profile");
  const ordersMatch = useMatch("/profile/orders");

  const dispatch = useDispatch();

  function handleLogout() {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(logout(refreshToken));
    deleteCookie('token');
  }
  
  return (
    <section className={profileStyles.container}>
      <div className={profileStyles.box}>
        <nav className={profileStyles.nav}>
          <div className={profileStyles.link_wrapper}>
            <NavLink end to="/profile" className={({ isActive }) => isActive ? `${profileStyles.link} text text_type_main-medium ${profileStyles.link_active}` : 
              `${profileStyles.link} text text_type_main-medium text_color_inactive`}>Профиль
            </NavLink>
          </div>
          <div className={profileStyles.link_wrapper}>
            <NavLink to="/profile/orders" className={({ isActive }) => isActive ? `${profileStyles.link} text text_type_main-medium ${profileStyles.link_active}` : 
              `${profileStyles.link} text text_type_main-medium text_color_inactive`} >История заказов
            </NavLink>
          </div>
          <div className={profileStyles.link_wrapper}>
            <NavLink to="/login" className={({ isActive }) => isActive ? `${profileStyles.link} text text_type_main-medium ${profileStyles.link_active}` : 
              `${profileStyles.link} text text_type_main-medium text_color_inactive`} onClick={handleLogout} >Выход
            </NavLink>
          </div>
        </nav>
        <span className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      
      {profileMatch && <ProfileDetails />}
      {ordersMatch && <OrdersHistory onModalOpen={onOrderInfoModalOpen}/>}

    </section>
  )
}

export default Profile;
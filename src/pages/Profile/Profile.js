import profileStyles from './Profile.module.css';
import { NavLink, useMatch } from "react-router-dom";

import ProfileDetails from '../../components/ProfileDetails/ProfileDetails';

function Profile() {
  const profileMatch = useMatch("/profile");
  const ordersMatch = useMatch("/profile/orders");
  
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
              `${profileStyles.link} text text_type_main-medium text_color_inactive`} >Выход
            </NavLink>
          </div>
        </nav>
        <span className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      
      {profileMatch && <ProfileDetails />}
      {ordersMatch && <></>}

    </section>
  )
}

export default Profile;
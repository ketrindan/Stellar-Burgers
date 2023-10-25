import { useState } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { FC } from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "../../services/hooks";
import { logout } from '../../services/actions/user';
import logo_mini from '../../images/logo.svg';
import arrow from '../../images/icon.svg';
import { deleteCookie } from '../../utils/cookie';
import Modal from '../Modal/Modal';

import headerStyles from './AppHeader.module.css';

const AppHeader: FC = () => {
  const burgers = useMatch('/');
  const feed = useMatch('/feed/*');
  const profile = useMatch('/profile/*');

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProfileNavOpen, setProfileNavOpen] = useState(false);

  const dispatch = useDispatch();

  function handleBurgerClick() {
    setMenuOpen((state) => !state);
    setProfileNavOpen(false);
  }

  function handleProfileClick() {
    setProfileNavOpen((state) => !state);
  }

  function handleLogout() {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(logout(refreshToken));
    deleteCookie('token');
    setMenuOpen((state) => !state);
  }

  function toggleBurgerBtnClass() {
    return isMenuOpen ? `${headerStyles.burger_btn} ${headerStyles.burger_btn_transformed}` : `${headerStyles.burger_btn}`
  }

  function toggleProfileNavClass() {
    return isProfileNavOpen ? `${headerStyles.profile_nav} ${headerStyles.profile_nav_opened}` : `${headerStyles.profile_nav}`
  }

  function toggleArrowClass() {
    return isProfileNavOpen ? `${headerStyles.link_arrow} ${headerStyles.link_arrow_transformed}` : ` ${headerStyles.link_arrow}`
  }


  return (
    <header className={`pt-4 pb-4 ${headerStyles.header}`}>
      <div className={headerStyles.container}>
        <nav className={headerStyles.navigation}>
          <NavLink end to='/' className={({ isActive }) => isActive ? `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.link_active}` : 
              `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link}`} >
            <BurgerIcon  type={burgers ? "primary" : "secondary"}/>
            <span className={`${headerStyles.span} text text_type_main-default ml-2`}>Конструктор</span>
          </NavLink>
          <NavLink to='/feed' className={({ isActive }) => isActive ? `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.link_active}` : 
              `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link}`} >
            <ListIcon type={feed ? "primary" : "secondary"} />
            <span className={`${headerStyles.span} text text_type_main-default ml-2`}>Лента заказов</span>
          </NavLink>
        </nav>
        <div className={headerStyles.logo}>
          <NavLink to='/'><Logo /></NavLink>
        </div>
        <NavLink to='/profile' className={({ isActive }) => isActive ? `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.profile} ${headerStyles.link_active}` : 
              `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.profile}`} >
          <ProfileIcon type={profile ? "primary" : "secondary"} />
          <span className={`${headerStyles.span} text text_type_main-default ml-2`}>Личный кабинет</span>
        </NavLink>
      </div>
      
      <NavLink to='/'><img src={logo_mini} alt='логотип' className={headerStyles.logo_mini}></img></NavLink>
      <div className={toggleBurgerBtnClass()} onClick={handleBurgerClick}>
        <span className={headerStyles.burger_layer}></span>
        <span className={headerStyles.burger_layer}></span>
        <span className={headerStyles.burger_layer}></span>
      </div>

      { isMenuOpen && <Modal onClose={handleBurgerClick} title={"Меню"} isHeaderNav={true} >
        <button className={profile ? `pt-4 pb-4 ${headerStyles.nav_button} ${headerStyles.link} ${headerStyles.link_active}` : 
          `pt-4 pb-4 ${headerStyles.nav_button} ${headerStyles.link}`} onClick={handleProfileClick}>
          <ProfileIcon type={profile ? "primary" : "secondary"} />
          <span className={`${headerStyles.span} text text_type_main-default ml-2`}>Личный кабинет</span>
          <img className={toggleArrowClass()} src={arrow} alt='arrow'/>
        </button>
        <div className={toggleProfileNavClass()}>
          <NavLink end to='/profile' className={({ isActive }) => isActive ? `pt-2 pb-2 ${headerStyles.user_link} ${headerStyles.user_link_active}` : 
            `pt-2 pb-2 ${headerStyles.user_link}`} onClick={handleBurgerClick}>
            <span className={`${headerStyles.span} text text_type_main-default ml-2`}>Профиль</span>
          </NavLink>
          <NavLink to='/profile/orders' className={({ isActive }) => isActive ? `pt-2 pb-2 ${headerStyles.user_link} ${headerStyles.user_link_active}` : 
            `pt-2 pb-2 ${headerStyles.user_link}`} onClick={handleBurgerClick}>
            <span className={`${headerStyles.span} text text_type_main-default ml-2`}>История заказов</span>
          </NavLink>
          <NavLink to='/login' className={({ isActive }) => isActive ? `pt-2 pb-2 ${headerStyles.user_link} ${headerStyles.user_link_active}` : 
            `pt-2 pb-2 ${headerStyles.user_link}`} onClick={handleLogout}>
            <span className={`${headerStyles.span} text text_type_main-default ml-2`}>Выход</span>
          </NavLink>
        </div>
        <NavLink end to='/' className={({ isActive }) => isActive ? `pt-4 pb-4 ${headerStyles.link} ${headerStyles.link_active}` : 
          `pt-4 pb-4 ${headerStyles.link}`} onClick={handleBurgerClick}>
          <BurgerIcon  type={burgers ? "primary" : "secondary"}/>
          <span className={`${headerStyles.span} text text_type_main-default ml-2`}>Конструктор бургеров</span>
        </NavLink>
        <NavLink to='/feed' className={({ isActive }) => isActive ? `pt-4 pb-4 ${headerStyles.link} ${headerStyles.link_active}` : 
          `pt-4 pb-4 ${headerStyles.link}`} onClick={handleBurgerClick}>
          <ListIcon type={feed ? "primary" : "secondary"} />
          <span className={`${headerStyles.span} text text_type_main-default ml-2`}>Лента заказов</span>
        </NavLink>
      </Modal> }
    </header>
  )
}

export default AppHeader;
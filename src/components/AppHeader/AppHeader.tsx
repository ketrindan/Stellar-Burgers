import { useState } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { FC } from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import logo_mini from '../../images/logo.svg';
import MobModalPage from '../MobModalPage/MobModalPage';

import headerStyles from './AppHeader.module.css';

const AppHeader: FC = () => {
  const burgers = useMatch('/');
  const feed = useMatch('/feed/*');
  const profile = useMatch('/profile/*');

  const [isMenuOpen, setMenuOpen] = useState(false);

  function handleBurgerClick() {
    setMenuOpen((state) => !state);
  }

  function toggleBurgerBtnClass() {
    return isMenuOpen ? `${headerStyles.burger_btn} ${headerStyles.burger_btn_transformed}` : `${headerStyles.burger_btn}`
  }

  function toggleBurgerMenuClass() {
    return isMenuOpen ? `${headerStyles.burger_menu} ${headerStyles.burger_menu_opened}` : `${headerStyles.burger_menu}`
  }

  function toggleMobileNavClass() {
    return isMenuOpen ? `${headerStyles.navigation_mob} ${headerStyles.navigation_mob_opened}` : `${headerStyles.navigation_mob}`
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
      
      <img src={logo_mini} alt='логотип' className={headerStyles.logo_mini}></img>
      <div className={toggleBurgerBtnClass()} onClick={handleBurgerClick}>
        <span className={headerStyles.burger_layer}></span>
        <span className={headerStyles.burger_layer}></span>
        <span className={headerStyles.burger_layer}></span>
      </div>

      <div className={toggleBurgerMenuClass()}>
        <div className={toggleMobileNavClass()}>
          <MobModalPage onClose={handleBurgerClick} title={'Меню'} isHeaderNav={true}>
            <NavLink to='/profile' className={({ isActive }) => isActive ? `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.profile} ${headerStyles.link_active}` : 
              `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.profile}`} onClick={handleBurgerClick}>
              <ProfileIcon type={profile ? "primary" : "secondary"} />
              <span className={`${headerStyles.span} text text_type_main-default ml-2`}>Личный кабинет</span>
            </NavLink>
            <NavLink end to='/' className={({ isActive }) => isActive ? `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.link_active}` : 
                `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link}`} onClick={handleBurgerClick}>
              <BurgerIcon  type={burgers ? "primary" : "secondary"}/>
              <span className={`${headerStyles.span} text text_type_main-default ml-2`}>Конструктор бургеров</span>
            </NavLink>
            <NavLink to='/feed' className={({ isActive }) => isActive ? `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.link_active}` : 
              `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link}`} onClick={handleBurgerClick}>
              <ListIcon type={feed ? "primary" : "secondary"} />
              <span className={`${headerStyles.span} text text_type_main-default ml-2`}>Лента заказов</span>
            </NavLink>
          </MobModalPage>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;
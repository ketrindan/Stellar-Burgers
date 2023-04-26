import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import headerStyles from './AppHeader.module.css';

function AppHeader() {
  return (
    <header className={`pt-4 pb-4 ${headerStyles.header}`}>
      <div className={headerStyles.container}>
        <nav className={headerStyles.navigation}>
          <NavLink to='#' className={`pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.link_active}`}>
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default ml-2">Конструктор</span>
          </NavLink>
          <NavLink to='#' className={`pt-4 pl-5 pb-4 pr-5 ${headerStyles.link}`}>
            <ListIcon type="secondary" />
            <span className="text text_type_main-default ml-2">Лента заказов</span>
          </NavLink>
        </nav>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <Link to='#' className={`pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.profile}`}>
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default ml-2">Личный кабинет</span>
        </Link>
      </div>
    </header>
  )
}

export default AppHeader;
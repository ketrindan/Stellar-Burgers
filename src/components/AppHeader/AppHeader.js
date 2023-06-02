import { NavLink, useMatch } from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import headerStyles from './AppHeader.module.css';

function AppHeader() {
  const burgers = useMatch('/');
  const orders = useMatch('/profile/orders');
  const profile = useMatch('/profile');

  return (
    <header className={`pt-4 pb-4 ${headerStyles.header}`}>
      <div className={headerStyles.container}>
        <nav className={headerStyles.navigation}>
          <NavLink end to='/' className={({ isActive }) => isActive ? `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.link_active}` : 
              `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link}`} >
            <BurgerIcon  type={burgers ? "primary" : "secondary"}/>
            <span className="text text_type_main-default ml-2">Конструктор</span>
          </NavLink>
          <NavLink to='/profile/orders' className={({ isActive }) => isActive ? `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.link_active}` : 
              `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link}`} >
            <ListIcon type={orders ? "primary" : "secondary"} />
            <span className="text text_type_main-default ml-2">Лента заказов</span>
          </NavLink>
        </nav>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <NavLink end to='/profile' className={({ isActive }) => isActive ? `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.profile} ${headerStyles.link_active}` : 
              `pt-4 pl-5 pb-4 pr-5 ${headerStyles.link} ${headerStyles.profile}`} >
          <ProfileIcon type={profile ? "primary" : "secondary"} />
          <span className="text text_type_main-default ml-2">Личный кабинет</span>
        </NavLink>
      </div>
    </header>
  )
}

export default AppHeader;
import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

const Header = (props) => {
  const onButtonClick = event => {
    props.onChange(event.target.value);
  }

  return (
    <header className={ styles.header }>
      <div>
        <NavLink to="/index">
          LOGO
        </NavLink>
      </div>
      <nav className={ styles.nav }>
        <ul className={ styles['header-list'] }>
          <li className={ styles['header-item'] }>
            <NavLink to="/politics">
              Политика
            </NavLink>
          </li>
          <li className={ styles['header-item'] }>
            <NavLink to="/economy">
              Экономика
            </NavLink>
          </li>
          <li className={ styles['header-item'] }>
            <NavLink to="/world">
              В мире
            </NavLink>
          </li>
          <li className={ styles['header-item'] }>
            <NavLink to="/sport">
              Спорт
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

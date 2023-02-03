import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../../logo.png';
import Container from '../Container';

import styles from './Header.module.css';

const Header = (props) => {
  return (
    <header className={ styles.header }>
      <Container>
        <div className={ styles['header__top'] }>
          <button className={ styles['header__info'] }>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div>
            <NavLink to="/index">
              <img src={ logo } alt='Moldova News' />
            </NavLink>
          </div>
          <div>
            Weather
          </div>
        </div>
        <nav className={ styles['header__nav'] }>
          <ul className={ styles['header__list'] }>
            <li className={ styles['header__item'] }>
              <NavLink to="/politics" activeClassName={ styles.active }>
                Политика
              </NavLink>
            </li>
            <li className={ styles['header__item'] }>
              <NavLink to="/">
                Война Россия — Украина
              </NavLink>
            </li>
            <li className={ styles['header__item'] }>
              <NavLink to="/economics" activeClassName={ styles.active }>
                Экономика
              </NavLink>
            </li>
            <li className={ styles['header__item'] }>
              <NavLink to="/world" activeClassName={ styles.active }>
                В мире
              </NavLink>
            </li>
            <li className={ styles['header__item'] }>
              <NavLink to="/sport" activeClassName={ styles.active }>
                Спорт
              </NavLink>
            </li>
          </ul>
          <div className={ styles['header__add'] }>
            <NavLink to="/newArticle" activeClassName={ styles.active }>
              Добавить новость
            </NavLink>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;

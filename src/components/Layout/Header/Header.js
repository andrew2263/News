import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../../logo.png';
import Container from '../Container';
import Modal from '../../UI/Modal';
import Info from '../Info';

import styles from './Header.module.css';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openInfoHandler = () => {
    setIsOpen(true);
  };

  const closeInfoHandler = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      { isOpen && (
        <Modal type='info' onClose={ closeInfoHandler }>
          <Container>
            <Info onClose={ closeInfoHandler } />
          </Container>
        </Modal>
      ) }
      <header className={ styles.header }>
        <Container>
          <div className={ styles['header__top'] }>
            <button className={ styles['header__info'] } onClick={ openInfoHandler }>
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
              <a target="_blank" rel="noreferrer" href="https://nochi.com/weather/chisinau-17412">
                <img src="https://w.bookcdn.com/weather/picture/28_17412_1_20_3498db_250_2980b9_ffffff_ffffff_1_2071c9_ffffff_0_6.png?scode=32665&domid=589&anc_id=29365"  alt="booked.net"/>
              </a>
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
                <NavLink to="/war" activeClassName={ styles.active }>
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
    </React.Fragment>
  );
};

export default Header;

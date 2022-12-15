import React from 'react';

import styles from './Header.module.css';

const Header = (props) => {
  const onButtonClick = event => {
    props.onChange(event.target.value);
  }

  return (
    <header className={ styles.header }>
      <div>
        LOGO
      </div>
      <nav className={ styles.nav }>
        <ul className={ styles['header-list'] }>
          <li className={ styles['header-item'] }>
            <button value='po' onClick={ onButtonClick }>Политика</button>
          </li>
          <li className={ styles['header-item'] }>
            <button value='ec' onClick={ onButtonClick }>Экономика</button>
          </li>
          <li className={ styles['header-item'] }>
            <button value='world' onClick={ onButtonClick }>В мире</button>
          </li>
          <li className={ styles['header-item'] }>
            <button value='sport' onClick={ onButtonClick }>Спорт</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

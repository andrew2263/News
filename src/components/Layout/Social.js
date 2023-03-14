import React from 'react';

import styles from './Social.module.css';

const Social = () => {
  return (
    <React.Fragment>
      <div className={ styles.social }>
        <div className={ styles['social__networks'] }>
          <p>Наши социальные сети</p>
          <ul>
            <li>
              <a href='https://facebook.com/' className={ `${ styles['social__network'] } ${ styles['social__fb'] }` } aria-label='Facebook'>
              </a>
            </li>
            <li>
              <a href='https://t.me/' className={ `${ styles['socialNetwork'] } ${ styles['social__tg'] }` } aria-label='Telegram'>
              </a>
            </li>
            <li>
              <a href='https://instagram.com/' className={ `${ styles['social__network'] } ${ styles['social__ig'] }` } aria-label='Instagram'>
              </a>
            </li>
          </ul>
        </div>
        <div className={ styles.apps }>
          <ul>
            <li>
              <a href='https://play.google.com/' aria-label='Android App' className={ styles.googleplay }>
              </a>
            </li>
            <li>
              <a href='https://www.apple.com/app-store/' aria-label='Apple App' className={ styles.appstore }>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Social;

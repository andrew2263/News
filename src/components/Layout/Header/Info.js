import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Info.module.css';

const Info = props => {
  return (
    <React.Fragment>
      <button className={ styles['info__close'] } onClick={ props.onClose }>
        <span></span>
        <span></span>
      </button>
      <div className={ styles['info__content'] }>
        <div className={ styles['info__rubrics'] }>
          <table>
            <tbody>
              <tr>
                <td className={ styles['info__rubrics-name'] }>
                  Рубрики
                </td>
                <td>
                  <ul>
                    <li className={ styles['info__item'] }>
                      <NavLink to="/politics" activeClassName={ styles.active }>
                        Политика
                      </NavLink>
                    </li>
                    <li className={ styles['info__item'] }>
                      <NavLink to="/">
                        Война Россия — Украина
                      </NavLink>
                    </li>
                    <li className={ styles['info__item'] }>
                      <NavLink to="/economics" activeClassName={ styles.active }>
                        Экономика
                      </NavLink>
                    </li>
                    <li className={ styles['info__item'] }>
                      <NavLink to="/world" activeClassName={ styles.active }>
                        В мире
                      </NavLink>
                    </li>
                    <li className={ styles['info__item'] }>
                      <NavLink to="/sport" activeClassName={ styles.active }>
                        Спорт
                      </NavLink>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={ styles['info__contacts'] }>
          <div className={ styles['info__contacts-serv'] }>
            <div className={ styles['info__contacts-item'] }>
              <p>Служба поддержки</p>
              <p>
                <a href="tel:+37322777555">+373 (22) 777 555</a>
              </p>
              <p>
                <a href="mailto:support@newsmd.md">support@newsmd.md</a>
              </p>
            </div>
            <div className={ styles['info__contacts-item'] }>
              <p>Размещение рекламы</p>
              <p>
                <a href="tel:+37322777666">+373 (22) 777 666</a>
              </p>
              <p>
                <a href="mailto:sales@newsmd.md">sales@newsmd.md</a>
              </p>
            </div>
          </div>
          <div className={ styles['info__contacts-social'] }>
            <p>Наши социальные сети</p>
            <ul>
              <li>
                <a href='https://facebook.com/'>FB</a>
              </li>
              <li>
                <a href='https://t.me/'>TG</a>
              </li>
              <li>
                <a href='https://instagram.com/'>IG</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Info;

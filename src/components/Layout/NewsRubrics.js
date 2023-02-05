import React from 'react';

import { NavLink } from 'react-router-dom';
import styles from './NewsRubrics.module.css';

const NewsRubrics = (props) => {
  const rubricsContent = (
    <ul className={ styles.rubricList }>
      <li className={ styles.rubricItem }>
        <NavLink to="/politics" activeClassName={ styles.active }>
          Политика
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/">
          Война Россия — Украина
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/economics" activeClassName={ styles.active }>
          Экономика
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/world" activeClassName={ styles.active }>
          В мире
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/sport" activeClassName={ styles.active }>
          Спорт
        </NavLink>
      </li>
    </ul>
  );

  const storiesContent = (
    <ul className={ styles.rubricList }>
      <li className={ styles.rubricItem }>
        <NavLink to="/" activeClassName={ styles.active }>
          Цены на топливо
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/">
          Россия — Украина
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/" activeClassName={ styles.active }>
          Коронавирус
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/" activeClassName={ styles.active }>
          Нет войне
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/" activeClassName={ styles.active }>
          Цены на газ
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/" activeClassName={ styles.active }>
          Русский язык
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/" activeClassName={ styles.active }>
          ДТП в Молдове
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/" activeClassName={ styles.active }>
          Кишинёв
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/" activeClassName={ styles.active }>
          Приднестровье
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/" activeClassName={ styles.active }>
          Гагаузия
        </NavLink>
      </li>
      <li className={ styles.rubricItem }>
        <NavLink to="/" activeClassName={ styles.active }>
          Бельцы
        </NavLink>
      </li>
    </ul>
  );

  return (
    <React.Fragment>
      { props.content === 'rubrics' && rubricsContent }
      { props.content === 'stories' && storiesContent }
    </React.Fragment>
  );
};

export default NewsRubrics;

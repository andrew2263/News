import React from "react";

import { NavLink } from "react-router-dom";

import styles from "./NewsRubrics.module.scss";

const NewsRubrics = (props) => {
  const onClickHandler =
    props.element === "footer" ? props.onScroll : props.onClose;

  const rubricsContent = (
    <ul className={styles["rubric-list"]}>
      <li className={styles["rubric-item"]}>
        <NavLink
          to="/politics"
          activeClassName={styles.active}
          onClick={onClickHandler}
        >
          Политика
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink
          to="/war"
          activeClassName={styles.active}
          onClick={onClickHandler}
        >
          Война Россия — Украина
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink
          to="/economics"
          activeClassName={styles.active}
          onClick={onClickHandler}
        >
          Экономика
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink
          to="/world"
          activeClassName={styles.active}
          onClick={onClickHandler}
        >
          В мире
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink
          to="/sport"
          activeClassName={styles.active}
          onClick={onClickHandler}
        >
          Спорт
        </NavLink>
      </li>
    </ul>
  );

  const storiesContent = (
    <ul className={styles["rubric-list"]}>
      <li className={styles["rubric-item"]}>
        <NavLink to="/" activeClassName={styles.active} onClick={props.onClose}>
          Цены на топливо
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink to="/" onClick={props.onClose}>
          Россия — Украина
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink to="/" activeClassName={styles.active} onClick={props.onClose}>
          Коронавирус
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink to="/" activeClassName={styles.active} onClick={props.onClose}>
          Нет войне
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink to="/" activeClassName={styles.active} onClick={props.onClose}>
          Цены на газ
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink to="/" activeClassName={styles.active} onClick={props.onClose}>
          Русский язык
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink to="/" activeClassName={styles.active} onClick={props.onClose}>
          ДТП в Молдове
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink to="/" activeClassName={styles.active} onClick={props.onClose}>
          Кишинёв
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink to="/" activeClassName={styles.active} onClick={props.onClose}>
          Приднестровье
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink to="/" activeClassName={styles.active} onClick={props.onClose}>
          Гагаузия
        </NavLink>
      </li>
      <li className={styles["rubric-item"]}>
        <NavLink to="/" activeClassName={styles.active} onClick={props.onClose}>
          Бельцы
        </NavLink>
      </li>
    </ul>
  );

  return (
    <React.Fragment>
      {props.content === "rubrics" && rubricsContent}
      {props.content === "stories" && storiesContent}
    </React.Fragment>
  );
};

export default NewsRubrics;

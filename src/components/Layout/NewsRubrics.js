import React from "react";

import { NavLink } from "react-router-dom";

import { MAIN_RUBRICS, OTHER_RUBRICS } from "../../constants/NewsRubrics.Constant";

import styles from "./NewsRubrics.module.scss";

const NewsRubrics = (props) => {
  const onClickHandler =
    props.element === "footer" ? props.onScroll : props.onClose;

  const rubricsContent = (
    <ul className={styles["rubric-list"]}>
      {MAIN_RUBRICS.map((el) => (
        <li className={styles["rubric-item"]} key={el.category}>
          <NavLink
            to={el.link}
            activeClassName={styles.active}
            onClick={onClickHandler}
          >
            {el.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  const storiesContent = (
    <ul className={styles["rubric-list"]}>
      {OTHER_RUBRICS.map((el) => (
        <li className={styles["rubric-item"]} key={el.category}>
        <NavLink to={`/rubrics${el.link}`} activeClassName={styles.active} onClick={props.onClose}>
          {el.name}
        </NavLink>
      </li>
      ))}
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

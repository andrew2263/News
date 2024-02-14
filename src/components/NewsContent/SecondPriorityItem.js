import React, { Link } from "react-router-dom";

import NewsImage from "./NewsImage";

import { parseDateMonthNumber } from "../../helpers/parseDateMonth";

import styles from "./SecondPriorityItem.module.scss";

const SecondPriorityItem = (props) => {
  const image = props.images[0];

  return (
    <li
      className={styles["news__content-item"]}
      key={props.id}
    >
      <div
        className={
          props.priority === 2
            ? styles["news__content-info"]
            : `${styles["news__content-info"]} ${styles["news__content-info_small"]}`
        }
      >
        <div
          className={
            props.priority === 2
              ? styles["news__img-wrapper"]
              : `${styles["news__img-wrapper"]} ${styles["news__img-wrapper_small"]}`
          }
        >
          <Link to={`/${props.category}/${props.id}`} onClick={props.scroll}>
            <NewsImage src={image.href} alt={image.text} />
          </Link>
        </div>
        <div className={styles["news__info"]}>
          <h2>
            <Link to={`/${props.category}/${props.id}`} onClick={props.scroll}>
              {props.heading}
            </Link>
          </h2>
          <time className={styles["news__date"]}>
            {parseDateMonthNumber(props.date)}
          </time>
        </div>
      </div>
    </li>
  );
};

export default SecondPriorityItem;

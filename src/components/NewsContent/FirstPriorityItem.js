import React, { Link } from "react-router-dom";

import NewsImage from "./NewsImage";

import { parseDateMonthString } from "../../helpers/parseDateMonth";

import styles from "./FirstPriorityItem.module.scss";

const FirstPriorityItem = (props) => {
  const image = props.images[0];

  return (
    <li className={styles["news__content-item"]} key={props.id}>
      <div className={styles["news__content-info"]}>
        <div className={styles["news__img-wrapper"]}>
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
          <p className={styles["news__brief-text"]}>{props.briefText}</p>
          <time className={styles["news__date"]}>
            {parseDateMonthString(props.date)}
          </time>
        </div>
      </div>
    </li>
  );
};

export default FirstPriorityItem;

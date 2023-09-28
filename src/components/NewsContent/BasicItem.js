import React, { Link } from "react-router-dom";

import NewsImage from "./NewsImage";

import { parseDateMonthString } from "../../helpers/parseDateMonth";

import styles from "./BasicItem.module.scss";

const BasicItem = (props) => {
  const image = props.images[0];

  return (
    <li className={styles["news__content-item"]} key={props.id}>
      <h2 className={styles["news__content-heading"]}>
        <Link to={`/${props.category}/${props.id}`} onClick={props.scroll}>
          {props.heading}
        </Link>
      </h2>
      <div className={styles["news__content-info"]}>
        <div className={styles["news__img-wrapper"]}>
          <Link to={`/${props.category}/${props.id}`} onClick={props.scroll}>
            <NewsImage src={image.href} alt={image.text} />
          </Link>
        </div>
        <div>
          <p className={styles["news__brief-text"]}>{props.briefText}</p>
          <time className={styles["news__date"]}>
            {parseDateMonthString(props.date)}
          </time>
        </div>
      </div>
    </li>
  );
};

export default BasicItem;

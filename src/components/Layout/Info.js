import React from "react";

import NewsRubrics from "./NewsRubrics";
import Contacts from "./Contacts";
import Social from "./Social";

import styles from "./Info.module.scss";

const Info = (props) => {
  return (
    <React.Fragment>
      <div className={styles["info__close"]}>
        <button className={styles["info__close-button"]} onClick={props.onClose}>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className={styles["info__content"]}>
        <div className={styles["info__rubrics"]}>
          <table>
            <tbody>
              <tr>
                <td className={styles["info__rubrics-name"]}>Рубрики</td>
                <td>
                  <NewsRubrics
                    content="rubrics"
                    onClose={props.onClose}
                    element="info"
                  />
                </td>
              </tr>
              <tr>
                <td className={styles["info__rubrics-name"]}>Сюжеты</td>
                <td>
                  <NewsRubrics content="stories" onClose={props.onClose} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles["info__contacts"]}>
          <Contacts />
          <Social />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Info;

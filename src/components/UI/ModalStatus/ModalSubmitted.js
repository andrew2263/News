import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./ModalStatus.module.scss";

const ModalIsSubmitted = (props) => (
  <React.Fragment>
    <p className={styles["submit-msg"]}>Форма отправлена</p>
    <div className={styles["modal-buttons"]}>
      <button className={styles["modal-button"]} onClick={props.onClose}>
        OK
      </button>
      <NavLink className={styles["modal-button"]} to="/">
        Перейти к новостям
      </NavLink>
    </div>
  </React.Fragment>
);

export default ModalIsSubmitted;

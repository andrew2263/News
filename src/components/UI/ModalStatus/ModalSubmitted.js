import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./ModalStatus.module.scss";

const ModalIsSubmitted = ({ onClose, deleted = false }) => (
  <React.Fragment>
    <p className={styles["submit-msg"]}>
      {!deleted ? "Форма отправлена" : "Новость удалена"}
    </p>
    <div className={styles["modal-buttons"]}>
      <button className={styles["modal-button"]} onClick={onClose}>
        OK
      </button>
      {!deleted && (
        <NavLink className={styles["modal-button"]} onClick={onClose} to="/">
          Перейти к новостям
        </NavLink>
      )}
    </div>
  </React.Fragment>
);

export default ModalIsSubmitted;

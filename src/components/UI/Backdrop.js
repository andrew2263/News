import React from "react";

import styles from "./Modal.module.scss";

const Backdrop = (props) => (
  <div className={styles.backdrop} onClick={props.onClose}>
    {props.children}
  </div>
);

export default Backdrop;

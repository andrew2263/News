import React from "react";

import styles from "./ModalStatus.module.scss";

const ModalError = (props) => (
  <p className={styles.rror}>ERROR: {props.errorMessage}</p>
);

export default ModalError;

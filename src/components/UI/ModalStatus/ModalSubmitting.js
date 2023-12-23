import React from "react";

import styles from "./ModalStatus.module.scss";

const ModalSubmitting = ({ deleting = false }) => (
  <p className={styles["submit-msg"]}>
    {!deleting ? "Форма отправляется..." : "Новость удаляется..."}
  </p>
);

export default ModalSubmitting;

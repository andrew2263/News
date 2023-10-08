import React from "react";

import styles from "./Input.module.scss";

const Input = (props) => {
  const {
    type,
    name,
    id,
    value,
    onChange,
    onBlur,
    label,
    isTextarea = false,
    className,
    hasError,
    hasErrorMessage,
    placeholder,
  } = props;

  return (
    <div className={styles["input_container"]}>
      {hasError && (
        <p className={styles["invalid-info"]}>
          {hasErrorMessage}
        </p>
      )}
      <label htmlFor={id}>{label}</label>
      {isTextarea ? (
        <textarea
          className={`${styles.textarea} ${className ? className : ""}`}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`${styles.input} ${className ? className : ""}`}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default React.memo(Input);

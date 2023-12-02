import React from "react";

import styles from "./Input.module.scss";

const Input = (props) => {
  const {
    type,
    name,
    id,
    value = "",
    onChange,
    onBlur,
    label,
    isTextarea = false,
    className,
    hasError,
    hasErrorMessage,
    placeholder,
    disabled,
    required = false,
    isSighIn = false,
  } = props;

  return (
    <div className={styles["input_container"]}>
      {hasError && <p className={styles["invalid-info"]}>{hasErrorMessage}</p>}
      {label && (
        <label htmlFor={id}>
          {label}
          {required && !isSighIn && <span className={styles.required}>&nbsp;&nbsp;*</span>}
        </label>
      )}
      {isTextarea ? (
        <textarea
          className={`${styles.textarea} ${className ? className : ""}`}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
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
          disabled={disabled}
          required={required}
        />
      )}
    </div>
  );
};

export default React.memo(Input);

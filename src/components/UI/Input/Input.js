import React, { useState } from "react";

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
    isPassword = false,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const passwordType = showPassword ? "text" : "password";

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={styles["input_container"]}>
      {hasError && <p className={styles["invalid-info"]}>{hasErrorMessage}</p>}
      {label && (
        <label htmlFor={id}>
          {label}
          {required && !isSighIn && (
            <span className={styles.required}>&nbsp;&nbsp;*</span>
          )}
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
          className={`${styles.input} ${className ? className : ""} ${
            isPassword ? styles["input-password"] : ""
          }`}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={!isPassword ? type : passwordType}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
        />
      )}
      {isPassword && (
        <button
          className={styles["show-password"]}
          type="button"
          onClick={toggleShowPassword}
        >
          <img
            src={showPassword ? "/images/eye-slash.svg" : "/images/eye.svg"}
            alt="show"
          />
        </button>
      )}
    </div>
  );
};

export default React.memo(Input);

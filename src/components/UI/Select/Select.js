import React, { useState, useEffect, useRef } from "react";

import { useOutsideClick } from "../../../hooks/useOutsideClick";

import styles from "./Select.module.scss";

const Select = (props) => {
  const {
    isMulti = false,
    id,
    label,
    onChange,
    name,
    inputType,
    value = "",
    className,
    onFocus,
    initialOptions,
    changeBlur,
    hasError,
    hasErrorMessage,
    required = false,
    isCreatable = false,
  } = props;

  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const [inputText, setInputText] = useState(value);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState(initialOptions);
  const [selectedInex, setSelectedIndex] = useState(-1);
  const [multiInputValue, setMultiInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  useOutsideClick(selectRef, () => {
    if (showOptions) {
      setShowOptions(false);
    }
  });

  useEffect(() => {
    const handleWheel = (e) => e.preventDefault();
    if (inputRef && inputRef.current) {
      inputRef.current.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (inputRef && inputRef.current) {
        inputRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    if (!value.length) {
      setOptions(initialOptions);
    }
  }, [value]);

  useEffect(() => {
    if (isMulti) {
      const filtOptions = initialOptions.filter(
        (option) => value && !value?.some((val) => val.value === option.value)
      );

      setFilteredOptions(value.length ? filtOptions : initialOptions);
    }
  }, [value?.length]);

  const changeFocus = () => {
    if (onFocus) {
      onFocus();
    }
    if (inputRef.current) inputRef.current.focus();
    setShowOptions(true);
  };

  const filterOptions = (options, value) =>
    options.filter((option) => option.text.toLowerCase().includes(value));

  const onSelectOption = (val) => {
    if (!isMulti) {
      const event = {
        target: {
          value: val.text,
          name,
        },
      };

      setInputText(event.target.value);
      onChange(event);
    }
    if (isMulti) {
      const resValue = [...value, val];

      onChange(resValue);
    }
  };

  const inputChangeHandler = (event) => {
    const value = event.target?.value;

    if (isMulti) {
      setOptions(filterOptions(filteredOptions, value.toLowerCase()));

      setMultiInputValue(value);
    }

    if (!isMulti) {
      setOptions(filterOptions(initialOptions, value.toLowerCase()));
      setInputText(event.target.value);
      if (value) {
        onChange({
          target: {
            name: event.target.name,
            value: '',
          }
        });
      }
    }
  };

  const removeSelectedOption = (options, value) => {
    return options.filter((option) => option.value !== value);
  };

  const selectOptionHandler = (value) => {
    onSelectOption(options.find((el) => el.value === value));
    if (isMulti) {
      setOptions(removeSelectedOption(filteredOptions, value));
      setMultiInputValue("");
    } else {
      setOptions(removeSelectedOption(initialOptions, value));
      setShowOptions(false);
    }
  };

  const handleDeleteItem = (val) => {
    const resValue = value.filter((el) => el.value !== val.value);
    onChange(resValue);
  };

  const keyDownHandler = (event) => {
    if (event.key === "Tab") {
      setShowOptions(false);
    }

    if (event.key === "Enter" || event.key === "Return") {
      event.stopPropagation();
      event.preventDefault();
      if (selectedInex === -1) {
        setShowOptions((prev) => !prev);
      } else if (showOptions) {
        selectOptionHandler(options[selectedInex].value);
      }
    }

    if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => {
        setShowOptions(true);
        if (prevIndex + 1 < options.length) {
          event.preventDefault();
          return prevIndex + 1;
        } else if (options.length) {
          return 0;
        } else {
          return -1;
        }
      });
    }

    if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => {
        if (showOptions && prevIndex > 0) {
          event.preventDefault();
          return prevIndex - 1;
        } else if (showOptions) {
          setShowOptions(false);
          event.preventDefault();
          return -1;
        } else {
          return -1;
        }
      });
    }
  };

  const blurHandler = (event) => {
    if (!showOptions) {
      if (isCreatable) {
        onChange(event);
      } 
      else if (!value) {
        setInputText('');
      }
      changeBlur(event);
    }
  };

  return (
    <div className={styles["select_container"]} ref={selectRef}>
      {hasError && <p className={styles["invalid-info"]}>{hasErrorMessage}</p>}
      <div className={styles["select_wrapper"]}>
        {label && (
          <label htmlFor={id}>
            {label}
            {required && <span className={styles.required}>&nbsp;&nbsp;*</span>}
          </label>
        )}
        <div
          className={`${styles["select_value_container"]} ${
            isMulti && styles["select_value_container_multi"]
          }`}
        >
          {!isMulti ? (
            <input
              id={id}
              className={`${className ? className : ""}`}
              onChange={inputChangeHandler}
              value={inputText}
              name={name}
              type={inputType}
              onBlur={blurHandler}
              onKeyDown={keyDownHandler}
              onFocus={changeFocus}
              ref={inputRef}
              required={required}
            />
          ) : (
            <div
              className={`${styles["select_multi"]} ${
                className ? className : ""
              }`}
              tabIndex={0}
              onFocus={changeFocus}
              onBlur={changeBlur}
              onKeyDown={keyDownHandler}
            >
              <React.Fragment>
                {value && value.map((el, i) => (
                  <div key={i} className={styles["select_multi_option"]}>
                    <div>{el.text}</div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteItem(el);
                      }}
                      onFocus={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </React.Fragment>
              <div>
                <input
                  onChange={inputChangeHandler}
                  value={multiInputValue}
                  name={name}
                  type={inputType}
                  onBlur={() => setMultiInputValue("")}
                  required={required}
                />
              </div>
            </div>
          )}
          <div className={styles["select_indicators"]}>
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className={`${styles["select_indicator"]} ${
                showOptions ? styles["select_indicator_rotated"] : ""
              }`}
            >
              <path
                d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
                fill="#87949e"
              ></path>
            </svg>
          </div>
          {showOptions && !!options?.length && (
            <div className={styles["select_drop"]}>
              {options.map((el, index) => (
                <div
                  className={`${styles["select_drop_item"]} ${
                    index === selectedInex &&
                    styles["select_drop_item_selected"]
                  }`}
                  key={index}
                  onClick={() => {
                    selectOptionHandler(el.value);
                  }}
                >
                  {el.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Select);

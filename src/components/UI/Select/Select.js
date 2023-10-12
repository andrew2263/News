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
    value,
    className,
    onFocus,
    initialOptions,
    changeBlur,
    hasError,
    hasErrorMessage,
  } = props;

  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState(initialOptions);
  const [selectedInex, setSelectedIndex] = useState(-1);

  useOutsideClick(selectRef, () => {
    setShowOptions(false);
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

  const changeFocus = () => {
    if (onFocus) {
      onFocus();
    }
    if (inputRef.current) inputRef.current.focus();
    setShowOptions(true);
  };

  const filterOprions = (options, value) =>
    options.filter((option) => option.text.toLowerCase().includes(value));

  const onSelectOption = (val) => {
    if (!isMulti) {
      const event = {
        target: {
          value: val.text,
          name,
        },
      };

      onChange(event);
    }
    if (isMulti) {
      const resValue = [...value, val];

      onChange(resValue);
    }
  };

  const inputChangeHandler = (event) => {
    const value = event.target?.value;

    setOptions(filterOprions(initialOptions, value.toLowerCase()));
    onChange(event);
  };

  const removeSelectedOprion = (options, value) => {
    return options.filter((option) => option.value !== value);
  };

  const selectOptionHandler = (value) => {
    onSelectOption(options.find((el) => el.value === value));
    // setOptions(initialOptions.filter((option, i) => i !== index));
    if (isMulti) {
      setOptions((prevOptions) => removeSelectedOprion(prevOptions, value));
    } else {
      setOptions(removeSelectedOprion(initialOptions, value));
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
      if (selectedInex === -1) {
        setShowOptions((prev) => !prev);
      } else {
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
      })
    }
  };

  return (
    <div className={styles["select_container"]} ref={selectRef}>
      {hasError && <p className={styles["invalid-info"]}>{hasErrorMessage}</p>}
      <div className={styles["select_wrapper"]}>
        <label htmlFor={id}>{label}</label>
        <div
          className={`${styles["select_value_container"]} ${
            isMulti && styles["select_value_container_multi"]
          }`}
          // contentEditable={isMulti ? true : false}
          tabIndex={isMulti && 0}
          onFocus={(e) => {
            if (isMulti) {
              changeFocus(e);
            }
          }}
          onBlur={(e) => {
            if (isMulti) {
              changeBlur(e);
            }
          }}
          onKeyDown={(e) => {
            if (isMulti) {
              keyDownHandler(e);
            }
          }}
        >
          {!isMulti ? (
            <input
              id={id}
              className={`${className ? className : ""}`}
              onChange={inputChangeHandler}
              value={value}
              name={name}
              type={inputType}
              onBlur={changeBlur}
              onKeyDown={keyDownHandler}
              onFocus={changeFocus}
              ref={inputRef}
            />
          ) : (
            <React.Fragment>
              {value.map((el, i) => (
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

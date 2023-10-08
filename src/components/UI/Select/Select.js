import React, { useState, useEffect, useRef } from "react";
//import { useOnClickOutside } from '../../Hooks/useClickOutside';

import "./Select.module.scss";

function Select(props) {
  const {
    customLabel,
    error,
    onChange,
    onSelectOption,
    name,
    inputType,
    value,
    className,
    keepFocus = false,
    onFocus,
    // isFTL,
    options,
  } = props;

  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const [labelIsActive, setLabelIsActive] = useState(false);
  const [labelTransition, setLabelTransition] = useState(false);
  const [focused, setFocus] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // useOnClickOutside(selectRef, () => {
  //   setShowOptions(false);
  // });

  useEffect(() => {
    if (inputRef && inputRef.current ? inputRef.current.value.length : false) {
      setLabelIsActive(true);
    }
  }, []);

  useEffect(() => {
    if (value.length) {
      setLabelIsActive(true);
    }
  }, [value]);

  useEffect(() => {
    if (!value.length && !focused) {
      setLabelIsActive(false);
    }
  }, [value, focused]);

  useEffect(() => {
    if (customLabel) {
      setTimeout(() => {
        setLabelTransition(true);
      }, 500);
    }
  }, [customLabel]);

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

  function changeFocus() {
    if (onFocus) {
      onFocus();
    }
    if (inputRef.current) inputRef.current.focus();
    setFocus(true);
    setLabelIsActive(true);
    setShowOptions(true);
  }

  function changeBlur(event) {
    setFocus(keepFocus);
    if (!event.target.value) {
      setLabelIsActive(false);
    }
    // setShowOptions(false);
  }

  // function changeShowOptions() {
  //   setShowOptions((prevShowOptions) => !prevShowOptions);
  // }

  function handleSelectOption(index) {
    onSelectOption(options[index].value);
    setShowOptions(false);
  }

  return (
    <div className="select-position" ref={selectRef}>
      <div
        className={`select-position__container ${
          customLabel ? "input-custom-label" : ""
        } ${customLabel && labelIsActive ? "_active" : ""}`}
      >
        {customLabel && (
          <label
            className={`input-custom-label__label ${
              labelIsActive ? "_active" : ""
            } ${error ? "text-[#F44A77]" : ""} ${
              labelTransition ? "transition-all duration-200 ease-out" : ""
            } `}
            onClick={() => {
              changeFocus();
              setShowOptions(true);
            }}
          >
            {customLabel}
          </label>
        )}
        <input
          className={`select-position__container__input ${
            error ? "select-position__container__input_error" : ""
          } ${className ? className : ""}`}
          onChange={onChange}
          value={value}
          name={name}
          type={inputType}
          onBlur={changeBlur}
          onFocus={changeFocus}
          // onClick={changeShowOptions}
          ref={inputRef}
        />
      </div>
      <div className="select-position__indicators">
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
          className={`select-position__indicator ${
            showOptions ? "select-position__indicator_rotated" : ""
          }`}
        >
          <path
            d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
            fill="#87949e"
          ></path>
        </svg>
      </div>
      {showOptions && !!options?.length && (
        <div className="select-position__drop">
          {options.map((el, index) => (
            <div
              className="select-position__drop__item"
              key={index}
              onClick={() => {
                handleSelectOption(index);
              }}
            >
              {el.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(Select);

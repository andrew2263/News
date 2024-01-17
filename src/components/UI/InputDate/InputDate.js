import React from "react";

import DatePicker from "react-datepicker";

import styles from "./InputDate.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';

const InputDate = (props) => {
  const {
    id,
    name,
    value,
    onChange,
    label,
    onBlur,
    hasError,
    hasErrorMessage,
  } = props;

  const changeDateHandler = (value) => {
    const event = {
      target: { value, name },
    };
    onChange(event);
  };

  const blurHandler = () => {
    const event = {
      target: { value, name },
    };
    onBlur(event);
  };

  return (
    <div className={styles["date_container"]}>
      {hasError && <p className={styles["invalid-info"]}>{hasErrorMessage}</p>}
      <div className={styles["date_wrapper"]}>
        {label && <label htmlFor={id}>{label}</label>}
        <div>
          <DatePicker
            id={id}
            selected={value}
            onChange={changeDateHandler}
            onBlur={blurHandler}
            dateFormat="dd.MM.yyyy"
            openToDate={new Date("1989/01/01")}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            minDate={new Date(1920, 0, 1)}
            maxDate={new Date(2006, 11, 31)}
            locale={ru}
          />
        </div>
      </div>
    </div>
  );
};

export default InputDate;

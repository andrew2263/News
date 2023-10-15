import { useReducer, useCallback, useState, useEffect } from "react";

const formStateReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    const { name, value } = action.target;

    const valid = action.validate[name](value);
    const hasError = !valid && state[name].isTouched;

    return {
      ...state,
      [name]: {
        ...state[name],
        value,
        valid,
        hasError,
      },
    };
  }
  if (action.type === "INPUT_BLUR") {
    const { name } = action.target;
    return {
      ...state,
      [name]: {
        ...state[name],
        touched: true,
      },
    };
  }
  if (action.type === "RESET") {
    return action.payload;
  }
  return formStateReducer;
};

const useForm = (initialFormState, validateValue) => {
  const [formState, dispatch] = useReducer(formStateReducer, initialFormState);
  const [formValid, setFormValid] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [formHasError, setFormHasError] = useState({});

  const valueChangeHandler = useCallback((event) => {
    dispatch({
      type: "USER_INPUT",
      target: event.target,
      validate: validateValue,
    });
  }, []);

  const inputBlurHandler = useCallback((event) => {
    dispatch({ type: "INPUT_BLUR", target: event.target });
  }, []);

  const reset = () => {
    dispatch({ type: "RESET", payload: initialFormState });
  };

  const formFields = Object.keys(formState);

  useEffect(() => {
    const newFormValue = {};
    const newFormHasError = {};

    formFields.forEach((field) => {
      newFormValue[field] = formState[field].value;
      newFormHasError[field] = formState[field].hasError;
    });

    setFormHasError(newFormHasError);
    setFormValue(newFormValue);

    setFormValid(Object.values(formState).every((el) => el.valid));
  }, [formState]);

  return {
    value: formValue,
    isValid: formValid,
    hasError: formHasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useForm;

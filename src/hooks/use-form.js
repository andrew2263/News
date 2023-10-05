import { useReducer } from "react";

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

  const valueChangeHandler = (event) => {
    dispatch({ type: 'USER_INPUT', target: event.target, validate: validateValue });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: 'INPUT_BLUR', target: event.target });
  };

  const reset = () => {
    dispatch({ type: 'RESET', payload: initialFormState });
  };

  const formFields = Object.keys(formState);

  const formValue = {};
  const formHasError = {};

  formFields.forEach((field) => {
    formValue[field] = formState[field].value;
    formHasError[field] = formState[field].hasError;
  });

  const formValid = Object.values(formState).every((el) => el.valid);

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

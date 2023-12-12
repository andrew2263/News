import { useReducer, useCallback, useState, useEffect } from "react";

const formStateReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    const { name, value, required } = action.target;

    let valid;

    const isSameValue = name === "repeatPassword";

    if (!value) {
      const isEmptyValid = required ? false : true;
      valid =
        action.validate[name](value, isSameValue && state?.password) ||
        isEmptyValid;
    } else {
      valid = action.validate[name](value, isSameValue && state?.password);
    }

    const hasError = !valid && state[name].touched;

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
    const { name, value, required } = action.target;

    let valid;

    const isSameValue = name === "repeatPassword";

    if (!value) {
      const isEmptyValid = required ? false : true;
      valid =
        action.validate[name](value, isSameValue && state?.password) ||
        isEmptyValid;
    } else {
      valid = action.validate[name](value, isSameValue && state?.password);
    }

    const hasError = !valid;

    return {
      ...state,
      [name]: {
        ...state[name],
        touched: true,
        valid,
        hasError,
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

  const valueChangeHandler = useCallback((event) => {
    dispatch({
      type: "USER_INPUT",
      target: event.target,
      validate: validateValue,
    });
  }, []);

  const inputBlurHandler = useCallback((event) => {
    dispatch({
      type: "INPUT_BLUR",
      target: event.target,
      validate: validateValue,
    });
  }, []);

  const reset = () => {
    dispatch({ type: "RESET", payload: initialFormState });
  };

  useEffect(() => {
    setFormValid(Object.values(formState).every((el) => el.valid));
  }, [formState]);

  return {
    formState,
    isValid: formValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useForm;

import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false
};

const inputStateReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isTouched: state.isTouched
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isTouched: true
    };
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      isTouched: false
    };
  }
  return inputStateReducer;
}

const useInput = (validateValue, minLength, maxLength) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

  const valueIsValid = validateValue(inputState.value, minLength, maxLength);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = event => {
    dispatch({ type: 'USER_INPUT', val: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'INPUT_BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    minLength,
    maxLength
  };
};

export default useInput;

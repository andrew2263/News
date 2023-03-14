export const filesReducer = (state, action) => {
  const fileTypes = ['image/png', 'image/jpeg', 'image/webp'];

  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      files: action.files,
      isValid: action.val !== '' && Array.from(action.files).every(file => {
        return fileTypes.some(el => el === file.type);
      }),
      isTouched: state.isTouched
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      files: state.files,
      isValid: state.value !== '' && Array.from(state.files).every(file => {
        return fileTypes.some(el => el === file.type);
      }),
      isTouched: true
    };
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      files: '',
      isTouched: false,
      isValid: undefined
    }
  }
  return { value: '', files: '', isValid: false, isTouched: true };
};

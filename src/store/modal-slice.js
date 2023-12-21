import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    show: false,
    type: '',
    text: '',
  },
  reducers: {
    setOpenModal(state, action) {
      document.body.style.overflow = 'hidden';

      state.show = true;
      state.type = action.payload?.type;
      state.text = action.payload?.text;
    },
    setCloseModal(state) {
      document.body.style.removeProperty('overflow');

      state.show = false;
      state.type = '';
      state.text = '';
    }
  }
});

export const modalActions = modalSlice.actions;

export default modalSlice;

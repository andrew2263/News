import { configureStore } from "@reduxjs/toolkit";

import contentSlice from './content-slice';
import modalSlice from './modal-slice.js';

const store = configureStore({
  reducer: {
    content: contentSlice.reducer,
    modal: modalSlice.reducer,
  }
});

export default store;

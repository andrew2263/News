import { configureStore } from "@reduxjs/toolkit";

import contentSlice from './content-slice';
import modalSlice from './modal-slice';
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    content: contentSlice.reducer,
    modal: modalSlice.reducer,
    auth: authSlice.reducer,
  }
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

import contentSlice from './content-slice';

const store = configureStore({
  reducer: {
    content: contentSlice.reducer,
  }
});

export default store;

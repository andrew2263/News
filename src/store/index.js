import { configureStore } from "@reduxjs/toolkit";

import contentSlice from './content-slice';

const store = configureStore({
  reducer: {
   // comments: commentsSlice.reducer,
    content: contentSlice.reducer,
  }
});

export default store;
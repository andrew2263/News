import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isLoggedIn: false,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
  }
});

export const authActions = authSlice.actions;

export default authSlice;

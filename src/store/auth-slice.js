import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isLoggedIn: false,
    me: {},
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.me = {};
    },
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.me = action.payload.me;
    },
  }
});

export const authActions = authSlice.actions;

export default authSlice;

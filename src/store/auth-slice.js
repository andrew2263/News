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
    },
    setMe(state, action) {
      const meObject = action.payload.data;
      const meData = Object.keys(meObject)[0];
      state.me = meObject[meData];
    },
  }
});

export const authActions = authSlice.actions;

export default authSlice;

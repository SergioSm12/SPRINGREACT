import { createSlice } from "@reduxjs/toolkit";

//Definimos estado inicial
const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  isAdmin: false,
  user: undefined,
  isloginLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialLogin,
  reducers: {
    onLogin: (state, action) => {
      state.isAuth = true;
      state.isAdmin = action.payload.isAdmin;
      state.user = action.payload.user;
      state.isloginLoading = false;
    },

    onLogout: (state) => {
      state.isAuth = false;
      state.isAdmin = false;
      state.user = undefined;
      state.isloginLoading = false;
    },

    onInitLogin: (state) => {
      state.isloginLoading = true;
    },
  },
});

export const { onLogin, onLogout, onInitLogin } = authSlice.actions;

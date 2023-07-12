import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/users/auth/authSlice";

export const store = configureStore({
    reducer:{
        users:usersSlice.reducer,
        auth:authSlice.reducer
    }
})
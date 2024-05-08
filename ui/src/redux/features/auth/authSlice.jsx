import { createSlice } from "@reduxjs/toolkit";
import { authLogin } from "./authActions";
import {
  initialState,
  fulfilledState,
  pendingState,
  rejectedState,
} from "../../utils/commonStates";

// Action Builders
const authLoginBuilder = (builder) => {
  builder.addCase(authLogin.pending, (state, action) => {
    Object.assign(state, pendingState);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  });
  builder.addCase(authLogin.fulfilled, (state, action) => {
    Object.assign(state, fulfilledState);

    state.accessToken = action.payload.access;
    state.refreshToken = action.payload.refresh;

    localStorage.setItem("accessToken", action.payload.access);
    localStorage.setItem("refreshToken", action.payload.refresh);
  });
  builder.addCase(authLogin.rejected, (state, action) => {
    Object.assign(state, rejectedState);
    state.error = action.payload;

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  });
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    success: localStorage.getItem("accessToken") ? true : false,
  },
  reducers: {
    authLogout: (state) => {
      Object.assign(state, initialState);
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    // Auth Action Builders
    authLoginBuilder(builder);
  },
});

export const { authLogout } = authSlice.actions;

export default authSlice.reducer;

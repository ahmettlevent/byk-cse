import { createSlice } from "@reduxjs/toolkit";
import { userGet } from "./userAction";

const initialState = {
  firstName: null,
  lastName: null,
  username: null,
  email: null,
  isActive: false,
  isSuperuser: false,

  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userReset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userGet.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(userGet.fulfilled, (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isActive = action.payload.isActive;
      state.isSuperuser = action.payload.isSuperuser;

      state.loading = false;
      state.success = true;
    });
    builder.addCase(userGet.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const { userReset } = userSlice.actions;

export default userSlice.reducer;

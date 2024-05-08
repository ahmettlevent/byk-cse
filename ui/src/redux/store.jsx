import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import uavReducer from "./features/uav/uavSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    uav: uavReducer,
  },
});

export default store;
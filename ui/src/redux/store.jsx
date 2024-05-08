import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import uavReducer from "./features/uav/uavSlice";
import rentalReducer from "./features/rental/rentalSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    uav: uavReducer,
    rental: rentalReducer,
  },
});

export default store;
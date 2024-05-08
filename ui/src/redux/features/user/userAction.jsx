import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import store from "../../store";
import { authLogout } from "../auth/authSlice";
import { getBaseURL } from "../../../helpers/baseUrl";

const reqConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const userGet = createAsyncThunk(
  "user/get",
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      const user = await axios.get(`${getBaseURL()}/user/me/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...reqConfig.headers,
        },
      });

      return {
        firstName: user.data.first_name,
        lastName: user.data.last_name,
        username: user.data.username,
        email: user.data.email,
        isActive: user.data.is_active,
        isSuperuser: user.data.is_superuser,
        dateJoined: user.data.date_joined,
      };
    } catch (error) {
      if (error.response && error.response.data.detail) {
        if (error.response.status === 401) {
          store.dispatch(authLogout());
        }
        return rejectWithValue(error.response.data.detail);
      }

      return rejectWithValue(error.message);
    }
  }
);

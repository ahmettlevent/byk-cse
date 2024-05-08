import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getBaseURL } from "../../helpers/baseUrl";
import { authLogout } from "../features/auth/authSlice";
import store from "../store";

export const createDynamicAsyncThunkPost = (
  type,
  endpoint,
  successCallback,
  errorCallback
) => {
  return createAsyncThunk(
    type,
    async ({ data, customUrl }, { rejectWithValue, getState }) => {
      try {
        const accessToken = getState().auth.accessToken;
        const response = await axios.post(
          `${getBaseURL()}/${customUrl || endpoint}`,
          data || {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        successCallback && successCallback(response.data);

        return response.data;
      } catch (error) {
        errorCallback && errorCallback(error);
        if (error.response && error.response.data) {
          if (error.response.status === 401) {
            store.dispatch(authLogout());
          }

          let errorMessage = "";
          for (const key in error.response.data) {
            errorMessage += `${error.response.data[key]}\n`;
          }
          return rejectWithValue(errorMessage);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );
};

export const createDynamicAsyncThunkGet = (
  type,
  endpoint,
  successCallback,
  errorCallback
) => {
  return createAsyncThunk(
    type,
    async (customEndpoint, { rejectWithValue, getState }) => {
      try {
        const accessToken = getState().auth.accessToken;
        const response = await axios.get(
          `${getBaseURL()}/${customEndpoint || endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        successCallback && successCallback(response.data);

        return response.data;
      } catch (error) {
        errorCallback && errorCallback(error);
        if (error.response && error.response.data) {
          if (error.response.status === 401) {
            store.dispatch(authLogout());
          }

          let errorMessage = "";
          for (const key in error.response.data) {
            errorMessage += `${error.response.data[key]}\n`;
          }
          return rejectWithValue(errorMessage);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );
};

// PUT
export const createDynamicAsyncThunkPut = (
  type,
  endpoint,
  successCallback,
  errorCallback
) => {
  return createAsyncThunk(
    type,
    async ({ data, customUrl }, { rejectWithValue, getState }) => {
      try {
        const accessToken = getState().auth.accessToken;
        const response = await axios.put(
          `${getBaseURL()}/${customUrl || endpoint}`,
          data || {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        successCallback && successCallback(response.data);

        return response.data;
      } catch (error) {
        errorCallback && errorCallback(error);
        if (error.response && error.response.data) {
          if (error.response.status === 401) {
            store.dispatch(authLogout());
          }

          let errorMessage = "";
          for (const key in error.response.data) {
            errorMessage += `${error.response.data[key]}\n`;
          }
          return rejectWithValue(errorMessage);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );
};

// DELETE 
export const createDynamicAsyncThunkDelete = (
  type,
  endpoint,
  successCallback,
  errorCallback
) => {
  return createAsyncThunk(
    type,
    async ({ customUrl }, { rejectWithValue, getState }) => {
      try {
        const accessToken = getState().auth.accessToken;
        const response = await axios.delete(
          `${getBaseURL()}/${customUrl || endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        successCallback && successCallback(response.data);

        return response.data;
      } catch (error) {
        errorCallback && errorCallback(error);
        if (error.response && error.response.data) {
          if (error.response.status === 401) {
            store.dispatch(authLogout());
          }

          let errorMessage = "";
          for (const key in error.response.data) {
            errorMessage += `${error.response.data[key]}\n`;
          }
          return rejectWithValue(errorMessage);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );
}

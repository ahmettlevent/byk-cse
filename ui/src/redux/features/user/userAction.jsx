import {
  createDynamicAsyncThunkGet,
  createDynamicAsyncThunkPost,
} from "../../utils/createDynamicAsyncThunk";

export const userGet = createDynamicAsyncThunkGet("user/get", "user/me/");

export const userRegister = createDynamicAsyncThunkPost(
  "user/register",
  "user/register/"
);

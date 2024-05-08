import store from "../../store";
import { createDynamicAsyncThunkPost } from "../../utils/createDynamicAsyncThunk";
import { userGet } from "../user/userAction";

const authLoginSuccessCallback = () => {
  console.log("Hey, You are logged in!");
};

const authLoginErrorCallback = () => {
  // TODO : Implement snackbar here to show error message.
  console.log("There was an error logging in.");
};

export const authLogin = createDynamicAsyncThunkPost(
  "auth/login",
  "auth/token/",
  authLoginSuccessCallback,
  authLoginErrorCallback
);

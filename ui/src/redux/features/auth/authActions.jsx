import store from "../../store";
import { createDynamicAsyncThunkPost } from "../../utils/createDynamicAsyncThunk";
import { userGet } from "../user/userAction";

const authLoginSuccessCallback = (data) => {
  store.dispatch(userGet({ accessToken: data.access }));
};

export const authLogin = createDynamicAsyncThunkPost(
  "auth/login",
  "auth/token/",
  authLoginSuccessCallback
);

import {
  createDynamicAsyncThunkGet,
  createDynamicAsyncThunkPost,
} from "../../utils/createDynamicAsyncThunk";

let userCreateSuccessCallback = (data) => {
  alert("User created successfully!");
}
let userCreateErrorCallback = (data) => {
  if (data.response.data.detail) alert(data.response.data.detail);
  else alert("There was an error creating the user.");

}

export const userGet = createDynamicAsyncThunkGet("user/get", "user/me/");

export const userRegister = createDynamicAsyncThunkPost(
  "user/register",
  "user/register/",
  userCreateSuccessCallback,
  userCreateErrorCallback,
  false
);

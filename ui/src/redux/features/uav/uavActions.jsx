import {
  createDynamicAsyncThunkGet,
  createDynamicAsyncThunkPost,
} from "../../utils/createDynamicAsyncThunk";

export const uavList = createDynamicAsyncThunkGet("uav/list", "uav/");
export const uavPost = createDynamicAsyncThunkPost("uav/post", "uav/create/");

export const uavCategoryList = createDynamicAsyncThunkGet(
  "uav/categoryList",
  "uav/category/"
);

export const uavCategoryPost = createDynamicAsyncThunkPost(
  "uav/categoryPost",
  "uav/category/create/"
);

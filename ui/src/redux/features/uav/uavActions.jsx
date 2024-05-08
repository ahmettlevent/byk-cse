import store from "../../store";
import {
  createDynamicAsyncThunkDelete,
  createDynamicAsyncThunkGet,
  createDynamicAsyncThunkPost,
} from "../../utils/createDynamicAsyncThunk";
import { rentalList } from "../rental/rentalActions";

// UAV

let uavDeleteSuccessCallback = (data) => {
  store.dispatch(uavList());
  store.dispatch(rentalList());
};

export const uavList = createDynamicAsyncThunkGet("uav/list", "uav/");
export const uavPost = createDynamicAsyncThunkPost("uav/post", "uav/create/");
export const uavDelete = createDynamicAsyncThunkDelete(
  "uav/delete",
  null,
  uavDeleteSuccessCallback
);

// UAV Category

let uavCategoryDeleteSuccessCallback = (data) => {
  store.dispatch(uavCategoryList());
  store.dispatch(uavList());
  store.dispatch(rentalList());
};

export const uavCategoryList = createDynamicAsyncThunkGet(
  "uav/categoryList",
  "uav/category/"
);

export const uavCategoryPost = createDynamicAsyncThunkPost(
  "uav/categoryPost",
  "uav/category/create/"
);

export const uavCategoryDelete = createDynamicAsyncThunkDelete(
  "uav/categoryDelete",
  null,
  uavCategoryDeleteSuccessCallback
);

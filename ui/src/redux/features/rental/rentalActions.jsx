import store from "../../store";
import {
  createDynamicAsyncThunkGet,
  createDynamicAsyncThunkPost,
  createDynamicAsyncThunkDelete,
  createDynamicAsyncThunkPut,
} from "../../utils/createDynamicAsyncThunk";
import { uavList } from "../uav/uavActions";

let rentalUpdateDeleteSuccessCallback = (data) => {
  store.dispatch(uavList());
  store.dispatch(rentalList());
};

export const rentalList = createDynamicAsyncThunkGet("rental/list", "rental/");
export const rentalPost = createDynamicAsyncThunkPost(
  "rental/post",
  "rental/create/"
);
export const rentalDelete = createDynamicAsyncThunkDelete(
  "rental/delete",
  null,
  rentalUpdateDeleteSuccessCallback
);

export const rentalUpdate = createDynamicAsyncThunkPut(
  "rental/update",
  null,
  rentalUpdateDeleteSuccessCallback
);

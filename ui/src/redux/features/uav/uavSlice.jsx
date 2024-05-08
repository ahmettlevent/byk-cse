import { createSlice } from "@reduxjs/toolkit";
import {
  uavCategoryList,
  uavCategoryPost,
  uavList,
  uavPost,
} from "./uavActions";
import {
  initialState,
  fulfilledState,
  pendingState,
  rejectedState,
} from "../../utils/commonStates";

// UAV Action Builders
const uavListBuilder = (builder) => {
  builder.addCase(uavList.pending, (state, action) => {
    Object.assign(state, pendingState);
  });
  builder.addCase(uavList.fulfilled, (state, action) => {
    Object.assign(state, fulfilledState);
    state.uavs = action.payload;
  });
  builder.addCase(uavList.rejected, (state, action) => {
    Object.assign(state, rejectedState);
    state.error = action.payload;
  });
};

const uavPostBuilder = (builder) => {
  builder.addCase(uavPost.pending, (state, action) => {
    Object.assign(state, pendingState);
  });
  builder.addCase(uavPost.fulfilled, (state, action) => {
    Object.assign(state, fulfilledState);
    state.uavs.push(action.payload);
  });
  builder.addCase(uavPost.rejected, (state, action) => {
    Object.assign(state, rejectedState);
    state.error = action.payload;
  });
};

// UAV Category Action Builders
const uavCategoryListBuilder = (builder) => {
  builder.addCase(uavCategoryList.pending, (state, action) => {
    Object.assign(state, pendingState);
  });
  builder.addCase(uavCategoryList.fulfilled, (state, action) => {
    Object.assign(state, fulfilledState);
    state.categories = action.payload;
  });
  builder.addCase(uavCategoryList.rejected, (state, action) => {
    Object.assign(state, rejectedState);
    state.error = action.payload;
  });
};

const uavCategoryPostBuilder = (builder) => {
  builder.addCase(uavCategoryPost.pending, (state, action) => {
    Object.assign(state, pendingState);
  });
  builder.addCase(uavCategoryPost.fulfilled, (state, action) => {
    Object.assign(state, fulfilledState);
    state.categories.push(action.payload);
  });
  builder.addCase(uavCategoryPost.rejected, (state, action) => {
    Object.assign(state, rejectedState);
    state.error = action.payload;
  });
};

// Slice
const uavSlice = createSlice({
  name: "uav",
  initialState: {
    ...initialState,
    uavs: [],
    categories: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // UAV Actions
    uavListBuilder(builder);
    uavPostBuilder(builder);

    // UAV Category Actions
    uavCategoryListBuilder(builder);
    uavCategoryPostBuilder(builder);
  },
});

export default uavSlice.reducer;

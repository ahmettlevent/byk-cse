import { createSlice } from "@reduxjs/toolkit";
import {
  rentalDelete,
  rentalList,
  rentalPost,
} from "./rentalActions";
import {
  initialState,
  fulfilledState,
  pendingState,
  rejectedState,
} from "../../utils/commonStates";

// UAV Action Builders
const rentalListBuilder = (builder) => {
  builder.addCase(rentalList.pending, (state, action) => {
    Object.assign(state, pendingState);
  });
  builder.addCase(rentalList.fulfilled, (state, action) => {
    Object.assign(state, fulfilledState);
    state.rentals = action.payload;
  });
  builder.addCase(rentalList.rejected, (state, action) => {
    Object.assign(state, rejectedState);
    state.error = action.payload;
  });
};

const rentalPostBuilder = (builder) => {
  builder.addCase(rentalPost.pending, (state, action) => {
    Object.assign(state, pendingState);
  });
  builder.addCase(rentalPost.fulfilled, (state, action) => {
    Object.assign(state, fulfilledState);
    state.rentals.push(action.payload);
  });
  builder.addCase(rentalPost.rejected, (state, action) => {
    Object.assign(state, rejectedState);
    state.error = action.payload;
  });
}

const rentalDeleteBuilder = (builder) => {
  builder.addCase(rentalDelete.pending, (state, action) => {
    Object.assign(state, pendingState);
  });
  builder.addCase(rentalDelete.fulfilled, (state, action) => {
    Object.assign(state, fulfilledState);
    state.rentals = state.rentals.filter(
      (rental) => rental.id !== action.payload
    );
  });
  builder.addCase(rentalDelete.rejected, (state, action) => {
    Object.assign(state, rejectedState);
    state.error = action.payload;
  });
};

// Slice
const rentalSlice = createSlice({
  name: "uav",
  initialState: {
    ...initialState,
    rentals: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // UAV Rentals Action Builders
    rentalListBuilder(builder);
    rentalPostBuilder(builder);
    rentalDeleteBuilder(builder);

  },
});

export default rentalSlice.reducer;

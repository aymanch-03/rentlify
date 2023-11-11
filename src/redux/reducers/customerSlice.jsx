/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const listCustomers = createAsyncThunk(
  "customers/listCustomers",
  async (customers) => {
    const request = await axios.get("/customers", customers, {
      withCredentials: true,
    });
    const response = await request.data.data;
    return response;
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    data: [],
    isLoading: false,
  },
  //   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listCustomers.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(listCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.isLoading = false;
        // console.log(action.payload);
      })
      .addCase(listCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        console.log(action.error.message);
      });
  },
});

export default customerSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTableData,
  getSizeVariants,
  getStyleVariants,
} from "@/services/thunks/tableApis";
import getProductJson from "@/jsons/getProducts.json";
import getStyleVariantJson from "@/jsons/getStyleVariants.json";
import getSizeVariantJson from "@/jsons/getSizeVariants.json";

type IGatewaySlice = {
  status: "loading" | "succeeded" | "failed";
  data: any;
  styleVariants: any;
  sizeVariants: any;
  error: string;
};

const initialState = {
  data: JSON.parse(JSON.stringify(getProductJson)),
  styleVariants: JSON.parse(JSON.stringify(getStyleVariantJson)),
  sizeVariants: JSON.parse(JSON.stringify(getSizeVariantJson)),
  error: "",
} as IGatewaySlice;

export const gatewaySlice = createSlice({
  name: "gateway",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // fetchTableData
      .addCase(fetchTableData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // fetch style variants
      .addCase(getStyleVariants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStyleVariants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.styleVariants = action.payload;
      })
      .addCase(getStyleVariants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // fetch size variants
      .addCase(getSizeVariants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSizeVariants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sizeVariants = action.payload;
      })
      .addCase(getSizeVariants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const {} = gatewaySlice.actions;
export default gatewaySlice.reducer;

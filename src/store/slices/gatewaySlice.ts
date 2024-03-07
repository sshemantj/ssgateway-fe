import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import pdJson from "@/jsons/pd.json";
import styleVariants from "@/jsons/styleVariants.json";
import { fetchTableData } from "@/services/thunks/tableApis";

type IGatewaySlice = {
  status: "loading" | "succeeded" | "failed";
  value: any;
  data: any;
  styleVariants: any;
  error: string;
  allHeights: any;
  singleItem: any;
};

const initialState = {
  value: JSON.parse(JSON.stringify(pdJson as unknown as string)),
  data: {},
  styleVariants: JSON.parse(JSON.stringify(styleVariants)),
  singleItem: {},
  error: "",
  allHeights: {
    level: {
      1: 0,
    },
  },
} as IGatewaySlice;

export const gatewaySlice = createSlice({
  name: "gateway",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<any>) => {
      state.singleItem = action.payload;
    },
    updateHeights: (state, action: PayloadAction<any>) => {
      state.allHeights = action.payload;
    },
  },
  extraReducers(builder) {
    builder
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
      });
  },
});

export const {
  increment,
  incrementByAmount,
  updateHeights,
  setCurrentProduct,
} = gatewaySlice.actions;
export default gatewaySlice.reducer;

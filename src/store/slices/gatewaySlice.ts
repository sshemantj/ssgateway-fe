import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTableData } from "@/services/thunks/tableApis";
import pdJson from "@/jsons/pd.json";
import styleVariants from "@/jsons/styleVariants.json";
import sizeVariants from "@/jsons/sizeVariants.json";

type IGatewaySlice = {
  status: "loading" | "succeeded" | "failed";
  value: any;
  data: any;
  styleVariants: any;
  sizeVariants: any;
  error: string;
  allHeights: any;
  singleItem: any;
};

const initialState = {
  value: JSON.parse(JSON.stringify(pdJson as unknown as string)),
  styleVariants: JSON.parse(JSON.stringify(styleVariants)),
  sizeVariants: JSON.parse(JSON.stringify(sizeVariants)),
  data: {},
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
    setCurrentProduct: (state, action: PayloadAction<any>) => {
      state.singleItem = action.payload;
    },
    updateHeights: (state, action: PayloadAction<any>) => {
      state.allHeights = action.payload;
    },
  },
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
      });
  },
});

export const { updateHeights, setCurrentProduct } = gatewaySlice.actions;
export default gatewaySlice.reducer;

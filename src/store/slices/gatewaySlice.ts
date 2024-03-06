import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import pdJson from "@/jsons/tree.json";

type IGatewaySlice = {
  value: number;
  allHeights: any;
};

const initialState = {
  value: JSON.parse(JSON.stringify(pdJson as unknown as string)),
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
    updateHeights: (state, action: PayloadAction<any>) => {
      state.allHeights = action.payload;
    },
  },
});

export const { increment, incrementByAmount, updateHeights } =
  gatewaySlice.actions;
export default gatewaySlice.reducer;

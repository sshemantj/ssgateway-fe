import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import pdJson from "@/jsons/tree.json";

type IGatewaySlice = {
  value: number;
  product: any;
};

const initialState = {
  value: JSON.parse(JSON.stringify(pdJson as unknown as string)),
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
  },
});

export const { increment, incrementByAmount } = gatewaySlice.actions;
export default gatewaySlice.reducer;

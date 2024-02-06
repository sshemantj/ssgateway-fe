import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProducts {
  name: string;
  id: string;
}

type IProcessState = {
  productList: IProducts[];
};

const initialState = {
  productList: [],
} as IProcessState;

export const process = createSlice({
  name: "process",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProducts>) => {
      state.productList.push(action.payload);
    },
    reset: () => initialState,
  },
});

export const { addProduct, reset } = process.actions;
export default process.reducer;

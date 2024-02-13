import { handleAddProduct, handleRemoveProduct } from "@/utils/pdMethods";
import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

export interface IProduct {
  name: string;
  id: string;
  quantity?: number;
}

type IProcessState = {
  productList: IProduct[];
};

const initialState = {
  productList: [],
} as IProcessState;

export const process = createSlice({
  name: "process",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.productList = handleAddProduct(action.payload, state.productList);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.productList = handleRemoveProduct(
        action.payload,
        state.productList
      );
    },
    reset: () => initialState,
  },
});

export const { addProduct, removeProduct, reset } = process.actions;
export default process.reducer;

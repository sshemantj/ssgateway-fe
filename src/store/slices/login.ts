import { createSlice } from "@reduxjs/toolkit";

interface IloginSlice {
  token: string | null;
}

const initialState = {
  token: "null",
} as IloginSlice;

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = login.actions;
export default login.reducer;

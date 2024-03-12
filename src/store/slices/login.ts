import { callLogin } from "@/services/thunks/loginApi";
import { createSlice } from "@reduxjs/toolkit";

interface IloginSlice {
  status: "loading" | "succeeded" | "failed" | null;
  token: string | null;
  error: string | null;
}

const initialState = {
  status: null,
  token: null,
  error: null,
} as IloginSlice;

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // callLogin
      .addCase(callLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(callLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.accessToken;
      })
      .addCase(callLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const { setToken } = login.actions;
export default login.reducer;

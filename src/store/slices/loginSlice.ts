import { callLogin } from "@/services/thunks/loginApi";
import { createSlice } from "@reduxjs/toolkit";

interface IloginSlice {
  showLoginModal: boolean;
  status: "loading" | "succeeded" | "failed" | null;
  error: string | null;
}

const initialState = {
  showLoginModal: false,
  status: null,
  error: null,
} as IloginSlice;

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.showLoginModal = true;
    },
    closeLoginModal: (state) => {
      state.showLoginModal = false;
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
      })
      .addCase(callLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const { openLoginModal, closeLoginModal } = login.actions;
export default login.reducer;

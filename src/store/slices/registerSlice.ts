import { createUser } from "@/services/thunks/tableApis";
import { createSlice } from "@reduxjs/toolkit";

interface ICreateUserSlice {
  status: "loading" | "succeeded" | "failed" | null;
  error: string | null;
}

const initialState = {
  status: null,
  error: null,
} as ICreateUserSlice;

export const register = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = null;
      state.error = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
        // throw new Error(action.error.message);
      });
  },
});

export const { resetState } = register.actions;
export default register.reducer;

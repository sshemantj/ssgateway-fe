import { createSlice } from "@reduxjs/toolkit";

interface IMenu {
  showBackInNavbar: boolean;
}

const initialState = {
  showBackInNavbar: false,
} as IMenu;

export const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    showBackNavbar: (state) => {
      state.showBackInNavbar = true;
    },
    hideBackNavbar: (state) => {
      state.showBackInNavbar = false;
    },
  },
});

export const { showBackNavbar, hideBackNavbar } = menu.actions;
export default menu.reducer;

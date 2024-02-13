import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import processSlice from "./slices/processSlice";
import menu from "./slices/menu";

const rootReducer = combineReducers({
  counter: counterReducer,
  process: processSlice,
  menu: menu,
});

export { rootReducer };

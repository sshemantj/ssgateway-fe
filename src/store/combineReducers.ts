import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import menu from "./slices/menu";

const rootReducer = combineReducers({
  counter: counterReducer,
  menu: menu,
});

export { rootReducer };

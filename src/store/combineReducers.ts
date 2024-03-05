import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import menu from "./slices/menu";
import gatewaySlice from "./slices/gatewaySlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  menu,
  gateway: gatewaySlice,
});

export { rootReducer };

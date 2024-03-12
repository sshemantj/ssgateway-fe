import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import gatewaySlice from "./slices/gatewaySlice";
import menu from "./slices/menu";
import login from "./slices/login";

const rootReducer = combineReducers({
  menu,
  login,
  gateway: gatewaySlice,
  counter: counterReducer,
});

export { rootReducer };

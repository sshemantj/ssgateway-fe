import { combineReducers } from "@reduxjs/toolkit";
import gatewaySlice from "./slices/gatewaySlice";
import login from "./slices/loginSlice";
import menu from "./slices/menu";
import register from "./slices/registerSlice";

const rootReducer = combineReducers({
  menu,
  login,
  register,
  gateway: gatewaySlice,
});

export { rootReducer };

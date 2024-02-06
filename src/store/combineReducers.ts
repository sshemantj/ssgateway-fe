import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import processSlice from "./slices/processSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  process: processSlice,
});

export { rootReducer };

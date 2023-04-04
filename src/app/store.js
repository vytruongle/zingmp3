import { configureStore } from "@reduxjs/toolkit";
import listReducer from "../actions/listSlice";
import audioReducer from "../actions/audioSlice";

export const store = configureStore({
  reducer: {
    listReducer: listReducer,
    audioReducer: audioReducer,
  },
});

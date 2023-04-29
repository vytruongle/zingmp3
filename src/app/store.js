import { configureStore } from "@reduxjs/toolkit";
import listReducer from "../actions/listSlice";
import audioReducer from "../actions/audioSlice";
import { manageUserReducer } from "../actions/manageUser";

export const store = configureStore({
  reducer: {
    listReducer: listReducer,
    audioReducer: audioReducer,
    manageUser: manageUserReducer,
  },
});

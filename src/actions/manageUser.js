import { createSlice } from "@reduxjs/toolkit";

let localRegister = JSON.parse(localStorage.getItem("register"));
const localAccount = JSON.parse(localStorage.getItem("account"));
const localIndexUser = JSON.parse(localStorage.getItem("indexUser"));

const initialState = {
  registerList: localRegister || [],
  accountLogin: localAccount || undefined,
  indexUser: localIndexUser !== undefined ? localIndexUser : undefined,
  favorPlayList:
    localIndexUser !== undefined && localIndexUser !== null
      ? localRegister[localIndexUser].favorPlayList
      : [],
  favorSong:
    localIndexUser !== undefined && localIndexUser !== null
      ? localRegister[localIndexUser].favorSong
      : [],
};

const manageUser = createSlice({
  name: "manageUser",
  initialState,
  reducers: {
    registerForm: (state, action) => {
      state.registerList.push(action.payload);
      localStorage.setItem("register", JSON.stringify(state.registerList));
    },

    loginForm: (state, action) => {
      state.accountLogin = action.payload.user;
      state.indexUser = action.payload.index;
      localStorage.setItem("account", JSON.stringify(state.accountLogin));
      localStorage.setItem("indexUser", JSON.stringify(state.indexUser));
    },
    logoutForm: (state, action) => {
      localStorage.removeItem("account");
      localStorage.removeItem("indexUser");
      state.accountLogin = undefined;
      state.favorSong = [];
      state.favorPlayList = [];
      state.indexUser = undefined;
    },
    //handle add/remove favorite songs or favorite playlist
    ADD: (state, action) => {
      state.registerList = JSON.parse(JSON.stringify(state.registerList));
      const favorSong = state.registerList[state.indexUser].favorSong;
      favorSong.push(action.payload);
      state.favorSong = favorSong;
      localStorage.setItem("register", JSON.stringify(state.registerList));
    },
    DEL: (state, action) => {
      state.registerList = JSON.parse(JSON.stringify(state.registerList));
      const favorSong = state.registerList[state.indexUser].favorSong;
      const indexList = favorSong.findIndex(
        (item) => item.id === action.payload.id
      );
      favorSong.splice(indexList, 1);
      state.favorSong = favorSong;
      localStorage.setItem("register", JSON.stringify(state.registerList));
    },
    ADD_PLAYLIST: (state, action) => {
      state.registerList = JSON.parse(JSON.stringify(state.registerList));
      const favorPlayList = state.registerList[state.indexUser]?.favorPlayList;
      favorPlayList.push(action.payload);
      state.favorPlayList = favorPlayList;
      localStorage.setItem("register", JSON.stringify(state.registerList));
    },
    DEL_PLAYLIST: (state, action) => {
      state.registerList = JSON.parse(JSON.stringify(state.registerList));
      const favorPlayList = state.registerList[state.indexUser]?.favorPlayList;
      const index = favorPlayList.findIndex(
        (item) => item.category === action.payload.category
      );
      favorPlayList.splice(index, 1);
      state.favorPlayList = favorPlayList;
      localStorage.setItem("register", JSON.stringify(state.registerList));
    },
  },
});

export const manageUserReducer = manageUser.reducer;
export const {
  registerForm,
  loginForm,
  logoutForm,
  ADD,
  DEL,
  ADD_PLAYLIST,
  DEL_PLAYLIST,
} = manageUser.actions;

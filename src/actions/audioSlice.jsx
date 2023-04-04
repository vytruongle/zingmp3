import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaySong: null,
  volume: 1,
};

export const audioSlice = createSlice({
  name: "audioControl",
  initialState,
  reducers: {
    PLAY_SONG: (state) => {
      state.isPlaySong = true;
    },
    PAUSE_SONG: (state) => {
      state.isPlaySong = false;
    },
    CHANGE_VOLUME: (state, action) => {
      state.volume = action.payload / 100;
    },
  },
});

export const { PLAY_SONG, PAUSE_SONG, CHANGE_VOLUME } = audioSlice.actions;
export default audioSlice.reducer;

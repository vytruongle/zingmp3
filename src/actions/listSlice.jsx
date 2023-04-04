import { createSlice } from "@reduxjs/toolkit";
import data from "../data/listSong";

const currentData = JSON.parse(localStorage.getItem("data")) || data[0];
const currentFavorPlaylist = JSON.parse(localStorage.getItem("favorPlaylist"));
const currentFavorList = JSON.parse(localStorage.getItem("favorList"));
const currentFavorId = JSON.parse(localStorage.getItem("favorId"));
const initialState = {
  favorList: currentFavorList || [],
  favorPlaylist: currentFavorPlaylist || [],
  favorPlaylistId: [],
  favorId: currentFavorId || [],
  chooseSong: {
    id: 0,
    img:
      currentData.danhSachBaiHat[0].img ||
      "https://avatar-ex-swe.nixcdn.com/song/2018/05/11/6/9/1/0/1526046409297_500.jpg",
    title: currentData.danhSachBaiHat[0].title || "Không phải dạng vừa đâu",
    singer: currentData.danhSachBaiHat[0].singer || "Sơn Tùng MTP",
    category: currentData.category || "Nhac Viet",
  },
  category: currentData.category || "Nhac Viet",
  linkAudio:
    currentData.danhSachBaiHat[0].link ||
    "/static/media/KhongPhaiDangVuaDau.e81ec2a1bceb4071ee6a.mp3",
  data: data,
};

export const listSlice = createSlice({
  name: "handleList",
  initialState,
  reducers: {
    LOAD_DATA: (state, action) => {
      let { item, index } = action.payload;
      state.category = item.category;
      state.chooseSong = {
        id: index,
        img: item.danhSachBaiHat[index].img,
        title: item.danhSachBaiHat[index].title,
        singer: item.danhSachBaiHat[index].singer,
        category: item.category,
      };
      state.linkAudio = item.danhSachBaiHat[index].link;
    },

    ADD: (state, action) => {
      let { favorList, favorId } = state;
      favorId.push(action.payload.id);
      favorList.push(action.payload);
    },
    DEL: (state, action) => {
      let { favorList, favorId } = state;
      const index = favorId.indexOf(action.payload.id);
      const indexList = favorList.indexOf(action.payload);
      favorId.splice(index, 1);
      favorList.splice(indexList, 1);
    },
    ADD_PLAYLIST: (state, action) => {
      let { favorPlaylist, favorPlaylistId } = state;
      favorPlaylist.push(action.payload);
      favorPlaylistId.push(action.payload.category);
    },
    DEL_PLAYLIST: (state, action) => {
      let { favorPlaylist, favorPlaylistId } = state;
      const index = favorPlaylist.findIndex(
        (item) => item.id === action.payload.id
      );
      const id = favorPlaylistId.indexOf(action.payload.category);
      favorPlaylist.splice(index, 1);
      favorPlaylistId.splice(id, 1);
    },
    CHOOSE_SONG: (state, action) => {
      let { id, img, title, singer, link, category } = action.payload;
      state.chooseSong = {
        id: id,
        img: img,
        title: title,
        singer: singer,
        category: category,
      };
      state.category = category;
      state.linkAudio = link;
    },
  },
});

// Action creators are generated for each case reducer function
export const { ADD, DEL, CHOOSE_SONG, LOAD_DATA, ADD_PLAYLIST, DEL_PLAYLIST } =
  listSlice.actions;
export default listSlice.reducer;

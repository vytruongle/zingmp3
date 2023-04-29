import { createSlice } from "@reduxjs/toolkit";
import data from "../data/listSong";

//data local
const currentData = JSON.parse(localStorage.getItem("data")) || data[0];
const currentWordSearch = JSON.parse(localStorage.getItem("word"));
const currentListSearch = JSON.parse(localStorage.getItem("listSearch"));

const initialState = {
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
  listSearch: currentListSearch || [],
  searchWord: currentWordSearch || "",
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
    SEARCH: (state, action) => {
      state.searchWord = action.payload.word;
      state.listSearch = action.payload.listSearch;
    },
  },
});

// Action creators are generated for each case reducer function
export const { CHOOSE_SONG, LOAD_DATA, SEARCH } = listSlice.actions;
export default listSlice.reducer;

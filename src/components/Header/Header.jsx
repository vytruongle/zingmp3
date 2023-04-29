import React, { useState } from "react";
import clsx from "clsx";
import {
  SearchOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Input, Avatar } from "antd";

import styles from "../../sass/pages/Header.module.scss";

import avatar from "../../data/image/hansohee.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SEARCH } from "../../actions/listSlice";
import { logoutForm } from "../../actions/manageUser";

const Header = () => {
  const [isFocus, setFocus] = useState(false);
  const bigData = useSelector((state) => state.listReducer.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [word, setWord] = useState();
  const handleFocusInput = () => {
    setFocus(!isFocus);
  };
  const user = JSON.parse(localStorage.getItem("account"));

  function toLowerCaseNonAccentVietnamese(str) {
    str = str.toLowerCase();
    //     We can also use this instead of from line 11 to line 17
    //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
    //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
    //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
    //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
    //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
    //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
    //     str = str.replace(/\u0111/g, "d");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  const handleSearch = (value) => {
    const listSearch = [];
    bigData.map((data) => {
      const searchInfo = data.danhSachBaiHat.filter((item) => {
        const newTilte = toLowerCaseNonAccentVietnamese(item.title);
        const newSinger = toLowerCaseNonAccentVietnamese(item.singer);

        return (
          newTilte.includes(value.toLowerCase()) ||
          newSinger.includes(value.toLowerCase())
        );
      });
      listSearch.push(...searchInfo);
      return true;
    });
    console.log(listSearch);
    localStorage.setItem("listSearch", JSON.stringify(listSearch));
    dispatch(
      SEARCH({
        listSearch: listSearch,
        word: value,
      })
    );
    return listSearch;
  };

  return (
    <div className={clsx(styles.header)}>
      <div className="grid grid-cols-3 gap-4 items-baseline w-[95%] mx-auto">
        <div className="col-span-2">
          <Input
            className={
              isFocus ? clsx(styles.search, styles.focus) : clsx(styles.search)
            }
            size={"large"}
            bordered={false}
            onFocus={handleFocusInput}
            onBlur={handleFocusInput}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Tìm kiếm lời bài hát, bài hát, nghệ sĩ,..."
            prefix={
              <SearchOutlined
                style={{ color: "#fff", fontSize: "18px" }}
                onClick={() => {
                  handleSearch(word);
                  localStorage.setItem("word", JSON.stringify(word));
                  navigate(`/search/tat-ca`);
                }}
              />
            }
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <div className={clsx("me-3", styles.icon)}>
            <SettingOutlined />
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <div style={{ margin: "12px 0" }}>
                <Avatar src={<img src={avatar} alt="avatar" />} size={35} />
              </div>
              <p
                onClick={() => {
                  dispatch(logoutForm());
                  navigate("/");
                }}
                className="flex items-center gap-1 flex-wrap text-white text-lg font-semibold cursor-pointer hover:text-red-500"
              >
                | Đăng xuất
                <LogoutOutlined />
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                navigate("/login");
              }}
              className="mt-3 focus:outline-none text-white bg-[#9b4de0] hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

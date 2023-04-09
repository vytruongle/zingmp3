import React, { useState } from "react";
import clsx from "clsx";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { Input, Avatar } from "antd";

import styles from "../../sass/pages/Header.module.scss";

import avatar from "../../data/image/hansohee.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SEARCH } from "../../actions/listSlice";

const Header = () => {
  const [isFocus, setFocus] = useState(false);
  const bigData = useSelector((state) => state.listReducer.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [word, setWord] = useState();
  const handleFocusInput = () => {
    setFocus(!isFocus);
  };

  const handleSearch = (value) => {
    const listSearch = [];
    bigData.map((data) => {
      const searchInfo = data.danhSachBaiHat.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.singer.toLowerCase().includes(value.toLowerCase())
      );
      listSearch.push(...searchInfo);
      return true;
    });
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
        <div className="flex items-center justify-end">
          <div className={clsx("me-3", styles.icon)}>
            <SettingOutlined />
          </div>
          <div style={{ margin: "12px 0" }}>
            <Avatar src={<img src={avatar} alt="avatar" />} size={35} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

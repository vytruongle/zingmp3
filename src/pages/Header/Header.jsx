import React, { useState } from "react";
import clsx from "clsx";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { Input, Avatar } from "antd";

import styles from "../../sass/pages/Header.module.scss";

import avatar from "../../data/image/hansohee.jpg";

const Header = () => {
  const [isFocus, setFocus] = useState(false);

  const handleFocusInput = () => {
    setFocus(!isFocus);
  };
  return (
    <div className={clsx(styles.header, "container")}>
      <div className="row align-items-baseline">
        <div className="col-7">
          <Input
            className={
              isFocus ? clsx(styles.search, styles.focus) : clsx(styles.search)
            }
            size={"large"}
            bordered={false}
            onFocus={handleFocusInput}
            onBlur={handleFocusInput}
            placeholder="Tìm kiếm lời bài hát, bài hát, nghệ sĩ,..."
            prefix={
              <SearchOutlined style={{ color: "#fff", fontSize: "18px" }} />
            }
          />
        </div>
        <div className="d-flex align-items-center col-5 justify-content-end">
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

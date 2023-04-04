import React, { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { Avatar, Tooltip } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

import styles from "../../sass/pages/Footer.module.scss";
import AudioPlayer from "../../components/AudioPlayer";
import Volume from "../../components/Volume";

const Footer = () => {
  const song = useSelector((state) => state.listReducer.chooseSong);
  const [isClick, setClick] = useState(false);
  const handleClick = () => {
    setClick(!isClick);
  };
  return (
    <div className={clsx(styles.footer)}>
      <div className="row align-items-center">
        <div className="col-3 d-flex align-items-center">
          <Avatar
            shape="square"
            src={<img src={song.img} alt="twice logo" />}
            size={64}
            className={clsx(styles.songAvatar)}
          />
          <div className={clsx(styles.songInfo)}>
            <p>{song.title}</p>
            <p>{song.singer}</p>
          </div>
          <div onClick={handleClick}>
            {isClick ? (
              <Tooltip title="Xóa khỏi danh sách">
                <HeartFilled className={clsx(styles.icon, styles.active)} />
              </Tooltip>
            ) : (
              <Tooltip title="Thêm vào danh sách">
                <HeartOutlined className={clsx(styles.icon)} />
              </Tooltip>
            )}
          </div>
        </div>
        <div className="col-6 text-center">
          <AudioPlayer song={song} />
        </div>
        <div className="col-3">
          <Volume />
        </div>
      </div>
    </div>
  );
};

export default Footer;

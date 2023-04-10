import React from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Avatar, Button, Tooltip } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import AudioPlayer from "../AudioPlayer";
import UtilityButtons from "../UtilityButtons";
import { ADD, DEL } from "../../actions/listSlice";
import { Slide, ToastContainer, toast } from "react-toastify";

import styles from "../../sass/pages/Footer.module.scss";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const song = useSelector((state) => state.listReducer.chooseSong);
  const link = useSelector((state) => state.listReducer.linkAudio);
  const favorId = useSelector((state) => state.listReducer.favorId);
  const dispatch = useDispatch();

  const notify = (text) => toast(text);
  return (
    <div className={clsx(styles.footer)}>
      <div className="grid grid-cols-4 gap-4 items-center">
        <div className="flex items-center">
          <Avatar
            shape="square"
            src={<img src={song.img} alt="twice logo" />}
            size={64}
            className={clsx(styles.songAvatar)}
          />
          <div className={clsx(styles.songInfo)}>
            <h3>{song.title}</h3>
            <p>{song.singer}</p>
          </div>
          <div>
            {favorId.includes(`${song.id}-${song.category}`) ? (
              <Tooltip title="Xóa khỏi danh sách">
                <Button
                  shape="circle"
                  type="text"
                  onClick={() => {
                    notify("Đã xóa khỏi danh sách yêu thích");
                    dispatch(
                      DEL({
                        id: `${song.id}-${song.category}`,
                        img: song.img,
                        title: song.title,
                        singer: song.singer,
                        link: link,
                        index: song.id,
                        category: song.category,
                      })
                    );
                    // console.log({
                    //   id: `${song.id}-${song.category}`,
                    //   img: song.img,
                    //   title: song.title,
                    //   singer: song.singer,
                    //   link: link,
                    //   index: song.id,
                    //   category: song.category,
                    // });
                  }}
                  icon={
                    <HeartFilled className={clsx(styles.icon, styles.active)} />
                  }
                />
                <ToastContainer
                  position="top-left"
                  autoClose={4000}
                  transition={Slide}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  pauseOnHover={false}
                  theme="dark"
                />
              </Tooltip>
            ) : (
              <Tooltip title="Thêm vào danh sách">
                <Button
                  shape="circle"
                  type="text"
                  onClick={() => {
                    notify("Đã thêm vào danh sach yêu thích");
                    dispatch(
                      ADD({
                        id: `${song.id}-${song.category}`,
                        img: song.img,
                        title: song.title,
                        singer: song.singer,
                        link: link,
                        index: song.id,
                        category: song.category,
                      })
                    );
                  }}
                  icon={<HeartOutlined className={clsx(styles.icon)} />}
                />
                <ToastContainer
                  position="top-left"
                  autoClose={4000}
                  transition={Slide}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  pauseOnHover={false}
                  theme="dark"
                />
              </Tooltip>
            )}
          </div>
        </div>
        <div className="col-span-2 text-center">
          <AudioPlayer song={song} />
        </div>
        <div>
          <UtilityButtons />
        </div>
      </div>
    </div>
  );
};

export default Footer;

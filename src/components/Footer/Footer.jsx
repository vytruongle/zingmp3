import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Avatar, Button, Tooltip } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import AudioPlayer from "../AudioPlayer";
import UtilityButtons from "../UtilityButtons";
import { ADD, DEL } from "../../actions/manageUser";
import { Slide, ToastContainer, toast } from "react-toastify";

import styles from "../../sass/pages/Footer.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const song = useSelector((state) => state.listReducer.chooseSong);
  const link = useSelector((state) => state.listReducer.linkAudio);
  const [heartDisplay, setHeartDisplay] = useState(false);
  const { accountLogin, registerList, indexUser } = useSelector(
    (state) => state.manageUser
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (registerList.length === 0) {
      setHeartDisplay(false);
    } else {
      const index = registerList[indexUser]?.favorSong?.findIndex(
        (item) => item.title === `${song.title}`
      );
      if (index > -1) {
        setHeartDisplay(true);
      } else {
        setHeartDisplay(false);
      }
    }
  }, [song, indexUser, registerList]);

  const notify = (text) => toast(text);
  return (
    <div className={clsx(styles.footer, "md:px-3 ssm:w-full")}>
      <div className="flex flex-wrap items-center">
        <div className=" basis-1/4 flex items-center">
          <Avatar
            shape="square"
            src={<img src={song.img} alt="twice logo" />}
            className={clsx(
              styles.songAvatar,
              "md:w-12 md:h-12 xl:w-16 xl:h-16"
            )}
          />
          <div className={clsx(styles.songInfo)}>
            <h3 className="md:text-xs xl:text-[18px]">{song.title}</h3>
            <p className="md:text-[10px] xl:text-base">{song.singer}</p>
          </div>
          <div>
            {heartDisplay ? (
              <Tooltip title="Xóa khỏi danh sách">
                <Button
                  shape="circle"
                  type="text"
                  onClick={() => {
                    if (accountLogin) {
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
                    } else {
                      navigate("/login");
                    }
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
                    if (accountLogin) {
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
                    } else {
                      navigate("/login");
                    }
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
        <div className="basis-1/2 text-center">
          <AudioPlayer song={song} />
        </div>
        <div className="basis-1/4">
          <UtilityButtons />
        </div>
      </div>
    </div>
  );
};

export default Footer;

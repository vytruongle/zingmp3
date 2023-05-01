import React from "react";
import clsx from "clsx";
import {
  HeartOutlined,
  HeartFilled,
  CaretRightOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
//redux
import { useDispatch, useSelector } from "react-redux";
import { CHOOSE_SONG } from "../actions/listSlice";
import { ADD, DEL } from "../actions/manageUser";
import { PLAY_SONG, PAUSE_SONG } from "../actions/audioSlice";
import { toast } from "react-toastify";

import styles from "../sass/components/ListSong.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ListSong = (props) => {
  const { accountLogin, registerList, indexUser } = useSelector(
    (state) => state.manageUser
  );
  const navigate = useNavigate();
  const isPlaying = useSelector((state) => state.audioReducer.isPlaySong);
  const title = useSelector((state) => state.listReducer.chooseSong.title);

  const dispatch = useDispatch();

  const notify = (text) => toast(text);

  const handleHeartIcon = (id, category) => {
    if (registerList.length === 0) {
      return false;
    } else {
      const index = registerList[indexUser]?.favorSong?.findIndex(
        (item) => item.id === `${id}-${category}`
      );
      if (index !== -1) {
        return true;
      } else {
        return false;
      }
    }
  };

  const renderList = (data) => {
    return data.danhSachBaiHat.map((song, id) => {
      return (
        <li
          key={id}
          onDoubleClick={() => {
            dispatch(
              CHOOSE_SONG({
                id: id,
                img: song.img,
                title: song.title,
                singer: song.singer,
                link: song.link,
                category: data.category,
              })
            );
            dispatch(PAUSE_SONG());
            setTimeout(() => {
              dispatch(PLAY_SONG());
            }, 200);
          }}
          className={
            title === song.title
              ? clsx("flex items-center justify-between mb-3", styles.active)
              : clsx("flex items-center justify-between mb-3")
          }
        >
          <div className="flex items-center">
            <div className={clsx(styles.songImg)}>
              <img src={song.img} alt="" />
              {isPlaying && title === song.title ? (
                <PauseOutlined
                  className={clsx(styles.playIcon)}
                  onClick={() => {
                    dispatch(PAUSE_SONG());
                  }}
                />
              ) : (
                <CaretRightOutlined
                  className={clsx(styles.playIcon)}
                  onClick={() => {
                    dispatch(
                      CHOOSE_SONG({
                        id: id,
                        img: song.img,
                        title: song.title,
                        singer: song.singer,
                        link: song.link,
                        category: data.category,
                      })
                    );
                    dispatch(PAUSE_SONG());
                    setTimeout(() => {
                      dispatch(PLAY_SONG());
                    }, 200);
                  }}
                />
              )}
            </div>
            <div className={clsx(styles.infoSong)}>
              <h3>{song.title}</h3>
              <p>{song.singer}</p>
            </div>
          </div>
          <div className={clsx(styles.heartIcon)}>
            {handleHeartIcon(id, data.category) ? (
              <Tooltip title="Xóa khỏi danh sách">
                <Button
                  shape="circle"
                  type="text"
                  onClick={() => {
                    if (accountLogin) {
                      notify("Đã xóa khỏi danh sách yêu thích");
                      dispatch(
                        DEL({
                          id: `${id}-${data.category}`,
                          img: song.img,
                          title: song.title,
                          singer: song.singer,
                          link: song.link,
                          category: data.category,
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
                          id: `${id}-${data.category}`,
                          img: song.img,
                          title: song.title,
                          singer: song.singer,
                          link: song.link,
                          category: data.category,
                        })
                      );
                    } else {
                      navigate("/login");
                    }
                  }}
                  icon={<HeartOutlined className={clsx(styles.icon)} />}
                />
              </Tooltip>
            )}
          </div>
        </li>
      );
    });
  };
  return (
    <div className="container mx-auto">
      <div className={clsx(styles.listSong)}>
        <ul>{renderList(props.data)}</ul>
      </div>
    </div>
  );
};

export default ListSong;

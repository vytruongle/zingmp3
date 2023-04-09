import React, { useEffect } from "react";
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
import { ADD, DEL, CHOOSE_SONG } from "../actions/listSlice";
import { PLAY_SONG, PAUSE_SONG } from "../actions/audioSlice";
import { toast } from "react-toastify";

import styles from "../sass/components/ListSong.module.scss";
import "react-toastify/dist/ReactToastify.css";

const ListSong = (props) => {
  const favorId = useSelector((state) => state.listReducer.favorId);
  const isPlaying = useSelector((state) => state.audioReducer.isPlaySong);
  const title = useSelector((state) => state.listReducer.chooseSong.title);
  const favorList = useSelector((state) => state.listReducer.favorList);
  const dispatch = useDispatch();

  const notify = (text) => toast(text);
  //save favorite song to local storage
  useEffect(() => {
    localStorage.setItem("favorList", JSON.stringify(favorList));
    localStorage.setItem("favorId", JSON.stringify(favorId));
  }, [favorList, favorId]);

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
            {favorId.includes(`${id}-${data.category}`) ? (
              <Tooltip title="Xóa khỏi danh sách">
                <Button
                  shape="circle"
                  type="text"
                  onClick={() => {
                    notify("Đã xóa khỏi danh sách yêu thích");
                    dispatch(
                      DEL({
                        id: `${id}-${data.category}`,
                        img: song.img,
                        title: song.title,
                        singer: song.singer,
                        link: song.link,
                        index: id,
                        category: data.category,
                      })
                    );
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
                    notify("Đã thêm vào danh sach yêu thích");
                    dispatch(
                      ADD({
                        id: `${id}-${data.category}`,
                        img: song.img,
                        title: song.title,
                        singer: song.singer,
                        link: song.link,
                        index: id,
                        category: data.category,
                      })
                    );
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

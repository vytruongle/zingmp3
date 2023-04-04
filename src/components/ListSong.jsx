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
import styles from "../sass/components/ListSong.module.scss";

const ListSong = (props) => {
  const favorId = useSelector((state) => state.listReducer.favorId);
  const isPlaying = useSelector((state) => state.audioReducer.isPlaySong);
  const index = useSelector((state) => state.listReducer.chooseSong.id);
  const favorList = useSelector((state) => state.listReducer.favorList);
  const dispatch = useDispatch();

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
            index === id
              ? clsx(
                  "d-flex align-items-center justify-content-between mb-3",
                  styles.active
                )
              : clsx("d-flex align-items-center justify-content-between mb-3")
          }
        >
          <div className="d-flex align-items-center">
            <div className={clsx(styles.songImg)}>
              <img src={song.img} alt="" />
              {isPlaying && index === id ? (
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
            <div className={styles.infoSong}>
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
                    dispatch(
                      DEL({
                        id: `${id}-${data.category}`,
                        img: song.img,
                        title: song.title,
                        singer: song.singer,
                        link: song.link,
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
                  onClick={() =>
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
                    )
                  }
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
    <div className="container">
      <div className={clsx(styles.listSong)}>
        <ul>{renderList(props.data)}</ul>
      </div>
    </div>
  );
};

export default ListSong;

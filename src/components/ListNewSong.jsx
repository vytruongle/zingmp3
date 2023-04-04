import { Button, Col, Row, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
import {
  CaretRightOutlined,
  PauseOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

import styles from "../sass/components/ListNewSong.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { ADD, CHOOSE_SONG, DEL } from "../actions/listSlice";
import { PAUSE_SONG, PLAY_SONG } from "../actions/audioSlice";

const ListNewSong = ({ item, category }) => {
  const [isClick, setClick] = useState(false);
  const stateAudio = useSelector((state) => state.audioReducer.isPlaySong);
  const favorId = useSelector((state) => state.listReducer.favorId);
  const favorList = useSelector((state) => state.listReducer.favorList);
  const [index, setIndex] = useState(null);
  const dispatch = useDispatch();

  // save list favorite song to local storage
  useEffect(() => {
    localStorage.setItem("favorList", JSON.stringify(favorList));
    localStorage.setItem("favorId", JSON.stringify(favorId));
  }, [favorList, favorId]);

  const handleChooseSong = (category, song, id) => {
    dispatch(
      CHOOSE_SONG({
        id: id,
        img: song.img,
        title: song.title,
        singer: song.singer,
        link: song.link,
        category: category,
      })
    );
  };

  useEffect(() => {
    if (isClick && index !== null) {
      dispatch(PLAY_SONG());
    } else {
      dispatch(PAUSE_SONG());
    }
    // eslint-disable-next-line
  }, [index]);

  console.log(favorId);
  const renderListNewSong = () => {
    return item.map((song, id) => {
      return (
        <Col span={8} key={id}>
          <div className={clsx(styles.itemSong)}>
            <div className="d-flex align-items-center">
              <div className={clsx(styles.itemImg)}>
                <img src={song.img} alt="" />
                <Button
                  type="text"
                  className={clsx(styles.controlBtn)}
                  onClick={() => {
                    setClick(!isClick);
                    setIndex(() => {
                      if (stateAudio) {
                        return null;
                      } else {
                        return id;
                      }
                    });
                    handleChooseSong(category, song, id);
                  }}
                >
                  {stateAudio && index === id ? (
                    <PauseOutlined />
                  ) : (
                    <CaretRightOutlined />
                  )}
                </Button>
              </div>
              <div className={clsx(styles.title)}>
                <h3>{song.title}</h3>
                <p>{song.singer}</p>
              </div>
            </div>
            <div>
              {favorId.includes(`${id}-${category}`) ? (
                <Tooltip title="Xóa khỏi danh sách">
                  <Button
                    shape="circle"
                    type="text"
                    onClick={() => {
                      dispatch(
                        DEL({
                          id: id,
                          category: category,
                        })
                      );
                    }}
                    icon={
                      <HeartFilled
                        className={clsx(styles.iconHeart, styles.active)}
                      />
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
                          id: `${id}-${category}`,
                          img: song.img,
                          title: song.title,
                          singer: song.singer,
                          link: song.link,
                          index: id,
                          category: category,
                        })
                      )
                    }
                    icon={<HeartOutlined className={clsx(styles.iconHeart)} />}
                  />
                </Tooltip>
              )}
            </div>
          </div>
        </Col>
      );
    });
  };
  return (
    <div id={clsx(styles.newSong)}>
      <Row gutter={[32, 16]}>{renderListNewSong()}</Row>
    </div>
  );
};

export default ListNewSong;

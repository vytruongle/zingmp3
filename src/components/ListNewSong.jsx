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
import { CHOOSE_SONG } from "../actions/listSlice";
import { ADD, DEL } from "../actions/manageUser";
import { PAUSE_SONG, PLAY_SONG } from "../actions/audioSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListNewSong = ({ item, category }) => {
  const stateAudio = useSelector((state) => state.audioReducer.isPlaySong);
  const currentIndex = useSelector((state) => state.listReducer.chooseSong.id);
  const currentCategory = useSelector(
    (state) => state.listReducer.chooseSong.category
  );
  const [index, setIndex] = useState(null);
  const dispatch = useDispatch();
  const notify = (text) => toast(text);
  const { accountLogin, registerList, indexUser } = useSelector(
    (state) => state.manageUser
  );
  const navigate = useNavigate();

  const handleChooseSong = (category, song, id) => {
    if (stateAudio && id === index) {
      dispatch(PAUSE_SONG());
    } else {
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
      dispatch(PAUSE_SONG());
      setTimeout(() => {
        dispatch(PLAY_SONG());
      }, 200);
    }
  };

  useEffect(() => {
    if (stateAudio) {
      dispatch(PLAY_SONG());
      setIndex(currentIndex);
    } else {
      dispatch(PAUSE_SONG());
    }
    // eslint-disable-next-line
  }, [index, stateAudio]);

  const handleHeartIcon = (id) => {
    if (registerList.length === 0) {
      return false;
    } else {
      const index = registerList[indexUser]?.favorSong?.findIndex(
        (item) => item.id === `${id}-${category}`
      );
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    }
  };

  const renderListNewSong = () => {
    return item.map((song, id) => {
      return (
        <Col span={8} key={id}>
          <div className={clsx(styles.itemSong)}>
            <div className="flex items-center gap-2">
              <div className={clsx(styles.itemImg)}>
                <img src={song.img} alt="" />
                <Button
                  type="text"
                  className={clsx(styles.controlBtn)}
                  onClick={() => {
                    setIndex(id);
                    handleChooseSong(category, song, id);
                  }}
                >
                  {stateAudio &&
                  index === id &&
                  category === currentCategory ? (
                    <PauseOutlined />
                  ) : (
                    <CaretRightOutlined />
                  )}
                </Button>
              </div>
              <div className={clsx(styles.title, "truncate basis-2/3")}>
                <h3 className="truncate">{song.title}</h3>
                <p className="truncate">{song.singer}</p>
              </div>
            </div>
            <div className=" absolute right-0 top-1/2 translate-y-[-50%]">
              {handleHeartIcon(id) ? (
                <Tooltip title="Xóa khỏi danh sách">
                  <Button
                    shape="circle"
                    type="text"
                    onClick={() => {
                      if (accountLogin) {
                        notify("Đã xóa khỏi danh sách yêu thích");
                        dispatch(
                          DEL({
                            id: `${id}-${category}`,
                            img: song.img,
                            title: song.title,
                            singer: song.singer,
                            link: song.link,
                            duration: song.duration,
                            category: category,
                          })
                        );
                      } else {
                        navigate("/login");
                      }
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
                    onClick={() => {
                      if (accountLogin) {
                        notify("Đã thêm vào danh sach yêu thích");
                        dispatch(
                          ADD({
                            id: `${id}-${category}`,
                            img: song.img,
                            title: song.title,
                            singer: song.singer,
                            link: song.link,
                            duration: song.duration,
                            category: category,
                          })
                        );
                      } else {
                        navigate("/login");
                      }
                    }}
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

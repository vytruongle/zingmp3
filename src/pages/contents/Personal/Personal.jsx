import React, { useEffect, useState } from "react";

//scss
import styles from "../../../sass/contents/Personal.module.scss";
import clsx from "clsx";
import { Button, Col, Row, Tabs, Tooltip } from "antd";
import {
  CaretRightOutlined,
  PauseOutlined,
  HeartFilled,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { PAUSE_SONG, PLAY_SONG } from "../../../actions/audioSlice";
import { CHOOSE_SONG } from "../../../actions/listSlice";
import { useNavigate } from "react-router-dom";
import { DEL, IS_CHOOSE } from "../../../actions/manageUser";
import { toast } from "react-toastify";

const Personal = () => {
  const { registerList, indexUser, favorPlayList, favorSong } = useSelector(
    (state) => state.manageUser
  );
  const [listSong, setList] = useState([]);
  const [playlistSong, setPlaylist] = useState([]);
  const isPlaying = useSelector((state) => state.audioReducer.isPlaySong);
  const index = useSelector((state) => state.listReducer.chooseSong.id);
  const category = useSelector(
    (state) => state.listReducer.chooseSong.category
  );
  const titleSong = useSelector((state) => state.listReducer.chooseSong.title);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (text) => toast(text);

  useEffect(() => {
    if (registerList.length > 0) {
      setList(favorSong);
      setPlaylist(favorPlayList);
    }
  }, [favorPlayList, favorSong, registerList, indexUser]);

  const handleHeartIcon = (title) => {
    if (registerList.length === 0) {
      return false;
    } else {
      const index = registerList[indexUser]?.favorSong?.findIndex(
        (item) => item.title === title
      );
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    }
  };

  const renderFavorSong = () => {
    return listSong?.map((item, id) => {
      return (
        <Row
          gutter={16}
          justify={"space-between"}
          align={"center"}
          className={clsx(styles.rowList)}
          onDoubleClick={() => {
            handlePlaySong(item, id);
            dispatch(IS_CHOOSE(true));
          }}
          key={id}
        >
          <Col span={6}>
            <div className="flex items-center leading-[2] gap-1">
              <div
                className={clsx(styles.imgSong)}
                onClick={() => {
                  handlePlaySong(item, id);
                  dispatch(IS_CHOOSE(true));
                }}
              >
                <img src={item.img} alt={item.img} />

                {isPlaying && index === id && item.title === titleSong ? (
                  <PauseOutlined className={clsx(styles.btnControl)} />
                ) : (
                  <CaretRightOutlined className={clsx(styles.btnControl)} />
                )}
              </div>
              <div className={styles.info}>
                <h3>{item.title}</h3>
                <p>{item.singer}</p>
              </div>
            </div>
          </Col>
          <Col span={12} className="text-center">
            <p style={{ color: "#7b7584" }}>{item.title}(Single)</p>
          </Col>
          <Col span={6} className="text-center">
            <p style={{ color: "#7b7584" }}>{item.duration}</p>
          </Col>
          {handleHeartIcon(item.title) ? (
            <Tooltip title="Xóa khỏi danh sách">
              <Button
                shape="circle"
                type="text"
                className={clsx(styles.buttonHeart)}
                onClick={() => {
                  notify("Đã xóa khỏi danh sách yêu thích");
                  dispatch(
                    DEL({
                      id: item.id,
                      index: item.index,
                      img: item.img,
                      title: item.title,
                      singer: item.singer,
                      link: item.link,
                      duration: item.duration,
                      category: item.category,
                    })
                  );
                }}
                icon={
                  <HeartFilled className={clsx(styles.icon, styles.active)} />
                }
              />
            </Tooltip>
          ) : null}
        </Row>
      );
    });
  };

  const renderFavorPlaylist = () => {
    return playlistSong?.map((item, id) => {
      return (
        <div
          className={clsx(styles.playlistInfo)}
          key={id}
          onClick={() => {
            localStorage.setItem("data", JSON.stringify(item));
            navigate(`/album/album:${item.id}`);
          }}
        >
          <img src={item.img} alt={item.img} />
          <h3>{item.category}</h3>
          <p>Zing MP3</p>
        </div>
      );
    });
  };

  const items = [
    {
      key: "1",
      label: <h3 style={{ color: "#fff", fontSize: "16px" }}>BÀI HÁT</h3>,
      children: renderFavorSong(),
    },
    {
      key: "2",
      label: <h3 style={{ color: "#fff", fontSize: "16px" }}>PLAYLIST</h3>,
      children: (
        <div className="flex items-center">{renderFavorPlaylist()}</div>
      ),
    },
  ];

  //  handle Play song
  const handlePlaySong = (item, id) => {
    if (isPlaying && item.index === index && item.category === category) {
      dispatch(PAUSE_SONG());
    } else {
      dispatch(
        CHOOSE_SONG({
          id: id,
          index: item.index,
          img: item.img,
          title: item.title,
          singer: item.singer,
          link: item.link,
          category: item.category,
        })
      );
      dispatch(PAUSE_SONG());
      setTimeout(() => {
        dispatch(PLAY_SONG());
      }, 200);
    }
  };
  return (
    <div id={clsx(styles.personal)}>
      <div className=" container mx-auto px-8">
        <h1>Thư viện</h1>
        <Tabs tabBarGutter={16} defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default Personal;

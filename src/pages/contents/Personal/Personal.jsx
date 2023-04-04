import React from "react";

//scss
import styles from "../../../sass/contents/Personal.module.scss";
import clsx from "clsx";
import { Col, Row, Tabs } from "antd";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { PAUSE_SONG, PLAY_SONG } from "../../../actions/audioSlice";
import { CHOOSE_SONG } from "../../../actions/listSlice";
import { useNavigate } from "react-router-dom";

const Personal = () => {
  const listSong = useSelector((state) => state.listReducer.favorList);
  const playlistSong = useSelector((state) => state.listReducer.favorPlaylist);
  const isPlaying = useSelector((state) => state.audioReducer.isPlaySong);
  const index = useSelector((state) => state.listReducer.chooseSong.id);
  const titleSong = useSelector((state) => state.listReducer.chooseSong.title);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderFavorSong = () => {
    return listSong?.map((item) => {
      return (
        <Row
          gutter={16}
          justify={"space-between"}
          align={"center"}
          className={clsx(styles.rowList)}
          onDoubleClick={() => {
            handlePlaySong(item);
          }}
        >
          <Col span={6}>
            <div className="d-flex">
              <div
                className={clsx(styles.imgSong)}
                onClick={() => {
                  handlePlaySong(item);
                }}
              >
                <img src={item.img} alt={item.img} />
                {isPlaying &&
                index === item.index &&
                item.title === titleSong ? (
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
          <Col span={6} className="text-end">
            <p style={{ color: "#7b7584" }}>03:39</p>
          </Col>
        </Row>
      );
    });
  };

  const renderFavorPlaylist = () => {
    return playlistSong?.map((item) => {
      return (
        <div
          className={clsx(styles.playlistInfo)}
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
        <div className="d-flex align-items-center">{renderFavorPlaylist()}</div>
      ),
    },
  ];

  //  handle Play song
  const handlePlaySong = (item) => {
    if (isPlaying && item.index === index) {
      dispatch(PAUSE_SONG());
    } else {
      dispatch(
        CHOOSE_SONG({
          id: item.index,
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
      <div className={clsx(styles.container)}>
        <h1>Thư viện</h1>
        <Tabs tabBarGutter={16} defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default Personal;

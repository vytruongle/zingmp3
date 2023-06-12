import React from "react";
import { clsx } from "clsx";
import { Col, Row } from "antd";
import { CHOOSE_SONG } from "../actions/listSlice";
import { PAUSE_SONG, PLAY_SONG } from "../actions/audioSlice";
import { useDispatch, useSelector } from "react-redux";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";

import styles from "../sass/components/listSongTable.module.scss";
import { IS_CHOOSE } from "../actions/manageUser";

const ListSongTable = ({ danhSachBaiHat, category }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.audioReducer.isPlaySong);
  const index = useSelector((state) => state.listReducer.chooseSong.id);
  const categorySong = useSelector(
    (state) => state.listReducer.chooseSong.category
  );
  const selNum = (id) => {
    switch (id) {
      case 1: {
        return <h1 className={clsx(styles.activeFirst)}>{id}</h1>;
      }
      case 2: {
        return <h1 className={clsx(styles.activeSecond)}>{id}</h1>;
      }
      case 3: {
        return <h1 className={clsx(styles.activeThird)}>{id}</h1>;
      }
      default:
        return <h1>{id}</h1>;
    }
  };
  const renderTable = () => {
    return danhSachBaiHat.map((item, id) => {
      return (
        <Row
          gutter={[16, 16]}
          justify="space-between"
          align="center"
          className={
            index === id && category === categorySong
              ? clsx(styles.tableRow, styles.active)
              : clsx(styles.tableRow)
          }
          key={id}
          onDoubleClick={() => {
            handlePlaySong(item, id);
            dispatch(IS_CHOOSE(false));
          }}
        >
          <Col span={2}>{selNum(id + 1)}</Col>
          <Col span={10}>
            <div className={clsx(styles.info)}>
              <div
                className={clsx(styles.imgSong)}
                onClick={() => {
                  handlePlaySong(item, id);
                  dispatch(IS_CHOOSE(false));
                }}
              >
                <img src={item.img} alt={item.img} />
                {isPlaying && index === id && category === categorySong ? (
                  <PauseOutlined className={clsx(styles.btnControl)} />
                ) : (
                  <CaretRightOutlined className={clsx(styles.btnControl)} />
                )}
              </div>
              <div className={clsx(styles.title, "w-[80%] truncate")}>
                <h3 className="md:text-md font-semibold xl:text-[18px]">
                  {item.title}
                </h3>
                <p>{item.singer}</p>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <p className="text-center">{item.title} (Single)</p>
          </Col>
          <Col span={4}>
            <p className="text-end">{item.duration}</p>
          </Col>
        </Row>
      );
    });
  };

  //  handle Play song
  const handlePlaySong = (item, id) => {
    if (isPlaying && id === index) {
      dispatch(PAUSE_SONG());
    } else {
      dispatch(
        CHOOSE_SONG({
          id: id,
          img: item.img,
          title: item.title,
          singer: item.singer,
          link: item.link,
          category: category,
        })
      );
      dispatch(PAUSE_SONG());
      setTimeout(() => {
        dispatch(PLAY_SONG());
      }, 200);
    }
  };

  return <div id={clsx(styles.itemTable)}>{renderTable()}</div>;
};

export default ListSongTable;

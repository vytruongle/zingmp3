import React, { useState } from "react";
import ListSong from "./ListSong";
import clsx from "clsx";
import { Slider } from "antd";
import { Button } from "antd";
import {
  BorderOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import { BsFillVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";
import data from "../data/listSong";

import styles from "../sass/components/UtilityButtons.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { CHOOSE_SONG } from "../actions/listSlice";
import { CHANGE_VOLUME, PAUSE_SONG, PLAY_SONG } from "../actions/audioSlice";

const UtilityButtons = () => {
  const currentSong = useSelector((state) => state.listReducer.chooseSong);
  const currentCategory = useSelector((state) => state.listReducer.category);
  const stateAudio = useSelector((state) => state.audioReducer.isPlaySong);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [isAppear, setAppear] = useState(false);
  const [volume, setVolume] = useState(100);
  //find index of data
  const index = data.findIndex((item) => item.category === currentCategory);
  //handle next or prev song
  const handleNextPrev = (value) => {
    const newSong = data[index].danhSachBaiHat;
    if (value === "prev") {
      if (currentSong.id === 0) {
        const newId = newSong.length - 1;
        dispatch(
          CHOOSE_SONG({
            id: newId,
            img: newSong[newId].img,
            title: newSong[newId].title,
            singer: newSong[newId].singer,
            link: newSong[newId].link,
            category: data[index].category,
          })
        );

        dispatch(PAUSE_SONG());
        setTimeout(() => {
          dispatch(PLAY_SONG());
        }, 200);
      } else {
        dispatch(
          CHOOSE_SONG({
            id: currentSong.id - 1,
            img: newSong[currentSong.id - 1].img,
            title: newSong[currentSong.id - 1].title,
            singer: newSong[currentSong.id - 1].singer,
            link: newSong[currentSong.id - 1].link,
            category: data[index].category,
          })
        );

        dispatch(PAUSE_SONG());
        setTimeout(() => {
          dispatch(PLAY_SONG());
        }, 200);
      }
    }

    if (value === "next") {
      if (currentSong.id === newSong.length - 1) {
        const newId = 0;
        dispatch(
          CHOOSE_SONG({
            id: newId,
            img: newSong[newId].img,
            title: newSong[newId].title,
            singer: newSong[newId].singer,
            link: newSong[newId].link,
            category: data[index].category,
          })
        );
        dispatch(PAUSE_SONG());
        setTimeout(() => {
          dispatch(PLAY_SONG());
        }, 200);
      } else {
        dispatch(
          CHOOSE_SONG({
            id: currentSong.id + 1,
            img: newSong[currentSong.id + 1].img,
            title: newSong[currentSong.id + 1].title,
            singer: newSong[currentSong.id + 1].singer,
            link: newSong[currentSong.id + 1].link,
            category: data[index].category,
          })
        );
        dispatch(PAUSE_SONG());
        setTimeout(() => {
          dispatch(PLAY_SONG());
        }, 200);
      }
    }
  };

  //handle change volume
  const onChangeVolume = (value) => {
    dispatch(CHANGE_VOLUME(value));
    setVolume(value);
  };

  const renderWindowMode = () => {
    return (
      <div className={clsx(styles.imgSong)}>
        <div className={clsx(styles.overlay)}></div>

        <CloseOutlined
          className={clsx(styles.icon, styles.closeIcon)}
          onClick={() => {
            setOpen(false);
          }}
        />

        <div className={clsx(styles.controlBtn)}>
          <Button
            type="text"
            style={{ color: "#fff", fontSize: "24px" }}
            onClick={() => {
              handleNextPrev("prev");
            }}
          >
            <StepBackwardOutlined />
          </Button>
          <Button
            type="text"
            style={{ color: "#fff", fontSize: "36px" }}
            onClick={() => {
              if (stateAudio) {
                dispatch(PAUSE_SONG());
              } else {
                dispatch(PLAY_SONG());
              }
            }}
          >
            {stateAudio ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          </Button>
          <Button
            type="text"
            style={{ color: "#fff", fontSize: "24px" }}
            onClick={() => {
              handleNextPrev("next");
            }}
          >
            <StepForwardOutlined />
          </Button>
        </div>
        <img src={currentSong.img} alt="" />
      </div>
    );
  };
  const renderListSong = () => {
    return (
      <div
        className={
          isAppear
            ? clsx(
                styles.listSong,
                styles.appear,
                "animate__animated animate__fadeInRight"
              )
            : clsx(styles.listSong)
        }
      >
        <div className={clsx(styles.title)}>
          <p>Danh sách phát</p>
        </div>
        <div className={styles.playlist}>
          <ListSong data={data[index]} />
        </div>
      </div>
    );
  };

  const hanldeOpenListTable = () => {
    setAppear(!isAppear);
  };
  return (
    <div className={clsx("flex items-center justify-center", styles.volume)}>
      <div className={clsx("ms-5", styles.windowMode)}>
        <BorderOutlined
          className={clsx(styles.icon)}
          style={{
            marginRight: "12px",
          }}
          onClick={() => {
            setOpen(true);
          }}
        />
        {isOpen ? renderWindowMode() : null}
      </div>
      <div className="flex items-center w-3/6 mt-1">
        {volume === 0 ? (
          <BsVolumeMuteFill
            style={{
              color: "#fff",
              fontSize: "28px",
              cursor: "pointer",
              marginRight: "12px",
            }}
          />
        ) : (
          <BsFillVolumeUpFill
            style={{
              color: "#fff",
              fontSize: "28px",
              cursor: "pointer",
              marginRight: "12px",
            }}
          />
        )}

        <Slider
          value={volume}
          railStyle={{ backgroundColor: "#504b58" }}
          trackStyle={{ backgroundColor: "#fff" }}
          dots={false}
          style={{ width: "100%" }}
          onChange={(value) => onChangeVolume(value)}
        />
      </div>
      <div className="ps-4 ms-4" style={{ borderLeft: "1px solid #504b58" }}>
        <MenuUnfoldOutlined
          className={
            isAppear ? clsx(styles.icon, styles.active) : clsx(styles.icon)
          }
          onClick={hanldeOpenListTable}
        />
        {renderListSong()}
      </div>
    </div>
  );
};

export default UtilityButtons;

import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  RetweetOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { MdRepeatOne } from "react-icons/md";
import AudioControl from "./AudioControl";
import { CHOOSE_SONG } from "../actions/listSlice";
import { PLAY_SONG, PAUSE_SONG } from "../actions/audioSlice";
import { useSelector, useDispatch } from "react-redux";

import styles from "../sass/components/audioPlayer.module.scss";
import clsx from "clsx";

const AudioPlayer = (song) => {
  const linkAudio = useSelector((state) => state.listReducer.linkAudio);
  const stateAudio = useSelector((state) => state.audioReducer.isPlaySong);
  const currentSong = useSelector((state) => state.listReducer.chooseSong);
  const data = useSelector((state) => state.listReducer.data);
  const volume = useSelector((state) => state.audioReducer.volume);
  const [isRandom, setRandom] = useState(false);
  const [isRepeat, setRepeat] = useState(0);
  const [timeupdate, setTiemUpdate] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio(linkAudio));
  const dispatch = useDispatch();

  const [isPlaying, setPlaying] = useState(null);
  //find index of data
  const index = data.findIndex(
    (item) => item.category === currentSong.category
  );

  audioRef.current.volume = volume;

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

  //handle play/pause song
  useEffect(() => {
    if (isPlaying || stateAudio) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, stateAudio]);

  //render repeat button
  const renderRepeat = () => {
    switch (isRepeat) {
      case 0: {
        return <RetweetOutlined />;
      }
      case 1: {
        return <RetweetOutlined className={styles.btnActive} />;
      }
      case 2: {
        return (
          <MdRepeatOne className={clsx(styles.repeatOne, styles.btnActive)} />
        );
      }
      default: {
        return <RetweetOutlined />;
      }
    }
  };

  //handle when song end
  const handleEnded = () => {
    const newSong = data[index].danhSachBaiHat;
    if (isRepeat === 0) {
      if (currentSong.id === newSong.length - 1) {
        dispatch(PAUSE_SONG());
        setPlaying(false);
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
    } else if (isRepeat === 1) {
      //check if random btn is active
      if (isRandom) {
        const randomId = Math.floor(
          Math.random() * data[index].danhSachBaiHat.length
        );
        dispatch(
          CHOOSE_SONG({
            id: randomId,
            img: data[index].danhSachBaiHat[randomId].img,
            title: data[index].danhSachBaiHat[randomId].title,
            singer: data[index].danhSachBaiHat[randomId].singer,
            link: data[index].danhSachBaiHat[randomId].link,
            category: data[index].category,
          })
        );
        dispatch(PAUSE_SONG());
        setTimeout(() => {
          dispatch(PLAY_SONG());
        }, 200);
      } else {
        handleNextPrev("next");
      }
    } else {
      dispatch(PAUSE_SONG());
      setTimeout(() => {
        dispatch(PLAY_SONG());
      }, 200);
    }
  };
  return (
    <div>
      <div id={styles.audioButton}>
        <Button
          type="text"
          style={{ color: "#fff", fontSize: "24px" }}
          onClick={() => {
            setRandom(!isRandom);
          }}
        >
          <SwapOutlined className={isRandom ? clsx(styles.btnActive) : null} />
        </Button>
        <Button
          type="text"
          style={{ color: "#fff", fontSize: "24px" }}
          onClick={() => {
            handleNextPrev("prev");
          }}
        >
          <StepBackwardOutlined />
        </Button>

        {stateAudio ? (
          <PauseCircleOutlined
            style={{ color: "#fff", fontSize: "32px" }}
            onClick={() => {
              setPlaying(false);
              dispatch(PAUSE_SONG());
            }}
          />
        ) : (
          <PlayCircleOutlined
            style={{ color: "#fff", fontSize: "32px" }}
            onClick={() => {
              dispatch(PLAY_SONG());
              setPlaying(true);
            }}
          />
        )}

        <Button
          type="text"
          style={{ color: "#fff", fontSize: "24px" }}
          onClick={() => {
            handleNextPrev("next");
          }}
        >
          <StepForwardOutlined />
        </Button>
        <Button
          type="text"
          className={clsx(styles.repeatIcon)}
          onClick={() => {
            if (isRepeat === 2) {
              setRepeat(0);
            } else {
              let newVal = isRepeat + 1;
              setRepeat(newVal);
            }
          }}
        >
          {renderRepeat()}
        </Button>
      </div>
      <audio
        id="audio"
        src={linkAudio}
        ref={audioRef}
        onLoadedMetadata={(e) => {
          if (e.target.readyState > 0) {
            setDuration(audioRef.current.duration);
          }
        }}
        onTimeUpdate={() => {
          setTiemUpdate(audioRef.current.currentTime);
        }}
        onEnded={() => {
          handleEnded();
        }}
      ></audio>

      <div id="audioPlayBar" className="mt-3">
        {audioRef ? (
          <AudioControl
            source={audioRef}
            duration={duration}
            timeUpdate={timeupdate}
          />
        ) : (
          <AudioControl />
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;

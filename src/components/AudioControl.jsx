import React, { useState, useEffect } from "react";
import { Slider } from "antd";

const AudioControl = (props) => {
  const audioRef = props.source.current;
  const [trackProgress, setTrackProgress] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const duration = props.duration;
  const progressPercent = duration
    ? `${(trackProgress / duration) * 100}`
    : "0%";
  const trackingStyles = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${progressPercent}, #fff), color-stop(${progressPercent}, #777))
  `;

  useEffect(() => {
    setTrackProgress(props.timeUpdate);
    setMin(Math.floor(props.timeUpdate / 60));
    setSec(
      Math.floor(props.timeUpdate - Math.floor(props.timeUpdate / 60) * 60)
    );
  }, [props.timeUpdate]);

  const onScrub = (value) => {
    audioRef.currentTime = value;
    setTrackProgress(audioRef.currentTime);
  };

  const durationSong = () => {
    const min = Math.floor(`${duration}` / 60);
    const sec = `${duration}` - min * 60;
    return (
      <span style={{ color: "#fff" }} className="md:text-xs xl:text-lg">
        {min < 10 ? `0${min}` : min}:
        {Math.floor(sec) < 10 ? `0${Math.floor(sec)}` : `${Math.floor(sec)}`}
      </span>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center">
        <span style={{ color: "#fff" }} className="md:text-xs xl:text-lg">
          {min < 10 ? `0${min}` : min}: {sec < 10 ? `0${sec}` : sec}
        </span>
        <Slider
          value={trackProgress}
          step={1}
          min={0}
          max={duration ? duration : `${duration}`}
          railStyle={{ backgroundColor: "#504b58" }}
          trackStyle={{ background: trackingStyles }}
          onChange={(e) => onScrub(e)}
          dots={false}
          style={{ width: "80%", margin: "auto" }}
        />
        {durationSong()}
      </div>
    </div>
  );
};

export default AudioControl;

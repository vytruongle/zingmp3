import React, { useState } from "react";
import { Carousel, Button, Tabs, Row, Col, Tooltip, Image } from "antd";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_DATA } from "../../../actions/listSlice";
import { ADD_PLAYLIST, DEL_PLAYLIST } from "../../../actions/manageUser";
import { PAUSE_SONG, PLAY_SONG } from "../../../actions/audioSlice";
import ListNewSong from "../../../components/ListNewSong";
import { toast } from "react-toastify";

// scss
import styles from "../../../sass/contents/Discovery.module.scss";

// image for page footer
import JYP from "../../../data/image/JYP.webp";
import YG from "../../../data/image/YG.webp";
import SM from "../../../data/image/SM.webp";
import stone from "../../../data/image/stone.webp";
import universal from "../../../data/image/universal.webp";
import monstercat from "../../../data/image/monstercat.webp";

const Discovery = () => {
  const data = useSelector((state) => state.listReducer.data);
  const stateAudio = useSelector((state) => state.audioReducer.isPlaySong);
  const { accountLogin, registerList, indexUser } = useSelector(
    (state) => state.manageUser
  );
  const navigate = useNavigate();
  const notify = (text) => toast(text);
  const [index, setIndex] = useState(null);
  const dispatch = useDispatch();

  //handle playing song and load data
  const handlePlaySong = (item) => {
    dispatch(LOAD_DATA({ item, index: 0 }));
    if (stateAudio) {
      dispatch(PAUSE_SONG());
    } else {
      dispatch(PLAY_SONG());
    }
  };

  const handleHeartIcon = (category) => {
    if (registerList?.length === 0) {
      return false;
    } else {
      const index = registerList[indexUser]?.favorPlayList?.findIndex(
        (item) => item.category === category
      );
      if (index !== -1) {
        return true;
      } else {
        return false;
      }
    }
  };

  // render danh sach nhac
  const renderImg = () => {
    return data.map((item) => {
      return (
        <Button
          type="link"
          className={clsx(styles.carousel)}
          key={item.id}
          onClick={() => {
            navigate(`/album/album:${item.id}`);
            localStorage.setItem("data", JSON.stringify(item));
          }}
        >
          <img src={item.img} alt="" />
        </Button>
      );
    });
  };

  // render album
  const renderAlbum = () => {
    return data.map((item, id) => {
      return (
        <Col key={item.id} span={4} className={clsx(styles.albumItem)}>
          <img
            src={item.img}
            alt=""
            onClick={() => {
              navigate(`/album/album:${item.id}`);
              localStorage.setItem("data", JSON.stringify(item));
            }}
          />
          <div className={clsx(styles.groupBtn)}>
            <div>
              {handleHeartIcon(item.category) ? (
                <Tooltip title="Xóa khỏi danh sách">
                  <Button
                    shape="circle"
                    type="text"
                    onClick={() => {
                      if (accountLogin) {
                        notify("Đã xóa khỏi danh sách yêu thích");
                        dispatch(DEL_PLAYLIST(item));
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
                        dispatch(ADD_PLAYLIST(item));
                      } else {
                        navigate("/login");
                      }
                    }}
                    icon={<HeartOutlined className={clsx(styles.iconHeart)} />}
                  />
                </Tooltip>
              )}
            </div>
            <Button
              type="text"
              onClick={() => {
                setIndex(item.id);
                handlePlaySong(item);
              }}
            >
              {stateAudio && item.id === index ? (
                <PauseCircleOutlined className={clsx(styles.icon)} />
              ) : (
                <PlayCircleOutlined
                  className={clsx(styles.icon)}
                  onClick={() => {
                    navigate(`/album/album:${item.id}`);
                    localStorage.setItem("data", JSON.stringify(item));
                  }}
                />
              )}
            </Button>
          </div>
        </Col>
      );
    });
  };

  return (
    <div className={clsx(styles.item)}>
      <div className="container mx-auto px-6">
        {/* carousel */}
        <Carousel
          autoplay
          slidesToShow={3}
          slidesToScroll={1}
          autoplaySpeed={3000}
        >
          {renderImg()}
        </Carousel>
        {/* danh sach nhac */}
        <div className={clsx(styles.listNewSong, "px-4")}>
          <h1>Mới phát hành</h1>
          <Tabs
            tabBarGutter={16}
            items={data.map((item) => {
              return {
                label: (
                  <Button shape="round" className={clsx(styles.tabsBtn)}>
                    {item.category}
                  </Button>
                ),
                key: `${item.id}`,
                children: (
                  <ListNewSong
                    item={item.danhSachBaiHat}
                    category={item.category}
                  />
                ),
              };
            })}
          />
        </div>
        {/* album thinh hanh */}
        <div className={clsx(styles.listNewSong, "px-4")}>
          <h1>Album thịnh hành</h1>
          <Row
            justify="space-between"
            align="middle"
            className={clsx(styles.album)}
          >
            {renderAlbum()}
          </Row>
        </div>
        {/* footer of page */}
        <div className={clsx(styles.footer, "px-4")}>
          <h1>ĐỐI TÁC ÂM NHẠC</h1>
          <Row justify="space-between" align="middle">
            <Col span={4}>
              <Image className={clsx(styles.imgLogo)} src={JYP} />
            </Col>
            <Col span={4}>
              <Image className={clsx(styles.imgLogo)} src={YG} />
            </Col>
            <Col span={4}>
              <Image className={clsx(styles.imgLogo)} src={SM} />
            </Col>
            <Col span={4}>
              <Image className={clsx(styles.imgLogo)} src={stone} />
            </Col>
            <Col span={4}>
              <Image className={clsx(styles.imgLogo)} src={monstercat} />
            </Col>
            <Col span={4}>
              <Image className={clsx(styles.imgLogo)} src={universal} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Discovery;

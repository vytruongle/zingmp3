import { Row, Col, Image, Button, Tooltip } from "antd";
import clsx from "clsx";
import React from "react";
import {
  CaretRightOutlined,
  HeartOutlined,
  PauseOutlined,
  HeartFilled,
} from "@ant-design/icons";

// scss
import styles from "../sass/components/songDetail.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { CHOOSE_SONG } from "../actions/listSlice";
import { ADD_PLAYLIST, DEL_PLAYLIST, IS_CHOOSE } from "../actions/manageUser";
import { PAUSE_SONG, PLAY_SONG } from "../actions/audioSlice";
import { useNavigate } from "react-router-dom";

const SongDetail = () => {
  const data = JSON.parse(localStorage.getItem("data")) || false;
  const isPlaying = useSelector((state) => state.audioReducer.isPlaySong);
  const category = useSelector(
    (state) => state.listReducer.chooseSong.category
  );
  const { accountLogin, registerList, indexUser } = useSelector(
    (state) => state.manageUser
  );
  const index = useSelector((state) => state.listReducer.chooseSong.id);
  const dispatch = useDispatch();

  //create random like for album
  const like = (Math.floor(Math.random() * 10) + 1) * 1000;
  const navigate = useNavigate();

  //  handle Play song
  const handlePlaySong = (item, id) => {
    if (isPlaying && id === index && category === data.category) {
      dispatch(PAUSE_SONG());
    } else {
      dispatch(
        CHOOSE_SONG({
          id: id,
          img: item.img,
          title: item.title,
          singer: item.singer,
          link: item.link,
          category: data.category,
        })
      );
      dispatch(PAUSE_SONG());
      setTimeout(() => {
        dispatch(PLAY_SONG());
      }, 200);
    }
  };

  const handleHeartIcon = (category) => {
    if (registerList[indexUser].favorPlayList.length === 0) {
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

  //   render list song
  const renderSongs = () => {
    return data?.danhSachBaiHat?.map((item, id) => {
      return (
        <tr
          key={id}
          onDoubleClick={() => {
            handlePlaySong(item, id);
          }}
          className={
            id === index && category === data.category
              ? clsx(styles.bgActive, styles.active, " border-b")
              : clsx(styles.bgActive, " border-b")
          }
        >
          <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap">
            <span style={{ color: "#fff" }}>{id + 1}</span>
          </th>
          <td className="px-6 py-4">
            <div className={clsx(styles.infoSong)}>
              <div
                className={clsx(styles.imgSong)}
                onClick={() => {
                  handlePlaySong(item, id);
                  dispatch(IS_CHOOSE(false));
                }}
              >
                <img src={item.img} alt="" />
                {isPlaying && index === id && category === data.category ? (
                  <PauseOutlined className={clsx(styles.btnControl)} />
                ) : (
                  <CaretRightOutlined className={clsx(styles.btnControl)} />
                )}
              </div>
              <h3>{item.title}</h3>
            </div>
          </td>
          <td className="px-6 py-4 ">
            <p className={clsx(styles.singer)}>{item.singer}</p>
          </td>
          <td className="px-6 py-4 ">
            <p className={clsx(styles.singer)}>{item.duration}</p>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className={clsx(styles.songDetail)}>
      <div className="w-[96%] mx-auto">
        <Row justify={"space-between"} align={"center"}>
          <Col
            span={8}
            style={{ marginTop: "40px" }}
            className="text-center leading-[1.8]"
          >
            <Image src={data?.img} width={360} className={styles.image} />
            <div className={clsx(styles.detailInfo)}>
              <h1>Những bài {data?.category} hay nhất</h1>
              <p>{like} người yêu thích</p>
              <div className="flex items-center justify-center mt-3">
                {isPlaying && category === data.category ? (
                  <Button
                    type="text"
                    shape="round"
                    icon={<PauseOutlined />}
                    className={clsx(styles.playBtn)}
                    onClick={() => {
                      dispatch(PAUSE_SONG());
                    }}
                  >
                    PHÁT BÀI HÁT
                  </Button>
                ) : (
                  <Button
                    type="text"
                    shape="round"
                    icon={<CaretRightOutlined />}
                    className={clsx(styles.playBtn)}
                    onClick={() => {
                      dispatch(PLAY_SONG());
                    }}
                  >
                    PHÁT BÀI HÁT
                  </Button>
                )}
                {/* Heart icon to insert.remove favorite song */}
                {handleHeartIcon(data.category) ? (
                  <Tooltip title="Xóa khỏi danh sách">
                    <Button
                      shape="circle"
                      type="text"
                      onClick={() => {
                        if (accountLogin) {
                          dispatch(
                            DEL_PLAYLIST({
                              id: data.id,
                              category: data.category,
                            })
                          );
                        } else {
                          navigate("/login");
                        }
                      }}
                      icon={
                        <HeartFilled
                          className={clsx(styles.icon, styles.active)}
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
                          dispatch(ADD_PLAYLIST(data));
                        } else {
                          navigate("/login");
                        }
                      }}
                      icon={<HeartOutlined className={clsx(styles.icon)} />}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </Col>
          <Col span={16}>
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase">
                <tr style={{ color: "#fff" }}>
                  <th scope="col" className="px-6 py-3">
                    STT
                  </th>
                  <th className="px-6 py-3">BÀI HÁT</th>
                  <th className="px-6 py-3">CA SĨ</th>
                  <th className="px-6 py-3">THỜI GIAN</th>
                </tr>
              </thead>
              <tbody>{renderSongs()}</tbody>
            </table>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SongDetail;

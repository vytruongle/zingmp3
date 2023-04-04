import { Row, Col, Image, Button, Tooltip } from "antd";
import clsx from "clsx";
import React, { useEffect } from "react";
import {
  CaretRightOutlined,
  HeartOutlined,
  PauseOutlined,
  HeartFilled,
} from "@ant-design/icons";

// scss
import styles from "../sass/components/songDetail.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { CHOOSE_SONG, ADD_PLAYLIST, DEL_PLAYLIST } from "../actions/listSlice";
import { PAUSE_SONG, PLAY_SONG } from "../actions/audioSlice";

const SongDetail = () => {
  const data = JSON.parse(localStorage.getItem("data")) || false;
  const isPlaying = useSelector((state) => state.audioReducer.isPlaySong);
  const favorPlaylistId = useSelector(
    (state) => state.listReducer.favorPlaylistId
  );
  const favorPlaylist = useSelector((state) => state.listReducer.favorPlaylist);
  const index = useSelector((state) => state.listReducer.chooseSong.id);
  const dispatch = useDispatch();

  //create random like for album
  const like = (Math.floor(Math.random() * 10) + 1) * 1000;

  //save favorite list to local storage
  useEffect(() => {
    localStorage.setItem("favorPlaylist", JSON.stringify(favorPlaylist));
    localStorage.setItem("favorPlaylistId", JSON.stringify(favorPlaylistId));
  }, [favorPlaylist, favorPlaylistId]);

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
          category: data.category,
        })
      );
      dispatch(PAUSE_SONG());
      setTimeout(() => {
        dispatch(PLAY_SONG());
      }, 200);
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
            id === index
              ? clsx(styles.bgActive, styles.active)
              : clsx(styles.bgActive)
          }
        >
          <th scope="col">
            <span style={{ color: "#fff" }}>{id + 1}</span>
          </th>
          <td>
            <div className={clsx(styles.infoSong)}>
              <div
                className={clsx(styles.imgSong)}
                onClick={() => {
                  handlePlaySong(item, id);
                }}
              >
                <img src={item.img} alt="" />
                {isPlaying && index === id ? (
                  <PauseOutlined className={clsx(styles.btnControl)} />
                ) : (
                  <CaretRightOutlined className={clsx(styles.btnControl)} />
                )}
              </div>
              <h3>{item.title}</h3>
            </div>
          </td>
          <td>
            <p className={clsx(styles.singer)}>{item.singer}</p>
          </td>
          <td>
            <p className={clsx(styles.singer)}>{item.duration}</p>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className={clsx(styles.songDetail)}>
      <div style={{ width: "90%", margin: "auto" }}>
        <Row justify={"space-between"} align={"center"}>
          <Col span={8} style={{ marginTop: "40px" }}>
            <Image src={data?.img} width={360} className={styles.image} />
            <div className={clsx(styles.detailInfo)}>
              <h1>Những bài {data?.category} hay nhất</h1>
              <p>{like} người yêu thích</p>
              <div className="d-flex align-items-center justify-content-center">
                {isPlaying ? (
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
                {favorPlaylistId.includes(data.category) ? (
                  <Tooltip title="Xóa khỏi danh sách">
                    <Button
                      shape="circle"
                      type="text"
                      onClick={() => {
                        dispatch(
                          DEL_PLAYLIST({
                            id: data.id,
                            category: data.category,
                          })
                        );
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
                      onClick={() => dispatch(ADD_PLAYLIST(data))}
                      icon={<HeartOutlined className={clsx(styles.icon)} />}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </Col>
          <Col span={16}>
            <table className="table table-hover" style={{ border: "none" }}>
              <thead>
                <tr style={{ color: "#fff" }}>
                  <th scope="col">STT</th>
                  <th>BÀI HÁT</th>
                  <th>CA SĨ</th>
                  <th>THỜI GIAN</th>
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

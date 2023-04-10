import React, { useEffect } from "react";
import clsx from "clsx";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Col, Row, Tabs } from "antd";

import styles from "../sass/components/SearchList.module.scss";
import { PAUSE_SONG, PLAY_SONG } from "../actions/audioSlice";
import { CHOOSE_SONG } from "../actions/listSlice";

const SearchList = () => {
  const searchList = useSelector((state) => state.listReducer.listSearch);
  const word = useSelector((state) => state.listReducer.searchWord);
  const isPlaying = useSelector((state) => state.audioReducer.isPlaySong);
  const index = useSelector((state) => state.listReducer.chooseSong.id);
  const bigData = useSelector((state) => state.listReducer.data);
  const dispatch = useDispatch();
  let singerList = [];
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      q: word,
    });
  }, [setSearchParams, word]);

  console.log(searchParams);

  //function change vietnamese to non vietnamese
  function toLowerCaseNonAccentVietnamese(str) {
    str = str.toLowerCase();
    //     We can also use this instead of from line 11 to line 17
    //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
    //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
    //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
    //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
    //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
    //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
    //     str = str.replace(/\u0111/g, "d");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  //song list
  const songList = searchList?.filter((item) => {
    const newTitle = toLowerCaseNonAccentVietnamese(item.title);
    return newTitle.includes(word);
  });

  //singer list
  const subList = searchList?.filter((item) => {
    const newSinger = toLowerCaseNonAccentVietnamese(item.singer);
    return newSinger.includes(word);
  });

  subList?.filter((item) => {
    const isExist = singerList.includes(item["singer"]);
    if (!isExist) {
      singerList.push(item["singer"]);
      return true;
    }
    return false;
  });

  //render song list after search
  const renderSongDetail = () => {
    return songList?.map((item, id) => {
      return (
        <Row
          className={clsx(styles.rowSong, " m-3 p-2")}
          gutter={16}
          justify={"space-between"}
          align={"middle"}
          key={id}
        >
          <Col span={12}>
            <div className="flex items-center">
              <div
                className={clsx(styles.imgSong)}
                onClick={() => {
                  handlePlaySong(item, id);
                }}
              >
                <img
                  className="w-[60px] h-[60px] rounded-md mr-3"
                  src={item.img}
                  alt={item.img}
                />
                {isPlaying && index === id ? (
                  <PauseOutlined className={clsx(styles.btnControl)} />
                ) : (
                  <CaretRightOutlined className={clsx(styles.btnControl)} />
                )}
              </div>
              <div className="text-white leading-6">
                <h1 className="font-semibold text-[1rem]">{item.title}</h1>
                <p className="text-[#7b7584] text-[0.75rem]">{item.singer}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <p className="text-[#7b7584] text-[1rem]">{item.title} Single</p>
          </Col>
          <Col span={6}>
            <p className="text-[#7b7584] text-[1rem] text-end">
              {item.duration}
            </p>
          </Col>
        </Row>
      );
    });
  };

  //render artist after search
  const renderSearchSinger = () => {
    const cloneSingerLList = [...singerList];
    return subList?.map((item, id) => {
      if (cloneSingerLList.includes(item.singer)) {
        const index = cloneSingerLList.indexOf(item.singer);
        cloneSingerLList.splice(index, 1);
        return (
          <div key={id}>
            <img
              className="rounded-[100%] hover:scale-110 ease-out duration-300"
              src={item.img}
              alt={item.img}
              key={id}
            />

            <h1 className="text-white font-semibold text-[1rem] leading-4 text-center my-3">
              {item.singer}
            </h1>
          </div>
        );
      }
      return null;
    });
  };

  //handle play song
  const handlePlaySong = (item, id) => {
    if (isPlaying && id === index) {
      dispatch(PAUSE_SONG());
    } else {
      let category = "";
      bigData.map((data) => {
        if (data.danhSachBaiHat.includes(item)) {
          category = data.category;
          return true;
        }
        return false;
      });

      setTimeout(() => {
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
      }, 200);
    }
  };

  const items = [
    {
      key: "1",
      label: <h1 className="text-white text-xl font-semibold">Tất cả</h1>,
      children: (
        <div>
          {songList.length > 0 ? (
            <div className=" mt-8">
              <h1 className=" text-white text-3xl mb-4 font-semibold">
                Bài hát
              </h1>
              <div>{renderSongDetail()}</div>
            </div>
          ) : null}
          {singerList.length > 0 ? (
            <div className="mt-8">
              <h1 className="text-white text-3xl mb-4 font-semibold">
                Nghệ sĩ
              </h1>
              <div className="grid grid-cols-5 gap-8">
                {renderSearchSinger()}
              </div>
            </div>
          ) : null}
        </div>
      ),
    },
    {
      key: "2",
      label: <h1 className="text-white text-xl font-semibold">Bài hát</h1>,
      children: (
        <div>
          {songList.length > 0 ? (
            <div className=" mt-8">
              <h1 className=" text-white text-3xl mb-4 font-semibold">
                Bài hát
              </h1>
              <div>{renderSongDetail()}</div>
            </div>
          ) : null}
        </div>
      ),
    },
    {
      key: "3",
      label: <h1 className="text-white text-xl font-semibold">Nghệ sĩ</h1>,
      children: (
        <div>
          {singerList.length > 0 ? (
            <div className="mt-8">
              <h1 className="text-white text-3xl mb-4 font-semibold">
                Nghệ sĩ
              </h1>
              <div className="grid grid-cols-5 gap-8">
                {renderSearchSinger()}
              </div>
            </div>
          ) : null}
        </div>
      ),
    },
  ];
  return (
    <div id={clsx(styles.search)}>
      <div className="w-[95%] mx-auto">
        {word && searchList.length > 0 ? (
          <Tabs defaultActiveKey="1" items={items} />
        ) : (
          <h1 className="text-white font-semibold text-xl">
            Không tìm thấy kết quả !
          </h1>
        )}
      </div>
    </div>
  );
};

export default SearchList;

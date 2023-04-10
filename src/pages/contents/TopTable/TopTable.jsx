import clsx from "clsx";
import React from "react";
import { Tabs } from "antd";

import styles from "../../../sass/contents/TopTable.module.scss";
import { useSelector } from "react-redux";
import ListSongTable from "../../../components/ListSongTable";
import bgHeader from "../../../data/image/hinh-anh-dep-ve-am-nhac-music-100.webp";

const TopTable = () => {
  const data = useSelector((state) => state.listReducer.data);

  return (
    <div id={clsx(styles.topTable)} className="container mx-auto px-8">
      <div className={clsx(styles.table)}>
        <div className="container mx-auto">
          <img className={clsx(styles.bgHeader)} src={bgHeader} alt="" />

          <h1 className="mb-5 text-4xl font-semibold">BXH Âm Nhạc</h1>
          <Tabs
            tabBarGutter={16}
            items={data.map((item) => {
              return {
                label: <h3>{item.category}</h3>,
                key: `${item.id}`,
                children: (
                  <ListSongTable
                    danhSachBaiHat={item.danhSachBaiHat}
                    category={item.category}
                  />
                ),
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default TopTable;

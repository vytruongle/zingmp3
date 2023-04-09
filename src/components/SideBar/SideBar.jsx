import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import clsx from "clsx";

import styles from "../../sass/pages/SideBar.module.scss";

import logo from "../../data/image/zing-logo.webp";

const SideBar = () => {
  const location = useLocation().pathname;

  return (
    <div>
      <nav className={clsx(styles.sideBar)}>
        <div className={clsx(styles.logo)}>
          <img src={logo} alt="Zing mp3 logo" />
        </div>
        <ul className={clsx(styles.listItem)}>
          <li className={location === "/" ? clsx(styles.active) : null}>
            <Link to="/">
              <i className="fa-regular fa-circle-dot"></i>
              <span className="ms-2">Discovery</span>
            </Link>
          </li>
          <li className={location === "/mymusic" ? clsx(styles.active) : null}>
            <Link to="/mymusic">
              <i className="fa-solid fa-compact-disc"></i>
              <span className="ms-2">Personal</span>
            </Link>
          </li>
          <li className={location === "/toptable" ? clsx(styles.active) : null}>
            <Link to="/toptable">
              <i className="fa-regular fa-star"></i>
              <span className="ms-2">Top table</span>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default SideBar;

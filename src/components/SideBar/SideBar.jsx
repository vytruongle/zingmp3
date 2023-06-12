import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

import styles from "../../sass/pages/SideBar.module.scss";

import logo from "../../data/image/zing-logo.webp";
import { ToastContainer, toast } from "react-toastify";

const SideBar = () => {
  const location = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);
  const notify = (text) =>
    toast.warn(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const user = JSON.parse(localStorage.getItem("account"));
  const navigate = useNavigate();
  return (
    <div>
      <nav
        className={clsx(
          styles.sideBar,
          "ssm:hidden md:hidden xl:block xl:w-[15%]"
        )}
      >
        <a href="/" className={clsx(styles.logo, "block")}>
          <img src={logo} alt="Zing mp3 logo" />
        </a>
        <ul className={clsx(styles.listItem)}>
          <li
            className={
              location === "/"
                ? clsx(styles.active, styles.item)
                : clsx(styles.item)
            }
          >
            <Link to="/">
              <i className="fa-regular fa-circle-dot"></i>
              <span className="ms-2">Khám phá</span>
            </Link>
          </li>
          {user ? (
            <li
              className={
                location === "/mymusic"
                  ? clsx(styles.active, styles.item)
                  : clsx(styles.item)
              }
            >
              <Link to="/mymusic">
                <i className="fa-solid fa-compact-disc"></i>
                <span className="ms-2">Thư viện</span>
              </Link>
            </li>
          ) : (
            <li
              className={clsx(styles.item, "pl-[13%]")}
              onClick={() => {
                navigate("/login");
              }}
            >
              <div className="text-white">
                <i className="fa-solid fa-compact-disc text-xl"></i>
                <span className="ms-2">Thư viện</span>
              </div>
            </li>
          )}
          <li
            className={
              location === "/toptable"
                ? clsx(styles.active, styles.item)
                : clsx(styles.item)
            }
          >
            <Link to="/toptable">
              <i className="fa-regular fa-star"></i>
              <span className="ms-2">Bảng xếp hạng</span>
            </Link>
          </li>
          <li
            className={clsx(styles.item, "pl-[13%]")}
            onClick={() => {
              notify(
                "Tính năng hiện chưa được cập nhật, bạn vui lòng thông cảm nhé"
              );
              return <ToastContainer />;
            }}
          >
            <div className="text-white">
              <i className="fa-solid fa-podcast text-xl"></i>
              <span className="ms-2">Radio</span>
            </div>
          </li>
          <li
            className={clsx(styles.item, "pl-[13%]")}
            onClick={() => {
              notify(
                "Tính năng hiện chưa được cập nhật, bạn vui lòng thông cảm nhé"
              );
              return <ToastContainer />;
            }}
          >
            <div className="text-white">
              <i className="fa-solid fa-chart-line text-xl"></i>
              <span className="ms-2">#Zingchart</span>
            </div>
          </li>
          <li
            className={clsx(styles.item, "pl-[13%]")}
            onClick={() => {
              notify(
                "Tính năng hiện chưa được cập nhật, bạn vui lòng thông cảm nhé"
              );
              return <ToastContainer />;
            }}
          >
            <div className="text-white">
              <i className="fa-brands fa-squarespace text-xl"></i>
              <span className="ms-2">Chủ đề & thể loại</span>
            </div>
          </li>
          {user ? (
            <li>
              <div className="bg-gradient-to-r from-[#604de6] to-[#bf6ad8] rounded-lg py-4 px-3 mx-4 3xl:mx-9 flex flex-col items-center gap-2">
                <p className="font-bold text-white text-xs text-center">
                  Nghe nhạc không quảng cáo cùng kho nhạc PREMIUM
                </p>
                <button className="text-black bg-[#ffdb00] hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-xs px-5 py-2.5 text-center mr-2 mb-2 ">
                  NÂNG CẤP TÀI KHOẢN
                </button>
              </div>
            </li>
          ) : (
            <li>
              <div className="bg-gradient-to-r from-[#9b4de0] to-[#9b4de0] rounded-lg py-4 px-3 mx-3 3xl:mx-9 flex flex-col items-center gap-2">
                <p className="font-bold text-white text-xs text-center">
                  Đăng nhập để khám phá playlist dành riêng cho bạn
                </p>
                <button
                  className="text-white bg-transparent border border-white hover:opacity-70 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-10 py-2 text-center mr-2 mb-2 "
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Đăng nhập
                </button>
              </div>
            </li>
          )}
        </ul>
      </nav>
      {isOpen === false ? (
        <div
          className={clsx(
            styles.sideBar,
            "ssm:block md:block ssm:w-[5%] md:w-[5%] md:left-0 md:z-10 md:shadow-xl xl:hidden"
          )}
        >
          <div
            className="text-white text-2xl py-3 px-3 transition duration-300"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      ) : (
        <div className="">
          <div
            className="ssm:fixed md:fixed ssm:w-full md:w-full bg-gray-700 opacity-50 md:h-full z-10 transition-all duration-300"
            onClick={() => {
              setIsOpen(false);
            }}
          ></div>
          <nav
            className={clsx(
              styles.sideBar,
              " ssm:block ssm:!h-full md:block ssm:w-[100%] md:w-[30%] z-10 md:shadow-xl xl:hidden transition-all duration-300 ease-in"
            )}
          >
            <div className={clsx(styles.logo, "flex")}>
              <a href="/">
                <img src={logo} alt="Zing mp3 logo" />
              </a>
              <div
                className="text-white text-lg absolute top-2 right-3"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
            <ul className={clsx(styles.listItem)}>
              <li
                className={
                  location === "/"
                    ? clsx(styles.active, styles.item)
                    : clsx(styles.item)
                }
              >
                <Link to="/">
                  <i className="fa-regular fa-circle-dot"></i>
                  <span className="ms-2">Khám phá</span>
                </Link>
              </li>
              {user ? (
                <li
                  className={
                    location === "/mymusic"
                      ? clsx(styles.active, styles.item)
                      : clsx(styles.item)
                  }
                >
                  <Link to="/mymusic">
                    <i className="fa-solid fa-compact-disc"></i>
                    <span className="ms-2">Thư viện</span>
                  </Link>
                </li>
              ) : (
                <li
                  className={clsx(styles.item, "pl-[13%]")}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <div className="text-white">
                    <i className="fa-solid fa-compact-disc text-xl"></i>
                    <span className="ms-2">Thư viện</span>
                  </div>
                </li>
              )}
              <li
                className={
                  location === "/toptable"
                    ? clsx(styles.active, styles.item)
                    : clsx(styles.item)
                }
              >
                <Link to="/toptable">
                  <i className="fa-regular fa-star"></i>
                  <span className="ms-2">Bảng xếp hạng</span>
                </Link>
              </li>
              <li
                className={clsx(styles.item, "pl-[13%]")}
                onClick={() => {
                  notify(
                    "Tính năng hiện chưa được cập nhật, bạn vui lòng thông cảm nhé"
                  );
                  return <ToastContainer />;
                }}
              >
                <div className="text-white">
                  <i className="fa-solid fa-podcast text-xl"></i>
                  <span className="ms-2">Radio</span>
                </div>
              </li>
              <li
                className={clsx(styles.item, "pl-[13%]")}
                onClick={() => {
                  notify(
                    "Tính năng hiện chưa được cập nhật, bạn vui lòng thông cảm nhé"
                  );
                  return <ToastContainer />;
                }}
              >
                <div className="text-white">
                  <i className="fa-solid fa-chart-line text-xl"></i>
                  <span className="ms-2">#Zingchart</span>
                </div>
              </li>
              <li
                className={clsx(styles.item, "pl-[13%]")}
                onClick={() => {
                  notify(
                    "Tính năng hiện chưa được cập nhật, bạn vui lòng thông cảm nhé"
                  );
                  return <ToastContainer />;
                }}
              >
                <div className="text-white">
                  <i className="fa-brands fa-squarespace text-xl"></i>
                  <span className="ms-2">Chủ đề & thể loại</span>
                </div>
              </li>
              {user ? (
                <li>
                  <div className="bg-gradient-to-r from-[#604de6] to-[#bf6ad8] rounded-lg py-4 px-3 mx-3 3xl:mx-9 flex flex-col items-center gap-2">
                    <p className="font-bold text-white text-xs text-center">
                      Nghe nhạc không quảng cáo cùng kho nhạc PREMIUM
                    </p>
                    <button className="text-black bg-[#ffdb00] hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-xs px-5 py-2.5 text-center mr-2 mb-2 ">
                      NÂNG CẤP TÀI KHOẢN
                    </button>
                  </div>
                </li>
              ) : (
                <li>
                  <div className="bg-gradient-to-r from-[#9b4de0] to-[#9b4de0] rounded-lg py-4 px-3 mx-3 3xl:mx-9 flex flex-col items-center gap-2">
                    <p className="font-bold text-white text-xs text-center">
                      Đăng nhập để khám phá playlist dành riêng cho bạn
                    </p>
                    <button
                      className="text-white bg-transparent border border-white hover:opacity-70 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-10 py-2 text-center mr-2 mb-2 "
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Đăng nhập
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default SideBar;

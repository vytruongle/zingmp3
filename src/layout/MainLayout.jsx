import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import clsx from "clsx";
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";

const MainLayout = () => {
  return (
    <div className={clsx("flex flex-col h-full")}>
      <Header />
      <SideBar />
      <div className={clsx("flex flex-col h-full")}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar";

import { AppData } from "../../App";
import SlideBar from "../../components/slideBar/SlideBar";
export default function DashboardLayout() {
  const navagite = useNavigate();

  const {
    token,
    setToken,
    userLogin,
    setUserLogin,
    darkMode,
    setDarkMode,
    userData,
    setUserData,
    IsLogin,
    setIsLogin,
    IsRegister,
    setIsRegister,
  } = useContext(AppData);
  // ===========================================================

  //   useEffect(() => {
  //     if (IsLogin) return;
  //     navagite("/login");
  //   }, [IsLogin]);
  // ===========================================================

  return (
    <div>
      <header>
        <DashboardNavbar />
      </header>
      <main className="h-hero  flex">
        <div className="w-1/6">
          <SlideBar />
        </div>
        <div className="w-5/6 bg-gray-100 p-4 pl-0">
          <div className="bg-white rounded-lg h-full p-4 ">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import { useContext } from "react";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar";

import { AppData } from "../../App";
import SlideBar from "../../components/slideBar/SlideBar";
export default function DashboardLayout() {
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
  return (
    <div>
      <header>
        <DashboardNavbar />
      </header>
      <main className="h-hero  flex">
        <div className="w-1/5">
          <SlideBar />
        </div>
        <div className="w-4/5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

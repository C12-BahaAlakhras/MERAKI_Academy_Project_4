import { Outlet } from "react-router-dom";
import { useContext } from "react";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar";
import HomeNavbar from "../../components/Navbar/HomeNavbar";
import { AppData } from "../../App";
export default function Main() {
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
      <header>{token ? <DashboardNavbar /> : <HomeNavbar />}</header>
      <main className="h-hero">
        <Outlet />
      </main>
    </div>
  );
}

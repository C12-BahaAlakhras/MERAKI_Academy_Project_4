import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar";

import SlideBar from "../../components/slideBar/SlideBar";
import Loading from "../../components/Loading";
import { useAuthContext } from "../../contexts/AuthProvider";
import "./index.css";

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
    loading,
    setLoading,
    projects,
    setProjects,
  } = useAuthContext();
  // setLoading(true);
  //   const [loadingOne, setLoadingOne] = useState(false);
  // ===========================================================

  useEffect(() => {
    console.log("inside settime storedUserData ==> ", userData);
    setTimeout(() => {
      if (!projects) {
        return;
      } else {
        setLoading(false);
      }
    }, 10);
  }, []);

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
          <div className="bg-white rounded-lg h-full p-4 overflow-y-auto custom-scrollbar">
            {/* {loading ? <Loading /> : <Outlet />} */}
            {loading ? <Loading /> : <Outlet />}
          </div>
        </div>
      </main>
    </div>
  );
}

{
  /* <div>
{loading ? (
  <Loading />
) : (
  <>
    <header>
      <DashboardNavbar />
    </header>
    <main className="h-hero  flex">
      <div className="w-1/6">
        <SlideBar />
      </div>
      <div className="w-5/6 bg-gray-100 p-4 pl-0">
        <div className="bg-white rounded-lg h-full p-4 overflow-y-auto custom-scrollbar">
          {loading ? <Loading /> : <Outlet />}
        </div>
      </div>
    </main>
  </>
)}
</div> */
}

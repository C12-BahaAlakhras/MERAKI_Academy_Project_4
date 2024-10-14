import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppData } from "../../App";
import { FaSun, FaMoon } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import "./DashboardNavbar.css";

const DashboardNavbar = () => {
  //===========================================================

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

  //===========================================================
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className="navbar h-header">
      {/* Left Section: Board Name */}
      <div className="navbar-board-name">{userData.userBoard?.boardName}</div>

      {/* Right Section */}

      <div className="right-section">
        {/*Search Bar */}
        <div className="navbar-search-container">
          <input
            type="text"
            placeholder="Search..."
            className="navbar-search-input"
          />
        </div>
        <div className="pr-2">
          <button
            onClick={handleThemeToggle}
            className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-lg shadow-lg hover:scale-110 transform transition-transform duration-300 ease-in-out"
          >
            {darkMode ? <FaSun size={12} /> : <FaMoon size={12} />}
          </button>
        </div>

        {/* Right Section: User Info & Notification */}
        <div className="navbar-right">
          {/* Notification Icon */}
          <button className="navbar-notification-btn">
            <MdNotifications className="navbar-notification-icon" />
          </button>

          {/* User Info */}
          <div className="navbar-user-info">
            {/* Circle with User Initial */}
            <div className="navbar-user-initial">
              {userData.fullName[0]?.toUpperCase()}
            </div>
            {/* Username */}
            <span className="navbar-username">
              {userData.fullName?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;

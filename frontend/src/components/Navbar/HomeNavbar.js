import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppData } from "../../App";

import { FaSun, FaMoon } from "react-icons/fa";
const HomeNavbar = () => {
  const { darkMode, setDarkMode } = useContext(AppData);

  // Toggle between dark and light mode
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  // Apply theme based on darkMode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="h-header flex justify-between items-center p-8  bg-light dark:bg-gray-800 transition-all duration-300">
      <div className="">
        <p className="text-xl font-bold text-primary dark:text-white">
          <Link to={"/"}> Baha Alakhras</Link>
        </p>
      </div>

      {/* Dark/Light Mode Toggle */}
      <div className="">
        <button
          onClick={handleThemeToggle}
          className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-lg shadow-lg hover:scale-110 transform transition-transform duration-300 ease-in-out"
        >
          {darkMode ? <FaSun size={15} /> : <FaMoon size={15} />}
        </button>
      </div>
    </div>
  );
};

export default HomeNavbar;

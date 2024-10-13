import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { AppData } from "../App";

const Home = () => {
  const { darkMode, setDarkMode } = useContext(AppData);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="relative h-hero flex items-center justify-center bg-gray-50 dark:bg-gray-800 transition-all duration-300">
      {/* Hero Content */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-xl rounded-lg py-10 px-6 w-full max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-primary dark:text-gray-200 mb-4">
          Welcome to Our Task Manager System
        </h1>
        <p className="text-lg text-text dark:text-gray-400 mb-8">
          Manage your tasks effortlessly with an intuitive interface and
          powerful features.
        </p>

        {/* Buttons */}
        <div className="space-x-4">
          <Link
            to="/register"
            className=" bg-accent dark:bg-black text-white  dark:border-gray-500 dark:text-gray-300 px-6 py-3 rounded-lg shadow-md transform transition-transform duration-500"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-transparent border border-accent text-accent dark:border-gray-500 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-accent hover:text-white dark:hover:bg-gray-500 dark:hover:text-white hover:scale-105 transform transition-transform duration-500"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

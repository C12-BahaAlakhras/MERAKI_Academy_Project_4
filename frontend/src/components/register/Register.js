import React from "react";
import { useState, useContext, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { AppData } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";

const Register = () => {
  const navagite = useNavigate();
  const {
    userData,
    setUserData,
    darkMode,
    setDarkMode,
    IsLogin,
    setIsLogin,
    IsRegister,
    setIsRegister,
  } = useAuthContext();

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  // =============================

  const fullNameInput = (e) => {
    setUserData({ ...userData, fullName: e.target.value });
  };
  // =============================
  const positionInput = (e) => {
    setUserData({ ...userData, position: e.target.value });
  }; // =============================
  const emailInput = (e) => {
    setUserData({ ...userData, email: e.target.value });
  }; // =============================
  const passwordInput = (e) => {
    setUserData({ ...userData, password: e.target.value });
  }; // =============================
  const boardNamenInput = (e) => {
    setUserData({ ...userData, boardName: e.target.value });
  }; // =============================
  // =============================
  const submit = () => {
    console.log("inside submeit btn");
    axios
      .post("http://localhost:5000/users/register", userData)
      .then((res) => {
        console.log("register successfully:", res.data);
        setMessage(res.data.message);
        setError(false);
        setIsRegister(true);
      })
      .catch((err) => {
        console.log("register error:", err.message);
        setMessage(err.response.data.message);
        setError(true);
        setIsRegister(false);
      });
  };

  useEffect(() => {
    if (!IsRegister) return;

    navagite("/login");
  }, [IsRegister]);

  return (
    <div className="h-hero flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        {/* Card Content */}
        <div className="text-left mb-6">
          <h1 className="text-4xl font-semibold">Sign Up</h1>
        </div>

        <div className="space-y-4">
          {/* Full Name Field */}
          <div className="space-y-1">
            <input
              type="text"
              onChange={fullNameInput}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Full name"
              required
            />
          </div>

          {/* Position Field */}
          <div className="space-y-1">
            <input
              type="text"
              onChange={positionInput}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Position"
              required
            />
          </div>
          {/* board name Field */}
          <div className="space-y-1">
            <input
              type="text"
              onChange={boardNamenInput}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Board or Company Name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <input
              type="email"
              onChange={emailInput}
              className={`w-full px-4 py-2 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
              placeholder="Email"
              required
            />
            {error && (
              <p className="text-red-500 text-sm">
                Email or Password is incorrect
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <input
              type="password"
              onChange={passwordInput}
              className={`w-full px-4 py-2 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
              placeholder="••••••"
              required
            />
            {error && (
              <p className="text-red-500 text-sm">
                Email or Password is incorrect
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={submit}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
          {/* Sign Up Link */}
          <p className="text-center text-gray-700 mt-4">
            Do you have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-4">
          <span className="w-full h-px bg-gray-300"></span>
          <span className="px-2 text-gray-500">or</span>
          <span className="w-full h-px bg-gray-300"></span>
        </div>

        {/* Social Media Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => alert("Signup with Google")}
            className="w-full flex items-center justify-center border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100"
          >
            <FaGoogle className="mr-2" />
            Signup with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

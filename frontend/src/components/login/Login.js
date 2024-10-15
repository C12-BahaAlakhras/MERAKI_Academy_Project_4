import React from "react";
import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthProvider";

const Login = () => {
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
  } = useAuthContext();

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(false);

  // =========================================================================
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  // ===========================================================
  const emailInput = (e) => {
    setUserLogin({ ...userLogin, email: e.target.value });
  };
  // ===========================================================
  const passwordInput = (e) => {
    setUserLogin({ ...userLogin, password: e.target.value });
  };

  const loginBtn = () => {
    setLoading(true);

    axios
      .post("http://localhost:5000/users/login", userLogin)
      .then((res) => {
        setMessage(res.data.message);
        setIsError(false);
        setIsLogin(true);
        const tokenUser = res.data.token;
        setToken(tokenUser);
        setUserData(res.data);
        setLoading(false);

        // Store the login state and user data in localStorage
        localStorage.setItem("isLogin", true);
        localStorage.setItem("userData", JSON.stringify(res.data.userLogined));
        localStorage.setItem("token", JSON.stringify(res.data.token));
      })
      .catch((err) => {
        console.log("register error:", err);
        setMessage(err.response.data.message);
        setIsError(true);
        setIsLogin(false);
        setLoading(false);
      });
  };
  const storedIsLogin = localStorage.getItem("isLogin");
  const storedUserData = localStorage.getItem("userData");
  const storedUserToken = localStorage.getItem("token");

  useEffect(() => {
    if (storedIsLogin) {
      setIsLogin(storedIsLogin);
      setUserData(storedUserData ? JSON.parse(storedUserData) : null);
    }
  }, []);
  // setTimeout(() => {}, 300);
  useEffect(() => {
    // IsLogin = storedIsLogin;
    if (!IsLogin) return;
    // setLoading(false);
    setTimeout(() => {
      navagite("/dashboard");
    }, 200);
  }, [IsLogin]);

  return (
    <div className="h-hero flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        {/* Card Content */}
        <div className=" text-left mb-6">
          <h1 className="text-4xl font-semibold">Login</h1>
        </div>

        <div className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              onChange={emailInput}
              className={`w-full px-4 py-2 border ${
                isError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
              placeholder="your@email.com"
              required
            />
            {isError && (
              <p className="text-red-500 text-sm">Invalid email or Password </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
            </div>
            <input
              type="password"
              onChange={passwordInput}
              className={`w-full px-4 py-2 border ${
                isError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
              placeholder="••••••"
              required
            />
            {isError && (
              <p className="text-red-500 text-sm">Invalid email or Password</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={loginBtn}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-gray-700 mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign up
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
            onClick={() => alert("Login with Google")}
            className="w-full flex items-center justify-center border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100"
          >
            <FaGoogle className="mr-2" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

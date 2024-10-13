import React from "react";
import { useState, useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AppData } from "../../App";

const Register = () => {
  const { userData, setUserData, darkMode, setDarkMode } = useContext(AppData);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target.value;
  //   setUserData({ ...userData, [name]: value });
  // };

  const fullNameInput = (e) => {
    const fullNameValue = e.target.value;
    setUserData({ ...userData, fullName: fullNameValue });
  };
  // =============================
  const positionInput = (e) => {
    const fullNameValue = e.target.value;
    setUserData({ ...userData, fullName: fullNameValue });
  }; // =============================
  const emailInput = (e) => {
    const fullNameValue = e.target.value;
    setUserData({ ...userData, fullName: fullNameValue });
  }; // =============================
  const handlePasswordChange = (e) => {
    const fullNameValue = e.target.value;
    setUserData({ ...userData, fullName: fullNameValue });
  }; // =============================

  const userImageInput = (e) => {
    const fullNameValue = e.target.value;
    setUserData({ ...userData, fullName: fullNameValue });
  };
  // =============================
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // fullName: "",
  // position: "",
  // email: "",
  // country: "",
  // password: "",
  // userImage: "",

  return (
    <div className="h-hero flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        {/* Card Content */}
        <div className="text-left mb-6">
          <h1 className="text-4xl font-semibold">Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Email Field */}
          <div className="space-y-1">
            <input
              type="email"
              onChange={emailInput}
              className={`w-full px-4 py-2 border ${
                emailError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
              placeholder="your@email.com"
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm">Invalid email address</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handlePasswordChange}
              className={`w-full px-4 py-2 border ${
                passwordError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
              placeholder="••••••"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm">Password is incorrect</p>
            )}
          </div>

          {/* User Image Upload Field */}
          <div className="space-y-1">
            <label className="block text-gray-700">Upload Profile Image</label>
            <input
              type="file"
              onChange={userImageInput}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              accept="image/*"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

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
            Signup with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

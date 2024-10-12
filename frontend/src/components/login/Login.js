import React from "react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        {/* Color Mode Selector (for dark/light theme switch) */}
        <div className="absolute top-4 right-4">
          <button className="text-gray-600">🌙</button>
        </div>

        {/* Card Content */}
        <div className=" text-left mb-6">
          <h1 className="text-4xl font-semibold">Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <button
                type="button"
                className="text-blue-500 text-sm hover:underline"
                onClick={() => alert("Forgot Password")}
              >
                Forgot your password?
              </button>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
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

          {/* Remember me Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 rounded text-blue-500 focus:ring-2 focus:ring-blue-500"
              id="rememberMe"
            />
            <label htmlFor="rememberMe" className="text-gray-700">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-gray-700 mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
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
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

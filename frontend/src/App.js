import React, { useState, createContext } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
// import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { router } from "./routers/index";
export const AppData = createContext();

const App = () => {
  const [token, setToken] = useState("");
  const [IsLogin, setIsLogin] = useState(false);
  const [IsRegister, setIsRegister] = useState(false);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    position: "",
    email: "",
    password: "",
    boardName: "",
  });

  return (
    <AppData.Provider
      value={{
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
      }}
    >
      <RouterProvider router={router} />
    </AppData.Provider>
  );
};

export default App;

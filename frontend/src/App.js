import React, { useState, createContext } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
// import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { router } from "./routers/index";
export const AppData = createContext();

const App = () => {
  const [token, setToken] = useState("");
  const [userLoginId, setUserLoginId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    position: "",
    email: "",
    password: "",
  });

  return (
    <AppData.Provider
      value={{
        token,
        setToken,
        userLoginId,
        setUserLoginId,
        darkMode,
        setDarkMode,
        userData,
        setUserData,
      }}
    >
      <RouterProvider router={router} />
    </AppData.Provider>
  );
};

export default App;

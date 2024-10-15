import React, { useState, createContext } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
// import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { router } from "./routers/index";
// export const AppData = createContext();
import AuthProvider from "./contexts/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;

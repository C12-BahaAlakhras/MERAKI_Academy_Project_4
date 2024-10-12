import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
// import RegisterPage from "./pages/registerPage/RegisterPage";
import { router } from "./routers/index";

const App = () => {
  return (
    <RouterProvider router={router} />
    // <div className="App">

    //   {/* <RegisterPage /> */}
    // </div>
  );
};

export default App;

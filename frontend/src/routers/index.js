import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import RegisterPage from "../pages/registerPage/RegisterPage";
import LoginPage from "../pages/registerPage/LoginPage";
import Dashboard from "../pages/dashboardPage/Dashboard";
import DashboardLayout from "../layout/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "projects",
        element: <Dashboard />,
      },
      {
        path: "tasks",
        element: <Dashboard />,
      },
      {
        path: "in-progress",
        element: <Dashboard />,
      },
      {
        path: "completed",
        element: <Dashboard />,
      },
      {
        path: "todo",
        element: <Dashboard />,
      },
      {
        path: "team",
        element: <Dashboard />,
      },
      {
        path: "trashed",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

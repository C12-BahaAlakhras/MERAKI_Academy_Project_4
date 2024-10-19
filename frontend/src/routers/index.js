import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import RegisterPage from "../pages/registerPage/RegisterPage";
import LoginPage from "../pages/registerPage/LoginPage";
import DashboardLayout from "../layout/Dashboard";
import ProjectsPage from "../pages/ProjectsPage";
import Tasks from "../pages/Tasks";
import Users from "../pages/Users";
import ProjectPageDetails from "../pages/ProjectPageDetails";
import CompletedTask from "../pages/CompletedTask";
import InProgressTasks from "../pages/InProgressTasks";
import ToDoTasks from "../pages/ToDoTasks";

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
        path: "",
        element: <ProjectsPage />,
      },
      {
        path: "project/:projectId",
        element: <ProjectPageDetails />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "in-progress",
        element: <InProgressTasks />,
      },
      {
        path: "completed",
        element: <CompletedTask />,
      },
      {
        path: "todo",
        element: <ToDoTasks />,
      },
      {
        path: "team",
        element: <Users />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

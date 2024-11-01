import React from "react";
import {
  MdDashboard,
  MdOutlinePendingActions,
  MdTaskAlt,
  MdLogout,
} from "react-icons/md";
import { FaTasks, FaUsers } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";

const linkData = [
  { label: "Dashboard", link: "", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Completed", link: "completed", icon: <MdTaskAlt /> },
  {
    label: "In Progress",
    link: "in-progress",
    icon: <MdOutlinePendingActions />,
  },
  { label: "To Do", link: "todo", icon: <MdOutlinePendingActions /> },
  // Team link will be conditionally rendered based on user role
];

const SlideBar = () => {
  const { IsLogin, setIsLogin, userData } = useAuthContext();

  const logoutBtn = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <div className="h-hero bg-gray-100 p-4">
      <div className="h-full flex flex-col gap-6 p-4 bg-white rounded-lg">
        <div className="flex-1 flex flex-col gap-y-5">
          {linkData.map(({ label, link, icon }) => (
            <NavLink
              to={link}
              key={label}
              className="flex items-center gap-2 p-2 rounded-md text-slate-900 hover:bg-primary hover:text-white active:bg-primary active:text-white"
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}

          {/* Conditionally render the "Team" link based on user role */}
          {userData.role?.role === "ADMIN" && (
            <NavLink
              to="team"
              className="flex items-center gap-2 p-2 rounded-md text-slate-900 hover:bg-primary hover:text-white active:bg-primary active:text-white"
            >
              <FaUsers />
              <span>Team</span>
            </NavLink>
          )}
        </div>

        <Link to="/login">
          <div>
            <button
              onClick={logoutBtn}
              className="w-full flex gap-2 p-2 items-center text-lg p-2 rounded-md text-slate-900 hover:bg-primary hover:text-white text-gray-800"
            >
              <MdLogout />
              <span>Logout</span>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SlideBar;

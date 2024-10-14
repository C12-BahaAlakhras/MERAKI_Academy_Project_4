import React from "react";
import {
  MdDashboard,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const linkData = [
  { label: "Dashboard", link: "", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  { label: "To Do", link: "todo/todo", icon: <MdOutlinePendingActions /> },
  { label: "Team", link: "team", icon: <FaUsers /> },
  { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
];
// remove boarder and make w-full
const SlideBar = () => {
  return (
    <div className="w-1/4 lg:w-1/5  h-hero flex flex-col gap-6 p-5 border-r-4">
      {/* <h1 className="flex gap-1 items-center">
        <span className="text-2xl font-bold text-black">Board Nane</span>
      </h1> */}

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {linkData.map(({ label, link, icon }) => (
          <NavLink
            to={link}
            key={label}
            className="flex items-center gap-2 p-2 rounded-md text-slate-900 hover:bg-black hover:text-white active:bg-black active:text-white"
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </div>

      <div>
        <button className="w-full flex gap-2 p-2 items-center text-lg  p-2 rounded-md text-slate-900 hover:bg-black hover:text-white text-gray-800">
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default SlideBar;

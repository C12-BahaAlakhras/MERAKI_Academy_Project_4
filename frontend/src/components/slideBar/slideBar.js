import React from "react";
import {
  MdDashboard,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
  MdLogout,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";

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
  { label: "Team", link: "team", icon: <FaUsers /> },
  { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
];
// remove boarder and make w-full
const SlideBar = () => {
  return (
    <div className="h-hero flex flex-col gap-6 p-5 border-r-4">
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
          <MdLogout />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SlideBar;

// import React, { useState } from "react";
// import {
//   MdDashboard,
//   MdOutlinePendingActions,
//   MdSettings,
//   MdTaskAlt,
//   MdLogout,
//   MdMenu,
// } from "react-icons/md";
// import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
// import { NavLink } from "react-router-dom";

// const linkData = [
//   { label: "Dashboard", link: "", icon: <MdDashboard /> },
//   { label: "Tasks", link: "tasks", icon: <FaTasks /> },
//   { label: "Completed", link: "completed", icon: <MdTaskAlt /> },
//   {
//     label: "In Progress",
//     link: "in-progress",
//     icon: <MdOutlinePendingActions />,
//   },
//   { label: "To Do", link: "todo", icon: <MdOutlinePendingActions /> },
//   { label: "Team", link: "team", icon: <FaUsers /> },
//   { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
// ];

// const SlideBar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   // Toggle sidebar collapse state
//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div className={`h-screen bg-gray-100 flex p-4 rounded-lg`}>
//       {/* Sidebar */}
//       <div
//         className={`${
//           isCollapsed ? "w-16" : "w-full"
//         } h-hero bg-white shadow-md transition-all duration-300 ease-in-out flex flex-col justify-between rounded-lg`}
//       >
//         {/* Toggle Button */}
//         <button
//           onClick={toggleSidebar}
//           className="p-3 text-black hover:bg-gray-200 focus:outline-none"
//         >
//           <MdMenu size={24} />
//         </button>

//         {/* Links */}
//         <div className="flex-1 flex flex-col gap-4">
//           {linkData.map(({ label, link, icon }) => (
//             <NavLink
//               to={link}
//               key={label}
//               className="flex items-center gap-2 p-2 rounded-md text-slate-900 hover:bg-black hover:text-white active:bg-black active:text-white"
//             >
//               {icon}
//               {!isCollapsed && <span className="ml-2">{label}</span>}
//             </NavLink>
//           ))}
//         </div>

//         {/* Logout Button */}
//         <div className="p-3">
//           <button className="flex items-center w-full text-left p-3 hover:bg-gray-200 text-gray-800">
//             <MdLogout />
//             {!isCollapsed && <span className="ml-2">Logout</span>}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SlideBar;

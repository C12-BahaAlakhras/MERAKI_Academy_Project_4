import React, { useState, useEffect } from "react";
import "./projectCard.css";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthProvider";
import { CgAdd } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
// const getRandomColor = () => {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };
const ProjectDetails = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const {
    userData,
    setUserData,
    projects,
    setProjects,
    showPopProjectRemove,
    setShowPopProjectRemove,
  } = useAuthContext();
  // ===========================================================
  const deleteProjectBtn = (idProject) => {
    setShowPopProjectRemove(idProject);
    console.log("from PD idProject: ", idProject);
  };
  //   const storedIsLogin = localStorage.getItem("isLogin");
  //   const storedUserData = localStorage.getItem("userData");
  //   const storedUserToken = localStorage.getItem("token");

  //   useEffect(() => {
  //     setIsLogin(storedIsLogin);
  //     setUserData(storedUserData ? JSON.parse(storedUserData) : null);
  //     setUserData(JSON.parse(storedUserData));

  //     setToken(storedUserToken);
  //   }, []);
  //===========================================================

  useEffect(() => {
    const userId = userData._id;
    axios
      .get(`http://localhost:5000/project/all/${userId}`)
      .then((res) => {
        console.log("arry of projects res.data.result ==>", res.data.result);
        setMessage(res.data.message);
        setIsError(false);
        setProjects(res.data.result);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setIsError(true);
      });
  }, []);

  //===========================================================

  return (
    <>
      {projects.map((project) => {
        return (
          <div className="max-w-sm rounded-lg overflow-hidden shadow-lg p-4 bg-white border border-gray-200">
            <h2 className="text-xl font-semibold mb-2 border-b pb-2">
              {project.projectName}
            </h2>
            <p className="text-gray-700 mb-2 border-b pb-2">
              {project.projectDescription}
            </p>
            <p
              className={`text-sm font-bold mb-4 ${
                project.projectPriority === "high"
                  ? "text-red-500"
                  : project.projectPriority === "medium"
                  ? "text-orange-500"
                  : "text-green-500"
              }`}
            >
              <span className="text-gray-500">Priority: </span>
              {project.projectPriority}
            </p>
            <div className="mb-4 flex items-center justify-between border-t border-b border-gray-200 py-3">
              <div className="flex items-center">
                {userData.userBoard.boardMembers.length > 0 ? (
                  projects.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center mr-1 rounded-full"
                      style={{ backgroundColor: "#1b1aff" }}
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-full text-white font-bold">
                        {user.projectName.charAt(0).toUpperCase()}
                        {/* First letter of the user's name */}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No Team assigned to this project
                  </p>
                )}
              </div>
              {/* Add User Button */}
              <button className="flex items-center text-blue-500  ml-2 ">
                <CgAdd className="text-lg" />
              </button>
            </div>

            <div className="flex justify-between mt-10">
              <button className="bg-blue-500 text-white py-1 px-6 rounded hover:bg-blue-600 transition duration-200">
                View
              </button>

              <button
                onClick={() => {
                  deleteProjectBtn(project._id);
                }}
                className="bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600 transition duration-200 flex items-center"
              >
                <MdDelete className="text-lg" /> {/* Delete icon */}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProjectDetails;

// return (
//   <>
//     {projects.map((project) => {
//       return (
//         <div key={project.projectName}>
//           <h3>{project.projectName}</h3>
//           <h4>{project.projectDescription}</h4>
//           <h4>{project.projectPriority}</h4>
//         </div>
//       );
//     })}

//     {/*  */}
//     <div className="max-w-sm rounded-lg overflow-hidden shadow-lg p-4 bg-white border border-gray-200">
//       <h2 className="text-xl font-semibold mb-2 border-b pb-2">
//         Project name
//       </h2>
//       <p className="text-gray-700 mb-2 border-b pb-2">description</p>
//       <p className="text-sm text-gray-500 mb-4">Priority: High</p>

//       <div className="mb-4 flex items-center justify-between border-t border-b border-gray-200 py-3">
//         <div className="flex items-center">
//           {projects.length > 0 ? (
//             projects.map((user, index) => (
//               <div
//                 key={index}
//                 className="flex items-center mr-1 rounded-full"
//                 style={{ backgroundColor: getRandomColor() }} // Random color for each user
//               >
//                 <div className="w-8 h-8 flex items-center justify-center rounded-full text-white font-bold">
//                   {user.projectName.charAt(0).toUpperCase()}{" "}
//                   {/* First letter of the user's name */}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No users assigned to this project</p>
//           )}
//         </div>
//         {/* Add User Button */}
//         <button className="flex items-center text-blue-500  ml-2 ">
//           <CgAdd className="text-lg" />
//         </button>
//       </div>

//       <div className="flex justify-between mt-10">
//         <button className="bg-blue-500 text-white py-1 px-6 rounded hover:bg-blue-600 transition duration-200">
//           View
//         </button>

//         <button className="bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600 transition duration-200 flex items-center">
//           <MdDelete className="text-lg" /> {/* Delete icon */}
//         </button>
//       </div>
//     </div>
//     {/*  */}
//   </>
// );

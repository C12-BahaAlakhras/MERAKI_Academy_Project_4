import React, { useState, useEffect, createContext, useContext } from "react";
import "./projectCard.css";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthProvider";
import { CgAdd } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    userData,
    setUserData,
    projects,
    setProjects,
    showPopProjectRemove,
    setShowPopProjectRemove,
    token,
    setToken,
    projectID,
    setProjectID,
  } = useAuthContext();
  // ===========================================================
  const deleteProjectBtn = (idProject) => {
    setShowPopProjectRemove(idProject);
    console.log("from PD idProject: ", idProject);
  };
  //===========================================================

  const viewProjectPageDetiles = (idProject) => {
    setProjectID(idProject);
    navigate(`/dashboard/project/${idProject}`);
  };
  //===========================================================

  useEffect(() => {
    const userId = userData._id;
    console.log("test token ==>", token);
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
  }, [token]);

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
                {userData.userBoard?.boardMembers?.length > 0 ? (
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
              <button
                onClick={() => viewProjectPageDetiles(project._id)}
                className="bg-blue-500 text-white py-1 px-6 rounded hover:bg-blue-600 transition duration-200"
              >
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

import React, { useState, useEffect } from "react";
import "./projectCard.css";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthProvider";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    userData,
    projects,
    setProjects,
    setShowPopProjectRemove,
    token,
    setProjectID,
  } = useAuthContext();
  // ===========================================================
  const deleteProjectBtn = (idProject) => {
    setShowPopProjectRemove(idProject);
    // console.log("from PD idProject: ", idProject);
  };
  //===========================================================

  const viewProjectPageDetiles = (idProject) => {
    setProjectID(idProject);
    navigate(`/dashboard/project/${idProject}`);
  };
  //===========================================================

  useEffect(() => {
    const userId = userData._id;

    axios
      .get(`http://localhost:5000/project/all/${userId}`)
      .then((res) => {
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

            {/* here if you want users */}
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

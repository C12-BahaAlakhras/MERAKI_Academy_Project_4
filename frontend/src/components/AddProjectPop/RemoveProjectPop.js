import React, { useState, useEffect } from "react";

import { useAuthContext } from "../../contexts/AuthProvider";
import Loading from "../Loading";
import axios from "axios";
import "./removeProjectPop.css";

const RemoveProjectPop = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const {
    showProjectPop,
    setShowProjectPop,
    newProject,
    setNewProject,
    projects,
    setProjects,
    userData,
    setUserData,
    token,
    setToken,
    showPopProjectRemove,
    setShowPopProjectRemove,
  } = useAuthContext();
  const closeBtn = () => {
    setShowPopProjectRemove(false);
  };
  const removeProjectbtn = () => {
    // console.log("userData._id", userData._id);
    // console.log("token", token);
    // console.log("from Remove p b idProject: ", showPopProjectRemove);
    const projectID = showPopProjectRemove;
    axios
      .delete(`http://localhost:5000/project/${projectID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("delete  project successfully:", res.data.deletedProject);
        setMessage(res.data.message);
        setIsError(false);
        //===============================
        const deletedProjectId = res.data.deletedProject._id;

        // Update the userData to reflect the deleted project in the boardProjects (if necessary)
        const updatedUserData = {
          ...userData,
          userBoard: {
            ...userData.userBoard,
            // Remove the project ID from boardProjects instead of adding it
            boardProjects: userData.userBoard.boardProjects.filter(
              (projectId) => projectId !== deletedProjectId
            ),
          },
        };
        setUserData(updatedUserData);

        // Remove the deleted project from the projects array
        const updatedProjects = projects.filter(
          (project) => project._id !== deletedProjectId
        );
        setProjects(updatedProjects);

        // Store updated user data in localStorage
        localStorage.setItem("userData", JSON.stringify(updatedUserData));

        //================================
        setTimeout(() => {
          setShowPopProjectRemove(false);
        }, 500);
      })
      .catch((err) => {
        console.log("delete  project error:", err);
        setMessage(err.response.data.message);
        setIsError(true);
        // setShowPopProjectRemove(true);
      });
  };

  useEffect(() => {
    console.log("userData updated:", userData);
    console.log("userData projects:", projects);
  }, [userData]);

  return (
    <div className="project-pop">
      <div className="title-pop">
        <h3>Are you sure to remove this Project ?</h3>
        <button onClick={closeBtn}>x</button>
      </div>
      <div className="form-pop-remove">
        <button onClick={closeBtn}>Cancel</button>
        <button className="remove-btn" onClick={removeProjectbtn}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default RemoveProjectPop;

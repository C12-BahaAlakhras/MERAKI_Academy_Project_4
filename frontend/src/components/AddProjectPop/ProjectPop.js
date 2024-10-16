import React, { useState, useEffect } from "react";
import "./projectPop.css";
import { useAuthContext } from "../../contexts/AuthProvider";
import Loading from "../Loading";
import axios from "axios";
// projectName, projectDescription, projectPriority
const ProjectPop = () => {
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
  } = useAuthContext();
  const prjectNameValue = (e) => {
    setNewProject({ ...newProject, projectName: e.target.value });
  };
  const prjectDesValue = (e) => {
    setNewProject({ ...newProject, projectDescription: e.target.value });
  };
  const prjectPriorityValue = (e) => {
    setNewProject({ ...newProject, projectPriority: e.target.value });
  };
  const closeBtn = () => {
    setShowProjectPop(false);
  };
  const createProjectbtn = () => {
    console.log("userData._id", userData._id);
    console.log("token", token);

    axios
      .post(`http://localhost:5000/project/${userData._id}`, newProject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("create new project successfully:", res.data);
        setMessage(res.data.message);
        setIsError(false);
        //===============================
        const newProjectId = res.data.projectId;

        const updatedUserData = {
          ...userData,
          userBoard: {
            ...userData.userBoard,
            boardProjects: [...userData.userBoard.boardProjects, newProjectId],
          },
        };
        // setUserData(updatedUserData);
        // // console.log(userData)
        setUserData(updatedUserData);
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        setProjects([...projects, res.data.newProject]);

        //================================
        setTimeout(() => {
          setShowProjectPop(false);
        }, 500);
      })
      .catch((err) => {
        console.log("create new project error:", err);
        setMessage(err.response.data.message);
        setIsError(true);
        setShowProjectPop(true);
      });
  };

  useEffect(() => {
    console.log("userData updated:", userData);
    console.log("userData projects:", projects);
  }, [userData]);

  return (
    <div className="project-pop">
      <div className="title-pop">
        <h3>Title</h3>
        <button onClick={closeBtn}>x</button>
      </div>
      <div className="form-pop">
        <label>Project Name</label>
        <input placeholder="Project Name" onChange={prjectNameValue} />

        <label>Project Descreption</label>
        <input placeholder="Project Descreption" onChange={prjectDesValue} />

        <label>Project Priority</label>
        <select onChange={prjectPriorityValue}>
          <option value="" disabled selected>
            Select priority
          </option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button onClick={createProjectbtn}>Create Project</button>
      </div>
    </div>
  );
};

export default ProjectPop;

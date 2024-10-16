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
    console.log("from Remove p b idProject: ", showPopProjectRemove);

    // axios
    //   .post(`http://localhost:5000/project/:project._id`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     // console.log("create new project successfully:", res.data);
    //     setMessage(res.data.message);
    //     setIsError(false);
    //     //===============================
    //     // const newProjectId = res.data.projectId;

    //     // const updatedUserData = {
    //     //   ...userData,
    //     //   userBoard: {
    //     //     ...userData.userBoard,
    //     //     boardProjects: [...userData.userBoard.boardProjects, newProjectId],
    //     //   },
    //     // };
    //     // setUserData(updatedUserData);
    //     // // console.log(userData)
    //     // setUserData(updatedUserData);
    //     // localStorage.setItem("userData", JSON.stringify(updatedUserData));
    //     // setProjects([...projects, res.data.newProject]);

    //     //================================
    //     setTimeout(() => {
    //       setShowProjectPop(false);
    //     }, 500);
    //   })
    //   .catch((err) => {
    //     console.log("create new project error:", err);
    //     setMessage(err.response.data.message);
    //     setIsError(true);
    //     setShowPopProjectRemove(true);
    //   });
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

import React, { useState, useEffect } from "react";
import "./AddUserPop.css";

import axios from "axios";
import { useAuthContext } from "../../contexts/AuthProvider";
// projectName, projectDescription, projectPriority
const AddUserPop = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [newUser, setNewUser] = useState({});

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
    showAddTaskPop,
    setShowAddTaskPop,
    showRemoveTaskPop,
    setShowRemoveTaskPop,
    projectID,
    setProjectID,
    targetProject,
    setTargetProject,
    tickets,
    setTickets,
    teamMembers,
    setTeamMembers,
    showAddUserPop,
    setShowAddUserPop,
    showRemoveUserPop,
    setShowRemoveUserPop,
  } = useAuthContext();
  // { fullName, position, email, password }

  const userNameValue = (e) => {
    setNewUser({ ...newUser, fullName: e.target.value });
  };
  const userPositionValue = (e) => {
    setNewUser({ ...newUser, position: e.target.value });
  };
  const userEmailValue = (e) => {
    setNewUser({ ...newUser, email: e.target.value });
  };
  const userPassValue = (e) => {
    setNewUser({ ...newUser, password: e.target.value });
  };

  const closeBtn = () => {
    setShowAddUserPop(false);
  };
  const createUserbtn = () => {
    const token = localStorage.getItem("token");
    axios
      .post(`http://localhost:5000/users/${userData._id}/addteam`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("create new task successfully:", res.data);
        setMessage(res.data.message);
        setIsError(false);
        //===============================
        const addedUser = res.data.user;

        const updatedUserData = {
          ...userData,
          userBoard: {
            ...userData.userBoard,
            boardMembers: [...userData.userBoard.boardMembers, addedUser],
          },
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));

        setTeamMembers([...teamMembers, addedUser]);

        setUserData(updatedUserData);
        //================================
        setTimeout(() => {
          setShowAddUserPop(false);
        }, 500);
      })
      .catch((err) => {
        console.log("create new user error:", err);
        setMessage(err.response.data.message);
        setIsError(true);
        setShowAddTaskPop(true);
      });
  };

  //   useEffect(() => {
  //     console.log("updated targetProject:", targetProject);
  //     //   console.log("userData projects:", projects);
  //   }, [targetProject]);

  return (
    <div className="project-pop">
      <div className="title-pop">
        <h3>Create New Task</h3>
        <button onClick={closeBtn}>x</button>
      </div>
      <div className="form-pop">
        <label>Member Name</label>
        <input placeholder="Member Name" onChange={userNameValue} />
        <label>Member Postion</label>
        <input placeholder="Member Postion" onChange={userPositionValue} />
        <label>Member Email</label>
        <input placeholder="Member Email" onChange={userEmailValue} />
        <label>Member Password</label>
        <input placeholder="Member Password" onChange={userPassValue} />

        <button onClick={createUserbtn}>Add Member</button>
      </div>
    </div>
  );
};

export default AddUserPop;

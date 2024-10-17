import React, { useState, useEffect } from "react";

import { useAuthContext } from "../../contexts/AuthProvider";
import Loading from "../Loading";
import axios from "axios";
import "./removeTaskPop.css";

const RemoveTaskPop = () => {
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
    showRemoveTaskPop,
    setShowRemoveTaskPop,
    tickets,
    setTickets,
  } = useAuthContext();

  const closeBtn = () => {
    setShowRemoveTaskPop(false);
    // console.log(showRemoveTaskPop)
  };
  const removeTaskbtn = () => {
    const TaskId = showRemoveTaskPop;
    axios
      .delete(`http://localhost:5000/ticket/${TaskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("delete  task successfully:", res.data);
        console.log("the task that has been deleted:", res.data.result);

        setMessage(res.data.message);
        setIsError(false);

        //===============================
        const deletedTaskId = res.data.result._id;

        // // Update the userData to reflect the deleted project in the boardProjects (if necessary)
        // const updatedUserData = {
        //   ...userData,
        //   userBoard: {
        //     ...userData.userBoard,
        //     // Remove the project ID from boardProjects instead of adding it
        //     boardProjects: userData.userBoard.boardProjects.filter(
        //       (projectId) => projectId !== deletedProjectId
        //     ),
        //   },
        // };
        // setUserData(updatedUserData);

        // Remove the deleted ticket from the tickets array
        const updatedTickets = tickets.filter(
          (ticket) => ticket._id !== deletedTaskId
        );
        setTickets(updatedTickets);

        // // Store updated user data in localStorage
        // localStorage.setItem("userData", JSON.stringify(updatedUserData));

        //================================
        setTimeout(() => {
          setShowRemoveTaskPop(false);
        }, 500);
      })
      .catch((err) => {
        console.log("delete  project error:", err);
        setMessage(err.response.data.message);
        setIsError(true);
        setShowRemoveTaskPop(true);
      });
  };

  //   useEffect(() => {
  //     // console.log("userData updated:", userData);
  //     // console.log("userData projects:", projects);
  //   }, [userData]);

  return (
    <div className="project-pop">
      <div className="title-pop">
        <h3>Are you sure to remove this Task ?</h3>
        <button onClick={closeBtn}>x</button>
      </div>
      <div className="form-pop-remove">
        <button onClick={closeBtn}>Cancel</button>
        <button className="remove-btn" onClick={removeTaskbtn}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default RemoveTaskPop;

import React, { useState, useEffect } from "react";

import { useAuthContext } from "../../contexts/AuthProvider";
import Loading from "../Loading";
import axios from "axios";
import "../PopForTickets/removeTaskPop.css";

const RemoveUserPop = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const {
    userData,

    token,

    setShowRemoveTaskPop,

    teamMembers,
    setTeamMembers,

    showRemoveUserPop,
    setShowRemoveUserPop,
  } = useAuthContext();

  const closeBtn = () => {
    setShowRemoveUserPop(false);
  };
  const removeUser = () => {
    const userId = showRemoveUserPop;
    const adminId = userData._id;

    axios
      .delete(`http://localhost:5000/users/${adminId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        setIsError(false);

        //===============================
        const deletedUserId = res.data.user._id;

        const updatedTeam = teamMembers.filter(
          (user) => user._id !== deletedUserId
        );
        setTeamMembers(updatedTeam);

        //================================
        setTimeout(() => {
          setShowRemoveUserPop(false);
        }, 500);
      })
      .catch((err) => {
        console.log("delete  user error:", err);
        setMessage(err.response.data.message);
        setIsError(true);
        setShowRemoveTaskPop(true);
      });
  };

  return (
    <div className="project-pop">
      <div className="title-pop">
        <h3>Are you sure to remove this User ?</h3>
        <button onClick={closeBtn}>x</button>
      </div>
      <div className="form-pop-remove">
        <button onClick={closeBtn}>Cancel</button>
        <button className="remove-btn" onClick={removeUser}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default RemoveUserPop;

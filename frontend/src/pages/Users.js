import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import RemoveTaskPop from "../components/PopForTickets/RemoveTaskPop";
import "./user.css";
import AddUserPop from "../components/PopForUsers/AddUserPop";
import RemoveUserPop from "../components/PopForUsers/RemoveUserPop";

const Users = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    setShowRemoveTaskPop,
    allTasks,
    setAllTasks,
    userData,
    setUserData,
    allTasksCompleted,
    setAllTasksCompleted,
    allTasksToDo,
    setAllTasksToDo,
    allTasksInProgress,
    setAllTasksInProgress,
    teamMembers,
    setTeamMembers,
    showAddUserPop,
    setShowAddUserPop,
    showRemoveUserPop,
    setShowRemoveUserPop,
  } = useAuthContext();

  useEffect(() => {
    const userId = userData._id;
    console.log("userId =======>", userId);

    axios
      .get(`http://localhost:5000/users/${userId}`)
      .then((res) => {
        setMessage(res.data.message);
        setIsError(false);

        setTeamMembers(res.data.result);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setIsError(true);
      });
  }, []);

  const showPopAddUserBtn = () => {
    setShowAddUserPop(true);
  };

  const handleDelete = (id) => {
    // Add delete functionality here
    console.log("Delete user with id:", id);
  };

  return (
    <>
      <div className="user-header">
        <Link className="user-back-link" to="/dashboard">
          Team Member
        </Link>
        <button onClick={showPopAddUserBtn} className="user-add-btn">
          Add User
        </button>
      </div>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr className="user-table-header bg-black text-white">
              <th className=" bg-black text-white">Member Name</th>
              <th>Position</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {console.log(teamMembers)}
            {teamMembers.map((user) => (
              <tr key={user._id} className="user-table-row">
                <td>{user.fullName}</td>
                <td>{user.position}</td>
                <td>{user.email}</td>
                <td className="user-delete-cell">
                  <MdDelete
                    className="user-delete-icon"
                    onClick={() => handleDelete(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddUserPop ? <AddUserPop /> : null}
      {showRemoveUserPop ? <RemoveUserPop /> : null}
    </>
  );
};

export default Users;

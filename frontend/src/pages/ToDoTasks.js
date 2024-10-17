// import React from "react";

// const ToDoTasks = () => {
//   return <div>ToDoTasks</div>;
// };

// export default ToDoTasks;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import RemoveTaskPop from "../components/PopForTickets/RemoveTaskPop";
import "./Tasks.css";

const ToDoTasks = () => {
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
  } = useAuthContext();

  useEffect(() => {
    const userId = userData._id;

    axios
      .get(`http://localhost:5000/ticket/user/${userId}`)
      .then((res) => {
        setMessage(res.data.message);
        setIsError(false);

        const allTasksArray = res.data.result;

        const toDoTicket = allTasksArray.filter((ticket) => {
          return ticket.ticketStatus === "Pending";
        });

        // console.log("completedTicket", completedTicket);
        setAllTasksToDo(toDoTicket);
        //================================
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setIsError(true);
      });
  }, []);

  return (
    <>
      <div className="tasks-container">
        <h1 className="font-black">Pending Task List</h1>
        <table className="tasks-table">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th>Task Title</th>
              <th>Task Description</th>
              <th>Assignees</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {allTasksToDo?.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.ticketTitle}</td>
                <td>{ticket.ticketDescription}</td>
                <td>
                  <div className="assignees">
                    {ticket.assigneeTo.map((assignee, index) => (
                      <div className="avatar" key={index}>
                        {assignee.slice(0, 2)?.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </td>
                <td>{ticket.ticketStatus}</td>
                <td
                  className={`priority ${ticket.ticketPriority?.toLowerCase()}`}
                >
                  {ticket.ticketPriority}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {showRemoveTaskPop ? <RemoveTaskPop /> : null} */}
    </>
  );
};

export default ToDoTasks;
